import { useState, useEffect, useMemo, FormEvent } from 'react';
import { ViewState, Aisle } from '../types';
import { ClipboardList, Wine, Coffee, Milk, Plus, X, Trash2, Search, ScanBarcode, Pencil, ChevronRight } from 'lucide-react';
import { BarcodeScanner } from './BarcodeScanner';
import { RowActionButton } from './ui/RowActionButton';
import { ProductListSkeleton } from './ui/Skeleton';
import { useToast } from './Toast';
import { db, isFirebaseConfigured } from '../firebase';
import { mockProductsByAisle } from '../data';

interface AislesViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  onAddAisle: (newAisle: Aisle) => void;
  onUpdateAisle: (aisleId: string, updates: Partial<Aisle>) => void;
  onDeleteAisle: (aisleId: string) => void;
  user?: any;
  users?: any[];
}

export function AislesView({ onNavigate, aisles, onAddAisle, onUpdateAisle, onDeleteAisle, user, users = [] }: AislesViewProps) {
  const [aisleFilter, setAisleFilter] = useState<'todos' | 'asignados' | 'sin-asignar'>('todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [aisleToDelete, setAisleToDelete] = useState<Aisle | null>(null);
  const [aisleToEdit, setAisleToEdit] = useState<Aisle | null>(null);
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
        const productsGroupRef = collectionGroup(db, 'products');
        const snap = await getDocs(productsGroupRef);
        const list = snap.docs.map(docSnap => {
          const parentAisleDoc = docSnap.ref.parent.parent;
          const aisleItem = aisles.find(a => a.id === parentAisleDoc?.id);
          return {
            product: { id: docSnap.id, ...docSnap.data() },
            aisle: aisleItem || { id: parentAisleDoc?.id || '', name: 'Pasillo', number: 0, status: 'unassigned', progress: 0 }
          };
        }).filter(item => item.aisle.number !== 0);

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
          const { collectionGroup, getDocs } = await import('firebase/firestore');
          const productsGroupRef = collectionGroup(db, 'products');
          const snap = await getDocs(productsGroupRef);
          list = snap.docs.map(docSnap => {
            const parentAisleDoc = docSnap.ref.parent.parent;
            const aisleItem = aisles.find(a => a.id === parentAisleDoc?.id);
            return {
              product: { id: docSnap.id, ...docSnap.data() },
              aisle: aisleItem || { id: parentAisleDoc?.id || '', name: 'Pasillo', number: 0, status: 'unassigned', progress: 0 }
            };
          }).filter(item => item.aisle.number !== 0);
          setAllProducts(list);
          if (typeof window !== 'undefined') {
            (window as any).__samanProductsCache = list;
          }
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
  
  const baseAisles = isOperator
    ? aisles.filter(a => user?.assignedAisles?.includes(a.number))
    : aisles;

  const hasOperator = (a: Aisle) =>
    users.some(u => u.role === 'operador' && u.assignedAisles && u.assignedAisles.includes(a.number));
  const assignedCount = baseAisles.filter(hasOperator).length;

  const displayedAisles = isOperator
    ? baseAisles
    : baseAisles.filter(a =>
        aisleFilter === 'todos' ? true : aisleFilter === 'asignados' ? hasOperator(a) : !hasOperator(a)
      );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = parseInt(aisleNumber, 10);

    if (isNaN(num) || num <= 0) {
      setError("Por favor introduce un número de pasillo válido.");
      return;
    }

    if (aisles.some(a => a.number === num && a.id !== aisleToEdit?.id)) {
      setError(`El pasillo número ${num} ya existe.`);
      return;
    }

    if (aisleToEdit) {
      onUpdateAisle(aisleToEdit.id, {
        number: num,
        name: aisleName.trim()
      });
      setAisleToEdit(null);
      toast.success("Pasillo actualizado con éxito.");
    } else {
      const newAisle: Aisle = {
        id: 'a_' + Date.now(),
        number: num,
        name: aisleName.trim(),
        status: 'assigned',
        progress: 0,
        productsCount: 0
      };
      onAddAisle(newAisle);
      toast.success("Pasillo guardado con éxito.");
    }
    setShowAddModal(false);
  };

  return (
    <>
      <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mb-6">
        <div>
          <h2 className="font-sans text-[26px] md:text-[32px] text-on-surface font-bold leading-tight">Seleccionar Pasillo</h2>
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
            className="flex items-center justify-center gap-2 px-6 min-h-12 bg-primary-container text-on-primary rounded-2xl font-sans text-base font-bold transition-transform active:scale-[0.98] self-stretch sm:self-auto cursor-pointer"
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
                        : 'bg-error-container/25 border-error/20 hover:bg-error-container/40'
                    }`}
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

                    <div className="flex-shrink-0 pr-1">
                      {isAisleAssignedToMe ? (
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-sans text-xs font-bold uppercase tracking-wider">
                          Tu pasillo
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-error-container text-on-error-container border border-error/20 rounded-full font-sans text-xs font-bold uppercase tracking-wider" title={assignedToNames ? `Asignado a: ${assignedToNames}` : 'Sin operador asignado'}>
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

      {!isOperator && baseAisles.length > 6 && !globalSearchQuery && (
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-3" role="tablist" aria-label="Filtrar pasillos">
          {([
            ['todos', 'Todos', baseAisles.length],
            ['asignados', 'Asignados', assignedCount],
            ['sin-asignar', 'Sin asignar', baseAisles.length - assignedCount],
          ] as const).map(([id, label, n]) => (
            <button
              key={id}
              role="tab"
              aria-selected={aisleFilter === id}
              onClick={() => setAisleFilter(id)}
              className={`shrink-0 min-h-11 px-4 rounded-full font-sans text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                aisleFilter === id ? 'bg-primary-container text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant'
              }`}
            >
              {label}
              <span className="text-xs opacity-80">{n}</span>
            </button>
          ))}
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
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
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
                role="button"
                tabIndex={0}
                onClick={() => onNavigate('pasillo-detail', aisle.number)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('pasillo-detail', aisle.number); } }}
                className="bg-card-surface border border-outline-variant/40 active:bg-surface-container text-left rounded-2xl pl-4 pr-2 py-3 transition-colors md:hover:border-primary/40 cursor-pointer flex items-center gap-3 min-h-[76px]"
              >
                <div className={`h-12 w-12 shrink-0 rounded-xl flex items-center justify-center font-bold text-lg ${isUnassigned ? 'bg-surface-variant text-on-surface-variant' : 'bg-primary-container text-on-primary'}`}>
                  {aisle.number}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-base text-on-surface font-bold leading-snug line-clamp-2" title={aisle.name}>
                    {aisle.name}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant truncate">
                    {assignedOperators.length > 0
                      ? assignedOperators.map(o => o.fullName.split(' ')[0]).join(', ')
                      : 'Sin asignar'}
                    {' · '}{(aisle.productsCount || 0).toLocaleString()} ítems
                    {!isUnassigned && <> · <span className="font-semibold text-primary-container">{aisle.progress}%</span></>}
                  </p>
                </div>
                {!isOperator ? (
                  <div className="flex items-center shrink-0" onClick={(e) => e.stopPropagation()}>
                    <RowActionButton
                      icon={Pencil}
                      size="sm"
                      label="Editar pasillo"
                      onClick={() => {
                        setAisleToEdit(aisle);
                        setAisleNumber(String(aisle.number));
                        setAisleName(aisle.name);
                        setError(null);
                        setShowAddModal(true);
                      }}
                    />
                    <RowActionButton icon={Trash2} size="sm" variant="danger" label="Eliminar pasillo" onClick={() => setAisleToDelete(aisle)} />
                  </div>
                ) : (
                  <ChevronRight size={20} className="text-on-surface-variant shrink-0 mr-2" />
                )}
              </div>
            );
          })}
        </section>
      )}
      </div>

      {/* Add Aisle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-inverse-surface/50 z-[70] flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200" onClick={() => { setShowAddModal(false); setAisleToEdit(null); }}>
          <div className="bg-card-surface rounded-t-3xl md:rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-y-auto max-h-[92dvh] border border-outline-variant/30 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">
                {aisleToEdit ? 'Editar Pasillo' : 'Agregar Nuevo Pasillo'}
              </h3>
              <button onClick={() => { setShowAddModal(false); setAisleToEdit(null); }} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Número de Pasillo</label>
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
                <label className="font-sans font-semibold text-xs text-on-surface-variant ">Nombre del Pasillo / Categoría</label>
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
                  onClick={() => { setShowAddModal(false); setAisleToEdit(null); }}
                  className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary-container text-on-primary hover:bg-primary/95 font-sans text-[14px] font-semibold min-h-12 rounded-2xl shadow-sm transition-all"
                >
                  {aisleToEdit ? 'Guardar Cambios' : 'Guardar Pasillo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Aisle Confirmation Modal */}
      {aisleToDelete && (
        <div className="fixed inset-0 bg-inverse-surface/50 z-[70] flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200" onClick={() => setAisleToDelete(null)}>
          <div className="bg-card-surface rounded-t-3xl md:rounded-[32px] w-full max-w-sm shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-y-auto max-h-[92dvh] border border-outline-variant/30 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center">
                <Trash2 size={26} className="text-error" />
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
                  className="flex-1 bg-error hover:bg-error/90 text-on-error font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all"
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
    </>
  );
}
