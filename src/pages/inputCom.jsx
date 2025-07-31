import { useEffect, useState } from "react";
import { SiNike } from "react-icons/si";
export const MarketInput = ({
  label,
  unit,
  defaultValue,
  dark,
  item,
  onChange,
  decimalQuantity,
  value,
}) => {
  const handleChange = (e) => {
    let val = e.target.value;

    // Allow only numbers and dot
    if (!/^(\d+(\.\d*)?|\.\d*)?$/.test(val)) return;

    // Restrict decimal digits
    if (val.includes(".")) {
      const [intPart, decPart] = val.split(".");
      if (decPart.length > decimalQuantity) {
        val = intPart + "." + decPart.slice(0, decimalQuantity);
      }
    }
    onChange(val);
  };
  const [active, setActive] = useState(item?.base_asset_symbol);
  useEffect(() => {
    setActive(item?.base_asset_symbol);
  }, [item?.base_asset_symbol]);

  const [show, setShow] = useState(false);
  return (
    <div className="trade-input">
      <div
        className={`${
          dark ? " bg-[#1e2329] text-white" : " bg-white text-black"
        } text-black input-wrapper`}
      >
        <label className="trade-label p-2 text-[#848E9C]">{label}</label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={`${
            dark ? "text-white" : "text-black"
          } input-field form-control text-end  `}
        />
        <div
          className="right-section relative"
          onMouseEnter={() => setShow(true)}
        >
          <span className={`${dark ? "text-white" : "text-black"} unit`}>
            {unit}
          </span>
          <div
            className={`btn-group border-l-1 ${
              dark ? "border-[#474D57]" : "border-[#474D57]"
            }`}
          >
            <button className="down-btn">▼</button>
          </div>
        </div>
        {/* {show && (
          <div
            className="absolute top-10 right-2 bg-white pt-2 pb-2 rounded-2xl w-30 z-50"
            style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.10)" }}
            onMouseLeave={() => setShow(false)}
          >
            <div
              className={`flex justify-center cursor-pointer  rounded-t-[6px] p-3 ${
                active === item?.base_asset_symbol ? "bg-[#B7BDC6]" : ""
              } capitalize font-medium leading-4`}
              style={{ textTransform: "uppercase" }}
              onClick={() => setActive(item?.base_asset_symbol)}
            >
              {item?.base_asset_symbol}
            </div>
            <div
              className={`flex justify-center cursor-pointer rounded-b-[6px] p-3 ${
                active === item?.quote_asset_symbol ? "bg-[#B7BDC6]" : ""
              } capitalize font-medium leading-4`}
              style={{ textTransform: "uppercase" }}
              onClick={() => setActive(item?.quote_asset_symbol)}
            >
              {item?.quote_asset_symbol}
              <div>
                <SiNike />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
