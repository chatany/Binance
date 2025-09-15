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
    hover:border-[#b89c4f]
     ${
       dark
         ? `border-[#474D57] focus:border-[#b89c4f] ${
             open && "border-[#b89c4f]"
           } `
         : `border-[#D8DCE1] focus:border-[#fce788] ${
             open && "border-[#fce788]"
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
            dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"
          } rounded-xl  max-h-[300px] overflow-y-auto`}
        >
          <p className="text-gray-500 text-sm mb-2">Coin List</p>
          {children}
        </div>
      )}
    </div>
  );
}
