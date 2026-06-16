import { LayoutDashboard, Store, ShoppingCart, Settings, LogOut, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  user?: any;
}

export function Sidebar({ currentView, onNavigate, onLogout, user }: SidebarProps) {
  const getInitials = () => {
    if (user?.displayName) {
      const parts = user.displayName.trim().split(/\s+/);
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return user.displayName.substring(0, 2).toUpperCase();
    }
    if (user?.fullName) {
      const parts = user.fullName.trim().split(/\s+/);
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return 'A';
  };

  const displayName = user?.displayName || user?.fullName || (user?.username ? `@${user.username}` : 'Portal de Admin');
  const displayRole = user?.role 
    ? (user.role === 'admin' ? 'Administrador' : user.role === 'supervisor' ? 'Supervisor' : 'Operador')
    : 'Administrador';

  const isOperator = user?.role === 'operador';

  return (
    <nav className="h-full w-64 left-0 fixed hidden md:flex flex-col bg-card-surface shadow-sm z-50 border-r border-outline-variant/20 print-hide">
      <div className="flex flex-col h-full p-4 gap-2">
        <div className="mb-6 px-2 pt-2 flex flex-col items-center">
          <img src="/logo.svg" alt="Súper Samán" className="w-24 h-24 mb-3 drop-shadow-sm mix-blend-multiply" />
          <div className="flex items-center gap-3 bg-surface-variant/30 p-2.5 rounded-2xl w-full border border-outline-variant/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0 text-[14px]">
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[13px] font-bold text-on-surface truncate" title={displayName}>
                {displayName}
              </div>
              <div className="font-mono text-[10px] text-on-surface-variant opacity-80 truncate uppercase tracking-wider">
                {displayRole}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
          {!isOperator && (
            <NavItem active={currentView === 'panel'} icon={LayoutDashboard} label="Panel" onClick={() => onNavigate('panel')} />
          )}
          <NavItem active={currentView === 'pasillos' || currentView === 'pasillo-detail'} icon={Store} label="Pasillos" onClick={() => onNavigate('pasillos')} />
          <NavItem active={currentView === 'sugeridos'} icon={Sparkles} label="Sugeridos" onClick={() => onNavigate('sugeridos')} />
          <NavItem active={currentView === 'compras'} icon={ShoppingCart} label={isOperator ? "Mis Pedidos" : "Compras"} onClick={() => onNavigate('compras')} />
          {!isOperator && (
            <NavItem active={currentView === 'configuracion'} icon={Settings} label="Configuración" onClick={() => onNavigate('configuracion')} />
          )}
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
