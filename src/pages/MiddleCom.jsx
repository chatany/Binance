import { useDispatch, useSelector } from "react-redux";
import { setCurrentPrice } from "../store/webSocket";
import {
  FaAngleDown,
  FaAngleRight,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";

export const Middle = ({ dark }) => {
  const { tradeData, tikerData, orderData } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between w-full gap-1">
      <div
        className={`${
          dark ? " bg-[#181A20]" : " bg-white"
        } w-[50%] overflow-x-auto overflow-y-auto h-[22rem] no-scrollbar rounded-lg`}
      >
        {" "}
        <table className="w-full">
          <thead>
            <tr>
              <th
                className={`${
                  dark ? "bg-[#181A20]" : "bg-white"
                } text-[12px] text-gray-400 sticky top-0 text-center p-[4px]  w-1/3 z-30`}
              >
                Price (USDT)
              </th>
              <th
                className={`${
                  dark ? "bg-[#181A20]" : "bg-white"
                } text-[12px] text-gray-400  sticky top-0 text-center p-[4px]  w-1/3 z-30`}
              >
                Amount (BTC)
              </th>
              <th
                className={`${
                  dark ? "bg-[#181A20]" : "bg-white"
                } text-[12px] text-gray-400  sticky top-0 text-center p-[4px] w-1/3  z-30`}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tradeData) &&
              tradeData?.map((item, index) => {
                const formatTime = (ms) => {
                  const date = new Date(ms);
                  return (
                    `${date.getHours().toString().padStart(2, "0")}:` +
                    `${date.getMinutes().toString().padStart(2, "0")}:` +
                    `${date.getSeconds().toString().padStart(2, "0")}`
                  );
                };
                const time = formatTime(item?.T);
                const price = parseFloat(item?.p).toFixed(2);
                const amount = parseFloat(item?.q).toString();
                const formatToKMB = (num) => {
                  if (num >= 1_000_000_000) {
                    return (num / 1_000_000_000).toFixed(2) + "B";
                  } else if (num >= 1_000_000) {
                    return (num / 1_000_000).toFixed(2) + "M";
                  } else if (num >= 1_000) {
                    return (num / 1_000).toFixed(2) + "K";
                  } else {
                    return (num / 1).toFixed(3);
                  }
                };
                const amounts = formatToKMB(amount);
                return (
                  <tr
                    className="cursor-pointer"
                    key={index}
                    onClick={() => {
                      dispatch(setCurrentPrice(price));
                    }}
                  >
                    <td
                      className={`lg:text-[12px] ${
                        !item?.m ? "text-[#2EBD85]" : "text-[#F6465D] w-1/3"
                      } text-[.6rem] p-[2px] text-center `}
                    >
                      {price}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] p-[2px] text-center w-1/3">
                      {amounts}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] text-center  p-[2px] w-1/3">
                      {time}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        className={`${
          dark ? "bg-[#181A20]" : "bg-white "
        } w-[50%] h-[21rem]  rounded-lg`}
      >
        {" "}
        <div className="w-full ">
          <div className="flex p-2 justify-between w-full items-center">
            <div className="flex text-[12px] items-center h-[1rem]">
              <div>
                <IoMdListBox />
              </div>
              <div>
                <IoMdListBox />
              </div>
              <div>
                <IoMdListBox />
              </div>
            </div>
            <div className="text-[12px] h-[1rem] pr-10">
              <FaAngleDown className="h-5 w-5" />
            </div>
          </div>
          <div className="max-h-[9rem] no-scrollbar overflow-x-auto overflow-y-auto p-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className={`text-[12px] ${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-gray-400 text-left p-1 w-1/3 sticky top-0 z-30`}
                  >
                    Price(USDT)
                  </th>
                  <th
                    className={`text-[12px] text-gray-400  ${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-center w-1/3 pl-2  sticky top-0 z-30`}
                  >
                    Amount ({tikerData?.symbol?.split("USDT")[0]})
                  </th>
                  <th
                    className={`text-[12px] text-gray-400  text-center  sticky w-1/3 top-0 ${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } z-30`}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData?.bids?.map((item, index) => {
                  const price = parseFloat(item[0]).toFixed(2);
                  const amount = parseFloat(item[1]).toString();
                  const total = parseFloat(price * amount).toString();
                  const formatToK = (num) => {
                    if (num >= 1000) {
                      return (num / 1000).toFixed(2) + "K";
                    } else {
                      return (num / 1).toFixed(3);
                    }
                  };
                  const totalAmount = formatToK(total);
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        dispatch(setCurrentPrice(price));
                      }}
                    >
                      <td className="lg:text-[12px] text-[.6rem]  p-[2px] text-[#F6465D] w-1/3">
                        {price}
                      </td>
                      <td className="lg:text-[12px] text-[.6rem] p-[2px] pl-2 text-center w-1/3">
                        {amount}
                      </td>
                      <td className="lg:text-[12px] text-[.6rem]  p-[2px] w-1/3 text-center ">
                        {totalAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-[50%] no-scrollbar  p-2 ">
          <table className="w-full ">
            <thead className="w-full">
              <tr className="top-0 bg-black z-30 ">
                <th
                  className={`text-[16px] ${
                    !tradeData[0]?.m ? "text-[#2EBD85] " : "text-[#F6465D] "
                  }  p-1 flex items-center  w-full sticky top-0 z-30 gap-2`}
                >
                  {parseFloat(tikerData?.lastPrice).toFixed(2)}
                  {!tradeData[0]?.m ? (
                    <FaArrowUp className="text-[20px] text-[#2EBD85]" />
                  ) : (
                    <FaArrowDown className="text-[20px] text-[#F6465D] " />
                  )}
                </th>
                <th className="text-[12px]  text-gray-400 text-center  p-1 w-1/3">
                  ${parseFloat(tikerData?.lastPrice)}
                </th>
                <th className="flex  items-center justify-center  sticky top-0 z-30">
                  <FaAngleRight className=" text-[16px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.asks?.map((item, index) => {
                const price = parseFloat(item[0]).toFixed(2);
                const amount = parseFloat(item[1]).toString();
                const total = parseFloat(price * amount);
                const formatToK = (num) => {
                  if (num >= 1000) {
                    return (num / 1000).toFixed(2) + "K";
                  } else {
                    return num.toFixed(2);
                  }
                };
                const totalAmount = formatToK(total);
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      dispatch(setCurrentPrice(price));
                    }}
                  >
                    <td className="lg:text-[12px] text-[.6rem]  text-[#2EBD85] p-[2px] w-1/3">
                      {price}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem]  p-[2px] w-1/3 text-center ">
                      {amount}
                    </td>
                    <td className="lg:text-[12px] text-[.6rem] text-center p-[2px] w-1/3 ">
                      {totalAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
