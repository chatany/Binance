import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollStatsBar = ({ items, dark }) => {
  const scrollRef = useRef();
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
        dark ? "bg-gray-900 text-white" : "bg-transparent text-black"
      }   p-2 rounded-lg`}
    >
      {/* {showLeft && ( */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 z-10 ${
          dark ? "bg-gray-700" : "bg-transparent"
        }  bg-gray-700 rounded-full shadow cursor-pointer`}
      >
        <FaChevronLeft />
      </button>
      {/* )} */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-6 px-8 lg:w-[35rem] w-[95%]"
      >
        {/* <div className="min-w-max">High: 789.99</div>
        <div className="min-w-max">24h Low: 106,733.33</div>
        <div className="min-w-max">24h Volume (BTC): 9,944.46</div>
        <div className="min-w-max">24h Volume (USDT): 1,071,769,526.09</div>
        <div className="min-w-max">Token Tags: POW | Payments</div> */}
        <div className="min-w-max flex gap-2 items-center">{items}</div>
      </div>
      {/* {showRight && ( */}
      <button
        onClick={() => scroll("right")}
        className={`absolute -right-2 z-10 ${
          dark ? "bg-gray-700" : "bg-transparent"
        } bg-gray-700 rounded-full shadow cursor-pointer`}
      >
        <FaChevronRight />
      </button>
      {/* )} */}
    </div>
  );
};

export default ScrollStatsBar;
