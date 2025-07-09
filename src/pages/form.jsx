import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CryptoInput from "./common";
import { useSelector } from "react-redux";
import { tab } from "../Constant";
import { useState } from "react";
export const Form = ({ dark }) => {
  const isOpen = useSelector((state) => state.counter.open);
  const [active, setActive] = useState("Sport");
  const CustomSlider = styled(Slider)(({ theme }) => ({
    height: "1px",
    color: "#fff",

    "& .MuiSlider-rail": {
      opacity: 1,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      height: "2px",
    },
    "& .MuiSlider-track": {
      backgroundColor: `${dark ? "gray" : "gray"}`,
      height: "3px",
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
    },
    "& .MuiSlider-mark": {
      width: 8,
      height: 8,
      backgroundColor: `${dark ? "#aaa" : "rgb(245, 245, 245)"}`,
      border: "1px solid black",
      transform: "rotate(45deg)",
      marginTop: -4,
      marginLeft: -5,
    },
    "& .MuiSlider-markActive": {
      border: `4px solid ${dark ? "rgb(245, 245, 245)" : "black"}`,
      width: 14,
      height: 14,
      marginTop: -7,
      marginLeft: -6,
    },
    "& .MuiSlider-valueLabel": {
      display: "none",
    },
    "& .MuiSlider-markLabel": {
      display: "none",
      color: `${dark ? "#ffffff" : "#000000"}`,
      fontSize: "14px",
    },
  }));

  const marks = [
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];
  return (
    <div
      className={` ${
        isOpen ? "h-[33rem]" : "h-[28rem]"
      }  transition-all duration-500 delay-100 rounded-lg  ${
        dark ? "bg-[#181A20]" : "bg-white"
      }`}
    >
      <div className={` ${dark ? "border-[#2B3139]" : "border-[#EAECEF]"} border-b-1`}>
        <div className=" flex text-[12px] p-2 w-[50%]">
          {tab.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-1 text-center py-2 font-medium transition-colors cursor-pointer duration-300 ${
                dark
                  ? active === tab
                    ? "text-yellow-500 border-b-2  bg-[#181A20]"
                    : "text-gray-600 hover:text-yellow-500 bg-[#181A20] border-[50%]"
                  : active === tab
                  ? "text-yellow-500 border-b-2 bg-white border-[50%]"
                  : "text-gray-600 hover:text-yellow-500 bg-zinc-100 border-[50%]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`flex sm:flex-row justify-center w-full  gap-3 flex-col items-center  `}
      >
        <div className="w-full space-y-2">
          <div className="p-[5px]">
            <CryptoInput
              label="Price"
              unit="USDT"
              step={0.01}
              defaultValue="107814.08"
              dark={dark}
            />
            <CryptoInput
              label="Amount"
              unit="BTC"
              step={0.01}
              defaultValue={0.01}
              dark={dark}
            />
          </div>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                maxWidth: "100%",
                color: "white",
              }}
            >
              <CustomSlider
                defaultValue={0}
                marks={marks}
                min={0}
                max={100}
                step={1}
              />
            </Box>
          </Box>
          <div className="flex items-center space-x-2 p-2 ">
            <input
              id="tp-sl"
              type="checkbox"
              className="accent-amber-400 cursor-pointer"
            />
            <label htmlFor="tp-sl" className="text-gray-300 text-[16px]">
              TP/SL
            </label>
          </div>

          <div className="text-[16px] p-2">
            <div className="flex justify-between">
              <div className="flex justify-between text-gray-400">Avbl</div>
              <span className="">-- USDT</span>
            </div>
            <div className="flex justify-between">
              <div className="underline  text-gray-400">Max Buy</div>

              <div> --BTC</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="w-[100%]  bg-[#2EBD85] hover:bg-[#0e9e67]  m-2 py-2 rounded-md h-[3rem] text-[16px] font-semibold cursor-pointer">
              Log In
            </button>
          </div>
        </div>
        <div
          // className={`${
          //   dark
          //     ? "bg-[#111] text-white border-gray-700"
          //     : "bg-zinc-50 text-black border-gray-200"
          // }   border  space-y-2 w-full  text-xl`}
          // id="a"
          className="w-full space-y-2"
        >
          <div style={{ padding: "5px", maxWidth: "100%" }}>
            <CryptoInput
              label="Price"
              unit="USDT"
              step={0.01}
              dark={dark}
              defaultValue="107814.08"
            />
            <CryptoInput
              label="Amount"
              unit="BTC"
              step={0.01}
              dark={dark}
              defaultValue={0.01}
            />
          </div>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                maxWidth: "100%",
              }}
            >
              <CustomSlider
                defaultValue={0}
                marks={marks}
                min={0}
                max={100}
                step={null}
              />
            </Box>
          </Box>
          <div className="flex items-center space-x-2 p-2 ">
            <input
              id="tp-sl"
              type="checkbox"
              className="accent-amber-400 cursor-pointer"
            />
            <label htmlFor="tp-sl" className="text-gray-300 text-[16px]">
              TP/SL
            </label>
          </div>

          <div className="text-[16px] p-2">
            <div className="flex justify-between">
              <div className="flex justify-between text-gray-400">Avbl</div>
              <div> --BTC</div>
            </div>
            <div className="flex justify-between">
              <div className="underline  text-gray-400">Max Buy</div>

              <div>--USDT</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="w-[100%] bg-[#F6465D] hover:bg-[#c74052] cursor-pointer  h-[3rem]  py-2 m-2 rounded-md text-[16px] font-semibold">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
