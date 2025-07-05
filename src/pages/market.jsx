import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import ScrollableTabsBar from "../common/leftTab";
import { SearchData, Trades } from "./apiCall";
export const MarketCom = ({ dark, SetSearchQuery, searchQuery, symbol }) => {
  const [searchData, setSearchData] = useState([]);
  const [tradesData, setTradesData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    Trades({ searchQuery, setTradesData });
  }, [searchQuery]);
  useEffect(() => {
    SearchData({ setSearchData });
  }, []);
  const filteredData = searchData.filter((item) =>
    item.pair_symbol?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full m-0">
      <div
        className={`${
          dark
            ? "bg-[#111] text-white border-gray-700"
            : "bg-zinc-50 text-black border-gray-200"
        } w-full  max-p-4  border  space-y-4 p-3`}
      >
        <div>
          <input
            className={`
    w-full capitalize rounded-lg
    h-[2rem] p-5 text-[1rem] text-gray-400
    border
    hover:border-[#b89c4f]
     border-[${dark ? `#474D57` : `#D8DCE1`}]
    focus:border-[${dark ? `#b89c4f` : `#fce788`}] 
    focus:outline-none 
     transition-colors duration-300 delay-200
    `}
            placeholder="search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex text-[12px]  flex-col justify-center items-center p-1">
          {/* USDT <div className="border-b-2 border-amber-400 w-[12px]"></div> */}
          <ScrollableTabsBar dark={dark} />
        </div>
        <div className="h-[23rem] overflow-x-auto overflow-y-auto">
          {filteredData?.length > 0 ? (
            <div>
              <table className="w-full">
                <thead>
                  <th>pair</th>
                  <th>lastPrice/vol</th>
                  <th></th>
                </thead>
                <tbody>
                  {filteredData?.map((item) => (
                    <tr
                      key={item?.pair_id}
                      onClick={() => {
                        SetSearchQuery(item?.pair_symbol);
                      }}
                      className="cursor-pointer"
                    >
                      <td className="xl:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                        <div className="flex gap-2 items-center">
                          <img
                            src={item?.coin_icon}
                            className="h-[14px] w-[14px] text-gray-100"
                          />{" "}
                          {`${item?.pair_symbol}`}
                        </div>
                      </td>
                      <td className="xl:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                        {item?.current_price}
                      </td>
                      <td
                        className={` ${
                          item?.change_in_price > 0
                            ? "text-[#2EBD85]"
                            : "text-[#F6465D]"
                        } xl:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] `}
                      >
                        {item?.change_in_price > 0 ? "+" : "   "}
                        {item?.change_in_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              No Data Found
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          dark
            ? "bg-[#111] text-white border-gray-700 "
            : "bg-zinc-50 border-gray-200 text-black "
        } overflow-x-auto overflow-y-auto w-full   p-3 border space-y-4 `}
      >
        <div className="w-full  flex  gap-2 justify-between pl-2 pr-2 pt-1">
          <div className="flex flex-col items-center text-[12px] gap-[2px]">
            Markets Trade{" "}
            <div className="border-[0.1rem] border-amber-400 w-[30%] h-[2px] "></div>
          </div>
          <div className="text-[12px]">My Trade</div>
          <div className="text-white">
            <HiDotsHorizontal />
          </div>
        </div>
        <div className="no-scrollbar h-[25rem] overflow-x-auto overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className={`${
                    dark ? "bg-black" : "bg-zinc-50"
                  } text-[12px] text-gray-400 p-1 sticky top-0 text-center  z-30`}
                >
                  Price (USDT)
                </th>
                <th
                  className={`${
                    dark ? "bg-black" : "bg-zinc-50"
                  } text-[12px] text-gray-400 p-1 sticky top-0 text-center  z-30`}
                >
                  Amount ({symbol})
                </th>
                <th
                  className={`${
                    dark ? "bg-black" : "bg-zinc-50"
                  } text-[12px] text-gray-400 p-2 sticky top-0 text-left  z-30`}
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {tradesData?.map((item, inde) => {
                const formatTime = (ms) => {
                  const date = new Date(ms);
                  return (
                    `${date.getHours().toString().padStart(2, "0")}:` +
                    `${date.getMinutes().toString().padStart(2, "0")}:` +
                    `${date.getSeconds().toString().padStart(2, "0")}`
                  );
                };
                const time = formatTime(item?.T);
                const price = parseFloat(item?.p).toString();
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
                const priceNum = formatToKMB(price);
                const amounts = formatToKMB(amount);
                return (
                  <tr key={inde}>
                    <td
                      className={`lg:text-[12px] ${
                        item?.m ? "text-[#2EBD85]" : "text-[#F6465D]"
                      } text-[.6rem] pl-1 pr-1 p-[4px] text-center `}
                    >
                      {priceNum}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px]  text-center">
                      {amounts}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px]">
                      {time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
