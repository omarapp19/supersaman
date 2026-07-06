import { useState } from 'react';
import { LayoutGrid, LayoutDashboard, Receipt, Settings, Sparkles, MoreHorizontal, LayoutTemplate, FileSpreadsheet, X, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  user?: any;
}

export function BottomNav({ currentView, onNavigate, user }: BottomNavProps) {
  const isOperator = user?.role === 'operador';
  const isAdmin = user?.role === 'admin';
  const [showMore, setShowMore] = useState(false);

  const itemCount = isOperator ? 3 : 5;
  const moreActive = currentView === 'configuracion' || currentView === 'cabezales' || currentView === 'odc';

  const handleNavigate = (view: ViewState) => {
    setShowMore(false);
    onNavigate(view);
  };

  return (
    <>
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
            onClick={() => handleNavigate('panel')}
          />
        )}
        <NavItem
          active={currentView === 'pasillos' || currentView === 'pasillo-detail'}
          icon={LayoutGrid}
          label="Pasillos"
          onClick={() => handleNavigate('pasillos')}
        />
        <NavItem
          active={currentView === 'sugeridos'}
          icon={Sparkles}
          label="Sugeridos"
          onClick={() => handleNavigate('sugeridos')}
        />
        <NavItem
          active={currentView === 'compras'}
          icon={Receipt}
          label={isOperator ? "Mis Pedidos" : "Compras"}
          onClick={() => handleNavigate('compras')}
        />
        {!isOperator && (
          <NavItem
            active={moreActive}
            icon={MoreHorizontal}
            label="Más"
            onClick={() => setShowMore(true)}
          />
        )}
      </nav>

      {showMore && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-end md:hidden animate-in fade-in duration-200"
          onClick={() => setShowMore(false)}
        >
          <div
            className="bg-card-surface rounded-t-3xl w-full shadow-[0_-10px_40px_rgba(40,28,25,0.15)] pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-5 pt-5 pb-2">
              <h3 className="font-sans text-[17px] font-bold text-on-surface">Más opciones</h3>
              <button onClick={() => setShowMore(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col px-3 pb-2">
              <MoreRow
                active={currentView === 'configuracion'}
                icon={Settings}
                label="Configuración"
                onClick={() => handleNavigate('configuracion')}
              />
              {isAdmin && (
                <MoreRow
                  active={currentView === 'cabezales'}
                  icon={LayoutTemplate}
                  label="Cabezales"
                  onClick={() => handleNavigate('cabezales')}
                />
              )}
              {isAdmin && (
                <MoreRow
                  active={currentView === 'odc'}
                  icon={FileSpreadsheet}
                  label="ODC"
                  onClick={() => handleNavigate('odc')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MoreRow({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-3 px-3 py-3.5 rounded-2xl transition-colors cursor-pointer ${
        active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-variant/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={19} strokeWidth={active ? 2.5 : 2} />
        <span className="font-sans text-[15px] font-semibold">{label}</span>
      </div>
      <ChevronRight size={16} className="opacity-50" />
    </button>
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
