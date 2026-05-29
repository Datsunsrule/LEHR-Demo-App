import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { LoginScreen } from './screens/LoginScreen';
import { VehicleSelectScreen } from './screens/VehicleSelectScreen';
import { BuildBayScreen } from './screens/BuildBayScreen';
import { EstimateScreen } from './screens/EstimateScreen';

function RequireUser({ children }) {
  const user = useStore((s) => s.user);
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
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
      </Routes>
    </BrowserRouter>
  );
}
