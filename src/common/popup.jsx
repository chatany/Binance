import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buysellBalance,
  deleteOpenOrder,
  openOrders,
  OrderHistory,
} from "../pages/apiCall";
import { setShowPopup } from "../store/webSocket";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../Helper";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

export const ModifyPopup = ({ orderId }) => {
  const {
    openOrder,
    priceDecimal,
    quantityDecimal,
    apiId,
    showPopup,
    balance,
    dark,
  } = useSelector((state) => state.counter);
  const item = openOrder.find((item) => item?.order_id === orderId);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [price, setPrice] = useState(item?.order_price);
  const [stopPrice, setStopPrice] = useState(item?.stop_limit_price);
  const [amount, setAmount] = useState(item?.base_quantity);
  const { symbol } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [error, setError] = useState({
    limitErr: "",
    stopErr: "",
  });
  const validateBuyAmount = (val, price, key) => {
    const value = val * price;
    const amount = item?.base_quantity * item?.order_price;
    const check =
      item?.type?.toLowerCase() === "sell"
        ? Number(price * balance?.base_balance) + Number(amount)
        : Number(balance?.quote_balance) + Number(amount);
    if (value <= 10) {
      setError((prev) => ({
        ...prev,
        [key]:
          "Amount must be greater than 10 and less than or equal to 9000000",
      }));
    } else if (value > check) {
      setError((prev) => ({ ...prev, [key]: "insufficient balance" }));
    } else {
      setError((prev) => ({ ...prev, [key]: "" }));
    }
  };
  const handleChange = (e, decimalQuantity, onChange) => {
    let val = e.target.value;

    if (!/^(\d+(\.\d*)?|\.\d*)?$/.test(val)) return;

    if (val.includes(".")) {
      const [intPart, decPart] = val.split(".");

      if (decimalQuantity === 0) {
        if (decPart.length > 0) {
          val = intPart;
        }
      } else if (decPart.length > decimalQuantity) {
        val = intPart + "." + decPart.slice(0, decimalQuantity);
      }
    }

    onChange(val);
  };
  const handleSubmit = () => {
    if (error.limitErr) return;
    const url =
      item?.type === "BUY"
        ? `https://test.bitzup.com/order/user/place-buy-order`
        : `https://test.bitzup.com/order/user/place-sell-order`;
    const orderData = {
      order_id: item?.order_id,
      pair_id: item?.pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
    };
    const buyObj = {
      order_type: "Limit",
      base_volume: amount,
      pair_id: item?.pair_id,
      limit_price: String(price),
      device_type: "windows",
      device_info: "systems",
      api_id: apiId,
      ...(item?.type === "BUY" && { quote_volume: "0" }),
    };
    const handleBuy = async () => {
      try {
        const { data } = await apiRequest({
          method: "post",
          url: url,
          data: buyObj,
        });
      } catch (err) {
        console.error("Failed to fetch second API", err);
      } finally {
        buysellBalance(item?.pair_id, dispatch);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        dispatch(setShowPopup(false));
      }
    };
    const deletePopup = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "post",
          url: `https://test.bitzup.com/order/user/cancel-order`,
          data: orderData,
        });
        if (status === 400 && data?.status == 3) {
          // window.location.href = "/login";
          localStorage.removeItem("userData");
          window.dispatchEvent(new Event("userDataChanged"));
        }
        if (data?.status == 1 && status === 200) {
          handleBuy();
        }
      } catch (err) {
        console.error("Failed to fetch second API", err);
      }
    };
    deletePopup();
  };
  const handleStopBuy = async () => {
    if (error.stopErr) return;
    const StopBuyObj = {
      order_type: "Stop Limit",
      base_volume: amount,
      pair_id: item?.pair_id,
      api_id: apiId,
      quote_volume: 0,
      limit_price: price,
      stop_price: stopPrice,
      device_type: "windows",
      device_info: "systems",
    };
    const orderData = {
      order_id: item?.order_id,
      pair_id: item?.pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
    };
    const url =
      item?.type === "BUY"
        ? `https://test.bitzup.com/order/user/place-buy-stop-limit`
        : `https://test.bitzup.com/order/user/place-sell-stop-limit`;
    const handleChange = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "post",
          url: url,
          data: StopBuyObj,
        });
      } catch (err) {
        console.error("Failed to fetch second API", err);
      } finally {
        buysellBalance(item?.pair_id, dispatch);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        dispatch(setShowPopup(false));
      }
    };
    const deletePopup = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "post",
          url: `https://test.bitzup.com/order/user/cancel-order`,
          data: orderData,
        });
        if (status === 400 && data?.status == 3) {
          // window.location.href = "/login";
          localStorage.removeItem("userData");
          window.dispatchEvent(new Event("userDataChanged"));
        }
        if (data?.status == 1 && status === 200) {
          handleChange();
        }
      } catch (err) {
        console.error("Failed to fetch second API", err);
      }
    };
    deletePopup();
  };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // If click is outside the popup
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       dispatch(setShowPopup(false));
  //     }
  //   };

  //   if (showPopup) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showPopup]);
  // const [isMdScreen, setIsMdScreen] = useState(window.innerWidth <= 768);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMdScreen(window.innerWidth <= 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // ✅ Condition: sirf md (768px ya upar) screen size pe kaam kare
      if (window.innerWidth <= 768) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          dispatch(setShowPopup(false));
        }
      }
    };

    if (showPopup) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showPopup, dispatch]);

  if (!showPopup) return null;
  return (
    <div
      className={`md:w-[20rem] w-full  ${
        dark ? "border-[#333B47]" : "border-[#EDEDED]"
      } md:border-1 max-md:absolute max-md:bottom-0 z-30 max-md:slide-inTop  ${
        dark ? "bg-[#181A20] text-[#EAECEF] " : "bg-white text-[#202630] "
      } p-5 flex flex-col gap-4 md:rounded-xl rounded-[12px_12px_0px_0px]`}
      style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.10)" }}
      ref={popupRef}
    >
      <div className=" flex flex-col gap-4 mb-8 pb-5">
        <div className="text-[16px]  flex justify-between w-full items-center p-2">
          Modify Order
          <IoCloseSharp
            className="h-6 w-6 cursor-pointer"
            onClick={() => dispatch(setShowPopup(false))}
          />
        </div>
        {item?.order_type !== "STOP_LIMIT" ? (
          <div className="p-[5px] flex flex-col gap-4 justify-center w-full items-center pb-5">
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="price"
                className="text-[#757575] flex justify-start"
              >
                Price (USDT)
              </label>
              <input
                name="price"
                className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[2rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
                value={price}
                onChange={(e) => {
                  handleChange(e, priceDecimal, setPrice);
                  validateBuyAmount(e.target.value, amount, "limitErr");
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-[#757575] flex justify-start">
                Amount ({symbol?.toLowerCase()?.split("usdt")[0].toUpperCase()})
              </label>
              <input
                name="Email"
                className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[2rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
                value={amount}
                onChange={(e) => {
                  handleChange(e, quantityDecimal, setAmount);
                  validateBuyAmount(e.target.value, price, "limitErr");
                }}
              />
            </div>
            <div>
              {error.limitErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.limitErr}
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={error.limitErr}
              name="submitbtn"
              className="bg-[#2EDBAD] w-full  rounded-xl  h-[2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize"
            >
              submit
            </button>
          </div>
        ) : (
          <div
            style={{ padding: "5px", maxWidth: "100%" }}
            className=" flex flex-col gap-2 items-center w-full pb-5"
          >
            <div className="w-full flex flex-col gap-3">
              <label
                htmlFor="price"
                className="text-[#757575] flex justify-start"
              >
                Stop Price
              </label>
              <input
                name="Email"
                className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[2rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
                value={stopPrice}
                onChange={(e) => handleChange(e, priceDecimal, setStopPrice)}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <label
                htmlFor="price"
                className="text-[#757575] flex justify-start"
              >
                Limit Price (USDT)
              </label>
              <input
                name="Email"
                className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[2rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
                value={price}
                onChange={(e) => {
                  handleChange(e, priceDecimal, setPrice);
                  validateBuyAmount(amount, e.target.value, "stopErr");
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <label
                htmlFor="price"
                className="text-[#757575] flex justify-start"
              >
                Amount ({symbol?.toLowerCase().split("usdt")[0]})
              </label>

              <input
                name="Email"
                className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[2rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
                value={amount}
                onChange={(e) => {
                  handleChange(e, quantityDecimal, setAmount);
                  validateBuyAmount(price, e.target.value, "stopErr");
                }}
              />
            </div>
            <div>
              {error.stopErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.stopErr}
                </div>
              )}
            </div>
            <button
              onClick={handleStopBuy}
              disabled={error.stopErr}
              name="reloadbtn"
              className="bg-[#2EDBAD] w-full  rounded-xl  h-[2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize"
            >
              submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
