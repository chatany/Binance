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
function App() {
  const last = JSON.parse(localStorage.getItem("lastPair"));
  return (
    <>
      <ToastProvider />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/spot${last}`} replace />}
          />
          <Route path="/spot/:symbol" element={<Home />} />
          <Route
            path="/spot"
            element={<Navigate to={`/spot${last}`} replace />}
          />
          <Route
            path="/spot/:symbol"
            element={<Navigate to={`/spot${last}`} replace />}
          />
          <Route path="/order" element={<Order />} />
          <Route path="/chart" element={<ChartEmbed />} />
          <Route path="/Market" element={<MarketCom />} />
          <Route path="/input" element={<InputComponent />} />
          <Route path="/w" element={<Socket />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgotpass />} />
          <Route path="/Reset/:userId" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
