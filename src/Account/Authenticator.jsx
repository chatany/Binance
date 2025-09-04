import { useEffect, useState } from "react";
import { Auth, AuthIcon } from "../icons";
import { getAuth, getAuthenticationKey } from "../pages/apiCall";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { IoIosCloseCircle, IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useDeviceInfo } from "../hooks/useDeviceInfo";
import { apiRequest } from "../Helper";
import { showError } from "../Toastify/toastServices";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { RiArrowLeftSLine, RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
export const Authenticator = () => {
  const [showQr, setShowQr] = useState(false);
  const [opt, setOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState({
    otp: "",
    authCode: "",
  });
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const device = useDeviceInfo();

  const navigate = useNavigate();
  const { authEnticatorKey, dark, auth } = useSelector(
    (state) => state.counter
  );

  
  useEffect(() => {
    if (showQr) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showQr]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${sec}`;
  };

  const handleSubmit = async () => {
    const user = {
      subject: "Verify your Email",
      device_type: device?.device_type,
      device_info: device?.device_info,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/send-email-otp`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        setTimer(120);
      } else if (status === 200 && data?.status == 0) {
        showError(data?.message);
      }
    } catch (err) {}
  };
  const handleAuth = async () => {
    const user = {
      otp: userData?.otp,
      authenticator_code: userData?.authCode,
      type: "BOTH",
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/verify-otp-auth`,
        data: user,
      });
    } catch (err) {}
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
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0  p-5`}
    >
      <div className=" flex flex-col gap-2 h-full">
        <div
          className="flex  items-center w-full text-[16px]"
          onClick={() => navigate(-1)}
        >
          <RiArrowLeftSLine className="size-6 font-light" />
          Security
        </div>
        <div className="text-[32px] font-semibold leading-[40px] pl-6">
          Authenticator App
        </div>
        {!auth && (
          <div className="flex w-full justify-center items-center h-full">
            <div className="flex justify-center items-center flex-col gap-5 w-[450px]">
              <div>
                <Auth />
              </div>
              <div>Enjoy faster login</div>
              <div className="text-[14px] font-normal leading-[22px]">
                Instead of waiting for text messages, get verification codes
                from an authenticator app like Google Authenticator/Binance
                Authenticator. It works even if your phone is offline.
              </div>
              <button
                onClick={() => setShowQr(true)}
                className="rounded-[12px] p-2 w-full bg-[#FCD535] text-[#000000] cursor-pointer"
              >
                Enable Authenticator App
              </button>
              <a
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                target="_blank"
              >
                <button
                  className="        text-[14px]
        font-medium
        leading-[22px] text-[#D89F00]"
                >
                  Download Authenticator App
                </button>
              </a>
            </div>
          </div>
        )}
        {auth && (
          <div
            className={`p-[24px] mb-[24px] ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            } border-1 rounded-[16px] gap-[20px]`}
          >
            <div className="flex justify-between items-center">
              <div className="w-[70%] flex gap-2">
                <AuthIcon className="size-6" />
                <div
                  className="text-[16px]
    font-medium
    leading-[24px]"
                >
                  Authenticator
                </div>
              </div>
              <div className="w-[30%] flex gap-3 justify-end">
                <FiEdit className="size-6" />
                <RiDeleteBinLine className="size-6" />
              </div>
            </div>
          </div>
        )}
      </div>
      {showQr && !auth && (
        <div className="w-full h-full   flex justify-center items-center fixed inset-0 z-50 bg-[#00000080] overflow-hidden">
          <div
            className={`border-1 ${
              dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
            }   h-[580px] max-md:h-full  ${
              dark ? "border-[#2B3139]" : "border-[#EAECEF]"
            }  p-5 w-[425px] max-md:w-full rounded-[20px]`}
          >
            {" "}
            {!opt ? (
              <div className="flex flex-col items-center gap-5">
                <div className="flex justify-end w-full">
                  <IoMdClose
                    className="size-6"
                    onClick={() => {
                      setShowQr(false);
                    }}
                  />
                </div>
                <div
                  className="text-[32px] max-md:text-[20px]
        font-semibold
        leading-[40px]"
                >
                  Link an Authenticator
                </div>
                <div
                  className="text-[16px]
        font-normal;
        leading-[24px]"
                >
                  Scan this QR code in the authenticator app
                </div>
                <div
                  className={`bg-white p-3  ${
                    dark ? "border-[#333B47]" : "border-[#EDEDED]"
                  } border-1 rounded-[1rem]`}
                >
                  <QRCode
                    className="w-[150px] h-[150px]"
                    value={authEnticatorKey?.otpauth_url}
                  />
                </div>
                <div
                  className=" max-md:text-[13px]        text-[16px]
        font-semibold 
        leading-[24px]"
                >
                  {authEnticatorKey?.base32}
                </div>
                <div
                  className="text-[16px] max-md:text-[14px]
        font-normal;
        leading-[24px]"
                >
                  If you are unable to scan the QR code, please enter this code
                  manually into the app.
                </div>
                <button
                  onClick={() => {
                    setOtp(true);
                    handleSubmit();
                  }}
                  className="rounded-[12px] p-2 w-full bg-[#FCD535] text-[#000000] cursor-pointer"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className=" flex flex-col h-full gap-6">
                <div className="flex justify-between w-full">
                  <FaArrowLeftLong
                    onClick={() => setOtp(false)}
                    className="size-6"
                  />
                  <IoMdClose
                    className="size-6"
                    onClick={() => {
                      setShowQr(false);
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div
                    className="text-[32px] max-md:text-[20px]
        font-semibold
        leading-[40px] "
                  >
                    Verify Authenticator
                  </div>
                </div>
                <div>
                  <input
                    name="otp"
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
                    onClick={handleAuth}
                    name="verify"
                    className="rounded-[12px] p-2 w-full bg-[#FCD535] text-[#000000] cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
