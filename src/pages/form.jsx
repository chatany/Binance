import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CryptoInput from "./common";
import { useDispatch, useSelector } from "react-redux";
import { marketTabs, RenderLabel, tab } from "../Constant";
import { useEffect, useState } from "react";
import { MarketInput } from "./inputCom";
import { buysellBalance, openOrders, OrderHistory } from "./apiCall";
import { apiRequest } from "../Helper";
import { useNavigate } from "react-router-dom";
import {
  setApiIds,
  setCoinName,
  setPriceDecimal,
  setQuantityDecimal,
} from "../store/webSocket";
import { useDeviceInfo } from "../hooks/useDeviceInfo";
import { showError, showSuccess } from "../Toastify/toastServices";
import { useAuth } from "../hooks/useAuth";
export const Form = () => {
  const searchData = useSelector((state) => state.counter.searchData);
  const currentPrice = useSelector((state) => state.counter.currentPrice);
  const balance = useSelector((state) => state.counter.balance);
  const dark = useSelector((state) => state.counter.dark);
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const open = useSelector((state) => state.counter.open);

  const [activeTab, setActiveTab] = useState("Limit");
  const [buySliderValue, setBuySliderValue] = useState(0);
  const [sellSliderValue, setSellSliderValue] = useState(0);
  const [buyMarketSliderValue, setBuyMarketSliderValue] = useState(0);
  const [sellMarketSliderValue, setSellMarketSliderValue] = useState(0);
  const token = useAuth();
  const [limitBuyLoading, setLimitBuyLoading] = useState(false);
  const [limitSellLoading, setLimitSellLoading] = useState(false);
  const [marketBuyLoading, setMarketBuyLoading] = useState(false);
  const [marketSellLoading, setMarketSellLoading] = useState(false);
  const [stopBuyLoading, setStopBuyLoading] = useState(false);
  const [stopSellLoading, setStopSellLoading] = useState(false);

  const [buyStopSliderValue, setBuyStopSliderValue] = useState(0);
  const [sellStopSliderValue, setSellStopSliderValue] = useState(0);
  const [apiId, setApiId] = useState("");
  const dispatch = useDispatch();
  const deviceInfo = useDeviceInfo();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState({
    limitBuy: "",
    limitSell: "",
    marketSell: "",
    marketBuy: "",
    stopBuy: "",
    stopSell: "",
  });
  const [error, setError] = useState({
    limitBuyErr: "",
    limitSellErr: "",
    marketSellErr: "",
    marketBuyErr: "",
    stopBuyErr: "",
    stopSellErr: "",
  });
  const [formValues, setFormValues] = useState({
    limitPrice: currentPrice ?? "",
    limitAmount: "",
    sellPrice: currentPrice ?? "",
    sellAmount: "",
    MarketBuy: "",
    MarketSell: "",
    stopBuyLimit: "",
    stopBuyAmount: "",
    stopBuyStop: "",
    stopSellLimit: "",
    stopSellAmount: "",
    stopSellStop: "",
  });
  useEffect(() => {
    setBuySliderValue(0);
    setSellSliderValue(0);
    setSellMarketSliderValue(0);
    setBuyMarketSliderValue(0);
    setFormValues((prev) => ({
      ...prev,
      limitPrice: "",
      limitAmount: "",
      sellPrice: "",
      sellAmount: "",
      MarketBuy: "",
      MarketSell: "",
      stopBuyLimit: "",
      stopBuyAmount: "",
      stopBuyStop: "",
      stopSellLimit: "",
      stopSellAmount: "",
      stopSellStop: "",
    }));
  }, [searchQuery]);
  useEffect(() => {
    if (currentPrice) {
      setFormValues((prev) => ({
        ...prev,
        limitPrice: parseFloat(currentPrice),
        sellPrice: parseFloat(currentPrice),
        stopBuyLimit: parseFloat(currentPrice),
        stopSellLimit: parseFloat(currentPrice),
      }));
    }
  }, [currentPrice]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const item =
    Array.isArray(searchData) &&
    searchData?.find(
      (item) => item.pair_symbol?.toLowerCase() === searchQuery?.toLowerCase()
    );
  const CustomSlider = styled(Slider)(({ theme }) => ({
    height: "1px",
    color: "#fff",

    "& .MuiSlider-rail": {
      opacity: 1,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      height: "2px",
    },
    "& .MuiSlider-track": {
      backgroundColor: `${dark ? "gray" : "gray"}`,
      height: "3px",
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
    },
    "& .MuiSlider-mark": {
      width: 8,
      height: 8,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      border: "1px solid black",
      transform: "rotate(45deg)",
      marginTop: -4,
      marginLeft: -5,
    },
    "& .MuiSlider-markActive": {
      border: `1px solid ${dark ? "rgb(245, 245, 245)" : "black"}`,
      width: 14,
      height: 14,
      marginTop: -7,
      marginLeft: -6,
    },
    "& .MuiSlider-valueLabel": {
      display: "none",
    },
    "& .MuiSlider-markLabel": {
      display: "none",
      color: `${dark ? "#ffffff" : "#000000"}`,
      fontSize: "14px",
    },
  }));
  useEffect(() => {
    if (!token) return;
    OrderHistory(dispatch);
  }, []);
  useEffect(() => {
    if (!token) return;
    if (item?.pair_id) {
      buysellBalance(item?.pair_id, dispatch);
      openOrders(item?.pair_id, userData?.user_id, dispatch);
    }
  }, [item?.pair_id]);
  useEffect(() => {
    if (apiId != item?.api_id) {
      setApiId(item?.api_id);
      dispatch(setApiIds(item?.api_id));
    }
  }, [item?.pair_id]);

  useEffect(() => {
    dispatch(setCoinName(item?.coin_name));
    dispatch(setPriceDecimal(item?.price_decimal));
    dispatch(setQuantityDecimal(item?.quantity_decimal));
  }, [item?.pair_id]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setSuccessMsg({
  //       limitBuy: "",
  //       limitSell: "",
  //       marketSell: "",
  //       marketBuy: "",
  //       stopBuy: "",
  //       stopSell: "",
  //     });
  //   }, 5000);
  // }, [successMsg]);
  const marks = [
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];
  const buyObj = {
    order_type: "Limit",
    base_volume: formValues.limitAmount,
    quote_volume: "0",
    pair_id: item?.pair_id,
    // user_id: userData?.user_id,
    limit_price: String(formValues.limitPrice),
    device_type: deviceInfo?.device_type,
    device_info: deviceInfo?.device_info,
    api_id: apiId,
    source: deviceInfo?.source,
  };
  const SellObj = {
    order_type: "Limit",
    base_volume: formValues.sellAmount,
    pair_id: item?.pair_id,
    // user_id: userData?.user_id,
    limit_price: formValues.sellPrice,
    device_type: deviceInfo?.device_type,
    api_id: apiId,
    source: deviceInfo?.source,
    device_info: deviceInfo?.device_info,
  };
  const handleBuy = async () => {
    if (error.limitBuyErr) return;
    setLimitBuyLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-buy-order`,
        data: buyObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        setBuySliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          limitAmount: "",
        }));
        setError((prev) => ({
          ...prev,
          limitBuyErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          limitBuyErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      setLimitBuyLoading(false);
      buysellBalance(item?.pair_id, dispatch);
    }
  };
  const handleSell = async () => {
    if (error.limitSellErr) return;
    setLimitSellLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-sell-order`,
        data: SellObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        setSellSliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          sellAmount: "",
        }));
        setError((prev) => ({
          ...prev,
          limitSellErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          limitSellErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      setLimitSellLoading(false);
      buysellBalance(item?.pair_id, dispatch);
    }
  };
  const marketObj = {
    order_type: "Market",
    // base_volume: formValues.MarketBuy,
    pair_id: item?.pair_id,
    api_id: apiId,
    source: deviceInfo?.source,
    // user_id: userData?.user_id,
    quote_volume: formValues.MarketBuy,
    limit_price: 0,
    device_type: deviceInfo?.device_type,
    device_info: deviceInfo?.device_info,
  };
  const handleMarket = async () => {
    if (error.marketBuyErr) return;
    setMarketBuyLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-buy-order`,
        data: marketObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        // setSuccessMsg((prev) => ({
        //   ...prev,
        //   marketBuy: data?.message,
        // }));
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);

        setBuyMarketSliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          MarketBuy: "",
        }));
        setError((prev) => ({
          ...prev,
          marketBuyErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          marketBuyErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      buysellBalance(item?.pair_id, dispatch);

      setMarketBuyLoading(false);
    }
  };
  const marketSellObj = {
    order_type: "Market",
    base_volume: String(formValues.MarketSell),
    pair_id: String(item?.pair_id),
    api_id: String(apiId),
    source: deviceInfo?.source,
    limit_price: "0",
    device_type: deviceInfo?.device_type,
    device_info: deviceInfo?.device_info,
  };
  const handleMarketSell = async () => {
    if (error.marketSellErr) return;
    setMarketSellLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-sell-order`,
        data: marketSellObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        // setSuccessMsg((prev) => ({
        //   ...prev,
        //   marketSell: data?.message,
        // }));
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);

        setSellMarketSliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          MarketSell: "",
        }));
        setError((prev) => ({
          ...prev,
          marketSellErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          marketSellErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      setMarketSellLoading(false);
      buysellBalance(item?.pair_id, dispatch);
    }
  };
  const validateBuyAmount = (val, price, key) => {
    const value = val * price;
    const check = key?.toLowerCase().includes("sell");
    const check2 = check
      ? price * balance?.base_balance
      : balance?.quote_balance;

    if (val * price <= 10) {
      setError((prev) => ({
        ...prev,
        [key]:
          "Amount must be greater than 10 and less than or equal to 9000000",
      }));
    } else if (value > check2) {
      setError((prev) => ({ ...prev, [key]: "insufficient balance" }));
    } else {
      setError((prev) => ({ ...prev, [key]: "" }));
    }
  };
  const handleChange = (value, key, name, balance, err) => {
    const a = (balance / 100) * value;
    const b = a / formValues[key];

    const precision = item?.quantity_decimal || 0;
    const multiplier = Math.pow(10, precision);
    const floored = Math.floor(b * multiplier) / multiplier;

    setFormValues((prev) => {
      const updated = { ...prev, [name]: floored };
      validateBuyAmount(floored, updated.limitPrice, err);
      return updated;
    });
  };
  const validateSellAmount = (val, price, key) => {
    const check = key?.toLowerCase().includes("sell");
    const check2 = check
      ? price * balance?.base_balance
      : balance?.quote_balance;
    const value = val * price;
    if (val * price <= 10) {
      setError((prev) => ({
        ...prev,
        [key]:
          "Amount must be greater than 10 and less than or equal to 9000000",
      }));
    } else if (value > check2) {
      setError((prev) => ({ ...prev, [key]: "insufficient balance" }));
    } else {
      setError((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSellSlider = (value, name, balance, key) => {
    const a = (balance / 100) * value;
    const precision = item?.quantity_decimal || 0;
    const multiplier = Math.pow(10, precision);
    const floored = Math.floor(a * multiplier) / multiplier;
    setFormValues((prev) => {
      const updated = { ...prev, [name]: floored };
      validateSellAmount(
        floored,
        name === "MarketBuy" ? 1 : updated.sellPrice,
        key
      );
      return updated;
    });
  };
  const StopBuyObj = {
    order_type: "Stop Limit",
    base_volume: formValues.stopBuyAmount,
    pair_id: item?.pair_id,
    api_id: apiId,
    source: deviceInfo?.source,
    quote_volume: 0,
    limit_price: formValues.stopBuyLimit,
    stop_price: formValues.stopBuyStop,
    device_type: deviceInfo?.device_type,
    device_info: deviceInfo?.device_info,
  };
  const StopSellObj = {
    order_type: "Stop Limit",
    base_volume: String(formValues.stopSellAmount),
    api_id: String(apiId),
    pair_id: String(item?.pair_id),
    quote_volume: 0,
    source: deviceInfo?.source,
    limit_price: String(formValues.stopSellLimit),
    stop_price: String(formValues.stopSellStop),
    device_type: deviceInfo?.device_type,
    device_info: deviceInfo?.device_info,
  };
  const handleStopBuy = async () => {
    if (error.stopBuyErr) return;
    if (formValues.stopBuyStop <= 0) {
      setError((prev) => ({
        ...prev,
        stopBuyErr: "Stop Limit is requried",
      }));
      return;
    }
    setStopBuyLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-buy-stop-limit`,
        data: StopBuyObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        buysellBalance(item?.pair_id, dispatch);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        setBuyStopSliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          stopBuyAmount: "",
          stopBuyStop: "",
        }));
        setError((prev) => ({
          ...prev,
          stopBuyErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          stopBuyErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      setStopBuyLoading(false);
    }
  };

  const handleStopSell = async () => {
    if (error.stopSellErr) return;
    if (formValues.stopSellStop <= 0) {
      setError((prev) => ({
        ...prev,
        stopSellErr: "Stop Limit is requried",
      }));
      return;
    }
    setStopSellLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/order/user/place-sell-stop-limit`,
        data: StopSellObj,
      });
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        buysellBalance(item?.pair_id, dispatch);
        openOrders(item?.pair_id, userData?.user_id, dispatch);
        OrderHistory(dispatch);
        setSellSliderValue(0);
        setFormValues((prev) => ({
          ...prev,
          stopSellAmount: "",
          stopSellStop: "",
        }));
        setError((prev) => ({
          ...prev,
          stopSellErr:
            "Amount must be greater than 10 and less than or equal to 9000000",
        }));
      }
      if (data?.status != 1) {
        showError(data?.message);
        setError((prev) => ({
          ...prev,
          stopSellErr: data?.message,
        }));
      }
    } catch (err) {
      showError(err);
      console.error("Failed to fetch second API", err);
    } finally {
      setStopSellLoading(false);
    }
  };
  const handleNavigate = () => {
    if (!userData?.token) {
      navigate("/login");
    }
  };

  return (
    <div
      className={` ${
        open ? "h-[28.7rem]" : "h-[25.2rem]"
      } w-full     rounded-lg  ${dark ? "bg-[#181A20]" : "bg-white"}`}
    >
      {/* <div
          className={` ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } border-b-1`}
        >
          <div className=" flex text-[12px] p-2 w-[50%]">
            {tab.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex-1 text-center py-2 font-medium transition-colors cursor-pointer duration-300 ${
                  dark
                    ? active === tab
                      ? "text-yellow-500 border-b-2  bg-[#181A20]"
                      : "text-gray-600 hover:text-yellow-500 bg-[#181A20] border-[50%]"
                    : active === tab
                    ? "text-yellow-500 border-b-2 bg-white border-[50%]"
                    : "text-gray-600 hover:text-yellow-500 bg-zinc-100 border-[50%]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div> */}
      <div className=" flex text-[16px] p-0 w-[50%]">
        {marketTabs.map((tab) => (
          <button
            key={tab}
            name="item"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 font-medium  cursor-pointer ${
              dark
                ? activeTab === tab
                  ? "text-[#EAECEF] bg-[#181A20]"
                  : "text-[#848E9C]  bg-[#181A20] border-[50%]"
                : activeTab === tab
                ? "text-[#202630]  bg-white border-[50%]"
                : "text-[#707A8A]   border-[50%]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Limit" && (
        <div
          className={`flex sm:flex-row justify-center w-full  gap-3 flex-col items-center  `}
        >
          <div className={`w-[50%]   ${open ? "space-y-6" : "space-y-2"}`}>
            <div className="p-[5px] flex flex-col gap-2">
              <CryptoInput
                label="Price"
                unit="USDT"
                // step={0.01}
                defaultValue={currentPrice}
                value={formValues.limitPrice}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, limitPrice: val }));
                }}
                dark={dark}
                disable={limitBuyLoading}
                decimalQuantity={item?.price_decimal}
                searchQuery={searchQuery}
              />
              <CryptoInput
                label="Amount"
                unit={item?.pair_symbol
                  ?.toLowerCase()
                  .split("usdt")[0]
                  .toUpperCase()}
                step={0.01}
                disable={limitBuyLoading}
                value={formValues.limitAmount}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, limitAmount: val }));
                  validateBuyAmount(val, formValues.limitPrice, "limitBuyErr");
                  // if (val * formValues.limitPrice < 10) {
                  //   setError((prev) => ({
                  //     ...prev,
                  //     limitBuyErr:
                  //       "Amount must be greater than 10 and less than or equal to 9000000",
                  //   }));
                  // } else {
                  //   setError((prev) => ({ ...prev, limitBuyErr: "" }));
                  // }
                }}
                decimalQuantity={item?.quantity_decimal}
                dark={dark}
              />
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  color: "white",
                  position: "relative",
                }}
              >
                <RenderLabel childern={buySliderValue} dark={dark} />
                <CustomSlider
                  marks={marks}
                  value={buySliderValue}
                  min={0}
                  max={100}
                  step={null}
                  disabled={!userData?.token || limitBuyLoading}
                  onChange={(e, newValue) => {
                    setBuySliderValue(newValue);
                    handleChange(
                      newValue,
                      "limitPrice",
                      "limitAmount",
                      balance?.quote_balance ? balance?.quote_balance : 0,
                      "limitBuyErr"
                    );
                  }}
                />
              </Box>
            </Box>
            <div className="h-[3rem]">
              {error.limitBuyErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.limitBuyErr}
                </div>
              )}
              {successMsg.limitBuy && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.limitBuy}
                </div>
              )}
            </div>
            {/* <div className="flex items-center space-x-2 p-2 ">
              <input
                id="tp-sl"
                type="checkbox"
                className="accent-amber-400 cursor-pointer"
              />
              <label htmlFor="tp-sl" className="text-gray-300 text-[16px]">
                TP/SL
              </label>
            </div> */}

            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-gray-400">Avbl</div>
                <span className="">
                  {parseFloat(
                    balance?.quote_balance ? balance?.quote_balance : 0
                  ).toString()}{" "}
                  USDT
                </span>
              </div>
              {/* <div className="flex justify-between">
                  <div className="underline  text-gray-400">Max Buy</div>

                  <div> --BTC</div>
                </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                name="market-buy"
                disabled={limitBuyLoading}
                onClick={() => {
                  userData?.token ? handleBuy() : handleNavigate();
                }}
                className={`w-[100%] 
                  bg-[#2EBD85] hover:bg-[#0e9e67]    m-2 py-2 rounded-md h-[3rem] text-[16px] font-semibold cursor-pointer`}
              >
                {userData?.token ? "Buy" : " Log In"}
              </button>
            </div>
          </div>
          <div
            className={`w-[50%]  transition-all duration-500 delay-100 ${
              open ? "space-y-6" : "space-y-2"
            } `}
          >
            <div
              style={{ padding: "5px", maxWidth: "100%" }}
              className=" flex flex-col gap-2"
            >
              <CryptoInput
                label="Price"
                unit="USDT"
                searchQuery={searchQuery}
                step={0.01}
                disable={limitSellLoading}
                dark={dark}
                value={formValues.sellPrice}
                onChange={(val) =>
                  setFormValues((prev) => ({ ...prev, sellPrice: val }))
                }
                defaultValue={currentPrice}
                decimalQuantity={item?.price_decimal}
              />
              <CryptoInput
                label="Amount"
                unit={
                  item?.pair_symbol
                    ? item.pair_symbol
                        .toLowerCase()
                        .split("usdt")[0]
                        .toUpperCase()
                    : ""
                }
                step={0.01}
                disable={limitSellLoading}
                dark={dark}
                value={formValues.sellAmount}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, sellAmount: val }));
                  validateSellAmount(val, formValues.sellPrice, "limitSellErr");
                }}
                decimalQuantity={item?.quantity_decimal}
              />
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  position: "relative",
                }}
              >
                <RenderLabel childern={sellSliderValue} dark={dark} />
                <CustomSlider
                  value={sellSliderValue}
                  marks={marks}
                  disabled={!userData?.token || limitSellLoading}
                  min={0}
                  max={100}
                  onChange={(e, newValue) => {
                    setSellSliderValue(newValue);
                    handleSellSlider(
                      newValue,
                      "sellAmount",
                      balance?.base_balance ? balance?.base_balance : 0,
                      "limitSellErr"
                    );
                  }}
                  step={null}
                />
              </Box>
            </Box>
            <div className="h-[3rem]">
              {error.limitSellErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.limitSellErr}
                </div>
              )}
              {successMsg.limitSell && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.limitSell}
                </div>
              )}
            </div>
            {/* <div className="flex items-center space-x-2 p-2 ">
              <input
                id="tp-sl"
                type="checkbox"
                className="accent-amber-400 cursor-pointer"
              />
              <label htmlFor="tp-sl" className="text-gray-300 text-[16px]">
                TP/SL
              </label>
            </div> */}
            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-gray-400">Avbl</div>
                <div>
                  {" "}
                  {parseFloat(
                    balance?.base_balance ? balance?.base_balance : 0
                  ).toString()}{" "}
                  {item?.pair_symbol
                    ? item.pair_symbol
                        .toLowerCase()
                        .split("usdt")[0]
                        .toUpperCase()
                    : ""}
                </div>
              </div>
              {/* <div className="flex justify-between">
                  <div className="underline  text-gray-400">Max Buy</div>

                  <div>--USDT</div>
                </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                name="market-sell"
                disabled={limitSellLoading}
                onClick={() => {
                  userData?.token ? handleSell() : handleNavigate();
                }}
                className={`w-[100%] 
                   bg-[#F6465D] hover:bg-[#c74052]  cursor-pointer  h-[3rem]  py-2 m-2 rounded-md text-[16px] font-semibold`}
              >
                {userData?.token ? "Sell" : " Log In"}
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Market" && (
        <div
          className={`flex sm:flex-row justify-center w-full transition-all duration-500 delay-100  gap-3 flex-col items-center  `}
        >
          <div
            className={`w-full  transition-all duration-500 delay-1000 ${
              open ? "space-y-6" : "space-y-2"
            }`}
          >
            <div className="p-[5px]">
              <div
                className={`w-full ${
                  dark ? "bg-[#2B3139]" : "bg-white"
                }  h-[45px] rounded-[8px] text-[#848E9C] mt-2 mb-2`}
              >
                {" "}
                <div className="w-full h-full flex justify-between items-center p-3">
                  <div>Price</div>
                  <div>Market Price</div>
                </div>
              </div>
              <MarketInput
                label="Amount"
                item={item}
                disable={marketBuyLoading}
                unit={item?.quote_asset_symbol}
                // step={0.01}
                decimalQuantity={item?.quantity_decimal + item?.price_decimal}
                dark={dark}
                value={formValues.MarketBuy}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, MarketBuy: val }));
                  validateSellAmount(val, 1, "marketBuyErr");
                }}
              />
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  color: "white",
                  position: "relative",
                }}
              >
                <RenderLabel childern={buyMarketSliderValue} dark={dark} />
                <CustomSlider
                  value={buyMarketSliderValue}
                  marks={marks}
                  min={0}
                  disabled={!userData?.token || marketBuyLoading}
                  max={100}
                  onChange={(e, newValue) => {
                    setBuyMarketSliderValue(newValue);
                    handleSellSlider(
                      newValue,
                      "MarketBuy",
                      balance?.quote_balance ? balance?.quote_balance : 0,
                      "marketBuyErr"
                    );
                  }}
                  step={null}
                />
              </Box>
            </Box>
            <div className="h-[3rem]">
              {error.marketBuyErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.marketBuyErr}
                </div>
              )}
              {successMsg.marketBuy && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.marketBuy}
                </div>
              )}
            </div>
            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-[#848E9C]">Avbl</div>
                <span className="">
                  {parseFloat(
                    balance?.quote_balance ? balance?.quote_balance : 0
                  ).toString()}{" "}
                  USDT
                </span>
              </div>
              {/* <div className="flex justify-between">
                  <div className="underline  text-[#848E9C]">Max Buy</div>

                  <div> --BTC</div>
                </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                name="limit-buy"
                disabled={marketBuyLoading}
                onClick={() => {
                  userData?.token ? handleMarket() : handleNavigate();
                }}
                className={`w-[100%] 
                bg-[#2EBD85] hover:bg-[#0e9e67]   m-2 py-2 rounded-md h-[3rem] text-[16px] font-semibold cursor-pointer`}
              >
                {userData?.token ? "Buy" : " Log In"}
              </button>
            </div>
          </div>
          <div
            // className={`${
            //   dark
            //     ? "bg-[#111] text-white border-gray-700"
            //     : "bg-zinc-50 text-black border-gray-200"
            // }   border  space-y-2 w-full  text-xl`}
            // id="a"
            className={`w-full  transition-all duration-500 delay-100 ${
              open ? "space-y-6" : "space-y-2"
            } `}
          >
            <div style={{ padding: "5px", maxWidth: "100%" }}>
              <div
                className={`w-full ${
                  dark ? "bg-[#2B3139]" : "bg-white"
                }  h-[45px] rounded-[8px] text-[#848E9C] mt-2 mb-2`}
              >
                {" "}
                <div className="w-full h-full flex justify-between items-center p-3">
                  <div>Price</div>
                  <div>Market Price</div>
                </div>
              </div>
              <MarketInput
                label="Amount"
                dark={dark}
                disable={marketSellLoading}
                item={item}
                unit={item?.base_asset_symbol}
                decimalQuantity={item?.quantity_decimal}
                value={formValues.MarketSell}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, MarketSell: val }));
                  validateSellAmount(
                    val,
                    formValues.sellPrice,
                    "marketSellErr"
                  );
                }}
              />
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  position: "relative",
                }}
              >
                <RenderLabel childern={sellMarketSliderValue} dark={dark} />
                <CustomSlider
                  value={sellMarketSliderValue}
                  marks={marks}
                  disabled={!userData?.token || marketSellLoading}
                  min={0}
                  max={100}
                  step={null}
                  onChange={(e, newValue) => {
                    setSellMarketSliderValue(newValue);
                    handleSellSlider(
                      newValue,
                      "MarketSell",
                      balance?.base_balance ? balance?.base_balance : 0,
                      "marketSellErr"
                    );
                  }}
                />
              </Box>
            </Box>
            <div className="h-[3rem]">
              {error.marketSellErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.marketSellErr}
                </div>
              )}
              {successMsg.marketSell && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.marketSell}
                </div>
              )}
            </div>
            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-gray-400">Avbl</div>
                <div>
                  {" "}
                  {parseFloat(
                    balance?.base_balance ? balance?.base_balance : 0
                  ).toString()}{" "}
                  {item?.pair_symbol
                    ? item.pair_symbol
                        .toLowerCase()
                        .split("usdt")[0]
                        .toUpperCase()
                    : ""}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                name="limit-sell"
                disabled={marketSellLoading}
                onClick={() => {
                  userData?.token ? handleMarketSell() : handleNavigate();
                }}
                className={`w-[100%]
       
                    bg-[#F6465D] hover:bg-[#c74052]
                  cursor-pointer  h-[3rem]  py-2 m-2 rounded-md text-[16px] font-semibold`}
              >
                {userData?.token ? "Sell" : " Log In"}
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Stop Limit" && (
        <div
          className={`flex sm:flex-row justify-center transition-all duration-500 delay-100 w-full  gap-3 flex-col items-center  `}
        >
          <div
            className={`w-full  transition-all duration-500 delay-1000 ${
              open ? "space-y-3" : "space-y-0"
            }`}
          >
            <div className="p-[5px] flex flex-col gap-2">
              <CryptoInput
                label="Stop"
                unit="USDT"
                step={0.01}
                disable={stopBuyLoading}
                dark={dark}
                decimalQuantity={item?.price_decimal}
                searchQuery={searchQuery}
                defaultValue={currentPrice}
                value={formValues.stopBuyStop}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopBuyStop: val }));
                }}
              />
              <CryptoInput
                label="Limit"
                unit="USDT"
                disable={stopBuyLoading}
                step={0.01}
                defaultValue={currentPrice}
                dark={dark}
                decimalQuantity={item?.price_decimal}
                searchQuery={searchQuery}
                value={formValues.stopBuyLimit}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopBuyLimit: val }));
                }}
              />
              <CryptoInput
                label="Amount"
                step={0.01}
                decimalQuantity={item?.quantity_decimal}
                dark={dark}
                disable={stopBuyLoading}
                unit={item?.pair_symbol
                  .toLowerCase()
                  .split("usdt")[0]
                  .toUpperCase()}
                value={formValues.stopBuyAmount}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopBuyAmount: val }));
                  validateBuyAmount(val, formValues.stopBuyLimit, "stopBuyErr");
                }}
              />
            </div>
            <div className="h-[3rem]">
              {error.stopBuyErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.stopBuyErr}
                </div>
              )}
              {successMsg.stopBuy && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.stopBuy}
                </div>
              )}
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  color: "white",
                  position: "relative",
                }}
              >
                <RenderLabel childern={buyStopSliderValue} dark={dark} />
                <CustomSlider
                  value={buyStopSliderValue}
                  marks={marks}
                  min={0}
                  disabled={!userData?.token || stopBuyLoading}
                  max={100}
                  step={null}
                  onChange={(e, newValue) => {
                    setBuyStopSliderValue(newValue);
                    handleChange(
                      newValue,
                      "stopBuyLimit",
                      "stopBuyAmount",
                      balance?.quote_balance ? balance?.quote_balance : 0,
                      "stopBuyErr"
                    );
                  }}
                />
              </Box>
            </Box>

            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-gray-400">Avbl</div>
                <span className="">
                  {parseFloat(
                    balance?.quote_balance ? balance?.quote_balance : 0
                  ).toString()}{" "}
                  USDT
                </span>
              </div>
              {/* <div className="flex justify-between">
                  <div className="underline  text-gray-400">Max Buy</div>

                  <div> --BTC</div>
                </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                name="stop-buy"
                disabled={stopBuyLoading}
                onClick={() => {
                  userData?.token ? handleStopBuy() : handleNavigate();
                }}
                className={`w-[100%] 
                     bg-[#2EBD85] hover:bg-[#0e9e67]
                     m-2 py-2 rounded-md h-[3rem] text-[16px] font-semibold cursor-pointer`}
              >
                {userData?.token ? "Buy" : " Log In"}
              </button>
            </div>
          </div>
          <div
            className={`w-full  transition-all duration-500 delay-100 ${
              open ? "space-y-3" : "space-y-0"
            } `}
          >
            <div
              style={{ padding: "5px", maxWidth: "100%" }}
              className=" flex flex-col gap-2"
            >
              <CryptoInput
                label="Stop"
                unit="USDT"
                searchQuery={searchQuery}
                step={0.01}
                disable={stopSellLoading}
                dark={dark}
                decimalQuantity={item?.price_decimal}
                value={formValues.stopSellStop}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopSellStop: val }));
                }}
              />
              <CryptoInput
                label="Limit"
                unit="USDT"
                searchQuery={searchQuery}
                step={0.01}
                dark={dark}
                disable={stopSellLoading}
                defaultValue={currentPrice}
                decimalQuantity={item?.price_decimal}
                value={formValues.stopSellLimit}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopSellLimit: val }));
                }}
              />
              <CryptoInput
                label="Amount"
                step={0.01}
                disable={stopSellLoading}
                dark={dark}
                decimalQuantity={item?.quantity_decimal}
                unit={item?.pair_symbol
                  .toLowerCase()
                  .split("usdt")[0]
                  .toUpperCase()}
                value={formValues.stopSellAmount}
                onChange={(val) => {
                  setFormValues((prev) => ({ ...prev, stopSellAmount: val }));
                  validateSellAmount(
                    val,
                    formValues.stopSellLimit,
                    "stopSellErr"
                  );
                }}
              />
            </div>
            <div className="h-[3rem]">
              {error.stopSellErr && (
                <div className="text-red-500 text-[13px] p-2 h-full">
                  {error.stopSellErr}
                </div>
              )}
              {successMsg.stopSell && (
                <div className="text-green-500 text-[13px] p-2 h-full">
                  {successMsg.stopSell}
                </div>
              )}
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "100%",
                  position: "relative",
                }}
              >
                <RenderLabel childern={sellStopSliderValue} dark={dark} />
                <CustomSlider
                  value={sellStopSliderValue}
                  marks={marks}
                  min={0}
                  disabled={!userData?.token || stopSellLoading}
                  step={null}
                  max={100}
                  onChange={(e, newValue) => {
                    setSellStopSliderValue(newValue);
                    handleSellSlider(
                      newValue,
                      "stopSellAmount",
                      balance?.base_balance ? balance?.base_balance : 0,
                      "stopSellErr"
                    );
                  }}
                />
              </Box>
            </Box>

            <div className="text-[16px] p-2">
              <div className="flex justify-between">
                <div className="flex justify-between text-gray-400">Avbl</div>
                <div>
                  {" "}
                  {parseFloat(
                    balance?.base_balance ? balance?.base_balance : 0
                  ).toString()}{" "}
                  {item?.pair_symbol
                    ? item.pair_symbol
                        .toLowerCase()
                        .split("usdt")[0]
                        .toUpperCase()
                    : ""}
                </div>
              </div>
              {/* <div className="flex justify-between">
                  <div className="underline  text-gray-400">Max Buy</div>

                  <div>--USDT</div>
                </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                name="stop-sell"
                className={`w-[100%]
                    bg-[#F6465D] hover:bg-[#c74052]
                 cursor-pointer  h-[3rem]  py-2 m-2 rounded-md text-[16px] font-semibold`}
                onClick={() => {
                  !userData?.token ? handleNavigate() : handleStopSell();
                }}
                disabled={stopSellLoading}
                style={{ background: error.stopSellErr && "[#e9d8da]" }}
              >
                {userData?.token ? "Sell" : " Log In"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
