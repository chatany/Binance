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
        className={`flex flex-col p-7 absolute ${
          dark ? "bg-[#1E2329] " : "bg-white"
        } z-50 rounded-[12px] gap-10`}
      >
        <div className="flex justify-between items-center w-full">
          <div>confirmation Box</div>
          <IoCloseSharp onClick={handleCancel} />
        </div>
        <h1>{message}</h1>
        <div className="flex justify-between items-center w-full">
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};
