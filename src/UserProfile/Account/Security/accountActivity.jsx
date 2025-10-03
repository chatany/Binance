import { useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../../Constant";
import { TopNav } from "../../../Spot/Navbar/TopNavBar";
import { Loder } from "../../../common/Loder";
// import { Loder } from "../../../common/Loder";

export const Activity = () => {
  const activity = useSelector((state) => state.counter.activity);
  const dark = useSelector((state) => state.counter.dark);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [activity]);
  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      } h-screen overflow-hidden`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div
        className={`flex  items-center mt-16 w-full text-[16px] p-[16px] ${
          dark
            ? "text-[#707A8A] hover:text-[#EAECEF]"
            : "text-[#9C9C9C] hover:text-[#000000]"
        }`}
        onClick={() => navigate(-1)}
      >
        <RiArrowLeftSLine className="size-6 font-light" />
        Security
      </div>
      <div className="p-[40px] flex flex-col gap-10">
        <div
          className={`text-[32px] font-semibold
        leading-[40px] ${dark ? "text-[#EAECEF]" : "text-[#000000]"}`}
        >
          Account Activity Records
        </div>
        <div>
          <table className={`w-full`}>
            <thead>
              <tr
                className={`text-[12px] ${
                  dark
                    ? "bg-[#2B3139] border-[#474d57]"
                    : "bg-[#F5F5F5] border-[#eaecef]"
                } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
              >
                <th className="text-left p-[12px_16px_12px_16px]">Date</th>
                <th className="text-left p-[12px_16px_12px_16px]">Location</th>
                <th className="text-left p-[12px_16px_12px_16px]">Status</th>
                <th className="text-left p-[12px_16px_12px_16px]">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {activity?.map((ele, index) => {
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
                      {ele?.location}
                    </td>
                    <td className="text-left p-[12px_16px_12px_16px]">
                      completed
                    </td>
                    <td className="text-left p-[12px_16px_12px_16px]">
                      {ele?.ip_address}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
