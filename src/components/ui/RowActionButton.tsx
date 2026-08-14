import { LucideIcon } from 'lucide-react';
import { MouseEvent } from 'react';

interface RowActionButtonProps {
  icon: LucideIcon;
  onClick: (e: MouseEvent) => void;
  label: string;
  variant?: 'default' | 'danger';
  size?: 'sm' | 'md';
}

/** Always-visible row action (edit/delete/etc) — 40x40 tap target, never hover-only. */
export function RowActionButton({ icon: Icon, onClick, label, variant = 'default', size = 'md' }: RowActionButtonProps) {
  const dims = size === 'sm' ? 'w-9 h-9 rounded-[10px]' : 'w-10 h-10 rounded-xl';
  const iconSize = size === 'sm' ? 14 : 16;
  const colors = variant === 'danger'
    ? 'bg-error/10 text-error hover:bg-error/15'
    : 'bg-on-surface-variant/10 text-on-surface-variant hover:bg-on-surface-variant/15';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${dims} flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer active:scale-90 ${colors}`}
    >
      <Icon size={iconSize} />
    </button>
  );
}
