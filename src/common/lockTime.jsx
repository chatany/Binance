import { useState, useEffect } from "react";
import { ConfirmationPopup } from "./confirmationPopup";

export const WithdrawalCountdown = ({ lockoutTime, setPopup, popup }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const handleSubmit = () => {
    setPopup(!popup);
  };
  useEffect(() => {
    const target = new Date(lockoutTime);

    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = target - now;

      if (diffMs <= 0) {
        clearInterval(interval);
        setTimeLeft("Withdrawal is unlocked ✅");
        return;
      }

      const diffSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffSec / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutTime]);

  return (
    <ConfirmationPopup
      handleSubmit={() => setPopup(false)}
      subTitle={`For your security,withdrawals are on hold.you will be able to withdraw again at ${timeLeft}`}
      check={false}
      title="withdrawal Temporarily Disabled"
      bottom={false}
      submit={
        <button
          onClick={handleSubmit}
          className={`rounded-[12px] p-2 w-full text-[#000000]  bg-[#2EDBAD] `}
        >
          {" "}
          I understand
        </button>
      }
    />
  );
};
