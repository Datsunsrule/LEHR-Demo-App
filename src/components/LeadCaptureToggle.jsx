import { UserPlus } from 'lucide-react';
import { useStore } from '../store/useStore';

// Top-nav toggle for the optional lead-capture screen. When on, the build flow
// starts with the info form; when off, visitors go straight to the build.
export function LeadCaptureToggle() {
  const enabled = useStore((s) => s.leadCaptureEnabled);
  const toggle = useStore((s) => s.toggleLeadCapture);
  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Turn off lead capture' : 'Turn on lead capture'}
      title={enabled ? 'Lead capture: on' : 'Lead capture: off'}
      className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
      style={{
        background: enabled ? 'rgba(227,38,54,0.18)' : 'rgba(var(--ink),0.06)',
        border: enabled ? '1px solid rgba(227,38,54,0.45)' : '1px solid rgba(var(--ink),0.1)',
      }}
    >
      <UserPlus
        size={18}
        aria-hidden="true"
        style={{ color: enabled ? '#E32636' : 'var(--text-dim)' }}
      />
    </button>
  );
}
