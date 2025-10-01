import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CoinSelect from "../../../Common/CoinSelect";
import { apiRequest } from "../../../Helper";
import { useEffect, useState } from "react";
import { showError } from "../../../Toastify/toastServices";
import { styled, stepConnectorClasses, StepConnector } from "@mui/material";
import QRCode from "react-qr-code";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { BiSolidCopy } from "react-icons/bi";
import { copyToClipboard, formatDate } from "../../../Constant";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../../../icons";
const CustomConnector = styled(StepConnector, {
  shouldForwardProp: (prop) => prop !== "dark",
})(({ dark }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 12,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftWidth: 2,
    minHeight: 100,
    marginBottom: -20,
    marginTop: -56,
    borderColor: "#ccc",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: dark ? "#ccc" : "black",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: dark ? "#ccc" : "black",
  },
}));

function DiamondStepIcon(props) {
  const { active, completed, icon } = props;
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div
      style={{
        width: 24,
        height: 24,
        backgroundColor:
          active || completed
            ? `${dark ? "#EAECEF" : "#2B3139"}`
            : `${dark ? "#202630" : "#EAECEF"}`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: dark ? "black" : "white",
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      {completed ? <FaCheck className="size-2.5" /> : icon}
    </div>
  );
}

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = useState();
  const [coinData, setCoinData] = useState([]);
  const [network, setNewwork] = useState([]);
  const [icon, setIcon] = useState({});
  const navigate = useNavigate();
  const [openCoin, setOpenCoin] = useState(false);
  const [openNetwork, setOpenNetwork] = useState(false);
  const [obj, setObj] = useState({});
  const [addressCode, setAddressCode] = useState({});
  const dark = useSelector((state) => state.counter.dark);
  const depositHistory = useSelector((state) => state.counter.depositHistory);
  const [query, setQuery] = useState("");
  const filteredCoins = coinData.filter(
    (c) =>
      c.coin.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase())
  );
  const getNetwork = async (id) => {
    try {
      const { data, status } = await apiRequest({
        method: "get",
        url: `https://test.bitzup.com/blockchain/wallet/get-all-networks?currency_id=${id}&type=deposit`,
      });

      if (status === 200 && data?.status === "1") {
        setNewwork(data?.data);
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
  const handleSelect = (symbol) => {
    setOpenCoin(!openCoin);
    if (symbol?.symbol != icon?.symbol) {
      setIcon(symbol);
      setObj({});
      setActiveStep(1);
      setQuery(symbol.symbol);
      getNetwork(symbol?.currency_id);
    }
  };
  const getQrDetail = async (evm, chain) => {
    const jsonObj = {
      currency_id: icon?.currency_id,
      evm_compatible: evm,
      chain_id: chain,
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/blockchain/wallet/get-user-walletAddress`,
        data: jsonObj,
      });

      if (status === 200 && data?.status === "1") {
        // setNewwork(data?.data);
        setAddressCode(data?.data);
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
  const handleNetwork = (symbol) => {
    if (symbol?.chain_name !== obj?.chain_name) {
      setObj(symbol);
      setActiveStep(2);
      getQrDetail(symbol?.evm_compatible, symbol?.chain_id);
    }
  };
  const getUserProfile = async () => {
    try {
      const { data, status } = await apiRequest({
        method: "get",
        url: `https://test.bitzup.com/blockchain/wallet/get-deposit-withdraw-asset?type=deposit`,
      });

      if (status === 200 && data?.status === "1") {
        //   dispatch(setUserProfile(data?.data));
        setCoinData(data?.data);
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
  }, []);

  return (
    <div className="w-full  flex justify-center ">
      <div className="w-full">
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          connector={<CustomConnector dark={dark} />}
        >
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div
                className={`text-[20px] font-medium leading-[24px] ${
                  dark ? " text-[#EAECEF]" : " text-[#262030]"
                }`}
              >
                Select coin
              </div>
            </StepLabel>
            <div className="pl-10">
              <CoinSelect
                icon={icon}
                open={openCoin}
                setOpen={setOpenCoin}
                header={({ open }) => (
                  <div
                    className="flex w-full items-center p-2"
                    onClick={() => setOpenCoin(true)}
                  >
                    {" "}
                    {!query && <BsSearch />}
                    {!open ? (
                      <div className="flex w-full justify-between items-center">
                        {query ? (
                          <div className="flex gap-3">
                            <img
                              src={`https://bitzupicons.blr1.cdn.digitaloceanspaces.com/${icon.icon}`}
                              alt={icon.icon}
                              className="w-6 h-6"
                            />
                            <div>{`${icon.symbol} ${icon.coin}`}</div>
                          </div>
                        ) : (
                         <div className="p-[6px_12px_6px_12px] ">search</div>
                        )}{" "}
                        <IoIosArrowDown />
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="w-full  rounded-md  focus:outline-none"
                        />

                        <IoIosCloseCircle onClick={() => setQuery("")} />
                      </>
                    )}
                  </div>
                )}
              >
                {" "}
                <ul>
                  {filteredCoins?.length > 0 ? (
                    filteredCoins.map((coin, ind) => (
                      <li
                        key={ind}
                        className={`flex items-center justify-between p-[16px_12px_16px_12px] ${
                          dark ? "" : "hover:bg-[#F5F5F5]"
                        } rounded-lg cursor-pointer`}
                        onClick={() => handleSelect(coin)}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://bitzupicons.blr1.cdn.digitaloceanspaces.com/${coin.icon}`}
                            alt={coin.icon}
                            className="w-6 h-6"
                          />
                          <span className="font-medium">{coin.symbol}</span>
                          <span className="text-gray-500 text-sm">
                            {coin.coin}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="h-full w-full flex justify-center items-center">
                      No Data Found
                    </div>
                  )}
                </ul>
              </CoinSelect>
            </div>
          </Step>
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div
                className={`text-[20px] font-medium leading-[24px] ${
                  dark ? " text-[#EAECEF]" : " text-[#262030]"
                }`}
              >
                Select Network
              </div>
            </StepLabel>
            {activeStep > 0 && (
              <div className="pl-10">
                <CoinSelect
                  icon={(obj, (obj.symbol = obj?.chain_name))}
                  open={openNetwork}
                  setOpen={setOpenNetwork}
                  header={({ open }) => (
                    <div
                      className="w-full flex justify-between h-full p-2 items-center"
                      onClick={() => setOpenNetwork(!openNetwork)}
                    >
                      <div>
                        {obj?.chain_name ? obj?.chain_name : "Select Network"}
                      </div>

                      <IoIosArrowDown
                        className={`${
                          open ? "transition-transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  )}
                >
                  <ul>
                    {network.length > 0 ? (
                      network.map((coin, ind) => (
                        <li
                          key={ind}
                          className={`flex ${
                            dark ? "" : "hover:bg-[#F5F5F5]"
                          } items-center justify-between p-[16px_12px_16px_12px] rounded-lg cursor-pointer`}
                          onClick={() => {
                            handleNetwork(coin);
                            setOpenNetwork(!openNetwork);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {coin.chain_name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {coin.coin}
                            </span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="h-full w-full flex justify-center items-center">
                        No Data Found
                      </div>
                    )}
                  </ul>
                </CoinSelect>
              </div>
            )}
          </Step>
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div
                className={`text-[20px] font-medium leading-[24px] ${
                  dark ? " text-[#EAECEF]" : " text-[#262030]"
                }`}
              >
                Deposit Address
              </div>
            </StepLabel>
            {activeStep > 1 && (
              <div
                className={`pl-10 w-full max-w-[700px] max-md:w-full  border-1 ${
                  dark ? "border-[#333B47]" : "border-[#EDEDED]"
                }  p-[12px] rounded-lg`}
              >
                <div className="flex max-md:flex-col justify-between gap-10 items-center">
                  <div>
                    <QRCode
                      className="w-[80px] h-[80px]"
                      value={addressCode?.address || ""}
                    />
                  </div>
                  <div className="flex  items-center justify-between w-full">
                    <div className="text-[14px] font-medium flex flex-col ">
                      <div className="font-normal ">Address</div>
                      <div className="leading-[22px] flex-wrap break-all font-semibold">
                        {addressCode?.address}
                      </div>
                    </div>
                    <BiSolidCopy
                      className="size-[18px]"
                      onClick={() => copyToClipboard(addressCode?.address)}
                    />
                  </div>
                </div>
              </div>
            )}
          </Step>
        </Stepper>
        <div className="p-[40px] flex flex-col gap-10 w-full max-md:hidden">
          <div className="flex justify-between items-center w-full">
            <div className="text-[20px] font-semibold leading-[28px]">
              Recent Deposits
            </div>
            <div
              className="text-[14px] font-medium leading-[22px] flex items-center cursor-pointer"
              onClick={() => navigate("/crypto/deposit/history")}
            >
              More <RiArrowRightSLine className="size-5 font-light" />
            </div>
          </div>
          <div className="w-full overflow-x-auto custom-scroll">
            <table className={`w-full`}>
              <thead>
                <tr
                  className={`text-[12px] ${
                    dark
                      ? "bg-[#2B3139] border-[#474d57]"
                      : "bg-[#F5F5F5] border-[#eaecef]"
                  } text-[#848e9c] border-b-[1px] font-normal leading-[20px] w-full `}
                >
                  <th className="text-left p-[12px_16px_12px_16px]">Time</th>
                  <th className="text-left p-[12px_16px_12px_16px]">Type</th>
                  <th className="text-left p-[12px_16px_12px_16px]">
                    Deposit wallet
                  </th>
                  <th className="text-left p-[12px_16px_12px_16px]">Asset</th>
                  <th className="text-left p-[12px_16px_12px_16px]">amount</th>
                  <th className="text-left p-[12px_16px_12px_16px]">
                    Destination{" "}
                  </th>
                  <th className="text-left p-[12px_16px_12px_16px]">TxID</th>
                  <th className="text-left p-[12px_16px_12px_16px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(depositHistory) && depositHistory?.length > 0 ? (
                  depositHistory?.slice(0, 3).map((ele, index) => {
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
                          {ele?.amount}
                        </td>
                        <td className="text-left p-[12px_16px_12px_16px]">
                          --
                        </td>
                        <td className="text-left p-[12px_16px_12px_16px]">
                          {ele?.transaction_id}
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
            <div
              className="text-[14px] font-medium leading-[22px] flex items-center cursor-pointer"
              onClick={() => navigate("/crypto/deposit/history")}
            >
              More <RiArrowRightSLine className="size-5 font-light" />
            </div>
          </div>
          {Array.isArray(depositHistory) &&
            depositHistory?.slice(0, 3).map((ele, index) => {
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
                      {ele?.amount}
                    </div>
                    <div className="text-[14px] font-medium leading-[22px] ">
                      {ele?.status}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
