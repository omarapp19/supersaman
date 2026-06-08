import { useState, FormEvent } from 'react';
import { ViewState, Aisle } from '../types';
import { ClipboardList, Wine, Coffee, Milk, Plus, X } from 'lucide-react';

interface AislesViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  onAddAisle: (newAisle: Aisle) => void;
}

export function AislesView({ onNavigate, aisles, onAddAisle }: AislesViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [aisleNumber, setAisleNumber] = useState('');
  const [aisleName, setAisleName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = parseInt(aisleNumber, 10);

    if (isNaN(num) || num <= 0) {
      alert("Por favor introduce un número de pasillo válido.");
      return;
    }

    if (aisles.some(a => a.number === num)) {
      alert(`El pasillo número ${num} ya existe.`);
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
        <button 
          onClick={() => {
            setAisleNumber('');
            setAisleName('');
            setShowAddModal(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[15px] font-semibold transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          Nuevo Pasillo
        </button>
      </section>

      {aisles.length === 0 ? (
        <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300">
          <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
            <ClipboardList size={36} />
          </div>
          <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay pasillos registrados</h3>
          <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">Comienza agregando tu primer pasillo usando el botón de arriba.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {aisles.map((aisle) => {
            let Icon = Milk;
            if (aisle.name.includes("Bebidas") || aisle.name.includes("Licores")) Icon = Wine;
            if (aisle.name.includes("Desayuno") || aisle.name.includes("Café")) Icon = Coffee;

            const isUnassigned = aisle.status === 'unassigned';

            return (
              <button 
                key={aisle.id}
                onClick={() => onNavigate('pasillo-detail', aisle.number)}
                className={`text-left rounded-3xl p-6 transition-transform hover:scale-[0.98] shadow-[0_4px_20px_rgba(40,28,25,0.05)] relative overflow-hidden group ${
                  isUnassigned ? 'bg-white opacity-80 border border-outline-variant/30' : 'bg-card-surface'
                }`}
              >
                <div className="flex justify-between items-start w-full relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[13px] text-on-surface-variant uppercase tracking-wider">Pasillo {aisle.number}</span>
                    <h3 className="font-sans text-[20px] md:text-[24px] text-on-surface font-semibold truncate max-w-[150px]">{aisle.name}</h3>
                  </div>
                  {!isUnassigned && (
                    <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-mono text-[13px] font-medium flex items-center gap-1">
                      <ClipboardList size={14} />
                      <span>Asignado</span>
                    </div>
                  )}
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
              </button>
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
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Número de Pasillo</label>
                <input 
                  type="number" 
                  required
                  min="1"
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
    </div>
  );
}
