import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useStartOver } from '../hooks/useStartOver';
import { LehrLogo } from '../components/LehrLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { LeadCaptureToggle } from '../components/LeadCaptureToggle';
import { VehicleHero } from '../components/VehicleHero';
import { PaintSelector } from '../components/PaintSelector';
import { EquipmentCatalog } from '../components/EquipmentCatalog';
import { BuildSummaryBar } from '../components/BuildSummaryBar';
import { vehicles } from '../data/vehicles';

export function BuildBayScreen() {
  const navigate      = useNavigate();
  const startOver     = useStartOver();
  const vehicleType   = useStore((s) => s.vehicleType);
  const paintScheme   = useStore((s) => s.paintScheme);
  const equipment     = useStore((s) => s.equipment);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);

  const vehicle = vehicles.find((v) => v.id === vehicleType);
  if (!vehicle) return null;

  const paint = vehicle.paintOptions.find((p) => p.id === paintScheme) || vehicle.paintOptions[0];

  return (
    <div className="min-h-screen flex flex-col pb-0">
      {/* header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(var(--ink),0.07)', background: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={() => navigate('/vehicle')}
          aria-label="Back to vehicle selection"
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(var(--ink),0.06)', border: '1px solid rgba(var(--ink),0.1)' }}
        >
          <ChevronLeft size={20} className="text-[var(--text)]" aria-hidden="true" />
        </button>
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
        <div className="max-w-2xl lg:max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10 flex flex-col gap-6">
          {/* title */}
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {demoLocation} · {salesAgent}
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text)] tracking-tight">Configure Your Build</h1>
            <p className="text-[13px] text-[var(--text-muted)]">{vehicle.year} {vehicle.name} {vehicle.sub}</p>
          </div>

          {/* desktop: sticky preview + paint (left) | equipment catalog (right);
              mobile: single column, same DOM order so layout is unchanged */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              {/* hero */}
              <VehicleHero imageUrl={paint.image} selectedEquipment={equipment} />

              {/* paint */}
              <PaintSelector vehicle={vehicle} />
            </div>

            {/* catalog */}
            <div>
              <EquipmentCatalog />
            </div>
          </div>

          {/* bottom padding so sticky bar doesn't cover last item */}
          <div className="h-4" />
        </div>
      </div>

      <BuildSummaryBar />
    </div>
  );
}
