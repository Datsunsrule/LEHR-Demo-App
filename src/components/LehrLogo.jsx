const base = import.meta.env.BASE_URL;

export function LehrLogo({ width = 120, className = '' }) {
  return (
    <img
      src={`${base}assets/Genericlogo.jpg`}
      alt="LEHR Auto Electric"
      width={width}
      className={className}
      style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }}
    />
  );
}
