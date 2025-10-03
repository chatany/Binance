import { CiAirportSign1, CiAlarmOff, CiSearch } from "react-icons/ci";
import { FaAngleDown, FaBalanceScale, FaQuestion } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoDownloadOutline, IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { data, MenuItem } from "../../Constant";
import { useEffect, useRef, useState } from "react";
import { HelpCenter } from "../Help/helpCenter";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { HiDownload } from "react-icons/hi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ConfirmationBox } from "../../common/DeletePopup";
import { Tooltip } from "@mui/material";
import {
  setBalance,
  setDark,
  setFundData,
  setSearchQuery,
  setShow,
} from "../../store/webSocket";
import { useAuth } from "../../hooks/useAuth";
import { BsMoon } from "react-icons/bs";
import { DepositPopup } from "../Deposit & WithDraw/Deposit/depositPopup";
import { SidePopup } from "../Market/sidePopup";

export const TopNav = () => {
  const navigate = useNavigate();
  const dark = useSelector((state) => state.counter.dark);
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const helpCenter = useSelector((state) => state.counter.helpCenter);
  const userProfile = useSelector((state) => state.counter.userProfile);
  const last = JSON.parse(localStorage.getItem("lastPair"));
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleClose = () => {
    dispatch(setShow(true));
  };
  const handleTheme = () => {
    dispatch(setDark(!dark));
  };
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || {};
  });
  const [currentItem, setCurrentItem] = useState("");
  const token = useAuth();
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, width: 0 });
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(setBalance({}));
      dispatch(setFundData({}));
    }
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("userDataChanged"));
    setUserData({});
    setShowLogoutPopup(false);
    dispatch(setBalance({}));
    dispatch(setFundData({}));
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogoutPopup(false);
      }
    };

    if (showLogoutPopup || profile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showLogoutPopup, profile]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`flex  justify-between items-center md:border-b-1 h-[4rem] ${
        dark ? "md:border-[#2B3139]" : "md:border-[#EAECEF]"
      } w-[100vw]  p-3 ${
        dark ? "bg-[#181A20] text-[#EAECEF] " : "bg-white text-black "
      }`}
    >
      <div className="flex xl:w-[60%] items-center text-lg gap-2 font-semibold leading-6 lg:justify-evenly">
        <div
          className="text-[#2EDBAD] font-semibold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          {dark ? (
            <img
              src="/bitzup_light_logo.png"
              className="h-10 w-full max-w-[120px]"
              alt="logo"
            />
          ) : (
            <img
              src="/bitzup_dark_logo.png"
              className="h-10 w-full max-w-[120px]"
              alt="logo"
            />
          )}
        </div>
        {["Buy Crypto", "Markets", "Trade", "Futures", "Earn", "More"].map(
          (item, i) => (
            <div
              key={i}
              className="hover:text-[#2EDBAD] text-[14px] lg:flex hidden items-center gap-1 cursor-pointer relative  "
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
              onClick={() => {
                i == 0 || i == 1 ? navigate("/spot") : "";
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
          )
        )}
        {hoveredItemIndex !== null &&
          hoveredItemIndex !== 0 &&
          hoveredItemIndex !== 1 && (
            <div
              className={`absolute max-w-[40rem]  border-1 ${
                dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
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
                                      onClick={() => {
                                        navigate(val.path);
                                      }}
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
                                  onClick={() => navigate(ele.path)}
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
      <div className="flex md:gap-5 gap-2 lg:gap-4 items-center  md:mt-0 justify-between lg:pr-10 pr-4 cursor-pointer ">
        <Tooltip
          title="Search Bar"
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: dark ? "#EAECEF" : "#000000",
                color: dark ? "#0B0E11" : "#FAFAFA",
              },
            },
            arrow: {
              sx: {
                color: dark ? "#EAECEF" : "#000000",
              },
            },
          }}
        >
          <CiSearch
            className="hover:text-[#2EDBAD]  h-6 w-6 md:block hidden"
            onClick={() => setShowSideBar(true)}
          />
        </Tooltip>
        {userData?.token && (
          <div
            className=" text-[14px] font-medium leading-6 hover:opacity-85 items-center text-black bg-[#2EDBAD] rounded-sm px-2 py-1 flex"
            onClick={() => setPopup(!popup)}
          >
            <HiDownload className="h-4 w-4 md:block hidden hover:text-[#2EDBAD]" />
            Deposit
          </div>
        )}
        {userData?.token && (
          <div
            className="relative flex items-center gap-4"
            onMouseEnter={() => !isMobile && setProfile(!profile)}
            onMouseLeave={() => !isMobile && setProfile(!profile)}
            onClick={() => setProfile(true)}
            onDoubleClick={() => navigate("/dashboard")}
          >
            <CgProfile
              className=" hover:text-[#2EDBAD] h-6 w-6"
              // onClick={() => setProfile(!profile)}
            />
            {profile && !isMobile && (
              <div
                className={`absolute w-[268px] ${
                  dark ? "bg-[#1E2329]" : "bg-[#ffffff]"
                } top-6 sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] right-0 z-50 rounded-xl`}
              >
                <div onMouseLeave={() => setProfile(!profile)}>
                  <div className="flex gap-2 items-center p-[10px_20px_10px_20px] ">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img src="/Avatar.png" />
                    </div>
                    <div>
                      <div className="break-all font-normal text-[12px]">
                        {userProfile?.email}
                      </div>
                      <div className="text-[11px] p-1 bg-">Regular User</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {MenuItem.map((item, index) => (
                      <div
                        className={`flex items-center ${
                          dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                        } p-[10px_20px_10px_20px] gap-2 ${
                          index === MenuItem?.length - 1
                            ? dark
                              ? "border-[#333B47] border-t-1 rounded-b-xl"
                              : "border-[#EDEDED] border-t-1 rounded-b-xl"
                            : ""
                        } `}
                        key={index}
                        onClick={() => navigate(item?.path)}
                      >
                        <div>{item?.icon}</div>
                        <div>{item?.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {isMobile && profile && (
              <div
                className={`fixed inset-0 z-50 ${
                  dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
                }  w-full h-full overflow-y-auto p-4`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">My Account</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfile(false);
                    }}
                  >
                    ✖
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img src="/Avatar.png" />
                  </div>
                  <div className="flex flex-col">
                    <div>{userProfile?.name}</div>
                  </div>
                </div>
                {MenuItem.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                    } p-3 gap-2 rounded-lg`}
                    onClick={() => {
                      setProfile(false);
                      navigate(item?.path);
                    }}
                  >
                    <div>{item?.icon}</div>
                    <div>{item?.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {showSideBar && (
          <div>
            <SidePopup
              setSearchQuery={(val) => dispatch(setSearchQuery(val))}
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
              className={`hover:text-gray-400 rounded-sm text-[14px] md:flex hidden font-semibold ${
                dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
              }  leading-6 px-2 py-1 `}
              onClick={() => navigate("/login")}
            >
              Log In
            </div>
            <div
              className=" text-[14px] font-medium leading-6 hover:opacity-85 text-black bg-[#2EDBAD] rounded-sm px-2 py-1"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </div>
          </>
        )}
        <div className="relative">
          <IoDownloadOutline
            className="hover:text-[#2EDBAD] h-6 w-6 md:flex hidden"
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
              <img src="/qr.png" className="h-[80%] w-[80%]" alt="qr_img" />
              <div>scan to download app</div>
            </div>
          )}
        </div>
        <div onClick={handleClose} className=" md:hidden flex">
          <Tooltip
            title="Menu"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: dark ? "#EAECEF" : "#000000",
                  color: dark ? "#0B0E11" : "#FAFAFA",
                },
              },
              arrow: {
                sx: {
                  color: dark ? "#EAECEF" : "#000000",
                },
              },
            }}
          >
            <RxHamburgerMenu
              className="hover:text-[#2EDBAD] h-6 w-6 md:hidden flex"
              // onClick={handleClose}
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip
            title="Help Center"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: dark ? "#EAECEF" : "#000000",
                  color: dark ? "#0B0E11" : "#FAFAFA",
                },
              },
              arrow: {
                sx: {
                  color: dark ? "#EAECEF" : "#000000",
                },
              },
            }}
          >
            <FaQuestion
              className="hover:text-[#2EDBAD]  h-6 w-6 md:flex hidden"
              onClick={() => setShowHelpPopup(true)}
            />
          </Tooltip>
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
        {/* <IoMdSettings className="hover:text-amber-400  h-6 w-6" /> */}
        {userData?.token && (
          <Tooltip
            title="Logout"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: dark ? "#EAECEF" : "#000000",
                  color: dark ? "#0B0E11" : "#FAFAFA",
                },
              },
              arrow: {
                sx: {
                  color: dark ? "#EAECEF" : "#000000",
                },
              },
            }}
          >
            <RiLogoutBoxRLine
              className="hover:text-[#2EDBAD]  h-6 w-6"
              onClick={() => {
                setShowLogoutPopup(true);
              }}
            />
          </Tooltip>
        )}
        {dark ? (
          <Tooltip
            title="Theme"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: dark ? "#EAECEF" : "#000000",
                  color: dark ? "#0B0E11" : "#FAFAFA",
                },
              },
              arrow: {
                sx: {
                  color: dark ? "#EAECEF" : "#000000",
                },
              },
            }}
          >
            <IoSunnyOutline
              className="hover:text-[#2EDBAD] sm:flex hidden  h-6 w-6"
              onClick={handleTheme}
            />
          </Tooltip>
        ) : (
          <Tooltip
            title="Theme"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: dark ? "#EAECEF" : "#000000",
                  color: dark ? "#0B0E11" : "#FAFAFA",
                },
              },
              arrow: {
                sx: {
                  color: dark ? "#EAECEF" : "#000000",
                },
              },
            }}
          >
            <BsMoon
              className="hover:text-[#2EDBAD] sm:flex hidden h-6 w-6 md:h-6 md:w-6"
              onClick={handleTheme}
            />
          </Tooltip>
        )}
      </div>
      {showLogoutPopup && (
        <ConfirmationBox
          handleCancel={() => setShowLogoutPopup(false)}
          handleSubmit={() => handleLogout()}
          message={"Are you Sure you want to Logout?"}
          dark={dark}
        />
      )}
      {popup && <DepositPopup popup={popup} setPopup={setPopup} />}
    </div>
  );
};
