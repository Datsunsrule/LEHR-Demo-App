import { useMemo } from 'react';
import { EquipmentOverlay } from './EquipmentOverlay';
import { equipment } from '../data/equipment';

export function VehicleHero({ imageUrl, selectedEquipment }) {
  // Selected equipment with overlays, deduped by overlay label (first wins).
  const overlays = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const e of equipment) {
      if (!selectedEquipment[e.id] || !e.overlay || seen.has(e.overlay.label)) continue;
      seen.add(e.overlay.label);
      result.push(e);
    }
    return result;
  }, [selectedEquipment]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <img
        src={imageUrl}
        alt="Vehicle preview"
        decoding="async"
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      {/* LIVE PREVIEW badge */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-[0.15em] uppercase text-white"
        style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        Live Preview
      </div>
      {overlays.map((e) => (
        <EquipmentOverlay key={e.id} overlay={e.overlay} />
      ))}
    </div>
  );
}
