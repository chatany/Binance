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
import { Referral } from "./pages/Referral";
import { RewardHub } from "./pages/RewardHub";
import { Identification } from "./Account/Identification";
import { Security } from "./Account/Security";
import { Setting } from "./pages/Settings";
import { Footer } from "./pages/Footer";
import MobileSidebar from "./pages/sidebar";
import { Spot } from "./Asset/Spot";
import { Overview } from "./Asset/Overview";
import { Report } from "./Account/financialReport";
import { Authenticator } from "./Account/Authenticator";
import { SpotOrders } from "./Account/SpotOrders";
import { Activity } from "./Account/accountActivity";
import { ChangePassword } from "./Account/ChangePassword";
import { ChangeEmail } from "./Account/changeEmail";
function App() {
  const last = JSON.parse(localStorage.getItem("lastPair")) || "BTCUSDT";
  const userData = useAuth();
  return (
    <>
      <ToastProvider />
      <Socket />
      <Router>
        <MobileSidebar />
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
          <Route path="/activity" element={<Activity />} />
          <Route path="/order" element={<Footer />} />
          <Route
            path="/dashboard"
            element={<LayoutWeb component={<Dashboard />} />}
          />
          <Route path="/changeEmail" element={<ChangeEmail />} />
          <Route path="/authenticate" element={<Authenticator />} />
          <Route path="/asstes" element={<LayoutWeb component={<Spot />} />} />
          <Route
            path="/orders"
            element={<LayoutWeb component={<SpotOrders />} />}
          />
          <Route path="/history" element={<History />} />
          <Route path="/changePassword" element={<ChangePassword />} />
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
            path="overview"
            element={<LayoutWeb component={<Overview />} />}
          />
          <Route
            path="reports"
            element={<LayoutWeb component={<Report />} />}
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
