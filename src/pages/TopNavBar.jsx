import { CiSearch } from "react-icons/ci";
import { FaAngleDown, FaBalanceScale, FaQuestion } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoDownloadOutline, IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { data } from "../Constant";
import { useEffect, useRef, useState } from "react";
import { HelpCenter } from "./helpCenter";
import { useDispatch } from "react-redux";
import { helpCenterApi } from "./apiCall";
import { SidePopup } from "./sidePopup";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const TopNav = ({
  dark,
  setDark,
  searchQuery,
  setSearchQuery,
  show,
  setShow,
}) => {
  const navigate = useNavigate();
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };
  const handleTheme = () => {
    setDark(!dark);
  };
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || {};
  });
  const [currentItem, setCurrentItem] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    helpCenterApi(dispatch);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("userDataChanged"));
    setUserData({});
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(JSON.parse(localStorage.getItem("userData")) || {});
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataChanged", handleStorageChange); // 👈 this handles same-tab change

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataChanged", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`flex  justify-between items-center border-b-1 h-[4rem] ${
        dark ? "border-[#2B3139]" : "border-[#EAECEF]"
      } w-[100vw]  p-3 ${
        dark ? "bg-[#181A20] text-[#EAECEF] " : "bg-white text-black "
      }`}
    >
      <div className="flex xl:w-[60%] items-center text-lg gap-2 font-semibold leading-6 lg:justify-evenly">
        <div className="text-amber-400 font-semibold text-xl">
          {dark ? (
            <img src="/bitzup_light_logo.png" className="h-10 w-30 sm:w-36" />
          ) : (
            <img src="/bitzup_dark_logo.png" className="h-10 w-30 sm:w-36" />
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
        <CiSearch
          className="hover:text-amber-400  h-6 w-6 md:block hidden"
          onClick={() => setShowSideBar(true)}
        />
        {showSideBar && (
          <div>
            <SidePopup
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              dark={dark}
              handleClose={() => setShowSideBar(false)}
              showSideBar={showSideBar}
            />
          </div>
        )}
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
        <div className="relative">
          <IoDownloadOutline
            className="hover:text-amber-400 h-6 w-6 md:flex hidden"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          />
          {showPopup && (
            <div
              className={`absolute ${
                dark
                  ? "bg-[#1E2329] border-gray-700 text-white "
                  : "bg-white  text-black border-gray-200 "
              } z-50 rounded-[12px] -right-12 p- h-[180px] w-[180px] text-[12px] top-10 flex flex-col gap-2 justify-center items-center p-5`}
              style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.40)" }}
            >
              <img src="/qr.png" className="h-[80%] w-[80%]" />
              <div>scan to download app</div>
            </div>
          )}
        </div>
        <div onClick={handleClose} className=" md:hidden flex">
          <RxHamburgerMenu
            className="hover:text-amber-400 h-6 w-6 md:hidden flex"
            // onClick={handleClose}
          />
        </div>
        <div>
          <FaQuestion
            className="hover:text-amber-400  h-6 w-6 md:flex hidden"
            onClick={() => setShowHelpPopup(true)}
          />
          {showHelpPopup && (
            <div>
              <HelpCenter
                dark={dark}
                showHelpPopup={showHelpPopup}
                setShowHelpPopup={() => setShowHelpPopup(false)}
              />
            </div>
          )}
        </div>
        <IoMdSettings className="hover:text-amber-400  h-6 w-6" />
        <RiLogoutBoxRLine
          className="hover:text-amber-400  h-6 w-6"
          onClick={handleLogout}
        />
        {dark ? (
          <IoSunnyOutline
            className="hover:text-amber-400 sm:flex hidden  h-6 w-6"
            onClick={handleTheme}
          />
        ) : (
          <MdDarkMode
            className="hover:text-amber-400 sm:flex hidden h-6 w-6 md:h-6 md:w-6"
            onClick={handleTheme}
          />
        )}
      </div>
    </div>
  );
};
