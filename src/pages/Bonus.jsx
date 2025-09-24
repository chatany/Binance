import { useSelector } from "react-redux";
import { NotFound } from "../icons";
import { useEffect, useState } from "react";
import { getBonus } from "./apiCall";
import { formatDate } from "../Constant";
import { Loder } from "../common/Loder";
import { TopNav } from "./TopNavBar";

export const Bonus = () => {
  const dark = useSelector((state) => state.counter.dark);
  const [bonusData, setBonusData] = useState({
    bonusAmount: "",
    validTill: "",
    bonusHistory: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBonus(setBonusData,setLoading);
  }, []);

  return (
    <div
      className={`w-full ${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      } h-screen`}
    >
      {" "}
      <TopNav/>
      <div className="max-md:hidden">
        <div
          className={`text-[16px]  font-normal leading-[20px] w-full flex gap-100`}
        >
          <div>
            <div className="text-left p-[12px_16px_12px_16px]">
              Estimated Bonus
            </div>
            <div className="text-left p-[12px_16px_12px_16px]">Vaild til</div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="text-end  p-[12px_16px_12px_16px]">
              {bonusData?.bonusAmount}
            </div>
            <div className="text-end  p-[12px_16px_12px_16px]">
              {formatDate(bonusData?.validTill)}
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto ">
          <table className={`w-full`}>
            <thead>
              <tr
                className={`text-[12px] ${
                  dark
                    ? "bg-[#2B3139] border-[#474d57]"
                    : "bg-[#F5F5F5] border-[#eaecef]"
                } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
              >
                <th
                  className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                    dark
                      ? "bg-[#2B3139] border-[#474d57]"
                      : "bg-[#F5F5F5] border-[#eaecef]"
                  }`}
                >
                  Time
                </th>
                <th
                  className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                    dark
                      ? "bg-[#2B3139] border-[#474d57]"
                      : "bg-[#F5F5F5] border-[#eaecef]"
                  }`}
                >
                  Type
                </th>
                <th
                  className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                    dark
                      ? "bg-[#2B3139] border-[#474d57]"
                      : "bg-[#F5F5F5] border-[#eaecef]"
                  }`}
                >
                  amount
                </th>
                <th
                  className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                    dark
                      ? "bg-[#2B3139] border-[#474d57]"
                      : "bg-[#F5F5F5] border-[#eaecef]"
                  }`}
                >
                  Destination{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bonusData?.bonusHistory) &&
              bonusData?.bonusHistory?.length > 0 ? (
                bonusData?.bonusHistory?.map((ele, index) => {
                  const date = formatDate(ele?.timestamp);
                  return (
                    <tr
                      key={index}
                      className={`text-[14px]  ${
                        dark
                          ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                          : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                      } font-normal leading-[20px] border-b-[1px] `}
                    >
                      <td className="text-left p-[12px_16px_12px_16px]">
                        {date}
                      </td>
                      <td className="text-left p-[12px_16px_12px_16px]">
                        {ele?.type}
                      </td>
                      <td
                        className={`text-left p-[12px_16px_12px_16px] ${
                          ele?.type === "Cr"
                            ? "text-[#2EBD85]"
                            : "text-[#F6465D]"
                        }`}
                      >
                        {ele?.amount}
                      </td>
                      <td className="text-left p-[12px_16px_12px_16px]">
                        {JSON.parse(ele?.description)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="flex flex-col gap-0.5 items-center justify-center">
                        <NotFound className="max-md:size-16 size-10" />
                        <div className="text-[12px] max-md:text-[14px]">
                          No Data Found
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" md:hidden">
        <div
          className={`text-[16px]  font-normal leading-[20px] w-full flex justify-between`}
        >
          <div>
            <div className="text-left p-[12px_16px_12px_16px]">
              Estimated Bonus
            </div>
            <div className="text-left p-[12px_16px_12px_16px]">Vaild til</div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="text-end  p-[12px_16px_12px_16px]">
              {bonusData?.bonusAmount}
            </div>
            <div className="text-end  p-[12px_16px_12px_16px]">
              {formatDate(bonusData?.validTill)}
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto ">
          {Array.isArray(bonusData?.bonusHistory) &&
          bonusData?.bonusHistory?.length > 0 ? (
            bonusData?.bonusHistory?.map((ele, index) => {
              const date = formatDate(ele?.timestamp);
              return (
                <div
                  className={`text-[14px]  ${
                    dark
                      ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                      : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                  } font-normal leading-[20px] border-b-[1px] w-full flex justify-between`}
                  key={index}
                >
                  <div>
                    <div className="text-left p-[12px_16px_12px_16px]">
                      Amount
                    </div>
                    <div className="text-left p-[12px_16px_12px_16px]">
                      Description
                    </div>
                    <div className="text-left p-[12px_16px_12px_16px]">
                      Time
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div
                      className={`text-end p-[12px_16px_12px_16px] ${
                        ele?.type === "Cr" ? "text-[#2EBD85]" : "text-[#F6465D]"
                      }`}
                    >
                      {ele?.amount}
                    </div>
                    <div className="text-end  p-[12px_16px_12px_16px]">
                      {JSON.parse(ele?.description)}
                    </div>
                    <div className="text-end  p-[12px_16px_12px_16px]">
                      {date}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <NotFound className="max-md:size-16 size-10" />
                <div className="text-[12px] max-md:text-[14px]">
                  No Data Found
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
