import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Captured leads contain customer PII (name, phone, email). On a shared kiosk
// the persisted blob would otherwise sit in localStorage as plaintext, readable
// via devtools or any script on the page. We obfuscate it at rest so it is not
// human-readable. NOTE: this is obfuscation, NOT encryption — the key ships in
// the bundle, so it only deters casual inspection. Real protection requires
// storing leads server-side instead of in the browser.
const OBFUSCATION_KEY = 'lehr-buildbay-kiosk';

function xorBytes(bytes) {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
  }
  return out;
}

function bytesToBinary(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return bin;
}

// crypto.randomUUID is only available in secure contexts (HTTPS/localhost). On a
// plain-http LAN demo it would throw, so fall back to a non-cryptographic id.
function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const obfuscatedStorage = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (raw == null) return null;
    try {
      const bin = atob(raw);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(xorBytes(bytes));
    } catch {
      // Unreadable or legacy plaintext value — drop it so the store falls back
      // to defaults rather than throwing on load.
      return null;
    }
  },
  setItem: (name, value) => {
    const bytes = new TextEncoder().encode(value);
    localStorage.setItem(name, btoa(bytesToBinary(xorBytes(bytes))));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useStore = create(
  persist(
    (set) => ({
      // User session
      user: { name: '', agency: '', phone: '', email: '' },
      setUserField: (field, value) =>
        set((s) => ({ user: { ...s.user, [field]: value } })),
      clearUser: () =>
        set({ user: { name: '', agency: '', phone: '', email: '' } }),

      // Admin config
      locations: [
        'Fresno, California',
        'Sacramento, California',
        'San Diego, California',
        'Las Vegas, Nevada',
        'Phoenix, Arizona',
      ],
      reps: ['Chris Miller', 'Sarah Tran', 'David Reyes', 'Jenn Park'],
      demoLocation: 'Fresno, California',
      salesAgent: 'Chris Miller',

      // 'system' follows the OS setting; 'light'/'dark' force a theme.
      theme: 'system',
      setTheme: (t) => set({ theme: t }),

      // Lead-capture screen: an optional info-collection step shown at the start
      // of a session (formerly the "login" screen). Toggleable from the top nav.
      leadCaptureEnabled: false,
      toggleLeadCapture: () =>
        set((s) => ({ leadCaptureEnabled: !s.leadCaptureEnabled })),

      // Pricing display controls (admin → Pricing tab). Off by default — reps
      // opt in to showing pricing.
      // showPrices  — per-item $ labels in the catalog and estimate.
      // showTotals  — aggregated cost totals (build footer + estimate summary).
      showPrices: false,
      showTotals: false,
      toggleShowPrices: () => set((s) => ({ showPrices: !s.showPrices })),
      toggleShowTotals: () => set((s) => ({ showTotals: !s.showTotals })),

      setDemoLocation: (loc) => set({ demoLocation: loc }),
      setSalesAgent:   (rep) => set({ salesAgent: rep }),
      addLocation: (loc) =>
        set((s) => ({ locations: [...s.locations, loc] })),
      removeLocation: (loc) =>
        set((s) => ({ locations: s.locations.filter((l) => l !== loc) })),
      addRep: (rep) =>
        set((s) => ({ reps: [...s.reps, rep] })),
      removeRep: (rep) =>
        set((s) => ({ reps: s.reps.filter((r) => r !== rep) })),

      // Leads (persisted)
      leads: [],
      addLead: (lead) =>
        set((s) => ({
          leads: [
            { id: uid(), ...lead, capturedAt: new Date().toISOString() },
            ...s.leads,
          ],
        })),
      updateLead: (id, fields) =>
        set((s) => ({
          leads: s.leads.map((l) => (l.id === id ? { ...l, ...fields } : l)),
        })),
      deleteLead: (id) =>
        set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),
      clearLeads: () => set({ leads: [] }),

      // Build config (NOT persisted)
      vehicleType:  null,
      paintScheme:  'white',
      equipment:    {},
      fleetQty:     1,
      taxRate:      7.25,

      setVehicleType:  (id)   => set({ vehicleType: id, equipment: {} }),
      setPaintScheme:  (id)   => set({ paintScheme: id }),
      toggleEquipment: (id)   =>
        set((s) => ({ equipment: { ...s.equipment, [id]: !s.equipment[id] } })),
      setFleetQty:  (n)    => set({ fleetQty: Math.max(1, Math.min(9999, n)) }),
      setTaxRate:   (rate) => set({ taxRate: rate }),
      resetBuild:   ()     =>
        set({ vehicleType: null, paintScheme: 'white', equipment: {}, fleetQty: 1 }),
    }),
    {
      name: 'lehr-admin',
      storage: createJSONStorage(() => obfuscatedStorage),
      partialize: (state) => ({
        locations:    state.locations,
        reps:         state.reps,
        demoLocation: state.demoLocation,
        salesAgent:   state.salesAgent,
        theme:        state.theme,
        leadCaptureEnabled: state.leadCaptureEnabled,
        showPrices:   state.showPrices,
        showTotals:   state.showTotals,
        leads:        state.leads,
      }),
      version: 1,
      // v1: pricing now defaults off. Drop any previously-persisted pricing flags
      // so existing installs adopt the new default instead of keeping `true`.
      migrate: (persisted, version) => {
        if (version < 1 && persisted) {
          delete persisted.showPrices;
          delete persisted.showTotals;
        }
        return persisted;
      },
    }
  )
);
