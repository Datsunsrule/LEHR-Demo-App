const base = import.meta.env.BASE_URL;

// Intrinsic logo art is 600×194 (~3.093:1). Setting both dimensions reserves
// space so the image doesn't cause layout shift (CLS) while loading.
const LOGO_RATIO = 600 / 194;

export function LehrLogo({ width = 120, className = '' }) {
  return (
    <img
      src={`${base}assets/lehr-logo.png`}
      alt="LEHR Auto Electric"
      width={width}
      height={Math.round(width / LOGO_RATIO)}
      decoding="async"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }}
    />
  );
}
