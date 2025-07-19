import React, { useEffect, useState } from "react";
import { CiSearch, CiStar } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import {
  FaQuestion,
  FaAngleDown,
  FaAngleRight,
  FaBalanceScale,
} from "react-icons/fa";
import { IoMdListBox, IoMdSettings } from "react-icons/io";
import { Order } from "./Order";
import { MarketCom } from "./market";
import { Form } from "./form";
import CryptoInput from "./common";
import { Box, Slider, styled } from "@mui/material";
import MobileSidebar from "./sidebar";
import { BuySellToggle } from "../common/ToggleButton";
import ScrollStatsBar from "../common/TopIconBar";
import {
  data,
  formatDate,
  marketArr,
  marks,
  orderArr,
  priceArr,
  supportOptions,
  tab,
  tabs,
} from "../Constant";
import { ChartEmbed } from "./chart";
import {
  country,
  fetchData,
  OrderHistory,
  TikerData,
  TopMoves,
} from "./apiCall";
import TopMovers from "./move";
import {
  TopIconBar1,
  TopIconBar2,
  TopIconBar3,
  TopIconBar4,
} from "./TopIconBars";
import { Socket } from "./Socket";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Progressbar } from "../common/CircularBar";
import { ToggleButSell } from "./ToggleBuySell";
import { OpenOrders } from "../common/openOrders";
import { Middle } from "./MiddleCom";
export const Home = () => {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("Open Orders");
  const isOpen = useSelector((state) => state.counter.open);
  const [isLogin, setIsLogin] = useState(false);
  const { openOrder, orderHistory } = useSelector((state) => state.counter);
  const [active, setActive] = useState("Sport");
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSymbol = searchParams.get("symbol") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSymbol);
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const [activeItem, setActiveItem] = useState("Buy");

  const [show, setShow] = useState(false);
  const handleTheme = () => {
    setDark(!dark);
  };

  const currencySymbol = searchParams.get("symbol");
  useEffect(() => {
    if (currencySymbol && currencySymbol !== searchQuery) {
      setSearchQuery(currencySymbol);
    }
  }, [searchParams]);

  const dispatch = useDispatch();
  const [tikerData, setTikerData] = useState({
    symbol: "",
    lastPrice: "",
    priceChange: "",
    priceChangePercent: "",
    highPrice: "",
    lowPrice: "",
    volume: "",
    quoteVolume: "",
  });
  useEffect(() => {
    fetchData();
  }, [currencySymbol]);

  const symbol = tikerData?.symbol;
  const [currentItem, setCurrentItem] = useState("");
  const lastPrice = parseFloat(tikerData?.lastPrice).toString();

  const navigate = useNavigate();

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
      <Socket searchQuery={currencySymbol} />
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
                <img src="public/bitzup_light_logo.png" className="h-10 w-36" />
              ) : (
                <img src="public/bitzup_dark_logo.png" className="h-10 w-36" />
              )}
            </div>
            {[
              "Buy Crpto",
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
        <div className=" justify-between w-[100%]  lg:flex hidden gap-1">
          <div className=" flex flex-col lg:w-full w-[78%] items-center gap-1 arr ">
            <TopIconBar1 dark={dark} />
            <TopIconBar2 dark={dark} />

            <div className="flex  justify-between w-full gap-1">
              <div
                className={`w-[35%] lg:block  transition-all duration-500 delay-100  hidden ${
                  isOpen ? "h-[72.2rem]" : "h-[67.2rem]"
                }`}
                id="c"
              >
                <Order
                  dark={dark}
                  searchQuery={currencySymbol}
                  symbol={symbol}
                  lastPrice={lastPrice}
                />
              </div>
              <div className="flex flex-col  w-[100%] gap-1">
                <div
                  className={`${
                    dark ? "bg-[#181A20] " : "bg-white "
                  } max-h-[800px]   text-xs w-full`}
                >
                  <div className="h-[624px] w-full rounded-lg">
                    <ChartEmbed searchQuery={currencySymbol} className="w-full" />
                  </div>
                </div>
                <div className="w-full ">
                  <Form dark={dark} searchQuery={currencySymbol} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[22%]  lg:flex hidden flex-col gap-1">
            <MarketCom
              dark={dark}
              SetSearchQuery={setSearchQuery}
              setSearchParams={setSearchParams}
              searchQuery={currencySymbol}
              symbol={symbol}
            />
            <div
              className={`[26rem] flex flex-col  rounded-lg items-end ${
                dark ? "bg-[#181A20] text-white" : "bg-white text-black w-full"
              }  `}
            >
              <TopMovers dark={dark} SetSearchQuery={setSearchQuery} setSearchParams={setSearchParams} />
            </div>
          </div>
        </div>
        <div
          className={`lg:block hidden h-full w-full ${
            dark ? " bg-[#181A20]" : " bg-white "
          } `}
        >
          <OpenOrders dark={dark} />
        </div>
        <div className="lg:hidden flex flex-col w-full ">
          <TopIconBar3 dark={dark} />
          <div className="w-full md:flex hidden pb-2 gap-1">
            <div className="w-[69%]">
              <div className="h-[400px]  text-xs w-full bg-gray-800 mb-4 rounded-md ">
                <ChartEmbed
                  searchQuery={currencySymbol}
                  className="h-full w-full"
                />
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
                searchQuery={currencySymbol}
                setActive={setActive}
                close={false}
              />
            </div>
          </div>
          <div className="md:hidden w-full">
            <div className="h-[800px]  text-xs w-full   rounded-md ">
              <TopIconBar4 dark={dark} />
              <ChartEmbed searchQuery={currencySymbol} className="h-full w-full" />
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
                searchQuery={currencySymbol}
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
