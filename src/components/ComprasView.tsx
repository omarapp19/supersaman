import { useState, useEffect } from 'react';
import { Search, Printer, ChevronDown, X, Store, CheckCircle2, Circle, CalendarDays, Package, ArrowUp } from 'lucide-react';
import { ViewState, OrderItem, Aisle } from '../types';

interface ComprasViewProps {
  orders: OrderItem[];
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  checkedOrders: Set<string>;
  toggleChecked: (id: string) => void;
  user?: any;
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

// Get the Monday of the week for a given ISO or legacy date string
function getStartOfWeekDate(isoOrLegacy: string): Date {
  const date = new Date(isoOrLegacy);
  if (isNaN(date.getTime())) return new Date();
  
  const day = date.getDay(); // 0 is Sunday, 6 is Saturday
  // Adjust to make Monday index 0:
  // If Sunday (0), subtract 6 days. Otherwise, subtract (day - 1) days.
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Generate a human-readable week label
function formatWeekLabel(isoOrLegacy: string): string {
  const monday = getStartOfWeekDate(isoOrLegacy);
  const label = monday.toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return "Semana del " + label;
}

// Get week key (YYYY-MM-DD representing the Monday)
function getWeekKey(isoOrLegacy: string): string {
  const monday = getStartOfWeekDate(isoOrLegacy);
  return monday.toISOString().slice(0, 10);
}

export function ComprasView({ orders, onNavigate, aisles, checkedOrders, toggleChecked, user }: ComprasViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAisleFilter, setSelectedAisleFilter] = useState<number | null>(null);
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(new Set());
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printGroupBy, setPrintGroupBy] = useState<'aisle' | 'day' | 'week' | 'operator'>('aisle');
  const [printScope, setPrintScope] = useState<'all' | 'pending' | 'completed'>('all');
  const [printStatusFilter, setPrintStatusFilter] = useState<'all' | 'critical' | 'critical-low'>('all');

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isOperator = user?.role === 'operador';
  const operatorName = user?.displayName || user?.fullName || '';

