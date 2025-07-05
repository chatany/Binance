import { apiRequest } from "../Helper";
import CryptoInput from "./common";
import React from "react";
export const InputComponent = () => {
 

  if (loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: "10px", maxWidth: "375px" }}>
      <CryptoInput
        label="Price"
        unit="USDT"
        step={0.01}
        defaultValue="107814.08"
      />
      <CryptoInput
        label="Amount"
        unit="BTC"
        step={0.00001}
        defaultValue="0.00002"
      />
    </div>
  );
};
