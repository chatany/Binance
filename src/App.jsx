import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Socket } from "./pages/Socket";
import { Login } from "./Login/Login";
import { Register } from "./Login/Register";
import { Forgotpass } from "./Login/ForgotPassword";
import ToastProvider from "./Toastify/ToastProvider";
import { ResetPassword } from "./Login/ResetPassword";
import { useAuth } from "./hooks/useAuth";
import { History } from "./pages/history";
import { Dashboard } from "./pages/dashboard";
import { LayoutWeb } from "./pages/LayoutWeb";
import { Referral } from "./pages/Referral";
import { RewardHub } from "./pages/RewardHub";
import { Identification } from "./Account/Identification";
import { Security } from "./Account/Security";
import { Setting } from "./pages/Settings";
import MobileSidebar from "./pages/sidebar";
import { Spot } from "./Asset/Spot";
import { Overview } from "./Asset/Overview";
import { Report } from "./Account/financialReport";
import { Authenticator } from "./Account/Authenticator";
import { SpotOrders } from "./Account/SpotOrders";
import { Activity } from "./Account/accountActivity";
import { ChangePassword } from "./Account/ChangePassword";
import { ChangeEmail } from "./Account/changeEmail";
import { AntiPhishing } from "./Account/AntiPhishing";
import { Crypto } from "./pages/DepositeCrypto";
import AppWrapper from "./Account/AppWraper";
import { DepositHistory } from "./common/depositHistory";
import { TransactionHistory } from "./Account/TransactionHistory";
import { WithdrawPassword } from "./Account/withdrawPassword";
import { Bonus } from "./pages/Bonus";
import { Subscription } from "./pages/Suscription";
import { SubscriptionHistory } from "./pages/SubscriptionHistory";
function App() {
  const last = JSON.parse(localStorage.getItem("lastPair")) || "BTCUSDT";
  const userData = useAuth();
  const protectedRoutes = [
    { path: "settings", element: <LayoutWeb component={<Setting />} /> },
    { path: "reports", element: <LayoutWeb component={<Report />} /> },
    { path: "security", element: <LayoutWeb component={<Security />} /> },
    { path: "overview", element: <LayoutWeb component={<Overview />} /> },
    {
      path: "/security/manage-withdraw-password",
      element: <WithdrawPassword />,
    },
    {
      path: "/crypto/withdraw/history",
      element: <LayoutWeb component={<TransactionHistory />} />,
    },
    {
      path: "/crypto/deposit/history",
      element: <LayoutWeb component={<TransactionHistory />} />,
    },
    { path: "Identity", element: <LayoutWeb component={<Identification />} /> },
    { path: "Reward", element: <RewardHub /> },
    { path: "/deposit/history", element: <DepositHistory /> },
    { path: "Referral", element: <Referral /> },
    { path: "/security/manage-password", element: <ChangePassword /> },
    { path: "/crypto/withdraw", element: <Crypto /> },
    { path: "/crypto/deposit", element: <Crypto /> },
    { path: "/history", element: <History /> },
    { path: "/orders", element: <LayoutWeb component={<SpotOrders />} /> },
    { path: "/asstes", element: <LayoutWeb component={<Spot />} /> },
    {
      path: "/security/manage-google-authenticator",
      element: <Authenticator />,
    },
    { path: "/security/manage-email-address", element: <ChangeEmail /> },
    { path: "/dashboard", element: <LayoutWeb component={<Dashboard />} /> },
    { path: "/security/account-activity", element: <Activity /> },
    { path: "/security/anti-phishing-code", element: <AntiPhishing /> },
    { path: "/subscription", element: <LayoutWeb component={<Subscription />}/> },
    { path: "/subscription/running/history", element: <SubscriptionHistory /> },
    {
      path: "/subscription/completed/history",
      element: <SubscriptionHistory />,
    },
    { path: "/bonus", element: <LayoutWeb component={<Bonus />}/> },
  ];
  return (
    <>
      <ToastProvider />
      <Socket />
      <Router>
        <MobileSidebar />
        <Routes>
          <Route path="/" element={<Navigate to={`/spot/${last}`} replace />} />
          <Route path="/spot/:symbol" element={<Home />} />
          {/* <Route
            path="/security/anti-phishing-code"
            element={<AntiPhishing />}
          /> */}
          <Route
            path="/spot"
            element={<Navigate to={`/spot/${last}`} replace />}
          />
          <Route
            path="/spot/:symbol"
            element={<Navigate to={`/spot/${last}`} replace />}
          />
          {/* <Route path="/security/account-activity" element={<Activity />} /> */}
          {/* <Route
            path="/dashboard"
            element={<LayoutWeb component={<Dashboard />} />}
          />
          <Route
            path="/security/manage-email-address"
            element={<ChangeEmail />}
          />
          <Route
            path="/security/manage-google-authenticator"
            element={<Authenticator />}
          />
          <Route path="/asstes" element={<LayoutWeb component={<Spot />} />} />
          <Route
            path="/orders"
            element={<LayoutWeb component={<SpotOrders />} />}
          />
          <Route path="/history" element={<History />} />
          <Route path="/crypto/deposit" element={<Crypto />} />
          <Route path="/crypto/withdraw" element={<Crypto />} />
          <Route
            path="/security/manage-password"
            element={<ChangePassword />}
          /> */}
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
          {/* <Route path="Referral" element={<Referral />} />
          <Route path="/deposit/history" element={<DepositHistory />} />
          <Route path="Reward" element={<RewardHub />} />
          <Route
            path="Identity"
            element={<LayoutWeb component={<Identification />} />}
          />
          <Route
            path="/crypto/deposit/history"
            element={<LayoutWeb component={<TransactionHistory />} />}
          />
          <Route
            path="/crypto/withdraw/history"
            element={<LayoutWeb component={<TransactionHistory />} />}
          />
          <Route
            path="/security/manage-withdraw-password"
            element={<WithdrawPassword />}
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
          /> */}
          {protectedRoutes?.map((item) => (
            <Route
              path={item?.path}
              element={<AppWrapper children={item?.element} />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
