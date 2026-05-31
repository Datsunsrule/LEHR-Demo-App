import { useId } from 'react';

export function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="glass-input w-full px-4 py-3 rounded-xl text-sm text-[var(--text)] placeholder-[var(--text-dim)] outline-none"
      />
    </div>
  );
}
