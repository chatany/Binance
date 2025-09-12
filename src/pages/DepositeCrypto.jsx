import { Stepper } from "@mui/material";
import { TopNav } from "./TopNavBar";
import { useSelector } from "react-redux";
import VerticalLinearStepper from "../common/Stepper";

export const Crypto = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0  p-5`}
    >
      <div className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </div>
      <VerticalLinearStepper />
    </div>
  );
};
