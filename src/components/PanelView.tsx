import { ShoppingCart, CheckCircle2, TrendingUp, Repeat2 } from 'lucide-react';
import { ViewState, Aisle, OrderItem } from '../types';

interface PanelViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  orders: OrderItem[];
  checkedOrders: Set<string>;
}

export function PanelView({ onNavigate, aisles, orders, checkedOrders }: PanelViewProps) {
  // Metric 1: Total suggested orders pending (not yet checked)
  const totalSugeridos = orders.length;
  const pendingSugeridos = orders.filter(o => !checkedOrders.has(o.id)).length;

  // Metric 2: Already ordered (checked)
  const confirmedCount = checkedOrders.size;

  // Metric 3: Top rotating products
  // A product "rotates" when it's been in orders multiple times AND has been marked as received (checked)
  // Count frequency for each product in the full orders list
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

  // Sort: first by confirmed count (most confirmed = highest rotation), then by total
  const topProducts = Object.values(productFreq)
    .filter(p => p.total > 0)
    .sort((a, b) => b.confirmed - a.confirmed || b.total - a.total)
    .slice(0, 5);

  return (
    <div className="w-full h-full mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Vista General del Panel</h2>
        <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Métricas de Rendimiento de Sucursal Calle Principal.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        {/* Card 1: Sugeridos Activos */}
        <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('compras')}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
            <ShoppingCart size={140} />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <span className="font-mono text-[13px] opacity-70 uppercase tracking-wider">Sugeridos Activos</span>
            <div className="bg-primary-container text-on-primary-container rounded-full p-2">
              <ShoppingCart size={20} />
            </div>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-sans text-[40px] md:text-[48px] font-bold text-on-surface leading-none">
              {pendingSugeridos}
              <span className="text-[20px] opacity-50">/{totalSugeridos}</span>
            </div>
            <div className="font-sans text-[15px] mt-2 text-primary flex items-center gap-1">
              <TrendingUp size={15} />
              {confirmedCount > 0 ? `${confirmedCount} ya confirmados` : 'Sin confirmaciones aún'}
            </div>
          </div>
        </div>

        {/* Card 2: Ya Pedidos / Confirmados */}
        <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('compras')}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
            <CheckCircle2 size={140} />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <span className="font-mono text-[13px] opacity-70 uppercase tracking-wider">Ya Pedidos</span>
            <div className="bg-secondary-container text-on-secondary-container rounded-full p-2">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-sans text-[40px] md:text-[48px] font-bold text-on-surface leading-none">
              {confirmedCount}
            </div>
            <div className="font-sans text-[15px] mt-2 text-secondary flex items-center gap-1">
              {confirmedCount === 0
                ? 'Marca productos como pedidos en Compras'
                : `${Math.round((confirmedCount / Math.max(totalSugeridos, 1)) * 100)}% del total confirmado`}
            </div>
          </div>
        </div>

        {/* Card 3: Productos que más rotan */}
        <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex flex-col min-h-[160px] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
            <Repeat2 size={140} />
          </div>
          <div className="flex justify-between items-start relative z-10 mb-4">
            <span className="font-mono text-[13px] opacity-70 uppercase tracking-wider">Alta Rotación</span>
            <div className="bg-primary-container text-on-primary-container rounded-full p-2">
              <Repeat2 size={20} />
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center">
            {topProducts.length === 0 ? (
              <p className="font-sans text-[14px] text-on-surface-variant">Aún no hay suficientes datos de sugeridos.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className={`font-mono text-[11px] font-bold w-5 flex-shrink-0 ${i === 0 ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                        #{i + 1}
                      </span>
                      <span className="font-sans text-[13px] font-semibold text-on-surface">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {p.confirmed > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono text-[10px] font-bold border border-primary/20">
                          <CheckCircle2 size={10} />
                          {p.confirmed}
                        </span>
                      )}
                      <span className="font-mono text-[11px] text-on-surface-variant">{p.total}x</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aisles Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-sans text-[20px] font-semibold text-on-surface">Estado de Pasillos</h3>
          <div className="flex gap-2 hidden sm:flex">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/50 font-mono text-[13px]">
              <div className="w-2 h-2 rounded-full bg-primary"></div> Con productos
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/50 font-mono text-[13px]">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div> Vacío
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {aisles.map((aisle) => {
            const hasProducts = (aisle.productsCount || 0) > 0;
            const color = hasProducts ? 'bg-primary' : 'bg-amber-500';
            const textColor = hasProducts ? 'text-primary' : 'text-amber-600';
            const bgLight = hasProducts ? 'bg-primary/10' : 'bg-amber-100';
            return (
              <div
                key={aisle.id}
                onClick={() => onNavigate('pasillo-detail', aisle.number)}
                className="bg-card-surface rounded-2xl p-4 shadow-[0_4px_20px_rgba(40,28,25,0.05)] hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-outline-variant/50 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-sans text-[20px] font-bold text-on-surface">Pasillo {aisle.number}</h4>
                    <span className="font-mono text-[13px] opacity-60">{aisle.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[13px] opacity-70 mb-1">Productos</div>
                    <div className="font-sans text-[16px] text-on-surface font-semibold">
                      {aisle.productsCount || 0} {(aisle.productsCount || 0) === 1 ? 'ítem' : 'ítems'}
                    </div>
                  </div>
                  <div className={`${bgLight} ${textColor} px-3 py-1 rounded-full font-mono text-[13px] font-medium`}>
                    {hasProducts ? 'Con stock' : 'Vacío'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
