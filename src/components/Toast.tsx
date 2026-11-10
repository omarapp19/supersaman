import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: ToastAction;
}

type ToastFn = (message: string, duration?: number, action?: ToastAction) => void;

interface ToastContextType {
  toast: {
    success: ToastFn;
    error: ToastFn;
    info: ToastFn;
    warning: ToastFn;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType, duration = 3500, action?: ToastAction) => {
    const id = Math.random().toString(36).substring(2, 9);
    // Un aviso con acción (Deshacer) se queda más tiempo
    const ms = action ? Math.max(duration, 6000) : duration;
    setToasts((prev) => [...prev, { id, message, type, duration: ms, action }]);
    setTimeout(() => removeToast(id), ms);
  }, [removeToast]);

  const toast = {
    success: (msg: string, dur?: number, action?: ToastAction) => addToast(msg, 'success', dur, action),
    error: (msg: string, dur?: number, action?: ToastAction) => addToast(msg, 'error', dur, action),
    info: (msg: string, dur?: number, action?: ToastAction) => addToast(msg, 'info', dur, action),
    warning: (msg: string, dur?: number, action?: ToastAction) => addToast(msg, 'warning', dur, action),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* En el teléfono, abajo y al alcance del pulgar (sobre la barra de navegación) */}
      <div
        aria-live="polite"
        className="fixed left-4 right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-auto md:top-4 md:left-auto md:right-4 md:w-96 z-[9999] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: React.Key }) {
  const { message, type, action } = toast;

  const icon =
    type === 'success' ? <CheckCircle2 className="text-primary flex-shrink-0" size={22} />
    : type === 'error' ? <AlertCircle className="text-error flex-shrink-0" size={22} />
    : type === 'warning' ? <AlertTriangle className="text-on-tertiary-fixed-variant flex-shrink-0" size={22} />
    : <Info className="text-secondary flex-shrink-0" size={22} />;

  return (
    <div
      className="flex items-center gap-3 pl-4 pr-1 py-1 min-h-14 rounded-2xl bg-card-surface shadow-[0_8px_24px_rgba(40,28,25,0.25)] border border-outline-variant pointer-events-auto animate-in slide-in-from-bottom-4 md:slide-in-from-right-4 fade-in duration-200"
      role={type === 'error' ? 'alert' : 'status'}
    >
      {icon}
      <div className="flex-1 font-sans text-sm font-semibold leading-snug text-on-surface py-2">{message}</div>
      {action && (
        <button
          onClick={() => { action.onClick(); onClose(); }}
          className="min-h-11 px-3 rounded-xl font-sans text-sm font-bold text-primary-container active:bg-primary/10 cursor-pointer shrink-0"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onClose}
        aria-label="Cerrar aviso"
        className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant active:bg-surface-variant cursor-pointer shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
}
