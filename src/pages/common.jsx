import React, { useEffect, useState } from "react";

const CryptoInput = ({ label, unit, step, defaultValue, dark }) => {
  const [value, setValue] = useState(defaultValue);

  const increase = () =>
    setValue((prev) => (parseFloat(prev) + step).toFixed(2));
  const decrease = () =>
    setValue((prev) => (parseFloat(prev) - step).toFixed(2));
  useEffect(() => {
    if (value === "") {
      setValue(defaultValue);
    }
  }, [value]);

  return (
    <div className="trade-input">
      <label className="trade-label">{label}</label>
      <div
        className={`${
          dark ? " bg-[#1e2329] text-white" : " bg-white text-black"
        } text-black input-wrapper`}
      >
        <input
          type="text"
          value={value}
          step={0.01}
          onChange={(e) => setValue(e.target.value)}
          className={`${
            dark ? "text-white" : "text-black"
          } input-field form-control text-end  `}
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
              className={`up-btn`}
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
