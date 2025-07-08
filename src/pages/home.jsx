import React, { useEffect, useState } from "react";
import { CiSearch, CiStar } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { FaQuestion, FaAngleDown, FaAngleRight } from "react-icons/fa";
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
  marketArr,
  marks,
  orderArr,
  priceArr,
  supportOptions,
  tab,
  tabs,
} from "../Constant";
import { ChartEmbed } from "./chart";
import { fetchData, TikerData } from "./apiCall";
import TopMovers from "./move";
import {
  TopIconBar1,
  TopIconBar2,
  TopIconBar3,
  TopIconBar4,
} from "./TopIconBars";
import { Socket } from "./Socket";
import { useSelector } from "react-redux";
let val;
export const Home = () => {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("Open Orders (0)");
  const isOpen = useSelector((state) => state.counter.open);
  const [active, setActive] = useState("Sport");
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const [searchQuery, SetSearchQuery] = useState("BTCUSDT");

  const [activeItem, setActiveItem] = useState("Buy");

  const [show, setShow] = useState(false);
  const handleTheme = () => {
    setDark(!dark);
  };
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
    TikerData({ setTikerData, searchQuery });
  }, [searchQuery]);
  const symbol = tikerData?.symbol;
  const lastPrice = parseFloat(tikerData?.lastPrice).toString();
  const CustomSlider = styled(Slider)(({ theme }) => ({
    height: "1px",
    color: "#fff",

    "& .MuiSlider-rail": {
      opacity: 1,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      height: "2px",
    },
    "& .MuiSlider-track": {
      backgroundColor: `${dark ? "gray" : "gray"}`,
      height: "3px",
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
    },
    "& .MuiSlider-mark": {
      width: 8,
      height: 8,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      border: "1px solid black",
      transform: "rotate(45deg)",
      marginTop: -4,
      marginLeft: -5,
    },
    "& .MuiSlider-markActive": {
      border: `4px solid ${dark ? "rgb(245, 245, 245)" : "black"}`,
      width: 14,
      height: 14,
      marginTop: -7,
      marginLeft: -6,
    },
    "& .MuiSlider-valueLabel": {
      display: "none",
    },
    "& .MuiSlider-markLabel": {
      display: "none",
      color: `${dark ? "#ffffff" : "#000000"}`,
      fontSize: "14px",
    },
  }));

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5120 1024"
                class="lg:h-6 h-5"
                fill="currentColor"
                data-label="svg.header-logo"
              >
                <path
                  d="M230.997333 512L116.053333 626.986667 0 512l116.010667-116.010667L230.997333 512zM512 230.997333l197.973333 197.973334 116.053334-115.968L512 0 197.973333 314.026667l116.053334 115.968L512 230.997333z m395.989333 164.992L793.002667 512l116.010666 116.010667L1024.981333 512l-116.992-116.010667zM512 793.002667l-197.973333-198.997334-116.053334 116.010667L512 1024l314.026667-314.026667-116.053334-115.968L512 793.002667z m0-165.973334l116.010667-116.053333L512 396.032 395.989333 512 512 626.986667z m1220.010667 11.946667v-1.962667c0-75.008-40.021333-113.024-105.002667-138.026666 39.978667-21.973333 73.984-58.026667 73.984-121.002667v-1.962667c0-88.021333-70.997333-145.024-185.002667-145.024h-260.992v561.024h267.008c126.976 0.981333 210.005333-51.029333 210.005334-153.002666z m-154.026667-239.957333c0 41.984-34.005333 58.965333-89.002667 58.965333h-113.962666V338.986667h121.984c52.010667 0 80.981333 20.992 80.981333 58.026666v2.005334z m31.018667 224c0 41.984-32.981333 61.013333-87.04 61.013333h-146.944v-123.050667h142.976c63.018667 0 91.008 23.04 91.008 61.013334v1.024z m381.994666 169.984V230.997333h-123.989333v561.024h123.989333v0.981334z m664.021334 0V230.997333h-122.026667v346.026667l-262.997333-346.026667h-114.005334v561.024h122.026667v-356.010666l272 356.992h104.96z m683.946666 0L3098.026667 228.010667h-113.962667l-241.024 564.992h127.018667l50.986666-125.994667h237.013334l50.986666 125.994667h130.005334z m-224.981333-235.008h-148.992l75.008-181.973334 73.984 181.973334z m814.037333 235.008V230.997333h-122.026666v346.026667l-262.997334-346.026667h-114.005333v561.024h122.026667v-356.010666l272 356.992h104.96z m636.970667-91.008l-78.976-78.976c-44.032 39.978667-83.029333 65.962667-148.010667 65.962666-96 0-162.986667-80-162.986666-176v-2.986666c0-96 67.968-174.976 162.986666-174.976 55.978667 0 100.010667 23.978667 144 62.976l78.976-91.008c-51.968-50.986667-114.986667-86.997333-220.970666-86.997334-171.989333 0-292.992 130.986667-292.992 290.005334V512c0 160.981333 122.965333 288.981333 288 288.981333 107.989333 1.024 171.989333-36.992 229.973333-98.986666z m527.018667 91.008v-109.994667h-305.024v-118.016h265.002666v-109.994667h-265.002666V340.992h301.013333V230.997333h-422.997333v561.024h427.008v0.981334z"
                  p-id="2935"
                  class=""
                ></path>
              </svg>
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
                  className={`absolute w-[30rem]  border-1 ${
                    dark ? "bg-[#161A1E] text-white" : "bg-white text-black"
                  }  opacity-95  ${
                    dark ? "border-[#2B3139]" : "border-[#EAECEF]"
                  }   p-2  shadow-lg rounded-md  z-50 hidden lg:block transition-all duration-200`}
                  style={{
                    top: `${hoverPosition.y + 5}px`,
                    left: `${hoverPosition.x}px`,
                  }}
                  onMouseLeave={() => setHoveredItemIndex(null)}
                  onMouseEnter={() => setHoveredItemIndex(hoveredItemIndex)}
                >
                  {supportOptions.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${
                        dark ? "hover:bg-[#161A1E]" : "hover:bg-gray-100"
                      } flex items-start gap-3 px-4 py-3  cursor-pointer`}
                    >
                      <div className="text-xl">{item.icon}</div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm ">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Right Navbar */}
          <div className="flex md:gap-5 gap-2 lg:gap-3 items-center  md:mt-0 justify-between lg:pr-10 pr-4 cursor-pointer ">
            <CiSearch className="hover:text-amber-400  h-6 w-6 lg:block hidden" />
            <div className="hover:text-gray-400 text-[14px] md:flex hidden font-extrabold  leading-6">
              Log In
            </div>
            <div className=" text-[14px] font-medium leading-6 hover:opacity-85 text-black bg-[#fcd535] rounded-sm px-2 py-1">
              Sign Up
            </div>
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
          <div className=" flex flex-col lg:w-full w-[78%] items-center gap-1 ">
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
                  searchQuery={searchQuery}
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
                  <div className="h-full w-full rounded-lg">
                    <ChartEmbed searchQuery={searchQuery} className="w-full" />
                  </div>
                </div>
                <div className="w-full ">
                  <Form dark={dark} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[22%]  lg:flex hidden flex-col gap-1">
            <MarketCom
              dark={dark}
              SetSearchQuery={SetSearchQuery}
              searchQuery={searchQuery}
              symbol={symbol}
            />
            <div
              className={`max-h-[24rem] flex flex-col  rounded-lg items-end ${
                dark ? "bg-[#181A20] text-white" : "bg-white text-black w-full"
              }  `}
            >
              <TopMovers dark={dark} />
            </div>
          </div>
        </div>
        <div
          className={`lg:block hidden w-full ${
            dark ? " bg-[#181A20]" : " bg-white "
          } h-[600px]`}
        >
          <div
            className={`${
              dark
                ? " bg-[#181A20] border-[#2B3139]"
                : "border-[#EAECEF] bg-white"
            } border-b-[1px]`}
          >
            <div className="flex   gap-2 items-center text-[14px] leading-4  w-[40%] font-medium p-2 pb-0 ">
              {tabs.map((tab) => (
                <div className="flex flex-col gap-1" key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2 font-medium transition-colors cursor-pointer duration-300 ${
                      activeTab === tab
                        ? "text-yellow-500"
                        : "text-gray-600 hover:text-yellow-500"
                    }`}
                  >
                    {tab}
                  </button>
                  {activeTab === tab && (
                    <div className="flex justify-center w-full">
                      <div className="w-[30%] border-b-2 border-amber-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center text-[12px] leading-4 flex-nowrap font-medium">
            <button className="flex  items-center ">
              <pre className="text-yellow-500">Log In </pre>
              or
              <pre className="text-yellow-500"> Register Now </pre>
              to trade
            </button>
          </div>
        </div>
        <div className="lg:hidden flex flex-col w-full ">
          <TopIconBar3 dark={dark} />
          <div className="w-full md:flex hidden pb-2 gap-1">
            <div className="w-[69%]">
              <div className="h-fit  text-xs w-full bg-gray-800 mb-4 rounded-md ">
                <ChartEmbed
                  searchQuery={searchQuery}
                  className="h-full w-full"
                />
              </div>
              <div className="flex justify-between w-full gap-1">
                <div
                  className={`${
                    dark ? " bg-[#181A20]" : " bg-white"
                  } w-[50%] overflow-x-auto overflow-y-auto max-h-[22rem] rounded-lg`}
                >
                  {" "}
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th
                          className={`${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } text-[12px] text-gray-400 sticky top-0 text-left p-[4px]  z-30`}
                        >
                          Price (USDT)
                        </th>
                        <th
                          className={`${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } text-[12px] text-gray-400  sticky top-0 text-left p-[4px]  z-30`}
                        >
                          Amount (BTC)
                        </th>
                        <th
                          className={`${
                            dark ? "bg-[#181A20]" : "bg-white"
                          } text-[12px] text-gray-400 p-2 sticky top-0 text-left p-[4px]  z-30`}
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketArr.map((item, index) => (
                        <tr key={index}>
                          <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                            {item.price}
                          </td>
                          <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                            {item.amount}
                          </td>
                          <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px]">
                            {item.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`${
                    dark ? "bg-[#181A20]" : "bg-white "
                  } w-[50%] max-h-[22rem]  rounded-lg`}
                >
                  {" "}
                  <div className="w-full ">
                    <div className="flex justify-between w-full">
                      <div className="flex text-[12px] p-2 items-center">
                        <div>
                          <IoMdListBox />
                        </div>
                        <div>
                          <IoMdListBox />
                        </div>
                        <div>
                          <IoMdListBox />
                        </div>
                      </div>
                      <div className="text-[12px] p-5">
                        <FaAngleDown className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="max-h-[9rem] overflow-x-auto overflow-y-auto p-2">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-[12px] text-gray-400 text-left p-1">
                              Price(USDT)
                            </th>
                            <th className="text-[12px] text-gray-400 max-p-2 pr-2 text-left p-1">
                              Amount(BTC)
                            </th>
                            <th className="text-[12px] text-gray-400 max-p-2 pl-4 text-left p-1">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderArr.map((item, index) => (
                            <tr key={index}>
                              <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-1 text-red-700">
                                {item.price}
                              </td>
                              <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                                {item.amout}
                              </td>
                              <td className="lg:text-[12px] text-[.6rem] pl-3 pr-1 p-[4px] ">
                                {item.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="overflow-x-auto overflow-y-auto max-h-[50%]  p-2 ">
                    <table className="w-full">
                      <thead className="w-full">
                        <tr>
                          <th className="text-[12px] text-red-700 text-left  flex items-center p-1">
                            106,135.34
                          </th>
                          <th className="text-[12px]  text-gray-400 text-left p-1">
                            $106,135.34
                          </th>
                          <th className="flex  items-center p-[4px]">
                            <FaAngleRight className=" text-[12px]" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceArr.map((item, index) => (
                          <tr key={index}>
                            <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 text-green-700 p-[4px]">
                              {item.price}
                            </td>
                            <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px]  ">
                              {item.amout}
                            </td>
                            <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] ">
                              {item.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${
                dark ? "bg-[#181A20]" : "bg-white"
              } w-[30%] space-y-6 P-3 rounded-lg`}
            >
              <div className=" flex text-[12px] p-2">
                {tab.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`flex-1 text-center py-2 font-medium transition-colors cursor-pointer duration-300 ${
                      dark
                        ? active === tab
                          ? "text-yellow-500 border-t-2 bg-[#181A20]"
                          : "text-gray-600 hover:text-yellow-500 bg-[#181A20]"
                        : active === tab
                        ? "text-yellow-500 border-t-2 bg-white"
                        : "text-gray-600 hover:text-yellow-500 bg-zinc-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="w-full">
                {" "}
                <BuySellToggle
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                />
              </div>
              <div style={{ padding: "5px" }}>
                <CryptoInput
                  label="Price"
                  unit="USDT"
                  step={0.01}
                  dark={dark}
                  defaultValue="107814.08"
                />
                <CryptoInput
                  label="Amount"
                  unit="BTC"
                  dark={dark}
                  step={0.01}
                  defaultValue={0.01}
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    maxWidth: "100%",
                  }}
                >
                  <CustomSlider
                    defaultValue={0}
                    marks={marks}
                    min={0}
                    max={100}
                    step={null}
                  />
                </Box>
              </Box>
              <div className="flex justify-center items-center">
                <button
                  className={`flex  items-center w-[80%] rounded-sm justify-center ${
                    activeItem === "Buy"
                      ? "bg-[#0ECB81] hover:bg-green-500"
                      : "hover:bg-[#F6465D] bg-[#F6465D]"
                  }  cursor-pointer  h-[2.5rem]`}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden w-full">
            <div className="h-[800px]  text-xs w-full   rounded-md ">
              <TopIconBar4 dark={dark} />
              <ChartEmbed searchQuery={searchQuery} className="h-full w-full" />
            </div>
          </div>
        </div>
        <div
          className={`md:hidden ${
            dark ? "bg-[#181A20] " : "bg-white"
          } w-full fixed bottom-0 z-30 flex  justify-center gap-2 text-white p-5 rounded-[43px,4px,3px,1px] `}
        >
          <div className="w-[50%] flex justify-center bg-[#F6465D] hover:bg-[#c74052] rounded-md h-[2.5rem] cursor-pointer">
            <button>Log In</button>
          </div>
          <div className="w-[50%]  flex justify-center bg-[#0ECB81] hover:bg-[#0e9e67] rounded-md h-[2.5rem] cursor-pointer">
            <button>Log In</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default val;
