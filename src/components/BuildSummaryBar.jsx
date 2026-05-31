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
  const showPrices      = useStore((s) => s.showPrices);
  const showTotals      = useStore((s) => s.showTotals);

  const selectedItems = equipment.filter((e) => equipmentState[e.id]);
  const perVehicle    = selectedItems.reduce((s, e) => s + e.price, 0);
  const total         = perVehicle * fleetQty;
  const count         = selectedItems.length;
  const disabled      = count === 0;

  return (
    <div
      className="sticky bottom-0 left-0 right-0 p-3"
      style={{ background: 'var(--bar-bg)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(var(--ink),0.08)' }}
    >
      <div className="max-w-2xl lg:max-w-6xl mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* row 1: fleet stepper + totals */}
        <div className="flex items-center justify-between lg:justify-start lg:gap-10">
          {/* stepper */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFleetQty(fleetQty - 1)}
              disabled={fleetQty <= 1}
              aria-label="Decrease fleet quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-100 disabled:opacity-30"
              style={{ background: 'rgba(var(--ink),0.08)', border: '1px solid rgba(var(--ink),0.12)' }}
            >
              <Minus size={14} className="text-[var(--text)]" aria-hidden="true" />
            </button>
            <span
              className="text-base font-bold text-[var(--text)] w-10 text-center tabular-nums"
              aria-live="polite"
              aria-label={`Fleet quantity: ${fleetQty}`}
            >
              {fleetQty}
            </span>
            <button
              onClick={() => setFleetQty(fleetQty + 1)}
              aria-label="Increase fleet quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-100"
              style={{ background: 'rgba(var(--ink),0.08)', border: '1px solid rgba(var(--ink),0.12)' }}
            >
              <Plus size={14} className="text-[var(--text)]" aria-hidden="true" />
            </button>
          </div>

          {/* totals */}
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {count} item{count !== 1 ? 's' : ''}
              {showTotals ? ` · $${perVehicle.toLocaleString()}/vehicle` : ''}
            </p>
            {showTotals && (
              <p className="text-2xl font-bold text-[var(--text)] tabular-nums leading-tight">
                ${total.toLocaleString()}
              </p>
            )}
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              Fleet of {fleetQty}
            </p>
          </div>
        </div>

        {/* row 2: CTA */}
        <ChromeButton
          onClick={() => navigate('/estimate')}
          disabled={disabled}
          className="lg:w-auto lg:px-16 lg:flex-shrink-0"
        >
          {showPrices || showTotals ? 'Price Estimate' : 'View Summary'}
        </ChromeButton>
      </div>
    </div>
  );
}
