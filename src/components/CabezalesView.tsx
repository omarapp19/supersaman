import { useState, useEffect, useRef, Fragment, FormEvent } from 'react';
import { Plus, X, Trash2, MapPin, Building2, History, Rows3, RotateCw, Copy, Clipboard as ClipboardIcon } from 'lucide-react';
import { Aisle, Cabezal, CabezalPago, PaymentType, DiagramElement } from '../types';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useToast } from './Toast';

function loadLocalElements(): DiagramElement[] {
  try {
    const raw = localStorage.getItem('saman_cabezales_diagram_elements');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalElements(elements: DiagramElement[]) {
  localStorage.setItem('saman_cabezales_diagram_elements', JSON.stringify(elements));
}

interface CabezalesViewProps {
  cabezales: Cabezal[];
  aisles: Aisle[];
  onAddCabezal: (cabezal: Cabezal) => void;
  onUpdateCabezal: (id: string, updates: Partial<Cabezal>) => void;
  onDeleteCabezal: (id: string) => void;
  user?: any;
}

function isExpired(periodEnd?: string): boolean {
  if (!periodEnd) return false;
  const end = new Date(periodEnd);
  if (isNaN(end.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end.getTime() < today.getTime();
}

/**
 * Monthly billing cycle for cabezal payments resets on day 5 of each month: from day 5
 * through day 4 of the next month counts as the same billing period. Deriving the label from
 * today's date (instead of storing a boolean) means a cabezal automatically flips back to
 * "en deuda" once the 5th passes, without needing a scheduled job.
 */
function getBillingPeriodLabel(date: Date = new Date()): string {
  const d = new Date(date);
  if (d.getDate() < 5) {
    d.setMonth(d.getMonth() - 1);
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function formatBillingPeriodLabel(period: string): string {
  const [year, month] = period.split('-').map(Number);
  if (!year || !month) return period;
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('es-VE', { month: 'long', year: 'numeric' });
}

function isPaidForCurrentPeriod(cabezal: Cabezal): boolean {
  return cabezal.lastPaidPeriod === getBillingPeriodLabel();
}

// Every diagram box shares the same fixed footprint; scale the font down for longer
// labels instead of truncating so the full name still fits inside it.
function getDiagramLabelSizeClass(label: string): string {
  if (label.length <= 10) return 'text-[9.5px]';
  if (label.length <= 18) return 'text-[8.5px]';
  if (label.length <= 28) return 'text-[7.5px]';
  return 'text-[6.5px]';
}

function loadLocalPagos(cabezalId: string): CabezalPago[] {
  try {
    const raw = localStorage.getItem(`saman_cabezal_pagos_${cabezalId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPagos(cabezalId: string, pagos: CabezalPago[]) {
  localStorage.setItem(`saman_cabezal_pagos_${cabezalId}`, JSON.stringify(pagos));
}

export function CabezalesView({ cabezales, aisles, onAddCabezal, onUpdateCabezal, onDeleteCabezal, user }: CabezalesViewProps) {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'lista' | 'diagrama'>('lista');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newLinkedAisleId, setNewLinkedAisleId] = useState('');

  const [selectedCabezal, setSelectedCabezal] = useState<Cabezal | null>(null);
  const [cabezalToDelete, setCabezalToDelete] = useState<Cabezal | null>(null);

  const [elements, setElements] = useState<DiagramElement[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (isFirebaseConfigured) {
      unsubscribe = onSnapshot(
        doc(db, 'config', 'cabezalesDiagram'),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setElements(Array.isArray(data.elements) ? data.elements : []);
          }
        },
        (err) => console.error('Error al escuchar el diagrama:', err)
      );
    } else {
      setElements(loadLocalElements());
    }
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const persistElements = async (next: DiagramElement[]) => {
    setElements(next);
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'config', 'cabezalesDiagram'), { elements: next }, { merge: true });
      } catch (err) {
        console.error('Error al guardar el diagrama:', err);
        toast.error('Error al guardar el diagrama.');
      }
    } else {
      saveLocalElements(next);
    }
  };

  const handleAddElement = (customProps?: Partial<DiagramElement>) => {
    const newElement: DiagramElement = {
      id: 'el_' + Date.now(),
      x: customProps?.x ?? 50,
      y: customProps?.y ?? 50,
      rotation: customProps?.rotation ?? 0,
      ...(customProps?.width !== undefined ? { width: customProps.width } : {}),
      ...(customProps?.height !== undefined ? { height: customProps.height } : {}),
    };
    persistElements([...elements, newElement]);
  };

  const handleUpdateElement = (id: string, updates: Partial<DiagramElement>) => {
    persistElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleDeleteElement = (id: string) => {
    persistElements(elements.filter(el => el.id !== id));
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const cabezal: Cabezal = {
      id: 'cab_' + Date.now(),
      label: newLabel.trim(),
      positionX: 50,
      positionY: 50,
      lastUpdated: new Date().toISOString(),
      ...(newLinkedAisleId ? { linkedAisleId: newLinkedAisleId } : {}),
    };
    onAddCabezal(cabezal);
    toast.success('Cabezal creado con éxito.');
    setShowAddModal(false);
    setNewLabel('');
    setNewLinkedAisleId('');
  };

  const activeCabezal = selectedCabezal ? cabezales.find(c => c.id === selectedCabezal.id) || selectedCabezal : null;

  return (
    <>
      <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-sans text-[26px] sm:text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Cabezales</h2>
            <p className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-on-surface-variant mt-1 sm:mt-2">Gestiona el alquiler de puntas de góndola a empresas.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[15px] font-semibold transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <Plus size={18} />
            Nuevo Cabezal
          </button>
        </header>

        <div className="flex gap-1 mb-6 bg-surface-variant/30 p-1 rounded-full w-fit">
          <button
            onClick={() => setActiveTab('lista')}
            className={`px-5 py-2 rounded-full font-sans text-[14px] font-semibold transition-all cursor-pointer ${activeTab === 'lista' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setActiveTab('diagrama')}
            className={`px-5 py-2 rounded-full font-sans text-[14px] font-semibold transition-all cursor-pointer ${activeTab === 'diagrama' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
          >
            Diagrama
          </button>
        </div>

        {activeTab === 'lista' ? (
          cabezales.length === 0 ? (
            <EmptyState onAdd={() => setShowAddModal(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {cabezales.map(cab => (
                <Fragment key={cab.id}>
                  <CabezalCard
                    cabezal={cab}
                    aisles={aisles}
                    onClick={() => setSelectedCabezal(cab)}
                    onDelete={() => setCabezalToDelete(cab)}
                  />
                </Fragment>
              ))}
            </div>
          )
        ) : (
          <DiagramCanvas
            cabezales={cabezales}
            onUpdateCabezal={onUpdateCabezal}
            onOpenDetail={setSelectedCabezal}
            elements={elements}
            onAddElement={handleAddElement}
            onUpdateElement={handleUpdateElement}
            onUpdateAllElements={persistElements}
            onDeleteElement={handleDeleteElement}
          />
        )}
      </div>

      {showAddModal && (
        <AddCabezalModal
          aisles={aisles}
          label={newLabel}
          setLabel={setNewLabel}
          linkedAisleId={newLinkedAisleId}
          setLinkedAisleId={setNewLinkedAisleId}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {activeCabezal && (
        <CabezalDetailModal
          cabezal={activeCabezal}
          aisles={aisles}
          onClose={() => setSelectedCabezal(null)}
          onUpdate={(updates) => onUpdateCabezal(activeCabezal.id, updates)}
          onDelete={() => {
            setCabezalToDelete(activeCabezal);
            setSelectedCabezal(null);
          }}
        />
      )}

      {cabezalToDelete && (
        <ConfirmDeleteModal
          cabezal={cabezalToDelete}
          onCancel={() => setCabezalToDelete(null)}
          onConfirm={() => {
            onDeleteCabezal(cabezalToDelete.id);
            toast.success('Cabezal eliminado con éxito.');
            setCabezalToDelete(null);
          }}
        />
      )}
    </>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300">
      <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
        <MapPin size={36} />
      </div>
      <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay cabezales registrados</h3>
      <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">Crea el primer cabezal para empezar a gestionar su alquiler.</p>
      <button onClick={onAdd} className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[15px] font-semibold transition-all shadow-md cursor-pointer">
        <Plus size={18} />
        Nuevo Cabezal
      </button>
    </div>
  );
}

function CabezalCard({ cabezal, aisles, onClick, onDelete }: {
  cabezal: Cabezal;
  aisles: Aisle[];
  onClick: () => void;
  onDelete: () => void;
}) {
  const isRented = !!cabezal.tenantCompany;
  const expired = isExpired(cabezal.periodEnd);
  const paidThisPeriod = isPaidForCurrentPeriod(cabezal);
  const linkedAisle = aisles.find(a => a.id === cabezal.linkedAisleId);

  return (
    <div
      onClick={onClick}
      className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-outline-variant/50 relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${isRented ? (expired ? 'bg-red-500' : 'bg-primary') : 'bg-amber-500'}`}></div>
      <div className="flex justify-between items-start mb-3">
        <div className="min-w-0">
          <h3 className="font-sans text-[18px] font-bold text-on-surface truncate">{cabezal.label}</h3>
          {linkedAisle && <span className="font-mono text-[12px] text-on-surface-variant truncate block">{linkedAisle.name}</span>}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-red-100 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer flex-shrink-0"
          title="Eliminar cabezal"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Building2 size={14} className="text-on-surface-variant flex-shrink-0" />
        <span className="font-sans text-[14px] text-on-surface truncate">{cabezal.tenantCompany || 'Sin empresa asignada'}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold uppercase ${isRented ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-variant/50 text-on-surface-variant border border-outline-variant/30'}`}>
          {isRented ? 'Alquilado' : 'Vacante'}
        </span>
        {isRented && (
          <>
            <span className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold uppercase ${expired ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'}`}>
              {expired ? 'Vencido' : 'Vigente'}
            </span>
            <span className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold uppercase ${paidThisPeriod ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
              {paidThisPeriod ? 'Pagado' : 'En Deuda'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function AddCabezalModal({ aisles, label, setLabel, linkedAisleId, setLinkedAisleId, onClose, onSubmit }: {
  aisles: Aisle[];
  label: string;
  setLabel: (v: string) => void;
  linkedAisleId: string;
  setLinkedAisleId: (v: string) => void;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
          <h3 className="font-sans text-[20px] font-bold text-on-surface">Nuevo Cabezal</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Nombre / Ubicación</label>
            <input
              type="text"
              required
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ej. Cabezal Entrada"
              className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Pasillo vinculado (opcional)</label>
            <select
              value={linkedAisleId}
              onChange={(e) => setLinkedAisleId(e.target.value)}
              className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            >
              <option value="">Ninguno</option>
              {aisles.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
              Crear Cabezal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CabezalDetailModal({ cabezal, aisles, onClose, onUpdate, onDelete }: {
  cabezal: Cabezal;
  aisles: Aisle[];
  onClose: () => void;
  onUpdate: (updates: Partial<Cabezal>) => void;
  onDelete: () => void;
}) {
  const toast = useToast();
  const [tenantCompany, setTenantCompany] = useState(cabezal.tenantCompany || '');
  const [paymentType, setPaymentType] = useState<PaymentType>(cabezal.paymentType || 'descuento_factura');
  const [paymentValue, setPaymentValue] = useState(cabezal.paymentValue != null ? String(cabezal.paymentValue) : '');
  const [paymentNotes, setPaymentNotes] = useState(cabezal.paymentNotes || '');
  const [periodStart, setPeriodStart] = useState(cabezal.periodStart || '');
  const [periodEnd, setPeriodEnd] = useState(cabezal.periodEnd || '');
  const [pagos, setPagos] = useState<CabezalPago[]>([]);
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (isFirebaseConfigured) {
      setLoadingPagos(true);
      unsubscribe = onSnapshot(
        collection(db, 'cabezales', cabezal.id, 'pagos'),
        (snap) => {
          const list: CabezalPago[] = [];
          snap.forEach(d => list.push({ id: d.id, ...d.data() } as CabezalPago));
          list.sort((a, b) => (b.periodStart || '').localeCompare(a.periodStart || ''));
          setPagos(list);
          setLoadingPagos(false);
        },
        () => setLoadingPagos(false)
      );
    } else {
      setPagos(loadLocalPagos(cabezal.id));
    }
    return () => { if (unsubscribe) unsubscribe(); };
  }, [cabezal.id]);

  const expired = isExpired(periodEnd);
  const paidThisPeriod = isPaidForCurrentPeriod(cabezal);
  const currentPeriodLabel = getBillingPeriodLabel();
  const linkedAisle = aisles.find(a => a.id === cabezal.linkedAisleId);

  const persistPago = async (pago: CabezalPago) => {
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'cabezales', cabezal.id, 'pagos', pago.id), pago);
      } catch (err) {
        console.error('Error al guardar historial de pago:', err);
        toast.error('Error al guardar el historial de pago.');
      }
    } else {
      const updated = [pago, ...loadLocalPagos(cabezal.id)];
      saveLocalPagos(cabezal.id, updated);
      setPagos(updated);
    }
  };

  const handleRegisterNewPeriod = () => {
    if (!periodStart && !periodEnd) {
      toast.warning('Define primero las fechas del período actual antes de renovar.');
      return;
    }
    const archivedPago: CabezalPago = {
      id: 'pago_' + Date.now(),
      periodStart,
      periodEnd,
      paymentType,
      paymentValue: paymentValue ? parseFloat(paymentValue) : 0,
      isPaid: paidThisPeriod,
      notes: paymentNotes,
      createdAt: new Date().toISOString(),
      ...(paidThisPeriod ? { paidDate: new Date().toISOString() } : {}),
    };
    persistPago(archivedPago);
    setPeriodStart('');
    setPeriodEnd('');
    toast.success('Período anterior archivado. Define las fechas del nuevo período y guarda los cambios.');
  };

  const handleRegisterPago = () => {
    const paymentRecord: CabezalPago = {
      id: 'pago_' + Date.now(),
      periodStart: currentPeriodLabel + '-05',
      periodEnd: currentPeriodLabel + '-05',
      paymentType,
      paymentValue: paymentValue ? parseFloat(paymentValue) : 0,
      isPaid: true,
      paidDate: new Date().toISOString(),
      notes: `Pago del mes de ${formatBillingPeriodLabel(currentPeriodLabel)}${paymentNotes ? ' — ' + paymentNotes : ''}`,
      createdAt: new Date().toISOString(),
    };
    persistPago(paymentRecord);
    onUpdate({ lastPaidPeriod: currentPeriodLabel, lastUpdated: new Date().toISOString() });
    toast.success(`Pago de ${formatBillingPeriodLabel(currentPeriodLabel)} registrado con éxito.`);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({
      tenantCompany: tenantCompany.trim(),
      paymentType,
      paymentValue: paymentValue ? parseFloat(paymentValue) : 0,
      paymentNotes: paymentNotes.trim(),
      periodStart,
      periodEnd,
      lastUpdated: new Date().toISOString(),
    });
    toast.success('Cabezal actualizado con éxito.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-card-surface rounded-[32px] w-full max-w-lg max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/20 flex-shrink-0">
          <div className="min-w-0">
            <h3 className="font-sans text-[20px] font-bold text-on-surface truncate">{cabezal.label}</h3>
            {linkedAisle && <p className="font-mono text-[12px] text-on-surface-variant mt-0.5 truncate">Vinculado a {linkedAisle.name}</p>}
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold uppercase ${tenantCompany ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-variant/50 text-on-surface-variant border border-outline-variant/30'}`}>
              {tenantCompany ? 'Alquilado' : 'Vacante'}
            </span>
            {tenantCompany && (
              <>
                <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold uppercase ${expired ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'}`}>
                  {expired ? 'Vencido' : 'Vigente'}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold uppercase ${paidThisPeriod ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                  {paidThisPeriod ? 'Pagado' : 'En Deuda'}
                </span>
              </>
            )}
          </div>

          {tenantCompany && (
            <div className="flex items-center justify-between gap-3 bg-white/60 border border-outline-variant/20 rounded-2xl p-3.5">
              <div className="min-w-0">
                <span className="font-sans text-[13.5px] font-semibold text-on-surface block">
                  Pago de {formatBillingPeriodLabel(currentPeriodLabel)}
                </span>
                <span className="font-mono text-[11px] text-on-surface-variant">
                  {paidThisPeriod ? 'Ya se registró el pago de este mes.' : 'El ciclo mensual reinicia cada día 5.'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRegisterPago}
                disabled={paidThisPeriod}
                className="flex-shrink-0 px-4 py-2.5 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[13px] font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paidThisPeriod ? 'Pagado' : 'Registrar Pago'}
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Empresa que alquila</label>
            <input
              type="text"
              value={tenantCompany}
              onChange={(e) => setTenantCompany(e.target.value)}
              placeholder="Vacío = vacante"
              className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Tipo de pago</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-3 font-sans text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              >
                <option value="descuento_factura">Descuento en factura</option>
                <option value="porcentaje">Porcentaje de descuento</option>
                <option value="regalia">Regalía</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                {paymentType === 'porcentaje' ? 'Porcentaje (%)' : 'Monto ($)'}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={paymentValue}
                onChange={(e) => setPaymentValue(e.target.value)}
                disabled={paymentType === 'regalia'}
                placeholder={paymentType === 'regalia' ? 'N/A' : '0'}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-3 font-sans text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Notas del acuerdo</label>
            <textarea
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
              rows={2}
              placeholder="Ej. detalle de la regalía, condiciones..."
              className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Inicio del período</label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-3 font-sans text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Vencimiento</label>
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-3 font-sans text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegisterNewPeriod}
            className="text-primary font-sans text-[13px] font-semibold hover:underline text-left cursor-pointer flex items-center gap-1.5"
          >
            <History size={14} />
            Archivar este período y comenzar uno nuevo
          </button>

          <button
            type="button"
            onClick={() => setShowHistory(s => !s)}
            className="text-on-surface-variant font-mono text-[12px] uppercase tracking-wider text-left cursor-pointer"
          >
            {showHistory ? 'Ocultar' : 'Ver'} historial de pagos ({pagos.length})
          </button>

          {showHistory && (
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto bg-white/40 rounded-2xl p-3 border border-outline-variant/20">
              {loadingPagos ? (
                <span className="font-mono text-[12px] text-on-surface-variant">Cargando...</span>
              ) : pagos.length === 0 ? (
                <span className="font-mono text-[12px] text-on-surface-variant">Sin períodos anteriores registrados.</span>
              ) : (
                pagos.map(p => (
                  <div key={p.id} className="flex justify-between items-center text-[12px] font-mono border-b border-outline-variant/10 pb-1.5 last:border-0">
                    <span className="text-on-surface">{p.periodStart} → {p.periodEnd}</span>
                    <span className={p.isPaid ? 'text-emerald-700' : 'text-amber-700'}>{p.isPaid ? 'Pagado' : 'Pendiente'}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-3.5 rounded-full border border-error/30 text-[#ba1a1a] hover:bg-error/5 font-sans text-[14px] font-semibold transition-all cursor-pointer"
              title="Eliminar cabezal"
            >
              <Trash2 size={16} />
            </button>
            <button type="submit" className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ cabezal, onCancel, onConfirm }: { cabezal: Cabezal; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onCancel}>
      <div className="bg-card-surface rounded-[32px] w-full max-w-sm shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={26} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-sans text-[20px] font-bold text-on-surface">Eliminar Cabezal</h3>
            <p className="font-sans text-[14px] text-on-surface-variant mt-1">
              ¿Estás seguro de que deseas eliminar <strong>{cabezal.label}</strong>? Se perderá su historial de alquiler. Esta acción es irreversible.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button onClick={onCancel} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
              Cancelar
            </button>
            <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramCanvas({ cabezales, onUpdateCabezal, onOpenDetail, elements, onAddElement, onUpdateElement, onUpdateAllElements, onDeleteElement }: {
  cabezales: Cabezal[];
  onUpdateCabezal: (id: string, updates: Partial<Cabezal>) => void;
  onOpenDetail: (cabezal: Cabezal) => void;
  elements: DiagramElement[];
  onAddElement: (customProps?: Partial<DiagramElement>) => void;
  onUpdateElement: (id: string, updates: Partial<DiagramElement>) => void;
  onUpdateAllElements: (allElements: DiagramElement[]) => void;
  onDeleteElement: (id: string) => void;
}) {
  const toast = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ type: 'cabezal' | 'element'; id: string } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const selectedElement = elements.find(el => el.id === selectedElementId);
  const [copiedConfig, setCopiedConfig] = useState<{ width?: number; height?: number; rotation: number } | null>(null);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const movedRef = useRef(false);
  const draggedStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartPositionsRef = useRef<{
    elements: { id: string; x: number; y: number }[];
    cabezales: { id: string; x: number; y: number }[];
  }>({ elements: [], cabezales: [] });

  // Snapping options
  const [snapToGrid, setSnapToGrid] = useState<boolean>(() => {
    const saved = localStorage.getItem('saman_cabezales_snap_grid');
    return saved !== null ? saved === 'true' : true;
  });
  const [snapToElements, setSnapToElements] = useState<boolean>(() => {
    const saved = localStorage.getItem('saman_cabezales_snap_elements');
    return saved !== null ? saved === 'true' : true;
  });

  // Alignment guide coordinates
  const [activeGuideX, setActiveGuideX] = useState<number | null>(null);
  const [activeGuideY, setActiveGuideY] = useState<number | null>(null);

  const toggleSnapToGrid = () => {
    setSnapToGrid(prev => {
      const next = !prev;
      localStorage.setItem('saman_cabezales_snap_grid', String(next));
      return next;
    });
  };

  const toggleSnapToElements = () => {
    setSnapToElements(prev => {
      const next = !prev;
      localStorage.setItem('saman_cabezales_snap_elements', String(next));
      return next;
    });
  };

  const handlePointerDown = (e: any, type: 'cabezal' | 'element', id: string, x: number, y: number) => {
    try {
      e.target.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
    setDrag({ type, id });
    movedRef.current = false;
    setDragPos({ x, y });
    draggedStartPosRef.current = { x, y };
    dragStartPositionsRef.current = {
      elements: elements.map(el => ({ id: el.id, x: el.x, y: el.y })),
      cabezales: cabezales.map(c => ({ id: c.id, x: c.positionX ?? 50, y: c.positionY ?? 50 }))
    };
  };

  const handlePointerMove = (e: any) => {
    if (!drag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate raw percentage coordinates inside the canvas container
    const rawX = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const rawY = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

    let snappedX = rawX;
    let snappedY = rawY;
    let guideX: number | null = null;
    let guideY: number | null = null;
    const threshold = 1.5; // Alignment snapping distance threshold in percentage

    if (snapToElements) {
      const others: { x: number; y: number }[] = [];
      
      cabezales.forEach(c => {
        if (drag.type !== 'cabezal' || drag.id !== c.id) {
          others.push({ x: c.positionX ?? 50, y: c.positionY ?? 50 });
        }
      });
      
      elements.forEach(el => {
        if (drag.type !== 'element' || drag.id !== el.id) {
          others.push({ x: el.x, y: el.y });
        }
      });

      // Check alignment vertically (same X)
      const alignX = others.find(o => Math.abs(o.x - rawX) < threshold);
      if (alignX) {
        snappedX = alignX.x;
        guideX = alignX.x;
      }

      // Check alignment horizontally (same Y)
      const alignY = others.find(o => Math.abs(o.y - rawY) < threshold);
      if (alignY) {
        snappedY = alignY.y;
        guideY = alignY.y;
      }
    }

    if (snapToGrid) {
      const gridStep = 2.5; // Snap to 2.5% multiples
      if (guideX === null) {
        snappedX = Math.round(snappedX / gridStep) * gridStep;
      }
      if (guideY === null) {
        snappedY = Math.round(snappedY / gridStep) * gridStep;
      }
    }

    movedRef.current = true;
    setDragPos({ x: snappedX, y: snappedY });
    setActiveGuideX(guideX);
    setActiveGuideY(guideY);
  };

  const handlePointerUp = () => {
    if (drag && dragPos) {
      if (movedRef.current) {
        if (isAllSelected) {
          const dx = dragPos.x - draggedStartPosRef.current.x;
          const dy = dragPos.y - draggedStartPosRef.current.y;
          
          const nextElements = elements.map(el => {
            const start = dragStartPositionsRef.current.elements.find(item => item.id === el.id);
            if (start) {
              return {
                ...el,
                x: Math.min(100, Math.max(0, start.x + dx)),
                y: Math.min(100, Math.max(0, start.y + dy))
              };
            }
            return el;
          });
          onUpdateAllElements(nextElements);

          dragStartPositionsRef.current.cabezales.forEach(c => {
            const nextX = Math.min(100, Math.max(0, c.x + dx));
            const nextY = Math.min(100, Math.max(0, c.y + dy));
            onUpdateCabezal(c.id, { positionX: nextX, positionY: nextY });
          });

          toast.success('Elementos movidos en bloque.');
        } else {
          if (drag.type === 'cabezal') {
            onUpdateCabezal(drag.id, { positionX: dragPos.x, positionY: dragPos.y });
          } else {
            onUpdateElement(drag.id, { x: dragPos.x, y: dragPos.y });
          }
        }
      } else if (drag.type === 'cabezal') {
        const cab = cabezales.find(c => c.id === drag.id);
        if (cab) onOpenDetail(cab);
      } else {
        setSelectedElementId(prev => (prev === drag.id ? null : drag.id));
      }
    }
    setDrag(null);
    setDragPos(null);
    setActiveGuideX(null);
    setActiveGuideY(null);
  };

  const handleBackgroundPointerDown = (e: any) => {
    if (e.target === containerRef.current) {
      setSelectedElementId(null);
    }
  };

  const isEmpty = cabezales.length === 0 && elements.length === 0;

  return (
    <div className="bg-card-surface rounded-3xl p-4 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
        <p className="font-mono text-[11px] sm:text-[12px] text-on-surface-variant uppercase tracking-wider">
          Arrastra cabezales y estantes para armar el plano de la tienda
        </p>
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleSnapToGrid}
            className={`px-3 py-1.5 rounded-full font-sans text-[12px] font-semibold transition-all border cursor-pointer ${
              snapToGrid 
                ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20' 
                : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/30'
            }`}
            title="Ajustar a cuadrícula de puntos"
          >
            Cuadrícula
          </button>
          <button
            onClick={toggleSnapToElements}
            className={`px-3 py-1.5 rounded-full font-sans text-[12px] font-semibold transition-all border cursor-pointer ${
              snapToElements 
                ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20' 
                : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/30'
            }`}
            title="Alineación magnética con otros elementos"
          >
            Alineación
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAllSelected(prev => {
                const next = !prev;
                if (next) {
                  setSelectedElementId(null);
                }
                return next;
              });
            }}
            className={`px-3 py-1.5 rounded-full font-sans text-[12px] font-semibold transition-all border cursor-pointer ${
              isAllSelected 
                ? 'bg-primary/20 text-primary border-primary hover:bg-primary/30' 
                : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/30'
            }`}
            title="Seleccionar todos los estantes y cabezales para arrastrar en bloque"
          >
            {isAllSelected ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
          </button>
          {copiedConfig && (
            <button
              type="button"
              onClick={() => {
                onAddElement({
                  width: copiedConfig.width,
                  height: copiedConfig.height,
                  rotation: copiedConfig.rotation,
                  x: 50,
                  y: 50
                });
                toast.success('Estante pegado en el centro.');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary text-white hover:bg-secondary/95 rounded-full font-sans text-[12.5px] font-semibold transition-all shadow-sm cursor-pointer animate-in fade-in zoom-in duration-200"
              title="Pegar estante con la configuración copiada"
            >
              <ClipboardIcon size={14} />
              Pegar Estante
            </button>
          )}
          <button
            type="button"
            onClick={() => onAddElement()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[12.5px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Rows3 size={14} />
            Agregar Estante
          </button>
        </div>
      </div>

      {isEmpty ? (
        <div className="text-center py-12">
          <p className="font-sans text-[15px] text-on-surface-variant">Crea un cabezal o agrega un estante para empezar a armar el plano.</p>
        </div>
      ) : (
        <div className="w-full overflow-auto max-h-[80vh] border border-outline-variant/30 rounded-2xl bg-surface-variant/10 shadow-inner">
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handleBackgroundPointerDown}
            className="relative w-[1000px] h-[625px] bg-surface-variant/20 select-none overflow-hidden"
            style={snapToGrid ? {
              backgroundImage: 'radial-gradient(circle, rgba(62, 158, 87, 0.15) 1.5px, transparent 1.5px)',
              backgroundSize: '2.5% 2.5%'
            } : {}}
          >
          {/* Alignment guide lines */}
          {activeGuideX !== null && (
            <div
              style={{ left: `${activeGuideX}%` }}
              className="absolute top-0 bottom-0 w-[1.5px] border-l border-dashed border-red-500 pointer-events-none z-20"
            />
          )}
          {activeGuideY !== null && (
            <div
              style={{ top: `${activeGuideY}%` }}
              className="absolute left-0 right-0 h-[1.5px] border-t border-dashed border-red-500 pointer-events-none z-20"
            />
          )}

          {elements.map(el => {
            let x = el.x;
            let y = el.y;
            if (drag && dragPos) {
              if (isAllSelected) {
                const startPos = dragStartPositionsRef.current.elements.find(item => item.id === el.id);
                if (startPos) {
                  const dx = dragPos.x - draggedStartPosRef.current.x;
                  const dy = dragPos.y - draggedStartPosRef.current.y;
                  x = Math.min(100, Math.max(0, startPos.x + dx));
                  y = Math.min(100, Math.max(0, startPos.y + dy));
                }
              } else if (drag.type === 'element' && drag.id === el.id) {
                x = dragPos.x;
                y = dragPos.y;
              }
            }
            const isSelected = selectedElementId === el.id;
            const showActiveHighlight = isSelected || isAllSelected;
            return (
              <div
                key={el.id}
                onPointerDown={(e) => handlePointerDown(e, 'element', el.id, el.x, el.y)}
                onPointerUp={handlePointerUp}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
                  width: el.width !== undefined ? `${el.width}px` : undefined,
                  height: el.height !== undefined ? `${el.height}px` : undefined,
                }}
                className={`absolute bg-primary/10 border-2 rounded-md shadow-sm cursor-grab active:cursor-grabbing touch-none flex items-center justify-center ${
                  showActiveHighlight ? 'border-primary ring-2 ring-primary/20 bg-primary/20' : 'border-primary/40'
                } ${
                  el.width !== undefined ? '' : 'w-20 sm:w-24'
                } ${
                  el.height !== undefined ? '' : 'h-8 sm:h-9'
                }`}
              >
                {isSelected && (
                  <>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); onUpdateElement(el.id, { rotation: (el.rotation + 90) % 180 }); }}
                      style={{ transform: `rotate(${-el.rotation}deg)` }}
                      className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-white border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm cursor-pointer"
                      title="Rotar estante"
                    >
                      <RotateCw size={11} />
                    </button>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); onDeleteElement(el.id); setSelectedElementId(null); }}
                      style={{ transform: `rotate(${-el.rotation}deg)` }}
                      className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-white border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-error shadow-sm cursor-pointer"
                      title="Eliminar estante"
                    >
                      <X size={11} />
                    </button>
                  </>
                )}
              </div>
            );
          })}

           {cabezales.map(cab => {
            let x = cab.positionX ?? 50;
            let y = cab.positionY ?? 50;
            if (drag && dragPos) {
              if (isAllSelected) {
                const startPos = dragStartPositionsRef.current.cabezales.find(item => item.id === cab.id);
                if (startPos) {
                  const dx = dragPos.x - draggedStartPosRef.current.x;
                  const dy = dragPos.y - draggedStartPosRef.current.y;
                  x = Math.min(100, Math.max(0, startPos.x + dx));
                  y = Math.min(100, Math.max(0, startPos.y + dy));
                }
              } else if (drag.type === 'cabezal' && drag.id === cab.id) {
                x = dragPos.x;
                y = dragPos.y;
              }
            }
            const isRented = !!cab.tenantCompany;
            return (
              <button
                key={cab.id}
                onPointerDown={(e) => handlePointerDown(e, 'cabezal', cab.id, cab.positionX ?? 50, cab.positionY ?? 50)}
                onPointerUp={handlePointerUp}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-16 h-11 sm:w-20 sm:h-14 rounded-lg border-2 shadow-md cursor-grab active:cursor-grabbing touch-none font-sans font-bold px-1 py-0.5 text-center transition-colors overflow-hidden ${
                  isRented ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-outline-variant/50 text-on-surface-variant'
                } ${isAllSelected ? 'ring-2 ring-primary border-primary bg-primary/10' : ''}`}
              >
                <span className={`w-full leading-tight break-words ${getDiagramLabelSizeClass(cab.label)}`}>{cab.label}</span>
                <span className="w-full font-mono text-[7px] font-normal opacity-70 leading-none truncate mt-0.5">{isRented ? cab.tenantCompany : 'Vacante'}</span>
              </button>
            );
          })}
          </div>
        </div>
      )}

      {selectedElement && (
        <div className="mt-4 p-4 bg-white/70 border border-outline-variant/30 backdrop-blur-md rounded-2xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[14px] sm:text-[15px] font-bold text-on-surface flex items-center gap-1.5">
              <Rows3 size={15} className="text-primary" />
              Configurar Estante
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] text-on-surface-variant">Personaliza las dimensiones del estante seleccionado en tiempo real</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[12.5px] font-medium text-on-surface-variant">Ancho:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onUpdateElement(selectedElement.id, { width: Math.max(20, (selectedElement.width ?? 96) - 8) })}
                  className="w-7 h-7 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-variant/30 flex items-center justify-center font-bold text-on-surface text-[14px] cursor-pointer shadow-sm active:scale-95 transition-transform"
                  title="Reducir ancho"
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedElement.width ?? 96}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      onUpdateElement(selectedElement.id, { width: Math.max(10, val) });
                    }
                  }}
                  className="w-14 bg-white border border-outline-variant/30 rounded-lg py-0.5 text-center font-mono text-[12.5px] focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => onUpdateElement(selectedElement.id, { width: Math.min(500, (selectedElement.width ?? 96) + 8) })}
                  className="w-7 h-7 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-variant/30 flex items-center justify-center font-bold text-on-surface text-[14px] cursor-pointer shadow-sm active:scale-95 transition-transform"
                  title="Aumentar ancho"
                >
                  +
                </button>
                <span className="font-mono text-[11px] text-on-surface-variant ml-0.5">px</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans text-[12.5px] font-medium text-on-surface-variant">Alto:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onUpdateElement(selectedElement.id, { height: Math.max(10, (selectedElement.height ?? 36) - 4) })}
                  className="w-7 h-7 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-variant/30 flex items-center justify-center font-bold text-on-surface text-[14px] cursor-pointer shadow-sm active:scale-95 transition-transform"
                  title="Reducir alto"
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedElement.height ?? 36}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      onUpdateElement(selectedElement.id, { height: Math.max(5, val) });
                    }
                  }}
                  className="w-14 bg-white border border-outline-variant/30 rounded-lg py-0.5 text-center font-mono text-[12.5px] focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => onUpdateElement(selectedElement.id, { height: Math.min(300, (selectedElement.height ?? 36) + 4) })}
                  className="w-7 h-7 rounded-full border border-outline-variant/30 bg-white hover:bg-surface-variant/30 flex items-center justify-center font-bold text-on-surface text-[14px] cursor-pointer shadow-sm active:scale-95 transition-transform"
                  title="Aumentar alto"
                >
                  +
                </button>
                <span className="font-mono text-[11px] text-on-surface-variant ml-0.5">px</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCopiedConfig({
                    width: selectedElement.width,
                    height: selectedElement.height,
                    rotation: selectedElement.rotation
                  });
                  toast.success('Configuración del estante copiada.');
                }}
                className="flex items-center gap-1 px-3 py-1 border border-outline-variant/30 rounded-full bg-white hover:bg-surface-variant/30 font-sans text-[12px] font-semibold text-on-surface transition-all cursor-pointer shadow-sm active:scale-95"
                title="Copiar configuración de este estante"
              >
                <Copy size={12} className="text-on-surface-variant" />
                Copiar
              </button>
              <button
                type="button"
                onClick={() => {
                  onAddElement({
                    width: selectedElement.width,
                    height: selectedElement.height,
                    rotation: selectedElement.rotation,
                    x: Math.min(95, selectedElement.x + 4),
                    y: Math.min(95, selectedElement.y + 4)
                  });
                  toast.success('Estante duplicado.');
                }}
                className="flex items-center gap-1 px-3 py-1 border border-outline-variant/30 rounded-full bg-white hover:bg-surface-variant/30 font-sans text-[12px] font-semibold text-on-surface transition-all cursor-pointer shadow-sm active:scale-95"
                title="Duplicar este estante con la misma configuración"
              >
                <Plus size={12} className="text-on-surface-variant" />
                Duplicar
              </button>
              <button
                type="button"
                onClick={() => onUpdateElement(selectedElement.id, { rotation: (selectedElement.rotation + 90) % 180 })}
                className="flex items-center gap-1 px-3 py-1 border border-outline-variant/30 rounded-full bg-white hover:bg-surface-variant/30 font-sans text-[12px] font-semibold text-on-surface transition-all cursor-pointer shadow-sm active:scale-95"
                title="Rotar estante 90 grados"
              >
                <RotateCw size={12} className="text-on-surface-variant" />
                Rotar
              </button>
              <button
                type="button"
                onClick={() => { onDeleteElement(selectedElement.id); setSelectedElementId(null); }}
                className="flex items-center gap-1 px-3 py-1 border border-error/20 rounded-full bg-white hover:bg-error/5 font-sans text-[12px] font-semibold text-error transition-all cursor-pointer shadow-sm active:scale-95"
                title="Eliminar estante"
              >
                <X size={12} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
