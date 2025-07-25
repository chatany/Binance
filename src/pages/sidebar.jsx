import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileSidebar({ show, setShow, dark }) {
  const [openMenus, setOpenMenus] = useState({ trade: false, earn: false });
  const navigate = useNavigate();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    show && (
      <div
        className={`fixed inset-0 z-50 ${
          dark ? "bg-[#181A20] text-white" : "bg-white text-black"
        }  w-full h-full overflow-y-auto p-4`}
      >
        <div className="flex justify-end items-center mb-4">
          <IoMdClose
            className="text-[2rem] cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        <div className="w-full justify-between flex p-1 gap-2">
          <button
            className="bg-gray-100 px-4 py-2 rounded w-full text-black"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="bg-yellow-400 px-4 py-2 rounded font-semibold w-full text-black"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
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

          <div className="font-semibold">Support</div>
          <div className="font-semibold">24/7 Chat Support</div>
        </div>
      </div>
    )
  );
}
<canvas
  width="1310"
  height="610"
  class="hit"
  style="position: absolute; left: 0px; top: 0px; width: 655px; height: 305px; z-index: 1000;"
></canvas>;
