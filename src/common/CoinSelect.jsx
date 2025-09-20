import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function CoinSelect({ children, header, setOpen, open }) {
  const dark = useSelector((state) => state.counter.dark);

  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  const defaultHeader = (
    <span className="ml-2 text-xs text-gray-400">Select Coin</span>
  );
  return (
    <div className="w-[520px] max-md:w-full relative " ref={popupRef}>
      <div
        className={`
     flex items-center capitalize rounded-lg w-full
    h-[48px]  text-[1rem] text-gray-400
    border
    hover:border-[#2EDBAD]
     ${
       dark
         ? `border-[#474D57] focus:border-[#2EDBAD] ${
             open && "border-[#2EDBAD]"
           } `
         : `border-[#D8DCE1] focus:border-[#2EDBAD] ${
             open && "border-[#2EDBAD]"
           } `
     }
    focus:outline-none 
     transition-colors duration-300 delay-200
    `}
      >
        {typeof header === "function"
          ? header({ open })
          : header || defaultHeader}
      </div>

      {open && (
        <div
          className={`absolute z-10 mt-2 w-full shadow-xl  ${
            dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"
          } rounded-xl  max-h-[300px] overflow-y-auto`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
