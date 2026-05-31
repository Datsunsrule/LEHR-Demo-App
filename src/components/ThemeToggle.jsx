import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const isDark = resolved === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
      style={{ background: 'rgba(var(--ink),0.06)', border: '1px solid rgba(var(--ink),0.1)' }}
    >
      {isDark
        ? <Sun size={18} className="text-[var(--text)]" aria-hidden="true" />
        : <Moon size={18} className="text-[var(--text)]" aria-hidden="true" />}
    </button>
  );
}
