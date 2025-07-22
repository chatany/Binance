import React, { useEffect } from "react";

const CryptoInput = ({
  label,
  unit,
  step,
  value,
  onChange,
  dark,
  defaultValue,
  decimalQuantity,
}) => {
  const minStep = Math.pow(10, -decimalQuantity);

  const handleChange = (e) => {
    let val = e.target.value;

    // Allow only numbers and dot
    if (!/^(\d+(\.\d*)?|\.\d*)?$/.test(val)) return;

    if (val.includes(".")) {
      const [intPart, decPart] = val.split(".");

      if (decimalQuantity === 0) {
        // If any value after dot, remove dot and everything after it
        if (decPart.length > 0) {
          val = intPart;
        }
      } else if (decPart.length > decimalQuantity) {
        // Limit decimal digits
        val = intPart + "." + decPart.slice(0, decimalQuantity);
      }
    }

    onChange(val);
  };

  const increase = () => {
    let num = parseFloat(value || 0) + minStep;
    let result = num.toFixed(decimalQuantity);
    onChange(result);
  };

  const decrease = () => {
    let num = parseFloat(value || 0) - minStep;
    if (num < 0) num = 0;
    let result = num.toFixed(decimalQuantity);
    onChange(result);
  };
  return (
    <div className="trade-input">
      <div
        className={`${
          dark ? "bg-[#1e2329] text-white" : "bg-white text-black"
        } input-wrapper`}
      >
        <label className="trade-label p-2 text-[#848E9C]">{label}</label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={`${
            dark ? "text-white" : "text-black"
          } input-field form-control text-end`}
        />
        <div className="right-section">
          <span className={`${dark ? "text-white" : "text-black"} unit`}>
            {unit}
          </span>
          <div
            className={`btn-group border-l-1 ${
              dark ? "border-[#474D57]" : "border-[#474D57]"
            }`}
          >
            <button
              className="up-btn"
              onClick={increase}
              style={{
                borderBottom: `1px solid ${dark ? "#474D57" : "#474D57"}`,
              }}
            >
              ▲
            </button>
            <button className="down-btn" onClick={decrease}>
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInput;
