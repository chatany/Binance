import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepositHistory } from "../pages/apiCall";
import { TopNav } from "../pages/TopNavBar";
import { formatDate } from "../Constant";

export const DepositHistory = () => {
  const { dark, depositHistory } = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  useEffect(() => {
    getDepositHistory(dispatch);
  }, []);
  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      } min-h-screen`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div></div>
      <div className="p-[40px] flex flex-col gap-10 mt-16">
        <table className={`w-full`}>
          <thead>
            <tr
              className={`text-[12px] ${
                dark
                  ? "bg-[#2B3139] border-[#474d57]"
                  : "bg-[#F5F5F5] border-[#eaecef]"
              } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
            >
              <th className="text-left p-[12px_16px_12px_16px]">Time</th>
              <th className="text-left p-[12px_16px_12px_16px]">Type</th>
              <th className="text-left p-[12px_16px_12px_16px]">
                Deposit wallet
              </th>
              <th className="text-left p-[12px_16px_12px_16px]">Asset</th>
              <th className="text-left p-[12px_16px_12px_16px]">amount</th>
              <th className="text-left p-[12px_16px_12px_16px]">
                Destination{" "}
              </th>
              <th className="text-left p-[12px_16px_12px_16px]">TxID</th>
              <th className="text-left p-[12px_16px_12px_16px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {depositHistory?.slice(0, 3).map((ele, index) => {
              const date = formatDate(ele?.date);
              return (
                <tr
                  key={index}
                  className={`text-[14px]  ${
                    dark
                      ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                      : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                  } font-normal leading-[20px] border-b-[1px] `}
                >
                  <td className="text-left p-[12px_16px_12px_16px]">{date}</td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    {`Deposit`}
                  </td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    Spot wallet
                  </td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    {ele?.symbol}
                  </td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    {" "}
                    {ele?.final_amount}
                  </td>
                  <td className="text-left p-[12px_16px_12px_16px]">--</td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    {ele?.address}
                  </td>
                  <td className="text-left p-[12px_16px_12px_16px]">
                    {ele?.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
