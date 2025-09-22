import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { helpCenterApi } from "./apiCall";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export const HelpCenter = ({ dark, setShowHelpPopup, showHelpPopup }) => {
  const helpCenter  = useSelector((state) => state.counter.helpCenter);
  const dispatch = useDispatch();
  useEffect(() => {
    helpCenterApi(dispatch);
  }, []);

  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowHelpPopup(false);
      }
    };

    if (showHelpPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showHelpPopup]);
  return (
    <div className="w-full h-full flex justify-center items-center fixed inset-0 z-40 bg-[#00000080] overflow-hidden">
      <div
        className={`w-[50%] flex flex-col p-7 absolute ${
          dark ? "bg-[#1E2329] " : "bg-white"
        } z-50 rounded-[12px] gap-10`}
        ref={popupRef}
      >
        <div
          className={`text-[20px] flex ${
            dark ? "text-[#EAECEF]" : "text-[#202630]"
          } justify-between`}
        >
          <div>Help & Center</div>
          <div onClick={setShowHelpPopup}>
            <IoClose className="font-extrabold size-8" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {helpCenter?.topics?.map((item, index) => (
            <div key={index} className="p-3 rounded-2xl">
              <div
                className={`text-[16px] ${
                  dark ? "text-[#EAECEF]" : "text-[#202630]"
                } `}
              >
                {item?.topic}
              </div>
              <div>
                {item?.questions?.map((val, ind) => (
                  <Link to={val?.url} target="_blank">
                    <div
                      key={ind}
                      className={`flex justify-between  text-[14px] ${
                        dark ? "text-[#B7BDC6]" : "text-[#474D57]"
                      }`}
                    >
                      <div className="underline">{val.question}</div>
                      {/* <div>
                        <MdOutlineKeyboardArrowRight />
                      </div> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
