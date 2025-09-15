import { TopNav } from "./TopNavBar";
import { useSelector } from "react-redux";
import VerticalLinearStepper from "../common/Stepper";
import Withdrawal from "../common/Withdraw";
import { useLocation, useNavigate } from "react-router-dom";
import { PiDownloadSimpleBold, PiUploadSimpleBold } from "react-icons/pi";

export const Crypto = ({}) => {
  const dark = useSelector((state) => state.counter.dark);
  const location = useLocation();
  const navigate = useNavigate();
  const data = ["deposit", "withdraw"];
  return (
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0  p-5`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div className="flex mt-18 gap-10">
        <div className="w-[250px]">
          {data?.map((item, index) => (
            <div
              className={` w-full flex  flex-col ${
                dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
              } p-[10px_20px_10px_20px] text-[16px] mt-2
               ${
                 location.pathname.includes(`${item}`)
                   ? dark
                     ? "bg-[#2B3139]"
                     : "bg-[#EAECEF]"
                   : ""
               }
        font-medium leading-[24px]  cursor-pointer rounded-xl gap-2 `}
              key={index}
              onClick={() => navigate(`/crypto/${item}`)}
            >
              <div className="flex items-center justify-between gap-2 capitalize">
                <div className="flex items-center gap-2">
                  <div>
                    {item===data[1] ? (
                      <PiUploadSimpleBold className="size-6" />
                    ) : (
                      <PiDownloadSimpleBold className="size-6" />
                    )}
                  </div>
                  <div className="font-semibold">{`${item} ${" "} ${"Crypto"}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {location.pathname.includes(`deposit`) && <VerticalLinearStepper />}
          {location.pathname.includes(`withdraw`) && <Withdrawal />}
        </div>
      </div>
    </div>
  );
};
