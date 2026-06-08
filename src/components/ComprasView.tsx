import { useState } from 'react';
import { Search, Filter, Printer, ChevronDown, Edit2, X, Store } from 'lucide-react';
import { ViewState, OrderItem } from '../types';

interface ComprasViewProps {
  orders: OrderItem[];
  onNavigate: (view: ViewState, aisleNum?: number) => void;
}

export function ComprasView({ orders, onNavigate }: ComprasViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAisleFilter, setSelectedAisleFilter] = useState<number | null>(null);
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  const filteredOrders = orders.filter(order => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const matchesSearch = 
        order.productName.toLowerCase().includes(query) ||
        order.brand.toLowerCase().includes(query) ||
        order.sku.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    if (selectedAisleFilter !== null && order.aisle !== selectedAisleFilter) {
      return false;
    }

    if (showCriticalOnly && order.status !== 'crítico' && order.status !== 'bajo') {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full h-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print-hide">
        <div>
          <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Consolidado de Pedidos</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2 max-w-2xl">Revisa y gestiona los requerimientos de compra de todos los pasillos. Los datos están optimizados para su envío inmediato al proveedor.</p>
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
          <button className="flex items-center gap-2 px-5 py-2.5 bg-card-surface border border-outline-variant/40 rounded-full text-on-surface font-mono text-[13px] hover:bg-surface-variant/50 transition-colors whitespace-nowrap shadow-sm">
            <Filter size={18} />
            {selectedAisleFilter !== null || showCriticalOnly || searchQuery ? 'Filtrado' : 'Sin Filtros'}
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-mono text-[13px] font-medium hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
          >
            <Printer size={18} />
            Imprimir Reporte
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 print-hide">
        <button 
          onClick={() => {
            setSelectedAisleFilter(null);
            setShowCriticalOnly(false);
          }}
          className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm ${
            selectedAisleFilter === null && !showCriticalOnly
              ? 'bg-secondary-container text-on-secondary-container border-secondary/10'
              : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
          }`}
        >
          Todos los Pasillos
        </button>
        <button 
          onClick={() => {
            setSelectedAisleFilter(1);
            setShowCriticalOnly(false);
          }}
          className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm ${
            selectedAisleFilter === 1 && !showCriticalOnly
              ? 'bg-secondary-container text-on-secondary-container border-secondary/10'
              : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
          }`}
        >
          Pasillo 1 (Lácteos)
        </button>
        <button 
          onClick={() => {
            setSelectedAisleFilter(4);
            setShowCriticalOnly(false);
          }}
          className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm ${
            selectedAisleFilter === 4 && !showCriticalOnly
              ? 'bg-secondary-container text-on-secondary-container border-secondary/10'
              : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
          }`}
        >
          Pasillo 4 (Bebidas)
        </button>
        <button 
          onClick={() => {
            setShowCriticalOnly(prev => !prev);
          }}
          className={`px-4 py-2 rounded-full font-mono text-[13px] font-medium border transition-colors shadow-sm ${
            showCriticalOnly
              ? 'bg-red-100 text-[#ba1a1a] border-error/30 font-bold'
              : 'bg-white text-on-surface-variant hover:bg-surface-variant/50 border-outline-variant/30'
          }`}
        >
          Stock Crítico/Bajo
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-card-surface rounded-[24px] shadow-[0_4px_20px_rgba(40,28,25,0.05)] overflow-hidden table-container">
        {/* Print Header */}
        <div className="hidden print-only p-6 pb-2">
          <h1 className="text-2xl font-bold mb-1">Reporte Consolidado de Compras</h1>
          <p className="text-sm border-b border-black pb-4">Generado: {new Date().toLocaleDateString()} - Sucursal Principal</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant/80 font-mono text-[13px] tracking-wide">
                <th className="py-5 px-6 font-medium">Producto</th>
                <th className="py-5 px-6 font-medium">Marca</th>
                <th className="py-5 px-6 font-medium">SKU</th>
                <th className="py-5 px-6 font-medium text-right">Cant. Sugerida</th>
                <th className="py-5 px-6 font-medium">Pasillo</th>
                <th className="py-5 px-6 font-medium">Usuario</th>
                <th className="py-5 px-6 font-medium">Estado</th>
                <th className="py-5 px-6 font-medium">Última Actualización</th>
                <th className="py-5 px-6 font-medium print-hide text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="font-sans text-[16px] text-on-surface">
              {filteredOrders.map((order, i) => (
                <tr 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className="border-b border-outline-variant/10 hover:bg-surface-variant/20 transition-colors group cursor-pointer"
                >
                  <td className="py-5 px-6 font-medium">
                    {order.productName}
                  </td>
                  <td className="py-5 px-6 text-on-surface-variant">
                    {order.brand}
                  </td>
                  <td className="py-5 px-6 font-mono text-[14px] text-on-surface-variant">
                    {order.sku}
                  </td>
                  <td className="py-5 px-6 text-right font-bold text-on-surface">
                    {order.suggestedQty} uds
                  </td>
                  <td className="py-5 px-6">
                    Pasillo {order.aisle}
                  </td>
                  <td className="py-5 px-6 text-on-surface-variant">
                    {order.user}
                  </td>
                  <td className="py-5 px-6">
                    {order.status === 'crítico' && <span className="inline-flex px-3 py-1 bg-error/10 text-error rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-error/20">Crítico</span>}
                    {order.status === 'bajo' && <span className="inline-flex px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-amber-500/20">Stock Bajo</span>}
                    {order.status === 'normal' && <span className="inline-flex px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-secondary/20">Normal</span>}
                  </td>
                  <td className="py-5 px-6 text-on-surface-variant font-mono text-[14px]">
                    {order.lastUpdated}
                  </td>
                  <td className="py-5 px-6 print-hide text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-full hover:bg-primary/10">
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-outline-variant/20 px-6 py-4 flex items-center justify-between bg-card-surface print-hide">
          <span className="font-mono text-[13px] text-on-surface-variant">
            Mostrando {filteredOrders.length > 0 ? 1 : 0} a {filteredOrders.length} de {orders.length} entradas
          </span>
          <div className="flex gap-2">
            <button disabled className="p-1.5 rounded-lg text-on-surface-variant/50 hover:bg-surface-variant transition-colors">
              <ChevronDown size={20} className="rotate-90" />
            </button>
            <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors">
              <ChevronDown size={20} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedOrder(null)}>
          <div className="bg-card-surface rounded-[32px] w-full max-w-lg shadow-[0_20px_50px_rgba(40,28,25,0.15)] overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-sans text-[20px] font-bold text-on-surface">Detalle de Pedido</h3>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
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
                  <span className="font-sans text-[16px] font-bold text-primary">{selectedOrder.suggestedQty} uds</span>
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
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Estado de Stock</span>
                  <div className="mt-1">
                    {selectedOrder.status === 'crítico' && <span className="inline-flex px-3 py-1 bg-error/10 text-error rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-error/20">Crítico</span>}
                    {selectedOrder.status === 'bajo' && <span className="inline-flex px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-amber-500/20">Stock Bajo</span>}
                    {selectedOrder.status === 'normal' && <span className="inline-flex px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-mono text-[11px] font-bold uppercase tracking-wider chip border border-secondary/20">Normal</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider block">Fecha Envío</span>
                  <span className="font-mono text-[13px] text-on-surface-variant">{selectedOrder.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-surface-variant/30 border-t border-outline-variant/20 flex gap-3">
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="flex-1 bg-white border border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface font-sans text-[14px] font-semibold py-3 rounded-full shadow-sm transition-all"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  setSelectedOrder(null);
                  onNavigate('pasillo-detail', selectedOrder.aisle);
                }} 
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
