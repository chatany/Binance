import { useEffect, useState } from "react";
import { Order } from "./Order";
import { MarketCom } from "./market";
import { Form } from "./form";
import MobileSidebar from "./sidebar";
import { ChartEmbed } from "./chart";
import TopMovers from "./move";
import {
  TopIconBar1,
  TopIconBar2,
  TopIconBar3,
  TopIconBar4,
} from "./TopIconBars";
import { Socket } from "./Socket";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToggleButSell } from "./ToggleBuySell";
import { OpenOrders } from "../common/openOrders";
import { Middle } from "./MiddleCom";
import { TopNav } from "./TopNavBar";
import { MarketPopup } from "./marketPopup";
import { Funds } from "./funds";
export const Home = () => {
  const [dark, setDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : true; // default true
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  const isOpen = useSelector((state) => state.counter.open);
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState("Spot");
  const navigate = useNavigate();
  const { symbol } = useParams();
  const [searchQuery, setSearchQuery] = useState(symbol || "BTCUSDT");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [activeItem, setActiveItem] = useState("Buy");
  const [openMarketPopup, setOpenMarketPopup] = useState(false);
  
  const [show, setShow] = useState(false);
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
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  useEffect(() => {
    if (isLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLogin]);

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
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#EAECEF] text-[#262030]"}
       min-h-screen flex flex-col gap-0  `}
      >
        {/* Top Navbar */}
        <TopNav
          dark={dark}
          setDark={setDark}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          show={show}
          setShow={setShow}
        />
        {/* Main Content */}
        <div className="w-full flex flex-col items-center gap-1 justify-between p-[4px_4px_4px_4px]">
          <div className="max-w-[1528px] overflow-hidden w-full lg:flex hidden gap-1.5">
            <div className=" flex flex-col w-full items-center gap-1.5 ">
              <TopIconBar1 dark={dark} />
              <TopIconBar2 dark={dark} />

              <div className="flex w-full gap-1.5">
                <div
                  className={`xl:max-w-[320px] max-w-[250px] w-full lg:block  transition-all duration-500 delay-100  hidden ${
                    isOpen ? "h-[60.1rem]" : "h-[56.8rem]"
                  }`}
                >
                  <Order dark={dark} />
                </div>
                <div className="flex flex-col  w-full gap-1">
                  <div
                    className={`${
                      dark ? "bg-[#181A20] " : "bg-white "
                    } max-h-[800px]   text-xs w-full`}
                  >
                    <div className="h-[500px] w-full rounded-lg">
                      <ChartEmbed searchQuery={symbol} className="w-full" />
                    </div>
                  </div>
                  <div className="w-full">
                    <Form dark={dark} searchQuery={searchQuery} />
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:max-w-[320px] max-w-[250px] w-full lg:flex hidden flex-col gap-1">
              <MarketCom
                dark={dark}
                SetSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
              <div
                className={`[26rem] flex flex-col  rounded-lg items-end ${
                  dark
                    ? "bg-[#181A20] text-white"
                    : "bg-white text-black w-full"
                }  `}
              >
                <TopMovers
                  dark={dark}
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                />
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
        <div className="lg:hidden flex flex-col w-full p-[0px_4px_4px_4px] ">
          <TopIconBar3 dark={dark} />
          <div className="w-full md:flex hidden pb-2 gap-1">
            <div className="w-[67%] flex flex-col gap-2 p-1">
              <div className="h-[400px]  text-xs w-full bg-gray-800  rounded-md ">
                <ChartEmbed
                  searchQuery={symbol}
                  className="h-full w-full rounded-2xl"
                />
              </div>
              <div className="h-[25rem]">
                <Middle dark={dark} />
              </div>
              <OpenOrders dark={dark} />
            </div>
            <div
              className={`${
                dark ? "bg-[#181A20]" : "bg-white"
              } w-[33%] space-y-6 P-3 rounded-lg`}
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
          <div
            className={`md:hidden w-full   ${
              dark ? "bg-[#181A20] " : "bg-white"
            } `}
          >
            <div className=" text-xs w-full   rounded-md ">
              <TopIconBar4
                dark={dark}
                setOpenMarketPopup={setOpenMarketPopup}
              />
              <div className="h-[400px] w-full">
                <ChartEmbed searchQuery={symbol} />
              </div>
              <Funds dark={dark} />
            </div>
          </div>
        </div>
        <div
          className={`md:hidden ${
            dark ? "bg-[#181A20] " : "bg-white"
          } w-full fixed bottom-0 z-30 flex  justify-center gap-2 text-white p-5 rounded-[43px,4px,3px,1px] `}
        >
          <div
            onClick={() => {
              userData?.token ? setIsLogin(!isLogin) : navigate("/login");
            }}
            className="w-[50%] flex justify-center bg-[#F6465D] hover:bg-[#c74052] rounded-md h-[2.5rem] cursor-pointer"
          >
            <button>{userData?.token ? "Sell" : " Log In"}</button>
          </div>
          <div
            onClick={() => {
              userData?.token ? setIsLogin(!isLogin) : navigate("/login");
            }}
            className="w-[50%]  flex justify-center bg-[#0ECB81] hover:bg-[#0e9e67] rounded-md h-[2.5rem] cursor-pointer"
          >
            <button>{userData?.token ? "Buy" : " Log In"}</button>
          </div>
        </div>
        {isLogin && (
          <div className="fixed inset-0 z-40 bg-[#00000080] overflow-hidden">
            <div
              className={`md:hidden ${
                dark ? "bg-[#181E25]" : "bg-white"
              } w-full fixed bottom-0 z-50 flex justify-center gap-2 text-white rounded-[43px_4px_3px_1px] h-[90%]`}
            >
              <ToggleButSell
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                dark={dark}
                active={active}
                searchQuery={symbol}
                setActive={setActive}
                handleClose={() => setIsLogin(false)}
              />
            </div>
          </div>
        )}
        {openMarketPopup && (
          <div>
            <MarketPopup
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              dark={dark}
              handleClose={() => setOpenMarketPopup(false)}
              openMarketPopup={openMarketPopup}
            />
          </div>
        )}
      </div>
    </>
  );
};
