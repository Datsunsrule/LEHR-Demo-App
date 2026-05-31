export function EquipmentOverlay({ overlay }) {
  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden pointer-events-none rounded animate-overlay-fade-in"
      style={{
        left:           `${overlay.left}%`,
        top:            `${overlay.top}%`,
        width:          `${overlay.width}%`,
        height:         `${overlay.height}%`,
        background:     'rgba(22, 25, 32, 0.62)',
        border:         '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow:      '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <span className="text-[8px] font-bold text-white uppercase tracking-wider px-0.5 whitespace-nowrap drop-shadow">
        {overlay.label}
      </span>
    </div>
  );
}
