import { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { ViewState, Aisle, OrderItem } from '../types';

interface PanelViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  orders: OrderItem[];
  checkedOrders: Set<string>;
}

type AisleFilter = 'todos' | 'critico' | 'stock' | 'vacio';

export function PanelView({ onNavigate, aisles, orders, checkedOrders }: PanelViewProps) {
  const [filter, setFilter] = useState<AisleFilter | null>(null);

  // Sugeridos pendientes (sin marcar como pedidos)
  const totalSugeridos = orders.length;
  const pendingSugeridos = orders.filter(o => !checkedOrders.has(o.id)).length;
  const confirmedCount = checkedOrders.size;

  // Productos de alta rotación: más confirmados primero, luego más repetidos
  const productFreq: Record<string, { name: string; brand: string; total: number; confirmed: number }> = {};
  orders.forEach(order => {
    const key = order.productName + '|' + order.brand;
    if (!productFreq[key]) {
      productFreq[key] = { name: order.productName, brand: order.brand, total: 0, confirmed: 0 };
    }
    productFreq[key].total += 1;
    if (checkedOrders.has(order.id)) {
      productFreq[key].confirmed += 1;
    }
  });
  const topProducts = Object.values(productFreq)
    .filter(p => p.total > 0)
    .sort((a, b) => b.confirmed - a.confirmed || b.total - a.total)
    .slice(0, 5);

  // Pasillos con un sugerido crítico pendiente
  const criticalAisles = new Set(
    orders.filter(o => o.status === 'crítico' && !checkedOrders.has(o.id)).map(o => o.aisle)
  );

  const statusOf = (a: Aisle): 'critico' | 'stock' | 'vacio' =>
    criticalAisles.has(a.number) ? 'critico' : (a.productsCount || 0) > 0 ? 'stock' : 'vacio';

  const counts = { critico: 0, stock: 0, vacio: 0 };
  aisles.forEach(a => { counts[statusOf(a)] += 1; });

  // Por defecto, lo que necesita atención primero
  const activeFilter: AisleFilter = filter ?? (counts.critico > 0 ? 'critico' : 'todos');
  const order = { critico: 0, stock: 1, vacio: 2 };
  const visibleAisles = aisles
    .filter(a => activeFilter === 'todos' || statusOf(a) === activeFilter)
    .sort((x, y) => order[statusOf(x)] - order[statusOf(y)] || x.number - y.number);

  const pct = Math.round((confirmedCount / Math.max(totalSugeridos, 1)) * 100);
  const chips: { id: AisleFilter; label: string; n: number; dot?: string }[] = [
    { id: 'todos', label: 'Todos', n: aisles.length },
    { id: 'critico', label: 'Crítico', n: counts.critico, dot: 'bg-error' },
    { id: 'stock', label: 'Con stock', n: counts.stock, dot: 'bg-primary' },
    { id: 'vacio', label: 'Vacío', n: counts.vacio, dot: 'bg-tertiary' },
  ];
  const dotOf = { critico: 'bg-error', stock: 'bg-primary', vacio: 'bg-tertiary' };
  const labelOf = { critico: 'Crítico', stock: 'Con stock', vacio: 'Vacío' };

  return (
    <div className="w-full mx-auto pb-12 animate-in fade-in duration-300">
      <header className="mb-4">
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-on-surface leading-tight">Panel</h2>
        <p className="font-sans text-sm md:text-base text-on-surface-variant">Resumen de la sucursal</p>
      </header>

      {/* Resumen de sugeridos */}
      <button
        type="button"
        onClick={() => onNavigate('compras')}
        className="w-full text-left bg-primary-container text-on-primary rounded-3xl p-5 mb-4 active:scale-[0.99] transition-transform cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm font-semibold text-on-primary-container/90">Sugeridos por pedir</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-on-primary-container">
            Ver compras <ArrowRight size={16} />
          </span>
        </div>
        <div className="mt-2 flex items-end gap-2">
          <span className="font-sans text-5xl font-bold leading-none tabular">{pendingSugeridos}</span>
          <span className="font-sans text-base text-on-primary-container/80 pb-1">de {totalSugeridos}</span>
        </div>
        <div
          className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Porcentaje confirmado"
        >
          <div className="h-full bg-tertiary-container rounded-full transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 font-sans text-sm text-on-primary-container/90">
          {confirmedCount === 0 ? 'Aún no hay pedidos confirmados' : `${confirmedCount} ya pedidos · ${pct}% confirmado`}
        </p>
      </button>

      {/* Alta rotación */}
      {topProducts.length > 0 && (
        <section className="bg-card-surface rounded-3xl p-5 mb-6">
          <h3 className="font-sans text-base font-bold text-on-surface mb-1">Alta rotación</h3>
          <ol>
            {topProducts.map((p, i) => (
              <li key={i} className="flex items-center gap-3 min-h-12 border-b border-outline-variant/30 last:border-0">
                <span className={`w-6 text-sm font-bold tabular ${i === 0 ? 'text-primary-container' : 'text-on-surface-variant'}`}>{i + 1}</span>
                <span className="flex-1 min-w-0 font-sans text-sm font-semibold text-on-surface truncate">{p.name}</span>
                <span className="font-sans text-sm text-on-surface-variant tabular shrink-0">{p.total}x</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Estado de pasillos */}
      <section>
        <h3 className="font-sans text-lg font-bold text-on-surface mb-3">Estado de pasillos</h3>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-3" role="tablist" aria-label="Filtrar pasillos por estado">
          {chips.map(c => (
            <button
              key={c.id}
              role="tab"
              aria-selected={activeFilter === c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 min-h-11 px-4 rounded-full font-sans text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                activeFilter === c.id ? 'bg-primary-container text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant'
              }`}
            >
              {c.dot && <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />}
              {c.label}
              <span className="tabular text-xs opacity-80">{c.n}</span>
            </button>
          ))}
        </div>

        {visibleAisles.length === 0 ? (
          <p className="py-8 text-center font-sans text-sm text-on-surface-variant">Ningún pasillo en este estado.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {visibleAisles.map(aisle => {
              const st = statusOf(aisle);
              const n = aisle.productsCount || 0;
              return (
                <li key={aisle.id}>
                  <button
                    onClick={() => onNavigate('pasillo-detail', aisle.number)}
                    className="w-full min-h-14 flex items-center gap-3 pl-3 pr-2 py-2 rounded-2xl bg-card-surface border border-outline-variant/40 text-left active:bg-surface-container md:hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotOf[st]}`} aria-hidden="true" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans text-sm font-bold text-on-surface truncate">{aisle.name}</span>
                      <span className="block font-sans text-xs text-on-surface-variant">
                        {labelOf[st]} · {n} {n === 1 ? 'ítem' : 'ítems'}
                      </span>
                    </span>
                    <ChevronRight size={18} className="text-on-surface-variant shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
