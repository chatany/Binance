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
import { useNavigate } from "react-router-dom";
import { Progressbar } from "../common/CircularBar";
let val;
export const Home = () => {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("Open Orders");
  const isOpen = useSelector((state) => state.counter.open);
  const { openOrder, orderHistory } = useSelector((state) => state.counter);
  const [active, setActive] = useState("Sport");
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const [searchQuery, SetSearchQuery] = useState("BTCUSDT");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const [activeItem, setActiveItem] = useState("Buy");
  console.log(orderHistory, "orderHistory");

  const [show, setShow] = useState(false);
  const handleTheme = () => {
    setDark(!dark);
  };
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
    // TikerData({ setTikerData, searchQuery });
    OrderHistory(dispatch);
  }, [searchQuery]);

  const symbol = tikerData?.symbol;
  const [currentItem, setCurrentItem] = useState("");
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
                  <Form dark={dark} searchQuery={searchQuery} />
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
              className={`[26rem] flex flex-col  rounded-lg items-end ${
                dark ? "bg-[#181A20] text-white" : "bg-white text-black w-full"
              }  `}
            >
              <TopMovers dark={dark} SetSearchQuery={SetSearchQuery} />
            </div>
          </div>
        </div>
        <div
          className={`lg:block hidden h-full w-full ${
            dark ? " bg-[#181A20]" : " bg-white "
          } `}
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
          <div className="h-[600px] w-full overflow-y-auto  text-[12px] leading-4 flex-nowrap font-medium">
            {userData?.token ? (
              <>
                {" "}
                {activeTab === "Open Orders" && (
                  <>
                    {/* {Array.isArray(openOrder) && openOrder?.length > 0 ? (
                      <div className="p-5 ">
                        {Array.isArray(openOrder) &&
                          openOrder?.map((item, index) => {
                            const date = formatDate(item?.created_at);
                            const percentage =
                              (item?.executed_base_quantity /
                                item?.base_quantity) *
                              100;
                            return (
                              <div
                                className="flex justify-between p-3 border-b-1"
                                key={index}
                              >
                                <div className="flex gap-10">
                                  <div className="flex flex-col gap-2 justify-center items-center">
                                    <div>
                                      {item?.order_type}/{item?.type}
                                    </div>
                                    <div className="h-14 w-14 rounded-full">
                                      <Progressbar value={percentage} />
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between">
                                    <div>BTCUSDT</div>
                                    <div className="flex gap-4">
                                      <div className="flex flex-col gap-2">
                                        <div>Amount</div>
                                        <div>price</div>
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <div>{item?.base_quantity}</div>
                                        <div>{item?.order_price}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                  <div>{date}</div>
                                  <div className="justify-end flex">
                                    <FaRegEdit />
                                  </div>
                                  <div className="flex justify-end">Cancel</div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-full w-full">
                        No Data found
                      </div>
                    )} */}
                    {/*  {
            "user_id": "UA8FCF45E1D0",
            "order_id": "UA8FCF45E1D0-204FA1E2C",
            "pair_id": 5,
            "type": "BUY",
            "order_type": "LIMIT",
            "base_quantity": "0.00009",
            "quote_quantity": "10.6558506",
            "order_price": "118398.34",
            "stop_limit_price": "0",
            "oco_stop_limit_price": null,
            "executed_base_quantity": "0",
            "executed_quote_quantity": "0",
            "status": "NEW",
            "created_at": "2025-07-17T05:43:04.000Z",
            "updated_at": null
        } */}
                    <div className="w-full p-0">
                      <table className="w-full">
                        <thead className="h-[3rem]">
                          <tr className="">
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Date
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Pair
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Type
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              side
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              price
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              amount
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              status
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              cancel
                            </th>
                          </tr>
                        </thead>
                        {Array.isArray(openOrder) && openOrder?.length > 0 ? (
                          <tbody>
                            {Array.isArray(openOrder) &&
                              openOrder?.map((item, index) => {
                                const date = formatDate(item?.created_at);
                                const percentage =
                                  (item?.executed_base_quantity /
                                    item?.base_quantity) *
                                  100;
                                return (
                                  <tr key={index}>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize ">
                                      {date}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center uppercase">
                                      {"BtcUsdt"}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      {item?.order_type}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      {item?.type}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      {item?.order_price}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      {item?.base_quantity}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      {item?.status}
                                    </td>
                                    <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                      cancel
                                    </td>
                                  </tr>
                                );
                              })}
                            {/* <tr>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              10-7-25
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"BtcUsdt"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"Limit"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"Buy"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"118273.01"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"0.00082"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"New"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              cancel
                            </td>
                          </tr> */}
                          </tbody>
                        ) : (
                          <tbody>
                            <tr>
                              <td
                                colSpan={8}
                                rowSpan={6}
                                className="text-center text-sm py-4"
                              >
                                <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
                                  No Data found
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </>
                )}
                {activeTab === "Order History" && (
                  <>
                    {/*   {
            "fee_symbol": "BTC",
            "id": 221,
            "fee_currency": "BTC7B97123",
            "pair_symbol": "BTCUSDT",
            "type": "BUY",
            "stop_limit_price": "0",
            "order_price": "118755.11",
            "base_quantity": "0.00012",
            "quote_quantity": "0",
            "executed_quote_quantity": "14.2506132",
            "final_amount": "0.00011988",
            "executed_base_quantity": "0.00012",
            "status": "FILLED",
            "order_type": "LIMIT",
            "fees": "1.2e-7",
            "date_time": "2025-07-16T10:57:50.000Z",
            "order_id": "UA8FCF45E1D0-6CA1D2237"
        } */}
                    {/* {
                      <div className="p-5 h-full">
                        {Array.isArray(orderHistory) &&
                          orderHistory?.map((item, index) => {
                            const date = formatDate(item?.date_time);
                            return (
                              <div
                                className="flex justify-between p-5 border-b-2"
                                key={index}
                              >
                                <div className="flex flex-col justify-between gap-3">
                                  <div className="flex flex-col gap-1">
                                    <div>{item?.pair_symbol}</div>
                                    <div>
                                      {item?.order_type}/{item?.type}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div>Amount</div>
                                    <div>Price</div>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between gap-3">
                                  <div className="flex flex-col gap-1">
                                    <div>{date}</div>
                                    <div>{item?.status}</div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div>
                                      {item?.executed_base_quantity}/
                                      {item?.base_quantity}
                                    </div>
                                    <div>{item?.order_price}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    } */}
                    <div>
                      <table className="w-full">
                        <thead className="h-[3rem]">
                          <tr className="">
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Date
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Pair
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              Type
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              side
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              price
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              amount
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              status
                            </th>
                            <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize">
                              cancel
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                         {Array.isArray(orderHistory) && orderHistory?.length > 0 ? (
                          <>

                          {Array.isArray(orderHistory) &&
                            orderHistory?.map((item, index) => {
                              const date = formatDate(item?.date_time);
                              const percentage =
                                (item?.executed_base_quantity /
                                  item?.base_quantity) *
                                100;
                              return (
                                <tr key={index}>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize ">
                                    {date}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center  uppercase">
                                    {"btcusdt"}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    {item?.order_type}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    {item?.type}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    {item?.order_price}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    {item?.base_quantity}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    {item?.status}
                                  </td>
                                  <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                    cancel
                                  </td>
                                </tr>
                              );
                            })}
                            </>):(<tr>
                              <td
                                colSpan={8}
                                rowSpan={6}
                                className="text-center text-sm py-4"
                              >
                                <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
                                  No Data found
                                </div>
                              </td>
                            </tr>)
                         }
                          {/* <tr>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              10-7-25
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"BtcUsdt"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"Limit"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"Buy"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"118273.01"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"0.00082"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              {"New"}
                            </td>
                            <td className="text-[12px] pl-1 pr-1 p-[4px] text-center capitalize">
                              cancel
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            ) : (
              <button className="flex  items-center ">
                <pre className="text-yellow-500">Log In </pre>
                or
                <pre className="text-yellow-500"> Register Now </pre>
                to trade
              </button>
            )}
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
