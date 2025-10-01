import { useDispatch, useSelector } from "react-redux";
import { formatDate, tabs } from "../../Constant";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOpenOrder } from "../Apis/apiCall";
import { setIsSuccess, setShowPopup } from "../../store/webSocket";
import { ScaleLoader } from "react-spinners";
import { ModifyPopup } from "./Modify/popup";
import { FaRegEdit } from "react-icons/fa";
import { ConfirmationBox } from "../../Common/DeletePopup";
import { useDeviceInfo } from "../../Hooks/useDeviceInfo";
import { Loder } from "../../Common/Loder";

export const OpenOrders = () => {
  const openOrder = useSelector((state) => state.counter.openOrder);
  const orderHistory = useSelector((state) => state.counter.orderHistory);
  const loading = useSelector((state) => state.counter.loading);
  const isSuccess = useSelector((state) => state.counter.isSuccess);
  const fundData = useSelector((state) => state.counter.fundData);
  const showPopup = useSelector((state) => state.counter.showPopup);
  const searchData = useSelector((state) => state.counter.searchData);
  const pairId = useSelector((state) => state.counter.pairId);
  const dark = useSelector((state) => state.counter.dark);
  const popupRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Open Orders");
  const [orderId, setOrderId] = useState(null);
  const [currentItem, setCurrentItem] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();
  const deviceInfo = useDeviceInfo();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [pendingOrderId, setPendingOrderId] = useState(null);
  const navigate = useNavigate();

  const deleteOrder = async (order_id, pair_id) => {
    setPendingOrderId(order_id);

    const orderData = {
      order_id: order_id,
      pair_id: pair_id,
      user_id: userData.user_id,
      device_type: deviceInfo?.device_type,
      device_info: deviceInfo?.device_info,
      source: deviceInfo?.source,
    };

    try {
      await deleteOpenOrder(
        orderData,
        dispatch,
        setIsSuccess,
        pair_id,
        userData.user_id
      );
    } finally {
      setPendingOrderId(null);
    }
  };

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
  useEffect(() => {
    const currentItem =
      Array.isArray(searchData) &&
      searchData?.find((item) => item?.pair_id === pairId);
    setCurrentItem(currentItem?.pair_symbol);
  }, [pairId]);
  return (
    <div
      className={`h-fit relative rounded-[8px] w-full ${
        dark ? " bg-[#181A20]" : " bg-white "
      } `}
    >
      <div
        className={`${
          dark ? " bg-[#181A20] border-[#333B47]" : "border-[#EDEDED] bg-white"
        } border-b-[1px] rounded-[8px_8px_0px_0px]`}
      >
        <div className="flex   gap-5 items-center text-[14px] leading-4  w-full font-medium p-1 pb-0 ">
          {tabs.map((tab) => (
            <div className="flex flex-col gap-1" key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 font-medium transition-colors min-w-max cursor-pointer duration-300 ${
                  activeTab === tab
                    ? "text-[#2EDBAD]"
                    : "text-gray-600 hover:text-[#2EDBAD]"
                }`}
                name="items"
              >
                {tab}
                {`${
                  tab === "Open Orders"
                    ? ` (${openOrder?.length ? openOrder?.length : 0})`
                    : ""
                }`}
              </button>
              {activeTab === tab && (
                <div className="flex justify-center w-full">
                  <div className="w-[30%] border-b-2 border-[#2EDBAD]"></div>
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
                          } z-10 sticky top-0 text-[#707A8A] min-w-[8rem] capitalize`}
                        >
                          Filled
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
                                  const percentage = parseFloat(
                                    (
                                      (Number(item?.executed_base_quantity) /
                                        Number(item?.base_quantity)) *
                                      100
                                    ).toFixed(2)
                                  );
                                  return (
                                    <tr key={index}>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize ">
                                        {date}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center uppercase">
                                        {currentItem}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.order_type}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.type}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
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
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
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

                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {percentage}%
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.status}
                                      </td>
                                      <td
                                        className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize cursor-pointer"
                                        onClick={() => {
                                          if (item?.order_id === pendingOrderId)
                                            return;
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
                  {isSuccess && <Loder className="bg-[#00000010]" />}
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
                        Usdt value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? (
                      <>
                        {Array.isArray(fundData?.data) &&
                        fundData?.data?.length > 0 ? (
                          <>
                            {Array.isArray(fundData?.data) &&
                              fundData?.data?.map((item, index) => (
                                <>
                                  {item?.balance > 0 && (
                                    <tr key={index}>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize ">
                                        {item?.symbol}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center uppercase">
                                        {Number(item?.balance) +
                                          Number(item?.unavailable_balance)}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.balance}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center capitalize">
                                        {item?.unavailable_balance}
                                      </td>
                                      <td className="text-[12px]  pl-1 pr-1 p-[4px] text-center   capitalize">
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
            <button
              className="flex  items-center cursor-pointer"
              name="login_singup"
            >
              <pre
                className="text-[#2EDBAD]"
                onClick={() => navigate("/login")}
              >
                Log In{" "}
              </pre>
              or
              <pre
                className="text-[#2EDBAD]"
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
