/** Bloque gris pulsante: marca el lugar del contenido mientras carga. */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-on-surface/10 ${className}`} />;
}

/** Filas de producto de relleno, con la misma forma que las reales. */
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Cargando productos" className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card-surface border border-outline-variant/40 rounded-2xl p-3 flex items-center gap-3 min-h-[76px]"
        >
          <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <Skeleton className={`h-4 ${i % 3 === 0 ? 'w-4/5' : i % 3 === 1 ? 'w-3/5' : 'w-2/3'}`} />
            <Skeleton className="h-3 w-2/5" />
          </div>
          <Skeleton className="w-11 h-11 rounded-full shrink-0" />
        </div>
      ))}
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
