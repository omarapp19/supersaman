import { useState, useEffect, FormEvent, useMemo } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, Search, ScanBarcode, ArrowDownAZ, Plus, X, Trash2, ChevronRight } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { BarcodeScanner } from './BarcodeScanner';
import { RowActionButton } from './ui/RowActionButton';
import { useToast } from './Toast';
import { ProductListSkeleton } from './ui/Skeleton';
import { LoadMore } from './ui/LoadMore';

interface PasilloDetailViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  selectedAisleNumber: number;
  aisles: Aisle[];
  onDeleteProduct: (aisleId: string, productId: string) => void;
  user?: any;
}

export function PasilloDetailView({ onNavigate, selectedAisleNumber, aisles, onDeleteProduct, user }: PasilloDetailViewProps) {
  const toast = useToast();
  const aisle = aisles.find(a => a.number === selectedAisleNumber) || aisles[0] || mockAisles[0];
  
  // Safety check: if operator is assigned to specific aisles, deny access if numbers mismatch
  if (user?.role === 'operador' && user.assignedAisles !== undefined && Array.isArray(user.assignedAisles) && user.assignedAisles.length > 0) {
    if (!user.assignedAisles.includes(aisle.number)) {
      return (
        <div className="w-full text-center bg-card-surface rounded-3xl border border-error/20 p-6 max-w-md mx-auto mt-8">
          <h3 className="font-sans text-[20px] font-bold text-error mb-2">Acceso Denegado</h3>
          <p className="font-sans text-[15px] text-on-surface-variant mb-6">No tienes permisos para visualizar o gestionar este pasillo.</p>
          <button onClick={() => onNavigate('pasillos')} className="px-6 min-h-12 bg-primary-container text-on-primary rounded-xl font-sans text-base font-bold cursor-pointer">
            Volver a Pasillos
          </button>
        </div>
      );
    }
  }
  const initialProducts = mockProductsByAisle[selectedAisleNumber] || [];
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const PAGE = 40;
  const [limit, setLimit] = useState(PAGE);
  const [loadingProducts, setLoadingProducts] = useState(isFirebaseConfigured);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Product Editing & Creation States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productUndXCaja, setProductUndXCaja] = useState('0');
  const [productCompany, setProductCompany] = useState('');
  const [productSellingUnit, setProductSellingUnit] = useState<'und' | 'kg'>('und');
  const [showScanner, setShowScanner] = useState(false);

  const handleStartEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductBrand(product.brand);
    setProductSku(product.sku || '');
    setProductCompany(product.company || '');
    setProductUndXCaja(String(product.und_x_caja ?? 0));
    setProductSellingUnit(product.sellingUnit || 'und');
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    setProductName('');
    setProductBrand('');
    setProductSku('');
    setProductCompany('');
    setProductUndXCaja('0');
    setProductSellingUnit('und');
  };

  // Estados para cargar todos los productos en caché y obtener sus empresas
  const [allProducts, setAllProducts] = useState<{ product: Product; aisle: Aisle }[]>([]);
  const [loadingAllProducts, setLoadingAllProducts] = useState(false);

  const fetchAllProducts = async () => {
    if (allProducts.length > 0 || loadingAllProducts) return;

    if (typeof window !== 'undefined' && (window as any).__samanProductsCache) {
      setAllProducts((window as any).__samanProductsCache);
      return;
    }

    setLoadingAllProducts(true);
    try {
      if (isFirebaseConfigured) {
        const { collectionGroup, getDocs } = await import('firebase/firestore');
        const productsGroupRef = collectionGroup(db, 'products');
        const snap = await getDocs(productsGroupRef);
        const list = snap.docs.map(docSnap => {
          const parentAisleDoc = docSnap.ref.parent.parent;
          const aisleItem = aisles.find(a => a.id === parentAisleDoc?.id);
          return {
            product: { id: docSnap.id, ...docSnap.data() } as Product,
            aisle: aisleItem || { id: parentAisleDoc?.id || '', name: 'Pasillo', number: 0, status: 'unassigned', progress: 0 }
          };
        }).filter(item => item.aisle.number !== 0);

        if (typeof window !== 'undefined') {
          (window as any).__samanProductsCache = list;
        }
        setAllProducts(list);
      } else {
        const list: { product: Product; aisle: Aisle }[] = [];
        aisles.forEach(aisleItem => {
          const freshProducts = mockProductsByAisle[aisleItem.number] || [];
          const productsWithLocalData = freshProducts.map(p => {
            const localSku = localStorage.getItem(`saman_sku_${p.id}`);
            const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
            const localCompany = localStorage.getItem(`saman_company_${p.id}`);
            const localName = localStorage.getItem(`saman_name_${p.id}`);
            return {
              ...p,
              name: localName !== null ? localName : p.name,
              sku: localSku !== null ? localSku : p.sku,
              und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja,
              company: localCompany !== null ? localCompany : p.company
            };
          });
          productsWithLocalData.forEach(p => {
            list.push({ product: p, aisle: aisleItem });
          });
        });
        if (typeof window !== 'undefined') {
          (window as any).__samanProductsCache = list;
        }
        setAllProducts(list);
      }
    } catch (e) {
      console.error("Error fetching all products:", e);
      toast.error("Error al cargar la lista de productos.");
    } finally {
      setLoadingAllProducts(false);
    }
  };

  // Computamos las empresas únicas para el autocompletado (datalist)
  const uniqueCompanies = useMemo(() => {
    const companies = new Set<string>();
    
    // 1. Agregar empresas de los productos cargados del pasillo actual
    products.forEach(p => {
      if (p.company?.trim()) {
        companies.add(p.company.trim());
      }
    });

    // 2. Agregar empresas de todos los productos (si ya se cargó la caché)
    allProducts.forEach(item => {
      if (item.product.company?.trim()) {
        companies.add(item.product.company.trim());
      }
    });

    // 3. Agregar empresas de los datos mock en modo demo
    if (!isFirebaseConfigured) {
      Object.values(mockProductsByAisle).forEach(prodList => {
        prodList.forEach(p => {
          const localCompany = localStorage.getItem(`saman_company_${p.id}`);
          const company = localCompany !== null ? localCompany : p.company;
          if (company?.trim()) {
            companies.add(company.trim());
          }
        });
      });
    }

    return Array.from(companies).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }, [products, allProducts]);

  const handleScanResult = (code: string) => {
    setShowScanner(false);
    const cleanCode = code.trim().toLowerCase();
    const existingProduct = products.find(p => p.sku && p.sku.trim().toLowerCase() === cleanCode);

    if (existingProduct) {
      setSearchQuery(existingProduct.sku || existingProduct.name);
      toast.success(`Producto encontrado: ${existingProduct.name}`);
    } else {
      handleCloseProductModal();
      setProductSku(code);
      setShowProductModal(true);
      fetchAllProducts(); // Carga las empresas en segundo plano
      toast.info('Producto no registrado en este pasillo.');
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (isFirebaseConfigured && aisle?.id) {
      onDeleteProduct(aisle.id, product.id);
    } else {
      // Demo mode: update local state directly
      setProducts(prev => prev.filter(p => p.id !== product.id));
    }
    if (typeof window !== 'undefined') {
      (window as any).__samanProductsCache = null;
    }
    setProductToDelete(null);
    toast.success('Producto eliminado.', 7000, { label: 'Deshacer', onClick: () => restoreProduct(product) });
  };

  const restoreProduct = async (product: Product) => {
    try {
      if (isFirebaseConfigured && aisle?.id) {
        const { id, ...data } = product;
        await setDoc(doc(db, 'aisles', aisle.id, 'products', id), data);
      } else {
        setProducts(prev => [...prev, product].sort((a, b) => a.name.localeCompare(b.name)));
      }
      if (typeof window !== 'undefined') {
        (window as any).__samanProductsCache = null;
      }
      toast.info('Producto restaurado.');
    } catch (err) {
      console.error('Error al restaurar producto:', err);
      toast.error('No se pudo restaurar el producto.');
    }
  };

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (savingProduct) return; // Evita doble submit
    setSavingProduct(true);

    const initials = productName.trim().substring(0, 2).toUpperCase();
    const val = parseInt(productUndXCaja, 10);
    const und_x_caja = isNaN(val) ? 0 : Math.max(0, val);

    try {
      if (editingProduct) {
        // Edit Mode
        const updatedFields: Partial<Product> = {
          name: productName.trim(),
          brand: productBrand.trim(),
          sku: productSku.trim(),
          und_x_caja,
          company: productCompany.trim(),
          sellingUnit: productSellingUnit,
          initials
        };

        if (isFirebaseConfigured && aisle?.id) {
          const productRef = doc(db, 'aisles', aisle.id, 'products', editingProduct.id);
          await setDoc(productRef, updatedFields, { merge: true });
        } else {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...updatedFields } : p));
          localStorage.setItem(`saman_name_${editingProduct.id}`, updatedFields.name!);
          localStorage.setItem(`saman_sku_${editingProduct.id}`, updatedFields.sku!);
          localStorage.setItem(`saman_und_x_caja_${editingProduct.id}`, String(und_x_caja));
          localStorage.setItem(`saman_company_${editingProduct.id}`, updatedFields.company!);
        }
        toast.success('Producto actualizado.');
      } else {
        // Create Mode
        const newProduct: Product = {
          id: 'p_' + Date.now(),
          name: productName.trim(),
          brand: productBrand.trim(),
          sku: productSku.trim(),
          status: 'normal',
          initials: initials,
          und_x_caja: und_x_caja,
          company: productCompany.trim(),
          sellingUnit: productSellingUnit
        };

        if (isFirebaseConfigured && aisle?.id) {
          const productRef = doc(db, 'aisles', aisle.id, 'products', newProduct.id);
          await setDoc(productRef, newProduct);
        } else {
          setProducts(prev => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
          localStorage.setItem(`saman_sku_${newProduct.id}`, newProduct.sku);
          if (und_x_caja > 0) {
            localStorage.setItem(`saman_und_x_caja_${newProduct.id}`, String(und_x_caja));
          }
          if (productCompany.trim()) {
            localStorage.setItem(`saman_company_${newProduct.id}`, productCompany.trim());
          }
        }
        toast.success('Producto agregado con éxito.');
      }

      // Trigger Push Notification if stock is critical and setting is active
      const isCritical = editingProduct ? editingProduct.status === 'crítico' : false;
      if (isCritical) {
        const isPushEnabled = localStorage.getItem('saman_push_alerts') !== 'false';
        if (isPushEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Stock Crítico Registrado', {
            body: `El producto "${productName.trim()}" (${productBrand.trim()}) se ha registrado en estado crítico en el Pasillo ${aisle.number}.`,
            icon: '/logo.svg'
          });
        }
      }

      if (typeof window !== 'undefined') {
        (window as any).__samanProductsCache = null;
      }
      handleCloseProductModal();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error('Error al guardar el producto. Intenta de nuevo.');
    } finally {
      setSavingProduct(false);
    }
  };

  useEffect(() => {
    if (!aisle?.id) return;
    setLoadingProducts(isFirebaseConfigured);

    if (isFirebaseConfigured) {
      const productsRef = collection(db, 'aisles', aisle.id, 'products');
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData: Product[] = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        
        // Default sort by name to keep them stable
        productsData.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(productsData);
        setLoadingProducts(false);

        // Update parent aisle count in Firestore if different
        if (aisle.productsCount !== productsData.length && aisles.some(a => a.id === aisle.id)) {
          // Import dynamic updateDoc inside if needed or use local mock count
          import('firebase/firestore').then(({ updateDoc }) => {
            updateDoc(doc(db, 'aisles', aisle.id), { productsCount: productsData.length }).catch(err => {
              if (err.code !== 'not-found' && !err.message?.includes('No document to update')) {
                console.error("Error al actualizar productsCount del pasillo:", err);
              }
            });
          });
        }
      }, (error) => {
        console.error("Error al escuchar productos de Firestore:", error);
        setLoadingProducts(false);
      });
      return unsubscribe;
    } else {
      const freshProducts = mockProductsByAisle[selectedAisleNumber] || [];
      const productsWithLocalData = freshProducts.map(p => {
        const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
        const localSku = localStorage.getItem(`saman_sku_${p.id}`);
        const localCompany = localStorage.getItem(`saman_company_${p.id}`);
        const localName = localStorage.getItem(`saman_name_${p.id}`);
        return {
          ...p,
          name: localName !== null ? localName : p.name,
          und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja,
          sku: localSku !== null ? localSku : p.sku,
          company: localCompany !== null ? localCompany : p.company
        };
      });
      setProducts(productsWithLocalData);
    }
  }, [selectedAisleNumber, aisle?.id]);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const canEdit = user?.role === 'operador' || user?.role === 'admin';
  useEffect(() => { setLimit(PAGE); }, [searchQuery, sortOrder, selectedAisleNumber]);
  const shownProducts = sortedProducts.slice(0, limit);
  const inputCls =
    'w-full min-h-12 bg-white border border-outline rounded-xl px-4 font-sans text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors';
  const labelCls = 'font-sans text-sm font-semibold text-on-surface';
  const openNewProduct = () => {
    handleCloseProductModal();
    setShowProductModal(true);
    fetchAllProducts(); // Carga las empresas en segundo plano
  };
  const openEditProduct = (product: Product) => {
    handleStartEditProduct(product);
    fetchAllProducts();
  };
  const statusBadge = (status: Product['status']) => {
    if (status === 'bajo')
      return <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-fixed-variant rounded-full font-sans text-xs font-bold shrink-0">Bajo</span>;
    if (status === 'crítico')
      return <span className="px-2 py-0.5 bg-error-container text-on-error-container rounded-full font-sans text-xs font-bold shrink-0">Crítico</span>;
    return null;
  };

  return (
    <>
      <div className="w-full mx-auto animate-in fade-in duration-300 pb-32 md:pb-24">
        {isOffline && (
          <div role="status" className="offline-banner w-full min-h-10 flex justify-center items-center gap-2 rounded-xl mb-3">
            <CloudOff size={16} className="text-on-tertiary-fixed-variant" />
            <span className="font-sans text-sm font-semibold text-on-tertiary-fixed-variant">Sin conexión · los cambios se guardan al reconectar</span>
          </div>
        )}

        {/* Cabecera fija: volver, título y buscador */}
        <div className="sticky top-0 z-30 -mt-4 md:-mt-8 -mx-4 px-4 md:-mx-8 md:px-8 pt-[max(0.5rem,env(safe-area-inset-top))] pb-3 bg-background">
          <header className="flex items-center gap-1 mb-2">
            <button
              onClick={() => onNavigate('pasillos')}
              aria-label="Volver a pasillos"
              className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full active:bg-surface-variant transition-colors cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-sans text-lg font-bold text-on-surface leading-tight truncate">{aisle.name}</h1>
              <p className="font-sans text-xs text-on-surface-variant tabular">
                Pasillo {aisle.number} · {sortedProducts.length} {sortedProducts.length === 1 ? 'ítem' : 'ítems'}
                {searchQuery && ` de ${products.length}`}
              </p>
            </div>
            <button
              onClick={() => setSortOrder(prev => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null))}
              aria-label="Ordenar por nombre"
              className={`min-h-11 px-3 rounded-full flex items-center gap-1.5 font-sans text-sm font-bold cursor-pointer transition-colors ${
                sortOrder ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant active:bg-surface-variant'
              }`}
            >
              <ArrowDownAZ size={20} />
              {sortOrder === 'asc' && 'A-Z'}
              {sortOrder === 'desc' && 'Z-A'}
            </button>
          </header>

          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            <input
              type="search"
              enterKeyHint="search"
              placeholder="Buscar producto, marca o SKU…"
              aria-label="Buscar en este pasillo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-12 bg-white border border-outline rounded-2xl pl-12 pr-14 font-sans text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={() => setShowScanner(true)}
              aria-label="Escanear código de barras"
              className="absolute inset-y-0 right-0 w-14 flex items-center justify-center text-primary-container cursor-pointer"
            >
              <ScanBarcode size={24} />
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full mt-1">
          {loadingProducts && products.length === 0 ? (
            <ProductListSkeleton count={7} />
          ) : sortedProducts.length === 0 ? (
            <div className="bg-card-surface rounded-3xl p-8 text-center border border-outline-variant/40 flex flex-col items-center mt-4">
              <div className="bg-primary/10 text-primary-container p-4 rounded-full mb-4">
                <ScanBarcode size={32} />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="font-sans text-lg font-bold text-on-surface mb-1">Sin resultados para “{searchQuery}”</h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-5">Revisa el nombre o el SKU, o agrégalo como producto nuevo.</p>
                  <div className="flex gap-2 w-full">
                    <button onClick={() => setSearchQuery('')} className="flex-1 min-h-12 rounded-xl border border-outline bg-white font-sans text-sm font-bold cursor-pointer">Limpiar búsqueda</button>
                    <button onClick={openNewProduct} className="flex-1 min-h-12 rounded-xl bg-primary-container text-on-primary font-sans text-sm font-bold cursor-pointer">Agregar producto</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-sans text-lg font-bold text-on-surface mb-1">Este pasillo está vacío</h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-5">Escanea un código de barras o agrega el primer producto a mano.</p>
                  <button onClick={openNewProduct} className="w-full min-h-12 rounded-xl bg-primary-container text-on-primary font-sans text-sm font-bold cursor-pointer">Agregar producto</button>
                </>
              )}
            </div>
          ) : (
            shownProducts.map(product => {
              const body = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-white border border-outline-variant/50 shrink-0 overflow-hidden flex items-center justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-sans text-base font-bold text-on-surface-variant/60">{product.initials}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="font-sans text-base font-semibold text-on-surface leading-snug line-clamp-2 min-w-0">{product.name}</h3>
                      {statusBadge(product.status)}
                    </div>
                    <p className="font-sans text-sm text-on-surface-variant truncate">
                      {[product.brand, product.sku ? `SKU ${product.sku}` : null, product.company].filter(Boolean).join(' · ')}
                    </p>
                    {((product.und_x_caja ?? 0) > 0 || product.sellingUnit === 'kg') && (
                      <p className="font-sans text-xs text-on-surface-variant tabular">
                        {[(product.und_x_caja ?? 0) > 0 ? `Caja de ${product.und_x_caja} und` : null, product.sellingUnit === 'kg' ? 'Se vende por kg' : null].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </>
              );
              return canEdit ? (
                <button
                  key={product.id}
                  onClick={() => openEditProduct(product)}
                  aria-label={`Editar ${product.name}`}
                  className="w-full text-left bg-card-surface border border-outline-variant/40 rounded-2xl p-3 flex items-center gap-3 min-h-[76px] active:bg-surface-container md:hover:border-primary/40 transition-colors cursor-pointer"
                >
                  {body}
                  <ChevronRight size={20} className="text-on-surface-variant shrink-0" />
                </button>
              ) : (
                <div key={product.id} className="bg-card-surface border border-outline-variant/40 rounded-2xl p-3 flex items-center gap-3 min-h-[76px]">
                  {body}
                  <RowActionButton icon={Trash2} variant="danger" label="Eliminar producto" onClick={() => handleDeleteProduct(product)} />
                </div>
              );
            })
          )}
          {!loadingProducts && <LoadMore shown={shownProducts.length} total={sortedProducts.length} onMore={() => setLimit(l => l + PAGE)} />}
        </div>
      </div>

      {/* Acción principal flotante, al alcance del pulgar */}
      <button
        onClick={openNewProduct}
        className="fixed right-4 md:right-8 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] md:bottom-8 z-40 h-14 px-6 rounded-full bg-primary-container text-on-primary shadow-[0_6px_20px_rgba(40,28,25,0.25)] font-sans text-base font-bold flex items-center gap-2 active:scale-95 transition-transform cursor-pointer print-hide"
      >
        <Plus size={22} />
        Agregar producto
      </button>

      {/* Crear / editar producto: hoja inferior en móvil, diálogo en PC */}
      {showProductModal && (
        <div
          className="fixed inset-0 bg-inverse-surface/50 z-[70] flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200"
          onClick={handleCloseProductModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={editingProduct ? 'Editar producto' : 'Nuevo producto'}
            className="bg-card-surface w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-[0_-10px_40px_rgba(40,28,25,0.2)] max-h-[92dvh] flex flex-col animate-in slide-in-from-bottom md:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-outline-variant md:hidden" aria-hidden="true" />
            <div className="flex justify-between items-center px-5 pt-3 pb-2">
              <h3 className="font-sans text-xl font-bold text-on-surface">{editingProduct ? 'Editar producto' : 'Nuevo producto'}</h3>
              <button onClick={handleCloseProductModal} aria-label="Cerrar" className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center active:bg-surface-variant cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="flex flex-col min-h-0">
              <div className="px-5 pb-4 flex flex-col gap-4 overflow-y-auto">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-sku" className={labelCls}>SKU / código</label>
                  <div className="relative">
                    <input id="p-sku" type="text" required inputMode="numeric" autoComplete="off" value={productSku} onChange={(e) => setProductSku(e.target.value)} placeholder="Ej. 75010203" className={`${inputCls} pr-14`} />
                    <button type="button" onClick={() => { handleCloseProductModal(); setShowScanner(true); }} aria-label="Escanear código" className="absolute inset-y-0 right-0 w-12 flex items-center justify-center text-primary-container cursor-pointer">
                      <ScanBarcode size={22} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-name" className={labelCls}>Nombre del producto</label>
                  <input id="p-name" type="text" required autoFocus={!!editingProduct || !productSku} autoCapitalize="characters" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Ej. Leche semidescremada 1L" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-brand" className={labelCls}>Marca</label>
                  <input id="p-brand" type="text" required value={productBrand} onChange={(e) => setProductBrand(e.target.value)} placeholder="Ej. Parmalat" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-company" className={labelCls}>Empresa / distribuidor</label>
                  <input id="p-company" type="text" list="companies-list" value={productCompany} onChange={(e) => setProductCompany(e.target.value)} placeholder="Ej. Alimentos Polar" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-caja" className={labelCls}>Unidades por caja</label>
                  <input id="p-caja" type="number" inputMode="numeric" min="0" value={productUndXCaja} onChange={(e) => setProductUndXCaja(e.target.value)} placeholder="Ej. 24" className={inputCls} />
                </div>
                <fieldset className="flex flex-col gap-1.5">
                  <legend className={`${labelCls} mb-1.5`}>Se vende por</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {([['und', 'Unidad'], ['kg', 'Kilogramo']] as const).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        aria-pressed={productSellingUnit === val}
                        onClick={() => setProductSellingUnit(val)}
                        className={`min-h-12 rounded-xl border font-sans text-sm font-bold transition-colors cursor-pointer ${
                          productSellingUnit === val ? 'bg-primary-container text-on-primary border-primary-container' : 'bg-white border-outline text-on-surface'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => { const p = editingProduct; handleCloseProductModal(); handleDeleteProduct(p); }}
                    className="min-h-12 rounded-xl text-error font-sans text-sm font-bold flex items-center justify-center gap-2 active:bg-error/10 cursor-pointer"
                  >
                    <Trash2 size={18} />
                    Eliminar producto
                  </button>
                )}
              </div>

              <div className="flex gap-3 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-outline-variant/40 bg-card-surface">
                <button type="button" onClick={handleCloseProductModal} className="flex-1 min-h-12 bg-white border border-outline text-on-surface font-sans text-base font-bold rounded-xl cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={savingProduct} className="flex-[1.4] min-h-12 bg-primary-container text-on-primary font-sans text-base font-bold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer">
                  {savingProduct ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando…
                    </>
                  ) : editingProduct ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Escáner */}
      {showScanner && <BarcodeScanner onScan={handleScanResult} onClose={() => setShowScanner(false)} />}

      {/* Autocompletado de empresas */}
      <datalist id="companies-list">
        {uniqueCompanies.map(c => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
