import { Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export function PaintSelector({ vehicle }) {
  const paintScheme   = useStore((s) => s.paintScheme);
  const setPaintScheme = useStore((s) => s.setPaintScheme);

  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)] mb-3">
        <span aria-hidden="true">🎨 </span>Paint Scheme
      </p>
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {vehicle.paintOptions.map((opt) => {
          const active = paintScheme === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setPaintScheme(opt.id)}
              aria-pressed={active}
              aria-label={`Paint scheme: ${opt.label}`}
              className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-150 text-left"
              style={{
                border: active ? '2px solid #fff' : '2px solid rgba(var(--ink),0.12)',
              }}
            >
              <img
                src={opt.image}
                alt={opt.label}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              <div
                className="px-2 py-2"
                style={{ background: 'rgba(0,0,0,0.6)' }}
              >
                <p className="text-xs font-semibold text-white leading-tight">{opt.label}</p>
                <p className="text-[10px] text-[#e6e6e6] mt-0.5">{opt.desc}</p>
              </div>
              {active && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <Check size={11} className="text-black" strokeWidth={3} aria-hidden="true" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
