import { IoCloseSharp } from "react-icons/io5";

export const ConfirmationBox = ({
  handleCancel,
  handleSubmit,
  message,
  dark,
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center fixed inset-0 z-40 bg-[#00000080] overflow-hidden">
      <div
        className={`flex flex-col max-w-[30rem] absolute ${
          dark ? "bg-[#1E2329] " : "bg-white"
        } z-50 rounded-[12px] gap-5`}
      >
        <div
          className={`flex justify-between capitalize p-3 ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } items-center border-b-1 w-full `}
        >
          <div>confirmation Box</div>
          <IoCloseSharp onClick={handleCancel} className="text-2xl" />
        </div>
        <div className="p-5">
          <h1>{message}</h1>
        </div>
        <div className="flex justify-between items-center gap-2 w-full p-3">
          <button
            onClick={handleCancel}
            className={`w-[50%] cursor-pointer capitalize  rounded-sm text-[16px]  font-semibold ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1`}
          >
            cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`w-[50%] cursor-pointer capitalize rounded-sm text-[14px]  font-semibold bg-[#F6465D] leading-6 px-2 py-1`}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
