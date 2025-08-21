import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../Helper";
import { showError, showSuccess } from "../Toastify/toastServices";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/webSocket";
import CircularIndeterminate from "../common/LoderComponent";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.counter);
  const [timer, setTimer] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
    authCode: "",
  });
  const [verifyPopup, setVerifyPopup] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotNavigate = () => {
    navigate("/forgot");
  };
  const handleRegisterNavigate = () => {
    navigate("/register");
  };
  const [info, setInfo] = useState({});
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${sec}`;
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

  useEffect(() => {
    const getSystemName = () => {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes("win")) return "Windows";
      if (platform.includes("mac")) return "MacOS";
      if (platform.includes("linux")) return "Linux";
      if (/iphone|ipad|ipod/.test(platform)) return "iOS";
      if (/android/.test(platform)) return "Android";
      return "Unknown";
    };

    const device_info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
    };

    setInfo({
      source: "APP",
      device_type: getSystemName(),
      device_info: JSON.stringify(device_info),
    });
  }, []);
  const handle = (key, e) => {
    setError("");
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const user = {
    email: userData.email,
    password: userData.password,
    otp: userData.otp,
    device_type: info.device_type,
    authenticator_code: userData?.authCode ? userData?.authCode : "",
    device_info: " ",
    source: "App",
  };
  const handleReload = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/login`,
        data: user,
      });

      if (status === 200) {
        // if (data?.data?.user_id) {
        //   console.log(data.data.user_id, "dr");

        //   setUserData((prev) => ({
        //     ...prev,
        //     user_id: data.data.user_id,
        //   }));
        // }
        setTimer(120);
      }
    } catch (err) {
    } finally {
    }
  };
  const handleSubmit = async () => {
    try {
      setDisable(true)
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/login`,
        data: user,
      });
      if (data?.showAuth) {
        setShowAuth(true);
      }
      if (status === 200 && data?.status == 1) {
        setVerifyPopup(!verifyPopup);
        setTimer(120);
        if (data?.login === "yes") {
          localStorage.setItem("userData", JSON.stringify(data?.data));
          showSuccess("Login Successfull");
          navigate("/");
        }
      } else if (status === 200 && data?.status == 0) {
        // showError(data?.message);
        setError(data?.message);
      }
    } catch (err) {
    } finally {
      setDisable(false)
    }
  };
  const verify = async () => {
    if (userData?.otp === " " || userData?.otp.length < 6) {
      // showError("please provide valid otp send to your email.");
      setError("please provide valid otp send to your email.");
      return;
    }
    try {
      setDisable(true)
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/login`,
        data: user,
      });
      if (data?.login === "yes") {
        localStorage.setItem("userData", JSON.stringify(data?.data));
        showSuccess("Login Successfull");
        navigate("/");
      }
      if (data?.status != 1) {
        showError(data?.message);
      }
      if (status === 200 && data?.status == 0) {
        // showError(data?.message);
        setError(data?.message);
        setUserData((prev) => ({
          ...prev,
          // otp: "",
        }));
      } else {
      }
    } catch (err) {
    } finally {
      setDisable(false)
    }
  };
  useEffect(() => {
    if (verifyPopup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [verifyPopup]);
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white font-medium">
      <div className="w-[400px] h-[30rem] md:border-1 border-[#EDEDED] rounded-2xl p-4 sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.06)]">
        <div className="p-4 flex flex-col h-full gap-8">
          <div className=" text-black text-[20px] capitalize font-bold">
            BitzUp Account Login
          </div>
          <div>
            <label htmlFor="Email" className="capitalize text-[#757575]">
              Email
            </label>
            <input
              name="Email"
              className=" w-full  rounded-lg bg-[#D9D9D940]
    h-[3rem] p-4 text-[1rem] text-[#757575]
    focus:outline-none 
     transition-colors duration-300 delay-200"
              onChange={(e) => handle("email", e)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="relative text-black">
            <label htmlFor="Email" className="capitalize text-[#757575]">
              Password
            </label>
            <input
              name="Email"
              className=" w-full  rounded-lg bg-[#D9D9D940]
               focus:outline-none outline-none
    h-[3rem] p-4 text-[1rem] text-[#757575]
     transition-colors duration-300 delay-200"
              onFocus={() => setError("")}
              onChange={(e) => handle("password", e)}
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
          <div className="flex flex-col gap-2.0">
            <div className=" text-[12px] flex flex-col gap-2 leading-3 text-[#2EDBAD] cursor-pointer">
              <div onClick={handleForgotNavigate} className="hover:underline">
                Forgot Password
              </div>
              <div onClick={handleRegisterNavigate} className="hover:underline">
                Create a BitzUp Account
              </div>
            </div>
            {error && (
              <div className="text-[14px] leading-4 text-[#F6465D] flex justify-center font-medium">
                {error}
              </div>
            )}
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={handleSubmit}
              disabled={disable}
              name="login"
              className={`${!disable?"bg-[#2EDBAD] hover:bg-[#2EDBAD]":"bg-[#e7eeec]"}  rounded-xl w-[60%]  h-[2.2rem]  text-black cursor-pointer capitalize`}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      {verifyPopup && (
        <div className="fixed inset-0  flex justify-center items-center bg-[#00000080] z-999">
          <div className="w-[300px]  rounded-2xl p-4 bg-white">
            <div className=" flex flex-col h-full gap-6">
              <div className="flex justify-between">
                <div className="text-black text-[20px] font-bold w-[90%] flex justify-center">
                  Verify Email
                </div>
                <div>
                  <IoIosCloseCircle
                    className="h-6 w-6 text-black cursor-pointer"
                    onClick={() => setVerifyPopup(!verifyPopup)}
                  />
                </div>
              </div>
              {showAuth ? (
                <>
                  <div>
                    <input
                      name="Email"
                      className=" w-full  rounded-lg bg-[#D9D9D940]
                  h-[3rem] p-4 text-[12px] text-[#757575]
                  focus:outline-none 
                   transition-colors duration-300 delay-200"
                      placeholder="Enter Email OTP"
                      value={userData?.otp}
                      onChange={(e) => handle("otp", e)}
                    />
                  </div>
                  <div>
                    <input
                      name="authCode"
                      className=" w-full  rounded-lg bg-[#D9D9D940]
                  h-[3rem] p-4 text-[12px] text-[#757575]
                  focus:outline-none 
                   transition-colors duration-300 delay-200"
                      placeholder="Enter Authenticator Code"
                      value={userData?.authCode}
                      onChange={(e) => handle("authCode", e)}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <input
                    name="Email"
                    className=" w-full  rounded-lg bg-[#D9D9D940]
                  h-[3rem] p-4 text-[12px] text-[#757575]
                  focus:outline-none 
                   transition-colors duration-300 delay-200"
                    placeholder="Enter OTP"
                    value={userData?.otp}
                    onChange={(e) => handle("otp", e)}
                  />
                </div>
              )}
              <div className="flex justify-center text-[16px]">
                {timer > 0 ? (
                  <span className="text-red-500">
                    Resend OTP : {formatTime(timer)}
                  </span>
                ) : (
                  <div className="flex gap-1">
                    <span className="text-red-500">Didn't receive code?</span>
                    <button
                      onClick={handleReload}
                      className="text-[#757575]"
                      name="otp"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>
              <div className="flex w-full justify-center">
                <button
                  onClick={verify}
                  disabled={disable}
                  name="verify"
                  className={`${!disable?"bg-[#2EDBAD] hover:bg-[#2EDBAD]":"bg-[#e7eeec]"}  rounded-xl w-[60%]  h-[2.2rem]  text-black cursor-pointer capitalize`}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="absolute h-full w-full flex justify-center items-center bg-[#3b383840] z-999">
          <CircularIndeterminate />
        </div>
      )}
    </div>
  );
};
