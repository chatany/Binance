import { TopNav } from "./TopNavBar";
import { useDispatch, useSelector } from "react-redux";
import VerticalLinearStepper from "../common/Stepper";
import Withdrawal from "../common/Withdraw";
import { useLocation, useNavigate } from "react-router-dom";
import { PiDownloadSimpleBold, PiUploadSimpleBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getDepositHistory, getWithdrawHistory } from "./apiCall";

export const Crypto = ({}) => {
  const dark = useSelector((state) => state.counter.dark);
  const location = useLocation();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = ["deposit", "withdraw"];
  const activeName = () => {
    if (location.pathname.includes(`deposit`)) {
      return "deposit";
    } else if (location.pathname.includes(`withdraw`)) {
      return "withdraw";
    }
  };
  useEffect(() => {
    getDepositHistory(dispatch);
    getWithdrawHistory(dispatch);
  }, []);
  return (
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0  md:p-5`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div className="flex max-md:flex-col mt-18 md:gap-10">
        <div className="w-[250px] max-md:hidden">
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
                    {item === data[1] ? (
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
        <div className="md:hidden block w-full">
          <div
            className={`flex justify-between  ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            } border-b-1 w-full items-center p-[0px_20px_10px_20px]`}
            onClick={() => setActive(!active)}
          >
            <div className="flex items-center justify-between gap-2 capitalize">
              <div className="flex items-center gap-2">
                <div>
                  {activeName() === data[1] ? (
                    <PiUploadSimpleBold className="size-6" />
                  ) : (
                    <PiDownloadSimpleBold className="size-6" />
                  )}
                </div>
                <div className="font-semibold">{`${activeName()} ${" "} ${"Crypto"}`}</div>
              </div>
            </div>
            <div className="flex justify-end">
              {" "}
              <FaChevronDown
                className={`transition-transform size-5 ${
                  active ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          {data.map((item, index) => {
            return (
              <>
                {active && (
                  <>
                    <div
                      onClick={() => {
                        setActive(!active);
                        navigate(`/crypto/${item}`);
                      }}
                      key={index}
                      className={`flex flex-col p-[10px_20px_10px_20px]  cursor-pointer rounded-xl gap-2 w-full`}
                    >
                      <div className="flex items-center justify-between gap-2 capitalize">
                        <div className="flex items-center gap-2">
                          <div>
                            {item === data[1] ? (
                              <PiUploadSimpleBold className="size-6" />
                            ) : (
                              <PiDownloadSimpleBold className="size-6" />
                            )}
                          </div>
                          <div className="font-semibold">{`${item} ${" "} ${"Crypto"}`}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </div>
        {!active && (
          <div className="max-md:p-2 w-full">
            {location.pathname.includes(`deposit`) && <VerticalLinearStepper />}
            {location.pathname.includes(`withdraw`) && <Withdrawal />}
          </div>
        )}
      </div>
    </div>
  );
};
