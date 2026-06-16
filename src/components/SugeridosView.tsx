import { useState, useEffect, FormEvent } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, Search, ScanBarcode, ArrowDownAZ, Minus, Plus, Send, AlertTriangle, Lightbulb, Pencil, X, Trash2 } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { useToast } from './Toast';
import { BarcodeScanner } from './BarcodeScanner';

interface SugeridosViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  onAddOrders: (newOrders: any[]) => void;
  aisles: Aisle[];
  user?: any;
}

interface DraftItem {
  productId: string;
  productName: string;
  brand: string;
  sku: string;
  suggestedQty: number;
  unit: 'und' | 'cajas';
  aisleNumber: number;
  status: 'normal' | 'bajo' | 'crítico';
}

export function SugeridosView({ onNavigate, onAddOrders, aisles, user }: SugeridosViewProps) {
  const toast = useToast();
  const [selectedAisle, setSelectedAisle] = useState<Aisle | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, 'und' | 'cajas'>>({});
  const [draft, setDraft] = useState<Record<string, DraftItem>>(() => {
    const stored = localStorage.getItem('saman_draft_sugeridos');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const updateDraftItem = (productId: string, updates: Partial<DraftItem>) => {
    setDraft(prev => {
      const currentItem = prev[productId];
      const product = products.find(p => p.id === productId);
      
      const pName = product?.name || currentItem?.productName || '';
      const pBrand = product?.brand || currentItem?.brand || '';
      const pSku = product?.sku || currentItem?.sku || '';
      const pAisle = selectedAisle?.number || currentItem?.aisleNumber || 0;
      const pStatus = product?.status || currentItem?.status || 'normal';

      const updatedItem: DraftItem = {
        productId,
        productName: pName,
        brand: pBrand,
        sku: pSku,
        suggestedQty: updates.suggestedQty !== undefined ? updates.suggestedQty : (currentItem?.suggestedQty || 0),
        unit: updates.unit !== undefined ? updates.unit : (currentItem?.unit || 'und'),
        aisleNumber: pAisle,
        status: updates.status !== undefined ? updates.status : pStatus,
      };

      const next = { ...prev };
      if (updatedItem.suggestedQty > 0) {
        next[productId] = updatedItem;
      } else {
        delete next[productId];
      }

      localStorage.setItem('saman_draft_sugeridos', JSON.stringify(next));
      return next;
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Product Editing States
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [tempSku, setTempSku] = useState<string>('');

  // Product Creation States
  const [showProductModal, setShowProductModal] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productUndXCaja, setProductUndXCaja] = useState('0');

  // Scanner States
  const [showScanner, setShowScanner] = useState(false);
  const [showGlobalScanner, setShowGlobalScanner] = useState(false);

  // Global search states (when on main screen)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<{ product: Product; aisle: Aisle }[]>([]);
  const [loadingAllProducts, setLoadingAllProducts] = useState(false);

  const fetchAllProducts = async () => {
    if (allProducts.length > 0 || loadingAllProducts) return;
    setLoadingAllProducts(true);
    try {
      if (isFirebaseConfigured) {
        const { collection, getDocs } = await import('firebase/firestore');
        const promises = aisles.map(async (aisle) => {
          const productsRef = collection(db, 'aisles', aisle.id, 'products');
          const snap = await getDocs(productsRef);
          return snap.docs.map(doc => ({
            product: { id: doc.id, ...doc.data() } as Product,
            aisle
          }));
        });
        const results = await Promise.all(promises);
        setAllProducts(results.flat());
      } else {
        const list: { product: Product; aisle: Aisle }[] = [];
        aisles.forEach(aisle => {
          const freshProducts = mockProductsByAisle[aisle.number] || [];
          const productsWithLocalData = freshProducts.map(p => {
            const localSku = localStorage.getItem(`saman_sku_${p.id}`);
            const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
            return {
              ...p,
              sku: localSku !== null ? localSku : p.sku,
              und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja
            };
          });
          productsWithLocalData.forEach(p => {
            list.push({ product: p, aisle });
          });
        });
        setAllProducts(list);
      }
    } catch (e) {
      console.error("Error fetching all products:", e);
      toast.error("Error al cargar la lista de productos.");
    } finally {
      setLoadingAllProducts(false);
    }
  };

  const handleGlobalSearchChange = (val: string) => {
    setGlobalSearchQuery(val);
    fetchAllProducts();
  };

  const handleSelectProductResult = (item: { product: Product; aisle: Aisle }) => {
    setSelectedAisle(item.aisle);
    setSearchQuery(item.product.sku || item.product.name);
    window.history.pushState({ view: 'sugeridos', selectedAisleNum: item.aisle.number }, '');
  };

  const handleScanResult = (code: string) => {
    setShowScanner(false);
    const cleanCode = code.trim().toLowerCase();
    const existingProduct = products.find(p => p.sku && p.sku.trim().toLowerCase() === cleanCode);

    if (existingProduct) {
      setSearchQuery(existingProduct.sku || existingProduct.name);
      toast.success(`Producto encontrado: ${existingProduct.name}`);
    } else {
      setProductName('');
      setProductBrand('');
      setProductSku(code);
      setProductUndXCaja('0');
      setShowProductModal(true);
      toast.info('Producto no registrado en este pasillo.');
    }
  };

  const handleGlobalScanResult = async (code: string) => {
    setShowGlobalScanner(false);
    const cleanCode = code.trim().toLowerCase();
    
    toast.info("Buscando producto...");
    let list = allProducts;
    if (list.length === 0) {
      try {
        if (isFirebaseConfigured) {
          const { collection, getDocs } = await import('firebase/firestore');
          const promises = aisles.map(async (aisle) => {
            const productsRef = collection(db, 'aisles', aisle.id, 'products');
            const snap = await getDocs(productsRef);
            return snap.docs.map(doc => ({
              product: { id: doc.id, ...doc.data() } as Product,
              aisle
            }));
          });
          const results = await Promise.all(promises);
          list = results.flat();
          setAllProducts(list);
        } else {
          const demoList: { product: Product; aisle: Aisle }[] = [];
          aisles.forEach(aisle => {
            const freshProducts = mockProductsByAisle[aisle.number] || [];
            const productsWithLocalData = freshProducts.map(p => {
              const localSku = localStorage.getItem(`saman_sku_${p.id}`);
              const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
              return {
                ...p,
                sku: localSku !== null ? localSku : p.sku,
                und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja
              };
            });
            productsWithLocalData.forEach(p => {
              demoList.push({ product: p, aisle });
            });
          });
          list = demoList;
          setAllProducts(list);
        }
      } catch (e) {
        console.error("Error loading products on scan:", e);
      }
    }

    const match = list.find(item => item.product.sku && item.product.sku.trim().toLowerCase() === cleanCode);
    if (match) {
      setSelectedAisle(match.aisle);
      setSearchQuery(match.product.sku || match.product.name);
      window.history.pushState({ view: 'sugeridos', selectedAisleNum: match.aisle.number }, '');
      toast.success(`Producto encontrado en ${match.aisle.name}: ${match.product.name}`);
    } else {
      toast.error(`Producto con código "${code}" no encontrado en ningún pasillo.`);
    }
  };

  const globalSearchResults = (allProducts || []).filter(item => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return false;
    return (
      item.product.name.toLowerCase().includes(q) ||
      item.product.brand.toLowerCase().includes(q) ||
      (item.product.sku && item.product.sku.toLowerCase().includes(q))
    );
  });

  const isOperator = user?.role === 'operador';
  const displayedAisles = isOperator
    ? aisles.filter(a => user?.assignedAisles?.includes(a.number))
    : aisles;

  // Auto-select operator's assigned aisle on mount (only if they have exactly one aisle assigned)
  useEffect(() => {
    if (isOperator && user?.assignedAisles && user.assignedAisles.length === 1) {
      const myAisle = aisles.find(a => a.number === user.assignedAisles[0]);
      if (myAisle) {
        setSelectedAisle(myAisle);
      }
    }
  }, [user, aisles]);

  // Listen to popstate event to handle selected aisle back button navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view === 'sugeridos') {
        const aisleNum = event.state.selectedAisleNum;
        if (aisleNum) {
          const myAisle = aisles.find(a => a.number === aisleNum);
          setSelectedAisle(myAisle || null);
        } else {
          setSelectedAisle(null);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [aisles]);

  const handleSelectAisle = (a: Aisle) => {
    setSelectedAisle(a);
    window.history.pushState({ view: 'sugeridos', selectedAisleNum: a.number }, '');
  };

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

  // Listen to products of selected aisle
  useEffect(() => {
    if (!selectedAisle?.id) {
      setProducts([]);
      return;
    }

    if (isFirebaseConfigured) {
      const productsRef = collection(db, 'aisles', selectedAisle.id, 'products');
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData: Product[] = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        
        productsData.sort((a, b) => a.name.localeCompare(b.name));
        
        // Overlay draft status
        const productsWithDraftStatus = productsData.map(p => {
          if (draft[p.id]) {
            return { ...p, status: draft[p.id].status };
          }
          return p;
        });
        setProducts(productsWithDraftStatus);

        // Update parent aisle count if different
        if (selectedAisle.productsCount !== productsData.length && aisles.some(a => a.id === selectedAisle.id)) {
          updateDoc(doc(db, 'aisles', selectedAisle.id), { productsCount: productsData.length }).catch(err => {
            if (err.code !== 'not-found' && !err.message?.includes('No document to update')) {
              console.error("Error al actualizar productsCount del pasillo:", err);
            }
          });
        }
        
        setQuantities(prev => {
          const next = { ...prev };
          productsData.forEach(p => {
            if (draft[p.id]) {
              next[p.id] = draft[p.id].suggestedQty;
            } else if (next[p.id] === undefined) {
              next[p.id] = 0;
            }
          });
          return next;
        });

        setUnits(prev => {
          const next = { ...prev };
          productsData.forEach(p => {
            if (draft[p.id]) {
              next[p.id] = draft[p.id].unit;
            } else if (next[p.id] === undefined) {
              next[p.id] = 'und';
            }
          });
          return next;
        });
      }, (error) => {
        console.error("Error al escuchar productos de Firestore:", error);
      });
      return unsubscribe;
    } else {
      const freshProducts = mockProductsByAisle[selectedAisle.number] || [];
      const productsWithLocalData = freshProducts.map(p => {
        const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
        const localSku = localStorage.getItem(`saman_sku_${p.id}`);
        const base = {
          ...p,
          und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja,
          sku: localSku !== null ? localSku : p.sku
        };
        if (draft[p.id]) {
          return { ...base, status: draft[p.id].status };
        }
        return base;
      });
      setProducts(productsWithLocalData);
      setQuantities(
        productsWithLocalData.reduce((acc, p) => ({
          ...acc,
          [p.id]: draft[p.id] ? draft[p.id].suggestedQty : 0
        }), {})
      );
      setUnits(
        productsWithLocalData.reduce((acc, p) => ({
          ...acc,
          [p.id]: draft[p.id] ? draft[p.id].unit : ('und' as const)
        }), {})
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAisle?.id, selectedAisle?.number]);

  const handleUpdateProductDetails = async (productId: string, skuStr: string, undXCajaStr: string) => {
    const sku = skuStr.trim();
    const val = parseInt(undXCajaStr, 10);
    const und_x_caja = isNaN(val) ? 0 : Math.max(0, val);

    try {
      if (isFirebaseConfigured && selectedAisle?.id) {
        const productRef = doc(db, 'aisles', selectedAisle.id, 'products', productId);
        await setDoc(productRef, { sku, und_x_caja }, { merge: true });
      } else {
        // Mode demo: update local state and localStorage
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, sku, und_x_caja } : p));
        localStorage.setItem(`saman_sku_${productId}`, sku);
        localStorage.setItem(`saman_und_x_caja_${productId}`, String(und_x_caja));
      }
      toast.success('Producto actualizado.');
      setEditingProductId(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error('Error al guardar. Intenta de nuevo.');
    }
  };

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (savingProduct) return;
    setSavingProduct(true);

    const initials = productName.trim().substring(0, 2).toUpperCase();
    const val = parseInt(productUndXCaja, 10);
    const und_x_caja = isNaN(val) ? 0 : Math.max(0, val);

    const newProduct: Product = {
      id: 'p_' + Date.now(),
      name: productName.trim(),
      brand: productBrand.trim(),
      sku: productSku.trim(),
      status: 'normal',
      initials: initials,
      und_x_caja: und_x_caja
    };

    try {
      if (isFirebaseConfigured && selectedAisle?.id) {
        const productRef = doc(db, 'aisles', selectedAisle.id, 'products', newProduct.id);
        await setDoc(productRef, newProduct);
      } else {
        setProducts(prev => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
        setQuantities(prev => ({ ...prev, [newProduct.id]: 0 }));
        setUnits(prev => ({ ...prev, [newProduct.id]: 'und' }));
        localStorage.setItem(`saman_sku_${newProduct.id}`, newProduct.sku);
        if (und_x_caja > 0) {
          localStorage.setItem(`saman_und_x_caja_${newProduct.id}`, String(und_x_caja));
        }
      }
      toast.success('Producto agregado con éxito.');
      setShowProductModal(false);
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error('Error al guardar el producto. Intenta de nuevo.');
    } finally {
      setSavingProduct(false);
    }
  };

  const updateQty = (id: string, delta: number) => {
    const newQty = Math.max(0, (quantities[id] || 0) + delta);
    setQuantities(prev => ({
      ...prev,
      [id]: newQty
    }));
    updateDraftItem(id, { suggestedQty: newQty });
  };

  const toggleUnit = (id: string, unit: 'und' | 'cajas') => {
    setUnits(prev => ({
      ...prev,
      [id]: unit
    }));
    updateDraftItem(id, { unit });
  };

  const updateProductStatus = async (id: string, status: 'normal' | 'bajo' | 'crítico') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    updateDraftItem(id, { status });
    const prod = products.find(p => p.id === id);

    if (status === 'crítico' && prod) {
      const isPushEnabled = localStorage.getItem('saman_push_alerts') !== 'false';
      if (isPushEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Stock Crítico Detectado', {
          body: `El producto "${prod.name}" (${prod.brand}) se encuentra en estado crítico en ${
            selectedAisle?.name.toLowerCase().includes('nevera') 
              ? 'la Nevera' 
              : (selectedAisle?.name.toLowerCase().includes('cabezal') || selectedAisle?.name.toLowerCase().includes('promoción') || selectedAisle?.name.toLowerCase().includes('promociones'))
                ? 'el Cabezal' 
                : `el Pasillo ${selectedAisle?.number || ''}`
          }.`,
          icon: '/logo.svg'
        });
      }
    }
  };

  const submitWeeklySuggested = () => {
    const draftItems = Object.values(draft) as DraftItem[];
    if (draftItems.length > 0) {
      const now = new Date().toISOString();
      const ordersToSubmit = draftItems.map(item => ({
        id: 'o_' + Date.now() + '_' + item.productId,
        productName: item.productName,
        brand: item.brand,
        sku: item.sku,
        suggestedQty: item.suggestedQty,
        unit: item.unit,
        aisle: item.aisleNumber,
        user: user?.displayName || user?.fullName || 'Operador',
        status: item.status,
        lastUpdated: now
      }));

      onAddOrders(ordersToSubmit);
      
      // Reset draft
      setDraft({});
      localStorage.removeItem('saman_draft_sugeridos');
      
      // Reset local quantities and units states
      setQuantities({});
      setUnits({});
      
      toast.success("¡Sugerido semanal enviado con éxito!");
      
      // Go back to aisle selector if we are currently inside an aisle
      if (selectedAisle) {
        window.history.back();
      }
    } else {
      toast.error("Por favor, incrementa la cantidad sugerida de al menos un artículo para poder enviar el sugerido.");
    }
  };

  const handleDiscardDraft = () => {
    if (window.confirm("¿Estás seguro de que deseas descartar todo el borrador actual? Se perderán todas las cantidades sugeridas ingresadas.")) {
      setDraft({});
      localStorage.removeItem('saman_draft_sugeridos');
      setQuantities({});
      setUnits({});
      toast.info("Borrador descartado.");
    }
  };

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

  // Step 1: Aisle Selector View
  if (!selectedAisle) {
    return (
      <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {isOffline && (
          <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
            <CloudOff size={14} className="text-[#745815]" />
            <span className="font-mono text-[13px] font-medium text-[#745815]">Modo offline activo</span>
          </div>
        )}

        <header className="mb-8">
          <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Generador de Sugeridos</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Selecciona un pasillo para detallar el estado y colocar las sugerencias de compra.</p>
        </header>

        {/* Search across all aisles */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar producto o escanear en todos los pasillos..." 
            value={globalSearchQuery}
            onChange={(e) => handleGlobalSearchChange(e.target.value)}
            onFocus={fetchAllProducts}
            className="w-full bg-white border border-outline-variant/50 rounded-full py-3 pl-12 pr-12 font-sans text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
          />
          <button
            onClick={() => {
              fetchAllProducts();
              setShowGlobalScanner(true);
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary hover:text-primary/70 transition-colors cursor-pointer"
            title="Escanear código de barra"
          >
            <ScanBarcode size={24} />
          </button>
        </div>

        {/* Global Search Results */}
        {globalSearchQuery && (
          <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full mb-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center py-1 px-2 border-b border-outline-variant/20 pb-2">
              <h3 className="font-mono text-[13px] font-medium text-on-surface-variant uppercase tracking-wider">
                Resultados de Búsqueda ({globalSearchResults.length})
              </h3>
              <button 
                onClick={() => setGlobalSearchQuery('')} 
                className="text-primary font-mono text-[13px] font-semibold hover:underline cursor-pointer"
              >
                Limpiar
              </button>
            </div>

            {loadingAllProducts && globalSearchResults.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-8 text-on-surface-variant font-mono text-[14px]">
                <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Cargando base de datos...
              </div>
            ) : globalSearchResults.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant font-sans text-[15px]">
                No se encontraron productos coincidentes.
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
                {globalSearchResults.map(({ product, aisle }) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProductResult({ product, aisle })}
                    className="w-full text-left bg-card-surface hover:bg-surface-variant/40 rounded-2xl p-3 border border-outline-variant/20 flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white border border-outline-variant/30 flex items-center justify-center flex-shrink-0 font-sans text-[16px] font-bold text-on-surface-variant/40">
                      {product.initials}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-sans text-[15px] font-semibold text-on-surface truncate">{product.name}</h4>
                      <p className="font-mono text-[12px] text-[#4f6b53] truncate">
                        {product.brand} • SKU: {product.sku || 'N/A'} • {aisle.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {displayedAisles.length === 0 ? (
          <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8">
            <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
              <Lightbulb size={36} />
            </div>
            <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">
              {isOperator ? 'No tienes un pasillo asignado' : 'No hay pasillos creados'}
            </h3>
            <p className="font-sans text-[15px] text-on-surface-variant max-w-md">
              {isOperator 
                ? 'Para poder generar sugeridos de compra, solicita al administrador que te asigne un pasillo.'
                : 'Para poder generar sugeridos de compra, debes crear al menos un pasillo primero en la sección de Pasillos.'}
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {displayedAisles.map((a) => {
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelectAisle(a)}
                  className="text-left rounded-3xl p-6 transition-transform hover:scale-[0.98] shadow-[0_4px_20px_rgba(40,28,25,0.05)] bg-card-surface border border-transparent hover:border-outline-variant/30 relative overflow-hidden group cursor-pointer"
                >
                  <div className="flex flex-col gap-1 relative z-10">
                    <span className="font-mono text-[13px] text-on-surface-variant uppercase tracking-wider">
                      {a.name.toLowerCase().includes('nevera') 
                        ? 'Nevera' 
                        : (a.name.toLowerCase().includes('cabezal') || a.name.toLowerCase().includes('promoción') || a.name.toLowerCase().includes('promociones'))
                          ? 'Cabezales' 
                          : `Pasillo ${a.number}`}
                    </span>
                    <h3 className="font-sans text-[20px] md:text-[24px] text-on-surface font-semibold break-words pr-2">{a.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-6 relative z-10">
                    <div className="flex flex-col">
                      <span className="font-mono text-[13px] text-on-surface-variant mb-1">Items Registrados</span>
                      <span className="font-sans text-[18px] font-medium text-on-surface">{(a.productsCount || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Lightbulb size={140} />
                  </div>
                </button>
              );
            })}
          </section>
        )}
        
        {/* FAB */}
        {Object.keys(draft).length > 0 && (
          <div className="fixed bottom-[80px] md:bottom-6 left-0 md:left-64 right-0 px-4 pt-8 pb-4 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)] to-transparent pointer-events-none z-40 flex justify-center gap-3">
            <button 
              onClick={handleDiscardDraft}
              className="px-6 py-4 bg-white border border-outline-variant text-[#ba1a1a] hover:bg-red-50/50 rounded-full shadow-md flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-all pointer-events-auto cursor-pointer font-sans text-[16px] font-semibold"
              title="Descartar borrador"
            >
              <Trash2 size={20} />
              Descartar
            </button>
            <button 
              onClick={submitWeeklySuggested}
              className="flex-1 max-w-xl bg-primary text-white rounded-full py-4 shadow-[0_8px_30px_rgba(62,158,87,0.3)] flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform pointer-events-auto cursor-pointer"
            >
              <Send size={20} />
              <span className="font-sans text-[16px] font-semibold">
                Enviar ({Object.values(draft).length})
              </span>
            </button>
          </div>
        )}

        {showGlobalScanner && (
          <BarcodeScanner
            onScan={handleGlobalScanResult}
            onClose={() => setShowGlobalScanner(false)}
          />
        )}
      </div>
    );
  }

  // Step 2: Product Suggestion Form View for the Chosen Aisle
  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 md:pb-8">
      {isOffline && (
        <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
          <CloudOff size={14} className="text-[#745815]" />
          <span className="font-mono text-[13px] font-medium text-[#745815]">Modo offline activo</span>
        </div>
      )}

      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors cursor-pointer flex-shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-on-surface leading-tight tracking-tight">
              Sugeridos: {selectedAisle.name.toLowerCase().includes('nevera') 
                ? 'Nevera' 
                : (selectedAisle.name.toLowerCase().includes('cabezal') || selectedAisle.name.toLowerCase().includes('promoción') || selectedAisle.name.toLowerCase().includes('promociones'))
                  ? 'Cabezales' 
                  : `Pasillo ${selectedAisle.number}`}
            </h2>
            <p className="font-sans text-[15px] text-on-surface-variant mt-1">{selectedAisle.name} • Detalla el estado y especifica las cantidades a solicitar.</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setProductName('');
            setProductBrand('');
            setProductSku('');
            setProductUndXCaja('0');
            setShowProductModal(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[13px] font-semibold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          Agregar Producto
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
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary hover:text-primary/70 transition-colors cursor-pointer"
          title="Escanear código de barra"
        >
          <ScanBarcode size={24} />
        </button>
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
        <span className="font-mono text-[13px] text-on-surface-variant">
          Generando reporte en {selectedAisle.name.toLowerCase().includes('nevera') 
            ? 'Nevera' 
            : (selectedAisle.name.toLowerCase().includes('cabezal') || selectedAisle.name.toLowerCase().includes('promoción') || selectedAisle.name.toLowerCase().includes('promociones'))
              ? 'Cabezales' 
              : `Pasillo ${selectedAisle.number}`}
        </span>
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

      {/* List */}
      <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full pb-36">
        <div className="flex items-center justify-between py-1 px-2">
          <h2 className="font-mono text-[13px] font-medium text-on-surface-variant uppercase tracking-wider">Productos en {selectedAisle.name}</h2>
          <span className="font-mono text-[13px] text-on-surface-variant/70">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'ítem' : 'ítems'}
          </span>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 w-full">
            <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
              <ScanBarcode size={36} />
            </div>
            <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay productos coincidiendo</h3>
            <p className="font-sans text-[15px] text-on-surface-variant max-w-md">No se encontraron productos en este pasillo. Crea nuevos productos desde la pestaña de Pasillos.</p>
          </div>
        ) : (
          sortedProducts.map(product => {
            const qty = quantities[product.id] || 0;
            const unit = units[product.id] || 'und';
            return (
              <div key={product.id} className="bg-card-surface rounded-[16px] p-3 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Product Info */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-[12px] bg-white border border-outline-variant/30 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-sans text-[20px] font-bold text-on-surface-variant/40">{product.initials}</span>
                    )}
                  </div>

                  <div className="flex flex-col justify-center overflow-hidden pr-2">
                    <h3 className="font-sans text-[16px] font-semibold text-[#281C19] leading-snug">{product.name}</h3>
                    {editingProductId === product.id ? (
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[13px] text-[#4f6b53]">SKU:</span>
                        <input
                          type="text"
                          value={tempSku}
                          onChange={(e) => setTempSku(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateProductDetails(product.id, tempSku, tempValue);
                            } else if (e.key === 'Escape') {
                              setEditingProductId(null);
                            }
                          }}
                          className="w-28 px-1.5 py-0.5 border border-primary rounded font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          autoFocus
                        />
                        <span className="font-mono text-[13px] text-[#4f6b53]">Caja:</span>
                        <input
                          type="number"
                          value={tempValue}
                          min="0"
                          onChange={(e) => setTempValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateProductDetails(product.id, tempSku, tempValue);
                            } else if (e.key === 'Escape') {
                              setEditingProductId(null);
                            }
                          }}
                          className="w-16 px-1.5 py-0.5 border border-primary rounded font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                        />
                        <button
                          onClick={() => handleUpdateProductDetails(product.id, tempSku, tempValue)}
                          className="px-2 py-0.5 bg-primary text-white rounded font-sans text-[11px] font-semibold hover:bg-primary/95 cursor-pointer"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="px-2 py-0.5 bg-white border border-outline-variant/50 rounded font-sans text-[11px] text-on-surface-variant hover:bg-surface-variant/50 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[13px] text-[#4f6b53]">
                          {product.brand} • SKU: {product.sku} • Caja: {product.und_x_caja ?? 0} und
                        </span>
                        {(user?.role === 'operador' || user?.role === 'admin') && (
                          <button
                            onClick={() => {
                              setEditingProductId(product.id);
                              setTempSku(product.sku || '');
                              setTempValue(String(product.und_x_caja ?? 0));
                            }}
                            className="text-primary hover:text-primary/70 transition-colors p-0.5 inline-flex items-center gap-0.5 cursor-pointer"
                            title="Editar producto"
                          >
                            <Pencil size={12} />
                          </button>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-1.5 mt-2">
                      <button 
                        onClick={() => updateProductStatus(product.id, 'normal')}
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                          product.status === 'normal' 
                            ? 'border-primary bg-primary/10 text-primary font-bold' 
                            : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                        }`}
                      >
                        Normal
                      </button>
                      <button 
                        onClick={() => updateProductStatus(product.id, 'bajo')}
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                          product.status === 'bajo' 
                            ? 'border-amber-500 bg-amber-500/10 text-amber-700 font-bold' 
                            : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                        }`}
                      >
                        Bajo
                      </button>
                      <button 
                        onClick={() => updateProductStatus(product.id, 'crítico')}
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                          product.status === 'crítico' 
                            ? 'border-error bg-error/10 text-error font-bold animate-pulse' 
                            : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                        }`}
                      >
                        Crítico
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Stepper and Unit Selector */}
                <div className="flex items-center sm:items-end justify-between sm:flex-col gap-3">
                  {/* Stepper */}
                  <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border border-outline-variant/30">
                    <button 
                      onClick={() => updateQty(product.id, -1)}
                      disabled={qty === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${qty === 0 ? 'text-outline-variant/50' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                    >
                      <Minus size={18} strokeWidth={2.5} />
                    </button>
                    <input 
                      type="number"
                      value={qty}
                      min={0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        const newQty = isNaN(val) ? 0 : Math.max(0, val);
                        setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                        updateDraftItem(product.id, { suggestedQty: newQty });
                      }}
                      className={`font-sans text-[16px] w-12 text-center bg-transparent focus:outline-none focus:ring-0 border-none select-all font-semibold tabular-nums ${qty > 0 ? 'text-primary' : 'text-on-surface-variant'}`}
                    />
                    <button 
                      onClick={() => updateQty(product.id, 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Unit Selector Toggle */}
                  <div className="flex bg-surface-variant/40 rounded-full p-0.5 border border-outline-variant/20">
                    <button
                      type="button"
                      onClick={() => toggleUnit(product.id, 'und')}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                        unit === 'und'
                          ? 'bg-primary text-white shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Und
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleUnit(product.id, 'cajas')}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                        unit === 'cajas'
                          ? 'bg-primary text-white shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Cajas
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FAB */}
      {Object.keys(draft).length > 0 && (
        <div className="fixed bottom-[80px] md:bottom-6 left-0 md:left-64 right-0 px-4 pt-8 pb-4 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)] to-transparent pointer-events-none z-40 flex justify-center gap-3">
          <button 
            onClick={handleDiscardDraft}
            className="px-6 py-4 bg-white border border-outline-variant text-[#ba1a1a] hover:bg-red-50/50 rounded-full shadow-md flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-all pointer-events-auto cursor-pointer font-sans text-[16px] font-semibold"
            title="Descartar borrador"
          >
            <Trash2 size={20} />
            Descartar
          </button>
          <button 
            onClick={submitWeeklySuggested}
            className="flex-1 max-w-xl bg-primary text-white rounded-full py-4 shadow-[0_8px_30px_rgba(62,158,87,0.3)] flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform pointer-events-auto cursor-pointer"
          >
            <Send size={20} />
            <span className="font-sans text-[16px] font-semibold">
              Enviar ({Object.values(draft).length})
            </span>
          </button>
        </div>
      )}

      {/* Product Creation Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowProductModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Agregar Nuevo Producto</h3>
              <button onClick={() => setShowProductModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4">
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

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={savingProduct}
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingProduct ? 'Guardando...' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showScanner && (
        <BarcodeScanner
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showGlobalScanner && (
        <BarcodeScanner
          onScan={handleGlobalScanResult}
          onClose={() => setShowGlobalScanner(false)}
        />
      )}
    </div>
  );
}
