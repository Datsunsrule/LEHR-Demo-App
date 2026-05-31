import { useState, useEffect, useRef } from 'react';
import { X, MapPin, User, Trash2, Plus, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LocationInput } from './LocationInput';
import { LeadsTab } from './LeadsTab';

export function AdminPanel({ onClose }) {
  const [tab, setTab]           = useState('locations');
  const dialogRef               = useRef(null);

  // Close on Escape and move focus into the dialog when it opens (WCAG 2.1.2 /
  // 2.4.3). Full focus-trap is out of scope; backdrop click and Done also close.
  useEffect(() => {
    dialogRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const locations     = useStore((s) => s.locations);
  const reps          = useStore((s) => s.reps);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);
  const setDemoLocation = useStore((s) => s.setDemoLocation);
  const setSalesAgent   = useStore((s) => s.setSalesAgent);
  const addLocation     = useStore((s) => s.addLocation);
  const removeLocation  = useStore((s) => s.removeLocation);
  const addRep          = useStore((s) => s.addRep);
  const removeRep       = useStore((s) => s.removeRep);

  const showPrices       = useStore((s) => s.showPrices);
  const showTotals       = useStore((s) => s.showTotals);
  const toggleShowPrices = useStore((s) => s.toggleShowPrices);
  const toggleShowTotals = useStore((s) => s.toggleShowTotals);

  const leads = useStore((s) => s.leads);

  const tabs = [
    { id: 'locations', label: 'Locations' },
    { id: 'reps',      label: 'Sales Reps' },
    { id: 'pricing',   label: 'Pricing' },
    { id: 'leads',     label: `Leads${leads.length ? ` (${leads.length})` : ''}` },
  ];

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-fade-in"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-panel-title"
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: 'var(--card-solid)',
          border: '1px solid rgba(var(--ink),0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(var(--ink),0.08)' }}>
          <h2 id="admin-panel-title" className="text-base font-bold text-[var(--text)]">Admin Panel</h2>
          <button onClick={onClose} aria-label="Close admin panel" className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer" style={{ background: 'rgba(var(--ink),0.08)' }}>
            <X size={16} className="text-[var(--text)]" aria-hidden="true" />
          </button>
        </div>

        {/* tabs */}
        <div className="flex px-5 pt-4 gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-100 cursor-pointer"
              style={{
                background: tab === t.id ? 'rgba(var(--ink),0.12)' : 'transparent',
                color: tab === t.id ? 'var(--text)' : 'var(--text-dim)',
                border: '1px solid',
                borderColor: tab === t.id ? 'rgba(var(--ink),0.2)' : 'transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === 'locations' && (
            <LocationsTab
              locations={locations}
              active={demoLocation}
              onSelect={setDemoLocation}
              onRemove={removeLocation}
              onAdd={addLocation}
            />
          )}
          {tab === 'reps' && (
            <RepsTab
              reps={reps}
              active={salesAgent}
              onSelect={setSalesAgent}
              onRemove={removeRep}
              onAdd={addRep}
            />
          )}
          {tab === 'pricing' && (
            <PricingTab
              showPrices={showPrices}
              showTotals={showTotals}
              onTogglePrices={toggleShowPrices}
              onToggleTotals={toggleShowTotals}
            />
          )}
          {tab === 'leads' && <LeadsTab />}
        </div>

        {/* footer */}
        <div className="px-5 py-4 flex justify-end" style={{ borderTop: '1px solid rgba(var(--ink),0.08)' }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-[var(--text)] cursor-pointer transition-colors"
            style={{ background: 'rgba(var(--ink),0.1)', border: '1px solid rgba(var(--ink),0.15)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationsTab({ locations, active, onSelect, onRemove, onAdd }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">Active Demo Location</p>
      <div className="flex flex-col gap-1">
        {locations.map((loc) => (
          <div
            key={loc}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ background: loc === active ? 'rgba(var(--ink),0.08)' : 'rgba(var(--ink),0.03)', border: '1px solid rgba(var(--ink),0.06)' }}
          >
            <MapPin size={14} className="text-[var(--text-muted)] flex-shrink-0" aria-hidden="true" />
            <button className="flex-1 text-left text-sm text-[var(--text)] cursor-pointer" onClick={() => onSelect(loc)} aria-pressed={loc === active}>{loc}</button>
            {loc === active ? (
              <Check size={14} className="text-[var(--text)] flex-shrink-0" aria-hidden="true" />
            ) : (
              locations.length > 1 && (
                <button onClick={() => onRemove(loc)} aria-label={`Remove location: ${loc}`} className="w-6 h-6 flex items-center justify-center flex-shrink-0 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                  <Trash2 size={14} className="text-[#E32636]" aria-hidden="true" />
                </button>
              )
            )}
          </div>
        ))}
      </div>
      <LocationInput existing={locations} onAdd={onAdd} />
    </div>
  );
}

