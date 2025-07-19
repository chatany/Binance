import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../store/webSocket";
import { TopMoves } from "./apiCall";

const TopMovers = ({ dark, SetSearchQuery,setSearchParams }) => {
  const tabs = ["All", "Hot", "Losers", "24h Vol", "Gainers"];
  const open = useSelector((state) => state.counter.open);
  const { allMovers, movers } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const tabRef = useRef(null);
  const handleOpen = () => {
    dispatch(setOpen(!open));
  };
  const scrollTabs = (offset) => {
    tabRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const filteredData = () => {
    return activeTab !== "All" ? movers[activeTab] : allMovers;
  };

  return (
    <div
      className={`${
        open ? "h-[25rem]" : "h-[20rem]"
      } transition-all duration-500 delay-100   rounded-lg w-full   overflow-hidden`}
    >
      <div
        className={`flex  ${
          dark ? "border-[#2B3139]" : "border-[#EAECEF]"
        } border-b-1 w-full justify-between items-center mb-3 p-2`}
      >
        <div className="flex justify-between items-center gap-3">
          <h2 className="text-[14px] font-semibold">Top Movers</h2>
          <a href="#" className="text-xs text-gray-400 hover:underline">
            FAQ
          </a>
        </div>
        <RiArrowUpDoubleLine
          onClick={handleOpen}
          className={`${open ? "transition-transform rotate-180" : ""} h-6 w-6`}
        />
      </div>

      {/* Tabs with scroll */}
      <div className="flex items-center mb-4 p-2">
        <button
          onClick={() => scrollTabs(-100)}
          className=" rounded-full cursor-pointer   mr-2"
        >
          <FaChevronLeft size={12} />
        </button>
        <div
          ref={tabRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1 px-3 rounded-md text-xs whitespace-nowrap cursor-pointer
                ${
                  activeTab === tab
                    ? "bg-[#EAECEF] text-[#202630]"
                    : "text-[#707A8A]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTabs(100)}
          className=" rounded-full cursor-pointer   ml-2"
        >
          <FaChevronRight size={12} />
        </button>
      </div>

      {/* Movers List */}
      <div className={`space-y-2 overflow-y-auto ${open ?"max-h-[18rem]" :"max-h-[13rem]"} no-scrollbar`}>
        {filteredData()?.map((mover,index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer `}
            onClick={() => {
              setSearchParams({ symbol: mover?.pair_symbol });
            }}
          >
            <div className="flex gap-3 items-center justify-between">
              <div>
                <img src={mover?.coin_icon} className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium text-xs">{mover?.pair_symbol}</div>
                <div className="text-xs text-gray-400">{mover?.volume}</div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div>
                <div className="text-xs text-gray-400">
                  ${mover?.current_price}
                </div>
              </div>
              <div
                className={`font-semibold text-[12px] p-1 rounded-md 
                ${
                  mover?.change_in_price > 0 && activeTab !== "Losers"
                    ? "text-white bg-green-700"
                    : "text-white bg-red-700"
                }`}
              >
                {mover?.change_in_price > 0 && activeTab !== "Losers"
                  ? "+"
                  : " "}
                {mover?.change_in_price}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
