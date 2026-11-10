import { useEffect, useRef } from 'react';

interface LoadMoreProps {
  shown: number;
  total: number;
  onMore: () => void;
}

/**
 * Carga por tandas: pide más filas solo cuando te acercas al final,
 * y deja un botón por si el scroll automático no se dispara.
 */
export function LoadMore({ shown, total, onMore }: LoadMoreProps) {
  const ref = useRef<HTMLDivElement>(null);
  const remaining = total - shown;

  useEffect(() => {
    const el = ref.current;
    if (!el || remaining <= 0 || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) onMore(); },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [remaining, shown, onMore]);

  if (remaining <= 0) return null;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 py-4">
      <button
        onClick={onMore}
        className="min-h-12 px-6 rounded-xl border border-outline bg-white font-sans text-sm font-bold text-on-surface cursor-pointer active:bg-surface-variant"
      >
        Mostrar más
      </button>
      <span className="font-sans text-xs text-on-surface-variant tabular">
        Viendo {shown} de {total}
      </span>
    </div>
  );
}
