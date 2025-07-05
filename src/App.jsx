import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Order } from "./pages/Order";
import React from "react";
import { MarketCom } from "./pages/market";
import { InputComponent } from "./pages/new";
import { ChartEmbed } from "./pages/chart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chart" element={<ChartEmbed />} />
        <Route path="/Market" element={<MarketCom/>} />
        <Route path="/input" element={<InputComponent />} />
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
