import { useSelector } from "react-redux";

export const HeroSection = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div
      className={`flex ${
        dark ? "border-[#333B47]" : "border-[#EDEDED]"
      } border-1 w-full justify-between p-5 rounded-2xl`}
    >
      <div className={`${dark ? "text-[#EAECEF]" : "text-[#1E2329]"}`}>
        <div className="text-[20px]">Estimated Balance</div>
        <div className="text-[32px] flex items-end">
          0.05761486<div className="text-[14px]">BTC</div>
        </div>
        <div className="text-[14px]">$6488.93</div>
        <div className="text-[14px]">Today`s PnL + $37.76(0.58%)</div>
      </div>
      <div>
        <div className="flex gap-5">
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] md:flex hidden font-semibold ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
          >
            Deposit
          </div>
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] md:flex hidden font-semibold ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
          >
            Withdraw
          </div>
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] md:flex hidden font-semibold ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
          >
            Cash In
          </div>
        </div>
      </div>
    </div>
  );
};
