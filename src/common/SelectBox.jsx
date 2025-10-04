import { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { useSelector } from "react-redux";

export const SelectBox = ({ title, value, children,show,setShow }) => {
  const dark = useSelector((state) => state.counter.dark);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      //   document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      //   document.body.style.overflow = "auto";
    };
  }, [show]);
  return (
    <div className="min-w-[175px] flex flex-col gap-1 relative" ref={popupRef}>
      <div
        className={`
     flex items-center capitalize rounded-lg w-full
    h-[40px] p-2 text-[1rem] text-gray-400
    border
    hover:border-[#2EDBAD]
     ${
       dark
         ? "border-[#474D57] focus:border-[#2EDBAD]"
         : "border-[#D8DCE1] focus:border-[#2EDBAD]"
     }
    focus:outline-none 
    `}
        onClick={() => setShow(!show)}
      >
        <div className="flex justify-between items-center text-[14px] w-[70%]">
          <div className={`${dark ? "text-[#707A8A]" : "text-[#9C9C9C]"}`}>
            {title}
          </div>
          <div
            className={`${
              dark ? "text-[#EAECEF]" : "text-[#000000]"
            } font-medium leading-[22px] whitespace-nowrap`}
          >
            {value}
          </div>
        </div>
        <div className="flex w-[30%] justify-end">
          <MdArrowDropUp
            className={`transition-transform  h-5 w-5  ${
              dark ? "text-[#707A8A]" : "text-[#9C9C9C]"
            }  ${!show ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {show && (
        <div
          className={`w-full rounded-lg absolute z-80 top-11 border-1 ${
            dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
          }   ${dark ? "border-[#2B3139]" : "border-[#EAECEF]"} `}
        >
          {children}
        </div>
      )}
    </div>
  );
};
