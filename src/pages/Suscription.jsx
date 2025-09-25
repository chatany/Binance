import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { NotFound } from "../icons";
import { useEffect, useState } from "react";
import { getStakingCoin } from "./apiCall";
import { Loder } from "../common/Loder";
import { IoMdClose } from "react-icons/io";
import { apiRequest } from "../Helper";
import { showError, showSuccess } from "../Toastify/toastServices";
import { useNavigate } from "react-router-dom";

export const Subscription = () => {
  const dark = useSelector((state) => state.counter.dark);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeObj, setSubscribeObj] = useState({});
  const [days, setDays] = useState("");
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [stakingData, setStakingData] = useState([]);
  const [balance, setBalance] = useState("");
  useEffect(() => {
    if (stakingData?.length === 0) {
      getStakingCoin(setStakingData, setIsLoading);
    }
  }, []);

  const handleSelect = async (item) => {
    setIsLoading(true);
    const value = {
      ...item,
      duration: JSON.parse(item?.duration),
    };
    setSubscribeObj(value);
    setDays(value.duration[0]);
    try {
      const { data, status } = await apiRequest({
        method: "get",
        url: `https://test.bitzup.com/blockchain/wallet/get-currency-balance?currency_id=${item?.currency_id}`,
      });

      if (status === 200 && data?.status === "1") {
        setBalance(data?.data?.balance);
      }
      if (status === 400 && data?.status == 3) {
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("userDataChanged"));
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      setIsLoading(false);
      setShowPopup(!showPopup);
    }
    setAmount("");
  };
  const handleSubmit = async () => {
    if (amount > Number(balance)) {
      showError("Insufficient balance!");
      return;
    }
    if (
      amount < Number(subscribeObj?.min_amount) ||
      amount > Number(subscribeObj?.max_amount)
    ) {
      showError(
        `Amount should be between ${subscribeObj?.min_amount} and ${subscribeObj?.max_amount}`
      );
      return;
    }
    const jsonObj = {
      currency_id: subscribeObj?.currency_id,
      amount: amount,
      duration: days,
    };
    setIsLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/stake-coin`,
        data: jsonObj,
      });
      if (data?.status === "1" && status === 200) {
        showSuccess(data?.message);
        setShowPopup(!showPopup);
      }
      if (data?.status !== "1") {
        showError(data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`w-full ${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      } min-h-screen h-full overflow-hidden`}
    >
      {" "}
      <TopNav />
      <div className="flex flex-col justify-center w-full items-center h-full">
        <div className="w-full flex justify-end p-[12px_80px_0px_12px]">
          <button
            onClick={() => navigate("/subscription/running/history")}
            className={`${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            } p-[6px_12px_6px_12px] rounded-[8px] capitalize cursor-pointer  `}
          >
            Subscriptions
          </button>
        </div>
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
                  Est. APR
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(stakingData) && stakingData?.length > 0 ? (
                stakingData?.map((ele, index) => {
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
                          <img src={ele?.icon} className="md:size-10 size-7" />
                          <div>{ele?.coin_name}</div>
                        </div>
                      </td>
                      <td className="text-left p-[12px_16px_12px_16px]">
                        {ele?.annual_rate}
                      </td>
                      <td className="text-left p-[12px_16px_12px_16px]">
                        <button
                          className={`bg-[#2EDBAD] rounded-xl md:w-[60%] w-full   h-[2.2rem]  text-black cursor-pointer capitalize`}
                          onClick={() => handleSelect(ele)}
                        >
                          Subscribe
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>
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
      {showPopup && (
        <div className="w-full h-full   flex justify-center items-center fixed inset-0 z-50 bg-[#00000080] overflow-hidden">
          <div
            className={`border-1 ${
              dark ? "bg-[#1E2329] text-white" : "bg-white text-black"
            }   md:max-h-[580px] max-md:h-full  ${
              dark ? "border-[#2B3139]" : "border-[#EAECEF]"
            }  p-5 w-[425px] max-md:w-full md:rounded-[20px]`}
          >
            <div>
              <div className="flex flex-col items-center gap-5">
                <div className="flex justify-end w-full">
                  <IoMdClose
                    className="size-6 cursor-pointer"
                    onClick={() => {
                      setShowPopup(false);
                      setAmount("");
                    }}
                  />
                </div>
                <div
                  className="text-[26px] max-md:text-[20px]
              font-semibold
              leading-[40px]"
                >
                  <div className="flex gap-4 items-center">
                    <img src={subscribeObj?.icon} className="size-10" />
                    <div>{subscribeObj?.coin_name}</div>
                  </div>
                </div>
                <div
                  className="text-[14px]
              font-normal;
              leading-[24px] w-full"
                >
                  Please enter amount
                </div>
                <div
                  className={`w-full capitalize rounded-lg h-[3rem] p-2  text-[1rem] text-gray-400 border hover:border-[#2EDBAD]
                           ${
                             dark
                               ? "border-[#474D57] focus:border-[#2EDBAD]"
                               : "border-[#D8DCE1] focus:border-[#2EDBAD]"
                           } focus:outline-none flex justify-between`}
                >
                  <input
                    name="otp"
                    className={` w-full  rounded-lg 
                                h-full text-[18px] 
                                focus:outline-none `}
                    placeholder={`Min Amount : ${subscribeObj?.min_amount}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="flex gap-3 items-center">
                    <div>{"USDT"}</div>
                    <button
                      className="text-[#2EDBAD] font-semibold"
                      onClick={() => setAmount(balance ?? "")}
                    >
                      MAX
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div>Max Amount : {subscribeObj?.max_amount}</div>
                  <div>Available Balance : {balance}</div>
                </div>
                <div className="w-full flex justify-between gap-3">
                  {Array.isArray(subscribeObj?.duration) &&
                    subscribeObj?.duration?.map((ele, index) => (
                      <div
                        className={`${
                          days === ele ? "bg-[#2EDBAD]" : "bg-[#EAECEF]"
                        } rounded-[12px] p-[6px] w-full flex justify-center whitespace-nowrap text-black`}
                        key={index}
                        onClick={() => setDays(ele)}
                      >
                        {ele + " Days"}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between w-full gap-2 capitalize">
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setAmount("");
                    }}
                    className={`${
                      dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                    } p-[6px_12px_6px_12px] rounded-[8px] w-full capitalize cursor-pointer  `}
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    //   disabled={isDisable}
                    className={`rounded-[12px] p-2 w-full ${
                      true ? "bg-[#2EDBAD]" : "bg-[#EAECEF]"
                    } text-[#000000] cursor-pointer capitalize`}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
