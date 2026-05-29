import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LehrLogo } from '../components/LehrLogo';
import { BackgroundLayer } from '../components/BackgroundLayer';
import { GlassCard } from '../components/GlassCard';
import { equipment as catalog } from '../data/equipment';
import { vehicles } from '../data/vehicles';

export function EstimateScreen() {
  const navigate      = useNavigate();
  const vehicleType   = useStore((s) => s.vehicleType);
  const paintScheme   = useStore((s) => s.paintScheme);
  const equipmentState = useStore((s) => s.equipment);
  const fleetQty      = useStore((s) => s.fleetQty);
  const taxRate       = useStore((s) => s.taxRate);
  const setTaxRate    = useStore((s) => s.setTaxRate);
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
      <BackgroundLayer src="/assets/lehr-background.jpg" />
      {/* header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={() => navigate('/build')}
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
              {agencyLabel} · {demoLocation} · {salesAgent}
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight">Price Estimate</h1>
            <p className="text-[13px] text-[#666]">
              {paint?.label} · {vehicle?.year} {vehicle?.name} · Fleet of {fleetQty}
            </p>
          </div>

          {/* equipment per vehicle */}
          <GlassCard className="overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#888]">
                Equipment Per Vehicle
              </p>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#555]">
                {selected.length} item{selected.length !== 1 ? 's' : ''}
              </p>
            </div>

            {selected.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
              >
                <div>
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-[11px] text-[#555] mt-0.5">{item.category}</p>
                </div>
                <p className="text-sm text-white font-mono tabular-nums ml-4 flex-shrink-0">
                  {fmt(item.price)}
                </p>
              </div>
            ))}

            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}
            >
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#888]">Per Vehicle</p>
              <p className="text-base font-bold text-white font-mono tabular-nums">{fmt(perVehicle)}</p>
            </div>
          </GlassCard>

          {/* order summary */}
          <GlassCard className="overflow-hidden">
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#888]">
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
                style={{ borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
              >
                <p className="text-sm text-[#aaa]">{label}</p>
                <p className="text-sm text-white font-mono tabular-nums">{value}</p>
              </div>
            ))}

            {/* tax row with editable rate */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-center gap-2">
                <p className="text-sm text-[#aaa]">CA Sales Tax</p>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center text-sm text-white rounded-lg py-0.5 px-2 outline-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    step="0.25"
                    min="0"
                  />
                  <span className="text-sm text-[#666]">%</span>
                </div>
              </div>
              <p className="text-sm text-white font-mono tabular-nums">{fmt2(taxAmount)}</p>
            </div>

            {/* order total */}
            <div
              className="flex items-center justify-between px-4 py-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}
            >
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#888]">Order Total</p>
              <p className="text-2xl font-bold text-white font-mono tabular-nums">{fmt2(orderTotal)}</p>
            </div>
          </GlassCard>

          {/* disclaimer */}
          <p className="text-[11px] text-[#444] text-center leading-relaxed">
            This estimate is for budgetary purposes only. Final pricing subject to installation requirements, vehicle availability, and applicable taxes. Contact your LEHR sales representative for a formal quote.
          </p>
        </div>
      </div>
    </div>
  );
}
