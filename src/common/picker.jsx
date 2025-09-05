import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

const BinanceDatePicker = ({
  onChange,
  value = [
    {
      startDate: new Date(2019, 0, 1),
      endDate: new Date(),
      key: "selection",
    },
  ],
}) => {
  const [shownDate, setShownDate] = useState(new Date());
  const dark = useSelector((state) => state.counter.dark);
  const [hasSelectedStart, setHasSelectedStart] = useState(false);
  const [show, setShow] = useState(false);

  const handleYearChange = (direction) => {
    setShownDate((prev) => {
      const newDate = new Date(prev);
      const currentMonth = prev.getMonth(); // preserve current month
      newDate.setFullYear(prev.getFullYear() + direction, currentMonth, 1);
      return newDate;
    });
  };

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
    <div className="z-70 relative" ref={popupRef}>
      {/* Year Navigation */}

      <div
        className={`
     flex items-center capitalize rounded-lg w-full
    h-[40px] p-2 text-[1rem] text-gray-400
    border
    hover:border-[#b89c4f]
     ${
       dark
         ? "border-[#474D57] focus:border-[#b89c4f]"
         : "border-[#D8DCE1] focus:border-[#fce788]"
     }
    focus:outline-none 
     transition-colors duration-300 delay-200
    `}
        onClick={() => setShow(!show)}
      >
        {value[0].startDate.toLocaleDateString("en-CA")} →{" "}
        {value[0].endDate.toLocaleDateString("en-CA")}
      </div>
      {/* Calendar */}
      {show && (
        <div
          className={`absolute border-[1px] top-10 rounded-2xl   ${
            dark
              ? "border-[#474D57] focus:border-[#b89c4f]"
              : "border-[#D8DCE1] focus:border-[#fce788]"
          }`}
        >
          <div className="relative justify-between flex">
            <DateRangePicker
              key={shownDate.toISOString()} // 👈 force re-render
              ranges={value}
              onChange={(item) => {

                onChange([item.selection]);

                if (!hasSelectedStart) {
                  // First click (start date select)
                  setHasSelectedStart(true);
                } else {
                  // Second click (end date select, same ya different ho)
                  setHasSelectedStart(false);
                  setShow(false); // ✅ ab band karo
                }
              }}
              showDateDisplay={false}
              moveRangeOnFirstSelection={false}
              direction="horizontal"
              months={2}
              staticRanges={[]}
              inputRanges={[]}
              shownDate={shownDate} // 👈 control calendar view
            />
            {/* <div className="absolute flex w-full justify-center mt-7"> */}

            {/* <div className=" flex items-center justify-between w-[70%] "> */}
            <button
              onClick={() => handleYearChange(-1)}
              className=" absolute flex justify-center w-fit left-12 top-6 cursor-pointer"
            >
              <RiArrowLeftSLine className="size-6 text-black" />
            </button>
            <button
              onClick={() => handleYearChange(1)}
              className=" absolute flex justify-center w-fit right-12 top-6 cursor-pointer"
            >
              <MdOutlineKeyboardArrowRight className="size-6 text-black " />
            </button>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default BinanceDatePicker;
