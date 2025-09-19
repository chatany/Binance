import { CgSearch } from "react-icons/cg";
import { HeroSection } from "../pages/heroCard";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFundsData } from "../pages/apiCall";
import { useNavigate } from "react-router-dom";

export const Spot = () => {
  const { fundData, dark } = useSelector((state) => state.counter);
  // const [showIndex, setShowIndex] = useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (fundData?.length <= 0) {
      getFundsData(dispatch);
    }
  }, [fundData]);
  useEffect(() => {
    let filtered = fundData;
    if (hide) {
      filtered = filtered?.filter(
        (item) => Number(item?.balance) + Number(item?.unavailable_balance) > 1
      );
    }
    if (searchQuery !== "") {
      filtered = filtered?.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [hide, fundData, searchQuery]);
  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <HeroSection />
      <div
        className={` max-h-[480px] rounded-xl md:p-5 ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } md:border-1 w-full flex flex-col gap-4`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>Spot</div>
          <div className="gap-2 md:flex hidden">
            <div
              className={`relative flex  items-center focus-within:justify-start hover:justify-start ${
                searchQuery !== "" &&
                `justify-start ${
                  dark ? "border-[#b89c4f]" : "border-[#fce788]"
                }`
              }  justify-center`}
            >
              <input
                name="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border
    hover:border-[#b89c4f] w-[2rem] hover:min-w-[6rem] pl-6
    rounded-[6px]  ${searchQuery !== "" ? "min-w-[6rem] " : ""}
    ${
      dark
        ? "border-[#474D57] focus:border-[#b89c4f] focus:min-w-[6rem]"
        : "border-[#D8DCE1] focus:border-[#fce788] focus:min-w-[6rem]"
    }
    focus:outline-none `}
              />
              <CgSearch className="absolute" />
            </div>
            <div className="flex gap-0.5 items-center text-[14px]">
              Small Amount Exchange <TbArrowsExchange2 />
            </div>
            <div className="flex gap-2 items-center text-[14px]">
              <input
                type="checkbox"
                onChange={(e) => setHide(e.target.checked)}
                checked={hide}
              />
              {"Hide assets < 1 USD"}
            </div>
          </div>
          <div className="gap-2 flex justify-between md:hidden">
            <div className="flex gap-2 items-center  text-[14px]">
              <input
                type="checkbox"
                onChange={(e) => setHide(e.target.checked)}
                checked={hide}
              />
              {"Hide assets < 1 USD"}
            </div>
            <div className="flex gap-2">
              <div className="relative flex  items-center  focus-within:justify-start  hover:justify-start justify-center focus:w-[8rem]">
                <input
                  name="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`border
    hover:border-[#b89c4f] w-[2rem] hover:w-[6rem] pl-6
    rounded-[6px] ${searchQuery !== "" ? "w-[6rem]" : ""}
    ${
      dark
        ? "border-[#474D57] focus:border-[#b89c4f] focus:w-[6rem]"
        : "border-[#D8DCE1] focus:border-[#fce788] focus:w-[6rem]"
    }
    focus:outline-none 
     transition-colors duration-300 delay-200`}
                />
                <div className="absolute focus-within:p-2">
                  <CgSearch />
                </div>
              </div>
              <div className="flex gap-0.5 items-center text-[14px]">
                <TbArrowsExchange2 className="size-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="max-md:hidden">
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
              {Array.isArray(filteredData) &&
                filteredData?.map((item, index) => (
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
                        <td className="lg:text-[12px] text-[.6rem]  text-right capitalize p-[20px]  max-md:hidden">
                          {item?.balance}
                        </td>
                        <td className="lg:text-[12px] text-[.6rem]  text-right   capitalize">
                          {/* {item?.usdtprice} */}
                          <div className="flex gap-2 justify-end items-center">
                            <div
                              className={`${
                                dark ? "text-[#F0B90B]" : " text-[#D89F00]"
                              } cursor-pointer underline hidden md:flex`}
                              onClick={() => navigate("/crypto/deposit")}
                            >
                              deposit
                            </div>
                            <div
                              className={`${
                                dark ? "text-[#F0B90B]" : " text-[#D89F00]"
                              } cursor-pointer underline hidden md:flex`}
                              onClick={() => navigate("//crypto/withdraw")}
                            >
                              withdraw
                            </div>
                            {/* <div
                              className="relative cursor-pointer"
                              onMouseEnter={() => setShowIndex(index)}
                              onMouseLeave={() => setShowIndex(null)}
                            >
                              <HiOutlineDotsVertical className="size-5" />
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
                            </div> */}
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
