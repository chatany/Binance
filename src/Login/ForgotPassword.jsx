export const Forgotpass = () => {
  return (
    <div
      className="min-h-[100vh] w-full flex justify-center items-center bg-white font-medium"
      style={{ fontFamily: "IBM Plex Sans sans-serif Arial" }}
    >
      <div className="w-[400px] h-[20rem] md:border-1 border-[#2B3139] rounded-2xl p-4">
        <div className="p-4 flex flex-col h-full justify-between">
          <div className=" text-black text-[20px] capitalize font-bold">
            Forgot Password
          </div>
          <div>
            <label htmlFor="Email" className="capitalize text-[#757575]">
              Email
            </label>
            <input
              name="Email"
              className=" w-full capitalize rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[1rem] text-[#757575]
            focus:outline-none 
             transition-colors duration-300 delay-200"
            />
          </div>

          <div className="flex w-full justify-center">
            <button className="bg-[#2EDBAD]  rounded-xl w-[60%]  h-[2.2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
