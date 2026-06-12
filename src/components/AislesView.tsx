import { useState, FormEvent } from 'react';
import { ViewState, Aisle } from '../types';
import { ClipboardList, Wine, Coffee, Milk, Plus, X, Trash2 } from 'lucide-react';

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
                    <h3 className="font-sans text-[20px] md:text-[24px] text-on-surface font-semibold truncate max-w-[150px]">{aisle.name}</h3>
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
    </div>
  );
}
