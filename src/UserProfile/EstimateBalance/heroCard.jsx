import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const fundData = useSelector((state) => state.counter.fundData);
  const dark = useSelector((state) => state.counter.dark);

  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col md:flex-row gap-2 ${
        dark ? "border-[#333B47]" : "border-[#EDEDED]"
      } md:border-1 w-full justify-between md:p-5 rounded-2xl`}
    >
      <div className={`${dark ? "text-[#EAECEF]" : "text-[#1E2329]"}`}>
        <div className="text-[20px]">Estimated Balance</div>
        <div className="text-[32px] flex items-end">
          {fundData?.totalCoinBalance}
          {/* <div className="text-[14px]">BTC</div> */}
        </div>
        <div className="text-[14px]">${fundData?.totalBalance}</div>
        {/* <div className="text-[14px]">Today`s PnL + $37.76(0.58%)</div> */}
      </div>
      <div>
        <div className="flex gap-5 w-full justify-between">
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] w-full text-center font-semibold cursor-pointer ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
            onClick={() => navigate("/crypto/deposit")}
          >
            Deposit
          </div>
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] w-full text-center font-semibold cursor-pointer ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
            onClick={() => navigate("/crypto/withdraw")}
          >
            Withdraw
          </div>
        </div>
      </div>
    </div>
  );
};
