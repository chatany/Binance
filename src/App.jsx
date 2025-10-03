import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Setting } from "./UserProfile/Settings/Settings";
import { LayoutWeb } from "./UserProfile/Layout/LayoutWeb";
import { Report } from "./UserProfile/Account/FinancialReports/financialReport";
import { Security } from "./UserProfile/Account/Security/Security";
import { Overview } from "./UserProfile/Asset/Overview";
import { WithdrawPassword } from "./UserProfile/Account/Security/withdrawPassword";
import { TransactionHistory } from "./Spot/Deposit & WithDraw/TransactionHistory";
import { Identification } from "./UserProfile/Account/Kyc/Identification";
import { RewardHub } from "./UserProfile/Reward/RewardHub";
import { DepositHistory } from "./Spot/Deposit & WithDraw/Deposit/depositHistory";
import { Referral } from "./UserProfile/Referral/Referral";
import { ChangePassword } from "./UserProfile/Account/Security/ChangePassword";
import { Crypto } from "./Spot/Deposit & WithDraw/DepositeCrypto";
import { History } from "./Spot/MobileView/history";
import { SpotOrders } from "./UserProfile/Orders/SpotOrders";
import { Spot } from "./UserProfile/Asset/Spot";
import { Authenticator } from "./UserProfile/Account/Security/Authenticator";
import { ChangeEmail } from "./UserProfile/Account/Security/ChangeEmail";
import { Dashboard } from "./UserProfile/DashBoard/dashboard";
import { Activity } from "./UserProfile/Account/Security/accountActivity";
import { AntiPhishing } from "./UserProfile/Account/Security/AntiPhishing";
import { SubscriptionHistory } from "./Spot/Suscription/SubscriptionHistory";
import { Bonus } from "./UserProfile/Asset/Bouns/Bonus";
import ToastProvider from "./Toastify/ToastProvider";
import { Socket } from "./Spot/Websockets/Socket";
import MobileSidebar from "./Spot/MobileSideBar/sidebar";
import { Home } from "./Spot/LandingPage.jsx/home";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { ResetPassword } from "./Auth/ResetPassword";
import { Forgotpass } from "./Auth/ForgotPassword";
import AppWrapper from "./AppWraper";
import { Subscription } from "./Spot/Suscription/Suscription";
import { useAuth } from "./Hooks/useAuth";
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
    { path: "/subscription/running/history", element:<LayoutWeb component={<SubscriptionHistory />}/> },
    {
      path: "/subscription/completed/history",
      element:<LayoutWeb component={<SubscriptionHistory />}/>,
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
