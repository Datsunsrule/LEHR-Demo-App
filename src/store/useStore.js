import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      theme: 'dark',

      setDemoLocation: (loc) => set({ demoLocation: loc }),
      setSalesAgent:   (rep) => set({ salesAgent: rep }),
      setTheme:        (t)   => set({ theme: t }),
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
            { id: crypto.randomUUID(), ...lead, capturedAt: new Date().toISOString() },
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
      partialize: (state) => ({
        locations:    state.locations,
        reps:         state.reps,
        demoLocation: state.demoLocation,
        salesAgent:   state.salesAgent,
        theme:        state.theme,
        leads:        state.leads,
      }),
    }
  )
);
