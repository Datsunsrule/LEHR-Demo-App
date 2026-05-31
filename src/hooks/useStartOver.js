import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

// "Start over" for the kiosk: wipe the previous customer's PII and build config,
// then return to the entry point. Used by the Home button on every screen so a
// new walk-up gets a clean slate even while the login screen (the other reset
// chokepoint) is disabled.
export function useStartOver() {
  const navigate = useNavigate();
  return () => {
    const { clearUser, resetBuild } = useStore.getState();
    clearUser();
    resetBuild();
    navigate('/');
  };
}
