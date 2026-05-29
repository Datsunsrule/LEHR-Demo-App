import { useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ChromeButton } from './ChromeButton';
import { equipment } from '../data/equipment';

export function BuildSummaryBar() {
  const navigate        = useNavigate();
  const equipmentState  = useStore((s) => s.equipment);
  const fleetQty        = useStore((s) => s.fleetQty);
  const setFleetQty     = useStore((s) => s.setFleetQty);

  const selectedItems = equipment.filter((e) => equipmentState[e.id]);
  const perVehicle    = selectedItems.reduce((s, e) => s + e.price, 0);
  const total         = perVehicle * fleetQty;
  const count         = selectedItems.length;
  const disabled      = count === 0;

  return (
    <div
      className="sticky bottom-0 left-0 right-0 p-3"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* row 1: fleet stepper + totals */}
        <div className="flex items-center justify-between">
          {/* stepper */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFleetQty(fleetQty - 1)}
              disabled={fleetQty <= 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-100 disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Minus size={14} className="text-white" />
            </button>
            <span
              className="text-base font-bold text-white w-10 text-center tabular-nums"
            >
              {fleetQty}
            </span>
            <button
              onClick={() => setFleetQty(fleetQty + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-100"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Plus size={14} className="text-white" />
            </button>
          </div>

          {/* totals */}
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#666]">
              {count} item{count !== 1 ? 's' : ''} · ${perVehicle.toLocaleString()}/vehicle
            </p>
            <p className="text-2xl font-bold text-white tabular-nums leading-tight">
              ${total.toLocaleString()}
            </p>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#666]">
              Fleet of {fleetQty}
            </p>
          </div>
        </div>

        {/* row 2: CTA */}
        <ChromeButton
          onClick={() => navigate('/estimate')}
          disabled={disabled}
        >
          Price Estimate
        </ChromeButton>
      </div>
    </div>
  );
}
