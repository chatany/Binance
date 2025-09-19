// App.js ya index.js me ek baar lagao
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserDataChange = () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        navigate("/login");
      }
    };

    // custom event suno
    window.addEventListener("storage", handleUserDataChange);
    window.addEventListener("userDataChanged", handleUserDataChange);

    // mount par bhi check karo
    handleUserDataChange();

    return () => {
      window.removeEventListener("storage", handleUserDataChange);
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, [navigate]);

  return children;
}

export default AppWrapper;
