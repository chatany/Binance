import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import ScrollableTabsBar from "../common/leftTab";
import { SearchData, Trades } from "./apiCall";
import { CiRepeat } from "react-icons/ci";
import { useSelector } from "react-redux";
export const MarketCom = ({
  dark,
  SetSearchQuery,
  searchQuery,
  symbol,
  setSearchParams,
}) => {
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
                  <tr>
                    <th className="text-center font-medium capitalize">pair</th>
                    <th className="capitalize text-end font-light">
                      lastPrice/vol
                    </th>
                    <th className="flex justify-center capitalize cursor-pointer">
                      <CiRepeat
                        className={`text-right ${
                          dark ? "text-[#EAECEF]" : "text-black "
                        }`}
                        onClick={handleToggle}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((item) => (
                    <tr
                      key={item?.pair_id}
                      onClick={() => {
                        setSearchParams({ symbol: item?.pair_symbol });
                      }}
                      className="cursor-pointer"
                    >
                      <td className="xl:text-[12px] text-[.6rem]  p-[3px] w-1/3 ">
                        <div className="flex gap-2 items-center">
                          <img
                            src={item?.coin_icon}
                            className="h-[14px] w-[14px] text-gray-100"
                          />{" "}
                          {`${item?.pair_symbol}`}
                        </div>
                      </td>
                      <td className="xl:text-[12px] text-[.6rem]  p-[2px] text-end w-1/3">
                        {item?.current_price}
                      </td>
                      <td
                        className={`  ${
                          item?.change_in_price > 0
                            ? `${!isVolume && "text-[#2EBD85]"}`
                            : `${!isVolume && "text-[#F6465D]"}`
                        } xl:text-[12px] text-[.6rem]  p-[2px] min-w-max text-center w-1/3`}
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
          <div
            className="flex flex-col items-center text-[14px] cursor-pointer gap-[2px]"
            onClick={() => setActiveTab("Market Trade")}
          >
            Markets Trade{" "}
            {activeTab === "Market Trade" && (
              <div className="border-[0.1rem] border-amber-400 w-[40%] h-[2px] "></div>
            )}
          </div>
          <div
            className="flex flex-col items-center text-[14px] cursor-pointer gap-[2px]"
            onClick={() => setActiveTab("My Trade")}
          >
            My Trade
            {activeTab === "My Trade" && (
              <div className="border-[0.1rem] border-amber-400 w-[50%] h-[2px] "></div>
            )}
          </div>
          <div className="text-white">
            <HiDotsHorizontal />
          </div>
        </div>
        {activeTab === "Market Trade" && (
          <div className="no-scrollbar h-[22rem] overflow-x-auto overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 p-1 sticky top-0 z-30 text-center`}
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
                    } text-[12px] text-gray-400 p-2 sticky top-0 text-center  z-30`}
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
                    const amounts = formatToKMB(amount);
                    return (
                      <tr key={inde}>
                        <td
                          className={`lg:text-[12px] ${
                            !item?.m ? "text-[#2EBD85]" : "text-[#F6465D]"
                          } text-[.6rem]  p-[2px] text-center w-1/3 `}
                        >
                          {price}
                        </td>
                        <td className="lg:text-[12px] text-[.6rem] p-[2px]  text-center w-1/3">
                          {amounts}
                        </td>
                        <td className="lg:text-[12px] text-[.6rem] text-center p-[2px] w-1/3">
                          {time}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "My Trade" && (
          <div className="no-scrollbar h-[22rem] overflow-x-auto overflow-y-auto">
            <div className="h-full w-full flex justify-center items-center">
              No Data Found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
