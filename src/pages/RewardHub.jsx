import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { GoChevronRight } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { NotFound } from "../icons";

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
       <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div className="bg-[url(/logodark.svg)]  bg-contain bg-no-repeat bg-center md:h-[512px] max-md:h-[250px] max-w-full flex flex-col p-10 max-md:p-3 gap-6 justify-center">
        <div className="text-[48px] font-semibold leading-[64px] max-w-[792px] max-md:hidden">
          Join activities and earn attractive rewards in Rewards Hub.
        </div>
        <div className="text-[20px] font-semibold leading-[28px] max-md:hidden">
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
        } border-1 -mt-[32px] p-8 max-md:p-3 gap-[32px] flex flex-col `}
      >
        <div>
          <div className="flex justify-between ">
            <div className="text-[32px] max-md:text-[20px] font-semibold">Get Rewards</div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              View more <GoChevronRight />
            </div>
          </div>
          <div className="text-[#929AA5] text-[16px] max-md:hidden">
            Complete these tasks to earn daily rewards!
          </div>
          <div className="h-[550px]">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <NotFound className="max-md:size-16 size-20"/>
                <div className="text-[14px]">No Ongoing Tasks</div>
                <div className="text-[#F0B90B] text-[14px]">View Past Tasks</div>
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
                  className="min-h-[240px] h-[300px] w-fit bg-cover"
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
            <div className="text-[32px] font-semibold max-md:text-[20px]">Enjoy Rewards</div>
            <div className="flex gap-0.5 items-center justify-center text-[#929AA5] text-[14px]">
              View more <GoChevronRight />
            </div>
          </div>
          <div className="text-[#929AA5] text-[16px] max-md:text-[14px]">
            Use these vouchers and enjoy their benefits!
          </div>
          <div className="h-[550px]">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <NotFound className="max-md:size-16 size-20"/>
                <div className="text-[16px] max-md:text-[14px]">No Ongoing Vouchers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
      <Footer/>
      </div>
    </div>
  );
};
