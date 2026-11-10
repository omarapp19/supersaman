import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!showMore) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowMore(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showMore]);

  const handleNavigate = (view: ViewState) => {
    setShowMore(false);
    onNavigate(view);
  };

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`bg-card-surface fixed bottom-0 left-0 w-full md:hidden z-50 grid items-stretch gap-1 px-2 pt-2 print-hide border-t border-outline-variant/40 shadow-[0_-6px_24px_rgba(40,28,25,0.08)] ${
          itemCount === 5 ? 'grid-cols-5' : 'grid-cols-3'
        }`}
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {!isOperator && (
          <NavItem active={currentView === 'panel'} icon={LayoutDashboard} label="Panel" onClick={() => handleNavigate('panel')} />
        )}
        <NavItem
          active={currentView === 'pasillos' || currentView === 'pasillo-detail'}
          icon={LayoutGrid}
          label="Pasillos"
          onClick={() => handleNavigate('pasillos')}
        />
        <NavItem active={currentView === 'sugeridos'} icon={Sparkles} label="Sugeridos" onClick={() => handleNavigate('sugeridos')} />
        <NavItem
          active={currentView === 'compras'}
          icon={Receipt}
          label={isOperator ? 'Pedidos' : 'Compras'}
          onClick={() => handleNavigate('compras')}
        />
        {!isOperator && (
          <NavItem active={moreActive} icon={MoreHorizontal} label="Más" onClick={() => setShowMore(true)} />
        )}
      </nav>

      {showMore && (
        <div
          className="fixed inset-0 bg-inverse-surface/50 z-[60] flex items-end md:hidden animate-in fade-in duration-200"
          onClick={() => setShowMore(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Más opciones"
            className="bg-card-surface rounded-t-3xl w-full shadow-[0_-10px_40px_rgba(40,28,25,0.15)] pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-outline-variant" aria-hidden="true" />
            <div className="flex justify-between items-center px-5 pt-3 pb-2">
              <h3 className="font-sans text-lg font-bold text-on-surface">Más opciones</h3>
              <button
                onClick={() => setShowMore(false)}
                aria-label="Cerrar"
                className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center active:bg-surface-variant transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col px-3 pb-2">
              <MoreRow active={currentView === 'configuracion'} icon={Settings} label="Configuración" onClick={() => handleNavigate('configuracion')} />
              {isAdmin && (
                <MoreRow active={currentView === 'cabezales'} icon={LayoutTemplate} label="Cabezales" onClick={() => handleNavigate('cabezales')} />
              )}
              {isAdmin && (
                <MoreRow active={currentView === 'odc'} icon={FileSpreadsheet} label="Órdenes de compra (ODC)" onClick={() => handleNavigate('odc')} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MoreRow({ active, icon: Icon, label, onClick }: { active: boolean; icon: any; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center justify-between gap-3 px-4 min-h-14 rounded-2xl transition-colors cursor-pointer ${
        active ? 'bg-primary/10 text-primary-container' : 'text-on-surface active:bg-surface-variant/60'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="font-sans text-base font-semibold">{label}</span>
      </div>
      <ChevronRight size={18} className="opacity-50" />
    </button>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean; icon: any; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="w-full min-h-14 flex flex-col items-center justify-center gap-0.5 rounded-2xl cursor-pointer select-none active:bg-primary/10 transition-colors"
    >
      <span
        className={`flex items-center justify-center h-8 w-14 rounded-full transition-colors duration-200 ${
          active ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
        }`}
      >
        <Icon size={22} strokeWidth={active ? 2.4 : 2} />
      </span>
      <span
        className={`font-sans text-xs leading-none ${
          active ? 'text-primary-container font-bold' : 'text-on-surface-variant font-medium'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
