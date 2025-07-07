import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Orders } from "./apiCall";
export const Order = ({ dark, searchQuery, symbol, lastPrice }) => {
  const [orderData, setOrderData] = useState(null);
  const [orderBuySell, setOrderBuySell] = useState("");
  useEffect(() => {
    Orders({ searchQuery, setOrderData });
  }, [searchQuery]);
  return (
    <div className="w-full  flex flex-col h-full overflow-hidden rounded-lg">
      <div
        className={`${
          dark
            ? "bg-[#181A20] border-gray-700 text-white "
            : "bg-white shadow-xl text-black border-gray-200 "
        }  h-[50%]   `}
      >
        <div
          className={`flex ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } border-b-1 p-3 items-center justify-between w-full h-fit`}
        >
          <div className="text-[1rem]">Order</div>
          <div>
            <HiDotsHorizontal />
          </div>
        </div>
        <div className="flex justify-between w-full h-fit p-2">
          <div className="flex text-[12px]">
            <div onClick={() => setOrderBuySell("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5"
              >
                <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div
              onClick={() => {
                setOrderBuySell("Buy");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5"
              >
                <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div
              onClick={() => {
                setOrderBuySell("Sell");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5"
              >
                <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="text-[1rem]">
            <FaAngleDown className="h-6 w-6" />
          </div>
        </div>
        <div
          className={`overflow-hidden p-4 ${
            orderBuySell === "Buy"
              ? "h-full"
              : ` ${orderBuySell === "Sell" ? "h-[0px]" : "h-[28.5rem]"}`
          }`}
        >
          <table className="w-full p-2  space-y-4 h-full">
            <thead>
              <tr>
                <th className="text-[12px] text-gray-400 p-1  pr-1 text-left">
                  Price(USDT)
                </th>
                <th className="text-[12px] text-gray-400 p-2 ">
                  Amount({symbol})
                </th>
                <th className="text-[12px] text-gray-400 p-1  text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.bids?.map((item, index) => {
                const price = parseFloat(item[0]).toString();
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

                return (
                  <tr key={index}>
                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-[#F6465D]">
                      {price}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] pl-10 p-[4px]">
                      {amount}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] pl-5 pr-1 text-right p-[4px]">
                      {totalAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`${
          dark ? `bg-[#181A20] text-white ` : "bg-white  text-black "
        } p-4  overflow-hidden h-[50%] space-y-4`}
      >
        <table className="w-full h-full">
          <thead className="w-full">
            {orderBuySell === "Sell" && (
              <tr>
                <th className="text-[12px] text-gray-400 p-2  pr-2 text-left">
                  Price(USDT)
                </th>
                <th className="text-[12px] text-gray-400 p-2 ">
                  Amount({symbol})
                </th>
                <th className="text-[12px] text-gray-400 p-1  text-right">
                  Total
                </th>
              </tr>
            )}
            <tr>
              <th className="text-[14px] text-[#F6465D] p-2 flex items-center text-center w-full ">
                {lastPrice}
              </th>
              <th className="text-[14px]  text-gray-400 p-2 text-center">
                ${lastPrice}
              </th>
              <th className="flex  items-center p-3 justify-end">
                <FaAngleRight className=" text-[12px] text-right" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData?.asks?.map((item, index) => {
              const price = parseFloat(item[0]).toString();
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
              return (
                <tr key={index}>
                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 text-[#2EBD85] p-[4px] text-left">
                    {price}
                  </td>
                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1  p-[4px] text-center">
                    {amount}
                  </td>
                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-right">
                    {totalAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
