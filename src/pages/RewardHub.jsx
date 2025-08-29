import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { GoChevronRight } from "react-icons/go";
import { useEffect, useRef, useState } from "react";

export const RewardHub = () => {
  const dark = useSelector((state) => state.counter.dark);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

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
  const images = ["/caroualimg1.jpg", "/Carousal1.png"];
  return (
    <div
      className={`w-full ${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#000000]"
      }`}
    >
      <TopNav />
      <div className="bg-[url(/logodark.svg)]  bg-contain bg-no-repeat bg-center h-[512px] max-w-full flex flex-col p-10 gap-6 justify-center">
        <div className="text-[48px] font-semibold leading-[64px] max-w-[792px] ">
          Join activities and earn attractive rewards in Rewards Hub.
        </div>
        <div className="text-[20px] font-semibold leading-[28px]">
          Grab the rewards before they run out!
        </div>
        <div className="flex gap-4">
          <div>
            <div>0 points</div>
            <div>Rewards shop</div>
          </div>
          <div>
            <div>0 Vouchers</div>
            <div>My Vouchers</div>
          </div>
        </div>
      </div>
      <div
        className={`rounded-[24px_24px_0px_0px]   ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-1 -mt-[32px] p-8 m-2`}
      >
        <div>
          <div className="flex justify-between ">
            <div className="text-[32px] font-semibold">Get Rewards</div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              View more <GoChevronRight />
            </div>
          </div>
          <div className="text-[#929AA5] text-[16px]">
            Complete these tasks to earn daily rewards!
          </div>
          <div className="h-[550px]">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <svg
                  fill="PrimaryText"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bn-svg"
                >
                  <path
                    opacity="0.5"
                    d="M84 28H64V8l20 20z"
                    fill="#AEB4BC"
                  ></path>
                  <path
                    opacity="0.2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z"
                    fill="#AEB4BC"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z"
                    fill="#AEB4BC"
                  ></path>
                </svg>
                <div>No Ongoing Tasks</div>
                <div className="text-[#F0B90B]">View Past Tasks</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="w-full overflow-hidden rounded-[10px]"
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
                <img
                  key={i}
                  src={src}
                  alt={`slide-${i}`}
                  className="h-[200px] min-w-full"
                />
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
        <div>
          <div className="flex justify-between ">
            <div className="text-[32px] font-semibold">Enjoy Rewards</div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              View more <GoChevronRight />
            </div>
          </div>
          <div className="text-[#929AA5] text-[16px]">
            Use these vouchers and enjoy their benefits!
          </div>
          <div className="h-[550px]">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <svg
                  fill="PrimaryText"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bn-svg"
                >
                  <path
                    opacity="0.5"
                    d="M84 28H64V8l20 20z"
                    fill="#AEB4BC"
                  ></path>
                  <path
                    opacity="0.2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z"
                    fill="#AEB4BC"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z"
                    fill="#AEB4BC"
                  ></path>
                </svg>
                <div>No Ongoing Vouchers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
