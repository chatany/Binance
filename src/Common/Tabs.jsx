import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const tabs = ["USDC", "USDT", "FDUSD", "BNB", "BTC", "ETH", "XRP"];

const ScrollableTabsBar = ({ dark }) => {
  const scrollRef = useRef();
  const [activeTab, setActiveTab] = useState("USDT");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth);
    };
    checkScroll();
    scrollRef.current.addEventListener("scroll", checkScroll);
    return () => scrollRef.current?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`relative w-full flex items-center ${
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      } bg-gray-900  py-2 px-2 rounded-lg`}
    >
      {/* {showLeft && ( */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 z-10 ${
          dark ? "bg-gray-700" : "bg-white"
        }  bg-gray-700   cursor-pointer`}
        name="left_slide"
      >
        <FaChevronLeft />
      </button>
      {/* )} */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-6 px-8"
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative cursor-pointer py-2 hover:text-white whitespace-nowrap ${
              activeTab === tab
                ? `${dark ? "text-white" : "text-black"} font-semibold`
                : "text-gray-400"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
      {/* {showRight && ( */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 ${
          dark ? "bg-gray-700" : "bg-white"
        }  z-10 rounded-full cursor-pointer`}
        name="right_slide"
      >
        <FaChevronRight />
      </button>
      {/* )} */}
    </div>
  );
};

export default ScrollableTabsBar;
