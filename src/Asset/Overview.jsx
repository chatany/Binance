import { useSelector } from "react-redux";
import { HeroSection } from "../pages/heroCard";
import { CgSearch } from "react-icons/cg";
import { TbArrowsExchange2 } from "react-icons/tb";
import { GoChevronRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { NotFound } from "../icons";

export const Overview = () => {
  const { dark, fundData } = useSelector((state) => state.counter);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hide, setHide] = useState(false);
  const [activeTab, setActiveTab] = useState("coin");
  const handleActive = (key) => {
    setActiveTab(key);
  };
  useEffect(() => {
    let filtered = fundData?.data;
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
    <div>
      <div className="flex flex-col gap-[20px] p-[10px]">
        <HeroSection />
        <div
          className={` max-h-[480px] rounded-xl md:p-5 ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 w-full flex flex-col gap-4`}
        >
          <div className="w-full justify-between flex items-center">
            <div>My Assets</div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              View All 350+ Coins <GoChevronRight />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex gap-4 items-center ">
              <div onClick={() => handleActive("coin")}>
                Coin View{" "}
                {activeTab === "coin" && (
                  <div className="flex justify-center w-full">
                    <div className="w-[30%] border-b-2 border-[#2EDBAD]"></div>
                  </div>
                )}
              </div>
              <div onClick={() => handleActive("account")}>
                Account View{" "}
                {activeTab === "account" && (
                  <div className="flex justify-center w-full">
                    <div className="w-[30%] border-b-2 border-[#2EDBAD]"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="gap-2 md:flex hidden">
              <div className="relative flex  items-center focus-within:justify-start hover:justify-start justify-center">
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
                <CgSearch className="absolute" />
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
                            <div className="flex gap-2 justify-end items-center p-[8px_16px_8px_0px]">
                              <div
                                className={`${
                                  dark ? "text-[#2EDBAD]" : " text-[#2EDBAD]"
                                } cursor-pointer underline hidden md:flex`}
                              >
                                cash In
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
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] h-[250px] gap-[20px]`}
        >
          <div className="flex justify-between ">
            <div className="text-[24px] font-semibold max-md:text-[20px]">
              Recent Transactions
            </div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              More <GoChevronRight />
            </div>
          </div>
          <div className="h-[550px]">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <NotFound className="max-md:size-16 size-20" />
                <div className="text-[16px] max-md:text-[14px]">No Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
