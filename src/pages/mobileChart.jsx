import { useEffect, useState } from "react";
import { ChartEmbed } from "./chart";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { formatDecimal, formatToKMBWithCommas } from "../Constant";
import { setCurrentPrice } from "../store/webSocket";
import { BuyOrder, CommonOrder, SellOrder } from "../icons";

export const MobileChartBar = () => {
  const tab = ["Chart", "Order Book", "Trades"];
  const tikerData = useSelector((state) => state.counter.tikerData);
  const tradeData = useSelector((state) => state.counter.tradeData);
  const priceDecimal = useSelector((state) => state.counter.priceDecimal);
  const orderData = useSelector((state) => state.counter.orderData);
  const rounding = useSelector((state) => state.counter.rounding);
  const dark = useSelector((state) => state.counter.dark);
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const [activeTab, setActiveTab] = useState(tab[0]);
  const [maxAmount, setMaxAmount] = useState(0);
  const dispatch = useDispatch();
  const [maxAmountBid, setMaxAmountBid] = useState(0);
  const [totalAmountBid, setTotalAmountBid] = useState(0);
  const [totalAmountAsks, setTotalAmountAsks] = useState(0);
  const [orderBuySell, setOrderBuySell] = useState("");
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
  return (
    <div className="h-full">
      <div
        className={` ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-b-1`}
      >
        <div className="flex   gap-5 items-center text-[14px] leading-4  w-full font-medium p-1 pb-0 ">
          {tab.map((tab) => (
            <div className="flex flex-col gap-1" key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 font-medium transition-colors min-w-max cursor-pointer duration-300 ${
                  activeTab === tab
                    ? "text-[#2EDBAD]"
                    : "text-gray-600 hover:text-[#2EDBAD]"
                }`}
                name="items"
              >
                {tab}
              </button>
              {activeTab === tab && (
                <div className="flex justify-center w-full">
                  <div className="w-[30%] border-b-2 border-[#2EDBAD]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-full">
        {activeTab === tab[0] && (
          <div className="h-[400px] w-full">
            <ChartEmbed searchQuery={searchQuery} dark={dark} />
          </div>
        )}
        {activeTab === tab[2] && (
          <div className="no-scrollbar h-[79%]  custom-scroll overflow-y-auto p-[0px_8px_8px_8px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 p-1 sticky top-0 z-30 text-left`}
                  >
                    Price (USDT)
                  </th>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400  sticky top-0 min-w-max text-center  z-30`}
                  >
                    Amount ({tikerData?.symbol?.split("USDT")[0]})
                  </th>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 p-2 sticky top-0 text-center  z-30`}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tradeData) && tradeData?.length > 0 ? (
                  <>
                    {Array.isArray(tradeData) &&
                      tradeData?.map((item, inde) => {
                        const formatTime = (ms) => {
                          const date = new Date(ms);
                          return (
                            `${date.getHours().toString().padStart(2, "0")}:` +
                            `${date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}:` +
                            `${date.getSeconds().toString().padStart(2, "0")}`
                          );
                        };
                        const time = formatTime(item?.T);
                        const price = formatDecimal(item?.p, priceDecimal);
                        const amount = parseFloat(item?.q).toString();
                        const formatToKMB = (num) => {
                          if (num >= 1_000_000_000) {
                            return (num / 1_000_000_000).toFixed(2) + "B";
                          } else if (num >= 1_000_000) {
                            return (num / 1_000_000).toFixed(2) + "M";
                          } else if (num >= 1_000) {
                            return (num / 1_000).toFixed(2) + "K";
                          } else {
                            return (num / 1).toFixed(3);
                          }
                        };
                        const amounts = formatToKMB(amount);
                        return (
                          <tr key={inde}>
                            <td
                              className={`text-[12px] ${
                                !item?.m ? "text-[#2EBD85]" : "text-[#F6465D]"
                              }  pl-[8px] text-left w-1/3 `}
                            >
                              {formatToKMBWithCommas(price)}
                            </td>
                            <td className="text-[12px] p-[2px]  text-center w-1/3">
                              {amounts}
                            </td>
                            <td className="text-[12px] text-center p-[2px] w-1/3">
                              {time}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="h-[16rem] w-full flex justify-center items-center">
                        <ScaleLoader color="#FCD535" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === tab[1] && (
          <>
            <div className="w-full">
              <div className="flex p-2 justify-between w-full items-center">
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
                      <CommonOrder />
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
                      <BuyOrder />
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
                      <SellOrder />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            {orderBuySell === "Sell" && (
              <div className="h-[79%] no-scrollbar overflow-x-auto overflow-y-auto p-[0px_8px_8px_8px]">
                {orderData?.asks?.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th
                          className={`text-[12px] ${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } text-gray-400 text-left p-[6px_6px_6px_0px]  w-1/3 sticky top-0 z-30`}
                        >
                          Price(USDT)
                        </th>
                        <th
                          className={`text-[12px] text-gray-400  ${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } text-center w-1/3 pl-2  sticky top-0 z-30`}
                        >
                          Amount ({tikerData?.symbol?.split("USDT")[0]})
                        </th>
                        <th
                          className={`text-[12px] text-gray-400  text-right  sticky w-1/3 top-0 ${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } z-30`}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="p-3">
                      {orderData?.asks?.map((item, index) => {
                        const price = parseFloat(item[0]).toFixed(2);
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
                          >
                            <td colSpan={3} className="p-0">
                              <div className="w-full flex relative h-full text-[12px]">
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
                                  <span className="w-1/3 text-center text-[12px]">
                                    {amount}
                                  </span>
                                  <span className="w-1/3 text-right text-[12px]">
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
            )}
            {orderBuySell === "Buy" && (
              <div className="h-full">
                {orderData?.bids?.length > 0 ? (
                  <div className=" overflow-y-auto h-[79%] p-[0px_8px_8px_8px]">
                    <table className="w-full pb-2 ">
                      <thead className="w-full ">
                        <tr>
                          <th
                            className={`text-[12px] ${
                              dark ? "bg-[#181A20]" : "bg-white"
                            } text-gray-400  pr-2 text-left w-1/3  sticky top-0 z-30`}
                          >
                            Price(USDT)
                          </th>
                          <th
                            className={`text-[12px] text-gray-400 p-2 w-1/3  sticky top-0 ${
                              dark ? "bg-[#181A20]" : "bg-white"
                            } z-30`}
                          >
                            Amount({tikerData?.symbol?.split("USDT")[0]})
                          </th>
                          <th
                            className={`text-[12px] text-gray-400 p-1  text-right ${
                              dark ? "bg-[#181A20]" : "bg-white"
                            } w-1/3  sticky top-0 z-30`}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {orderData?.bids?.map((item, index) => {
                          const price = parseFloat(item[0]).toFixed(2);
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
                            >
                              <td colSpan={3} className="p-0">
                                <div className="w-full flex relative h-full text-[12px]">
                                  {/* Red background part */}
                                  <div
                                    className={`absolute top-0 right-0 h-full bg-[#2EBD85]  z-0 ${
                                      dark ? "opacity-25" : "opacity-10"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>

                                  {/* Actual content */}
                                  <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                                    <span className="text-[#2EBD85] w-1/3 text-left text-[12px]">
                                      {formatToKMBWithCommas(price)}
                                    </span>
                                    <span className="w-1/3 text-center text-[12px]">
                                      {amount}
                                    </span>
                                    <span className="w-1/3 text-right text-[12px]">
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
                  </div>
                ) : (
                  <div className="h-full w-full flex justify-center items-center">
                    <ScaleLoader color="#FCD535" />
                  </div>
                )}
              </div>
            )}
            {orderBuySell === "" && (
              <div className="w-full flex h-full ">
                <div className="h-full w-full">
                  {orderData?.bids?.length > 0 ? (
                    <div className=" overflow-y-auto h-[79%] p-[0px_8px_8px_8px]">
                      <table className="w-full pb-2 ">
                        <thead className="w-full ">
                          <tr>
                            <th
                              className={`text-[12px] ${
                                dark ? "bg-[#181A20]" : "bg-white"
                              } text-gray-400  pr-2 text-left w-1/3  sticky top-0 z-30`}
                            >
                              Price(USDT)
                            </th>
                            <th
                              className={`text-[12px] text-gray-400 p-2 w-1/3  sticky top-0 ${
                                dark ? "bg-[#181A20]" : "bg-white"
                              } z-30`}
                            >
                              Amount({tikerData?.symbol?.split("USDT")[0]})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {orderData?.bids?.map((item, index) => {
                            const price = parseFloat(item[0]).toFixed(2);
                            const amount = parseFloat(item[1]).toString();
                            const percentage = (amount / maxAmountBid) * 100;
                            return (
                              <tr
                                key={index}
                                onClick={() => {
                                  dispatch(setCurrentPrice(price));
                                }}
                              >
                                <td colSpan={2} className="p-0">
                                  <div className="w-full flex relative h-full text-[12px]">
                                    {/* Red background part */}
                                    <div
                                      className={`absolute top-0 right-0 h-full bg-[#2EBD85]  z-0 ${
                                        dark ? "opacity-25" : "opacity-10"
                                      }`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>

                                    {/* Actual content */}
                                    <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                                      <span className="text-[#2EBD85] w-1/3 text-left text-[12px]">
                                        {formatToKMBWithCommas(price)}
                                      </span>
                                      <span className="w-1/3 text-center text-[12px]">
                                        {amount}
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
                  ) : (
                    <div className="h-full w-full flex justify-center items-center">
                      <ScaleLoader color="#FCD535" />
                    </div>
                  )}
                </div>
                <div className="h-full w-full no-scrollbar overflow-x-auto overflow-y-auto p-[0px_8px_8px_8px]">
                  {orderData?.asks?.length > 0 ? (
                    <div className="overflow-y-auto h-[79%]">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th
                              className={`text-[12px] ${
                                dark ? "bg-[#181A20]" : "bg-white"
                              } text-gray-400 text-left p-[6px_6px_6px_0px]  w-1/3 sticky top-0 z-30`}
                            >
                              Price(USDT)
                            </th>
                            <th
                              className={`text-[12px] text-gray-400  ${
                                dark ? "bg-[#181A20]" : "bg-white"
                              } text-center w-1/3 pl-2  sticky top-0 z-30`}
                            >
                              Amount ({tikerData?.symbol?.split("USDT")[0]})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="p-3">
                          {orderData?.asks?.map((item, index) => {
                            const price = parseFloat(item[0]).toFixed(2);
                            const amount = parseFloat(item[1]).toString();
                            const percentage = (amount / maxAmount) * 100;
                            return (
                              <tr
                                key={index}
                                onClick={() => {
                                  dispatch(setCurrentPrice(price));
                                }}
                              >
                                <td colSpan={2} className="p-0">
                                  <div className="w-full flex relative h-full text-[12px]">
                                    {/* Red background part */}
                                    <div
                                      className={`absolute top-0 right-0 h-full bg-[#F6465D] ${
                                        dark ? "opacity-25" : "opacity-10"
                                      }  z-0`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>

                                    {/* Actual content */}
                                    <div className="flex w-full justify-between items-center px-[2px] relative z-10">
                                      <span className="text-[#F6465D] w-1/3 text-left text-[12px]">
                                        {formatToKMBWithCommas(price)}
                                      </span>
                                      <span className="w-1/3 text-center text-[12px]">
                                        {amount}
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
                  ) : (
                    <div className="h-full w-full flex justify-center items-center">
                      <ScaleLoader color="#FCD535" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
