import { useTheme } from '../hooks/useTheme';

const base = import.meta.env.BASE_URL;
const DARK = `${base}assets/darkBG.webp`;
const LIGHT = `${base}assets/lightBG.webp`;

// Both background images stay mounted and are loaded once, so switching themes is
// an instant opacity flip with no network fetch or decode flash. Scrims keep text
// laid over the photo readable (WCAG 1.4.3).
const DARK_SCRIM = 'linear-gradient(rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.85) 100%)';
const LIGHT_SCRIM = 'linear-gradient(rgba(232,236,241,0.62) 0%, rgba(232,236,241,0.82) 100%)';

export function BackgroundLayer() {
  const { resolved } = useTheme();
  const light = resolved === 'light';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src={DARK}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: light ? 0 : 1 }}
      />
      <img
        src={LIGHT}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: light ? 1 : 0 }}
      />
      <div className="absolute inset-0" style={{ background: light ? LIGHT_SCRIM : DARK_SCRIM }} />
    </div>
  );
}
