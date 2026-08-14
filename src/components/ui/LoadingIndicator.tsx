interface LoadingIndicatorProps {
  label?: string;
  dark?: boolean;
  className?: string;
}

/** Single loading pattern for the whole app — spinner + uppercase mono label. */
export function LoadingIndicator({ label = 'Cargando…', dark = false, className = '' }: LoadingIndicatorProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`w-[18px] h-[18px] border-[2.5px] border-t-transparent rounded-full animate-spin flex-shrink-0 ${
          dark ? 'border-white' : 'border-primary'
        }`}
      />
      <span
        className={`font-mono text-[12.5px] uppercase tracking-wider font-semibold ${
          dark ? 'text-white' : 'text-on-surface-variant'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
