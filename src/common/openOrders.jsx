import { useDispatch, useSelector } from "react-redux";
import { formatDate, tabs } from "../Constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOpenOrder } from "../pages/apiCall";
import { setIsSuccess } from "../store/webSocket";

export const OpenOrders = ({ dark }) => {
  const { openOrder, orderHistory } = useSelector((state) => state.counter);
  const [activeTab, setActiveTab] = useState("Open Orders");
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const navigate = useNavigate();

  const deleteOrder = (order_id, pair_id) => {
    const orderData = {
      order_id: order_id,
      pair_id: pair_id,
      user_id: userData.user_id,
      device_type: "windows",
      device_info: "systems",
    };
    deleteOpenOrder(orderData, dispatch, setIsSuccess);
  };

  const userId = "UA8FCF45E1D0"; // Replace with dynamic userId if needed

  // useEffect(() => {
  //   const ws = new WebSocket("ws://15.235.143.146:9001");

  //   ws.onopen = () => {
  //     console.log("✅ WebSocket connected123");
  //     ws.send(JSON.stringify({ user_id: userId }));
  //     console.log("📤 Sent: UA8FCF45E1D0");
  //   };

  //   ws.onmessage = (event) => {
  //     console.log("📩 Message:", event.data);
  //   };

  //   ws.onerror = (error) => {
  //     console.error("❌ WebSocket error", error);
  //   };

  //   ws.onclose = (event) => {
  //     console.warn("⚠️ WebSocket closed", event.code, event.reason);
  //   };

  //   return () => {
  //     ws.close();
  //     console.log("🔌 Cleaned up WebSocket");
  //   };
  // }, []);

  return (
    <div className={`h-fit w-full ${dark ? " bg-[#181A20]" : " bg-white "} `}>
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
      <div className="h-[300px] w-full overflow-y-auto  text-[12px] leading-4 flex-nowrap font-medium">
        {userData?.token ? (
          <>
            {" "}
            {activeTab === "Open Orders" && (
              <>
                <div className="w-full p-0">
                  <table className="w-full">
                    <thead className="h-[3rem]">
                      <tr className="">
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] capitalize w-1/13">
                          Date
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          Pair
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          Type
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          side
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          price
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          amount
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize min-w-max">
                          amount per Iceberg Order
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          Filled
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          Total
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize min-w-max">
                          Tgiger Conditions
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          SOR
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          status
                        </th>
                        <th className="text-[12px] pl-1 pr-1 p-[4px] text-center text-[#707A8A] w-1/13 capitalize">
                          cancel
                        </th>
                      </tr>
                    </thead>
                    {Array.isArray(openOrder) && openOrder?.length > 0 ? (
                      <tbody>
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
                                  {item?.order_price}
                                </td>
                                <td className="lg:text-[12px] text-[.6rem] pl-1 pr-1 p-[4px] text-center capitalize">
                                  {item?.base_quantity}
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
                                  onClick={() =>
                                    deleteOrder(item?.order_id, item?.pair_id)
                                  }
                                >
                                  cancel
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    ) : (
                      <tbody>
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
                      </tbody>
                    )}
                  </table>
                </div>
              </>
            )}
            {activeTab === "Order History" && (
              <>
                <div className="p-3">
                  <div className="w-full overflow-x-auto">
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
                              className="p-1 text-center uppercase font-medium tracking-wide  whitespace-nowrap w-1/8"
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
                                    ? isEven
                                      ? "bg-[#1e1f25]"
                                      : "bg-[#2b2d35]"
                                    : isEven
                                    ? "bg-[white] "
                                    : "bg-zinc-100"
                                } hover:bg-[#353842] transition-all duration-200`}
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
