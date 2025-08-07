import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buysellBalance,
  deleteOpenOrder,
  openOrders,
  OrderHistory,
} from "../pages/apiCall";
import { setIsSuccess, setShowPopup } from "../store/webSocket";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../Helper";
import { IoCloseSharp } from "react-icons/io5";

export const ModifyPopup = ({ orderId }) => {
  const {
    openOrder,
    priceDecimal,
    quantityDecimal,
    apiId,
    showPopup,
    balance,
  } = useSelector((state) => state.counter);
  const item = openOrder.find((item) => item?.order_id === orderId);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [price, setPrice] = useState(item?.order_price);
  const [stopPrice, setStopPrice] = useState(item?.stop_limit_price);
  const [amount, setAmount] = useState(item?.base_quantity);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [error, setError] = useState({
    limitErr: "",
    stopErr: "",
  });
  const validateBuyAmount = (val, price, key) => {
    const value = val * price;
    if (value <= 10) {
      setError((prev) => ({
        ...prev,
        [key]:
          "Amount must be greater than 10 and less than or equal to 9000000",
      }));
    } else if (value > balance?.quote_balance) {
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
    dispatch(setShowPopup(false));
    const orderData = {
      order_id: item?.order_id,
      pair_id: item?.pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
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
      } catch (err) {
        console.error("Failed to fetch second API", err);
      } finally {
      }
    };
    deletePopup();
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
      setIsSuccess(true);
      try {
        const { data } = await apiRequest({
          method: "post",
          url: url,
          data: buyObj,
        });
      } catch (err) {
        console.error("Failed to fetch second API", err);
      } finally {
        setIsSuccess(false);
        buysellBalance(item?.pair_id, dispatch);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
      }
    };
    handleBuy();
  };
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
  const handleStopBuy = async () => {
    if (error.stopErr) return;
    setIsSuccess(true);
    const orderData = {
      order_id: item?.order_id,
      pair_id: item?.pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
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
      } catch (err) {
        console.error("Failed to fetch second API", err);
      } finally {
      }
    };
    deletePopup();
    const url =
      item?.type === "BUY"
        ? `https://test.bitzup.com/order/user/place-buy-stop-limit`
        : `https://test.bitzup.com/order/user/place-sell-stop-limit`;

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
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  return (
    <div
      className="md:w-[20rem] w-full bg-white max-md:absolute max-md:bottom-0 z-30 max-md:slide-inTop  text-black border-gray-200 p-5 flex flex-col gap-4 md:rounded-xl rounded-[12px_12px_0px_0px]"
      style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.10)" }}
      ref={popupRef}
    >
      <div className="text-[16px] text-black flex justify-between w-full items-center p-2">
        Modify Order
        <IoCloseSharp
          className="h-6 w-6"
          onClick={() => dispatch(setShowPopup(false))}
        />
      </div>
      {item?.order_type !== "STOP_LIMIT" ? (
        <div className="p-[5px] flex flex-col gap-4 justify-center w-full items-center">
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
              Amount(BTC)
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
                validateBuyAmount(price, e.target.value, "limitErr");
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
            className="bg-[#2EDBAD] w-full  rounded-xl  h-[2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize"
          >
            submit
          </button>
        </div>
      ) : (
        <div
          style={{ padding: "5px", maxWidth: "100%" }}
          className=" flex flex-col gap-2 items-center w-full"
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
              Amount (BTC)
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
            className="bg-[#2EDBAD] w-full  rounded-xl  h-[2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize"
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
};
