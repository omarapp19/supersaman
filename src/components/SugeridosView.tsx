import { useState, useEffect, FormEvent, useMemo } from 'react';
import { ViewState, Product, Aisle, OrderItem } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, Search, ScanBarcode, ArrowDownAZ, Minus, Plus, Send, AlertTriangle, Lightbulb, Pencil, X, Trash2, ChevronRight } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { useToast } from './Toast';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductListSkeleton } from './ui/Skeleton';
import { LoadMore } from './ui/LoadMore';

interface SugeridosViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  onAddOrders: (newOrders: any[]) => void;
  aisles: Aisle[];
  orders?: OrderItem[];
  user?: any;
}

interface DraftItem {
  productId: string;
  productName: string;
  brand: string;
  sku: string;
  suggestedQty: number;
  unit: 'und' | 'cajas' | 'kg';
  aisleNumber: number;
  status: 'normal' | 'bajo' | 'crítico';
  company?: string;
  und_x_caja?: number;
}

export function SugeridosView({ onNavigate, onAddOrders, aisles, orders = [], user }: SugeridosViewProps) {
  const toast = useToast();
  const [selectedAisle, setSelectedAisle] = useState<Aisle | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, 'und' | 'cajas' | 'kg'>>({});
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
      const pCompany = product?.company || currentItem?.company || '';
      const pUndXCaja = product?.und_x_caja !== undefined ? product.und_x_caja : currentItem?.und_x_caja;

      const updatedItem: DraftItem = {
        productId,
        productName: pName,
        brand: pBrand,
        sku: pSku,
        suggestedQty: updates.suggestedQty !== undefined ? updates.suggestedQty : (currentItem?.suggestedQty || 0),
        unit: updates.unit !== undefined ? updates.unit : (currentItem?.unit || (product?.sellingUnit === 'kg' ? 'kg' : 'cajas')),
        aisleNumber: pAisle,
        status: updates.status !== undefined ? updates.status : pStatus,
        company: pCompany,
        und_x_caja: pUndXCaja
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
  const [showReview, setShowReview] = useState(false);
  const PAGE = 40;
  const [limit, setLimit] = useState(PAGE);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Cuántas veces se ha pedido cada producto (por SKU o nombre)
  const orderFreq = useMemo(() => {
    const m = new Map<string, number>();
    orders.forEach(o => {
      const k = (o.sku || o.productName || '').toLowerCase().trim();
      if (k) m.set(k, (m.get(k) || 0) + 1);
    });
    return m;
  }, [orders]);
  const freqOf = (p: Product) => orderFreq.get((p.sku || p.name || '').toLowerCase().trim()) || 0;
  const [onlyOrdered, setOnlyOrdered] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  // Global search and cache states (declared before uniqueCompanies to avoid TDZ)
  const [allProducts, setAllProducts] = useState<{ product: Product; aisle: Aisle }[]>([]);
  const [loadingAllProducts, setLoadingAllProducts] = useState(false);

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

  // Scanner States
  const [showScanner, setShowScanner] = useState(false);
  const [showGlobalScanner, setShowGlobalScanner] = useState(false);

  // Global search states (when on main screen)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

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
        aisles.forEach(aisle => {
          const freshProducts = mockProductsByAisle[aisle.number] || [];
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
            list.push({ product: p, aisle });
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
      setProductCompany('');
      setShowProductModal(true);
      fetchAllProducts(); // Carga las empresas en segundo plano
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
          const { collectionGroup, getDocs } = await import('firebase/firestore');
          const productsGroupRef = collectionGroup(db, 'products');
          const snap = await getDocs(productsGroupRef);
          list = snap.docs.map(docSnap => {
            const parentAisleDoc = docSnap.ref.parent.parent;
            const aisleItem = aisles.find(a => a.id === parentAisleDoc?.id);
            return {
              product: { id: docSnap.id, ...docSnap.data() } as Product,
              aisle: aisleItem || { id: parentAisleDoc?.id || '', name: 'Pasillo', number: 0, status: 'unassigned', progress: 0 }
            };
          }).filter(item => item.aisle.number !== 0);
          setAllProducts(list);
          if (typeof window !== 'undefined') {
            (window as any).__samanProductsCache = list;
          }
        } else {
          const demoList: { product: Product; aisle: Aisle }[] = [];
          aisles.forEach(aisle => {
            const freshProducts = mockProductsByAisle[aisle.number] || [];
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
      setLoadingProducts(false);
      return;
    }
    setLoadingProducts(isFirebaseConfigured);

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
        setLoadingProducts(false);

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
              next[p.id] = p.sellingUnit === 'kg' ? 'kg' : 'cajas';
            }
          });
          return next;
        });
      }, (error) => {
        console.error("Error al escuchar productos de Firestore:", error);
        setLoadingProducts(false);
      });
      return unsubscribe;
    } else {
      const freshProducts = mockProductsByAisle[selectedAisle.number] || [];
      const productsWithLocalData = freshProducts.map(p => {
        const localVal = localStorage.getItem(`saman_und_x_caja_${p.id}`);
        const localSku = localStorage.getItem(`saman_sku_${p.id}`);
        const localCompany = localStorage.getItem(`saman_company_${p.id}`);
        const localName = localStorage.getItem(`saman_name_${p.id}`);
        const base = {
          ...p,
          name: localName !== null ? localName : p.name,
          und_x_caja: localVal !== null ? parseInt(localVal, 10) : p.und_x_caja,
          sku: localSku !== null ? localSku : p.sku,
          company: localCompany !== null ? localCompany : p.company
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
          [p.id]: draft[p.id] ? draft[p.id].unit : (p.sellingUnit === 'kg' ? 'kg' : 'cajas' as const)
        }), {})
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAisle?.id, selectedAisle?.number]);

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (savingProduct) return;
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

        if (isFirebaseConfigured && selectedAisle?.id) {
          const productRef = doc(db, 'aisles', selectedAisle.id, 'products', editingProduct.id);
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

        if (isFirebaseConfigured && selectedAisle?.id) {
          const productRef = doc(db, 'aisles', selectedAisle.id, 'products', newProduct.id);
          await setDoc(productRef, newProduct);
        } else {
          setProducts(prev => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
          setQuantities(prev => ({ ...prev, [newProduct.id]: 0 }));
          setUnits(prev => ({ ...prev, [newProduct.id]: productSellingUnit === 'kg' ? 'kg' : 'cajas' }));
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

  const updateQty = (id: string, delta: number) => {
    const newQty = Math.max(0, (quantities[id] || 0) + delta);
    setQuantities(prev => ({
      ...prev,
      [id]: newQty
    }));
    updateDraftItem(id, { suggestedQty: newQty });
  };

  const toggleUnit = (id: string, unit: 'und' | 'cajas' | 'kg') => {
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
        company: item.company || '',
        und_x_caja: item.und_x_caja || 0,
        lastUpdated: now
      }));

      onAddOrders(ordersToSubmit);
      setShowReview(false);
      
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
    const snapshot = { draft, quantities, units };
    setDraft({});
    localStorage.removeItem('saman_draft_sugeridos');
    setQuantities({});
    setUnits({});
    setShowReview(false);
    toast.info('Borrador descartado.', 8000, {
      label: 'Deshacer',
      onClick: () => {
        setDraft(snapshot.draft);
        localStorage.setItem('saman_draft_sugeridos', JSON.stringify(snapshot.draft));
        setQuantities(snapshot.quantities);
        setUnits(snapshot.units);
      },
    });
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
    // Sin orden elegido: primero los que más se piden
    return freqOf(b) - freqOf(a) || a.name.localeCompare(b.name);
  });


  const draftList = Object.values(draft) as DraftItem[];
  const draftCount = draftList.length;
  const aisleDraftCount = selectedAisle ? draftList.filter(d => d.aisleNumber === selectedAisle.number).length : 0;
  useEffect(() => { setLimit(PAGE); }, [searchQuery, sortOrder, onlyOrdered, selectedAisle?.id]);
  const visibleProducts = onlyOrdered ? sortedProducts.filter(p => (quantities[p.id] || 0) > 0) : sortedProducts;

  const removeDraftItem = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: 0 }));
    updateDraftItem(id, { suggestedQty: 0 });
  };

  const shownProducts = visibleProducts.slice(0, limit);
  const reviewItems = [...draftList].sort((a, b) => a.aisleNumber - b.aisleNumber || a.productName.localeCompare(b.productName));
  const statusPill = (st: DraftItem['status']) =>
    st === 'crítico'
      ? <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-bold">Crítico</span>
      : st === 'bajo'
        ? <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-fixed-variant text-xs font-bold">Bajo</span>
        : null;

  const draftBar = (
    <>
      {draftCount > 0 && !showReview && (
        <div className="fixed left-0 right-0 md:left-64 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-4 z-40 px-4 print-hide pointer-events-none">
          <button
            onClick={() => setShowReview(true)}
            className="pointer-events-auto mx-auto max-w-xl w-full min-h-14 rounded-2xl bg-primary-container text-on-primary shadow-[0_8px_24px_rgba(40,28,25,0.3)] flex items-center justify-between px-5 font-sans cursor-pointer active:scale-[0.99] transition-transform"
          >
            <span className="flex items-center gap-2 font-bold text-base">
              <span className="bg-white/20 rounded-full min-w-7 h-7 px-2 inline-flex items-center justify-center tabular text-sm">{draftCount}</span>
              {draftCount === 1 ? 'producto' : 'productos'} en tu sugerido
            </span>
            <span className="flex items-center gap-1 font-bold text-base">Revisar <ChevronRight size={20} /></span>
          </button>
        </div>
      )}

      {showReview && draftCount > 0 && (
        <div className="fixed inset-0 bg-inverse-surface/50 z-[70] flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200" onClick={() => setShowReview(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Revisar sugerido"
            className="bg-card-surface w-full md:max-w-lg rounded-t-3xl md:rounded-3xl max-h-[92dvh] flex flex-col shadow-[0_-10px_40px_rgba(40,28,25,0.2)] animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-outline-variant md:hidden" aria-hidden="true" />
            <div className="flex justify-between items-center px-5 pt-3 pb-2">
              <div>
                <h3 className="font-sans text-xl font-bold text-on-surface">Revisar sugerido</h3>
                <p className="font-sans text-sm text-on-surface-variant">{draftCount} {draftCount === 1 ? 'producto' : 'productos'} para pedir</p>
              </div>
              <button onClick={() => setShowReview(false)} aria-label="Cerrar" className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center active:bg-surface-variant cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <ul className="px-5 overflow-y-auto flex-1 min-h-0">
              {reviewItems.map((item, i) => (
                <li key={item.productId}>
                  {(i === 0 || reviewItems[i - 1].aisleNumber !== item.aisleNumber) && (
                    <p className="font-sans text-xs font-bold text-on-surface-variant pt-3 pb-1">Pasillo {item.aisleNumber}</p>
                  )}
                  <div className="flex items-center gap-2 min-h-14 border-b border-outline-variant/30">
                    <div className="flex-1 min-w-0 py-2">
                      <p className="font-sans text-sm font-semibold text-on-surface leading-snug line-clamp-2">{item.productName}</p>
                      <p className="font-sans text-sm text-on-surface-variant tabular flex items-center gap-2">
                        <span className="font-bold text-primary-container">{item.suggestedQty} {item.unit}</span>
                        {statusPill(item.status)}
                      </p>
                    </div>
                    <button onClick={() => removeDraftItem(item.productId)} aria-label={`Quitar ${item.productName}`} className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant active:bg-error/10 cursor-pointer shrink-0">
                      <X size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-outline-variant/40">
              <button onClick={handleDiscardDraft} className="min-h-12 px-4 rounded-xl border border-outline bg-white text-error font-sans text-sm font-bold flex items-center gap-2 cursor-pointer">
                <Trash2 size={18} />
                Descartar
              </button>
              <button onClick={submitWeeklySuggested} className="flex-1 min-h-12 rounded-xl bg-primary-container text-on-primary font-sans text-base font-bold flex items-center justify-center gap-2 cursor-pointer">
                <Send size={18} />
                Enviar sugerido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Step 1: Aisle Selector View
  if (!selectedAisle) {
    return (
      <>
        <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {isOffline && (
          <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
            <CloudOff size={14} className="text-on-tertiary-fixed-variant" />
            <span className="font-mono text-[13px] font-medium text-on-tertiary-fixed-variant">Modo offline activo</span>
          </div>
        )}

        <header className="mb-4">
          <h2 className="font-sans text-[26px] md:text-[40px] font-bold text-on-surface leading-tight">Sugeridos</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Elige un pasillo y marca lo que hace falta pedir.</p>
        </header>

        {/* Search across all aisles */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar producto o SKU…" aria-label="Buscar producto en todos los pasillos" 
            value={globalSearchQuery}
            onChange={(e) => handleGlobalSearchChange(e.target.value)}
            onFocus={fetchAllProducts}
            className="w-full bg-white border border-outline-variant/50 rounded-2xl min-h-14 pl-12 pr-16 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={() => {
              fetchAllProducts();
              setShowGlobalScanner(true);
            }}
            className="absolute inset-y-0 right-0 w-14 flex items-center justify-center text-primary-container transition-colors cursor-pointer"
            title="Escanear código de barras" aria-label="Escanear código de barras"
          >
            <ScanBarcode size={24} />
          </button>
        </div>

        {/* Global Search Results */}
        {globalSearchQuery && (
          <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full mb-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center py-1 px-2 border-b border-outline-variant/20 pb-2">
              <h3 className="font-sans font-semibold text-[13px] font-medium text-on-surface-variant ">
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
              <ProductListSkeleton count={3} />
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
                      <p className="font-mono text-xs text-on-surface-variant truncate">
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
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
            {displayedAisles.map((a) => {
              const inDraft = draftList.filter(d => d.aisleNumber === a.number).length;
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelectAisle(a)}
                  className="text-left rounded-2xl pl-4 pr-3 py-3 min-h-[76px] bg-card-surface border border-outline-variant/40 active:bg-surface-container md:hover:border-primary/40 transition-colors flex items-center gap-3 cursor-pointer"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg">
                    {a.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-base text-on-surface font-bold leading-snug line-clamp-2">{a.name}</h3>
                    <p className="font-sans text-sm text-on-surface-variant">
                      {(a.productsCount || 0).toLocaleString()} ítems
                      {inDraft > 0 && <span className="font-bold text-primary-container"> · {inDraft} en pedido</span>}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-on-surface-variant shrink-0" />
                </button>
              );
            })}
          </section>
        )}
        
        </div>

        {draftBar}

        {showGlobalScanner && (
          <BarcodeScanner
            onScan={handleGlobalScanResult}
            onClose={() => setShowGlobalScanner(false)}
          />
        )}
      </>
    );
  }

  // Step 2: Marcar lo que hace falta pedir en el pasillo elegido
  return (
    <>
      <div className="w-full mx-auto animate-in fade-in duration-300 pb-40 md:pb-32">
        {isOffline && (
          <div role="status" className="offline-banner w-full min-h-10 flex justify-center items-center gap-2 rounded-xl mb-3">
            <CloudOff size={16} className="text-on-tertiary-fixed-variant" />
            <span className="font-sans text-sm font-semibold text-on-tertiary-fixed-variant">Sin conexión · tu borrador se guarda en este teléfono</span>
          </div>
        )}

        {/* Barra fija: volver, pasillo, buscador y filtro */}
        <div className="sticky top-[calc(3.25rem+max(0.5rem,env(safe-area-inset-top)))] md:top-0 z-30 -mt-4 md:-mt-8 -mx-4 px-4 md:-mx-8 md:px-8 pt-3 pb-2 bg-background">
          <div className="flex items-center gap-1 mb-2">
            <button
              onClick={() => window.history.back()}
              aria-label="Volver a pasillos"
              className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full active:bg-surface-variant transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="font-sans text-lg font-bold text-on-surface leading-tight truncate">{selectedAisle.name}</h2>
              <p className="font-sans text-xs text-on-surface-variant tabular">
                Pasillo {selectedAisle.number} · {products.length} productos
              </p>
            </div>
          </div>

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

          <div className="flex gap-2 mt-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0" role="tablist" aria-label="Filtrar productos">
            {([
              ['todos', 'Todos', products.length],
              ['pedido', 'En pedido', aisleDraftCount],
            ] as const).map(([id, label, n]) => (
              <button
                key={id}
                role="tab"
                aria-selected={onlyOrdered === (id === 'pedido')}
                onClick={() => setOnlyOrdered(id === 'pedido')}
                className={`shrink-0 min-h-11 px-4 rounded-full font-sans text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  onlyOrdered === (id === 'pedido') ? 'bg-primary-container text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant'
                }`}
              >
                {label}
                <span className="tabular text-xs opacity-80">{n}</span>
              </button>
            ))}
            <button
              onClick={() => setSortOrder(prev => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null))}
              aria-label="Ordenar por nombre"
              className={`shrink-0 min-h-11 px-3 rounded-full flex items-center gap-1.5 font-sans text-sm font-bold cursor-pointer transition-colors ${
                sortOrder ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant active:bg-surface-variant'
              }`}
            >
              <ArrowDownAZ size={18} />
              {sortOrder === 'asc' ? 'A-Z' : sortOrder === 'desc' ? 'Z-A' : orderFreq.size > 0 ? 'Frecuentes' : 'Ordenar'}
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full mt-2">
          {loadingProducts && products.length === 0 ? (
            <ProductListSkeleton count={7} />
          ) : visibleProducts.length === 0 ? (
            <div className="bg-card-surface rounded-3xl p-8 text-center border border-outline-variant/40 flex flex-col items-center mt-4">
              <div className="bg-primary/10 text-primary-container p-4 rounded-full mb-4">
                <ScanBarcode size={32} />
              </div>
              <h3 className="font-sans text-lg font-bold text-on-surface mb-1">
                {onlyOrdered && !searchQuery ? 'Aún no marcas nada en este pasillo' : 'Sin resultados'}
              </h3>
              <p className="font-sans text-sm text-on-surface-variant mb-4">
                {onlyOrdered && !searchQuery
                  ? 'Toca el + de un producto para sumarlo al sugerido.'
                  : 'Revisa el nombre o el SKU. Los productos nuevos se crean desde Pasillos.'}
              </p>
              <button
                onClick={() => { setOnlyOrdered(false); setSearchQuery(''); }}
                className="min-h-12 px-5 rounded-xl border border-outline bg-white font-sans text-sm font-bold cursor-pointer"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            shownProducts.map(product => {
              const qty = quantities[product.id] || 0;
              const unit = units[product.id] || (product.sellingUnit === 'kg' ? 'kg' : 'cajas');
              const ordered = qty > 0;
              const baseUnit = product.sellingUnit === 'kg' ? 'kg' : 'und';
              const cajaUnd = product.und_x_caja ?? 0;
              return (
                <div
                  key={product.id}
                  className={`rounded-2xl border transition-colors ${
                    ordered ? 'bg-primary/10 border-primary/40' : 'bg-card-surface border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center gap-2 pl-4 pr-2 py-2 min-h-[72px]">
                    <button
                      type="button"
                      onClick={() => { if (!ordered) updateQty(product.id, 1); }}
                      className="flex-1 min-w-0 text-left py-1 cursor-pointer"
                      aria-label={ordered ? product.name : `Pedir ${product.name}`}
                    >
                      <span className="block font-sans text-base font-semibold text-on-surface leading-snug line-clamp-2">{product.name}</span>
                      <span className="block font-sans text-sm text-on-surface-variant truncate">
                        {[product.brand, product.sku ? `SKU ${product.sku}` : null, product.company, !ordered && freqOf(product) > 0 ? `Pedido ${freqOf(product)} ${freqOf(product) === 1 ? 'vez' : 'veces'}` : null].filter(Boolean).join(' · ')}
                      </span>
                    </button>

                    {ordered ? (
                      <div className="flex items-center shrink-0 bg-white rounded-full border border-outline-variant">
                        <button
                          onClick={() => updateQty(product.id, -1)}
                          aria-label="Quitar uno"
                          className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface active:bg-surface-variant cursor-pointer"
                        >
                          <Minus size={20} strokeWidth={2.5} />
                        </button>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={0}
                          value={qty}
                          aria-label={`Cantidad de ${product.name}`}
                          onFocus={(e) => e.currentTarget.select()}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            const newQty = isNaN(val) ? 0 : Math.max(0, val);
                            setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                            updateDraftItem(product.id, { suggestedQty: newQty });
                          }}
                          className="w-12 text-center bg-transparent font-sans text-lg font-bold text-primary-container tabular focus:outline-none"
                        />
                        <button
                          onClick={() => updateQty(product.id, 1)}
                          aria-label="Sumar uno"
                          className="w-11 h-11 rounded-full flex items-center justify-center bg-primary-container text-on-primary active:opacity-80 cursor-pointer"
                        >
                          <Plus size={20} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        aria-label={`Pedir ${product.name}`}
                        className="w-12 h-12 shrink-0 rounded-full border-2 border-primary-container text-primary-container flex items-center justify-center active:bg-primary/10 cursor-pointer"
                      >
                        <Plus size={24} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>

                  {ordered && (
                    <div className="border-t border-primary/20 px-3 pt-2.5 pb-3 flex flex-col gap-2 animate-in fade-in duration-150">
                      {/* Stock: siempre a mano, un toque */}
                      <div role="group" aria-label="Estado del stock" className="grid grid-cols-3 gap-2">
                        {([
                          ['normal', 'Normal', 'bg-primary-container text-on-primary border-primary-container'],
                          ['bajo', 'Bajo', 'bg-tertiary-container text-on-tertiary-fixed-variant border-tertiary-fixed-dim'],
                          ['crítico', 'Crítico', 'bg-error text-on-error border-error'],
                        ] as const).map(([val, label, on]) => (
                          <button
                            key={val}
                            type="button"
                            aria-pressed={product.status === val}
                            onClick={() => updateProductStatus(product.id, val)}
                            className={`min-h-11 rounded-xl border font-sans text-sm font-bold cursor-pointer transition-colors active:scale-[0.97] ${
                              product.status === val ? on : 'bg-white border-outline text-on-surface-variant'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Unidad: un toque para alternar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-sans text-sm text-on-surface-variant tabular">
                          {unit === 'cajas' && cajaUnd > 0 ? `${qty} ${qty === 1 ? 'caja' : 'cajas'} = ${qty * cajaUnd} und` : 'Pedir en'}
                        </span>
                        <div role="group" aria-label="Unidad del pedido" className="flex rounded-xl border border-outline bg-white overflow-hidden shrink-0">
                          {([
                            ['cajas', 'Cajas'],
                            [baseUnit, baseUnit === 'kg' ? 'Kilos' : 'Unidades'],
                          ] as const).map(([val, label]) => (
                            <button
                              key={val}
                              type="button"
                              aria-pressed={unit === val}
                              onClick={() => toggleUnit(product.id, val)}
                              className={`min-h-11 px-4 font-sans text-sm font-bold cursor-pointer transition-colors ${
                                unit === val ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
          {!loadingProducts && <LoadMore shown={shownProducts.length} total={visibleProducts.length} onMore={() => setLimit(l => l + PAGE)} />}
        </div>
      </div>

      {draftBar}

      {/* Product Creation Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-inverse-surface/50 z-[70] flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200" onClick={handleCloseProductModal}>
          <div className="bg-card-surface rounded-t-3xl md:rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-y-auto max-h-[92dvh] border border-outline-variant/30 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">
                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <button onClick={handleCloseProductModal} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Nombre del Producto</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Marca</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">SKU / Código</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Empresa / Distribuidor</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Unidades por Caja</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Unidad de Venta</label>
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
                  className="flex-1 bg-primary-container text-on-primary hover:bg-primary/95 font-sans text-[14px] font-semibold min-h-12 rounded-2xl shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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

      {/* Datalist global para autocompletado de empresas */}
      <datalist id="companies-list">
        {uniqueCompanies.map(c => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
