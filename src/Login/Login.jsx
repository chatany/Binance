import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotNavigate = () => {
    navigate("/forgot");
  };
  const handleRegisterNavigate = () => {
    navigate("/register");
  };
  return (
    <div
      className="min-h-[100vh] w-full flex justify-center items-center bg-white font-medium"
      style={{ fontFamily: "IBM Plex Sans sans-serif Arial" }}
    >
      <div className="w-[400px] h-[30rem] md:border-1 border-[#2B3139] rounded-2xl p-4">
        <div className="p-4 flex flex-col h-full justify-between">
          <div className=" text-black text-[20px] capitalize font-bold">
            BitzUp Account Login
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
          <div className="relative text-black">
            <label htmlFor="Email" className="capitalize text-[#757575]">
              Password
            </label>
            <input
              name="Email"
              className=" w-full capitalize rounded-lg bg-[#D9D9D940]
               focus:outline-none outline-none
    h-[3rem] p-4 text-[1rem] text-[#757575]
     transition-colors duration-300 delay-200"
              type={showPassword ? "password" : "text"}
            />
            <div className="cursor-pointer " onClick={handlePassword}>
              {showPassword ? (
                <IoEye className="absolute right-3 top-9 h-6 w-6" />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-9 h-6 w-6" />
              )}
            </div>
          </div>
          <div className=" text-[12px] flex flex-col gap-2 leading-3 text-[#2EDBAD] cursor-pointer">
            <div onClick={handleForgotNavigate} className="hover:underline">Forgot Password</div>
            <div onClick={handleRegisterNavigate} className="hover:underline">Create a BitzUp Account</div>
          </div>
          <div className="flex w-full justify-center">
            <button className="bg-[#2EDBAD]  rounded-xl w-[60%]  h-[2.2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize">
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
