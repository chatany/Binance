import { useEffect } from "react";
import { FaPeopleLine } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { RiP2pFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DepositPopup = ({ popup, setPopup }) => {
  const dark = useSelector((state) => state.counter.dark);
  const navigate = useNavigate();
  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popup]);
  const handleClose = () => {
    navigate("/crypto/deposit");
    setPopup(!popup);
  };
  return (
    <div className=" h-screen  fixed inset-0  z-40 bg-[#00000080] overflow-hidden">
      <div
        id="popup"
        className={`${
          dark ? "bg-[#181A20] text-[#EAECEF] " : "bg-white text-[#202630] "
        } lg:w-[25%] md:w-[35%]  p-5   h-full     absolute right-0    rounded- `}
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <IoMdClose className="size-6" onClick={() => setPopup(!popup)} />
          </div>
          <div className="flex flex-col  gap-3">
            <div className="text-[16px] font-semibold leading-[24px]">
              I have crypto assets
            </div>
            <div
              className={`flex ${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 p-[16px] items-center rounded-[16px] `}
              onClick={handleClose}
            >
              <MdFileDownload className="size-10" />
              <div>
                <div className="text-[14px] font-medium leading-[22px] text-[#202630]">
                  Deposit Crypto
                </div>
                <div
                  className={`text-[12px] font-normal leading-[18px] ${
                    dark ? "text-[#848E9C]" : "text-[#9C9C9C]"
                  }  `}
                >
                  Send crypto to your BitZup Account
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[16px] font-semibold leading-[24px]">
              I don't have crypto assets
            </div>
            <div
              className={`flex ${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 p-[16px] items-center rounded-[16px]`}
            >
              <div></div>
              <div>
                <div className="text-[14px] font-medium leading-[22px] text-[#202630]">
                  Buy With USDT
                </div>
                <div
                  className={`text-[12px] font-normal leading-[18px] ${
                    dark ? "text-[#848E9C]" : "text-[#9C9C9C]"
                  }  `}
                >
                  Buy crypto easily via bank tranfer,card and more.
                </div>
              </div>
            </div>
            <div
              className={`flex ${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 p-[16px] items-center rounded-[16px]`}
            >
              <RiP2pFill className="size-10" />
              <div>
                <div className="text-[14px] font-medium leading-[22px] text-[#202630]">
                  P2P Trading
                </div>
                <div
                  className={`text-[12px] font-normal leading-[18px] ${
                    dark ? "text-[#848E9C]" : "text-[#9C9C9C]"
                  }  `}
                >
                  Buy crypto with 0 fees and get USDT rewards
                </div>
              </div>
            </div>
            <div
              className={`flex ${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 p-[16px] items-center rounded-[16px]`}
            >
              <IoCardOutline className="size-10" />
              <div>
                <div className="text-[14px] font-medium leading-[22px] text-[#202630]">
                  Credit/Debit Card
                </div>
                <div
                  className={`text-[12px] font-normal leading-[18px] ${
                    dark ? "text-[#848E9C]" : "text-[#9C9C9C]"
                  }  `}
                >
                  Every Monday 0 fees via visa ,Mastercard Google Pay and Apple
                  pay!
                </div>
              </div>
            </div>
            <div
              className={`flex ${
                dark ? "border-[#333B47]" : "border-[#EDEDED]"
              } md:border-1 p-[16px] items-center rounded-[16px]`}
            >
              <FaPeopleLine className="size-10" />
              <div>
                <div className="text-[14px] font-medium leading-[22px] text-[#202630]">
                  Third-party payment
                </div>
                <div
                  className={`text-[12px] font-normal leading-[18px] ${
                    dark ? "text-[#848E9C]" : "text-[#9C9C9C]"
                  }  `}
                >
                  Snake year Zero fees: Buy Crypto with local payment method via
                  Swapple and Alchemy Pay!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
