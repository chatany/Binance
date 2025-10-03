import { useEffect, useState } from "react";

export const useDeviceInfo = () => {
  const [info, setInfo] = useState({});
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
      // userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      // cookiesEnabled: navigator.cookieEnabled,
      // screen: {
      //   width: window.screen.width,
      //   height: window.screen.height,
      // },
    };

    setInfo({
      source: "APP",
      device_type: getSystemName(),
      device_info: JSON.stringify(device_info),
    });
  }, []);
  return info;
};
