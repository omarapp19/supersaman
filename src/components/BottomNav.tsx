import { LayoutGrid, Receipt, Settings, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="bg-surface/90 shadow-[0_-4px_20px_rgba(40,28,25,0.05)] backdrop-blur-xl fixed bottom-0 left-0 w-full rounded-t-3xl md:hidden z-50 flex justify-around items-center px-4 pt-2 pb-6 print-hide border-t border-white/20">
      <NavItem 
        active={currentView === 'pasillos' || currentView === 'panel' || currentView === 'pasillo-detail'} 
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
        label="Pedidos" 
        onClick={() => onNavigate('compras')} 
      />
      <NavItem 
        active={currentView === 'configuracion'} 
        icon={Settings} 
        label="Config" 
        onClick={() => onNavigate('configuracion')} 
      />
    </nav>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-full ${
        active 
        ? 'bg-primary-container text-on-primary-container' 
        : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      <Icon size={24} className="mb-1" strokeWidth={active ? 2.5 : 2} />
      <span className={`font-mono text-[13px] ${active ? 'font-bold' : ''}`}>{label}</span>
    </button>
  );
}
