import { useState } from 'react';
import { X, MapPin, User, Sun, Moon, Trash2, Plus, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LeadsTab } from './LeadsTab';

export function AdminPanel({ onClose }) {
  const [tab, setTab]           = useState('locations');
  const [newLocation, setNewLocation] = useState('');
  const [newRep, setNewRep]     = useState('');

  const locations     = useStore((s) => s.locations);
  const reps          = useStore((s) => s.reps);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);
  const theme         = useStore((s) => s.theme);
  const setDemoLocation = useStore((s) => s.setDemoLocation);
  const setSalesAgent   = useStore((s) => s.setSalesAgent);
  const setTheme        = useStore((s) => s.setTheme);
  const addLocation     = useStore((s) => s.addLocation);
  const removeLocation  = useStore((s) => s.removeLocation);
  const addRep          = useStore((s) => s.addRep);
  const removeRep       = useStore((s) => s.removeRep);

  const leads = useStore((s) => s.leads);

  const tabs = [
    { id: 'locations', label: 'Locations' },
    { id: 'reps',      label: 'Sales Reps' },
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
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: '#111',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-base font-bold text-white">Admin Panel</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <X size={16} className="text-white" />
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
                background: tab === t.id ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: tab === t.id ? '#fff' : '#666',
                border: '1px solid',
                borderColor: tab === t.id ? 'rgba(255,255,255,0.2)' : 'transparent',
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
              newValue={newLocation}
              setNewValue={setNewLocation}
              onAdd={() => {
                if (newLocation.trim()) {
                  addLocation(newLocation.trim());
                  setNewLocation('');
                }
              }}
            />
          )}
          {tab === 'reps' && (
            <RepsTab
              reps={reps}
              active={salesAgent}
              onSelect={setSalesAgent}
              onRemove={removeRep}
              newValue={newRep}
              setNewValue={setNewRep}
              onAdd={() => {
                if (newRep.trim()) {
                  addRep(newRep.trim());
                  setNewRep('');
                }
              }}
            />
          )}
          {tab === 'leads' && <LeadsTab />}
        </div>

        {/* footer */}
        <div className="px-5 py-4 flex justify-end" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationsTab({ locations, active, onSelect, onRemove, newValue, setNewValue, onAdd }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666]">Active Demo Location</p>
      <div className="flex flex-col gap-1">
        {locations.map((loc) => (
          <div
            key={loc}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ background: loc === active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <MapPin size={14} className="text-[#666] flex-shrink-0" />
            <button className="flex-1 text-left text-sm text-white cursor-pointer" onClick={() => onSelect(loc)}>{loc}</button>
            {loc === active ? (
              <Check size={14} className="text-white flex-shrink-0" />
            ) : (
              locations.length > 1 && (
                <button onClick={() => onRemove(loc)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                  <Trash2 size={14} className="text-[#E32636]" />
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
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder="Add location…"
          className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-[#444] outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        <button
          onClick={onAdd}
          className="px-3 py-2 rounded-lg cursor-pointer transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

function RepsTab({ reps, active, onSelect, onRemove, newValue, setNewValue, onAdd }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666]">Sales Representatives</p>
      <div className="flex flex-col gap-1">
        {reps.map((rep) => (
          <div
            key={rep}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ background: rep === active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <User size={14} className="text-[#666] flex-shrink-0" />
            <button className="flex-1 text-left text-sm text-white cursor-pointer" onClick={() => onSelect(rep)}>{rep}</button>
            {rep === active ? (
              <Check size={14} className="text-white flex-shrink-0" />
            ) : (
              reps.length > 1 && (
                <button onClick={() => onRemove(rep)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                  <Trash2 size={14} className="text-[#E32636]" />
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
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder="Add rep…"
          className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-[#444] outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        <button
          onClick={onAdd}
          className="px-3 py-2 rounded-lg cursor-pointer transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

function AppearanceTab({ theme, setTheme }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666]">Theme</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'dark',  Icon: Moon, label: 'Dark' },
          { id: 'light', Icon: Sun,  label: 'Light' },
        ].map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className="flex flex-col items-center gap-2 py-4 rounded-xl cursor-pointer transition-all"
            style={{
              background: theme === id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              border: theme === id ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Icon size={20} className="text-white" />
            <span className="text-sm font-semibold text-white">{label}</span>
          </button>
        ))}
      </div>
      <div
        className="rounded-xl px-4 py-3 text-xs leading-relaxed text-[#aaa]"
        style={{ background: 'rgba(255, 170, 0, 0.08)', border: '1px solid rgba(255, 170, 0, 0.25)' }}
      >
        <span className="font-bold text-amber-400">Note: </span>
        Light-mode theming requires wiring color tokens across every screen. Toggle here will persist the selection — implement the theme system in this project.
      </div>
    </div>
  );
}
