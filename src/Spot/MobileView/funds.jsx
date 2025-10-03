import { useDispatch, useSelector } from "react-redux";
import { RiFileHistoryFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { Progressbar } from "../../Common/CircularBar";
import { formatDate } from "../../Constant";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteOpenOrder } from "../Apis/apiCall";
import { setIsSuccess, setShowPopup } from "../../store/webSocket";
import { ModifyPopup } from "../Orders/Modify/popup";
import { ConfirmationBox } from "../../Common/DeletePopup";

export const Funds = () => {
  const fundData = useSelector((state) => state.counter.fundData);
  const openOrder = useSelector((state) => state.counter.openOrder);
  const showPopup = useSelector((state) => state.counter.showPopup);
  const dark = useSelector((state) => state.counter.dark);
  const [activeTab, SetActiveTab] = useState("open orders");
  const [orderId, setOrderId] = useState(null);
  const popupRef = useRef(null);
  const [isPopup, setIsPopup] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const deleteOrder = (order_id, pair_id) => {
    const orderData = {
      order_id: order_id,
      pair_id: pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
    };
    deleteOpenOrder(
      orderData,
      dispatch,
      setIsSuccess,
      pair_id,
      userData.user_id
    );
  };
  const handleDispatch = () => {
    dispatch(setShowPopup(true));
  };

  return (
    <>
      {showPopup && (
        <div className="w-full h-screen  fixed inset-0  z-40 bg-[#00000080] overflow-hidden">
          <ModifyPopup orderId={orderId} />
        </div>
      )}
      <div>
        <div
          className={`flex justify-between  text-[16px]  p-[16px_16px_0px_16px] ${
            dark
              ? "border-[#333B47] bg-[#181A20] "
              : "border-[#EAECEF] bg-white"
          } border-b-1`}
        >
          <div className="flex items-center gap-5 h-[2rem]">
            <div className="flex flex-col gap-1">
              <div
                onClick={() => SetActiveTab("open orders")}
                className={`${
                  dark
                    ? `${
                        activeTab === "open orders"
                          ? "text-[#EAECEF]"
                          : "text-[#848E9C]"
                      }`
                    : `${
                        activeTab === "open orders"
                          ? "text-[#202630]"
                          : "text-[#B7BDC6]"
                      }`
                }
              }`}
              >
                Open Orders
              </div>
              <div className="flex justify-center w-full h-[2px]">
                {activeTab === "open orders" && (
                  <div className="w-[30%] border-b-2 border-[#2EDBAD]"></div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                onClick={() => SetActiveTab("Funds")}
                className={`${
                  dark
                    ? `${
                        activeTab === "Funds"
                          ? "text-[#EAECEF]"
                          : "text-[#848E9C]"
                      }`
                    : `${
                        activeTab === "Funds"
                          ? "text-[#202630]"
                          : "text-[#B7BDC6]"
                      }`
                }
              }`}
              >
                Funds
              </div>
              <div className="flex justify-center w-full h-[2px]">
                {activeTab === "Funds" && (
                  <div className="w-[50%] border-b-2 border-[#2EDBAD]"></div>
                )}
              </div>
            </div>
          </div>
          <div
            className=" cursor-pointer text-[#848E9C]"
            onClick={() => navigate("/history")}
          >
            <RiFileHistoryFill className="h-4 w-4" />
          </div>
        </div>
        <div className="h-[400px] overflow-y-auto ">
          {activeTab === "Funds" && (
            <div
              className={`p-4 ${
                dark
                  ? "border-[#333B47] bg-[#181A20] "
                  : "border-[#EAECEF] bg-white"
              }`}
            >
              {Array.isArray(fundData?.data) && fundData?.data?.length > 0 ? (
                <>
                  {fundData?.data?.map((item, index) => (
                    <>
                      {item?.balance > 0 && (
                        <div
                          key={index}
                          className={` border-b-1 flex flex-col gap-2 p-2 ${
                            dark
                              ? "border-[#333B47] bg-[#181A20] "
                              : "border-[#EAECEF] bg-white"
                          }`}
                        >
                          <div
                            className={`${
                              dark ? "text-[#EAECEF]" : "text-[#202630]"
                            }`}
                          >
                            {item?.symbol}
                          </div>
                          <div className={`flex flex-col gap-2 `}>
                            <div className="flex justify-between">
                              <div
                                className={`${
                                  dark ? "text-[#4F5867]" : "text-[#B7BDC6]"
                                }`}
                              >
                                Total Balance
                              </div>
                              <div
                                className={`${
                                  dark ? "text-[#EAECEF]" : "text-[#202630]"
                                }`}
                              >
                                {item?.balance}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div
                                className={`${
                                  dark ? "text-[#4F5867]" : "text-[#B7BDC6]"
                                }`}
                              >
                                Available Balance
                              </div>
                              <div
                                className={`${
                                  dark ? "text-[#EAECEF]" : "text-[#202630]"
                                }`}
                              >
                                {item?.balance}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div
                                className={`${
                                  dark ? "text-[#4F5867]" : "text-[#B7BDC6]"
                                }`}
                              >
                                In Order
                              </div>
                              <div
                                className={`${
                                  dark ? "text-[#EAECEF]" : "text-[#202630]"
                                }`}
                              >
                                {0}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div
                                className={`${
                                  dark ? "text-[#4F5867]" : "text-[#B7BDC6]"
                                }`}
                              >
                                BTC Value
                              </div>
                              <div
                                className={`${
                                  dark ? "text-[#EAECEF]" : "text-[#202630]"
                                }`}
                              >
                                {0}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <div
                  className={`flex items-center justify-center h-[300px] text-sm text-gray-400`}
                >
                  No Data found
                </div>
              )}
            </div>
          )}
          {activeTab === "open orders" && (
            <div
              className={`h-full ${
                dark
                  ? "border-[#333B47] bg-[#181A20] "
                  : "border-[#EAECEF] bg-white"
              } w-full`}
            >
              {Array.isArray(openOrder) && openOrder?.length > 0 ? (
                <div className="p-2">
                  {Array.isArray(openOrder) &&
                    openOrder?.map((item, index) => {
                      const date = formatDate(item?.created_at);
                      const percentage =
                        (item?.executed_base_quantity / item?.base_quantity) *
                        100;
                      return (
                        <div
                          className={`flex justify-between  ${
                            dark
                              ? "border-[#333B47] bg-[#181A20] "
                              : "border-[#EAECEF] bg-white"
                          } p-3 border-b-1 `}
                          key={index}
                        >
                          <div className="flex gap-6">
                            <div className="flex flex-col gap-2 justify-center items-center">
                              <div>
                                {item?.order_type}/{item?.type}
                              </div>
                              <div className="h-14 w-14 rounded-full">
                                <Progressbar value={percentage} />
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>BTCUSDT</div>
                              <div className="flex gap-4">
                                <div className="flex flex-col gap-2">
                                  <div>Amount</div>
                                  <div>price</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div>{item?.base_quantity}</div>
                                  <div>{item?.order_price}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div className="min-w-max">{date}</div>
                            <div className="justify-end flex">
                              <FaRegEdit
                                onClick={() => {
                                  handleDispatch();
                                  setOrderId(item?.order_id);
                                }}
                              />
                            </div>
                            <div
                              className="flex justify-end"
                              onClick={() => {
                                setIsPopup(!isPopup);
                                setOrderId(item?.order_id);
                              }}
                            >
                              Cancel
                              {isPopup && (
                                <ConfirmationBox
                                  handleCancel={() => setIsPopup(!isPopup)}
                                  handleSubmit={() => {
                                    deleteOrder(orderId, item?.pair_id);
                                    setIsPopup(!isPopup);
                                  }}
                                  message={
                                    "Are you Sure you want to Delete this order?"
                                  }
                                  dark={dark}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div
                  className={`flex ${
                    dark
                      ? "border-[#333B47] bg-[#181A20] "
                      : "border-[#EAECEF] bg-white"
                  } justify-center text-gray-400 items-center text-sm h-full w-full`}
                >
                  No Data found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
