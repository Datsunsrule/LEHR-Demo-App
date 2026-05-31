import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Settings } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { LehrLogo } from '../components/LehrLogo';
import { GlassCard } from '../components/GlassCard';
import { InputField } from '../components/InputField';
import { ChromeButton } from '../components/ChromeButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { LeadCaptureToggle } from '../components/LeadCaptureToggle';
import { AdminPanel } from '../components/AdminPanel';
import { formatPhone } from '../hooks/useFormValidation';

export function LeadCaptureScreen() {
  const navigate      = useNavigate();
  const { resolved }  = useTheme();
  const [adminOpen, setAdminOpen] = useState(false);
  const [skipForm, setSkipForm]   = useState(false);

  const user          = useStore((s) => s.user);
  const setUserField  = useStore((s) => s.setUserField);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);

  const addLead       = useStore((s) => s.addLead);

  // Each visit to the lead-capture screen starts a fresh kiosk session. Wipe the
  // previous customer's PII and build config so nothing carries over to the
  // next walk-up. Actions are read via getState() to keep this a one-time,
  // dependency-free mount effect; both resets are idempotent under StrictMode.
  useEffect(() => {
    const { clearUser, resetBuild } = useStore.getState();
    clearUser();
    resetBuild();
  }, []);

  const canContinue =
    skipForm ||
    user.name.length > 0 ||
    user.agency.length > 0 ||
    user.phone.length > 0 ||
    user.email.length > 0;

  function handleContinue() {
    const hasData = user.name || user.agency || user.phone || user.email;
    const name = hasData ? user.name : 'Guest';
    // Guarantee a populated user before navigating so RequireUser passes — don't
    // depend on the order of the addLead/navigate calls below.
    if (!hasData) setUserField('name', 'Guest');
    addLead({
      name,
      agency:   user.agency,
      phone:    user.phone,
      email:    user.email,
      location: demoLocation,
      agent:    salesAgent,
    });
    navigate('/vehicle');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* sticky admin bar */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5"
        style={{ background: 'var(--header-bg)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(var(--ink),0.07)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[var(--text-2)]" />
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-2)]">Demo Location</span>
            <span className="text-[11px] text-[var(--text)] ml-1">{demoLocation}</span>
          </div>
          <div className="w-px h-3" style={{ background: 'rgba(var(--ink),0.15)' }} />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-2)]">Rep</span>
            <span className="text-[13px] font-bold uppercase text-[var(--text)]" style={{ fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace', letterSpacing: '0.12em' }}>{salesAgent}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LeadCaptureToggle />
          <ThemeToggle />
          <button
            onClick={() => setAdminOpen(true)}
            aria-label="Open admin panel"
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            style={{ background: 'rgba(var(--ink),0.07)', border: '1px solid rgba(var(--ink),0.1)' }}
          >
            <Settings size={15} className="text-[var(--text-dim)]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[380px] flex flex-col items-center gap-8">
          {/* logo */}
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.lehr.com" target="_blank" rel="noreferrer">
              <LehrLogo width={360} className="hover:opacity-80 transition-opacity duration-200" />
            </a>
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase"
              style={{ color: 'rgba(var(--ink),0.7)' }}
            >
              Emergency Vehicle Outfitting
            </p>
          </div>

          {/* form card */}
          <GlassCard className="w-full px-6 py-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">Let's Get Started</h1>
                <p className="text-sm text-[var(--text-dim)]">Share your details and we'll tailor your build</p>
              </div>
              {/* TODO: REMOVE BEFORE LIVE DEPLOYMENT — test-only bypass */}
              <button
                onClick={() => setSkipForm((v) => !v)}
                role="checkbox"
                aria-checked={skipForm}
                aria-label="Skip sign-in form (test only)"
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-150 cursor-pointer"
                style={{
                  background: skipForm ? 'rgba(var(--ink),0.12)' : 'rgba(var(--ink),0.04)',
                  border: skipForm ? '1px solid rgba(var(--ink),0.25)' : '1px solid rgba(var(--ink),0.1)',
                }}
              >
                {skipForm && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 3.5L3.5 6.5L9 1" stroke="rgba(var(--ink),0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <InputField
                label="Full Name"
                value={user.name}
                onChange={(e) => setUserField('name', e.target.value)}
                placeholder="Officer Jane Smith"
              />
              <InputField
                label="Agency"
                value={user.agency}
                onChange={(e) => setUserField('agency', e.target.value)}
                placeholder="Sky Island Sheriff's Department"
              />
              <InputField
                label="Phone Number"
                value={user.phone}
                onChange={(e) => setUserField('phone', formatPhone(e.target.value))}
                placeholder="(559) 555-0100"
                type="tel"
              />
              <InputField
                label="Email Address"
                value={user.email}
                onChange={(e) => setUserField('email', e.target.value)}
                placeholder="jsmith@skyislandsheriff.gov"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <ChromeButton onClick={handleContinue} disabled={!canContinue}>
                Continue to Build Bay
              </ChromeButton>
              <p className="text-[9px] text-center leading-relaxed" style={{ color: 'rgba(var(--ink),0.7)' }}>
                By continuing, I consent to sharing the information entered above with LEHR Upfitters Opco, LLC
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px" style={{ background: 'rgba(var(--ink),0.08)' }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">Secure Access</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(var(--ink),0.08)' }} />
              </div>
            </div>
          </GlassCard>

          {/* QR code + speech bubble */}
          <div className="flex items-start justify-center gap-3 w-full">

            {/* speech bubble */}
            <div className="relative max-w-[200px] mt-2">
              <div
                className="rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed font-medium text-[var(--text-muted)]"
                style={{ background: 'rgba(var(--ink),0.08)', border: '1px solid rgba(var(--ink),0.14)', backdropFilter: 'blur(8px)' }}
              >
                Review on the go — just scan with your phone to explore LEHR anytime.
              </div>
              {/* tail pointing right toward QR code */}
              <div
                className="absolute top-4 -right-2"
                style={{
                  width: 0, height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: '10px solid rgba(var(--ink),0.12)',
                }}
              />
            </div>

            {/* QR code */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <a href="https://www.lehr.com" target="_blank" rel="noreferrer" className="block hover:opacity-70 transition-opacity duration-200">
                <QRCodeSVG
                  value="https://www.lehr.com"
                  size={90}
                  bgColor="transparent"
                  fgColor={resolved === 'light' ? '#000000' : '#ffffff'}
                  level="M"
                />
              </a>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(var(--ink),0.7)' }}>
                www.lehr.com
              </p>
            </div>

          </div>

        </div>
      </div>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
