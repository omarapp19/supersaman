import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
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

  const addToast = useCallback((message: string, type: ToastType, duration = 3500) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg: string, dur?: number) => addToast(msg, 'success', dur),
    error: (msg: string, dur?: number) => addToast(msg, 'error', dur),
    info: (msg: string, dur?: number) => addToast(msg, 'info', dur),
    warning: (msg: string, dur?: number) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: React.Key }) {
  const { message, type } = toast;

  const getTheme = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-white/95 border-l-4 border-l-primary',
          icon: <CheckCircle2 className="text-primary flex-shrink-0" size={20} />,
          text: 'text-on-surface',
        };
      case 'error':
        return {
          bg: 'bg-white/95 border-l-4 border-l-error',
          icon: <AlertCircle className="text-error flex-shrink-0" size={20} />,
          text: 'text-on-surface',
        };
      case 'warning':
        return {
          bg: 'bg-white/95 border-l-4 border-l-offline-banner',
          icon: <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />,
          text: 'text-on-surface',
        };
      case 'info':
      default:
        return {
          bg: 'bg-white/95 border-l-4 border-l-secondary',
          icon: <Info className="text-secondary flex-shrink-0" size={20} />,
          text: 'text-on-surface',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-2xl shadow-lg border border-outline-variant/20 backdrop-blur-md pointer-events-auto transition-all duration-300 animate-in slide-in-from-top-4 md:slide-in-from-right-4 fade-in ${theme.bg}`}
      role="alert"
    >
      {theme.icon}
      <div className={`flex-1 font-sans text-[14px] font-medium leading-normal ${theme.text}`}>
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-on-surface-variant/50 hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/30 transition-colors cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