  const toggleDay = (key: string) => {
    setCollapsedDays(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredOrders = orders.filter(order => {
    // If operator, only show orders submitted by this operator
    if (isOperator && operatorName) {
      const orderUser = order.user || '';
      if (orderUser.toLowerCase() !== operatorName.toLowerCase()) {
        return false;
      }
    }

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

  // FILTER ORDERS FOR PRINTING
  const ordersToPrint = orders.filter(order => {
    // If operator, only show orders submitted by this operator
    if (isOperator && operatorName) {
      const orderUser = order.user || '';
      if (orderUser.toLowerCase() !== operatorName.toLowerCase()) {
        return false;
      }
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const match =
        order.productName.toLowerCase().includes(query) ||
        order.brand.toLowerCase().includes(query) ||
        order.sku.toLowerCase().includes(query);
      if (!match) return false;
    }
    
    if (selectedAisleFilter !== null && order.aisle !== selectedAisleFilter) {
      return false;
    }

    // Print Scope Filter
    const isChecked = checkedOrders.has(order.id);
    if (printScope === 'pending' && isChecked) return false;
    if (printScope === 'completed' && !isChecked) return false;

    // Print Status Filter
    if (printStatusFilter === 'critical' && order.status !== 'crítico') return false;
    if (printStatusFilter === 'critical-low' && order.status !== 'crítico' && order.status !== 'bajo') return false;

    return true;
  });

  // GROUP ORDERS FOR PRINTING
  interface PrintGroup {
    id: string;
    title: string;
    items: OrderItem[];
  }
  
  const printGroups: PrintGroup[] = [];

  if (printGroupBy === 'aisle') {
    const aisleMap: Record<number, OrderItem[]> = {};
    ordersToPrint.forEach(order => {
      const aNum = order.aisle || 0;
      if (!aisleMap[aNum]) aisleMap[aNum] = [];
      aisleMap[aNum].push(order);
    });
    const sortedAisles = Object.keys(aisleMap).map(Number).sort((a, b) => a - b);
    sortedAisles.forEach(aNum => {
      const aisleObj = aisles.find(a => a.number === aNum);
      const title = aisleObj 
        ? `Pasillo ${aNum} - ${aisleObj.name}` 
        : `Pasillo ${aNum}`;
      printGroups.push({
        id: `aisle-${aNum}`,
        title,
        items: aisleMap[aNum]
      });
    });
  } else if (printGroupBy === 'day') {
    const dayMap: Record<string, { label: string; items: OrderItem[] }> = {};
    ordersToPrint.forEach(order => {
      const key = getDayKey(order.lastUpdated);
      if (!dayMap[key]) {
        dayMap[key] = {
          label: formatDayLabel(order.lastUpdated),
          items: []
        };
      }
      dayMap[key].items.push(order);
    });
    const sortedDays = Object.keys(dayMap).sort((a, b) => b.localeCompare(a));
    sortedDays.forEach(key => {
      printGroups.push({
        id: `day-${key}`,
        title: dayMap[key].label,
        items: dayMap[key].items
      });
    });
  } else if (printGroupBy === 'week') {
    const weekMap: Record<string, { label: string; items: OrderItem[] }> = {};
    ordersToPrint.forEach(order => {
      const key = getWeekKey(order.lastUpdated);
      if (!weekMap[key]) {
        weekMap[key] = {
          label: formatWeekLabel(order.lastUpdated),
          items: []
        };
      }
      weekMap[key].items.push(order);
    });
    const sortedWeeks = Object.keys(weekMap).sort((a, b) => b.localeCompare(a));
    sortedWeeks.forEach(key => {
      printGroups.push({
        id: `week-${key}`,
        title: weekMap[key].label,
        items: weekMap[key].items
      });
    });
  } else if (printGroupBy === 'operator') {
    const opMap: Record<string, OrderItem[]> = {};
    ordersToPrint.forEach(order => {
      const opName = order.user || 'Sin asignar';
      if (!opMap[opName]) opMap[opName] = [];
      opMap[opName].push(order);
    });
    const sortedOps = Object.keys(opMap).sort((a, b) => a.localeCompare(b));
    sortedOps.forEach(opName => {
      printGroups.push({
        id: `op-${opName}`,
        title: `Operador: ${opName}`,
        items: opMap[opName]
      });
    });
  }

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* SCREEN VIEW */}
      <div className="print-hide">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">
              {isOperator ? 'Mis Pedidos Enviados' : 'Consolidado de Pedidos'}
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2 max-w-2xl">
              {isOperator 
                ? 'Listado de tus sugerencias de compra enviadas para abastecimiento.' 
                : `Sugeridos agrupados por día · ${totalChecked > 0 ? `${totalChecked} confirmado(s) · ` : ''}${filteredOrders.length} en total`
              }
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
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-mono text-[13px] font-medium hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Printer size={18} />
              Imprimir
            </button>
          </div>
        </div>

        {/* Aisle filters */}
        <div className="flex flex-wrap gap-2 mb-6">
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
          {aisles
            .filter(aisle => !isOperator || user?.assignedAisles?.includes(aisle.number))
            .map(aisle => (
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
                          {isOperator ? (
                            <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full mr-1 ${
                              isChecked ? 'text-primary bg-primary/10' : 'text-on-surface-variant/40 bg-surface-variant/30'
                            }`}>
                              {isChecked ? (
                                <CheckCircle2 size={18} strokeWidth={2.5} />
                              ) : (
                                <Circle size={18} strokeWidth={2} className="opacity-60" />
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleChecked(order.id)}
                              title={isChecked ? 'Marcar como pendiente' : 'Marcar como pedido'}
                              className={`flex-shrink-0 transition-colors rounded-full cursor-pointer ${
                                isChecked ? 'text-primary' : 'text-outline-variant/50 hover:text-primary'
                              }`}
                            >
                              {isChecked
                                ? <CheckCircle2 size={22} strokeWidth={2} />
                                : <Circle size={22} strokeWidth={1.5} />}
                            </button>
                          )}

                          {/* Main info — clickable to open modal */}
                          <div
                            className="flex-1 flex items-center justify-between gap-4 cursor-pointer min-w-0"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <div className="min-w-0">
                              <p className={`font-sans text-[15px] font-semibold ${isChecked ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                                {order.productName}
                              </p>
                              <p className="font-mono text-[12px] text-on-surface-variant">
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
      </div>

      {/* PRINT-ONLY VIEW */}
      <div className="hidden print:block w-full text-black font-sans bg-white p-2">
        {/* Header of printed page */}
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">Súper Samán</h1>
            <p className="text-xs text-gray-600 mt-1 uppercase font-mono">Reporte de Fallas y Pedidos de Abastecimiento</p>
          </div>
          <div className="text-right font-mono text-xs">
            <div>Fecha: {new Date().toLocaleDateString('es-VE')}</div>
            <div>Hora: {new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>

        {/* Filters explanation */}
        <div className="bg-gray-100 p-3 rounded-lg mb-6 text-xs flex flex-wrap gap-x-8 gap-y-1 font-mono">
          <div><strong>Agrupado por:</strong> {
            printGroupBy === 'aisle' ? 'Pasillo' :
            printGroupBy === 'day' ? 'Día' :
            printGroupBy === 'week' ? 'Semana' : 'Operador'
          }</div>
          <div><strong>Filtro de stock:</strong> {
            printStatusFilter === 'all' ? 'Todos' :
            printStatusFilter === 'critical' ? 'Solo Crítico' : 'Crítico y Bajo'
          }</div>
          <div><strong>Filtro de pedido:</strong> {
            printScope === 'all' ? 'Todos' :
            printScope === 'pending' ? 'Solo Pendientes' : 'Solo Pedidos/Completados'
          }</div>
          {selectedAisleFilter !== null && (
            <div><strong>Filtro pasillo pantalla:</strong> Pasillo {selectedAisleFilter}</div>
          )}
          {searchQuery.trim() && (
            <div><strong>Búsqueda pantalla:</strong> "{searchQuery}"</div>
          )}
          <div><strong>Total registros:</strong> {ordersToPrint.length}</div>
        </div>

        {ordersToPrint.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg text-gray-500 font-medium">
            No hay fallas que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {printGroups.map(group => (
              <div key={group.id} className="print-group-section">
                <h3 className="text-sm font-bold bg-gray-200 px-3 py-1.5 border border-gray-400 mb-3 tracking-wide uppercase">
                  {group.title} ({group.items.length})
                </h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">Producto</th>
                      <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">SKU</th>
                      {printGroupBy !== 'aisle' && <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">Pasillo</th>}
                      <th className="border-b-2 border-black py-2 text-xs font-bold font-mono text-right">Cant. Sugerida</th>
                      <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">Estado</th>
                      {printGroupBy !== 'operator' && <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">Operador</th>}
                      {printGroupBy !== 'day' && printGroupBy !== 'week' && <th className="border-b-2 border-black py-2 text-xs font-bold font-mono">Fecha / Hora</th>}
                      <th className="border-b-2 border-black py-2 text-xs font-bold font-mono text-center">✓</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map(item => {
                      const isChecked = checkedOrders.has(item.id);
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-2 text-xs font-medium border-b border-gray-200">
                            <div>{item.productName}</div>
                            <div className="text-[10px] text-gray-500 italic">{item.brand}</div>
                          </td>
                          <td className="py-2 text-xs font-mono border-b border-gray-200">{item.sku}</td>
                          {printGroupBy !== 'aisle' && <td className="py-2 text-xs border-b border-gray-200">Pasillo {item.aisle}</td>}
                          <td className="py-2 text-xs font-bold text-right border-b border-gray-200">{item.suggestedQty} {item.unit || 'und'}</td>
                          <td className="py-2 text-xs font-mono uppercase border-b border-gray-200">
                            <span className={
                              item.status === 'crítico' ? 'text-red-700 font-bold' :
                              item.status === 'bajo' ? 'text-amber-700 font-semibold' : 'text-gray-700'
                            }>
                              {item.status}
                            </span>
                          </td>
                          {printGroupBy !== 'operator' && <td className="py-2 text-xs border-b border-gray-200">{item.user}</td>}
                          {printGroupBy !== 'day' && printGroupBy !== 'week' && (
                            <td className="py-2 text-xs font-mono border-b border-gray-200">
                              {formatDayLabel(item.lastUpdated)} {formatTime(item.lastUpdated)}
                            </td>
                          )}
                          <td className="py-2 text-xs text-center border-b border-gray-200 font-mono">
                            {isChecked ? 'SI' : 'NO'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 print-hide" onClick={() => setSelectedOrder(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-lg shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20 flex-shrink-0">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Detalle de Pedido</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
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

            <div className="p-6 bg-surface-variant/30 border-t border-outline-variant/20 flex gap-3 flex-shrink-0">
              <button onClick={() => setSelectedOrder(null)} className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm transition-all cursor-pointer">
                Cerrar
              </button>
              <button
                onClick={() => { setSelectedOrder(null); onNavigate('pasillo-detail', selectedOrder.aisle); }}
                className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Store size={16} />
                Ir al Pasillo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Config Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 print-hide" onClick={() => setShowPrintModal(false)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-md shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20 flex-shrink-0">
              <h3 className="font-sans text-[18px] font-bold text-on-surface flex items-center gap-2">
                <Printer className="text-primary" size={20} />
                Configurar Reporte Impreso
              </h3>
              <button onClick={() => setShowPrintModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1">
              {/* Group By Options */}
              <div>
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Agrupar fallas por:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'aisle', label: 'Pasillo' },
                    { val: 'day', label: 'Día' },
                    { val: 'week', label: 'Semana' },
                    { val: 'operator', label: 'Operador' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setPrintGroupBy(opt.val as any)}
                      className={`py-2 px-4 rounded-xl border font-sans text-[13px] font-medium transition-all cursor-pointer text-center ${
                        printGroupBy === opt.val
                          ? 'bg-primary/10 text-primary border-primary font-bold'
                          : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter Options */}
              <div>
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Nivel de Stock (Filtro):
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: 'all', label: 'Todos los niveles' },
                    { val: 'critical', label: 'Solo fallas críticas' },
                    { val: 'critical-low', label: 'Fallas críticas y bajas' }
                  ].map(opt => (
                    <label
                      key={opt.val}
                      className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-outline-variant/20 hover:bg-surface-variant/10 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="printStatus"
                        value={opt.val}
                        checked={printStatusFilter === opt.val}
                        onChange={() => setPrintStatusFilter(opt.val as any)}
                        className="w-4.5 h-4.5 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <span className="font-sans text-[13px] text-on-surface">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Scope Filter Options */}
              <div>
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Estado de pedido:
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: 'all', label: 'Todas las fallas (Pendientes + Pedidas)' },
                    { val: 'pending', label: 'Solo pendientes (Sin pedir)' },
                    { val: 'completed', label: 'Solo ordenados/pedidos' }
                  ].map(opt => (
                    <label
                      key={opt.val}
                      className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-outline-variant/20 hover:bg-surface-variant/10 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="printScope"
                        value={opt.val}
                        checked={printScope === opt.val}
                        onChange={() => setPrintScope(opt.val as any)}
                        className="w-4.5 h-4.5 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <span className="font-sans text-[13px] text-on-surface">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-variant/30 border-t border-outline-variant/20 flex gap-3 flex-shrink-0">
              <button
                onClick={() => setShowPrintModal(false)}
                className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setTimeout(() => {
                    window.print();
                    setShowPrintModal(false);
                  }, 250);
                }}
                className="flex-1 bg-primary text-white hover:bg-primary/95 font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Printer size={16} />
                Confirmar e Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[84px] md:bottom-8 right-6 md:right-8 bg-primary text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(62,158,87,0.3)] hover:bg-primary/95 hover:scale-105 active:scale-95 transition-all duration-300 z-40 cursor-pointer print:hidden animate-in fade-in slide-in-from-bottom-4 flex items-center justify-center"
          title="Subir al inicio"
        >
          <ArrowUp size={22} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
