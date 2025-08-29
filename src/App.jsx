import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Order } from "./pages/Order";
import { MarketCom } from "./pages/market";
import { InputComponent } from "./pages/new";
import { ChartEmbed } from "./pages/chart";
import { Socket } from "./pages/Socket";
import { Login } from "./Login/Login";
import { Register } from "./Login/Register";
import { Forgotpass } from "./Login/ForgotPassword";
import ToastProvider from "./Toastify/ToastProvider";
import { ResetPassword } from "./Login/ResetPassword";
import { useAuth } from "./hooks/useAuth";
import { History } from "./pages/history";
import { Dashboard } from "./pages/dashboard";
import { OpenOrders } from "./common/openOrders";
import { LayoutWeb } from "./pages/LayoutWeb";
import { Spot } from "./pages/Spot";
import { Referral } from "./pages/Referral";
import { RewardHub } from "./pages/RewardHub";
import { Identification } from "./Account/Identification";
import { Security } from "./Account/Security";
import { Setting } from "./pages/Settings";
import { Footer } from "./pages/Footer";
function App() {
  const last = JSON.parse(localStorage.getItem("lastPair")) || "BTCUSDT";
  const userData = useAuth();
  return (
    <>
      <ToastProvider />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={`/spot/${last}`} replace />} />
          <Route path="/spot/:symbol" element={<Home />} />
          <Route
            path="/spot"
            element={<Navigate to={`/spot/${last}`} replace />}
          />
          <Route
            path="/spot/:symbol"
            element={<Navigate to={`/spot/${last}`} replace />}
          />
          <Route path="/order" element={<Footer />} />
          <Route
            path="/dashboard"
            element={<LayoutWeb component={<Dashboard />} />}
          />
          <Route path="/chart" element={<ChartEmbed />} />
          <Route
            path="/Market"
            element={<LayoutWeb component={<MarketCom />} />}
          />
          <Route path="/input" element={<InputComponent />} />
          <Route path="/asstes" element={<LayoutWeb component={<Spot />} />} />
          <Route
            path="orders"
            element={<LayoutWeb component={<OpenOrders />} />}
          />
          <Route
            path="/history"
            element={<LayoutWeb component={<History />} />}
          />
          <Route path="/w" element={<Socket />} />
          <Route
            path="/login"
            element={
              userData?.token ? (
                <Navigate to={`/spot/${last}`} replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={
              userData?.token ? (
                <Navigate to={`/spot/${last}`} replace />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/forgot"
            element={
              userData?.token ? (
                <Navigate to={`/spot/${last}`} replace />
              ) : (
                <Forgotpass />
              )
            }
          />
          <Route
            path="/Reset/:userId"
            element={
              userData?.token ? (
                <Navigate to={`/spot/${last}`} replace />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route path="Referral" element={<Referral />} />
          <Route path="Reward" element={<RewardHub />} />
          <Route
            path="Identity"
            element={<LayoutWeb component={<Identification />} />}
          />
          <Route
            path="security"
            element={<LayoutWeb component={<Security />} />}
          />
          <Route
            path="settings"
            element={<LayoutWeb component={<Setting />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
