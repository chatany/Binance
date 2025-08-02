// hooks/useAuth.js
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userData"));
  });

  useEffect(() => {
    const syncLogin = () => {
      const newUser = JSON.parse(localStorage.getItem("userData"));
      setUser(newUser);
    };

    window.addEventListener("storage", syncLogin);
    return () => window.removeEventListener("storage", syncLogin);
  }, []);

  return user;
};
