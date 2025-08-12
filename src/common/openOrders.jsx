import { useDispatch, useSelector } from "react-redux";
import { formatDate, tabs } from "../Constant";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOpenOrder } from "../pages/apiCall";
import {
  setIsSuccess,
  setOpenOrderData,
  setShowPopup,
} from "../store/webSocket";
import { ScaleLoader } from "react-spinners";
import { ModifyPopup } from "./popup";
import { FaRegEdit } from "react-icons/fa";
import { ConfirmationBox } from "./deletePopup";
import { useDeviceInfo } from "../hooks/useDeviceInfo";

export const OpenOrders = ({ dark }) => {
  const { openOrder, orderHistory, loading, fundData, apiId, showPopup } =
    useSelector((state) => state.counter);
  const popupRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Open Orders");
  const [orderId, setOrderId] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const deviceInfo = useDeviceInfo();
  const reconnectTimerRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const deleteOrder = (order_id, pair_id) => {
    const orderData = {
      order_id: order_id,
      pair_id: pair_id,
      user_id: userData.user_id,
      device_type: deviceInfo?.device_type,
      device_info: deviceInfo?.device_info,
      source: deviceInfo?.source,
    };
    deleteOpenOrder(
      orderData,
      dispatch,
      setIsSuccess,
      pair_id,
      userData.user_id
    );
  };
  const userid = userData?.user_id;
  useEffect(() => {
    const startWebSocket = () => {
      const url =
        apiId == "bitget"
          ? "wss://test.bitzup.com/bit-exec-report"
          : "wss://test.bitzup.com/bin-exec-report";
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        wsRef.current.send(JSON.stringify({ user_id: userid }));

        console.log(`📤 Sent: ${userid}`);
      };

      wsRef.current.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        if (!messageData?.status || !messageData?.data) return;

        const orderId = messageData.data.order_id;

        if (messageData.status === "1") {
          const orderExists = openOrder.some((o) => o.order_id === orderId);

          if (!orderExists) {
            dispatch(setOpenOrderData([messageData.data, ...openOrder]));
          }
        }

        if (messageData.status === "2") {
          const updated = openOrder.map((o) =>
            o.order_id === orderId ? messageData.data : o
          );
          dispatch(setOpenOrderData(updated));
        }

        if (messageData.status === "3" || messageData.status === "4") {
          const filtered = openOrder.filter((o) => o.order_id !== orderId);
          dispatch(setOpenOrderData(filtered));
        }
        console.log("📩 Message:", messageData);
      };

      wsRef.current.onerror = (error) => {
        wsRef.current.close();
      };

      wsRef.current.onclose = () => {
        reconnectTimerRef.current = setTimeout(() => {
          startWebSocket();
        }, 1000);
      };
    };
    startWebSocket();
    // return () => {
    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
    // };
  }, [apiId]);
  const handleDispatch = () => {
    dispatch(setShowPopup(true));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        dispatch(setShowPopup(false));
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);
  return (
    <div
      className={`h-fit relative mb-5 w-full ${
        dark ? " bg-[#181A20]" : " bg-white "
      } `}
    >
      <div
        className={`${
          dark ? " bg-[#181A20] border-[#2B3139]" : "border-[#EAECEF] bg-white"
        } border-b-[1px]`}
      >
        <div className="flex   gap-5 items-center text-[14px] leading-4  w-full font-medium p-1 pb-0 ">
          {tabs.map((tab) => (
            <div className="flex flex-col gap-1" key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 font-medium transition-colors min-w-max cursor-pointer duration-300 ${
                  activeTab === tab
                    ? "text-yellow-500"
                    : "text-gray-600 hover:text-yellow-500"
                }`}
              >
                {tab}
              </button>
              {activeTab === tab && (
                <div className="flex justify-center w-full">
                  <div className="w-[30%] border-b-2 border-amber-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full  custom-scroll overflow-x-auto text-[12px] leading-4 flex-nowrap font-medium">
        {userData?.token ? (
          <>
            {" "}
            {activeTab === "Open Orders" && (
              <>
                <div className="w-full p-0">
                  <table className="w-full">
                    <thead className="h-[3rem]">
                      <tr className="">
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px]
                          ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0
                           text-center text-[#707A8A] capitalize min-w-[8rem]`}
                        >
                          Date
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A]   ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 min-w-[8rem] capitalize`}
                        >
                          Pair
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] text-center ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          Type
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          side
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          price
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          amount
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] text-center ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-[#707A8A]  capitalize min-w-[8rem]`}
                        >
                          amount per Iceberg Order
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] text-center ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          Filled
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          Total
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A]  capitalize ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 min-w-[8rem]`}
                        >
                          Tgiger Conditions
                        </th>
                        <th
                          className={`text-[12px] pl-1 ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 pr-1 p-[4px] text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          SOR
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          status
                        </th>
                        <th
                          className={`text-[12px] pl-1 pr-1 p-[4px] ${
                            dark ? "bg-[#181A20]" : " bg-white"
                          } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          cancel
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        <>
                          {Array.isArray(openOrder) && openOrder?.length > 0 ? (
                            <>
                              {Array.isArray(openOrder) &&
                                openOrder?.map((item, index) => {
                                  const date = formatDate(item?.created_at);
                                  const percentage =
                                    (item?.executed_base_quantity /
                                      item?.base_quantity) *
                                    100;
                                  return (
                                    <tr key={index}>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize ">
                                        {date}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center uppercase">
                                        {"BtcUsdt"}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.order_type}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.type}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        <div className="flex gap-2 items-center  justify-center cursor-pointer">
                                          {item?.order_price}
                                          <FaRegEdit
                                            className="h-3 w-3"
                                            onClick={() => {
                                              handleDispatch();
                                              setOrderId(item?.order_id);
                                            }}
                                          />
                                        </div>
                                        {orderId && showPopup && (
                                          <div
                                            className="absolute -top-[150px]  z-50"
                                            ref={popupRef}
                                          >
                                            <ModifyPopup
                                              orderId={orderId}
                                              dark={dark}
                                            />
                                          </div>
                                        )}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        <div className="flex gap-2 items-center justify-center cursor-pointer">
                                          {item?.base_quantity}
                                          <FaRegEdit
                                            onClick={() => {
                                              handleDispatch();
                                              setOrderId(item?.order_id);
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        --
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {percentage}%
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        --
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        --
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        --
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.status}
                                      </td>
                                      <td
                                        className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize cursor-pointer"
                                        onClick={() => {
                                          setIsPopup(!isPopup);
                                          setOrderId(item?.order_id);
                                        }}
                                      >
                                        cancel
                                        {isPopup && (
                                          <ConfirmationBox
                                            handleCancel={() =>
                                              setIsPopup(!isPopup)
                                            }
                                            handleSubmit={() => {
                                              deleteOrder(
                                                orderId,
                                                item?.pair_id
                                              );
                                              setIsPopup(!isPopup);
                                            }}
                                            message={
                                              "Are you Sure you want to Delete this order?"
                                            }
                                            dark={dark}
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </>
                          ) : (
                            <tr>
                              <td
                                colSpan={13}
                                rowSpan={6}
                                className="text-center text-sm py-4"
                              >
                                <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
                                  No Data found
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={13}>
                            <div className="h-[10rem] w-full flex justify-center items-center">
                              <ScaleLoader color="#FCD535" />
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {activeTab === "Order History" && (
              <>
                <div className="p-3">
                  <div className="w-full">
                    <table className="min-w-[700px] w-full text-[12px] border-separate border-spacing-0">
                      <thead>
                        <tr
                          className={`${
                            dark ? "bg-[#2a2e39] text-white" : "bg-zinc-100 "
                          }`}
                        >
                          {[
                            "Date",
                            "Pair",
                            "Type",
                            "Side",
                            "Price",
                            "Amount",
                            "Status",
                          ].map((header, idx) => (
                            <th
                              key={idx}
                              className={`text-[12px] pl-1 pr-1 p-[4px] ${
                                dark ? "bg-[#181A20]" : " bg-white"
                              } z-10 sticky top-0 text-center text-[#707A8A] min-w-[8rem] capitalize`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(orderHistory) &&
                        orderHistory.length > 0 ? (
                          <>
                            {Array.isArray(orderHistory) &&
                            orderHistory.length > 0 ? (
                              orderHistory.map((item, index) => {
                                const date = formatDate(item?.date_time);
                                const isEven = index % 2 === 0;
                                return (
                                  <tr
                                    key={index}
                                    className={`
                                ${
                                  dark
                                    ? "bg-[#1e1f25]"
                                    : // : "bg-[#2b2d35]"
                                      "bg-white "
                                  // : "bg-zinc-100"
                                } transition-all duration-200`}
                                  >
                                    <td className="p-1 text-center whitespace-nowrap">
                                      {date}
                                    </td>
                                    <td className="p-1 text-center uppercase whitespace-nowrap">
                                      {item?.pair_symbol}
                                    </td>
                                    <td className="p-1 text-center capitalize text-blue-400 whitespace-nowrap">
                                      {item?.order_type}
                                    </td>
                                    <td
                                      className={`p-1 text-center capitalize whitespace-nowrap ${
                                        item?.type?.toLowerCase() === "buy"
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {item?.type}
                                    </td>
                                    <td className="p-1 text-center  whitespace-nowrap">
                                      {item?.order_price}
                                    </td>
                                    <td className="p-1 text-center whitespace-nowrap">
                                      {item?.base_quantity}
                                    </td>
                                    <td
                                      className={`p-1 text-center capitalize whitespace-nowrap ${
                                        item?.status === "FILLED"
                                          ? "text-green-400"
                                          : item?.status === "pending"
                                          ? "text-yellow-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {item?.status}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan={8}
                                  className="text-center py-10 text-gray-400"
                                >
                                  No Data Found
                                </td>
                              </tr>
                            )}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={8}>
                              <div className="h-[10rem] w-full flex justify-center items-center">
                                <ScaleLoader color="#FCD535" />
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            {activeTab === "Funds" && (
              <div className="w-full p-0">
                <table className="w-full">
                  <thead className="h-[3rem]">
                    <tr className="">
                      <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize w-1/5">
                        Coin
                      </th>
                      <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/5 capitalize">
                        Total balance
                      </th>
                      <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/5 capitalize">
                        Available Balance
                      </th>
                      <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/5">
                        In order
                      </th>
                      <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/5 capitalize">
                        BTC value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? (
                      <>
                        {Array.isArray(fundData) && fundData?.length > 0 ? (
                          <>
                            {Array.isArray(fundData) &&
                              fundData?.map((item, index) => (
                                <>
                                  {item?.balance > 0 && (
                                    <tr key={index}>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize ">
                                        {item?.symbol}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center uppercase">
                                        {Number(item?.balance) +
                                          Number(item?.unavailable_balance)}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.balance}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.unavailable_balance}
                                      </td>
                                      <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center   capitalize">
                                        {item?.usdtprice}
                                      </td>
                                    </tr>
                                  )}
                                </>
                              ))}
                          </>
                        ) : (
                          <tr>
                            <td
                              colSpan={13}
                              rowSpan={6}
                              className="text-center text-sm py-4"
                            >
                              <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
                                No Data found
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={13}>
                          <div className="h-[10rem] w-full flex justify-center items-center">
                            <ScaleLoader color="#FCD535" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <button className="flex  items-center cursor-pointer">
              <pre
                className="text-yellow-500"
                onClick={() => navigate("/login")}
              >
                Log In{" "}
              </pre>
              or
              <pre
                className="text-yellow-500"
                onClick={() => navigate("/register")}
              >
                {" "}
                Register Now{" "}
              </pre>
              to trade
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
