import { LayoutGrid, LayoutDashboard, Receipt, Settings, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  user?: any;
}

export function BottomNav({ currentView, onNavigate, user }: BottomNavProps) {
  const isOperator = user?.role === 'operador';

  const itemCount = isOperator ? 3 : 5;

  return (
    <nav
      className={`bg-surface/95 shadow-[0_-4px_20px_rgba(40,28,25,0.05)] fixed bottom-0 left-0 w-full rounded-t-3xl md:hidden z-50 grid items-center px-1 pt-2 print-hide border-t border-white/20 transform-gpu ${
        itemCount === 5 ? 'grid-cols-5' : 'grid-cols-3'
      }`}
      style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      {!isOperator && (
        <NavItem
          active={currentView === 'panel'}
          icon={LayoutDashboard}
          label="Panel"
          onClick={() => onNavigate('panel')}
        />
      )}
      <NavItem
        active={currentView === 'pasillos' || currentView === 'pasillo-detail'}
        icon={LayoutGrid}
        label="Pasillos"
        onClick={() => onNavigate('pasillos')}
      />
      <NavItem
        active={currentView === 'sugeridos'}
        icon={Sparkles}
        label="Sugeridos"
        onClick={() => onNavigate('sugeridos')}
      />
      <NavItem
        active={currentView === 'compras'}
        icon={Receipt}
        label={isOperator ? "Mis Pedidos" : "Compras"}
        onClick={() => onNavigate('compras')}
      />
      {!isOperator && (
        <NavItem
          active={currentView === 'configuracion'}
          icon={Settings}
          label="Config"
          onClick={() => onNavigate('configuracion')}
        />
      )}
    </nav>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col items-center justify-center transition-all duration-300 relative py-1.5 px-0.5 rounded-2xl cursor-pointer outline-none select-none active:scale-90"
    >
      {/* Animated Pill Background */}
      {active && (
        <span className="absolute inset-0 bg-primary/10 rounded-2xl scale-100 transition-all duration-300 -z-10 animate-in zoom-in-95 duration-200"></span>
      )}

      <Icon
        size={20}
        className={`mb-1 transition-all duration-300 ${
          active
            ? 'text-primary scale-110'
            : 'text-on-surface-variant opacity-75'
        }`}
        strokeWidth={active ? 2.5 : 2}
      />
      <span
        className={`font-mono text-[9.5px] sm:text-[10.5px] tracking-tight sm:tracking-wide uppercase text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
          active
            ? 'text-primary font-bold'
            : 'text-on-surface-variant opacity-75'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
