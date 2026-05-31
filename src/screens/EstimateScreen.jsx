import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useStartOver } from '../hooks/useStartOver';
import { LehrLogo } from '../components/LehrLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { LeadCaptureToggle } from '../components/LeadCaptureToggle';
import { GlassCard } from '../components/GlassCard';
import { equipment as catalog } from '../data/equipment';
import { vehicles } from '../data/vehicles';

export function EstimateScreen() {
  const navigate      = useNavigate();
  const startOver     = useStartOver();
  const vehicleType   = useStore((s) => s.vehicleType);
  const paintScheme   = useStore((s) => s.paintScheme);
  const equipmentState = useStore((s) => s.equipment);
  const fleetQty      = useStore((s) => s.fleetQty);
  const taxRate       = useStore((s) => s.taxRate);
  const setTaxRate    = useStore((s) => s.setTaxRate);
  const showPrices    = useStore((s) => s.showPrices);
  const showTotals    = useStore((s) => s.showTotals);
  const user          = useStore((s) => s.user);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);

  const vehicle     = vehicles.find((v) => v.id === vehicleType);
  const paint       = vehicle?.paintOptions.find((p) => p.id === paintScheme) || vehicle?.paintOptions[0];
  const selected    = catalog.filter((e) => equipmentState[e.id]);
  const perVehicle  = selected.reduce((s, e) => s + e.price, 0);
  const subtotal    = perVehicle * fleetQty;
  const taxAmount   = subtotal * (taxRate / 100);
  const orderTotal  = subtotal + taxAmount;

  const agencyLabel = user.agency || user.name || 'Guest';

  const fmt   = (n) => `$${Math.round(n).toLocaleString()}`;
  const fmt2  = (n) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(var(--ink),0.07)', background: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={() => navigate('/build')}
          aria-label="Back to build"
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
        <div className="max-w-2xl lg:max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10 flex flex-col gap-6">
          {/* title */}
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {agencyLabel} · {demoLocation} · {salesAgent}
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text)] tracking-tight">{showPrices || showTotals ? 'Price Estimate' : 'Build Summary'}</h1>
            <p className="text-[13px] text-[var(--text-muted)]">
              {paint?.label} · {vehicle?.year} {vehicle?.name} · Fleet of {fleetQty}
            </p>
          </div>

          {/* desktop: equipment list (left) + sticky order summary (right);
              mobile: single column, same DOM order so layout is unchanged */}
          <div className={`flex flex-col gap-6 ${showTotals ? 'lg:grid lg:grid-cols-[1fr_minmax(320px,380px)] lg:gap-6 lg:items-start' : ''}`}>
          {/* equipment per vehicle */}
          <GlassCard className="overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(var(--ink),0.07)' }}
            >
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)]">
                Equipment Per Vehicle
              </p>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--text-muted)]">
                {selected.length} item{selected.length !== 1 ? 's' : ''}
              </p>
            </div>

            {selected.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: idx === 0 ? 'none' : '1px solid rgba(var(--ink),0.04)' }}
              >
                <div>
                  <p className="text-sm text-[var(--text)]">{item.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.category}</p>
                </div>
                {showPrices && (
                  <p className="text-sm text-[var(--text)] font-mono tabular-nums ml-4 flex-shrink-0">
                    {fmt(item.price)}
                  </p>
                )}
              </div>
            ))}

            {showTotals && (
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: '1px solid rgba(var(--ink),0.08)', background: 'rgba(var(--scrim),0.3)' }}
              >
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-dim)]">Per Vehicle</p>
                <p className="text-base font-bold text-[var(--text)] font-mono tabular-nums">{fmt(perVehicle)}</p>
              </div>
            )}
          </GlassCard>

          {/* order summary */}
          {showTotals && (
          <GlassCard className="overflow-hidden lg:sticky lg:top-6">
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid rgba(var(--ink),0.07)' }}
            >
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)]">
                Order Summary
              </p>
            </div>

            {[
              { label: 'Equipment / vehicle', value: fmt(perVehicle) },
              { label: `Fleet quantity (× ${fleetQty})`, value: `× ${fleetQty}` },
              { label: 'Subtotal', value: fmt(subtotal) },
            ].map(({ label, value }, idx) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: idx === 0 ? 'none' : '1px solid rgba(var(--ink),0.04)' }}
              >
                <p className="text-sm text-[var(--text-2)]">{label}</p>
                <p className="text-sm text-[var(--text)] font-mono tabular-nums">{value}</p>
              </div>
            ))}

            {/* tax row with editable rate */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: '1px solid rgba(var(--ink),0.04)' }}
            >
              <div className="flex items-center gap-2">
                <p className="text-sm text-[var(--text-2)]">CA Sales Tax</p>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    aria-label="Sales tax rate (percent)"
                    className="w-14 text-center text-sm text-[var(--text)] rounded-lg py-0.5 px-2 outline-none"
                    style={{ background: 'rgba(var(--ink),0.08)', border: '1px solid rgba(var(--ink),0.15)' }}
                    step="0.25"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-[var(--text-muted)]">%</span>
                </div>
              </div>
              <p className="text-sm text-[var(--text)] font-mono tabular-nums">{fmt2(taxAmount)}</p>
            </div>

            {/* order total */}
            <div
              className="flex items-center justify-between px-4 py-4"
              style={{ borderTop: '1px solid rgba(var(--ink),0.1)', background: 'rgba(var(--scrim),0.3)' }}
            >
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)]">Order Total</p>
              <p className="text-2xl font-bold text-[var(--text)] font-mono tabular-nums">{fmt2(orderTotal)}</p>
            </div>
          </GlassCard>
          )}

          {/* disclaimer */}
          <p className="text-[11px] text-[var(--text-muted)] text-center lg:text-left leading-relaxed">
            This estimate is for budgetary purposes only. Final pricing subject to installation requirements, vehicle availability, and applicable taxes. Contact your LEHR sales representative for a formal quote.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
