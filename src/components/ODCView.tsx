import { useState, useMemo, Fragment, FormEvent } from 'react';
import { Plus, X, Trash2, Pencil, Check, FileSpreadsheet, AlertTriangle, Printer } from 'lucide-react';
import { PurchaseOrder } from '../types';
import { getDayKey, getWeekKey, formatWeekLabel, parseLocalDate } from '../utils/dateGrouping';
import { useToast } from './Toast';

interface ODCViewProps {
  purchaseOrders: PurchaseOrder[];
  weeklyLimit: number;
  onAddPurchaseOrder: (order: PurchaseOrder) => void;
  onUpdatePurchaseOrder: (id: string, updates: Partial<PurchaseOrder>) => void;
  onDeletePurchaseOrder: (id: string) => void;
  onUpdateOdcLimit: (newLimit: number) => void;
  user?: any;
}

function formatMoney(n: number): string {
  return '$ ' + n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatShortDate(iso: string): string {
  const date = parseLocalDate(iso);
  if (isNaN(date.getTime())) return iso;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

function formatDayLabel(iso: string): string {
  const date = parseLocalDate(iso);
  if (isNaN(date.getTime())) return 'Sin fecha';
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(date, today)) return 'Hoy';
  if (sameDay(date, yesterday)) return 'Ayer';
  return date.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ODCView({ purchaseOrders, weeklyLimit, onAddPurchaseOrder, onUpdatePurchaseOrder, onDeletePurchaseOrder, onUpdateOdcLimit, user }: ODCViewProps) {
  const toast = useToast();
  const canEdit = user?.role === 'admin';

  const [showAddModal, setShowAddModal] = useState(false);
  const [fecha, setFecha] = useState(todayIso());
  const [empresa, setEmpresa] = useState('');
  const [numeroOrden, setNumeroOrden] = useState('');
  const [monto, setMonto] = useState('');

  const [editingLimit, setEditingLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState(String(weeklyLimit));

  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [tempFecha, setTempFecha] = useState('');
  const [tempEmpresa, setTempEmpresa] = useState('');
  const [tempNumeroOrden, setTempNumeroOrden] = useState('');
  const [tempMonto, setTempMonto] = useState('');
  const [orderToDelete, setOrderToDelete] = useState<PurchaseOrder | null>(null);

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printWeekKey, setPrintWeekKey] = useState('');

  const currentWeekKey = getWeekKey(new Date().toISOString());
  const currentWeekTotal = useMemo(
    () => purchaseOrders.filter(o => getWeekKey(o.fecha) === currentWeekKey).reduce((sum, o) => sum + (o.monto || 0), 0),
    [purchaseOrders, currentWeekKey]
  );
  const pct = weeklyLimit > 0 ? Math.min(100, (currentWeekTotal / weeklyLimit) * 100) : 0;
  const overLimit = currentWeekTotal > weeklyLimit;
  const barColor = overLimit ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-primary';

  const weekGroups = useMemo(() => {
    const map: Record<string, PurchaseOrder[]> = {};
    purchaseOrders.forEach(o => {
      const wk = getWeekKey(o.fecha);
      if (!map[wk]) map[wk] = [];
      map[wk].push(o);
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [purchaseOrders]);

  // Includes the current week even if it has no orders yet, so it can be printed as an empty/in-progress report.
  const printableWeekKeys = useMemo(() => {
    const keys = new Set<string>(weekGroups.map(([wk]) => wk));
    keys.add(currentWeekKey);
    return Array.from(keys).sort((a, b) => b.localeCompare(a));
  }, [weekGroups, currentWeekKey]);

  const printOrders = useMemo(
    () => purchaseOrders.filter(o => getWeekKey(o.fecha) === printWeekKey).sort((a, b) => a.fecha.localeCompare(b.fecha)),
    [purchaseOrders, printWeekKey]
  );
  const printTotal = printOrders.reduce((sum, o) => sum + (o.monto || 0), 0);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const montoNum = parseFloat(monto);
    if (!empresa.trim() || !numeroOrden.trim() || isNaN(montoNum) || montoNum <= 0) {
      toast.error('Completa todos los campos con un monto válido.');
      return;
    }
    onAddPurchaseOrder({
      id: 'odc_' + Date.now(),
      fecha,
      empresa: empresa.trim(),
      numeroOrden: numeroOrden.trim(),
      monto: montoNum,
      user: user?.displayName || user?.fullName || user?.username || '',
      lastUpdated: new Date().toISOString(),
    });
    toast.success('Orden de compra registrada con éxito.');
    setShowAddModal(false);
    setFecha(todayIso());
    setEmpresa('');
    setNumeroOrden('');
    setMonto('');
  };

  const handleSaveLimit = () => {
    const n = parseFloat(tempLimit);
    if (isNaN(n) || n <= 0) {
      toast.error('Ingresa un tope semanal válido.');
      return;
    }
    onUpdateOdcLimit(n);
    setEditingLimit(false);
    toast.success('Tope semanal actualizado con éxito.');
  };

  const startEditOrder = (o: PurchaseOrder) => {
    setEditingOrderId(o.id);
    setTempFecha(o.fecha.slice(0, 10));
    setTempEmpresa(o.empresa);
    setTempNumeroOrden(o.numeroOrden);
    setTempMonto(String(o.monto));
  };

  const saveEditOrder = (id: string) => {
    const montoNum = parseFloat(tempMonto);
    if (!tempEmpresa.trim() || !tempNumeroOrden.trim() || isNaN(montoNum) || montoNum <= 0) {
      toast.error('Completa todos los campos con un monto válido.');
      return;
    }
    onUpdatePurchaseOrder(id, {
      fecha: tempFecha,
      empresa: tempEmpresa.trim(),
      numeroOrden: tempNumeroOrden.trim(),
      monto: montoNum,
      lastUpdated: new Date().toISOString(),
    });
    setEditingOrderId(null);
    toast.success('Orden actualizada con éxito.');
  };

  return (
    <>
      <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 print-hide">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-sans text-[26px] sm:text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">ODC</h2>
            <p className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-on-surface-variant mt-1 sm:mt-2">Control de órdenes de compra y tope semanal.</p>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => { setPrintWeekKey(currentWeekKey); setShowPrintModal(true); }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface rounded-full font-sans text-[15px] font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Printer size={18} />
              Imprimir
            </button>
            {canEdit && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/95 rounded-full font-sans text-[15px] font-semibold transition-all shadow-md cursor-pointer"
              >
                <Plus size={18} />
                Nueva Orden
              </button>
            )}
          </div>
        </header>

        {/* Weekly summary */}
        <div className="bg-card-surface rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] mb-6">
          <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
            <div>
              <span className="font-mono text-[11px] sm:text-[13px] opacity-70 uppercase tracking-wider">Gasto de la semana actual</span>
              <div className="font-sans text-[26px] sm:text-[32px] font-bold text-on-surface leading-tight">{formatMoney(currentWeekTotal)}</div>
            </div>
            <div className="text-right">
              <span className="font-mono text-[11px] sm:text-[13px] opacity-70 uppercase tracking-wider">Tope semanal</span>
              {editingLimit ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    autoFocus
                    value={tempLimit}
                    onChange={(e) => setTempLimit(e.target.value)}
                    className="w-28 bg-white border border-outline-variant/50 rounded-xl py-1.5 px-2 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                  <button onClick={handleSaveLimit} className="text-primary hover:text-primary/70 cursor-pointer" title="Guardar">
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="font-sans text-[20px] sm:text-[24px] font-bold text-on-surface">{formatMoney(weeklyLimit)}</span>
                  {canEdit && (
                    <button
                      onClick={() => { setTempLimit(String(weeklyLimit)); setEditingLimit(true); }}
                      className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      title="Editar tope semanal"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-3 bg-surface-variant/40 rounded-full overflow-hidden">
            <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="font-mono text-[12px] text-on-surface-variant">{pct.toFixed(0)}% del tope usado</span>
            {overLimit ? (
              <span className="flex items-center gap-1 font-mono text-[12px] font-bold text-red-600">
                <AlertTriangle size={13} />
                Excedido por {formatMoney(currentWeekTotal - weeklyLimit)}
              </span>
            ) : (
              <span className="font-mono text-[12px] text-on-surface-variant">Restante: {formatMoney(weeklyLimit - currentWeekTotal)}</span>
            )}
          </div>
        </div>

        {/* Orders grouped by week */}
        {weekGroups.length === 0 ? (
          <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8 animate-in fade-in duration-300">
            <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
              <FileSpreadsheet size={36} />
            </div>
            <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">No hay órdenes registradas</h3>
            <p className="font-sans text-[15px] text-on-surface-variant max-w-md mb-6">Registra la primera orden de compra usando el botón de arriba.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {weekGroups.map(([weekKey, weekOrders]) => {
              const weekTotal = weekOrders.reduce((sum, o) => sum + (o.monto || 0), 0);
              const weekOverLimit = weekTotal > weeklyLimit;
              const dayMap: Record<string, PurchaseOrder[]> = {};
              weekOrders.forEach(o => {
                const dk = getDayKey(o.fecha);
                if (!dayMap[dk]) dayMap[dk] = [];
                dayMap[dk].push(o);
              });
              const dayGroups = Object.entries(dayMap).sort((a, b) => b[0].localeCompare(a[0]));

              return (
                <div key={weekKey} className="bg-card-surface rounded-3xl shadow-[0_4px_20px_rgba(40,28,25,0.05)] overflow-hidden">
                  <div className="flex flex-wrap justify-between items-center gap-2 px-5 sm:px-6 py-4 border-b border-outline-variant/10">
                    <h3 className="font-sans text-[15px] sm:text-[16px] font-bold text-on-surface capitalize">{formatWeekLabel(weekOrders[0].fecha)}</h3>
                    <span className={`px-3 py-1 rounded-full font-mono text-[12px] font-bold ${weekOverLimit ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'}`}>
                      {formatMoney(weekTotal)} / {formatMoney(weeklyLimit)}
                    </span>
                  </div>

                  <div className="flex flex-col divide-y divide-outline-variant/10">
                    {dayGroups.map(([dayKey, dayOrders]) => {
                      const dayTotal = dayOrders.reduce((sum, o) => sum + (o.monto || 0), 0);
                      return (
                        <div key={dayKey} className="px-5 sm:px-6 py-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-[11.5px] text-on-surface-variant uppercase tracking-wider capitalize">{formatDayLabel(dayOrders[0].fecha)}</span>
                            <span className="font-mono text-[12px] font-semibold text-on-surface">{formatMoney(dayTotal)}</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            {dayOrders.map(o => (
                              <Fragment key={o.id}>
                                {editingOrderId === o.id ? (
                                  <div className="flex flex-col sm:flex-row gap-2 bg-white/60 rounded-xl p-2.5 border border-outline-variant/20">
                                    <input type="date" value={tempFecha} onChange={(e) => setTempFecha(e.target.value)} className="flex-1 min-w-0 bg-white border border-outline-variant/50 rounded-lg py-1.5 px-2 font-sans text-[13px]" />
                                    <input type="text" value={tempEmpresa} onChange={(e) => setTempEmpresa(e.target.value)} placeholder="Empresa" className="flex-1 min-w-0 bg-white border border-outline-variant/50 rounded-lg py-1.5 px-2 font-sans text-[13px]" />
                                    <input type="text" value={tempNumeroOrden} onChange={(e) => setTempNumeroOrden(e.target.value)} placeholder="N° orden" className="flex-1 min-w-0 bg-white border border-outline-variant/50 rounded-lg py-1.5 px-2 font-sans text-[13px]" />
                                    <input type="number" step="0.01" min="0" value={tempMonto} onChange={(e) => setTempMonto(e.target.value)} placeholder="Monto" className="w-full sm:w-24 bg-white border border-outline-variant/50 rounded-lg py-1.5 px-2 font-sans text-[13px]" />
                                    <div className="flex gap-1 justify-end">
                                      <button onClick={() => saveEditOrder(o.id)} className="text-primary hover:text-primary/70 p-1 cursor-pointer" title="Guardar"><Check size={16} /></button>
                                      <button onClick={() => setEditingOrderId(null)} className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer" title="Cancelar"><X size={16} /></button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 hover:bg-white/40 transition-colors">
                                    <div className="min-w-0 flex-1">
                                      <span className="font-sans text-[13.5px] font-semibold text-on-surface truncate block">{o.empresa}</span>
                                      <span className="font-mono text-[11px] text-on-surface-variant">{formatShortDate(o.fecha)} · N° {o.numeroOrden}</span>
                                    </div>
                                    <span className="font-mono text-[13.5px] font-bold text-on-surface flex-shrink-0">{formatMoney(o.monto)}</span>
                                    {canEdit && (
                                      <div className="flex gap-1 flex-shrink-0">
                                        <button onClick={() => startEditOrder(o)} className="text-on-surface-variant hover:text-primary p-1 cursor-pointer" title="Editar"><Pencil size={13} /></button>
                                        <button onClick={() => setOrderToDelete(o)} className="text-on-surface-variant hover:text-error p-1 cursor-pointer" title="Eliminar"><Trash2 size={13} /></button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Print-only report for the selected week */}
      <div className="hidden print:block w-full text-black font-sans bg-white p-2">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Súper Samán — Órdenes de Compra (ODC)</h1>
          <p className="text-sm mt-1 capitalize">{printWeekKey && formatWeekLabel(printWeekKey)}</p>
        </div>
        <div className="mb-5 text-sm flex flex-col gap-1">
          <div><strong>Tope semanal:</strong> {formatMoney(weeklyLimit)}</div>
          <div><strong>Total de la semana:</strong> {formatMoney(printTotal)}</div>
          <div>
            <strong>{printTotal > weeklyLimit ? 'Excedido por' : 'Restante'}:</strong> {formatMoney(Math.abs(weeklyLimit - printTotal))}
          </div>
        </div>
        {printOrders.length === 0 ? (
          <p className="text-sm">No hay órdenes registradas en esta semana.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-black py-2.5 text-sm font-bold font-mono text-left">Fecha</th>
                <th className="border-b-2 border-black py-2.5 text-sm font-bold font-mono text-left">Empresa</th>
                <th className="border-b-2 border-black py-2.5 text-sm font-bold font-mono text-left">N° Orden</th>
                <th className="border-b-2 border-black py-2.5 text-sm font-bold font-mono text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {printOrders.map(o => (
                <tr key={o.id}>
                  <td className="py-3 text-sm border-b border-gray-200">{formatShortDate(o.fecha)}</td>
                  <td className="py-3 text-sm border-b border-gray-200">{o.empresa}</td>
                  <td className="py-3 text-sm border-b border-gray-200">{o.numeroOrden}</td>
                  <td className="py-3 text-sm border-b border-gray-200 text-right">{formatMoney(o.monto)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="py-3 text-sm font-bold text-right border-t-2 border-black">Total</td>
                <td className="py-3 text-sm font-bold text-right border-t-2 border-black">{formatMoney(printTotal)}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {showPrintModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 print-hide" onClick={() => setShowPrintModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface flex items-center gap-2">
                <Printer className="text-primary" size={20} />
                Imprimir Reporte
              </h3>
              <button onClick={() => setShowPrintModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Semana a imprimir</label>
                <select
                  value={printWeekKey}
                  onChange={(e) => setPrintWeekKey(e.target.value)}
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3.5 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm capitalize"
                >
                  {printableWeekKeys.map(wk => (
                    <option key={wk} value={wk}>
                      {formatWeekLabel(wk)}{wk === currentWeekKey ? ' (actual)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowPrintModal(false)} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => { window.print(); setShowPrintModal(false); }}
                  className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer size={16} />
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 print-hide" onClick={() => setShowAddModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Nueva Orden de Compra</h3>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Fecha</label>
                <input type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Empresa</label>
                <input type="text" required autoFocus value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Ej. Distribuidora XYZ" className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Número de Orden</label>
                <input type="text" required value={numeroOrden} onChange={(e) => setNumeroOrden(e.target.value)} placeholder="Ej. OC-0452" className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Monto ($)</label>
                <input type="number" required step="0.01" min="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0.00" className="w-full bg-white border border-outline-variant/50 rounded-2xl py-3 px-4 font-sans text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
                  Registrar Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {orderToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 print-hide" onClick={() => setOrderToDelete(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-sm shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={26} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-sans text-[20px] font-bold text-on-surface">Eliminar Orden</h3>
                <p className="font-sans text-[14px] text-on-surface-variant mt-1">
                  ¿Estás seguro de que deseas eliminar la orden <strong>N° {orderToDelete.numeroOrden}</strong> de {orderToDelete.empresa}?
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button onClick={() => setOrderToDelete(null)} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer">
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onDeletePurchaseOrder(orderToDelete.id);
                    toast.success('Orden eliminada con éxito.');
                    setOrderToDelete(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-sans text-[14px] font-semibold py-3.5 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
