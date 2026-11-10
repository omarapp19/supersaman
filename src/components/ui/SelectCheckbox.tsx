import { Check } from 'lucide-react';

interface SelectCheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: 'sm' | 'md';
  label?: string;
}

/** Single selection control for the whole app — solid square, check on white. */
export function SelectCheckbox({ checked, onChange, size = 'md', label }: SelectCheckboxProps) {
  const dims = size === 'sm' ? 'w-[22px] h-[22px] rounded-[7px]' : 'w-6 h-6 rounded-lg';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      aria-label={label}
      className={`${dims} relative before:content-[''] before:absolute before:-inset-3 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer active:scale-90 ${
        checked
          ? 'bg-primary'
          : 'bg-white border-2 border-outline-variant hover:border-primary/50'
      }`}
    >
      {checked && <Check className="text-white" size={iconSize} strokeWidth={3} />}
    </button>
  );
}
