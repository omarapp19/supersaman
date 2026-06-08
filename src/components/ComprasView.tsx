import { useState } from 'react';
import { Search, Printer, ChevronDown, X, Store, CheckCircle2, Circle, CalendarDays, Package } from 'lucide-react';
import { ViewState, OrderItem, Aisle } from '../types';

interface ComprasViewProps {
  orders: OrderItem[];
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  checkedOrders: Set<string>;
  toggleChecked: (id: string) => void;
}

// Format ISO date string into a readable day label
function formatDayLabel(isoOrLegacy: string): string {
  // Handle legacy "Justo ahora" or other non-ISO strings
  const date = new Date(isoOrLegacy);
  if (isNaN(date.getTime())) return 'Sin fecha';

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) return 'Hoy';
  if (sameDay(date, yesterday)) return 'Ayer';

  return date.toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get YYYY-MM-DD key from ISO string for grouping
function getDayKey(isoOrLegacy: string): string {
  const date = new Date(isoOrLegacy);
  if (isNaN(date.getTime())) return 'legacy';
  return date.toISOString().slice(0, 10);
}

// Format time from ISO string
function formatTime(isoOrLegacy: string): string {
  const date = new Date(isoOrLegacy);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
}

export function ComprasView({ orders, onNavigate, aisles, checkedOrders, toggleChecked }: ComprasViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAisleFilter, setSelectedAisleFilter] = useState<number | null>(null);
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(new Set());

  const toggleDay = (key: string) => {
    setCollapsedDays(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredOrders = orders.filter(order => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const match =
        order.productName.toLowerCase().includes(query) ||
        order.brand.toLowerCase().includes(query) ||
        order.sku.toLowerCase().includes(query);
      if (!match) return false;
    }
    if (selectedAisleFilter !== null && order.aisle !== selectedAisleFilter) return false;
    return true;
  });

  // Group filtered orders by day, most recent first
  const grouped: { key: string; label: string; items: OrderItem[] }[] = [];
  const seenKeys: Record<string, number> = {};

  filteredOrders.forEach(order => {
    const key = getDayKey(order.lastUpdated);
    if (seenKeys[key] === undefined) {
      seenKeys[key] = grouped.length;
      grouped.push({ key, label: formatDayLabel(order.lastUpdated), items: [] });
    }
    grouped[seenKeys[key]].items.push(order);
  });

  // Sort groups: most recent day first
  grouped.sort((a, b) => b.key.localeCompare(a.key));

  const totalChecked = checkedOrders.size;

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print-hide">
        <div>
          <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Consolidado de Pedidos</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2 max-w-2xl">
            Sugeridos agrupados por día · {totalChecked > 0 && <span className="text-primary font-semibold">{totalChecked} confirmado{totalChecked !== 1 ? 's' : ''} · </span>}{filteredOrders.length} en total
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70" size={18} />
            <input
              type="text"
              placeholder="Buscar SKU o Producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-outline-variant/30 rounded-full py-2.5 pl-10 pr-4 font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
            />
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-mono text-[13px] font-medium hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
          >
            <Printer size={18} />
            Imprimir
          </button>
        </div>
      </div>

      {/* Aisle filters */}
      <div className="flex flex-wrap gap-2 mb-6 print-hide">
        <button
          onClick={() => setSelectedAisleFilter(null)}
          className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm cursor-pointer ${
            selectedAisleFilter === null
              ? 'bg-secondary-container text-on-secondary-container border-secondary/10'
              : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
          }`}
        >
          Todos los Pasillos
        </button>
        {aisles.map(aisle => (
          <button
            key={aisle.id}
            onClick={() => setSelectedAisleFilter(aisle.number)}
            className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm cursor-pointer ${
              selectedAisleFilter === aisle.number
                ? 'bg-secondary-container text-on-secondary-container border-secondary/10'
                : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
            }`}
          >
            Pasillo {aisle.number}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {grouped.length === 0 && (
        <div className="bg-card-surface rounded-[32px] p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm mt-8">
          <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
            <Package size={36} />
          </div>
          <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">Sin sugeridos</h3>
          <p className="font-sans text-[15px] text-on-surface-variant max-w-md">
            {searchQuery ? 'No hay resultados para tu búsqueda.' : 'Aún no se han enviado sugeridos. Ve a la sección de Sugeridos para comenzar.'}
          </p>
        </div>
      )}

      {/* Day groups */}
      <div className="flex flex-col gap-5">
        {grouped.map(({ key, label, items }) => {
          const isCollapsed = collapsedDays.has(key);
          const confirmedInDay = items.filter(o => checkedOrders.has(o.id)).length;
          const isToday = label === 'Hoy';

          return (
            <div key={key} className="bg-card-surface rounded-[24px] shadow-[0_4px_20px_rgba(40,28,25,0.05)] overflow-hidden">
              {/* Day Header */}
              <button
                onClick={() => toggleDay(key)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-variant/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isToday ? 'bg-primary/10 text-primary' : 'bg-surface-variant/60 text-on-surface-variant'}`}>
                    <CalendarDays size={18} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className={`font-sans text-[16px] font-bold capitalize ${isToday ? 'text-primary' : 'text-on-surface'}`}>
                        {label}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/20">
                          Activo
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[13px] text-on-surface-variant">
                      {items.length} sugerido{items.length !== 1 ? 's' : ''}
                      {confirmedInDay > 0 && (
                        <span className="text-primary"> · {confirmedInDay} confirmado{confirmedInDay !== 1 ? 's' : ''}</span>
                      )}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-on-surface-variant transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                />
              </button>

              {/* Items list */}
              {!isCollapsed && (
                <div className="border-t border-outline-variant/10">
                  {items.map((order, idx) => {
                    const isChecked = checkedOrders.has(order.id);
                    return (
                      <div
                        key={order.id}
                        className={`flex items-center gap-3 px-6 py-4 border-b border-outline-variant/10 last:border-b-0 transition-colors ${
                          isChecked ? 'bg-primary/5 opacity-60' : 'hover:bg-surface-variant/20'
                        }`}
                      >
                        {/* Check button */}
                        <button
                          onClick={() => toggleChecked(order.id)}
                          title={isChecked ? 'Marcar como pendiente' : 'Marcar como pedido'}
                          className={`flex-shrink-0 transition-colors rounded-full ${
                            isChecked ? 'text-primary' : 'text-outline-variant/50 hover:text-primary'
                          }`}
                        >
                          {isChecked
                            ? <CheckCircle2 size={22} strokeWidth={2} />
                            : <Circle size={22} strokeWidth={1.5} />}
                        </button>

                        {/* Main info — clickable to open modal */}
                        <div
                          className="flex-1 flex items-center justify-between gap-4 cursor-pointer min-w-0"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <div className="min-w-0">
                            <p className={`font-sans text-[15px] font-semibold truncate ${isChecked ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                              {order.productName}
                            </p>
                            <p className="font-mono text-[12px] text-on-surface-variant truncate">
                              {order.brand} · SKU {order.sku} · Pasillo {order.aisle}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-sans text-[15px] font-bold text-on-surface whitespace-nowrap">
                              {order.suggestedQty} {order.unit || 'und'}
                            </span>
                            {isChecked
                              ? <span className="inline-flex px-2.5 py-1 bg-primary/10 text-primary rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/20 whitespace-nowrap">Pedido ✓</span>
                              : <>
                                {order.status === 'crítico' && <span className="inline-flex px-2.5 py-1 bg-error/10 text-error rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-error/20 whitespace-nowrap">Crítico</span>}
                                {order.status === 'bajo' && <span className="inline-flex px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/20 whitespace-nowrap">Bajo</span>}
                                {order.status === 'normal' && <span className="inline-flex px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-secondary/20 whitespace-nowrap">Normal</span>}
                              </>
                            }
                            <span className="font-mono text-[12px] text-on-surface-variant/60 hidden sm:block">
                              {formatTime(order.lastUpdated)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedOrder(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-lg shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Detalle de Pedido</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Producto</span>
                <span className="font-sans text-[18px] font-bold text-on-surface leading-tight mt-0.5">{selectedOrder.productName}</span>
                <span className="font-mono text-[13px] text-[#4f6b53] mt-0.5">{selectedOrder.brand}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-outline-variant/15 py-4 my-2">
                <div>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">SKU</span>
                  <span className="font-mono text-[14px] font-semibold text-on-surface">{selectedOrder.sku}</span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">Cantidad Sugerida</span>
                  <span className="font-sans text-[16px] font-bold text-primary">{selectedOrder.suggestedQty} {selectedOrder.unit || 'und'}</span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">Ubicación</span>
                  <span className="font-sans text-[14px] text-on-surface">Pasillo {selectedOrder.aisle}</span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">Solicitado Por</span>
                  <span className="font-sans text-[14px] text-on-surface">{selectedOrder.user}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Estado</span>
                  <div className="mt-1">
                    {selectedOrder.status === 'crítico' && <span className="inline-flex px-3 py-1 bg-error/10 text-error rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border border-error/20">Crítico</span>}
                    {selectedOrder.status === 'bajo' && <span className="inline-flex px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border border-amber-500/20">Stock Bajo</span>}
                    {selectedOrder.status === 'normal' && <span className="inline-flex px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border border-secondary/20">Normal</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">Enviado</span>
                  <span className="font-mono text-[13px] text-on-surface-variant">
                    {formatDayLabel(selectedOrder.lastUpdated)} {formatTime(selectedOrder.lastUpdated)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-variant/30 border-t border-outline-variant/20 flex gap-3">
              <button onClick={() => setSelectedOrder(null)} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm transition-all">
                Cerrar
              </button>
              <button
                onClick={() => { setSelectedOrder(null); onNavigate('pasillo-detail', selectedOrder.aisle); }}
                className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Store size={16} />
                Ir al Pasillo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
