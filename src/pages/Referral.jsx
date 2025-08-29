import { PiCopyLight } from "react-icons/pi";
import { FaFacebook, FaReddit, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { RiTwitterXLine } from "react-icons/ri";
export const Referral = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#000000]"
      }`}
    >
      <TopNav />
      <div className="w-full p-20">
        <div className="flex items-center justify-center w-full">
          <div className="w-[60%] flex flex-col gap-[22px]">
            <div className="text-[24px] font-semibold">Referral Lite</div>
            <div className="text-[28px] font-bold">
              Refer a Friend - Both Earn Up to $100
            </div>
            <div className="font-normal text-[14px] leading-[22px">
              Refer friends to purchase crypto worth over $50, and both of you
              will receive a trading fee rebate voucher worth up to $100 within
              48 hours.{" "}
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-medium leading-[18px] text-[14px]">
                Invite via
              </div>
              <div
                className={`${
                  !dark ? "bg-[#F5F5F5] " : "bg-[#29313D] "
                } flex justify-between w-[405px] rounded-2xl p-2 h-[40px]`}
              >
                <div
                  className={`${!dark ? "text-[#9C9C9C]" : "text-[#707A8A]"}`}
                >
                  Referral Code
                </div>
                <div className="flex gap-2 items-center">
                  <div>CPA_00WZ6EH548</div>
                  <PiCopyLight />
                </div>
              </div>
              <div
                className={`${
                  !dark ? "bg-[#F5F5F5] " : "bg-[#29313D] "
                } flex justify-between w-[405px] h-[40px] p-2 rounded-2xl`}
              >
                <div
                  className={`${!dark ? "text-[#9C9C9C]" : "text-[#707A8A]"}`}
                >
                  Refer Link
                </div>
                <div className="flex items-center gap-2">
                  <div>https://ww...H548</div>
                  <PiCopyLight />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Share to </div>
              <div className="flex gap-3">
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]   ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <RiTwitterXLine
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />
                  </div>
                  x
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]   ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <FaFacebook
                      className={`rounded-[50%] p-[4px] h-[24px] w-[24px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </div>
                  facebook
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]   ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <FaTelegram
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </div>
                  telegram
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]  ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <FaWhatsapp
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </div>
                  whatsapp
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex capitalize flex-col rounded-[16px]  ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <FaReddit
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </div>
                  reddit
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <img src="/reward.png" className="w-full h-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 h-[10rem]">
          <div
            className={` border-1 flex items-center justify-center max-h-[10rem] w-full rounded-[16px] p-3  ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            }`}
          >
            <div className="text-[16px] font-medium leading-[24px] w-[60%]">
              1.Share your referral link with friends
            </div>
            <div>
              <img src="/sharestep1.png" className="h-[130px] w-[130px]" />
            </div>
          </div>
          <div
            className={` border-1 flex items-center justify-center max-h-[10rem] rounded-[16px] p-3 w-full  ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            }`}
          >
            <div className="text-[16px] font-medium leading-[24px] w-[60%]">
              Your referred friend buys more than $50 worth of crypto within 14
              days after registration.
            </div>
            <div>
              <img src="/sharestep2.png" className="h-[130px] w-[130px]" />
            </div>
          </div>
          <div
            className={` border-1 flex items-center justify-center max-h-[10rem]  rounded-[16px] p-3 w-full ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            }`}
          >
            <div className="text-[16px] font-medium leading-[24px] w-[50%]">
              Receive trading fee rebate vouchers worth $100 each.
            </div>
            <div>
              <img src="/reward.png" className="h-[130px] w-[130px]" />
            </div>
          </div>
        </div>
        <div className="w-full p-5">
          <div className="text-[20px] font-semibold">Overview</div>
          <div className="flex w-full">
            <div className="w-full p-3">
              <div
                className={`w-full  text-[16px] p-5`}
              >
                <div>Total Rewards (USD)</div>
                <div className="font-bold text-[48px]">0</div>
                <div>≈ $0</div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-[16px]">
              <div
                className={`w-full ${dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"} w-full font-medium p-5 `}
              >
                Total Referral
              </div>
              <div
                className={`w-full ${dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"} font-medium p-5`}
              >
                Task Completed Referrals
              </div>
              <div
                className={`w-full  ${dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"} p-5`}
              >
                <div>Total Trading Fee Rebate Voucher (USD)</div>
                <div className="font-bold text-[28px]">0</div>
                <div>≈ $NaN</div>
              </div>
              <div
                className={`w-full ${dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"} p-5`}
              >
                <div>Total Token Voucher (USD)</div>
                <div className="font-bold text-[28px]">0</div>
                <div>≈ $NaN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
