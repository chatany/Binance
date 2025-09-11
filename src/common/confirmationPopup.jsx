import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

export const ConfirmationPopup = ({
  handleClose,
  handleSubmit,
  title,
  checkBox1,
  checkBox2,
  check = true,
  subTitle,
}) => {
  const dark = useSelector((state) => state.counter.dark);
  const [checkbox, setCheckbox] = useState({
    checkBox1: false,
    checkBox2: false,
  });
  const isDisable = checkbox.checkBox1 && checkbox.checkBox2;

  return (
    <div className="w-full h-full   flex justify-center  items-center max-md:items-end fixed inset-0 z-50 bg-[#00000080] overflow-hidden">
      <div
        className={`border-1 ${
          dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
        }   md:max-h-[580px] h-fit min-h-[350px] max-md:h-fit  ${
          dark ? "border-[#2B3139]" : "border-[#EAECEF]"
        }  p-5 w-[425px] max-md:w-full md:rounded-[20px] max-md:rounded-[20px_20px_0px_0px] max-md:slide-inTop`}
      >
        <div className="flex flex-col gap-6 p-[16px] items-center">
          <div className="w-full flex justify-center text-red-400">
            <IoAlertCircle className="h-8 w-8" />
          </div>
          <div className="text-[24px] font-semibold leading-[34px]">
            {title}
          </div>
          {check && (
            <div
              className={`${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 rounded-[12px] p-[16px]`}
            >
              <div
                className="flex gap-2 p-1"
                onClick={() =>
                  setCheckbox((prev) => ({
                    ...prev,
                    checkBox1: !checkbox.checkBox1,
                  }))
                }
              >
                <input
                  type="checkbox"
                  className={`size-5 ${
                    dark ? "accent-white" : "accent-black"
                  }  bg-transparent checkout mt-1`}
                  // onChange={(e) =>
                  //   setCheckbox((prev) => ({
                  //     ...prev,
                  //     checkBox1: e.target.checked,
                  //   }))
                  // }
                  checked={checkbox.checkBox1}
                />
                <div className="text-[14px] font-normal leading-[22px]">
                  {checkBox1}
                </div>
              </div>
              <div
                className="flex gap-2 p-1"
                onClick={() =>
                  setCheckbox((prev) => ({
                    ...prev,
                    checkBox2: !checkbox.checkBox2,
                  }))
                }
              >
                <input
                  type="checkbox"
                  className={`size-5 ${
                    dark ? "accent-white" : "accent-black"
                  }  bg-transparent checkout mt-1`}
                  // onChange={(e) =>
                  //   setCheckbox((prev) => ({
                  //     ...prev,
                  //     checkBox2: e.target.checked,
                  //   }))
                  // }
                  checked={checkbox.checkBox2}
                />
                <div className="text-[14px] font-normal leading-[22px]">
                  {checkBox2}
                </div>
              </div>
            </div>
          )}
          {subTitle && (
            <div className={`rounded-[12px] p-[16px]`}>
              <div className="text-[14px] font-normal leading-[22px]">
                {subTitle}
              </div>
            </div>
          )}
          <div className="flex justify-between w-full gap-2">
            <button
              onClick={handleClose}
              className={`${
                dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
              } p-[6px_12px_6px_12px] rounded-[8px] w-full cursor-pointer`}
            >
              cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isDisable && !subTitle}
              className={`rounded-[12px] p-2 w-full text-[#000000]  bg-[#FCD535] 
              ${
                isDisable
                  ? `cursor-pointer`
                  : ` ${
                      subTitle
                        ? "cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`
              }`}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
