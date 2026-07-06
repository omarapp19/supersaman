import { useState, useEffect, useRef, Fragment, FormEvent } from 'react';
import { Plus, X, Trash2, MapPin, Building2, History } from 'lucide-react';
import { Aisle, Cabezal, CabezalPago, PaymentType } from '../types';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useToast } from './Toast';

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
          <DiagramCanvas cabezales={cabezales} onUpdateCabezal={onUpdateCabezal} onOpenDetail={setSelectedCabezal} />
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
            <span className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold uppercase ${cabezal.isPaid ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
              {cabezal.isPaid ? 'Pagado' : 'Pendiente'}
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
  const [isPaid, setIsPaid] = useState(!!cabezal.isPaid);
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
      isPaid,
      notes: paymentNotes,
      createdAt: new Date().toISOString(),
      ...(isPaid ? { paidDate: new Date().toISOString() } : {}),
    };
    persistPago(archivedPago);
    setPeriodStart('');
    setPeriodEnd('');
    setIsPaid(false);
    toast.success('Período anterior archivado. Define las fechas del nuevo período y guarda los cambios.');
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
      isPaid,
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
                <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold uppercase ${isPaid ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                  {isPaid ? 'Pagado' : 'Pendiente'}
                </span>
              </>
            )}
          </div>

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

          <label className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-outline-variant/20 cursor-pointer">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="w-4.5 h-4.5 rounded text-primary focus:ring-primary/20 border-outline-variant/50 cursor-pointer"
            />
            <span className="font-sans text-[14px] font-semibold text-on-surface">Período actual pagado</span>
          </label>

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

function DiagramCanvas({ cabezales, onUpdateCabezal, onOpenDetail }: {
  cabezales: Cabezal[];
  onUpdateCabezal: (id: string, updates: Partial<Cabezal>) => void;
  onOpenDetail: (cabezal: Cabezal) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);

  const handlePointerDown = (e: any, cab: Cabezal) => {
    e.target.setPointerCapture?.(e.pointerId);
    setDragId(cab.id);
    movedRef.current = false;
    setDragPos({ x: cab.positionX ?? 50, y: cab.positionY ?? 50 });
  };

  const handlePointerMove = (e: any) => {
    if (!dragId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    movedRef.current = true;
    setDragPos({ x, y });
  };

  const handlePointerUp = (cab: Cabezal) => {
    if (dragId === cab.id && dragPos) {
      if (movedRef.current) {
        onUpdateCabezal(cab.id, { positionX: dragPos.x, positionY: dragPos.y });
      } else {
        onOpenDetail(cab);
      }
    }
    setDragId(null);
    setDragPos(null);
  };

  if (cabezales.length === 0) {
    return (
      <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 max-w-xl mx-auto shadow-sm mt-4">
        <p className="font-sans text-[15px] text-on-surface-variant">Crea un cabezal primero para poder ubicarlo en el diagrama.</p>
      </div>
    );
  }

  return (
    <div className="bg-card-surface rounded-3xl p-4 shadow-[0_4px_20px_rgba(40,28,25,0.05)]">
      <p className="font-mono text-[12px] text-on-surface-variant mb-3 uppercase tracking-wider">Arrastra cada cabezal para ubicarlo en el plano de la tienda</p>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className="relative w-full aspect-[16/10] bg-surface-variant/20 rounded-2xl border-2 border-dashed border-outline-variant/40 touch-none select-none overflow-hidden"
      >
        {cabezales.map(cab => {
          const isDragging = dragId === cab.id;
          const x = isDragging && dragPos ? dragPos.x : (cab.positionX ?? 50);
          const y = isDragging && dragPos ? dragPos.y : (cab.positionY ?? 50);
          const isRented = !!cab.tenantCompany;
          return (
            <button
              key={cab.id}
              onPointerDown={(e) => handlePointerDown(e, cab)}
              onPointerUp={() => handlePointerUp(cab)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-20 h-14 sm:w-24 sm:h-16 rounded-xl border-2 shadow-md cursor-grab active:cursor-grabbing font-sans text-[11px] font-bold px-1 text-center transition-colors ${
                isRented ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-outline-variant/50 text-on-surface-variant'
              }`}
            >
              <span className="truncate w-full">{cab.label}</span>
              <span className="font-mono text-[9px] font-normal opacity-70 truncate w-full">{isRented ? cab.tenantCompany : 'Vacante'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
