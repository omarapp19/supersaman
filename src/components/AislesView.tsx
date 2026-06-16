import { useState, useEffect, useMemo, FormEvent } from 'react';
import { ViewState, Aisle } from '../types';
import { ClipboardList, Wine, Coffee, Milk, Plus, X, Trash2, Search, ScanBarcode } from 'lucide-react';
import { BarcodeScanner } from './BarcodeScanner';
import { useToast } from './Toast';
import { db, isFirebaseConfigured } from '../firebase';
import { mockProductsByAisle } from '../data';

interface AislesViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  onAddAisle: (newAisle: Aisle) => void;
  onDeleteAisle: (aisleId: string) => void;
  user?: any;
  users?: any[];
}

export function AislesView({ onNavigate, aisles, onAddAisle, onDeleteAisle, user, users = [] }: AislesViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [aisleToDelete, setAisleToDelete] = useState<Aisle | null>(null);
  const [aisleNumber, setAisleNumber] = useState('');
  const [aisleName, setAisleName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isOperator = user?.role === 'operador';

  const toast = useToast();

  // Search & Scanner States
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<{ product: any; aisle: Aisle }[]>([]);
  const [loadingAllProducts, setLoadingAllProducts] = useState(false);
  const [showGlobalScanner, setShowGlobalScanner] = useState(false);

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
        const snap = await getDocs(collectionGroup(db, 'products'));
        const list = snap.docs.map(docSnap => {
          const productData = { id: docSnap.id, ...docSnap.data() };
          const pathSegments = docSnap.ref.path.split('/');
          const aisleId = pathSegments[1];
          const aisle = aisles.find(a => a.id === aisleId);
          return { product: productData, aisle };
        }).filter(item => item.aisle !== undefined) as { product: any; aisle: Aisle }[];

        if (typeof window !== 'undefined') {
          (window as any).__samanProductsCache = list;
        }
        setAllProducts(list);
      } else {
        const list: { product: any; aisle: Aisle }[] = [];
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
        if (typeof window !== 'undefined') {
          (window as any).__samanProductsCache = list;
        }
        setAllProducts(list);
      }
    } catch (e) {
      console.error("Error loading products in AislesView:", e);
      toast.error("Error al cargar la lista de productos.");
    } finally {
      setLoadingAllProducts(false);
    }
  };

  const handleGlobalSearchChange = (val: string) => {
    setGlobalSearchQuery(val);
    fetchAllProducts();
  };

  const handleSelectProductResult = (item: { product: any; aisle: Aisle }) => {
    const aisle = item.aisle;
    const isAisleAssignedToMe = !isOperator || (user?.assignedAisles && user.assignedAisles.includes(aisle.number));

    if (isAisleAssignedToMe) {
      onNavigate('pasillo-detail', aisle.number);
    } else {
      const assignedOps = users.filter(u => 
        u.role === 'operador' && 
        u.assignedAisles && 
        u.assignedAisles.includes(aisle.number)
      );
      const names = assignedOps.map(o => o.fullName).join(', ');
      if (names) {
        toast.error(`Este producto lo tiene asignado ${names} en el Pasillo ${aisle.number} (${aisle.name}).`);
      } else {
        toast.error(`Este producto está en el Pasillo ${aisle.number} (${aisle.name}), el cual no tienes asignado.`);
      }
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
              product: { id: doc.id, ...doc.data() },
              aisle
            }));
          });
          const results = await Promise.all(promises);
          list = results.flat();
          setAllProducts(list);
        } else {
          const demoList: { product: any; aisle: Aisle }[] = [];
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
      const aisle = match.aisle;
      const isAisleAssignedToMe = !isOperator || (user?.assignedAisles && user.assignedAisles.includes(aisle.number));

      if (isAisleAssignedToMe) {
        onNavigate('pasillo-detail', aisle.number);
        toast.success(`Producto encontrado en tu pasillo (${aisle.name}): ${match.product.name}`);
      } else {
        const assignedOps = users.filter(u => 
          u.role === 'operador' && 
          u.assignedAisles && 
          u.assignedAisles.includes(aisle.number)
        );
        const names = assignedOps.map(o => o.fullName).join(', ');
        if (names) {
          toast.error(`Este producto lo tiene asignado ${names} en el Pasillo ${aisle.number} (${aisle.name}).`);
        } else {
          toast.error(`Este producto está en el Pasillo ${aisle.number} (${aisle.name}), el cual no tienes asignado.`);
        }
      }
    } else {
      toast.error(`Producto con código "${code}" no encontrado en ningún pasillo.`);
    }
  };

  const globalSearchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(item => 
      item.product.name.toLowerCase().includes(q) ||
      item.product.brand.toLowerCase().includes(q) ||
      (item.product.sku && item.product.sku.toLowerCase().includes(q))
    );
  }, [globalSearchQuery, allProducts]);
  
  const displayedAisles = isOperator
    ? aisles.filter(a => user?.assignedAisles?.includes(a.number))
    : aisles;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = parseInt(aisleNumber, 10);

    if (isNaN(num) || num <= 0) {
      setError("Por favor introduce un número de pasillo válido.");
      return;
    }

    if (aisles.some(a => a.number === num)) {
      setError(`El pasillo número ${num} ya existe.`);
      return;
    }

    const newAisle: Aisle = {
      id: 'a_' + Date.now(),
      number: num,
      name: aisleName.trim(),
      status: 'assigned',
      progress: 0,
      productsCount: 0
    };

    onAddAisle(newAisle);
    setShowAddModal(false);
  };

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mb-6">
        <div>
          <h2 className="font-sans text-[24px] md:text-[32px] text-on-surface font-bold">Seleccionar Pasillo</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant">Elige un pasillo para comenzar el inventario o crea uno nuevo.</p>
        </div>
        {!isOperator && (
          <button 
            onClick={() => {
              setAisleNumber('');
              setAisleName('');
              setError(null);
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[15px] font-semibold transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <Plus size={18} />
            Nuevo Pasillo
          </button>
        )}
      </section>

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
              {globalSearchResults.map(({ product, aisle }) => {
                const isAisleAssignedToMe = !isOperator || (user?.assignedAisles && user.assignedAisles.includes(aisle.number));
                const assignedOps = users.filter(u => 
                  u.role === 'operador' && 
                  u.assignedAisles && 
                  u.assignedAisles.includes(aisle.number)
                );
                const assignedToNames = assignedOps.map(o => o.fullName).join(', ');

                return (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProductResult({ product, aisle })}
                    className={`w-full text-left rounded-2xl p-3 border flex items-center gap-3 transition-all cursor-pointer ${
                      isAisleAssignedToMe 
                        ? 'bg-card-surface hover:bg-surface-variant/40 border-outline-variant/20' 
                        : 'bg-red-50/20 border-red-200/50 hover:bg-red-50/40'
                    }`}
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
                    
                    <div className="flex-shrink-0 pr-1">
                      {isAisleAssignedToMe ? (
                        <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider">
                          Tu pasillo
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-700 border border-rose-500/20 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider" title={assignedToNames ? `Asignado a: ${assignedToNames}` : 'Sin operador asignado'}>
                          {assignedToNames ? `Asignado a: ${assignedToNames.split(' ')[0]}` : 'No asignado'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {displayedAisles.length === 0 ? (
        <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300">
          <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
            <ClipboardList size={36} />
          </div>
          <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">
            {isOperator ? 'No tienes un pasillo asignado' : 'No hay pasillos registrados'}
          </h3>
          <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">
            {isOperator 
              ? 'Por favor, solicita al administrador que te asigne un pasillo en la configuración.' 
              : 'Comienza agregando tu primer pasillo usando el botón de arriba.'}
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {displayedAisles.map((aisle) => {
            let Icon = Milk;
            if (aisle.name.includes("Bebidas") || aisle.name.includes("Licores")) Icon = Wine;
            if (aisle.name.includes("Desayuno") || aisle.name.includes("Café")) Icon = Coffee;

            const isUnassigned = aisle.status === 'unassigned';

            // Find operators assigned to this aisle
            const assignedOperators = users.filter(u => 
              u.role === 'operador' && 
              u.assignedAisles && 
              u.assignedAisles.includes(aisle.number)
            );

            return (
              <div 
                key={aisle.id}
                onClick={() => onNavigate('pasillo-detail', aisle.number)}
                className={`text-left rounded-3xl p-6 transition-transform hover:scale-[0.98] shadow-[0_4px_20px_rgba(40,28,25,0.05)] relative overflow-hidden group cursor-pointer ${
                  isUnassigned ? 'bg-white opacity-80 border border-outline-variant/30' : 'bg-card-surface'
                }`}
              >
                <div className="flex justify-between items-start w-full relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[13px] text-on-surface-variant uppercase tracking-wider">
                      {aisle.name.toLowerCase().includes('nevera') 
                        ? 'Nevera' 
                        : (aisle.name.toLowerCase().includes('cabezal') || aisle.name.toLowerCase().includes('promoción') || aisle.name.toLowerCase().includes('promociones'))
                          ? 'Cabezales' 
                          : `Pasillo ${aisle.number}`}
                    </span>
                    <h3 className="font-sans text-[20px] md:text-[24px] text-on-surface font-semibold break-words pr-2">{aisle.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {assignedOperators.length > 0 ? (
                      <div className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-1 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        <span>Asignado: {assignedOperators.map(o => o.fullName.split(' ')[0]).join(', ')}</span>
                      </div>
                    ) : null}
                    {!isOperator && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setAisleToDelete(aisle); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-red-100 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Eliminar pasillo"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-6 relative z-10">
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] text-on-surface-variant mb-1">Progreso</span>
                    <span className={`font-sans text-[18px] font-medium ${isUnassigned ? 'text-on-surface-variant' : 'text-primary'}`}>
                      {isUnassigned ? '-' : `${aisle.progress}%`}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] text-on-surface-variant mb-1">Items Registrados</span>
                    <span className="font-sans text-[18px] font-medium text-on-surface">{(aisle.productsCount || 0).toLocaleString()}</span>
                  </div>
                </div>

                {!isUnassigned && (
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Icon size={140} />
                  </div>
                )}
              </div>
            )
          })}
        </section>
      )}

      {/* Add Aisle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowAddModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Agregar Nuevo Pasillo</h3>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {error && (
                <div className="bg-error-container text-on-error-container border border-error/10 p-3.5 rounded-2xl text-[13px] font-semibold animate-in fade-in duration-200">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Número de Pasillo</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  autoFocus
                  value={aisleNumber}
                  onChange={(e) => setAisleNumber(e.target.value)}
                  placeholder="Ej. 6"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre del Pasillo / Categoría</label>
                <input 
                  type="text" 
                  required
                  value={aisleName}
                  onChange={(e) => setAisleName(e.target.value)}
                  placeholder="Ej. Carnicería o Desayunos"
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>



              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Guardar Pasillo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Aisle Confirmation Modal */}
      {aisleToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setAisleToDelete(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-sm shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={26} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-sans text-[20px] font-bold text-on-surface">Eliminar Pasillo</h3>
                <p className="font-sans text-[14px] text-on-surface-variant mt-1">
                  ¿Seguro que deseas eliminar <strong>Pasillo {aisleToDelete.number} – {aisleToDelete.name}</strong>? Se borrarán todos sus productos. Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setAisleToDelete(null)}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => { onDeleteAisle(aisleToDelete.id); setAisleToDelete(null); }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
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
