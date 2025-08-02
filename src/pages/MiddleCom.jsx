import { useDispatch, useSelector } from "react-redux";
import { setCurrentPrice } from "../store/webSocket";
import {
  FaAngleDown,
  FaAngleRight,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { ScaleLoader } from "react-spinners";

export const Middle = ({ dark }) => {
  const { tradeData, tikerData, orderData } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex justify-between w-full gap-1">
        <div
          className={`${
            dark ? " bg-[#181A20]" : " bg-white"
          } w-[50%] overflow-x-auto overflow-y-auto h-full no-scrollbar rounded-lg p-2`}
        >
          {" "}
          {Array.isArray(tradeData) && tradeData?.length > 0 ? (
            <table className="w-full h-[95%]">
              <thead>
                <tr>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 sticky top-0 text-left p-[4px]  w-1/3 z-30`}
                  >
                    Price (USDT)
                  </th>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400  sticky top-0 text-center p-[4px]  w-1/3 z-30`}
                  >
                    Amount ({tikerData?.symbol?.split("USDT")[0]})
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
                          } text-[.6rem] p-[2px] text-left `}
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
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <ScaleLoader color="#FCD535" />
            </div>
          )}
        </div>
        <div
          className={`${
            dark ? "bg-[#181A20]" : "bg-white "
          } w-[50%] h-full  rounded-lg`}
        >
          {" "}
          <div className="w-full h-[50%] p-2">
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
            <div className="h-[10rem] no-scrollbar overflow-x-auto overflow-y-auto">
              {orderData?.bids?.length > 0 ? (
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
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <ScaleLoader color="#FCD535" />
                </div>
              )}
            </div>
          </div>
          <div className="h-[50%] p-2">
            {orderData?.asks?.length > 0 ? (
              <div className="overflow-x-auto overflow-y-auto h-[95%] no-scrollbar ">
                <table className="w-full pb-2 ">
                  <thead className="w-full">
                    <tr>
                      <th
                        className={`text-[16px] ${
                          !tradeData[0]?.m
                            ? "text-[#2EBD85] "
                            : "text-[#F6465D] "
                        }  ${
                          dark ? "bg-[#181A20]" : "bg-white"
                        }  w-1/3 sticky top-0 z-30 gap-2 p-[4px]`}
                      >
                        <div className="flex items-center">
                          {parseFloat(tikerData?.lastPrice).toFixed(2)}
                          {!tradeData[0]?.m ? (
                            <FaArrowUp className="text-[20px] text-[#2EBD85]  p-[4px] sticky top-0 z-30" />
                          ) : (
                            <FaArrowDown className="text-[20px] text-[#F6465D] p-[4px] sticky top-0 z-30" />
                          )}
                        </div>
                      </th>
                      <th
                        className={`text-[12px]  text-gray-400 sticky top-0 z-30 text-center ${
                          dark ? "bg-[#181A20]" : "bg-white"
                        }   p-1 w-1/3`}
                      >
                        ${parseFloat(tikerData?.lastPrice)}
                      </th>
                      <th
                        className={` sticky top-0 z-30 justify-center ${
                          dark ? "bg-[#181A20]" : "bg-white"
                        }  w-1/3`}
                      >
                        <div className="flex  items-center w-full justify-center">
                          <FaAngleRight className=" text-[16px]" />
                        </div>
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
                          <td className="lg:text-[12px] text-[.6rem]   text-[#2EBD85] p-[2px] w-1/3">
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
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <ScaleLoader color="#FCD535" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
