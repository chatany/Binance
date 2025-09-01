import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Switch, Tooltip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setShow } from "../store/webSocket";

export default function MobileSidebar() {
  const { dark, show } = useSelector((state) => state.counter);
  const [openMenus, setOpenMenus] = useState({ trade: false, earn: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAuth();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: dark ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: dark ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      borderRadius: 20 / 2,
      backgroundColor: dark ? "#8796A5" : "#aab4be",
    },
  }));
  const handleTheme = (e) => {
    const value = e.target.checked;
    dispatch(setDark(value));
  };
  const handleClose = () => {
    dispatch(setShow(false));
  };
  return (
    show && (
      <div
        className={`fixed inset-0 z-50 ${
          dark ? "bg-[#181A20] text-white" : "bg-white text-black"
        }  w-full h-full overflow-y-auto p-4`}
      >
        <div className="flex justify-between  items-center mb-4">
          {dark ? (
            <img src="/bitzup_light_logo.png" className="h-10 " alt="logo" />
          ) : (
            <img src="/bitzup_dark_logo.png" className="h-10 " alt="logo" />
          )}
          <IoMdClose
            className="text-[2rem] cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="w-full justify-between flex p-1 gap-2">
          {!token && (
            <>
              <button
                className="bg-gray-100 px-4 py-2 rounded w-full text-black"
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
                name="login"
              >
                Log In
              </button>
              <button
                className="bg-yellow-400 px-4 py-2 rounded font-semibold w-full text-black"
                onClick={() => {
                  handleClose();
                  navigate("/register");
                }}
                name="sign up"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className=" flex flex-col gap-10 text-lg p-2 text-gray-400">
          <div className="font-semibold hover:">Buy Crypto</div>

          <div className="font-semibold">Markets</div>

          <div>
            <div
              onClick={() => toggleMenu("trade")}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              <span>Trade</span>
              <FaChevronDown
                className={`transition-transform h-3 w-3 ${
                  openMenus.trade ? "rotate-180" : ""
                }`}
              />
            </div>
            {openMenus.trade && (
              <ul className="flex flex-col pl-4 text-md gap-2 ">
                <li>Convert</li>
                <li>Spot Exchange</li>
                <li>Margin Exchange</li>
                <li>Trading Bots</li>
              </ul>
            )}
          </div>

          <div>
            <div
              onClick={() => toggleMenu("earn")}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              <span>Earn</span>
              <FaChevronDown
                className={`transition-transform  h-3 w-3 ${
                  openMenus.earn ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <Link
            to={"https://bitzup.freshdesk.com/support/home"}
            target="_blank"
          >
            <div className="font-semibold">24/7 Chat Support</div>
          </Link>
          <div className="justify-between flex items-center">
            <div className="text-gray-400 font-semibold text-lg">Dark Mode</div>
            <Tooltip
              title={dark ? "dark" : "light"}
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
              <MaterialUISwitch onChange={handleTheme} checked={dark} />
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
}
