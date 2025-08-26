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
          <Route path="/order" element={<Order />} />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
