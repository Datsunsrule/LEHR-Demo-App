import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export function EquipmentCategory({ category, items, defaultOpen = false }) {
  const [open, setOpen]  = useState(defaultOpen);
  const toggleEquipment  = useStore((s) => s.toggleEquipment);
  const showPrices       = useStore((s) => s.showPrices);
  // Subscribe only to THIS category's selected flags (shallow-compared), so a
  // toggle in another category doesn't re-render this one.
  const selectedStates = useStore(useShallow((s) => items.map((i) => !!s.equipment[i.id])));

  const selectedCount = selectedStates.filter(Boolean).length;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: '1px solid rgba(var(--ink),0.14)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        background: 'rgba(var(--ink),0.07)',
      }}
    >
      {/* category header */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${category}, ${items.length} items${selectedCount > 0 ? `, ${selectedCount} selected` : ''}`}
        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors duration-150"
        style={{ background: open ? 'rgba(var(--ink),0.08)' : 'rgba(var(--ink),0.04)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--text)]">{category}</span>
          <span className="text-[10px] text-[var(--text-dim)]">{items.length} items</span>
          {selectedCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-black">
              {selectedCount}
            </span>
          )}
        </div>
        {open ? (
          <ChevronUp size={16} className="text-[var(--text-dim)]" aria-hidden="true" />
        ) : (
          <ChevronDown size={16} className="text-[var(--text-dim)]" aria-hidden="true" />
        )}
      </button>

      {/* items */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(var(--ink),0.08)' }}>
          {items.map((item, idx) => {
            const selected = selectedStates[idx];
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => toggleEquipment(item.id)}
                role="checkbox"
                aria-checked={selected}
                aria-label={showPrices ? `${item.label}, $${item.price.toLocaleString()}` : item.label}
                className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-100 text-left"
                style={{
                  background: selected ? 'rgba(var(--ink),0.09)' : 'rgba(var(--ink),0.02)',
                  borderTop: idx === 0 ? 'none' : '1px solid rgba(var(--ink),0.06)',
                }}
              >
                {/* icon tile */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-100"
                  style={{
                    background: selected ? 'rgba(var(--ink),0.18)' : 'rgba(var(--ink),0.08)',
                    border: '1px solid rgba(var(--ink),0.14)',
                  }}
                >
                  <Icon size={16} className={selected ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'} />
                </div>

                {/* label + price */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-tight ${selected ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}`}>
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {showPrices && (
                      <p className="text-[11px] text-[var(--text-dim)]">
                        ${item.price.toLocaleString()}
                      </p>
                    )}
                    {item.overlay && (
                      <span
                        className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                        style={{
                          background: 'rgba(30, 123, 217, 0.2)',
                          border: '1px solid rgba(30, 123, 217, 0.4)',
                          color: 'var(--accent-blue)',
                        }}
                      >
                        Visual
                      </span>
                    )}
                  </div>
                </div>

                {/* checkbox */}
                <div
                  className="w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-100"
                  style={{
                    background: selected ? '#fff' : 'rgba(var(--ink),0.08)',
                    border: selected ? '2px solid #fff' : '2px solid rgba(var(--ink),0.2)',
                  }}
                >
                  {selected && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                      <path d="M1 4L4.5 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
