import { useEffect, useState } from "react";
import { showError } from "../Toastify/toastServices";
import { apiRequest } from "../Helper";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Forgotpass = () => {
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
  });
  const [info, setInfo] = useState({});

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
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const user = {
    email: userData.email,
    device_type: info.device_type,
    device_info: " ",
    source: "App",
  };
  const handleSubmit = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/user/forgot-password`,
        data: user,
      });
      const userId = user?.email;
      if (status === 200 && data?.status == 1) {
        navigate(`${`/Reset/${userId}`}`);
      } else if (status === 200 && data?.status == 0) {
        showError(data?.message);
      } else if (data?.status == 3) {
        showError(data?.message, "pok");
      }
    } catch (err) {
    } finally {
    }
  };
  return (
    <div className="min-h-[100vh] w-full flex justify-center items-center bg-white font-medium">
      <div
        className="w-[400px] h-[20rem] md:border-1 border-[#EDEDED] rounded-2xl p-4"
        style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.06)" }}
      >
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
              className=" w-full  rounded-lg bg-[#D9D9D940]
            h-[3rem] p-4 text-[1rem] text-[#757575]
            focus:outline-none 
             transition-colors duration-300 delay-200"
              onChange={(e) => handle("email", e)}
            />
          </div>

          <div className="flex w-full justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#2EDBAD]  rounded-xl w-[60%]  h-[2.2rem] hover:bg-[#2EDBAD] text-black cursor-pointer capitalize"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
