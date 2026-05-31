import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useTheme } from './hooks/useTheme';
import { LeadCaptureScreen } from './screens/LeadCaptureScreen';
import { VehicleSelectScreen } from './screens/VehicleSelectScreen';
import { BuildBayScreen } from './screens/BuildBayScreen';
import { EstimateScreen } from './screens/EstimateScreen';
import { BackgroundLayer } from './components/BackgroundLayer';

// Persistent shell: the full-viewport background image stays mounted across
// route changes instead of being re-fetched/re-decoded by every screen.
function Layout() {
  return (
    <>
      <BackgroundLayer />
      <Outlet />
    </>
  );
}

// When lead capture is on, the build flow requires a captured lead (the form is
// the entry point); when off, every screen is open and visitors are treated as
// guests.
function RequireUser({ children }) {
  const user = useStore((s) => s.user);
  const leadCaptureEnabled = useStore((s) => s.leadCaptureEnabled);
  if (!leadCaptureEnabled) return children;
  const hasUser =
    user.name.length > 0 ||
    user.agency.length > 0 ||
    user.phone.length > 0 ||
    user.email.length > 0;
  if (!hasUser) return <Navigate to="/" replace />;
  return children;
}

function RequireVehicle({ children }) {
  const vehicleType = useStore((s) => s.vehicleType);
  if (!vehicleType) return <Navigate to="/vehicle" replace />;
  return children;
}

function RequireEquipment({ children }) {
  const equipment = useStore((s) => s.equipment);
  const hasEquipment = Object.values(equipment).some(Boolean);
  if (!hasEquipment) return <Navigate to="/build" replace />;
  return children;
}

export default function App() {
  useTheme(); // applies <html data-theme> from the persisted choice / OS setting
  const leadCaptureEnabled = useStore((s) => s.leadCaptureEnabled);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={leadCaptureEnabled ? <LeadCaptureScreen /> : <Navigate to="/vehicle" replace />}
          />
          <Route
            path="/vehicle"
            element={
              <RequireUser>
                <VehicleSelectScreen />
              </RequireUser>
            }
          />
          <Route
            path="/build"
            element={
              <RequireUser>
                <RequireVehicle>
                  <BuildBayScreen />
                </RequireVehicle>
              </RequireUser>
            }
          />
          <Route
            path="/estimate"
            element={
              <RequireUser>
                <RequireVehicle>
                  <RequireEquipment>
                    <EstimateScreen />
                  </RequireEquipment>
                </RequireVehicle>
              </RequireUser>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
