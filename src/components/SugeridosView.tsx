import { useState, useEffect } from 'react';
import { ViewState, Product, Aisle } from '../types';
import { mockProductsByAisle, mockAisles } from '../data';
import { CloudOff, ArrowLeft, Search, ScanBarcode, ArrowDownAZ, Minus, Plus, Send, AlertTriangle, Lightbulb, Pencil } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { useToast } from './Toast';

interface SugeridosViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  onAddOrders: (newOrders: any[]) => void;
  aisles: Aisle[];
  user?: any;
}

export function SugeridosView({ onNavigate, onAddOrders, aisles, user }: SugeridosViewProps) {
  const toast = useToast();
  const [selectedAisle, setSelectedAisle] = useState<Aisle | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, 'und' | 'cajas'>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Product Editing States
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

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
        setProducts(productsData);

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
            if (next[p.id] === undefined) {
              next[p.id] = 0;
            }
          });
          return next;
        });

        setUnits(prev => {
          const next = { ...prev };
          productsData.forEach(p => {
            if (next[p.id] === undefined) {
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
        return localVal !== null ? { ...p, und_x_caja: parseInt(localVal, 10) } : p;
      });
      setProducts(productsWithLocalData);
      setQuantities(
        productsWithLocalData.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
      );
      setUnits(
        productsWithLocalData.reduce((acc, p) => ({ ...acc, [p.id]: 'und' as const }), {})
      );
    }
  }, [selectedAisle?.id, selectedAisle?.number]);

  const handleUpdateUndXCaja = async (productId: string, valueStr: string) => {
    const val = parseInt(valueStr, 10);
    const und_x_caja = isNaN(val) ? 0 : Math.max(0, val);

    try {
      if (isFirebaseConfigured && selectedAisle?.id) {
        const productRef = doc(db, 'aisles', selectedAisle.id, 'products', productId);
        await setDoc(productRef, { und_x_caja }, { merge: true });
      } else {
        // Mode demo: update local state and localStorage
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, und_x_caja } : p));
        localStorage.setItem(`saman_und_x_caja_${productId}`, String(und_x_caja));
      }
      toast.success('Unidades por caja actualizadas.');
      setEditingProductId(null);
    } catch (error) {
      console.error("Error al actualizar unidades por caja:", error);
      toast.error('Error al guardar. Intenta de nuevo.');
    }
  };

  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const toggleUnit = (id: string, unit: 'und' | 'cajas') => {
    setUnits(prev => ({
      ...prev,
      [id]: unit
    }));
  };

  const updateProductStatus = async (id: string, status: 'normal' | 'bajo' | 'crítico') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    const prod = products.find(p => p.id === id);

    if (status === 'crítico' && prod) {
      const isPushEnabled = localStorage.getItem('saman_push_alerts') !== 'false';
      if (isPushEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Stock Crítico Detectado', {
          body: `El producto "${prod.name}" (${prod.brand}) se encuentra en estado crítico en el Pasillo ${selectedAisle?.number || ''}.`,
          icon: '/logo.svg'
        });
      }
    }

    if (isFirebaseConfigured && selectedAisle?.id) {
      try {
        const productRef = doc(db, 'aisles', selectedAisle.id, 'products', id);
        await updateDoc(productRef, { status });
      } catch (error) {
        console.error("Error al actualizar estado del producto:", error);
      }
    }
  };

  const submitWeeklySuggested = () => {
    if (!selectedAisle) return;
    const now = new Date().toISOString();
    const ordersToSubmit = products
      .filter(p => (quantities[p.id] || 0) > 0)
      .map(p => ({
        id: 'o_' + Date.now() + '_' + p.id,
        productName: p.name,
        brand: p.brand,
        sku: p.sku,
        suggestedQty: quantities[p.id],
        unit: units[p.id] || 'und',
        aisle: selectedAisle.number,
        user: user?.displayName || user?.fullName || 'Operador',
        status: p.status,
        lastUpdated: now
      }));

    if (ordersToSubmit.length > 0) {
      onAddOrders(ordersToSubmit);
      // Reset quantities of all products in this view to 0
      setQuantities(prev => {
        const next = { ...prev };
        products.forEach(p => {
          next[p.id] = 0;
        });
        return next;
      });
      toast.success("¡Sugerido semanal enviado con éxito!");
      // Return to aisle selector screen
      setSelectedAisle(null);
    } else {
      toast.error("Por favor, incrementa la cantidad sugerida de al menos un artículo para poder enviar el sugerido.");
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
                  onClick={() => {
                    setSelectedAisle(a);
                    setSearchQuery('');
                  }}
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
                    <h3 className="font-sans text-[20px] md:text-[24px] text-on-surface font-semibold truncate">{a.name}</h3>
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

      <header className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => setSelectedAisle(null)} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors cursor-pointer"
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
                        <span className="font-mono text-[13px] text-[#4f6b53]">Caja:</span>
                        <input
                          type="number"
                          value={tempValue}
                          min="0"
                          onChange={(e) => setTempValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateUndXCaja(product.id, tempValue);
                            } else if (e.key === 'Escape') {
                              setEditingProductId(null);
                            }
                          }}
                          className="w-16 px-1.5 py-0.5 border border-primary rounded font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          autoFocus
                        />
                        <button
                          onClick={() => handleUpdateUndXCaja(product.id, tempValue)}
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
                              setTempValue(String(product.und_x_caja ?? 0));
                            }}
                            className="text-primary hover:text-primary/70 transition-colors p-0.5 inline-flex items-center gap-0.5 cursor-pointer"
                            title="Editar unidades por caja"
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
      {products.length > 0 && (
        <div className="fixed bottom-[80px] md:bottom-6 left-0 md:left-64 right-0 px-4 pt-8 pb-4 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)] to-transparent pointer-events-none z-40 flex justify-center">
          <button 
            onClick={submitWeeklySuggested}
            className="w-full max-w-xl bg-primary text-white rounded-full py-4 shadow-[0_8px_30px_rgba(62,158,87,0.3)] flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform pointer-events-auto cursor-pointer"
          >
            <Send size={20} />
            <span className="font-sans text-[16px] font-semibold">Enviar Sugerido Semanal</span>
          </button>
        </div>
      )}
    </div>
  );
}
