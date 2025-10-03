import { useEffect } from "react";

export const Loder = ({className}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={`preloader ${className}`}>
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src="/Bitzup.png" alt="" />
        </div>
      </div>
    </div>
  );
};
