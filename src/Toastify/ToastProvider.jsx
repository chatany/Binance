import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right" // top-left, top-right, bottom-left, bottom-right
      autoClose={3000} // auto close after 3 sec
      hideProgressBar    
      newestOnTop={false}
      closeOnClick
      closeButton={true}
      toastClassName={"text-[12px] p-3"}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // "light", "dark", "colored"
    />
  );
};

export default ToastProvider;
