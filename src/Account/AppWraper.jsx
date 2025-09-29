// App.js ya index.js me ek baar lagao
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AppWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleUserDataChange = () => {
      const userData = localStorage.getItem("userData");
     if (!userData) {
        // ✅ अगर पहली बार load हुआ और login पर नहीं हैं तो login पर भेजो
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
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
  }, [navigate,location.pathname]);
  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData && location.pathname === "/login") {
      const handlePopState = () => {
        navigate("/spot", { replace: true });
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location.pathname, navigate]);

  return children;
}

export default AppWrapper;