function RepsTab({ reps, active, onSelect, onRemove, onAdd }) {
  const [newValue, setNewValue] = useState('');
  const submit = () => {
    const v = newValue.trim();
    if (v) { onAdd(v); setNewValue(''); }
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">Sales Representatives</p>
      <div className="flex flex-col gap-1">
        {reps.map((rep) => (
          <div
            key={rep}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ background: rep === active ? 'rgba(var(--ink),0.08)' : 'rgba(var(--ink),0.03)', border: '1px solid rgba(var(--ink),0.06)' }}
          >
            <User size={14} className="text-[var(--text-muted)] flex-shrink-0" aria-hidden="true" />
            <button className="flex-1 text-left text-sm text-[var(--text)] cursor-pointer" onClick={() => onSelect(rep)} aria-pressed={rep === active}>{rep}</button>
            {rep === active ? (
              <Check size={14} className="text-[var(--text)] flex-shrink-0" aria-hidden="true" />
            ) : (
              reps.length > 1 && (
                <button onClick={() => onRemove(rep)} aria-label={`Remove rep: ${rep}`} className="w-6 h-6 flex items-center justify-center flex-shrink-0 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                  <Trash2 size={14} className="text-[#E32636]" aria-hidden="true" />
                </button>
              )
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Add rep…"
          aria-label="Add sales rep"
          className="flex-1 px-3 py-2 rounded-lg text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
          style={{ background: 'rgba(var(--ink),0.06)', border: '1px solid rgba(var(--ink),0.1)' }}
        />
        <button
          onClick={submit}
          aria-label="Add sales rep"
          className="px-3 py-2 rounded-lg cursor-pointer transition-colors"
          style={{ background: 'rgba(var(--ink),0.1)', border: '1px solid rgba(var(--ink),0.15)' }}
        >
          <Plus size={16} className="text-[var(--text)]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function PricingTab({ showPrices, showTotals, onTogglePrices, onToggleTotals }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">Pricing Display</p>
      <div className="flex flex-col gap-2">
        <ToggleRow
          label="Show item prices"
          desc="Per-item prices in the catalog and estimate"
          checked={showPrices}
          onChange={onTogglePrices}
        />
        <ToggleRow
          label="Show cost totals"
          desc="Running total in the build footer and the estimate summary"
          checked={showTotals}
          onChange={onToggleTotals}
        />
      </div>
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
        Turn both off to present the build as a spec sheet with no pricing.
      </p>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div
      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg"
      style={{ background: 'rgba(var(--ink),0.03)', border: '1px solid rgba(var(--ink),0.06)' }}
    >
      <div className="min-w-0">
        <p className="text-sm text-[var(--text)]">{label}</p>
        <p className="text-[11px] text-[var(--text-muted)]">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className="relative w-11 h-6 rounded-full flex-shrink-0 cursor-pointer transition-colors"
        style={{ background: checked ? '#E32636' : 'rgba(var(--ink),0.2)' }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-150"
          style={{ left: checked ? '22px' : '2px' }}
        />
      </button>
    </div>
  );
}
