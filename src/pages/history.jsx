import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../Constant";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { OrderHistory } from "./apiCall";
import { ScaleLoader } from "react-spinners";

export const History = () => {
  const { orderHistory } = useSelector((state) => state.counter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dark = JSON.parse(localStorage.getItem("theme"));
  useEffect(() => {
    OrderHistory(dispatch);
  }, []);
  return (
    <div
      className={`h-screen ${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-white text-[#202630]"
      } text-[12px]  w-full`}
    >
      <div
        className={`flex w-full ${
          dark ? "bg-[#181A20]" : "bg-white"
        } justify-between p-3 text-[16px] fixed top-0 z-30`}
      >
        <div onClick={() => navigate(-1)} className="w-[50%] cursor-pointer">
          <FaArrowLeft />
        </div>
        <div className="flex  w-full"> OrderHistory</div>
      </div>
      <div className="p-4 h-full mt-6  overflow-y-scroll no-scrollbar ">
        {orderHistory?.length > 0 ? (
          <>
            {Array.isArray(orderHistory) &&
              orderHistory?.map((item, index) => {
                const date = formatDate(item?.date_time);
                return (
                  <div
                    className={`flex justify-between border-b-1 ${
                      dark ? "border-[#333B47]" : "border-[#EAECEF]"
                    } p-[16px_0px_16px_0px]`}
                    key={index}
                  >
                    <div className="flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <div>{item?.pair_symbol}</div>
                        <div
                          className={`${
                            item?.type === "BUY"
                              ? "text-[#2EBD85] "
                              : "text-[#F6465D] "
                          }`}
                        >
                          {item?.order_type}/{item?.type}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>Amount</div>
                        <div>Price</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-1 items-end">
                        <div>{date}</div>
                        <div>{item?.status}</div>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <div>
                          {item?.executed_base_quantity}/{item?.base_quantity}
                        </div>
                        <div>{item?.order_price}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <ScaleLoader color="#FCD535" />
          </div>
        )}
      </div>
    </div>
  );
};
