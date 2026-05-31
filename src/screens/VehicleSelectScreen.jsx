import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Car } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useStartOver } from '../hooks/useStartOver';
import { LehrLogo } from '../components/LehrLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { LeadCaptureToggle } from '../components/LeadCaptureToggle';
import { vehicles } from '../data/vehicles';

export function VehicleSelectScreen() {
  const navigate       = useNavigate();
  const startOver      = useStartOver();
  const user           = useStore((s) => s.user);
  const demoLocation   = useStore((s) => s.demoLocation);
  const setVehicleType = useStore((s) => s.setVehicleType);
  const setPaintScheme = useStore((s) => s.setPaintScheme);

  function handleSelect(vehicle) {
    if (!vehicle.available) return;
    setVehicleType(vehicle.id);
    setPaintScheme(vehicle.paintOptions[0].id);
    navigate('/build');
  }

  const agencyLabel = user.agency || user.name || 'Guest';

  return (
    <div className="min-h-screen flex flex-col">
      {/* header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(var(--ink),0.07)', background: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}
      >
        <div className="w-10" />
        <LehrLogo width={85} />
        <div className="flex items-center gap-2">
          <LeadCaptureToggle />
          <ThemeToggle />
          <button
            onClick={startOver}
            aria-label="Start over"
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ background: 'rgba(var(--ink),0.06)', border: '1px solid rgba(var(--ink),0.1)' }}
          >
            <Home size={18} className="text-[var(--text)]" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl lg:max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10 flex flex-col gap-6">
          {/* title block */}
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {agencyLabel} · {demoLocation}
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text)] tracking-tight">Select Vehicle Platform</h1>
            <p className="text-[13px] text-[var(--text-muted)]">Choose a chassis to start your build</p>
          </div>

          {/* vehicle list */}
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {vehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSelect(v)}
                disabled={!v.available}
                className="vehicle-card w-full text-left rounded-2xl overflow-hidden transition-all duration-150 cursor-pointer"
                style={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(var(--ink),0.08)',
                  opacity: v.available ? 1 : 0.55,
                }}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* thumbnail */}
                  <div className="w-[88px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 bg-black">
                    {v.paintOptions[0]?.image ? (
                      <img
                        src={v.paintOptions[0].image}
                        alt={v.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car size={24} className="text-[var(--text-muted)]" />
                      </div>
                    )}
                  </div>

                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-[var(--text)] leading-tight">{v.name}</p>
                    <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{v.year} · {v.sub}</p>
                  </div>

                  {/* right side */}
                  {v.available ? (
                    <ChevronRight size={20} className="text-[var(--text-muted)] flex-shrink-0" />
                  ) : (
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(var(--ink),0.06)', color: '#b0b0b0', border: '1px solid rgba(var(--ink),0.08)' }}
                    >
                      Soon
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
