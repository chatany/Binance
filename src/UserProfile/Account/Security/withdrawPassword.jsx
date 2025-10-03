import { useDispatch, useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoIosCloseCircle, IoMdEyeOff } from "react-icons/io";
import { TopNav } from "../../../Spot/Navbar/TopNavBar";
import { apiRequest } from "../../../Helper";
import { showError, showSuccess } from "../../../Toastify/toastServices";
import { formatTime } from "../../../Constant";
// import { ConfirmationPopup } from "@/common/ConfirmationPopup.jsx";
import { Loder } from "../../../common/Loder";
import { getUserProfile } from "../../../Spot/Apis/apiCall";

export const WithdrawPassword = () => {
  const dark = useSelector((state) => state.counter.dark);
  const userProfile = useSelector((state) => state.counter.userProfile);
  const [popup, setPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    authenticatorCode: "",
    otp: "",
    password: "",
  });
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
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
  const handleSubmit = async () => {
    if (userData?.password === "") {
      showError("Please Enter Password!");
      return;
    }
    setIsDisable(true);
    const obj = {
      password: userData?.password,
      otp: userData?.otp,
      device_type: "systemName",
      device_info: "JSON.stringify(device_info)",
      authenticator_code: userData?.authenticatorCode,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/blockchain/withdraw/generate-withdrawal-password`,
        data: obj,
      });
      if (data?.showAuth) {
        setShowAuth(true);
      } else if (data?.showAuth === false) {
        setShowAuth(false);
      }
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        if (data?.verify === "no") {
          setVerifyPopup(true);
        } else {
          setVerifyPopup(false);
          navigate(-1);
          getUserProfile(dispatch);
        }
        setTimer(120);
      }

      if (data?.status != 1) {
        showError(data?.message);
      }
      if (status === 400 && data?.status == 3) {
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("userDataChanged"));
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      setIsDisable(false);
    }
  };
  useEffect(() => {
    if (!verifyPopup) {
      setUserData((prev) => ({
        ...prev,
        authenticatorCode: "",
        otp: "",
      }));
    }
  }, [verifyPopup]);
  useEffect(() => {
    setTimeout(() => {
      setPopup(true);
    }, 500);
  }, []);
  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      } h-screen overflow-hidden`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div
        className={`flex  items-center mt-16 w-full text-[16px] p-[16px] ${
          dark
            ? "text-[#707A8A] hover:text-[#EAECEF]"
            : "text-[#9C9C9C] hover:text-[#000000]"
        }`}
        onClick={() => navigate(-1)}
      >
        <RiArrowLeftSLine className="size-6 font-light" />
        Security
      </div>
      <div className="sm:p-[40px] p-[16px] flex flex-col gap-10 items-center">
        <div
          className={`text-[32px] font-semibold flex w-full 
        leading-[40px] ${dark ? "text-[#EAECEF]" : "text-[#000000]"}`}
        >
          {!userProfile?.withdrawal_password
            ? "Change Withdraw Password"
            : "Set  Withdraw Password"}
        </div>
        <div className="flex flex-col gap-6 sm:w-[425px] w-full">
          <div className="relative">
            <div className="flex flex-col gap-4">
              <label>Enter New Password</label>
              <input
                name="oldPassword"
                className={` w-full  rounded-lg 
                          h-[3rem] p-4 text-[12px] 
                          ${
                            dark
                              ? "border-[#474D57] focus:border-[#2EDBAD] "
                              : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                          }
                          focus:outline-none   border-1
                           transition-colors duration-300 delay-200 `}
                placeholder="Enter New Password"
                value={userData?.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => handle("password", e)}
              />
            </div>
            <div
              className="cursor-pointer "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEye className="absolute right-3 top-13 h-6 w-6" />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-13 h-6 w-6" />
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isDisable}
            className={`rounded-[12px] h-[48px] w-full ${
              !isDisable ? "bg-[#2EDBAD]" : "bg-[#EAECEF]"
            } text-[#000000] cursor-pointer capitalize`}
          >
            confirm
          </button>
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
                      value={userData?.authenticatorCode}
                      onChange={(e) => handle("authenticatorCode", e)}
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
                      onClick={handleSubmit}
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
                  onClick={handleSubmit}
                  disabled={isDisable}
                  name="verify"
                  className={`rounded-[12px] h-[48px] w-full ${
                    !isDisable ? "bg-[#2EDBAD]" : "bg-[#EAECEF]"
                  } text-[#000000] cursor-pointer capitalize`}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {popup && (
        {/* <ConfirmationPopup
          handleSubmit={() => setPopup(false)}
          handleClose={() => navigate(-1)}
          subTitle={`In order to protect your account, withdrawals, P2P selling and payment services
           might be disabled for ${
             userProfile?.withdrawal_password ? "24" : "2"
           } hours after you change your password.`}
          check={false}
          title="Account Restrictions"
        /> */}
      )}
      {isDisable && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
