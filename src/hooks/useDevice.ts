import { useState, useEffect } from "react";

const getDeviceType = (userAgent: string): string => {
  if (/mobile/i.test(userAgent)) {
    return "mobile";
  } else if (/tablet/i.test(userAgent)) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const useDevice = () => {
  const [deviceType, setDeviceType] = useState<string>(
    getDeviceType(navigator.userAgent),
  );

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(navigator.userAgent));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDevice;
