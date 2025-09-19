import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectBox } from "../common/select";
import { NotFound } from "../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../Constant";
import { apiRequest } from "../Helper";
import { getDepositHistory, getWithdrawHistory } from "../pages/apiCall";

export const TransactionHistory = () => {
  const location = useLocation();
  const [show, setShow] = useState({ pair: false, status: false, date: false });
  const { dark, withdrawHistory, depositHistory } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [depositPair, setDepositPair] = useState("All");
  const [withdrawPair, setWithdrawPair] = useState("All");
  const time = ["past 1 days", "past 7 days", "past 30 days", "past 90 days"];
  const statusArr = ["All", "pending", "completed", "Processing"];
  const [depositStatus, setDepositStatus] = useState(statusArr[0]);
  const [searchData, setSearchData] = useState([]);
  const [filteredWithdrawData, setFilteredWithdrawData] = useState([]);
  const [filteredDepositData, setFilteredDepositData] = useState([]);
  const [depositDate, setDepositDate] = useState(time[1]);
  const [withdrawStatus, setWithdrawStatus] = useState(statusArr[0]);
  const [withdrawDate, setWithdrawDate] = useState(time[1]);
  const handleActive = (value) => {
    navigate(`/crypto/${value}/history`);
  };
  function getDaysFromLabel(label) {
    return parseInt(label.replace(/\D/g, ""), 10) || 0;
  }
  const getUserProfile = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "get",
        url: `https://test.bitzup.com/blockchain/wallet/get-deposit-withdraw-asset?type=${
          location.pathname.includes(`deposit`) ? "deposit" : "withdraw"
        }`,
      });

      if (status === 200 && data?.status === "1") {
        //   dispatch(setUserProfile(data?.data));
        setSearchData(data?.data);
      }

      if (data?.status != 1) {
        showError(data?.message);
      }
      if (status === 400 && data?.status == 3) {
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("userDataChanged"));
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    }
  };
  useEffect(() => {
    getUserProfile();
    if (location.pathname.includes(`deposit`)) {
      getDepositHistory(dispatch);
    } else if (location.pathname.includes(`withdraw`)) {
      getWithdrawHistory(dispatch);
    }
  }, [location.pathname]);
  const handleShow = (key) => {
    setShow((prev) => ({
      ...prev,
      [key]: !show[key],
    }));
  };
  const depositReset = () => {
    setDepositDate(time[1]);
    setDepositPair("All");
    setDepositStatus(statusArr[0]);
  };
  const withdrawReset = () => {
    setWithdrawDate(time[1]);
    setWithdrawPair("All");
    setWithdrawStatus(statusArr[0]);
  };
  useEffect(() => {
    let filtered = withdrawHistory;

    if (withdrawPair !== "" && withdrawPair !== "All") {
      filtered = filtered?.filter(
        (item) => item?.symbol.toLowerCase() === withdrawPair.toLowerCase()
      );
    }

    if (withdrawStatus !== "" && withdrawStatus !== "All") {
      filtered = filtered?.filter(
        (item) => item?.status.toLowerCase() === withdrawStatus.toLowerCase()
      );
    }
    if (withdrawDate && withdrawDate !== "All") {
      const days = getDaysFromLabel(withdrawDate);
      const now = new Date();
      const pastDate = new Date();
      pastDate.setDate(now.getDate() - days);

      filtered = filtered?.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= pastDate && itemDate <= now;
      });
    }
    setFilteredWithdrawData(filtered);
  }, [withdrawPair, withdrawStatus, withdrawDate, withdrawHistory]);
  useEffect(() => {
    let filtered = depositHistory;

    if (depositPair !== "" && depositPair !== "All") {
      filtered = filtered?.filter(
        (item) => item?.symbol.toLowerCase() === depositPair.toLowerCase()
      );
    }

    if (depositStatus !== "" && depositStatus !== "All") {
      filtered = filtered?.filter(
        (item) => item?.status.toLowerCase() === depositStatus.toLowerCase()
      );
    }
    if (depositDate && depositDate !== "All") {
      const days = getDaysFromLabel(depositDate);
      const now = new Date();
      const pastDate = new Date();
      pastDate.setDate(now.getDate() - days);

      filtered = filtered?.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= pastDate && itemDate <= now;
      });
    }
    setFilteredDepositData(filtered);
  }, [depositPair, depositStatus, depositDate, depositHistory]);
  return (
    <div>
      <div className="flex gap-4 items-center p-3">
        <div
          onClick={() => handleActive("deposit")}
          className="text-[16px] font-semibold leading-[24px] capitalize"
        >
          deposit{" "}
          {location.pathname.includes(`deposit`) && (
            <div className="flex justify-center w-full">
              <div className="w-[16px] border-b-4 border-amber-300"></div>
            </div>
          )}
        </div>
        <div
          onClick={() => handleActive("withdraw")}
          className="text-[16px] font-semibold leading-[24px] capitalize"
        >
          withdraw{" "}
          {location.pathname.includes(`withdraw`) && (
            <div className="flex justify-center w-full">
              <div className="w-[16px] border-b-4 border-amber-300"></div>
            </div>
          )}
        </div>
      </div>
      {location.pathname.includes(`deposit`) && (
        <>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 p-3">
            <SelectBox
              value={depositPair}
              title={"Coin"}
              show={show.pair}
              setShow={() => handleShow("pair")}
            >
              <div className="h-[200px] overflow-y-auto custom-scroll ">
                <div
                  className={`text-[14px] font-normal leading-[22px] p-[10px]   ${
                    dark
                      ? "hover:bg-[#2B3139] text-[#929AA5]"
                      : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                  }`}
                  onClick={() => {
                    setDepositPair("All");
                    handleShow("pair");
                  }}
                >
                  {"All"}
                </div>
                {Array.isArray(searchData) &&
                  searchData?.map((item, index) => (
                    <div
                      key={index}
                      className={`text-[14px] font-normal leading-[22px] p-[10px]   ${
                        dark
                          ? "hover:bg-[#2B3139] text-[#929AA5]"
                          : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                      }`}
                      onClick={() => {
                        setDepositPair(item?.symbol);
                        handleShow("pair");
                      }}
                    >
                      {item?.symbol}
                    </div>
                  ))}{" "}
              </div>
            </SelectBox>
            <SelectBox
              value={depositDate}
              title={"Time"}
              show={show.date}
              setShow={() => handleShow("date")}
            >
              <div className="max-h-[200px] overflow-y-auto custom-scroll ">
                {time?.map((item, index) => (
                  <div
                    key={index}
                    className={`text-[14px] font-normal leading-[22px] capitalize p-[10px] min-w-max   ${
                      dark
                        ? "hover:bg-[#2B3139] text-[#929AA5]"
                        : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                    }`}
                    onClick={() => {
                      setDepositDate(item);
                      handleShow("date");
                    }}
                  >
                    {item}
                  </div>
                ))}{" "}
              </div>
            </SelectBox>
            <SelectBox
              value={depositStatus}
              title={"status"}
              show={show.status}
              setShow={() => handleShow("status")}
            >
              <div className="max-h-[200px] overflow-y-auto custom-scroll ">
                {statusArr?.map((item, index) => (
                  <div
                    key={index}
                    className={`text-[14px] font-normal leading-[22px] capitalize p-[10px] min-w-max   ${
                      dark
                        ? "hover:bg-[#2B3139] text-[#929AA5]"
                        : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                    }`}
                    onClick={() => {
                      setDepositStatus(item);
                      handleShow("status");
                    }}
                  >
                    {item}
                  </div>
                ))}{" "}
              </div>
            </SelectBox>
            <button
              className={`text-[16px] w-[40%] font-semibold
        leading-[24px] ${
          dark ? "bg-[#333B47]" : "bg-[#EDEDED]"
        } p-2 rounded-[8px]`}
              onClick={depositReset}
            >
              Reset
            </button>
          </div>
          <div className="p-[20px] flex flex-col gap-10 w-full max-md:hidden">
            <div className="flex justify-between items-center w-full">
              <div className="text-[20px] font-semibold leading-[28px]">
                Recent Deposits
              </div>
              {/* <div className="text-[14px] font-medium leading-[22px] flex items-center">
                More <RiArrowRightSLine className="size-5 font-light" />
              </div> */}
            </div>
            <div className="w-full overflow-x-auto custom-scroll">
              <table className={`w-full`}>
                <thead>
                  <tr
                    className={`text-[12px] ${
                      dark
                        ? "bg-[#2B3139] border-[#474d57]"
                        : "bg-[#F5F5F5] border-[#eaecef]"
                    } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
                  >
                    <th className="text-left p-[12px_16px_12px_16px]">Time</th>
                    <th className="text-left p-[12px_16px_12px_16px]">Type</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Deposit wallet
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">Asset</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      amount
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Destination{" "}
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">TxID</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredDepositData) &&
                  filteredDepositData.length > 0 ? (
                    filteredDepositData?.map((ele, index) => {
                      const date = formatDate(ele?.date);
                      return (
                        <tr
                          key={index}
                          className={`text-[14px]  ${
                            dark
                              ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                              : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                          } font-normal leading-[20px] border-b-[1px] `}
                        >
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {date}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {`Deposit`}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            Spot wallet
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.symbol}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {" "}
                            {ele?.final_amount}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            --
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.address}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.status}
                          </td>
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
          <div className="p-[10px] flex flex-col gap-10 w-full md:hidden">
            <div className="flex justify-between items-center w-full">
              <div className="text-[20px] font-semibold leading-[28px]">
                Recent Deposits
              </div>
              {/* <div
                className="text-[14px] font-medium leading-[22px] flex items-center cursor-pointer"
                onClick={() => navigate("/crypto/deposit/history")}
              >
                More <RiArrowRightSLine className="size-5 font-light" />
              </div> */}
            </div>
            {Array.isArray(filteredDepositData) &&
              filteredDepositData?.map((ele, index) => {
                const date = formatDate(ele?.date);
                return (
                  <div
                    className="flex justify-between items-center w-full"
                    key={index}
                  >
                    <div className="flex gap-1">
                      <div>
                        <img src={ele?.icon_url} className="size-6" />
                      </div>
                      <div>
                        <div className="text-[14px] font-medium leading-[22px] ">
                          {ele?.symbol}
                        </div>
                        <div className="text-[14px] font-medium leading-[22px] ">
                          {date}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[14px] font-medium leading-[22px] ">
                        {ele?.final_amount}
                      </div>
                      <div className="text-[14px] font-medium leading-[22px] ">
                        {ele?.status}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {location.pathname.includes("withdraw") && (
        <>
          <div className="w-full  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 p-3">
            <SelectBox
              value={withdrawPair}
              title={"Coin"}
              show={show.pair}
              setShow={() => handleShow("pair")}
            >
              <div className="h-[200px] overflow-y-auto custom-scroll ">
                <div
                  className={`text-[14px] font-normal leading-[22px] p-[10px]   ${
                    dark
                      ? "hover:bg-[#2B3139] text-[#929AA5]"
                      : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                  }`}
                  onClick={() => {
                    setWithdrawPair("All");
                    handleShow("pair");
                  }}
                >
                  {"All"}
                </div>
                {Array.isArray(searchData) &&
                  searchData?.map((item, index) => (
                    <div
                      key={index}
                      className={`text-[14px] font-normal leading-[22px] p-[10px]   ${
                        dark
                          ? "hover:bg-[#2B3139] text-[#929AA5]"
                          : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                      }`}
                      onClick={() => {
                        setWithdrawPair(item?.symbol);
                        handleShow("pair");
                      }}
                    >
                      {item?.symbol}
                    </div>
                  ))}{" "}
              </div>
            </SelectBox>
            <SelectBox
              value={withdrawDate}
              title={"Time"}
              show={show.date}
              setShow={() => handleShow("date")}
            >
              <div className="max-h-[200px] overflow-y-auto custom-scroll ">
                {time?.map((item, index) => (
                  <div
                    key={index}
                    className={`text-[14px] font-normal leading-[22px] capitalize p-[10px] min-w-max   ${
                      dark
                        ? "hover:bg-[#2B3139] text-[#929AA5]"
                        : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                    }`}
                    onClick={() => {
                      setWithdrawDate(item);
                      handleShow("date");
                    }}
                  >
                    {item}
                  </div>
                ))}{" "}
              </div>
            </SelectBox>
            <SelectBox
              value={withdrawStatus}
              title={"status"}
              show={show.status}
              setShow={() => handleShow("status")}
            >
              <div className="max-h-[200px] overflow-y-auto custom-scroll ">
                {statusArr?.map((item, index) => (
                  <div
                    key={index}
                    className={`text-[14px] font-normal leading-[22px] capitalize p-[10px] min-w-max   ${
                      dark
                        ? "hover:bg-[#2B3139] text-[#929AA5]"
                        : "hover:bg-[#EAECEF] text-[#757575] hover:text-[#000000]"
                    }`}
                    onClick={() => {
                      setWithdrawStatus(item);
                      handleShow("status");
                    }}
                  >
                    {item}
                  </div>
                ))}{" "}
              </div>
            </SelectBox>
            <button
              className={`text-[16px] w-[40%] font-semibold
        leading-[24px] ${
          dark ? "bg-[#333B47]" : "bg-[#EDEDED]"
        } p-2 rounded-[8px]`}
              onClick={withdrawReset}
            >
              Reset
            </button>
          </div>
          <div className="p-[20px] flex flex-col gap-10 w-full max-md:hidden">
            <div className="flex justify-between items-center w-full">
              <div className="text-[20px] font-semibold leading-[28px]">
                Recent Withdrawals
              </div>
              {/* <div className="text-[14px] font-medium leading-[22px] flex items-center">
                More <RiArrowRightSLine className="size-5 font-light" />
              </div> */}
            </div>
            <div className="w-full overflow-x-auto custom-scroll">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-[12px] ${
                      dark
                        ? "bg-[#2B3139] border-[#474d57]"
                        : "bg-[#F5F5F5] border-[#eaecef]"
                    } text-[#848e9c] border-b-[1px] font-normal leading-[20px] `}
                  >
                    <th className="text-left p-[12px_16px_12px_16px]">Time</th>
                    <th className="text-left p-[12px_16px_12px_16px]">Type</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Deposit wallet
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">Asset</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      amount
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Destination{" "}
                    </th>
                    <th className="text-left p-[12px_16px_12px_16px]">TxID</th>
                    <th className="text-left p-[12px_16px_12px_16px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredWithdrawData) &&
                  filteredWithdrawData.length > 0 ? (
                    filteredWithdrawData?.map((ele, index) => {
                      const date = formatDate(ele?.date);
                      return (
                        <tr
                          key={index}
                          className={`text-[14px]  ${
                            dark
                              ? "text-[#EAECEF] border-[#474d57] hover:bg-[#2B3139]"
                              : "text-[#1e2329] border-[#eaecef] hover:bg-[#F5F5F5]"
                          } font-normal leading-[20px] border-b-[1px] `}
                        >
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {date}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {`Deposit`}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            Spot wallet
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.symbol}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {" "}
                            {ele?.final_amount}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            --
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.address}
                          </td>
                          <td className="text-left p-[12px_16px_12px_16px]">
                            {ele?.status}
                          </td>
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
          <div className="p-[10px] flex flex-col gap-10 w-full md:hidden">
            <div className="flex justify-between items-center w-full">
              <div className="text-[20px] font-semibold leading-[28px]">
                Recent Withdrawals
              </div>
              {/* <div
                className="text-[14px] font-medium leading-[22px] flex items-center cursor-pointer"
                onClick={() => navigate("/crypto/withdraw/history")}
              >
                More <RiArrowRightSLine className="size-5 font-light" />
              </div> */}
            </div>
            {Array.isArray(filteredWithdrawData) &&
              filteredWithdrawData?.map((ele, index) => {
                const date = formatDate(ele?.date);
                return (
                  <div
                    className="flex justify-between items-center w-full"
                    key={index}
                  >
                    <div className="flex gap-1">
                      <div>
                        <img src={ele?.icon_url} className="size-6" />
                      </div>
                      <div>
                        <div className="text-[14px] font-medium leading-[22px] ">
                          {ele?.symbol}
                        </div>
                        <div className="text-[14px] font-medium leading-[22px] ">
                          {date}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[14px] font-medium leading-[22px] ">
                        {ele?.final_amount}
                      </div>
                      <div className="text-[14px] font-medium leading-[22px] ">
                        {ele?.status}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};
