import { useState, useId, useRef } from 'react';
import { Plus } from 'lucide-react';
import { usCities } from '../data/usCities';

const MAX_SUGGESTIONS = 6;

// Accessible combobox for adding a location. Suggests standardized "City, State"
// entries from a curated list (filtering out ones already added) to keep entries
// uniform, while still allowing a free-typed custom value.
export function LocationInput({ existing, onAdd }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const blurTimer = useRef();

  const q = value.trim().toLowerCase();
  const matches = q
    ? usCities.filter((c) => !existing.includes(c) && c.toLowerCase().includes(q)).slice(0, MAX_SUGGESTIONS)
    : [];
  const showList = open && matches.length > 0;

  function commit(v) {
    const val = (v ?? value).trim();
    if (!val) return;
    onAdd(val);
    setValue('');
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commit(showList && active >= 0 ? matches[active] : undefined);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); setOpen(true); setActive(-1); }}
          onKeyDown={onKeyDown}
          onFocus={() => { if (value.trim()) setOpen(true); }}
          onBlur={() => { blurTimer.current = setTimeout(() => setOpen(false), 120); }}
          placeholder="Add City, State…"
          aria-label="Add location"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
          autoComplete="off"
          className="w-full px-3 py-2 rounded-lg text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
          style={{ background: 'rgba(var(--ink),0.06)', border: '1px solid rgba(var(--ink),0.1)' }}
        />
        {showList && (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 bottom-full mb-1 z-20 rounded-lg overflow-hidden py-1"
            style={{
              background: 'var(--card-solid)',
              border: '1px solid rgba(var(--ink),0.15)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            }}
          >
            {matches.map((c, i) => (
              <li
                key={c}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); commit(c); }}
                onMouseEnter={() => setActive(i)}
                className="px-3 py-2 text-sm cursor-pointer"
                style={{ background: i === active ? 'rgba(var(--ink),0.1)' : 'transparent', color: 'var(--text)' }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => commit()}
        aria-label="Add location"
        className="px-3 py-2 rounded-lg cursor-pointer transition-colors flex-shrink-0"
        style={{ background: 'rgba(var(--ink),0.1)', border: '1px solid rgba(var(--ink),0.15)' }}
      >
        <Plus size={16} className="text-[var(--text)]" aria-hidden="true" />
      </button>
    </div>
  );
}
