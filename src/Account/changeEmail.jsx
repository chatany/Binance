import { useEffect, useState } from "react";
import { AuthIcon } from "../icons";
import { formatTime } from "../Constant";
import { useSelector } from "react-redux";
import { IoMdClose, IoMdEyeOff } from "react-icons/io";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { showError } from "../Toastify/toastServices";
import { apiRequest } from "../Helper";
import { useNavigate } from "react-router-dom";
import { TopNav } from "../pages/TopNavBar";
import { ConfirmationPopup } from "../common/confirmationPopup";
import { Loder } from "../common/Loder";

export const ChangeEmail = () => {
  const userProfile = useSelector((state) => state.counter.userProfile);
  const dark = useSelector((state) => state.counter.dark);
  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [otp, setOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState({
    newEmail: "",
    password: "",
    authenticatorCode: "",
    otp: "",
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
  const handleEmailOtp = async () => {
    if (userData?.newEmail==="") {
      showError("Please Provide All Field!");
      return;
    }
    setIsDisable(true);
    const user = {
      new_email: userData?.newEmail,
      device_type: "systemName",
      device_info: "JSON.stringify(device_info)",
      step: otp ? 2 : 1,
      password: userData?.password,
      new_email_otp: userData?.otp,
      authenticator_code: userData?.authenticatorCode,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/change-email`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        setOtp(true);
        setTimer(120);
      } else if (status === 200 && data?.status == 0) {
        showError(data?.message);
      }
    } catch (err) {
    } finally {
      setIsDisable(false);
    }
  };
  useEffect(() => {
    setUserData({
      newEmail: "",
      password: "",
      authenticatorCode: "",
      otp: "",
    });
  }, [showPopup]);
  const handlePopup = () => {
    setPopup(false);
    setTimeout(() => {
      setShowPopup(!showPopup);
      setOtp(false);
    }, 500);
  };
  return (
    <div
      className={`
        ${dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0  p-5`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <div className=" flex flex-col gap-10 h-full mt-16">
        <div
          className="flex  items-center w-full text-[16px]"
          onClick={() => navigate(-1)}
        >
          <RiArrowLeftSLine className="size-6 font-light" />
          Security
        </div>
        <div className="text-[32px] font-semibold leading-[40px] pl-6">
          Email Verification
        </div>
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
                {userProfile?.email}
              </div>
            </div>
            <div className="w-[30%] flex gap-3 justify-end">
              <FiEdit className="size-6" onClick={() => setPopup(true)} />
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <ConfirmationPopup
          handleSubmit={handlePopup}
          handleClose={() => setPopup(false)}
          checkBox2=" The old email address cannot be used to re-register for 30 days
                after updating it."
          checkBox1=" Withdrawals and P2P transactions will be disabled for 24 hours
                after changing your email verification to ensure the safety of
                your assets."
          title="Are You Sure You Want to Change Your Email Address?"
        />
      )}
      {showPopup && (
        <div className="w-full h-full   flex justify-center items-center fixed inset-0 z-50 bg-[#00000080] overflow-hidden">
          <div
            className={`border-1 ${
              dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
            }   md:max-h-[580px] h-fit min-h-[350px] max-md:h-full  ${
              dark ? "border-[#2B3139]" : "border-[#EAECEF]"
            }  p-5 w-[425px] max-md:w-full md:rounded-[20px]`}
          >
            {" "}
            {!otp ? (
              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-end w-full">
                    <IoMdClose className="size-6" onClick={handlePopup} />
                  </div>
                  <div
                    className="w-full text-[32px] max-md:text-[20px]
        font-semibold
        leading-[40px]"
                  >
                    Change Email
                  </div>
                </div>
                <div className="w-full">
                  <label>New Email</label>
                  <input
                    name="newEmail"
                    className={` w-full  rounded-lg 
                                          h-[3rem] p-4 text-[12px] 
                                          ${
                                            dark
                                              ? "border-[#474D57] focus:border-[#2EDBAD] "
                                              : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                                          }
                                          focus:outline-none   border-1
                                           transition-colors duration-300 delay-200`}
                    placeholder="Enter New Email"
                    value={userData?.newEmail}
                    onChange={(e) => handle("newEmail", e)}
                  />
                </div>
                <button
                  onClick={handleEmailOtp}
                  disabled={isDisable}
                  className={`rounded-[12px]  w-full h-[48px] ${
                    isDisable ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                  } text-[#000000] cursor-pointer`}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className=" flex flex-col h-full gap-6">
                <div className="flex justify-end w-full">
                  <IoMdClose className="size-6" onClick={handlePopup} />
                </div>
                <div className="flex justify-between">
                  <div
                    className="text-[32px] max-md:text-[20px]
        font-semibold
        leading-[40px] "
                  >
                    Change Email
                  </div>
                </div>
                <div className="text-[12px] leading-[18px] font-normal md:bg-[color:rgb(252_213_53/0.15)] rounded-lg p-4 ">
                  Withdrawals, P2P selling, and payment services will be
                  disabled for 24 hours after you make this change to protect
                  your account.
                </div>
                <div className="relative">
                  <input
                    name="Enter Password"
                    className={` w-full  rounded-lg 
                                          h-[3rem] p-4 text-[12px] 
                                          ${
                                            dark
                                              ? "border-[#474D57] focus:border-[#2EDBAD] "
                                              : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                                          }
                                          focus:outline-none   border-1
                                           transition-colors duration-300 delay-200`}
                    placeholder="Enter Password"
                    value={userData?.password}
                    type={showPassword ? "password" : "text"}
                    onChange={(e) => handle("password", e)}
                  />
                  <div
                    className="cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <IoEye className="absolute right-3 top-3 h-6 w-6" />
                    ) : (
                      <IoMdEyeOff className="absolute right-3 top-3 h-6 w-6" />
                    )}
                  </div>
                </div>

                <div>
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
                                           transition-colors duration-300 delay-200`}
                    placeholder="Enter Email OTP"
                    value={userData?.otp}
                    onChange={(e) => handle("otp", e)}
                  />
                </div>
                <div>
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
                                           transition-colors duration-300 delay-200`}
                    placeholder="Enter Authenticator Code"
                    value={userData?.authenticatorCode}
                    onChange={(e) => handle("authenticatorCode", e)}
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
                        onClick={handleEmailOtp}
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
                    onClick={handleEmailOtp}
                    disabled={isDisable}
                    name="verify"
                    className={`rounded-[12px]  w-full h-[48px] ${
                      isDisable ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                    } text-[#000000] cursor-pointer`}
                  >
                    {/* {!isDisable ? ( */}
                    Verify
                    {/* ) : ( */}
                    {/* <ScaleLoader height={"25px"} width={"3px"} /> */}
                    {/* )} */}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isDisable && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
