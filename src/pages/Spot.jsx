import { CgSearch } from "react-icons/cg";
import { HeroSection } from "./heroCard";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";

export const Spot = () => {
    const {fundData,dark} =useSelector((state)=>state.counter)
    const [showIndex, setShowIndex] = useState(null);
  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <HeroSection />
      <div
        className={` h-[480px] rounded-xl p-5 ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-1 w-full flex flex-col gap-4`}
      >
        <div className="flex items-center justify-between">
          <div>Spot</div>
          <div className="flex gap-2">
            <div className="relative flex  items-center focus-within:justify-start hover:justify-start justify-center">
              <input
                name="Search"
                className={`border
    hover:border-[#b89c4f] w-[2rem] hover:w-[6rem] pl-6
    rounded-[6px]
    ${
      dark
        ? "border-[#474D57] focus:border-[#b89c4f] focus:w-[6rem]"
        : "border-[#D8DCE1] focus:border-[#fce788] focus:w-[6rem]"
    }
    focus:outline-none 
     transition-colors duration-300 delay-200`}
              />
              <CgSearch className="absolute" />
            </div>
            <div className="flex gap-0.5 items-center text-[14px]">
              Small Amount Exchange <TbArrowsExchange2 />
            </div>
            <div className="flex gap-2 items-center text-[14px]">
              <input type="checkbox" />
              Hide assets 1 USD
            </div>
          </div>
        </div>
        <div className="h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`${
                  dark ? "text-[#848E9C]" : "text-[#929AA5]"
                } text-[12px]`}
              >
                <th className="text-left  p-[20px]">Coin</th>
                <th className="text-right p-[20px]">Amount</th>
                <th className="text-right p-[20px]">Availble</th>
                <th className="text-right p-[20px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fundData) &&
                fundData?.map((item, index) => (
                  <>
                    {item?.balance > 0 && (
                      <tr key={index} className="p-[20px]">
                        <td className="lg:text-[12px] text-[.6rem] p-[20px] text-left capitalize ">
                          <div className="flex gap-3 items-center w-full ">
                            <div>
                              <div className="font-medium text-xs">
                                {item?.symbol}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item?.coin}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="lg:text-[12px] text-[.6rem] text-right uppercase p-[20px]">
                          {Number(item?.balance) +
                            Number(item?.unavailable_balance)}
                        </td>
                        <td className="lg:text-[12px] text-[.6rem]  text-right capitalize p-[20px]">
                          {item?.balance}
                        </td>
                        <td className="lg:text-[12px] text-[.6rem]  text-right   capitalize">
                          {/* {item?.usdtprice} */}
                          <div className="flex gap-2 justify-end items-center">
                            <div
                              className={`${
                                dark ? "text-[#F0B90B]" : " text-[#D89F00]"
                              } cursor-pointer underline`}
                            >
                              convert
                            </div>
                            <div
                              className={`${
                                dark ? "text-[#F0B90B]" : " text-[#D89F00]"
                              } cursor-pointer underline`}
                            >
                              Earn
                            </div>
                            <div
                              className="relative cursor-pointer"
                              onMouseEnter={() => setShowIndex(index)}
                              onMouseLeave={() => setShowIndex(null)}
                            >
                              <HiOutlineDotsVertical />
                              {showIndex === index && (
                                <div
                                  className={`absolute  ${
                                    dark ? "bg-[#1E2329]" : "bg-[#ffffff]"
                                  } top-1 sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] right-0 z-50 rounded-xl`}
                                >
                                  <div className="flex p-[10px_20px_10px_20px]  flex-col items-start w-full">
                                    <div
                                      className={`  ${
                                        dark
                                          ? "hover:bg-[#2B3139]"
                                          : "hover:bg-[#EAECEF]"
                                      }`}
                                    >
                                      Buy
                                    </div>
                                    <div
                                      className={` ${
                                        dark
                                          ? "hover:bg-[#2B3139]"
                                          : "hover:bg-[#EAECEF]"
                                      }`}
                                    >
                                      Sell
                                    </div>
                                    <div
                                      className={`  ${
                                        dark
                                          ? "hover:bg-[#2B3139]"
                                          : "hover:bg-[#EAECEF]"
                                      }`}
                                    >
                                      Transfer
                                    </div>
                                    <div
                                      className={`  ${
                                        dark
                                          ? "hover:bg-[#2B3139]"
                                          : "hover:bg-[#EAECEF]"
                                      }`}
                                    >
                                      Details
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
