import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Order } from "./pages/Order";
import { MarketCom } from "./pages/market";
import { InputComponent } from "./pages/new";
import { ChartEmbed } from "./pages/chart";
import { Socket } from "./pages/Socket";
import { Login } from "./Login/Login";
import { Register } from "./Login/Register";
import { Forgotpass } from "./Login/ForgotPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chart" element={<ChartEmbed />} />
        <Route path="/Market" element={<MarketCom />} />
        <Route path="/input" element={<InputComponent />} />
        <Route path="/w" element={<Socket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgotpass />} />
      </Routes>
    </Router>
    // <div style={{ padding: "10px", maxWidth: "375px" }}>
    //   <CryptoInput
    //     label="Price"
    //     unit="USDT"
    //     step={0.01}
    //     defaultValue="107814.08"
    //   />
    //   <CryptoInput
    //     label="Amount"
    //     unit="BTC"
    //     step={0.00001}
    //     defaultValue="0.00002"
    //   />
    // </div>
  );
}

export default App;
