import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPrice, setRoundingVal } from "../store/webSocket";
import { formatDecimal, formatToKMBWithCommas } from "../Constant";
import { ScaleLoader } from "react-spinners";
import { Tooltip } from "@mui/material";
export const Order = () => {
  const { orderData, tikerData, rounding, priceDecimal,dark } =
    useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [showBuySellRatio, setShowBuySellRatio] = useState(true);
  const [orderBuySell, setOrderBuySell] = useState("");
  const [maxAmount, setMaxAmount] = useState(0);
  const [maxAmountBid, setMaxAmountBid] = useState(0);
  const [totalAmountBid, setTotalAmountBid] = useState(0);
  const [totalAmountAsks, setTotalAmountAsks] = useState(0);
  const handleRounding = (e) => {
    const val = e.target.checked;
    dispatch(setRoundingVal(val));
  };
  useEffect(() => {
    if (orderData?.bids && orderData.bids.length > 0) {
      const maxAmount = Math.max(
        ...orderData.bids.map((bid) => parseFloat(bid[1]))
      );
      setMaxAmountBid(maxAmount);
    }
    if (orderData?.asks && orderData.asks.length > 0) {
      const maxAmount = Math.max(
        ...orderData.asks.map((bid) => parseFloat(bid[1]))
      );
      setMaxAmount(maxAmount);
    }
    const totalBids = orderData?.bids?.reduce((sum, item) => {
      return sum + parseFloat(item[1]);
    }, 0);
    const totalAsks = orderData?.asks?.reduce((sum, item) => {
      return sum + parseFloat(item[1]);
    }, 0);
    const total = totalBids + totalAsks;

    const bidPercentage = (totalBids / total) * 100;
    const askPercentage = (totalAsks / total) * 100;
    setTotalAmountAsks(askPercentage);
    setTotalAmountBid(bidPercentage);
  }, [orderData]);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);
  const [priceColor, setPriceColor] = useState(false);
  const lastPriceRef = useRef(null);

  useEffect(() => {
    const currentPrice = parseFloat(tikerData?.lastPrice);

    if (!isNaN(currentPrice) && lastPriceRef.current !== null) {
      if (currentPrice > lastPriceRef.current) {
        setPriceColor(true);
      } else if (currentPrice < lastPriceRef.current) {
        setPriceColor(false);
      } else {
        setPriceColor(false);
      }
    }

    if (!isNaN(currentPrice)) {
      lastPriceRef.current = currentPrice;
    }
  }, [tikerData?.lastPrice]);
  const sum = orderData?.asks?.reduce(
    (acc, num) => Number(acc) + Number(num[0]),
    0
  );

  return (
    <div
      className={`w-full   flex ${
        dark ? `bg-[#181A20] text-white ` : "bg-white  text-black "
      } flex-col h-full overflow-hidden rounded-lg `}
    >
      <>
        <div
          className={`flex ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-b-1 p-3 items-center justify-between w-full h-fit`}
        >
          <div className="text-[1rem]">Order Book</div>
          <div className="relative cursor-pointer ">
            <HiDotsHorizontal onClick={() => setToggle(!toggle)} />
            {toggle && (
              <div
                className={`absolute top-6  z-50 h-fit w-fit rounded-[12px] text-[14px] ${
                  dark
                    ? "bg-[#1E2329] border-gray-700 text-white "
                    : "bg-white  text-black border-gray-200 "
                } right-0 p-4`}
                style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.10)" }}
                ref={popupRef}
                onMouseLeave={() => setToggle(!toggle)}
              >
                <div className={`w-[10rem] rounded-2xl   space-y-1`}>
                  <div>
                    <div className="opacity-50">Order Book display</div>
                    <div className="p-2">
                      <div className="min-w-max flex gap-2">
                        <input type="checkbox" /> Display Avg &Sum
                      </div>
                      <div className="flex gap-2 ">
                        <input
                          type="checkbox"
                          checked={showBuySellRatio}
                          onChange={(e) =>
                            setShowBuySellRatio(e.target.checked)
                          }
                        />
                        <div className="min-w-max"> Show Buy/Sell Ratio</div>
                      </div>
                      <div className="flex gap-2 ">
                        <input
                          type="checkbox"
                          checked={rounding}
                          onChange={handleRounding}
                        />{" "}
                        Rounding
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>Book Depth Visualization</div>
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="a" /> Amount
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="a" /> Cumulative
                    </div>
                  </div>
                  <div>Animations </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full h-fit p-2">
          <div className="flex text-[12px]">
            <div
              onClick={() => setOrderBuySell("")}
              className={`${
                orderBuySell !== "" ? "opacity-40" : ""
              } cursor-pointer`}
            >
              <Tooltip
                title="Order Book"
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: dark ? "#EAECEF" : "#000000",
                      color: dark ? "#0B0E11" : "#FAFAFA",
                    },
                  },
                  arrow: {
                    sx: {
                      color: dark ? "#EAECEF" : "#000000",
                    },
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.66663 2.66699L7.33329 2.66699L7.33329 7.33366L2.66663 7.33366L2.66663 2.66699Z"
                    fill="#F6465D"
                  ></path>
                  <path
                    d="M2.66663 8.66699L7.33329 8.66699L7.33329 13.3337L2.66663 13.3337L2.66663 8.66699Z"
                    fill="#2EBD85"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Tooltip>
            </div>
            <div
              onClick={() => {
                setOrderBuySell("Buy");
              }}
              className={`${
                orderBuySell !== "Buy" ? "opacity-40" : ""
              } cursor-pointer`}
            >
              <Tooltip
                title="Buy Order"
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: dark ? "#EAECEF" : "#000000",
                      color: dark ? "#0B0E11" : "#FAFAFA",
                    },
                  },
                  arrow: {
                    sx: {
                      color: dark ? "#EAECEF" : "#000000",
                    },
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g>
                    <path
                      d="M2.66663 2.66699L7.33329 2.66699L7.33329 13.3337L2.66663 13.3337L2.66663 2.66699Z"
                      fill="#2EBD85"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </Tooltip>
            </div>
            <div
              onClick={() => {
                setOrderBuySell("Sell");
              }}
              className={`${
                orderBuySell !== "Sell" ? "opacity-40" : ""
              } cursor-pointer`}
            >
              <Tooltip
                title="Sell Order"
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: dark ? "#EAECEF" : "#000000",
                      color: dark ? "#0B0E11" : "#FAFAFA",
                    },
                  },
                  arrow: {
                    sx: {
                      color: dark ? "#EAECEF" : "#000000",
                    },
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5"
                >
                  <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Tooltip>
            </div>
          </div>
          {/* <div className="text-[1rem]">
            <FaAngleDown className="h-6 w-6" />
          </div> */}
        </div>
      </>
      {orderBuySell === "" && (
        <>
          <div
            className={`${
              dark
                ? "bg-[#181A20] border-gray-700 text-white "
                : "bg-white  text-black border-gray-200 "
            }  h-[43%]   `}
          >
            <div
              className={`overflow-hidden p-2 h-full
              }`}
            >
              <table className="w-full p-2  space-y-4 h-full">
                <thead>
                  <tr>
                    <th className="text-[12px] text-gray-400 p-1  pr-1 text-left w-1/3">
                      Price(USDT)
                    </th>
                    <th className="text-[12px] text-gray-400 p-2 w-1/3 ">
                      Amount({tikerData?.symbol?.split("USDT")[0]})
                    </th>
                    <th className="text-[12px] text-gray-400 p-1  text-right w-1/3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.asks?.length > 0 ? (
                    <>
                      {orderData?.asks?.map((item, index) => {
                        const price = formatDecimal(item[0], priceDecimal);
                        const amount = parseFloat(item[1]).toString();
                        const total = parseFloat(price * amount).toString();
                        const formatToK = (num) => {
                          if (num >= 1000) {
                            return (num / 1000).toFixed(2) + "K";
                          } else {
                            return (num / 1).toFixed(3);
                          }
                        };
                        const totalAmount = formatToK(total);
                        const percentage = (amount / maxAmount) * 100;
                        return (
                          <tr
                            key={index}
                            onClick={() => {
                              dispatch(setCurrentPrice(price));
                            }}
                            className="cursor-pointer"
                          >
                            <td colSpan={3} className="p-0">
                              <div className="w-full flex relative h-full text-[.6rem] lg:text-[12px]">
                                {/* Red background part */}
                                <div
                                  className={`absolute top-0 right-0 h-full bg-[#F6465D] ${
                                    dark ? "opacity-25" : "opacity-10"
                                  }  z-0`}
                                  style={{ width: `${percentage}%` }}
                                ></div>

                                {/* Actual content */}
                                <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                                  <span className="text-[#F6465D] w-1/3 text-left">
                                    {formatToKMBWithCommas(price)}
                                  </span>
                                  <span className="w-1/3 text-center">
                                    {amount}
                                  </span>
                                  <span className="w-1/3 text-right">
                                    {rounding
                                      ? totalAmount
                                      : parseFloat(total).toFixed(4)}
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <div className="h-full w-full flex justify-center items-center">
                          <ScaleLoader color="#FCD535" />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className={` p-2  overflow-hidden h-[43%] space-y-4`}>
            {orderData?.bids?.length > 0 ? (
              <table className="w-full h-full">
                <thead className="w-full">
                  <tr>
                    <th
                      className={`text-[16px] ${
                        priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
                      }   w-1/3    gap-1`}
                    >
                      <div className="flex items-center gap-1">
                        {formatToKMBWithCommas(formatDecimal(tikerData?.lastPrice, priceDecimal))}
                        {priceColor ? (
                          <FaArrowUp className="text-[18px] text-[#2EBD85]" />
                        ) : (
                          <FaArrowDown className="text-[18px] text-[#F6465D] " />
                        )}
                      </div>
                    </th>
                    <th className="text-[14px]  text-gray-400 p-2 text-left w-1/3">
                      ${formatToKMBWithCommas(formatDecimal(tikerData?.lastPrice, priceDecimal))}
                    </th>
                    <th className="w-1/3">
                      <div className="flex  items-center justify-end w-full">
                        <FaAngleRight className=" text-[14px]" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.bids?.map((item, index) => {
                    const price = formatDecimal(item[0], priceDecimal);
                    const amount = parseFloat(item[1]).toString();
                    const total = parseFloat(price * amount);
                    const formatToK = (num) => {
                      if (num >= 1000) {
                        return (num / 1000).toFixed(2) + "K";
                      } else {
                        return num.toFixed(2);
                      }
                    };
                    const totalAmount = formatToK(total);
                    const percentage = (amount / maxAmountBid) * 100;
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          dispatch(setCurrentPrice(price));
                        }}
                        className="cursor-pointer p-0"
                      >
                        <td colSpan={3} className="p-0">
                          <div className="w-full flex relative h-full text-[.6rem] lg:text-[12px]">
                            {/* Red background part */}
                            <div
                              className={`absolute top-0 right-0 h-full bg-[#2EBD85]  z-0 ${
                                dark ? "opacity-25" : "opacity-10"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>

                            {/* Actual content */}
                            <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                              <span className="text-[#2EBD85] w-1/3 text-left">
                                {formatToKMBWithCommas(price) }
                              </span>
                              <span className="w-1/3 text-center">
                                {amount}
                              </span>
                              <span className="w-1/3 text-right">
                                {rounding
                                  ? totalAmount
                                  : parseFloat(total).toFixed(4)}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <ScaleLoader color="#FCD535" />
              </div>
            )}
          </div>
        </>
      )}
      {orderBuySell === "Sell" && (
        <div
          className={`${
            dark
              ? "bg-[#181A20] border-gray-700 text-white "
              : "bg-white  text-black border-gray-200 "
          }  h-[85%]   `}
        >
          <div
            className={`overflow-hidden p-2 h-full space-y-4`}
          >
            <table className="w-full p-2  space-y-4 h-full">
              <thead>
                <tr>
                  <th className="text-[12px] text-gray-400 p-1  pr-1 text-left w-1/3">
                    Price(USDT)
                  </th>
                  <th className="text-[12px] text-gray-400 p-2 w-1/3 ">
                    Amount({tikerData?.symbol?.split("USDT")[0]})
                  </th>
                  <th className="text-[12px] text-gray-400 p-1  text-right w-1/3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData?.asks?.map((item, index) => {
                  const price = formatDecimal(item[0], priceDecimal);
                  const amount = parseFloat(item[1]).toString();
                  const total = parseFloat(price * amount).toString();
                  const formatToK = (num) => {
                    if (num >= 1000) {
                      return (num / 1000).toFixed(2) + "K";
                    } else {
                      return (num / 1).toFixed(3);
                    }
                  };
                  const totalAmount = formatToK(total);
                  const percentage = (amount / maxAmount) * 100;
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        dispatch(setCurrentPrice(price));
                      }}
                      className="cursor-pointer"
                    >
                      <td colSpan={3} className="p-0">
                        <div className="w-full flex relative h-full text-[.6rem] lg:text-[12px]">
                          {/* Red background part */}
                          <div
                            className={`absolute top-0 right-0 h-full bg-[#F6465D] ${
                              dark ? "opacity-25" : "opacity-10"
                            }  z-0`}
                            style={{ width: `${percentage}%` }}
                          ></div>

                          {/* Actual content */}
                          <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                            <span className="text-[#F6465D] w-1/3 text-left">
                              {formatToKMBWithCommas(price)}
                            </span>
                            <span className="w-1/3 text-center">{amount}</span>
                            <span className="w-1/3 text-right">
                              {rounding ? totalAmount : total}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {orderBuySell === "Buy" && (
        <div className={` p-2  overflow-hidden h-[85%] space-y-4`}>
          <table className="w-full h-full">
            <thead className="w-full">
              <tr>
                <th className="text-[12px] text-gray-400 p-2  pr-2 text-left w-1/3">
                  Price(USDT)
                </th>
                <th className="text-[12px] text-gray-400 p-2 w-1/3">
                  Amount({tikerData?.symbol?.split("USDT")[0]})
                </th>
                <th className="text-[12px] text-gray-400 p-1  text-right w-1/3">
                  Total
                </th>
              </tr>
              <tr>
                <th
                  className={`text-[14px] ${
                    priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
                  }  p-1 flex items-center h-full   gap-1`}
                >
                  {formatToKMBWithCommas(formatDecimal(tikerData?.lastPrice, priceDecimal))}
                  {priceColor ? (
                    <FaArrowUp className="text-[18px] text-[#2EBD85]" />
                  ) : (
                    <FaArrowDown className="text-[18px] text-[#F6465D] " />
                  )}
                </th>
                <th className="text-[14px]  text-gray-400 p-2 text-center w-1/3">
                  ${formatToKMBWithCommas(formatDecimal(tikerData?.lastPrice, priceDecimal))}
                </th>
                <th className="flex  items-center justify-end w-full">
                  <FaAngleRight className=" text-[14px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.bids?.map((item, index) => {
                const price = formatDecimal(item[0], priceDecimal);
                const amount = parseFloat(item[1]).toString();
                const total = parseFloat(price * amount);
                const formatToK = (num) => {
                  if (num >= 1000) {
                    return (num / 1000).toFixed(2) + "K";
                  } else {
                    return num.toFixed(2);
                  }
                };
                const totalAmount = formatToK(total);
                const percentage = (amount / maxAmountBid) * 100;
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      dispatch(setCurrentPrice(price));
                    }}
                    className="cursor-pointer p-0"
                  >
                    <td colSpan={3} className="p-0">
                      <div className="w-full flex relative h-full text-[.6rem] lg:text-[12px]">
                        {/* Red background part */}
                        <div
                          className={`absolute top-0 right-0 h-full bg-[#2EBD85]  z-0 ${
                            dark ? "opacity-25" : "opacity-10"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>

                        {/* Actual content */}
                        <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                          <span className="text-[#2EBD85] w-1/3 text-left">
                            {formatToKMBWithCommas(price)}
                          </span>
                          <span className="w-1/3 text-center">{amount}</span>
                          <span className="w-1/3 text-right">
                            {rounding ? totalAmount : total}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showBuySellRatio && (
        <>
          {orderData?.asks?.length > 0 && (
            <div className="relative">
              <div
                className={`text-black ${
                  dark ? "text-white" : "text-black"
                } flex justify-between w-full text-[12px]`}
              >
                <div className="absolute right-3.5 top-0.5">
                  {parseFloat(totalAmountAsks).toFixed(2)}%
                </div>
                <div className="absolute left-3.5 top-0.5">
                  {parseFloat(totalAmountBid).toFixed(2)}%
                </div>
              </div>
              <div className="pt-2 pl-14 pr-14">
                <div className="w-full relative h-[4px] text-[.6rem] lg:text-[12px]">
                  <div
                    className="absolute top-0 right-0 h-full bg-[#F6465D] z-0"
                    style={{
                      width: `${totalAmountAsks}%`,
                      borderRadius: "0px 9px 9px 0px",
                    }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 h-full bg-[#2EBD85]  z-0 "
                    style={{
                      width: `${totalAmountBid}%`,
                      borderRadius: "9px 0px 0px 9px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
