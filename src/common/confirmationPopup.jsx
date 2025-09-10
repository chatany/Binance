import { IoAlertCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

export const ConfirmationPopup = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div className="w-full h-full   flex justify-center items-center fixed inset-0 z-50 bg-[#00000080] overflow-hidden">
      <div
        className={`border-1 ${
          dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
        }   md:max-h-[580px] h-fit min-h-[350px] max-md:h-full  ${
          dark ? "border-[#2B3139]" : "border-[#EAECEF]"
        }  p-5 w-[425px] max-md:w-full md:rounded-[20px]`}
      >
        <div>
          <div>
            <IoAlertCircle />
          </div>
          <div className="text-[32px] font-semibold leading-[40px] pl-6">Are You Sure You Want to Change Your Email Address?</div>
          <div>
            <div>
              <input type="checkbox" />
              <div>
                Withdrawals and P2P transactions will be disabled for 24 hours
                after changing your email verification to ensure the safety of
                your assets.
              </div>
            </div>
            <div>
              <input type="checkbox" className="h-3 w-3 accent-yellow-500 bg-transparent checkout" />
              <div>
                The old email address cannot be used to re-register for 30 days
                after updating it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
