import { useEffect, useState } from "react";
import { showError, showSuccess } from "../Toastify/toastServices";
import { apiRequest } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState({
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });
  const user = {
    new_password: userData?.newPassword,
    confirm_new_password: userData?.confirmPassword,
    otp: userData?.otp,
    email: userId,
    device_type: "systemName",
    device_info: "windows",
    source: "App",
    // source: "App",
  };
  const Otp = {
    email: userId,
    device_type: "systemName",
    device_info: "windows",
    subject: "Verify Your Email",
    source: "App",
  };
  const handleSubmit = async () => {
    try {
      setDisable(true);
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/forget-password/verfiy`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        showSuccess("Password Changed Successful");
        navigate("/login");
      } else {
        showError(data?.message);
      }
    } catch (err) {
    } finally {
      setDisable(false);
    }
  };
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const handleReset = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/send-otp`,
        data: Otp,
      });

      if (status === 200 && data?.status == 1) {
        setTimer(120);
        if (data?.login === "yes") {
          window.location.href = "/";
        }
      } else {
        showError(data?.message);
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white font-medium">
      <div className="w-[400px] md:border-1 border-[#EDEDED] rounded-2xl p-4 text-[14px] sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.06)]">
        <div className="p-4 flex flex-col h-full gap-5">
          <div className=" text-black text-[20px] capitalize font-bold">
            Reset Your Password
          </div>
          <div>
            <input
              name="newPassword"
              className=" w-full  rounded-lg bg-[#D9D9D940]
                    h-[3rem] p-4 text-[12px] text-[#757575]
                    focus:outline-none 
                     transition-colors duration-300 delay-200"
              placeholder="New Password"
              onChange={(e) => handle("newPassword", e)}
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              className=" w-full  rounded-lg bg-[#D9D9D940]
                    h-[3rem] p-4 text-[12px] text-gray-400
                    focus:outline-none 
                     transition-colors duration-300 delay-200"
              onChange={(e) => handle("confirmPassword", e)}
              placeholder="Confirm Password"
            />
          </div>

          <div className="relative text-black">
            <input
              name="otp"
              className=" w-full  rounded-lg bg-[#D9D9D940]
                               focus:outline-none outline-none 
                    h-[3rem] p-4 text-[12px] text-[#757575]
                      duration-300 delay-200"
              placeholder="Enter Otp"
              onChange={(e) => handle("otp", e)}
            />
          </div>
          <div className="flex justify-center text-[16px]">
            {timer > 0 ? (
              <span className="text-red-500">
                Resend OTP : {formatTime(timer)}s
              </span>
            ) : (
              <div className="flex gap-1">
                <span className="text-red-500">Didn't receive code?</span>
                <button
                  onClick={handleReset}
                  className="text-[#757575]"
                  name="resend"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={handleSubmit}
              disabled={disable}
              name="reset"
              className={` ${
                !disable ? "bg-[#2EDBAD] hover:bg-[#2EDBAD]" : "bg-[#e7eeec]"
              } rounded-xl w-[60%]  h-[2.2rem]  text-black cursor-pointer capitalize`}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
