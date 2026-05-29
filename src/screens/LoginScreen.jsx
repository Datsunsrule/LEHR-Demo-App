import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Settings } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useStore } from '../store/useStore';
import { BackgroundLayer } from '../components/BackgroundLayer';
import { LehrLogo } from '../components/LehrLogo';
import { GlassCard } from '../components/GlassCard';
import { InputField } from '../components/InputField';
import { ChromeButton } from '../components/ChromeButton';
import { AdminPanel } from '../components/AdminPanel';
import { formatPhone } from '../hooks/useFormValidation';

export function LoginScreen() {
  const navigate      = useNavigate();
  const [adminOpen, setAdminOpen] = useState(false);
  const [skipForm, setSkipForm]   = useState(false);

  const user          = useStore((s) => s.user);
  const setUserField  = useStore((s) => s.setUserField);
  const demoLocation  = useStore((s) => s.demoLocation);
  const salesAgent    = useStore((s) => s.salesAgent);

  const addLead       = useStore((s) => s.addLead);
  const clearUser     = useStore((s) => s.clearUser);

  useEffect(() => { clearUser(); setSkipForm(false); }, []);

  const canContinue =
    skipForm ||
    user.name.length > 0 ||
    user.agency.length > 0 ||
    user.phone.length > 0 ||
    user.email.length > 0;

  function handleContinue() {
    const hasData = user.name || user.agency || user.phone || user.email;
    // if skipping with no data, set guest so route guard passes
    if (skipForm && !hasData) {
      setUserField('name', 'Guest');
    }
    addLead({
      name:     hasData ? user.name : 'Guest',
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
      <BackgroundLayer src="/assets/lehr-background.jpg" />

      {/* sticky admin bar */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#aaa]" />
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#aaa]">Demo Location</span>
            <span className="text-[11px] text-white ml-1">{demoLocation}</span>
          </div>
          <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#aaa]">Rep</span>
            <span className="text-[13px] font-bold uppercase text-white" style={{ fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace', letterSpacing: '0.12em' }}>{salesAgent}</span>
          </div>
        </div>
        <button
          onClick={() => setAdminOpen(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Settings size={15} className="text-[#888]" />
        </button>
      </div>

      {/* center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[380px] flex flex-col items-center gap-8">
          {/* logo */}
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.lehr.com" target="_blank" rel="noreferrer">
              <LehrLogo width={300} className="hover:opacity-80 transition-opacity duration-200" />
            </a>
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Emergency Vehicle Outfitting
            </p>
          </div>

          {/* form card */}
          <GlassCard className="w-full px-6 py-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-white tracking-tight">Sign In</h1>
                <p className="text-sm text-[#888]">Enter your details to continue</p>
              </div>
              {/* TODO: REMOVE BEFORE LIVE DEPLOYMENT — test-only bypass */}
              <button
                onClick={() => setSkipForm((v) => !v)}
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-150 cursor-pointer"
                style={{
                  background: skipForm ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                  border: skipForm ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {skipForm && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.5 6.5L9 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <p className="text-[9px] text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
                By continuing, I consent to sharing the information entered above with LEHR Upfitters Opco, LLC
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#444]">Secure Access</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>
            </div>
          </GlassCard>

          {/* QR code */}
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.lehr.com" target="_blank" rel="noreferrer" className="block hover:opacity-70 transition-opacity duration-200">
              <QRCodeSVG
                value="https://www.lehr.com"
                size={100}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
              />
            </a>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              www.lehr.com
            </p>
          </div>

        </div>
      </div>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
