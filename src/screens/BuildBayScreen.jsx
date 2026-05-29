import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LehrLogo } from '../components/LehrLogo';
import { BackgroundLayer } from '../components/BackgroundLayer';
import { VehicleHero } from '../components/VehicleHero';
import { PaintSelector } from '../components/PaintSelector';
import { EquipmentCatalog } from '../components/EquipmentCatalog';
import { BuildSummaryBar } from '../components/BuildSummaryBar';
import { vehicles } from '../data/vehicles';

export function BuildBayScreen() {
  const navigate      = useNavigate();
  const vehicleType   = useStore((s) => s.vehicleType);
  const paintScheme   = useStore((s) => s.paintScheme);
  const equipment     = useStore((s) => s.equipment);
  const user          = useStore((s) => s.user);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);

  const vehicle = vehicles.find((v) => v.id === vehicleType);
  if (!vehicle) return null;

  const paint = vehicle.paintOptions.find((p) => p.id === paintScheme) || vehicle.paintOptions[0];

  const agencyLabel = user.agency || user.name || 'Guest';

  return (
    <div className="min-h-screen flex flex-col pb-0">
      <BackgroundLayer src="/assets/lehr-background.jpg" />
      {/* header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={() => navigate('/vehicle')}
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <LehrLogo width={85} />
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Home size={18} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
          {/* title */}
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#666]">
              {demoLocation} · {salesAgent}
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight">Configure Your Build</h1>
            <p className="text-[13px] text-[#666]">{vehicle.year} {vehicle.name} {vehicle.sub}</p>
          </div>

          {/* hero */}
          <VehicleHero imageUrl={paint.image} selectedEquipment={equipment} />

          {/* paint */}
          <PaintSelector vehicle={vehicle} />

          {/* catalog */}
          <EquipmentCatalog />

          {/* bottom padding so sticky bar doesn't cover last item */}
          <div className="h-4" />
        </div>
      </div>

      <BuildSummaryBar />
    </div>
  );
}
