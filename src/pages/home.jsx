import React, { useEffect, useState } from "react";
import { CiSearch, CiStar } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import {
  FaQuestion,
  FaAngleDown,
  FaAngleRight,
  FaBalanceScale,
} from "react-icons/fa";
import {  IoMdSettings } from "react-icons/io";
import { Order } from "./Order";
import { MarketCom } from "./market";
import { Form } from "./form";
import MobileSidebar from "./sidebar";
import {
  data,
} from "../Constant";
import { ChartEmbed } from "./chart";
import {
  fetchData,
} from "./apiCall";
import TopMovers from "./move";
import {
  TopIconBar1,
  TopIconBar2,
  TopIconBar3,
  TopIconBar4,
} from "./TopIconBars";
import { Socket } from "./Socket";
import { useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { ToggleButSell } from "./ToggleBuySell";
import { OpenOrders } from "../common/openOrders";
import { Middle } from "./MiddleCom";
export const Home = () => {
  const [dark, setDark] = useState(true);
  const isOpen = useSelector((state) => state.counter.open);
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState("Spot");
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const navigate = useNavigate();
  const { symbol } = useParams();
  const [searchQuery, setSearchQuery] = useState(symbol || "BTCUSDT");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const [activeItem, setActiveItem] = useState("Buy");
  const serarParams = useParams();

  const [show, setShow] = useState(false);
  const handleTheme = () => {
    setDark(!dark);
  };
  useEffect(() => {
    if (symbol) {
      const pair = `${symbol}`; // e.g., spot/DOGEUSDT
      localStorage.setItem("lastPair", JSON.stringify(pair));
    }
  }, [symbol]);
  useEffect(() => {
    // If either missing, redirect to last known or default
    if (!symbol) {
      const last = JSON.parse(localStorage.getItem("lastPair"));
      navigate(`/spot/${last}`, { replace: true });
    }
  }, [symbol, navigate]);
  useEffect(() => {
    fetchData();
  }, [symbol]);

  const [currentItem, setCurrentItem] = useState("");

  const handleClose = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  return (
    <>
      <Socket searchQuery={searchQuery} />
      {show && (
        <div className="App">
          <MobileSidebar show={show} setShow={setShow} dark={dark} />
        </div>
      )}
      <div
        className={`
        ${
          dark
            ? "bg-[#181A20] text-white"
            : "bg-[#EAECEF] text-black  flex flex-col gap-1"
        }
       min-h-screen`}
      >
        {/* Top Navbar */}
        <div
          className={`flex flex-wrap justify-between items-center border-b-1 h-[4rem] ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } w-[100vw]  p-3 ${
            dark ? "bg-[#181A20] text-[#EAECEF] " : "bg-white text-black "
          }`}
        >
          <div className="flex  lg:w-[50%] items-center text-lg gap-2 font-semibold leading-6 lg:justify-evenly">
            <div className="text-amber-400 font-semibold text-xl">
              {dark ? (
                <img src="/bitzup_light_logo.png" className="h-10 w-36" />
              ) : (
                <img src="/bitzup_dark_logo.png" className="h-10 w-36" />
              )}
            </div>
            {[
              "Buy Crypto",
              "Markets",
              "Trade",
              "Futures",
              "Earn",
              "Square",
              "More",
            ].map((item, i) => (
              <div
                key={i}
                className="hover:text-amber-400 text-[14px] lg:flex hidden items-center gap-1 cursor-pointer relative  "
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredItemIndex(i);
                  setCurrentItem(item);
                  setHoverPosition({
                    x: rect.left,
                    y: rect.bottom,
                    width: rect.width,
                  });
                }}
                // onMouseLeave={() => setHoveredItemIndex(null)}
              >
                {item}
                {i !== 0 && i !== 1 && (
                  <div
                    className={`${
                      i === hoveredItemIndex
                        ? "transition-transform rotate-180"
                        : " "
                    }`}
                  >
                    <FaAngleDown />
                  </div>
                )}
              </div>
            ))}
            {hoveredItemIndex !== null &&
              hoveredItemIndex !== 0 &&
              hoveredItemIndex !== 1 && (
                <div
                  className={`absolute max-w-[40rem]  border-1 ${
                    dark ? "bg-[#161A1E] text-white" : "bg-white text-black"
                  }  opacity-95  ${
                    dark ? "border-[#2B3139]" : "border-[#EAECEF]"
                  }   p-2  shadow-lg rounded-md  z-999 hidden lg:block transition-all duration-200`}
                  style={{
                    top: `${hoverPosition.y + 5}px`,
                    left: `${hoverPosition.x - 110}px`,
                  }}
                  onMouseLeave={() => setHoveredItemIndex(null)}
                  onMouseEnter={() => setHoveredItemIndex(hoveredItemIndex)}
                >
                  {data?.map(
                    (item, idx) =>
                      item.category === currentItem && (
                        <>
                          {item?.category === "Trade" ||
                          item?.category === "More" ? (
                            <div className="flex ">
                              {item.item.map((ele) => (
                                <div className="p-3">
                                  <div className="flex flex-col w-full">
                                    {ele.section === 1 &&
                                      ele.array.map((val, ind) => (
                                        <div
                                          key={ind}
                                          className={`${
                                            dark
                                              ? "hover:bg-[#161A1E]"
                                              : "hover:bg-gray-100"
                                          } items-start gap-3 px-4 py-3 flex w-full cursor-pointer`}
                                        >
                                          <div>
                                            <FaBalanceScale className="h-6 w-6" />
                                          </div>
                                          <div className="w-full">
                                            <div className="font-bold text-[16px] ">
                                              {val.title}
                                            </div>
                                            <div className="text-[12px]">
                                              {val.description}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                  <div className="flex flex-col w-full ">
                                    {ele.section === 2 &&
                                      ele.array.map((val, ind) => (
                                        <div
                                          key={ind}
                                          className={`${
                                            dark
                                              ? "hover:bg-[#161A1E]"
                                              : "hover:bg-gray-100"
                                          } flex items-start gap-3 px-4 py-3 w-full  cursor-pointer`}
                                        >
                                          <div>
                                            <FaBalanceScale className="h-6 w-6" />
                                          </div>
                                          <div>
                                            <div className="font-bold text-[16px] ">
                                              {val.title}
                                            </div>
                                            <div className="leading-3 text-[12px] ">
                                              {val.description}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3">
                              {item.item.map((ele, index) => (
                                <>
                                  {
                                    <div
                                      key={index}
                                      className={`${
                                        dark
                                          ? "hover:bg-[#161A1E]"
                                          : "hover:bg-gray-100"
                                      } flex items-center gap-3 px-2 py-2  cursor-pointer`}
                                    >
                                      <FaBalanceScale className="h-6 w-6" />
                                      <div>
                                        <div className="font-bold text-[16px] ">
                                          {ele.title}
                                        </div>
                                        <div className=" leading-3 text-[12px] ">
                                          {ele.description}
                                        </div>
                                      </div>
                                    </div>
                                  }
                                </>
                              ))}
                            </div>
                          )}
                        </>
                      )
                  )}
                </div>
              )}
          </div>

          {/* Right Navbar */}
          <div className="flex md:gap-5 gap-2 lg:gap-3 items-center  md:mt-0 justify-between lg:pr-10 pr-4 cursor-pointer ">
            <CiSearch className="hover:text-amber-400  h-6 w-6 lg:block hidden" />
            {!userData?.token && (
              <>
                <div
                  className="hover:text-gray-400 text-[14px] md:flex hidden font-semibold  leading-6"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </div>
                <div
                  className=" text-[14px] font-medium leading-6 hover:opacity-85 text-black bg-[#fcd535] rounded-sm px-2 py-1"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </div>
              </>
            )}
            <IoDownloadOutline className="hover:text-amber-400 h-6 w-6 md:flex hidden" />
            <div onClick={handleClose}>
              <RxHamburgerMenu
                className="hover:text-amber-400 h-6 w-6 md:hidden flex"
                // onClick={handleClose}
              />
            </div>
            <TbWorld className="hover:text-amber-400  h-6 w-6 md:flex hidden " />
            <FaQuestion className="hover:text-amber-400  h-6 w-6 md:flex hidden" />
            <IoMdSettings className="hover:text-amber-400  h-6 w-6" />
            {dark ? (
              <IoSunnyOutline
                className="hover:text-amber-400  h-6 w-6"
                onClick={handleTheme}
              />
            ) : (
              <MdDarkMode
                className="hover:text-amber-400  h-6 w-6 md:h-6 md:w-6"
                onClick={handleTheme}
              />
            )}
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full flex flex-col items-center gap-1 justify-between">

        <div className=" justify-between  max-w-full lg:flex hidden gap-1">
          <div className=" flex flex-col lg:w-full w-[78%] items-center gap-1 arr ">
            <TopIconBar1 dark={dark} />
            <TopIconBar2 dark={dark} />

            <div className="flex  justify-between w-full gap-1">
              <div
                className={`w-[35%] lg:block  transition-all duration-500 delay-100  hidden ${
                  isOpen ? "h-[64.5rem]" : "h-[58.5rem]"
                }`}
                id="c"
              >
                <Order
                  dark={dark}
                />
              </div>
              <div className="flex flex-col  w-full gap-1">
                <div
                  className={`${
                    dark ? "bg-[#181A20] " : "bg-white "
                  } max-h-[800px]   text-xs max-w-full`}
                >
                  <div className="h-[500px] w-full rounded-lg">
                    <ChartEmbed searchQuery={symbol} className="w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <Form dark={dark} searchQuery={symbol} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[22%]  lg:flex hidden flex-col gap-1">
            <MarketCom
              dark={dark}
              SetSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
            <div
              className={`[26rem] flex flex-col  rounded-lg items-end ${
                dark ? "bg-[#181A20] text-white" : "bg-white text-black w-full"
              }  `}
            >
              <TopMovers dark={dark} SetSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
        <div
          className={`lg:block hidden max-w-[1528px] rounded-2xl h-full w-full ${
            dark ? " bg-[#181A20]" : " bg-white "
          } `}
        >
          <OpenOrders dark={dark} />
        </div>
        </div>
        <div className="lg:hidden flex flex-col w-full ">
          <TopIconBar3 dark={dark} />
          <div className="w-full md:flex hidden pb-2 gap-1">
            <div className="w-[69%]">
              <div className="h-[400px]  text-xs w-full bg-gray-800 mb-4 rounded-md ">
                <ChartEmbed searchQuery={symbol} className="h-full w-full" />
              </div>
              <Middle dark={dark} />
              <OpenOrders dark={dark} />
            </div>
            <div
              className={`${
                dark ? "bg-[#181A20]" : "bg-white"
              } w-[30%] space-y-6 P-3 rounded-lg`}
            >
              <ToggleButSell
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                dark={dark}
                active={active}
                searchQuery={symbol}
                setActive={setActive}
                close={false}
              />
            </div>
          </div>
          <div className="md:hidden w-full">
            <div className="h-[800px]  text-xs w-full   rounded-md ">
              <TopIconBar4 dark={dark} />
              <ChartEmbed searchQuery={symbol} className="h-full w-full" />
            </div>
          </div>
        </div>
        <div
          className={`md:hidden ${
            dark ? "bg-[#181A20] " : "bg-white"
          } w-full fixed bottom-0 z-30 flex  justify-center gap-2 text-white p-5 rounded-[43px,4px,3px,1px] `}
        >
          <div className="w-[50%] flex justify-center bg-[#F6465D] hover:bg-[#c74052] rounded-md h-[2.5rem] cursor-pointer">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              Log In
            </button>
          </div>
          <div className="w-[50%]  flex justify-center bg-[#0ECB81] hover:bg-[#0e9e67] rounded-md h-[2.5rem] cursor-pointer">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              Log In
            </button>
          </div>
        </div>
        {isLogin && (
          <div className="bg-[#00000080] h-[100%] w-full">
            <div
              className={`md:hidden ${
                dark ? "bg-[#181E25] " : "bg-white"
              } w-full fixed bottom-0 z-50 flex   justify-center gap-2 text-white rounded-[43px,4px,3px,1px] h-[90%] `}
            >
              <ToggleButSell
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                dark={dark}
                active={active}
                searchQuery={symbol}
                setActive={setActive}
                handleClose={() => setIsLogin(!isLogin)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
