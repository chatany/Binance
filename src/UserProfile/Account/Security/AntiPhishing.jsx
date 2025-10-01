import { useDispatch, useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { TopNav } from "../../../Spot/Navbar/TopNavBar";
import { apiRequest } from "../../../Helper";
import { showError } from "../../../Toastify/toastServices";
import { getUserProfile } from "../../../Spot/Apis/apiCall";
import { Loder } from "../../../Common/Loder";

export const AntiPhishing = () => {
  const dark = useSelector((state) => state.counter.dark);
  const userProfile = useSelector((state) => state.counter.userProfile);
  const [showPopup, setShowPopup] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = () => {
    setShowPopup(!showPopup);
    setStep(1);
  };
  const [userData, setUserData] = useState({
    antiCode: "",
    authenticatorCode: "",
  });
  const handle = (key, e) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  useEffect(() => {
    setUserData({
      authenticatorCode: "",
      antiCode: "",
    });
  }, [showPopup]);

  const conditions = {
    length: userData?.antiCode.length >= 8 && userData?.antiCode.length <= 32,
    upper: /[A-Z]/.test(userData?.antiCode),
    lower: /[a-z]/.test(userData?.antiCode),
    digit: /\d/.test(userData?.antiCode),
    underscore: /_/.test(userData?.antiCode),
  };

  const typeCount = [
    conditions.upper,
    conditions.lower,
    conditions.digit,
    conditions.underscore,
  ].filter(Boolean).length;

  const isValid = typeCount >= 3;
  const handleSubmit = async () => {
    if (userData?.authenticatorCode === "") {
      showError("Please Provide Authenticator Code !");
      return;
    }
    setIsDisable(true);
    const user = {
      anti_phishing_code: userData?.antiCode,
      authenticator_code: userData?.authenticatorCode,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/set-anti-phishing-code`,
        data: user,
      });

      if (status === 200 && data?.status == 1) {
        setShowPopup(false);
        navigate(-1);
        getUserProfile(dispatch);
      } else if (status === 200 && data?.status == 0) {
        showError(data?.message);
      }
    } catch (err) {
    } finally {
      setIsDisable(false);
    }
  };
  useEffect(() => {
    if (Object.keys(userProfile).length === 0) {
      getUserProfile(dispatch);
    }
  }, [userProfile]);
  return (
    <div
      className={`
          ${
            dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#000000]"
          }
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
          Anti-Phishing Code
        </div>
      </div>
      {!userProfile?.anti_phishing_code ? (
        <div className="flex w-full justify-center">
          <div className="w-[425px] flex flex-col items-center gap-[20px]">
            <div>
              <img src="/phishing.svg" className="h-[240px] w-[240px]" />
            </div>
            <div className="flex flex-col gap-[40px]">
              <div>
                <div className="text-[20px] font-semibold leading-[28px] max-sm:text-[18px] ">
                  How Does the Anti-Phishing Code Work?
                </div>
                <div className="text-[14px] font-normal leading-[22px] text-[#757575]">
                  You can create your own anti-phishing code to appear in
                  official Binance emails and SMS messages. This feature helps
                  you verify the authenticity of communications from Binance.
                </div>
              </div>
              <button
                className={`rounded-[12px]  w-full h-[48px] ${
                  false ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                } text-[#000000] cursor-pointer text-[16px] font-medium leading-[24px] capitalize`}
                onClick={toggle}
              >
                create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <div className="w-[425px] flex flex-col items-center gap-[20px]">
            <div>
              <img src="/phishing.png" className="h-[240px] w-[240px]" />
            </div>
            <div className="flex flex-col gap-[40px] w-full">
              <div className="w-full flex flex-col items-center">
                <div className="text-[14px] font-medium leading-[28px] max-sm:text-[18px] ">
                  Current Anti-Phishing Code
                </div>
                <div className="text-[32px] font-semibold leading-[22px] ">
                  {userProfile?.anti_phishing_code}
                </div>
              </div>
              <button
                className={`rounded-[12px]  w-full h-[48px] ${
                  false ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                } text-[#000000] cursor-pointer text-[16px] font-medium leading-[24px] capitalize`}
                onClick={toggle}
              >
                Change Anti-Phishing Code
              </button>
            </div>
          </div>
        </div>
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
            {step === 1 ? (
              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-end w-full">
                    <IoMdClose className="size-6" onClick={toggle} />
                  </div>
                  <div
                    className="w-full text-[32px] max-md:text-[20px]
              font-semibold
              leading-[40px]"
                  >
                    Create Anti-Phishing Code
                  </div>
                </div>
                <div className="w-full">
                  <label>Anti-Phishing Code</label>
                  <input
                    name="newEmail"
                    maxLength={32}
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
                    value={userData?.antiCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^[a-zA-Z0-9]*$/.test(val)) {
                        handle("antiCode", e);
                      }
                    }}
                  />
                  <div className={`text-[14px] font-medium leading-[22px]  `}>
                    <div
                      className={`flex items-center gap-2
                    ${
                      dark
                        ? `${
                            !conditions.length
                              ? "text-[#707A8A]"
                              : "text-[#EAECEF]"
                          }`
                        : `${
                            !conditions.length
                              ? "text-[#9C9C9C]"
                              : "text-[#000000]"
                          }`
                    }`}
                    >
                      <MdCheck
                        className={`${conditions.length && "text-green-500"}`}
                      />
                      8-32 characters
                    </div>
                    <div
                      className={`flex items-center gap-2
                    ${
                      dark
                        ? `${isValid ? "text-[#707A8A]" : "text-[#EAECEF]"}`
                        : `${!isValid ? "text-[#9C9C9C]" : "text-[#000000]"}`
                    }`}
                    >
                      {" "}
                      <MdCheck className={`${isValid && "text-green-500"}`} />
                      At least 3 of the following types:
                    </div>
                    <div className="pl-4">
                      <div
                        className={`flex items-center gap-2
                    ${
                      dark
                        ? `${
                            !conditions.upper
                              ? "text-[#707A8A]"
                              : "text-[#EAECEF]"
                          }`
                        : `${
                            !conditions.upper
                              ? "text-[#9C9C9C]"
                              : "text-[#000000]"
                          }`
                    }`}
                      >
                        <BsDot />
                        Uppercase letter
                      </div>
                      <div
                        className={`flex items-center gap-2
                    ${
                      dark
                        ? `${
                            !conditions.lower
                              ? "text-[#707A8A]"
                              : "text-[#EAECEF]"
                          }`
                        : `${
                            !conditions.lower
                              ? "text-[#9C9C9C]"
                              : "text-[#000000]"
                          }`
                    }`}
                      >
                        <BsDot />
                        Lowercase letter
                      </div>
                      <div
                        className={`flex items-center gap-2
                    ${
                      dark
                        ? `${
                            !conditions.digit
                              ? "text-[#707A8A]"
                              : "text-[#EAECEF]"
                          }`
                        : `${
                            !conditions.digit
                              ? "text-[#9C9C9C]"
                              : "text-[#000000]"
                          }`
                    }`}
                      >
                        <BsDot />
                        Digit
                      </div>
                      <div
                        className={`flex items-center gap-2
                    ${
                      dark
                        ? `${
                            !conditions.underscore
                              ? "text-[#707A8A]"
                              : "text-[#EAECEF]"
                          }`
                        : `${
                            !conditions.underscore
                              ? "text-[#9C9C9C]"
                              : "text-[#000000]"
                          }`
                    }`}
                      >
                        <BsDot />
                        Underscore
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!conditions.length || typeCount < 3}
                  className={`rounded-[12px]  w-full h-[48px] ${
                    !conditions.length || typeCount < 3
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    isDisable ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                  } text-[#000000]  cursor-pointer`}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-end w-full">
                    <IoMdClose className="size-6" onClick={toggle} />
                  </div>
                  <div
                    className="w-full text-[32px] max-md:text-[20px]
              font-semibold
              leading-[40px]"
                  >
                    Create Anti-Phishing Code
                  </div>
                </div>
                <div className="w-full">
                  <label>Authenticator Code</label>
                  <input
                    name="newEmail"
                    maxLength={6}
                    className={` w-full  rounded-lg 
                                                h-[3rem] p-4 text-[12px] 
                                                ${
                                                  dark
                                                    ? "border-[#474D57] focus:border-[#2EDBAD] "
                                                    : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                                                }
                                                focus:outline-none   border-1
                                                 transition-colors duration-300 delay-200`}
                    placeholder="Enter Authenticator Code "
                    value={userData?.authenticatorCode}
                    onChange={(e) => handle("authenticatorCode", e)}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isDisable}
                  className={`rounded-[12px]  w-full h-[48px]  ${
                    isDisable ? "bg-[#e7eeec]" : "bg-[#2EDBAD] "
                  } text-[#000000]  cursor-pointer`}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isDisable && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
