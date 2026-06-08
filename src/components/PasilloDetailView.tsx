import { useState, useEffect, FormEvent } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, MoreVertical, Search, ScanBarcode, ArrowDownAZ, Minus, Plus, Send, AlertTriangle } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { X } from 'lucide-react';

interface PasilloDetailViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  selectedAisleNumber: number;
  onAddOrders: (newOrders: any[]) => void;
  aisles: Aisle[];
}

export function PasilloDetailView({ onNavigate, selectedAisleNumber, onAddOrders, aisles }: PasilloDetailViewProps) {
  const aisle = aisles.find(a => a.number === selectedAisleNumber) || aisles[0] || mockAisles[0];
  const initialProducts = mockProductsByAisle[selectedAisleNumber] || [];
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Product Creation States
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productStock, setProductStock] = useState('10');
  const [productStatusSelect, setProductStatusSelect] = useState<'normal' | 'bajo' | 'crítico'>('normal');

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const stockVal = parseInt(productStock, 10);
    const initials = productName.trim().substring(0, 2).toUpperCase();

    const newProduct: Product = {
      id: 'p_' + Date.now(),
      name: productName.trim(),
      brand: productBrand.trim(),
      sku: productSku.trim(),
      stock: isNaN(stockVal) ? 0 : stockVal,
      status: productStatusSelect,
      initials: initials
    };

    if (isFirebaseConfigured && aisle?.id) {
      try {
        const productRef = doc(db, 'aisles', aisle.id, 'products', newProduct.id);
        await setDoc(productRef, newProduct);
      } catch (error) {
        console.error("Error al guardar producto en Firestore:", error);
      }
    } else {
      setProducts(prev => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
      setQuantities(prev => ({ ...prev, [newProduct.id]: newProduct.stock < 10 ? 10 - newProduct.stock : 0 }));
    }

    setShowProductModal(false);
  };

  useEffect(() => {
    if (isFirebaseConfigured && aisle?.id) {
      const productsRef = collection(db, 'aisles', aisle.id, 'products');
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData: Product[] = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        
        // Default sort by name to keep them stable
        productsData.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(productsData);
        
        // Initialize quantities only for new products
        setQuantities(prev => {
          const next = { ...prev };
          productsData.forEach(p => {
            if (next[p.id] === undefined) {
              next[p.id] = p.stock < 10 ? 10 - p.stock : 0;
            }
          });
          return next;
        });
      }, (error) => {
        console.error("Error al escuchar productos de Firestore:", error);
      });
      return unsubscribe;
    } else {
      const freshProducts = mockProductsByAisle[selectedAisleNumber] || [];
      setProducts(freshProducts);
      setQuantities(
        freshProducts.reduce((acc, p) => ({ ...acc, [p.id]: p.stock < 10 ? 10 - p.stock : 0 }), {})
      );
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

  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const updateProductStatus = async (id: string, status: 'normal' | 'bajo' | 'crítico') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    if (isFirebaseConfigured && aisle?.id) {
      try {
        const productRef = doc(db, 'aisles', aisle.id, 'products', id);
        await updateDoc(productRef, { status });
      } catch (error) {
        console.error("Error al actualizar estado del producto:", error);
      }
    }
  };

  const submitWeeklySuggested = () => {
    const ordersToSubmit = products
      .filter(p => (quantities[p.id] || 0) > 0)
      .map(p => ({
        id: 'o_' + Date.now() + '_' + p.id,
        productName: p.name,
        brand: p.brand,
        sku: p.sku,
        suggestedQty: quantities[p.id],
        aisle: aisle.number,
        user: 'Admin Principal',
        status: p.status,
        lastUpdated: 'Justo ahora'
      }));

    if (ordersToSubmit.length > 0) {
      onAddOrders(ordersToSubmit);
      onNavigate('compras');
    } else {
      alert("Por favor, incrementa la cantidad sugerida de al menos un artículo para poder enviar el sugerido.");
    }
  };

  const pendingCount = products.filter(p => p.status === 'crítico' || p.status === 'bajo').length;

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-24 md:pb-8">
      {/* Offline Banner matching requested style */}
      {isOffline && (
        <div className="offline-banner w-full py-1.5 flex justify-center items-center gap-2 shadow-sm rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
          <CloudOff size={14} className="text-[#745815]" />
          <span className="font-mono text-[13px] font-medium text-[#745815]">Modo offline activo</span>
        </div>
      )}

      {/* Suggested warning banner */}
      {pendingCount > 0 && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 w-full py-3.5 px-5 flex items-start sm:items-center gap-3 rounded-2xl mb-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
          <div className="flex-1">
            <span className="font-sans text-[15px] font-bold block leading-tight">Sugeridos de Compra Pendientes</span>
            <span className="font-sans text-[13px] opacity-95 block mt-0.5">Saman AI detectó {pendingCount} artículos con stock bajo o crítico que requieren atención en el {aisle.name}.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => onNavigate('pasillos')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-sans text-[20px] font-semibold text-on-surface">Sugerido Semanal</h1>
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
        <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary">
          <ScanBarcode size={24} />
        </button>
      </div>

      <div className="flex items-center justify-between px-2 mb-6">
        <span className="font-mono text-[13px] text-on-surface-variant">En Pasillo {aisle.number} - {aisle.name}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setProductName('');
              setProductBrand('');
              setProductSku('');
              setProductStock('10');
              setProductStatusSelect('normal');
              setShowProductModal(true);
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
                  const qty = quantities[product.id] || 0;
                  return (
                    <div key={product.id} className="bg-card-surface rounded-[16px] p-3 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex items-center gap-3">
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
                        <h3 className="font-sans text-[16px] font-semibold text-[#281C19] leading-snug truncate">{product.name}</h3>
                        <span className="font-mono text-[13px] text-[#4f6b53] truncate">{product.brand} • SKU: {product.sku}</span>
                        <span className="font-mono text-[11px] text-on-surface-variant mt-1">Stock: {product.stock}</span>
                        
                        <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                          <button 
                            onClick={() => updateProductStatus(product.id, 'normal')}
                            className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                              product.status === 'normal' 
                                ? 'border-primary bg-primary/10 text-primary font-bold' 
                                : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                            }`}
                          >
                            Normal
                          </button>
                          <button 
                            onClick={() => updateProductStatus(product.id, 'bajo')}
                            className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                              product.status === 'bajo' 
                                ? 'border-amber-500 bg-amber-500/10 text-amber-700 font-bold' 
                                : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                            }`}
                          >
                            Bajo
                          </button>
                          <button 
                            onClick={() => updateProductStatus(product.id, 'crítico')}
                            className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                              product.status === 'crítico' 
                                ? 'border-error bg-error/10 text-error font-bold' 
                                : 'border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-variant/50'
                            }`}
                          >
                            Crítico
                          </button>
                        </div>
                      </div>

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
                            setQuantities(prev => ({ ...prev, [product.id]: isNaN(val) ? 0 : Math.max(0, val) }));
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
                    </div>
                  );
                })
              )}
            </>
          );
        })()}
      </div>

      {/* FAB */}
      <div className="fixed bottom-[80px] md:bottom-6 left-0 md:left-64 xl:left-auto xl:w-[800px] w-full px-4 pt-8 pb-4 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)] to-transparent pointer-events-none z-40">
        <button 
          onClick={submitWeeklySuggested}
          className="w-full bg-primary text-white rounded-full py-4 shadow-[0_8px_30px_rgba(62,158,87,0.3)] flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform pointer-events-auto"
        >
          <Send size={20} />
          <span className="font-sans text-[16px] font-semibold">Enviar Sugerido Semanal</span>
        </button>
      </div>
      {/* Product Creation Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowProductModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Agregar Nuevo Producto</h3>
              <button onClick={() => setShowProductModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
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

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Stock Físico</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    placeholder="Ej. 10"
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Estado Inicial</label>
                  <select 
                    value={productStatusSelect}
                    onChange={(e) => setProductStatusSelect(e.target.value as any)}
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="bajo">Bajo</option>
                    <option value="crítico">Crítico</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
