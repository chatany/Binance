import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopMovers = () => {
  const tabs = ["All", "Change", "New High/Low", "Fluctuation"];
  const [activeTab, setActiveTab] = useState("All");
  const tabRef = useRef(null);
  const moversData = [
    { pair: "FIDA/USDT", change: 3.21, time: "16:38:55", trend: "5min Rise" },
    { pair: "GUNJ/USDT", change: 10.18, time: "16:35:28", trend: "2Hr Rise" },
    { pair: "OMNI/USDT", change: -3.36, time: "16:31:07", trend: "5min Fall" },
    { pair: "SKL/USDT", change: -3.27, time: "16:30:02", trend: "5min Fall" },
    { pair: "ADA/USDT", change: 1.12, time: "16:29:44", trend: "10min Rise" },
    { pair: "BTC/USDT", change: -0.87, time: "16:28:19", trend: "15min Fall" },
  ];
  const scrollTabs = (offset) => {
    tabRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Filtered movers example (just as a placeholder)
  const filteredMovers =
    activeTab === "All" ? moversData : moversData.slice(0, 3);

  return (
    <div className="bg-[#121212] text-white rounded-xl w-full p-4 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Top Movers</h2>
        <a href="#" className="text-xs text-gray-400 hover:underline">
          FAQ
        </a>
      </div>

      {/* Tabs with scroll */}
      <div className="flex items-center mb-4">
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
              className={`py-1 px-3 rounded-full text-xs whitespace-nowrap
                ${
                  activeTab === tab ? "bg-yellow-500 text-black" : "bg-gray-700"
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
      <div className="space-y-2 overflow-y-auto  max-h-[8rem] no-scrollbar">
        {filteredMovers.map((mover, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded-lg 
              ${mover.change > 0 ? "bg-green-800/30" : "bg-red-800/30"}`}
          >
            <div>
              <div className="font-medium text-sm">{mover.pair}</div>
              <div className="text-xs text-gray-400">
                {mover.time} [{mover.trend}]
              </div>
            </div>
            <div
              className={`font-semibold text-sm
                ${mover.change > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {mover.change > 0 ? "+" : ""}
              {mover.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
