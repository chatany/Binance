import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSearchQuery } from "../../store/webSocket";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const TopMovers = () => {
  const tabs = ["All", "Hot", "Losers", "24h Vol", "Gainers"];
  const open = useSelector((state) => state.counter.open);
  const allMovers = useSelector((state) => state.counter.allMovers);
  const movers = useSelector((state) => state.counter.movers);
  const dark = useSelector((state) => state.counter.dark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const tabRef = useRef(null);
  const handleOpen = () => {
    dispatch(setOpen(!open));
  };
  const scrollTabs = (offset) => {
    tabRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };
  const handlePairClick = (item) => {
    dispatch(setSearchQuery(item));
    const symbols = item;
    if (symbols) {
      navigate(`/spot/${symbols}`);
    }
  };
  const filteredData = () => {
    return activeTab !== "All" ? movers[activeTab] : allMovers;
  };

  return (
    <div
      className={`${
        open ? "h-[17.5rem]" : "h-[13.9rem]"
      } transition-all duration-500 delay-100   rounded-lg w-full   overflow-hidden`}
    >
      <div
        className={`flex  ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-b-1 w-full justify-between items-center mb-3 p-2`}
      >
        <div className="flex justify-between items-center gap-3">
          <h2 className="text-[14px] font-semibold">Top Movers</h2>
          {/* <a href="#" className="text-xs text-gray-400 hover:underline">
            FAQ
          </a> */}
        </div>
        <RiArrowUpDoubleLine
          onClick={handleOpen}
          className={`${open ? "transition-transform rotate-180" : ""} h-6 w-6`}
        />
      </div>

      {/* Tabs with scroll */}
      <div className="flex items-center mb-4 p-2">
        <button
          onClick={() => scrollTabs(-100)}
          className=" rounded-full cursor-pointer   mr-2"
          name="left"
        >
          <FaChevronLeft size={12} />
        </button>
        <div
          ref={tabRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              name="item1"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1 px-3 rounded-md text-xs whitespace-nowrap cursor-pointer
                ${
                  activeTab === tab
                    ? "bg-[#EAECEF] text-[#202630]"
                    : "text-[#707A8A]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          name="right"
          onClick={() => scrollTabs(100)}
          className=" rounded-full cursor-pointer   ml-2"
        >
          <FaChevronRight size={12} />
        </button>
      </div>

      {/* Movers List */}
      <div
        className={`space-y-1 overflow-y-auto ${
          open ? "max-h-[10rem]" : "max-h-[7rem]"
        } no-scrollbar`}
      >
        {Array.isArray(filteredData()) && filteredData()?.length > 0 ? (
          <>
            {filteredData()?.map((mover, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-1 rounded-lg cursor-pointer `}
                onClick={() => {
                  handlePairClick(mover?.pair_symbol);
                }}
              >
                <div className="flex gap-3 items-center justify-between">
                  <div>
                    <img
                      src={mover?.coin_icon}
                      className="h-6 w-6"
                      alt="coin_image"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-xs">
                      {mover?.pair_symbol}
                    </div>
                    <div className="text-xs text-gray-400">{mover?.volume}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <div className="text-xs text-gray-400">
                      ${mover?.current_price}
                    </div>
                  </div>
                  <div
                    className={`font-semibold text-[12px] p-1 rounded-md 
                ${
                  mover?.change_in_price > 0 && activeTab !== "Losers"
                    ? "text-white bg-green-700"
                    : "text-white bg-red-700"
                }`}
                  >
                    {mover?.change_in_price > 0 && activeTab !== "Losers"
                      ? "+"
                      : " "}
                    {mover?.change_in_price}%
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <ScaleLoader color="#FCD535" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMovers;
