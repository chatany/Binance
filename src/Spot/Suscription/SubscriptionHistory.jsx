import { TopNav } from "../Navbar/TopNavBar";
import { useDispatch, useSelector } from "react-redux";
import VerticalLinearStepper from "../Deposit & WithDraw/Deposit/Deposit";
import Withdrawal from "../Deposit & WithDraw/WithDraw/Withdraw";
import { useLocation, useNavigate } from "react-router-dom";
import { PiDownloadSimpleBold, PiUploadSimpleBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  getDepositHistory,
  getRunningSubscription,
  getWithdrawHistory,
} from "../Apis/apiCall";
import { Loder } from "../../common/Loder";
import { formatDate } from "../../Constant";
import { apiRequest } from "../../Helper";
import { showError, showSuccess } from "../../Toastify/toastServices";
import { NotFound } from "../../icons";
import { ConfirmationBox } from "../../common/DeletePopup";

export const SubscriptionHistory = () => {
  const dark = useSelector((state) => state.counter.dark);
  const location = useLocation();
  const navigate = useNavigate();
  const [stakingData, setStakingData] = useState([]);
  const [runningData, setRunningData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(runningData, "running");
  const handleActive = (value) => {
    navigate(`/subscription/${value}/history`);
  };
  useEffect(() => {
    getRunningSubscription(setStakingData, setIsLoading);
  }, []);
  const handleSelect = async (id) => {
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/cancel-staking`,
        data: { staking_id: id },
      });

      if (data?.status === "1" && status === 200) {
        showSuccess(data?.message);
      }
      if (data?.status !== "1") {
        showError(data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      setPopup(!popup);
      getRunningSubscription(setStakingData, setIsLoading);
    }
  };
  useEffect(() => {
    const completed = stakingData?.filter((ele) => ele.status === 0);
    const running = stakingData?.filter((ele) => ele.status === 1);
    setCompletedData(completed);
    setRunningData(running);
  }, [stakingData]);
  return (
    <div
      className={`
        ${dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full min-h-screen flex flex-col gap-0 items-center  md:p-5`}
    >
      <div className="w-full flex-col">
        <div className="flex gap-4 items-center p-3">
          <div
            onClick={() => handleActive("running")}
            className="text-[16px] font-semibold leading-[24px] capitalize cursor-pointer"
          >
            Running{" "}
            {location.pathname.includes(`running`) && (
              <div className="flex justify-center w-full">
                <div className="w-[36px] border-b-4 border-[#2EDBAD]"></div>
              </div>
            )}
          </div>
          <div
            onClick={() => handleActive("completed")}
            className="text-[16px] font-semibold leading-[24px] capitalize cursor-pointer"
          >
            Completed{" "}
            {location.pathname.includes(`completed`) && (
              <div className="flex justify-center w-full">
                <div className="w-[36px] border-b-4 border-[#2EDBAD]"></div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="md:hidden block w-full">
          <div
            className={`flex justify-between  ${
              dark ? "border-[#333B47]" : "border-[#EDEDED]"
            } border-b-1 w-full items-center p-[0px_20px_10px_20px]`}
            onClick={() => setActive(!active)}
          >
            <div className="flex items-center justify-between gap-2 capitalize">
              <div className="flex items-center gap-2">
                <div>
                  {activeName() === data[1] ? (
                    <PiUploadSimpleBold className="size-6" />
                  ) : (
                    <PiDownloadSimpleBold className="size-6" />
                  )}
                </div>
                <div className="font-semibold">{`${activeName()} ${" "} ${"Crypto"}`}</div>
              </div>
            </div>
            <div className="flex justify-end">
              {" "}
              <FaChevronDown
                className={`transition-transform size-5 ${
                  active ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          {data.map((item, index) => {
            return (
              <>
                {active && (
                  <>
                    <div
                      onClick={() => {
                        setActive(!active);
                        navigate(`/crypto/${item}`);
                      }}
                      key={index}
                      className={`flex flex-col p-[10px_20px_10px_20px]  cursor-pointer rounded-xl gap-2 w-full`}
                    >
                      <div className="flex items-center justify-between gap-2 capitalize">
                        <div className="flex items-center gap-2">
                          <div>
                            {item === data[1] ? (
                              <PiUploadSimpleBold className="size-6" />
                            ) : (
                              <PiDownloadSimpleBold className="size-6" />
                            )}
                          </div>
                          <div className="font-semibold">{`${item} ${" "} ${"Crypto"}`}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </div> */}

        <div className="max-md:p-2 w-full">
          {location.pathname.includes(`running`) && (
            <>
              <div className="w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto md:hidden">
                {Array.isArray(runningData) && runningData?.length > 0 ? (
                  runningData?.map((ele, index) => {
                    return (
                      <div
                        className={`text-[14px]  ${
                          dark
                            ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                            : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                        } font-normal leading-[20px] border-b-[1px] w-full flex justify-between`}
                        key={index}
                      >
                        <div>
                          <div className="flex gap-1 items-center">
                            <img src={ele?.icon} className="size-7" />
                            <div>
                              <div>{ele?.coin}</div>
                              {ele?.amount + "  " + ele?.symbol}
                            </div>
                          </div>
                          <div className="text-left p-[8px_6px_8px_30px]">
                            {"Earnings: " + ele?.earnings + "  " + ele?.symbol}
                          </div>
                          <div className="text-left p-[8px_16px_8px_30px]">
                            {"Days Left: " + ele?.days_left + " Days"}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="text-end  p-[12px_16px_8px_16px] uppercase">
                            Running
                          </div>
                          <div
                            className="text-end  p-[8px_16px_12px_16px] uppercase"
                            onClick={() => setPopup(true)}
                          >
                            cancel
                          </div>
                          <div className="text-end  p-[8px_16px_8px_16px]">
                            {"Duration: " + ele?.duration + " Days"}
                          </div>
                        </div>
                        {popup && (
                          <ConfirmationBox
                            handleCancel={() => setPopup(false)}
                            handleSubmit={() => handleSelect(ele?.id)}
                            message={
                              "Are you Sure you want to Cancel Subscription?"
                            }
                            dark={dark}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <NotFound className="max-md:size-16 size-10" />
                      <div className="text-[12px] max-md:text-[14px]">
                        No Data Found
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full items-center h-full max-md:hidden">
                <div className="max-w-[1000px] mt-10 w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto ">
                  <table
                    className={`w-full border-1 ${
                      dark ? " border-[#474d57]" : "border-[#eaecef]"
                    }`}
                  >
                    <thead>
                      <tr
                        className={`text-[12px] ${
                          dark
                            ? "bg-[#2B3139] border-[#474d57]"
                            : "bg-[#F5F5F5] border-[#eaecef]"
                        } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
                      >
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Coin Name
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Amount
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Duration
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Earnings
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Days Left
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Time
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Status
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Cancel
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(runningData) && runningData?.length > 0 ? (
                        runningData?.map((ele, index) => {
                          runningData;
                          const date = formatDate(ele?.timestamp);
                          return (
                            <tr
                              key={index}
                              className={`md:text-[16px] text-[12px] ${
                                dark
                                  ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                                  : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                              } font-normal leading-[20px] border-b-[1px] `}
                            >
                              <td className="text-left p-[12px_16px_12px_16px]">
                                <div className="flex gap-4 items-center">
                                  <img
                                    src={ele?.icon}
                                    className="md:size-10 size-7"
                                  />
                                  <div>{ele?.coin}</div>
                                </div>
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.amount + "  " + ele?.symbol}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.duration}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.earnings + "  " + ele?.symbol}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.days_left}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {date}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                Running
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                <button
                                  className={`bg-[#2EDBAD] rounded-xl  w-full   h-[2.2rem]  text-black cursor-pointer capitalize p-2`}
                                  onClick={() => setPopup(true)}
                                >
                                  Cancel
                                </button>
                              </td>
                              {popup && (
                                <ConfirmationBox
                                  handleCancel={() => setPopup(false)}
                                  handleSubmit={() => handleSelect(ele?.id)}
                                  message={
                                    "Are you Sure you want to Cancel Subscription?"
                                  }
                                  dark={dark}
                                />
                              )}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8}>
                            <div className="h-[200px] flex items-center justify-center">
                              <div className="flex flex-col gap-0.5 items-center justify-center">
                                <NotFound className="max-md:size-16 size-10" />
                                <div className="text-[12px] max-md:text-[14px]">
                                  No Data Found
                                </div>
                              </div>
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
          {location.pathname.includes(`completed`) && (
            <>
              <div className="flex justify-center w-full items-center h-full max-md:hidden">
                <div className="max-w-[1000px] mt-10 w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto ">
                  <table
                    className={`w-full border-1 ${
                      dark ? " border-[#474d57]" : "border-[#eaecef]"
                    }`}
                  >
                    <thead>
                      <tr
                        className={`text-[12px] ${
                          dark
                            ? "bg-[#2B3139] border-[#474d57]"
                            : "bg-[#F5F5F5] border-[#eaecef]"
                        } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
                      >
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Coin Name
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Amount
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Duration
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Earnings
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Days Left
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Time
                        </th>
                        <th
                          className={`text-left p-[12px_16px_12px_16px] sticky  top-0 z-30 ${
                            dark
                              ? "bg-[#2B3139] border-[#474d57]"
                              : "bg-[#F5F5F5] border-[#eaecef]"
                          }`}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(completedData) &&
                      completedData?.length > 0 ? (
                        completedData?.map((ele, index) => {
                          const date = formatDate(ele?.staking_timeout);
                          return (
                            <tr
                              key={index}
                              className={`md:text-[16px] text-[12px] ${
                                dark
                                  ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                                  : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                              } font-normal leading-[20px] border-b-[1px] `}
                            >
                              <td className="text-left p-[12px_16px_12px_16px]">
                                <div className="flex gap-4 items-center">
                                  <img
                                    src={ele?.icon}
                                    className="md:size-10 size-7"
                                  />
                                  <div>{ele?.coin}</div>
                                </div>
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.amount + "  " + ele?.symbol}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.duration}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.earnings + "  " + ele?.symbol}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {ele?.days_left}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px]">
                                {date}
                              </td>
                              <td className="text-left p-[12px_16px_12px_16px] uppercase">
                                closed
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7}>
                            <div className="h-[200px] flex items-center justify-center">
                              <div className="flex flex-col gap-0.5 items-center justify-center">
                                <NotFound className="max-md:size-16 size-10" />
                                <div className="text-[12px] max-md:text-[14px]">
                                  No Data Found
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full overflow-x-auto custom-scroll h-[700px] overflow-y-auto md:hidden">
                {Array.isArray(completedData) && completedData?.length > 0 ? (
                  completedData?.map((ele, index) => {
                    return (
                      <div
                        className={`text-[14px]  ${
                          dark
                            ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                            : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                        } font-normal leading-[20px] border-b-[1px] w-full flex justify-between`}
                        key={index}
                      >
                        <div>
                          <div className="flex gap-1 items-center">
                            <img src={ele?.icon} className="size-7" />
                            <div>
                              <div>{ele?.coin}</div>
                              {ele?.amount + "  " + ele?.symbol}
                            </div>
                          </div>
                          <div className="text-left p-[8px_6px_8px_30px]">
                            {"Earnings: " + ele?.earnings + "  " + ele?.symbol}
                          </div>
                          <div className="text-left p-[8px_16px_8px_30px]">
                            {"Days Left: " + ele?.days_left + " Days"}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="text-end  p-[8px_16px_12px_8px] uppercase">
                            closed
                          </div>

                          <div className="text-end  p-[8px_16px_12px_8px]">
                            {"Duration: " + ele?.duration + " Days"}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <NotFound className="max-md:size-16 size-10" />
                      <div className="text-[12px] max-md:text-[14px]">
                        No Data Found
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
