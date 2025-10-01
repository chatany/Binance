import { useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoIosCloseCircle, IoMdEyeOff } from "react-icons/io";
import { apiRequest } from "../../../Helper";
import { TopNav } from "../../../Spot/Navbar/TopNavBar";
import { Loder } from "../../../Common/Loder";
import { ConfirmationPopup } from "../../../Common/ConfirmationPopup";
import { formatTime } from "../../../Constant";
import { showError, showSuccess } from "../../../Toastify/toastServices";

export const ChangePassword = () => {
  const dark = useSelector((state) => state.counter.dark);
  const [popup, setPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    authenticatorCode: "",
    otp: "",
  });
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const handlePassword = (key) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !showPassword[key],
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
    if (
      userData?.confirmPassword === "" ||
      userData?.newPassword === "" ||
      userData?.oldPassword === ""
    ) {
      showError("Please Provide All Field!");
      return;
    }
    if (userData?.confirmPassword !== userData?.newPassword) {
      showError("New Password and Confirm New Password are not same");
      return;
    }
    setIsDisable(true);
    const obj = {
      old_password: userData?.oldPassword,
      new_password: userData?.newPassword,
      confirm_new_password: userData?.confirmPassword,
      device_type: "systemName",
      device_info: "JSON.stringify(device_info)",
      otp: userData?.otp,
      authenticator_code: userData?.authenticatorCode,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/change-password`,
        data: obj,
      });
      if (data?.showAuth) {
        setShowAuth(true);
      } else if (data?.showAuth === false) {
        setShowAuth(false);
      }
      if (status === 200 && data?.status == 1) {
        showSuccess(data?.message);
        setVerifyPopup(true);
        setTimer(120);
        // getAuth(dispatch);
        // setDeletePopup(false);
        // navigate(-1);
      }
      if (data?.token) {
        let userData = JSON.parse(localStorage.getItem("userData"));
        const newToken = data?.token;
        userData.token = newToken;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
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
          Change Password
        </div>
        <div className="flex flex-col gap-6 sm:w-[425px] w-full">
          <div className="text-[12px] leading-[18px] font-normal md:bg-[color:rgb(252_213_53/0.15)] rounded-lg p-4 ">
            In order to protect your account, withdrawals, P2P selling and
            payment services might be disabled for 24 hours after you change
            your password.
          </div>
          <div className="relative">
            <label>Old Password</label>
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
              placeholder="Enter Old Password"
              value={userData?.oldPassword}
              type={showPassword.oldPassword ? "password" : "text"}
              onChange={(e) => handle("oldPassword", e)}
            />
            <div
              className="cursor-pointer "
              onClick={() => handlePassword("oldPassword")}
            >
              {showPassword.oldPassword ? (
                <IoEye className="absolute right-3 top-9 h-6 w-6" />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-9 h-6 w-6" />
              )}
            </div>
          </div>
          <div className="relative">
            <label>New Password</label>
            <input
              name="newPassword"
              className={` w-full  rounded-lg 
                          h-[3rem] p-4 text-[12px] 
                          ${
                            dark
                              ? "border-[#474D57] focus:border-[#2EDBAD] "
                              : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                          }
                          focus:outline-none  border-1
                           transition-colors duration-300 delay-200`}
              placeholder="Enter New Password"
              value={userData?.newPassword}
              type={showPassword.newPassword ? "password" : "text"}
              onChange={(e) => handle("newPassword", e)}
            />
            <div
              className="cursor-pointer "
              onClick={() => handlePassword("newPassword")}
            >
              {showPassword.newPassword ? (
                <IoEye className="absolute right-3 top-9 h-6 w-6" />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-9 h-6 w-6" />
              )}
            </div>
          </div>
          <div className="relative">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              className={` w-full  rounded-lg 
                          h-[3rem] p-4 text-[12px] 
                          ${
                            dark
                              ? "border-[#474D57] focus:border-[#2EDBAD] "
                              : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                          }
                          focus:outline-none  border-1
                           `}
              placeholder="Enter Confirm Password"
              value={userData?.confirmPassword}
              type={showPassword.confirmPassword ? "password" : "text"}
              onChange={(e) => handle("confirmPassword", e)}
            />
            <div
              className="cursor-pointer "
              onClick={() => handlePassword("confirmPassword")}
            >
              {showPassword.confirmPassword ? (
                <IoEye className="absolute right-3 top-9 h-6 w-6" />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-9 h-6 w-6" />
              )}
            </div>
          </div>{" "}
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
        <ConfirmationPopup
          handleSubmit={() => setPopup(false)}
          handleClose={() => navigate(-1)}
          subTitle="In order to protect your account, withdrawals, P2P selling and payment services
           might be disabled for 24 hours after you change your password."
          check={false}
          title="Account Restrictions"
        />
      )}
      {isDisable && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
