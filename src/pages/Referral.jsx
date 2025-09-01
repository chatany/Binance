import { PiCopyLight } from "react-icons/pi";
import { FaFacebook, FaReddit, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { RiTwitterXLine } from "react-icons/ri";
import { Footer } from "./Footer";
import { useEffect, useRef, useState } from "react";
import { getReferralData } from "./apiCall";
import { showError, showSuccess } from "../Toastify/toastServices";
export const Referral = () => {
  const { dark, referralCode } = useSelector((state) => state.counter);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess("copy to clipboard");
    } catch (err) {
      showError("Failed to copy");
      console.error("Failed to copy:", err);
    }
  };
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);
  const handleDotClick = (index) => {
    setCurrent(index);
    setIsPaused(true);
  };
  const images = [
    {
      img: "/sharestep1.png",
      title: "1.Share your referral link with friends",
    },
    {
      img: "/sharestep2.png",
      title:
        "Your referred friend buys more than $50 worth of crypto within 14 days after registration.",
    },
    {
      img: "/reward.png",
      title: "Receive trading fee rebate vouchers worth $100 each.",
    },
  ];
  useEffect(() => {
    getReferralData(dispatch);
  }, []);
  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#000000]"
      }`}
    >
      <TopNav />
      <div className="w-full md:p-20 max-md:p-5">
        <div className="flex items-center justify-center w-full max-md:hidden">
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
                  <div>{referralCode?.referral_code}</div>
                  <PiCopyLight
                    onClick={() => copyToClipboard(referralCode?.referral_code)}
                    className="cursor-pointer"
                  />
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
                  <div>{referralCode?.referral_url}</div>
                  <PiCopyLight
                    onClick={() => copyToClipboard(referralCode?.referral_url)}
                    className="cursor-pointer"
                  />
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
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        referralCode?.referral_url
                      )}&text=${encodeURIComponent(
                        "Join me using this referral link!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RiTwitterXLine
                        className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                          dark
                            ? "text-[#FFFFFF] bg-[#000000]"
                            : "text-[#000000] bg-[#FFFFFF]"
                        }`}
                      />
                    </a>
                  </div>
                  x
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]   ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        referralCode?.referral_url
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook
                        className={`rounded-[50%] p-[4px] h-[24px] w-[24px] ${
                          dark
                            ? "text-[#FFFFFF] bg-[#000000]"
                            : "text-[#000000] bg-[#FFFFFF]"
                        }`}
                      />{" "}
                    </a>
                  </div>
                  facebook
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]   ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    {" "}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(
                        referralCode?.referral_url
                      )}&text=${encodeURIComponent(
                        "Join me using this referral link!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTelegram
                        className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                          dark
                            ? "text-[#FFFFFF] bg-[#000000]"
                            : "text-[#000000] bg-[#FFFFFF]"
                        }`}
                      />{" "}
                    </a>
                  </div>
                  telegram
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex flex-col rounded-[16px]  ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        "Join me using this referral link: " +
                          referralCode?.referral_url
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp
                        className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                          dark
                            ? "text-[#FFFFFF] bg-[#000000]"
                            : "text-[#000000] bg-[#FFFFFF]"
                        }`}
                      />{" "}
                    </a>
                  </div>
                  whatsapp
                </div>
                <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                  <div
                    className={`flex capitalize flex-col rounded-[16px]  ${
                      dark ? "border-[#333B47]" : "border-[#EDEDED]"
                    } border-1 gap-2 items-center p-[11px]`}
                  >
                    <a
                      href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                        referralCode?.referral_url
                      )}&title=${encodeURIComponent(
                        "Join me using this referral link!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaReddit
                        className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                          dark
                            ? "text-[#FFFFFF] bg-[#000000]"
                            : "text-[#000000] bg-[#FFFFFF]"
                        }`}
                      />{" "}
                    </a>
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
        <div className="md:hidden">
          <div className="flex justify-center flex-col items-center">
            <div className="text-[28px] leading-[36px] font-bold">
              Refer a Friend – Both Earn Up to $100
            </div>
            <div className="text-[14px] leading-[22px] font-normal">
              Refer friends to purchase crypto worth over $50, and both of you
              will receive a trading fee rebate voucher worth up to $100 within
              48 hours.{" "}
            </div>
            <div>
              <div
                className="w-full overflow-hidden rounded-[10px] flex flex-col items-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  style={{
                    transition: "transform 0.6s ease-in-out",
                    transform: `translateX(-${current * 100}%)`,
                  }}
                  className="flex "
                >
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="min-w-full flex flex-col items-center"
                    >
                      <img
                        src={src.img}
                        alt={`slide-${i}`}
                        className="h-[135px] max-w-[294px] w-full"
                      />
                      <div>
                        <div className="text-[14px] font-normal leading-[22px]">
                          How referral works
                        </div>
                        <div className="text-[16px] font-bold leading-[24px]">
                          {src.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-[10px] flex gap-2 justify-center items-center">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className="h-[4px] w-[20px] inline-block rounded-[2px] cursor-pointer"
                      style={{
                        backgroundColor: current === i ? "#ffcc00" : "#aaa",
                      }}
                      onClick={() => handleDotClick(i)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-medium leading-[18px] text-[14px]">
              Invite via
            </div>
            <div
              className={`${
                !dark ? "bg-[#F5F5F5] " : "bg-[#29313D] "
              } flex justify-between w-full rounded-2xl p-2 h-[40px]`}
            >
              <div className={`${!dark ? "text-[#9C9C9C]" : "text-[#707A8A]"}`}>
                Referral Code
              </div>
              <div className="flex gap-2 items-center">
                <div>{referralCode?.referral_code}</div>
                <PiCopyLight
                  onClick={() => copyToClipboard(referralCode?.referral_code)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div
              className={`${
                !dark ? "bg-[#F5F5F5] " : "bg-[#29313D] "
              } flex justify-between w-full h-[40px] p-2 rounded-2xl`}
            >
              <div className={`${!dark ? "text-[#9C9C9C]" : "text-[#707A8A]"}`}>
                Refer Link
              </div>
              <div className="flex items-center gap-2">
                <div>{referralCode?.referral_url}</div>
                <PiCopyLight
                  onClick={() => copyToClipboard(referralCode?.referral_url)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Share to </div>
            <div className="flex justify-between">
              <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                <div
                  className={`flex flex-col rounded-[16px]   ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 gap-2 items-center p-[11px]`}
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      referralCode?.referral_url
                    )}&text=${encodeURIComponent(
                      "Join me using this referral link!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiTwitterXLine
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />
                  </a>
                </div>
                x
              </div>
              <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                <div
                  className={`flex flex-col rounded-[16px]   ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 gap-2 items-center p-[11px]`}
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      referralCode?.referral_url
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook
                      className={`rounded-[50%] p-[4px] h-[24px] w-[24px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </a>
                </div>
                facebook
              </div>
              <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                <div
                  className={`flex flex-col rounded-[16px]   ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 gap-2 items-center p-[11px]`}
                >
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                      referralCode?.referral_url
                    )}&text=${encodeURIComponent(
                      "Join me using this referral link!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTelegram
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </a>
                </div>
                telegram
              </div>
              <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                <div
                  className={`flex flex-col rounded-[16px]  ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 gap-2 items-center p-[11px]`}
                >
                  {" "}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      "Join me using this referral link: " +
                        referralCode?.referral_url
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </a>
                </div>
                whatsapp
              </div>
              <div className="flex flex-col capitalize gap-2 items-center text-[12px]">
                <div
                  className={`flex capitalize flex-col rounded-[16px]  ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 gap-2 items-center p-[11px]`}
                >
                  <a
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                      referralCode?.referral_url
                    )}&title=${encodeURIComponent(
                      "Join me using this referral link!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaReddit
                      className={`rounded-[50%] h-[24px] w-[24px] p-[4px] ${
                        dark
                          ? "text-[#FFFFFF] bg-[#000000]"
                          : "text-[#000000] bg-[#FFFFFF]"
                      }`}
                    />{" "}
                  </a>
                </div>
                reddit
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 h-[10rem] max-md:hidden">
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
        <div className="w-full p-5 max-md:hidden">
          <div className="text-[20px] font-semibold">Overview</div>
          <div className="flex w-full">
            <div className="w-full p-3">
              <div className={`w-full  text-[16px] p-5`}>
                <div>Total Rewards (USD)</div>
                <div className="font-bold text-[48px]">0</div>
                <div>≈ $0</div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-[16px]">
              <div
                className={`w-full ${
                  dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"
                } w-full font-medium p-5 `}
              >
                Total Referral
              </div>
              <div
                className={`w-full ${
                  dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"
                } font-medium p-5`}
              >
                Task Completed Referrals
              </div>
              <div
                className={`w-full  ${
                  dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"
                } p-5`}
              >
                <div>Total Trading Fee Rebate Voucher (USD)</div>
                <div className="font-bold text-[28px]">0</div>
                <div>≈ $NaN</div>
              </div>
              <div
                className={`w-full ${
                  dark ? "bg-[#0B0E11]" : "bg-[#FAFAFA]"
                } p-5`}
              >
                <div>Total Token Voucher (USD)</div>
                <div className="font-bold text-[28px]">0</div>
                <div>≈ $NaN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <Footer />
      </div>
    </div>
  );
};
