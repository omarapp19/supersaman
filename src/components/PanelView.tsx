import { CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, Package } from 'lucide-react';
import { ViewState, Aisle, OrderItem } from '../types';

interface PanelViewProps {
  onNavigate: (view: ViewState, aisleNum?: number) => void;
  aisles: Aisle[];
  orders: OrderItem[];
}

export function PanelView({ onNavigate, aisles, orders }: PanelViewProps) {
  const completedCount = aisles.filter(a => a.progress === 100).length;
  const pendingCount = aisles.filter(a => a.needsScan || a.progress < 100).length;
  const totalSuggestedQty = orders.reduce((acc, curr) => acc + curr.suggestedQty, 0);

  return (
    <div className="w-full h-full mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight">Vista General del Panel</h2>
        <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant mt-2">Métricas de Rendimiento de Sucursal Calle Principal.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-5 mb-10">
        <StatCard 
          title="Pasillos Completados"
          icon={CheckCircle2}
          iconColor="text-on-primary-container"
          iconBg="bg-primary-container"
          value={<>{completedCount}<span className="text-[20px] opacity-50">/{aisles.length}</span></>}
          subValue={`${Math.round((completedCount / (aisles.length || 1)) * 100)}% de cobertura hoy`}
          subIcon={TrendingUp}
          subColor="text-primary"
        />
        <StatCard 
          title="Pendientes de Atención"
          icon={AlertTriangle}
          iconColor="text-on-error-container"
          iconBg="bg-error-container"
          value={pendingCount.toString()}
          subValue="Pasillos requieren escaneo o revisión"
          subColor="text-error"
        />
        <StatCard 
          title="Sugeridos de la Semana"
          icon={Lightbulb}
          iconColor="text-on-secondary-container"
          iconBg="bg-secondary-container"
          value={totalSuggestedQty.toLocaleString()}
          subValue="Cantidad consolidada a pedir"
          subColor="text-secondary"
          ambientIcon={Package}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-sans text-[20px] font-semibold text-on-surface">Estado de Pasillos</h3>
          <div className="flex gap-2 hidden sm:flex">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/50 font-mono text-[13px]">
              <div className="w-2 h-2 rounded-full bg-primary"></div> Completado
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant/50 font-mono text-[13px]">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div> Pendiente
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {aisles.map((aisle) => (
            <GridCard 
              key={aisle.id}
              aisle={aisle.number.toString()} 
              category={aisle.name} 
              time={aisle.lastScanned} 
              status={aisle.needsScan ? 'pending' : 'completed'} 
              details={aisle.needsScan ? 'Necesita Escaneo' : `${aisle.progress}% Stock`}
              onClick={() => onNavigate('pasillo-detail', aisle.number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, icon: Icon, iconColor, iconBg, value, subValue, subColor, subIcon: SubIcon, ambientIcon: AmbientIcon }: any) {
  return (
    <div className="bg-card-surface rounded-3xl p-6 shadow-[0_4px_20px_rgba(40,28,25,0.05)] flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
      {AmbientIcon && (
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <AmbientIcon size={140} />
        </div>
      )}
      <div className="flex justify-between items-start relative z-10">
        <span className="font-mono text-[13px] opacity-70 uppercase tracking-wider">{title}</span>
        <div className={`${iconBg} ${iconColor} rounded-full p-2`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="relative z-10 mt-4">
        <div className="font-sans text-[40px] md:text-[48px] font-bold text-on-surface leading-none">{value}</div>
        <div className={`font-sans text-[16px] mt-2 ${subColor} flex items-center gap-1`}>
          {SubIcon && <SubIcon size={16} />}
          {subValue}
        </div>
      </div>
    </div>
  );
}

function GridCard({ aisle, category, time, status, details, onClick }: any) {
  const isPending = status === 'pending';
  const color = isPending ? 'bg-amber-500' : 'bg-primary';
  const textColor = isPending ? 'text-amber-600' : 'text-primary';
  const bgLight = isPending ? 'bg-amber-100' : 'bg-primary/10';

  return (
    <div 
      onClick={onClick}
      className="bg-card-surface rounded-2xl p-4 shadow-[0_4px_20px_rgba(40,28,25,0.05)] hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-outline-variant/50 relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-sans text-[20px] font-bold text-on-surface">Pasillo {aisle}</h4>
          <span className="font-mono text-[13px] opacity-60">{category}</span>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="font-mono text-[13px] opacity-70 mb-1">Último escaneo</div>
          <div className={`font-sans text-[16px] ${isPending ? 'text-error font-medium' : ''}`}>{time}</div>
        </div>
        <div className={`${bgLight} ${textColor} px-3 py-1 rounded-full font-mono text-[13px] font-medium`}>
          {details}
        </div>
      </div>
    </div>
  );
}
