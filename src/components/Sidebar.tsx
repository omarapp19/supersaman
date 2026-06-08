import { LayoutDashboard, Store, ShoppingCart, Settings, LogOut, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export function Sidebar({ currentView, onNavigate, onLogout }: SidebarProps) {
  return (
    <nav className="h-full w-64 left-0 fixed hidden md:flex flex-col bg-[#fff1ed] shadow-sm z-50">
      <div className="flex flex-col h-full p-4 gap-2">
        <div className="mb-6 px-4 pt-2">
          <h1 className="font-sans text-xl font-bold text-primary mb-2">Sugeridos Super Saman</h1>
          <div className="flex items-center gap-3 bg-surface-variant/30 p-2 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              A
            </div>
            <div>
              <div className="font-mono text-[13px] font-medium text-on-surface">Portal de Admin</div>
              <div className="font-mono text-[11px] text-on-surface-variant opacity-80">Sucursal Principal</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
          <NavItem active={currentView === 'panel'} icon={LayoutDashboard} label="Panel" onClick={() => onNavigate('panel')} />
          <NavItem active={currentView === 'pasillos' || currentView === 'pasillo-detail'} icon={Store} label="Pasillos" onClick={() => onNavigate('pasillos')} />
          <NavItem active={currentView === 'sugeridos'} icon={Sparkles} label="Sugeridos" onClick={() => onNavigate('sugeridos')} />
          <NavItem active={currentView === 'compras'} icon={ShoppingCart} label="Compras" onClick={() => onNavigate('compras')} />
          <NavItem active={currentView === 'configuracion'} icon={Settings} label="Configuración" onClick={() => onNavigate('configuracion')} />
        </div>

        <div className="mt-auto pt-2 border-t border-outline-variant/20 flex flex-col gap-1">
          <NavItem active={false} icon={LogOut} label="Cerrar Sesión" onClick={onLogout} />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-95 ${
        active 
        ? 'bg-primary-container text-on-primary-container font-bold' 
        : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'
      }`}
    >
      <Icon size={20} className={active ? '' : 'opacity-80'} strokeWidth={active ? 2.5 : 2} />
      <span className="font-mono text-[13px]">{label}</span>
    </button>
  );
}
