import React from "react";
export const BuySellToggle = ({activeItem,setActiveItem}) => {
  return (
    <div className="flex border border-gray-600 rounded-md overflow-hidden bg-transparent w-full">
      <div
        onClick={() => setActiveItem("Buy")}
        className={`relative px-6 py-2 cursor-pointer flex items-center justify-center w-full
          ${activeItem === "Buy" ? "bg-[#0ECB81] text-black" : "text-gray-300"}
          transition-all duration-300
        `}
      >
        Buy
        {activeItem  === "Buy" && (
          <div
            className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 
            w-0 h-0 border-t-[20px] border-b-[20px] border-l-[12px]
            border-t-transparent border-b-transparent border-l-[#0ECB81]"
          ></div>
        )}
      </div>
      <div
        onClick={() => setActiveItem("Sell")}
        className={`relative px-6 py-2 cursor-pointer flex items-center justify-center w-full
          ${activeItem === "Sell" ? "bg-[#F6465D] text-black" : "text-gray-300"}
          transition-all duration-300
        `}
      >
        Sell
        {activeItem === "Sell" && (
          <div
            className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 
            w-0 h-0 border-t-[20px] border-b-[20px] border-r-[18px]
            border-t-transparent border-b-transparent border-r-[#F6465D]"
          ></div>
        )}
      </div>
    </div>
  );
};
