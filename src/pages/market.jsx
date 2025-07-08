import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import ScrollableTabsBar from "../common/leftTab";
import { SearchData, Trades } from "./apiCall";
import { CiRepeat } from "react-icons/ci";
import { useSelector } from "react-redux";
export const MarketCom = ({ dark, SetSearchQuery, searchQuery, symbol }) => {
  const [searchData, setSearchData] = useState([]);
  const [activeTab, setActiveTab] = useState("Market Trade");
  // const [tradesData, setTradesData] = useState([]);
  const [isVolume, setIsVolume] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // useEffect(() => {
  //   Trades({ searchQuery, setTradesData });
  // }, [searchQuery]);
  useEffect(() => {
    SearchData({ setSearchData });
  }, []);
  const tradesData = useSelector((state) => state.counter.tradeData);
  const tikerData = useSelector((state) => state.counter.tikerData);
  const filteredData = searchData.filter((item) =>
    item.pair_symbol?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const handleToggle = () => {
    setIsVolume(!isVolume);
  };
  const formatToKMB = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + "K";
    } else {
      return (num / 1).toFixed(3);
    }
  };

  return (
    <div className="flex flex-col items-center w-full  gap-1">
      <div
        className={`${
          dark ? "bg-[#181A20] text-white " : "bg-white text-black "
        } w-full   rounded-lg `}
      >
        <div className="pt-5 pr-3 pl-3 pb-0">
          <input
            className={`
    w-full capitalize rounded-lg
    h-[1.5rem] p-4 text-[1rem] text-gray-400
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
        <div
          className={`flex text-[12px]  flex-col justify-center items-center pr-3 pl-3  border-b-1 ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          }`}
        >
          {/* USDT <div className="border-b-2 border-amber-400 w-[12px]"></div> */}
          <ScrollableTabsBar dark={dark} />
        </div>
        <div className="h-[20rem] overflow-x-auto overflow-y-auto p-2">
          {filteredData?.length > 0 ? (
            <div>
              <table className="w-full">
                <thead
                  className={`${
                    dark ? "text-[#EAECEF]" : "text-black"
                  } text-[14px]`}
                >
                  <th className="text-left pl-2  font-medium capitalize">
                    pair
                  </th>
                  <th className="capitalize text-left">lastPrice/vol</th>
                  <th className="flex justify-center capitalize cursor-pointer">
                    <CiRepeat
                      className={`text-right ${
                        dark ? "text-[#EAECEF]" : "text-black "
                      }`}
                      onClick={handleToggle}
                    />
                  </th>
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
                        className={`  ${
                          item?.change_in_price > 0
                            ? `${!isVolume && "text-[#2EBD85]"}`
                            : `${!isVolume && "text-[#F6465D]"}`
                        } xl:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] min-w-max text-center `}
                      >
                        {!isVolume && item?.change_in_price > 0 ? "+" : "   "}
                        {!isVolume
                          ? item?.change_in_price
                          : formatToKMB(item?.volume)}
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
          dark ? "bg-[#181A20] text-white " : "bg-white text-black "
        } overflow-x-auto overflow-y-auto w-full rounded-lg    space-y-4 `}
      >
        <div
          className={`w-full  flex  gap-2 ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } justify-between border-b-1 p-3`}
        >
          <div className="flex flex-col items-center text-[14px] gap-[2px]">
            Markets Trade{" "}
            <div className="border-[0.1rem] border-amber-400 w-[30%] h-[2px] "></div>
          </div>
          <div className="text-[14px]">My Trade</div>
          <div className="text-white">
            <HiDotsHorizontal />
          </div>
        </div>
        <div className="no-scrollbar h-[22rem] overflow-x-auto overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className={`${
                    dark ? "bg-[#181A20]" : "bg-white"
                  } text-[12px] text-gray-400 p-1 sticky top-0 text-center  z-30`}
                >
                  Price (USDT)
                </th>
                <th
                  className={`${
                    dark ? "bg-[#181A20]" : "bg-white"
                  } text-[12px] text-gray-400 p-1 sticky top-0 text-center  z-30`}
                >
                  Amount ({tikerData?.symbol?.split("USDT")[0]})
                </th>
                <th
                  className={`${
                    dark ? "bg-[#181A20]" : "bg-white"
                  } text-[12px] text-gray-400 p-2 sticky top-0 text-left  z-30`}
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tradesData) &&
                tradesData?.map((item, inde) => {
                  const formatTime = (ms) => {
                    const date = new Date(ms);
                    return (
                      `${date.getHours().toString().padStart(2, "0")}:` +
                      `${date.getMinutes().toString().padStart(2, "0")}:` +
                      `${date.getSeconds().toString().padStart(2, "0")}`
                    );
                  };
                  const time = formatTime(item?.T);
                  const price = parseFloat(item?.p).toFixed(2);
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
                          !item?.m ? "text-[#2EBD85]" : "text-[#F6465D]"
                        } text-[.6rem] pl-1 pr-1 p-[4px] text-center `}
                      >
                        {price}
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
