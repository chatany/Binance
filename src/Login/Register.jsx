import { useEffect, useRef, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { country } from "../pages/apiCall";
import { IoIosCloseCircle } from "react-icons/io";
import { apiRequest } from "../Helper";
import { showError, showSuccess } from "../Toastify/toastServices";
import { useNavigate } from "react-router-dom";
import { Loder } from "../common/Loder";
import { FaArrowLeftLong } from "react-icons/fa6";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const countryData = useSelector((state) => state.counter.countryData);
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [disable, setDisable] = useState(false);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isRefferal, setIsRefferal] = useState(false);
  const [flag, setFlag] = useState(
    "https://bitzupimgs.sgp1.cdn.digitaloceanspaces.com/flags/um.png"
  );
  const [timer, setTimer] = useState(0);
  const [searchQuery, SetSearchQuery] = useState("");
  const handlePopupOpen = () => {
    setIsOpenPopup(!isOpenPopup);
  };
  const dispatch = useDispatch();
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    country(dispatch);
  }, []);
  const [countryCode, setCountryCode] = useState("1");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
    user_id: "",
    referral_id: "",
  });
  const filteredData = countryData?.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const user = {
    name: userData.name,
    email: userData.email,
    country_code: countryCode,
    phone: userData.phone,
    password: userData.password,
    otp: userData.otp,
    user_id: userData.user_id,
    device_type: "systemName",
    device_info: "windows",
    source: "App",
    referral_id: userData?.referral_id,
  };
  const handleSubmit = async () => {
    if (
      userData?.password === "" ||
      userData?.email === "" ||
      userData?.name === "" ||
      userData?.phone === ""
    ) {
      showError("Please Provide All Field!");
      return;
    }
    try {
      setDisable(true);
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/signup`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        if (data?.login === "yes") {
          localStorage.setItem("userData", JSON.stringify(data?.data));
          showSuccess("User Register Successsful");
          navigate("/");
        }
        if (data?.data?.user_id) {
          setUserData((prev) => ({
            ...prev,
            user_id: data.data.user_id,
          }));
        }
        setVerifyPopup(!verifyPopup);
        setTimer(120);
      } else if (status === 200 && data?.status == 0) {
        showError(data?.message);
      } else if (data?.status == 3) {
        showError(data?.message, "pok");
      } else {
        setError(data?.message);
      }
      setError(data?.message);
    } catch (err) {
      showError(err, "poi");
    } finally {
      setDisable(false);
    }
  };
  const verify = async () => {
    if (userData?.otp === " " || userData?.otp.length < 6) {
      showError("please provide valid otp send to your email.");
      return;
    }
    try {
      setDisable(true);
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/signup`,
        data: user,
      });
      if (data?.login === "yes") {
        localStorage.setItem("userData", JSON.stringify(data?.data));
        showSuccess("User Register Successsful");
        navigate("/");
      }
      if (status === 200 && data?.status == 0) {
        showError(data?.message);
        setUserData((prev) => ({
          ...prev,
          otp: "",
        }));
      } else {
      }
    } catch (err) {
      setError(err);
    } finally {
      setDisable(false);
    }
  };
  const Resend = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/signup`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        if (data?.data?.user_id) {
          setUserData((prev) => ({
            ...prev,
            user_id: data.data.user_id,
          }));
        }
        setTimer(120);
        if (data?.login === "yes") {
          localStorage.setItem("userData", JSON.stringify(data?.data));
          showSuccess("User Register Successsful");
          navigate("/");
        }
      }
    } catch (err) {
    } finally {
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
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
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   alert(error);
  // }, [error]);
  // useEffect(() => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     otp: " ",
  //   }));
  // }, [verifyPopup]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (verifyPopup) {
      // Trigger animation on open
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [verifyPopup]);
  useEffect(() => {
    setFlag(countryData[0]?.flag);
  }, [countryData]);
  useEffect(() => {
    if (verifyPopup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [verifyPopup]);
  return (
    <div
      className="min-h-screen w-full  bg-white font-medium"
      // style={{ fontFamily: "IBM Plex Sans sans-serif Arial" }}
    >
      <div
        className=" p-[24px_0px_0px_40px] text-black flex items-center gap-3 cursor-pointer w-fit"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaArrowLeftLong className="size-6" />
        <div className="text-[20px] font-normal">Back</div>
      </div>
      <div className="w-full flex justify-center items-center mt-10 md:mt-20">
        <div className="w-[400px] h-[40rem] md:border-1 border-[#EDEDED] rounded-2xl p-4 text-[14px] sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.06)]">
          <div className="p-4 flex flex-col h-full gap-5">
            <div className=" text-black text-[20px] capitalize font-bold">
              Create Account
            </div>
            <div>
              <label htmlFor="name" className="capitalize text-[#757575]">
                Name
              </label>
              <input
                name="name"
                value={userData.name}
                className=" w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[1rem] text-[#757575]
            focus:outline-none 
             transition-colors duration-300 delay-200"
                onChange={(e) => handle("name", e)}
              />
            </div>
            <div>
              <label htmlFor="Email" className="capitalize text-[#757575]">
                Email id
              </label>
              <input
                name="Email"
                className=" w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[1rem] text-gray-400
            focus:outline-none 
             transition-colors duration-300 delay-200"
             value={userData.email}
                onChange={(e) => handle("email", e)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="phone number"
                className="capitalize text-[#757575]"
              >
                Personal Phone Number
              </label>
              <div
                className="flex  w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-[0px_16px_0px_16px] text-[1rem] text-[#757575]
            focus:outline-none  
             transition-colors duration-300 delay-200 gap-2"
              >
                <div className="w-[4rem] flex items-center ">
                  <img src={flag} className="h-5 w-5" />
                  <input
                    type="text"
                    value={"+ " + countryCode}
                    // onChange={handleChange}
                    onClick={handlePopupOpen}
                    maxLength={3}
                    // placeholder="+91"
                    className="  outline-none text-center w-min focus:outline-none border-r-1 border-[#757575] relative cursor-pointer"
                  />
                </div>
                {isOpenPopup && (
                  <div
                    className="sm:h-[25rem] h-[20rem] p-3 flex flex-col gap-1.5 sm:w-[20rem] w-[15rem] transition-transform duration-500 delay-200  bottom-0 left-0 sm:-bottom-20 sm:-right-5 absolute bg-white z-50  rounded-lg"
                    style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.10)" }}
                  >
                    <div className="flex justify-between">
                      <div className="text-black text-[20px] font-bold">
                        Select Country
                      </div>
                      <div>
                        <IoIosCloseCircle
                          className="h-6 w-6 text-black cursor-pointer"
                          onClick={handlePopupOpen}
                        />
                      </div>
                    </div>
                    <div className="sticky top-0 z-30 bg-white w-full h-fit mb-1">
                      <input
                        className=" w-full  rounded-lg
            h-[2rem] p-4 text-[12px] text-[#757575]
            bg-[#D9D9D940] outline-none focus:outline-none
              duration-300 delay-200"
                        onChange={(e) => SetSearchQuery(e.target.value)}
                        value={searchQuery}
                        placeholder="Select country"
                      />
                    </div>
                    {filteredData?.length > 0 ? (
                      <div className="sm:h-[19rem] h-[17rem]  overflow-y-scroll no-scrollbar">
                        {filteredData?.map((item, index) => (
                          <div
                            key={index}
                            className=" flex items-center p-3 text-black bg-white gap-3 text-[14px] cursor-pointer"
                            onClick={() => {
                              setCountryCode(item?.phonecode);
                              handlePopupOpen();
                              setFlag(item?.flag);
                            }}
                          >
                            <img src={item?.flag} className="h-5 w-5" />
                            <div className="min-w-max">
                              {"+ " + item?.phonecode}
                            </div>
                            <div>{item?.name}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full w-full flex justify-center items-center">
                        No Data Found
                      </div>
                    )}
                  </div>
                )}
                <input
                  name="phone number"
                  value={userData?.phone}
                  pattern="[0-9]*"
                  className="outline-none w-full bg-transparent focus:outline-none "
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits
                    if (/^\d*$/.test(value)) {
                      handle("phone", e);
                    }
                  }}
                />
              </div>
            </div>

            <div className="relative text-black">
              <label htmlFor="password" className="capitalize text-[#757575]">
                password
              </label>
              <input
                name="passwod"
                className=" w-full  rounded-lg bg-[#D9D9D940]
                       focus:outline-none outline-none 
            h-[3rem] p-4 text-[1rem] text-[#757575]
              duration-300 delay-200"
                type={showPassword ? "password" : "text"}
                onChange={(e) => handle("password", e)}
                value={userData.password}
              />
              <div className="cursor-pointer" onClick={handlePassword}>
                {showPassword ? (
                  <IoEye className="absolute right-3 top-8 h-6 w-6" />
                ) : (
                  <IoMdEyeOff className="absolute right-3 top-8 h-6 w-6" />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="Refferal"
                className={` text-[#757575] ${
                  isRefferal && "items-center"
                } flex cursor-pointer `}
                onClick={() => setIsRefferal(!isRefferal)}
              >
                Referral code (Optional){" "}
                {isRefferal ? <FaCaretUp /> : <FaSortDown />}
              </label>
              {isRefferal && (
                <input
                  name="Refferal"
                  className=" w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[1rem] text-[#757575]
            focus:outline-none 
             transition-colors duration-300 delay-200"
             value={userData.referral_id}
                  onChange={(e) => handle("referral_id", e)}
                />
              )}
            </div>
            <div className=" text-[13px] leading-4 text-black">
              I have read and agree to BitzUp
              <a
                href="https://test.bitzup.com/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline p-1"
              >
                {" Terms of Service  "}
              </a>
              And{" "}
              <a
                href="https://test.bitzup.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Privacy Policy.
              </a>
            </div>
            <div className="flex w-full justify-center">
              <button
                onClick={handleSubmit}
                disabled={disable}
                name="account"
                className={`${
                  !disable ? "bg-[#2EDBAD] hover:bg-[#2EDBAD]" : "bg-[#e7eeec]"
                } rounded-xl w-[60%]  h-[2.2rem] text-black cursor-pointer capitalize`}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
      {verifyPopup && (
        <div className="fixed inset-0   flex justify-center items-center bg-[#00000080] z-999">
          <div
            className={`w-[300px] h-[15rem] rounded-2xl p-4 bg-white transform transition-transform duration-1000
          ${isVisible ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className=" flex flex-col h-full gap-6">
              <div className="flex justify-between">
                <div className="text-black text-[20px] font-bold w-[90%] flex justify-center">
                  Verify Email
                </div>
                <div>
                  <IoIosCloseCircle
                    className="h-6 w-6 text-black cursor-pointer"
                    onClick={() => {
                      setVerifyPopup(!verifyPopup);
                      setUserData((prev) => ({
                        ...prev,
                        otp: "",
                      }));
                    }}
                  />
                </div>
              </div>
              <div>
                <input
                  name="Email"
                  className=" w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[12px] text-[#757575]
            focus:outline-none 
             transition-colors duration-300 delay-200"
                  placeholder="Enter OTP"
                  value={userData.otp}
                  onChange={(e) => handle("otp", e)}
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
                      onClick={Resend}
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
                  onClick={verify}
                  disabled={disable}
                  name="verify"
                  className={`${
                    !disable
                      ? "bg-[#2EDBAD] hover:bg-[#2EDBAD]"
                      : "bg-[#e7eeec]"
                  }   rounded-xl w-[60%]  h-[2.2rem]  text-black cursor-pointer capitalize`}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {disable && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
