import { useState, useEffect, FormEvent, useMemo } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, MoreVertical, Search, ScanBarcode, ArrowDownAZ, Plus, X, Trash2, Pencil } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { BarcodeScanner } from './BarcodeScanner';
import { useToast } from './Toast';

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
        <div className="w-full text-center py-12 bg-card-surface rounded-3xl border border-error/20 p-6 max-w-md mx-auto mt-12 shadow-sm">
          <h3 className="font-sans text-[20px] font-bold text-error mb-2">Acceso Denegado</h3>
          <p className="font-sans text-[15px] text-on-surface-variant mb-6">No tienes permisos para visualizar o gestionar este pasillo.</p>
          <button onClick={() => onNavigate('pasillos')} className="px-6 py-2.5 bg-primary text-white rounded-full font-sans text-[14px] font-semibold">
            Volver a Pasillos
          </button>
        </div>
      );
    }
  }
  const initialProducts = mockProductsByAisle[selectedAisleNumber] || [];
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <>
      <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      {isOffline && (
        <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
          <CloudOff size={14} className="text-[#745815]" />
          <span className="font-mono text-[13px] font-medium text-[#745815]">Modo offline activo</span>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-sans text-[20px] font-semibold text-on-surface">
          {aisle.name.toLowerCase().includes('nevera') 
            ? 'Detalle de Nevera' 
            : (aisle.name.toLowerCase().includes('cabezal') || aisle.name.toLowerCase().includes('promoción') || aisle.name.toLowerCase().includes('promociones'))
              ? 'Detalle de Cabezales' 
              : 'Detalle de Pasillo'}
        </h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
          <MoreVertical size={24} />
        </button>
      </header>

      {/* Search & Sort */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Buscar producto o SKU..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-outline-variant/50 rounded-full py-3 pl-12 pr-12 font-sans text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
        />
        <button
            onClick={() => setShowScanner(true)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary hover:text-primary/70 transition-colors"
            title="Escanear código de barra"
          >
            <ScanBarcode size={24} />
          </button>
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
        <span className="font-mono text-[13px] text-on-surface-variant">
          {aisle.name.toLowerCase().includes('nevera') 
            ? `En ${aisle.name}` 
            : (aisle.name.toLowerCase().includes('cabezal') || aisle.name.toLowerCase().includes('promoción') || aisle.name.toLowerCase().includes('promociones'))
              ? `En ${aisle.name}` 
              : `En Pasillo ${aisle.number} - ${aisle.name}`}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              handleCloseProductModal();
              setShowProductModal(true);
              fetchAllProducts(); // Carga las empresas en segundo plano
            }}
            className="flex items-center gap-1 text-primary font-mono text-[13px] font-semibold hover:bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20 transition-colors cursor-pointer bg-white"
          >
            <Plus size={14} />
            Agregar Producto
          </button>
          
          <button 
            onClick={() => {
              setSortOrder(prev => {
                if (prev === null) return 'asc';
                if (prev === 'asc') return 'desc';
                return null;
              });
            }}
            className={`flex items-center gap-1 font-mono text-[13px] font-medium hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors ${
              sortOrder ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <ArrowDownAZ size={16} />
            {sortOrder === 'asc' && 'A-Z'}
            {sortOrder === 'desc' && 'Z-A'}
            {sortOrder === null && 'Ordenar'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
        {(() => {
          return (
            <>
              <div className="flex items-center justify-between py-1 px-2">
                <h2 className="font-mono text-[13px] font-medium text-on-surface-variant uppercase tracking-wider">Pasillo {aisle.number} - {aisle.name}</h2>
                <span className="font-mono text-[13px] text-on-surface-variant/70">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300 w-full">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <ScanBarcode size={36} />
                  </div>
                  <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay productos en este pasillo</h3>
                  <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">Comienza a registrar la mercadería del pasillo con el botón "Agregar Producto".</p>
                </div>
              ) : (
                sortedProducts.map(product => {
                  return (
                    <div key={product.id} className="bg-card-surface rounded-[16px] p-3 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex items-center gap-3 group">
                      {/* Product Image / Avatar */}
                      <div className="w-16 h-16 rounded-[12px] bg-white border border-outline-variant/30 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-sans text-[20px] font-bold text-on-surface-variant/40">{product.initials}</span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-center overflow-hidden pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-sans text-[16px] font-semibold text-[#281C19] leading-snug">{product.name}</h3>
                          {product.status === 'normal' && (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full font-mono text-[10px] font-bold uppercase">Normal</span>
                          )}
                          {product.status === 'bajo' && (
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-full font-mono text-[10px] font-bold uppercase">Bajo</span>
                          )}
                          {product.status === 'crítico' && (
                            <span className="px-2 py-0.5 bg-rose-500/10 text-rose-700 border border-rose-500/20 rounded-full font-mono text-[10px] font-bold uppercase animate-pulse">Crítico</span>
                          )}
                        </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[13px] text-[#4f6b53]">
                              {product.brand} • SKU: {product.sku || 'N/A'} • Caja: {product.und_x_caja ?? 0} und{product.company ? ` • Empresa: ${product.company}` : ''}{product.sellingUnit === 'kg' ? ' • Venta: Kg' : ''}
                            </span>
                            {(user?.role === 'operador' || user?.role === 'admin') && (
                              <button
                                onClick={() => {
                                  handleStartEditProduct(product);
                                  fetchAllProducts(); // Carga las empresas en segundo plano
                                }}
                                className="text-primary hover:text-primary/70 transition-colors p-0.5 inline-flex items-center gap-0.5 cursor-pointer"
                                title="Editar producto"
                              >
                                <Pencil size={12} />
                              </button>
                            )}
                          </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-red-100 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </>
          );
        })()}
      </div>
      </div>

      {/* Product Creation Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={handleCloseProductModal}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">
                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <button onClick={handleCloseProductModal} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  autoFocus
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ej. Leche Semidescremada 1L"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Marca</label>
                <input 
                  type="text" 
                  required
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  placeholder="Ej. Parmalat"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">SKU / Código</label>
                <input 
                  type="text" 
                  required
                  value={productSku}
                  onChange={(e) => setProductSku(e.target.value)}
                  placeholder="Ej. 75010203"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Empresa / Distribuidor</label>
                <input 
                  type="text" 
                  list="companies-list"
                  value={productCompany}
                  onChange={(e) => setProductCompany(e.target.value)}
                  placeholder="Ej. Alimentos Polar"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Unidades por Caja</label>
                <input 
                  type="number" 
                  min="0"
                  value={productUndXCaja}
                  onChange={(e) => setProductUndXCaja(e.target.value)}
                  placeholder="Ej. 24"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Unidad de Venta</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProductSellingUnit('und')}
                    className={`flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all cursor-pointer ${
                      productSellingUnit === 'und'
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white border-outline-variant text-on-surface hover:bg-surface-variant/20'
                    }`}
                  >
                    Por Unidad (und)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductSellingUnit('kg')}
                    className={`flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all cursor-pointer ${
                      productSellingUnit === 'kg'
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white border-outline-variant text-on-surface hover:bg-surface-variant/20'
                    }`}
                  >
                    Por Kilogramo (kg)
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={handleCloseProductModal}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingProduct ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </>
                  ) : (editingProduct ? 'Guardar Cambios' : 'Crear Producto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Product Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setProductToDelete(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-sm shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={26} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-sans text-[20px] font-bold text-on-surface">Eliminar Producto</h3>
                <p className="font-sans text-[14px] text-on-surface-variant mt-1">
                  ¿Seguro que deseas eliminar <strong>{productToDelete.name}</strong>? Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteProduct(productToDelete)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Barcode Scanner */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Datalist global para autocompletado de empresas */}
      <datalist id="companies-list">
        {uniqueCompanies.map(c => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
