import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CoinSelect from "./CoinSelect";
import { apiRequest } from "../Helper";
import { useEffect, useState } from "react";
import { showError } from "../Toastify/toastServices";
import { styled, stepConnectorClasses, StepConnector } from "@mui/material";
import QRCode from "react-qr-code";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";

const CustomConnector = styled(StepConnector, {
  shouldForwardProp: (prop) => prop !== "dark",
})(({ dark }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 15,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftWidth: 3,
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
        width: 32,
        height: 32,
        backgroundColor:
          active || completed
            ? `${dark ? "#ccc" : "black"}`
            : `${dark ? "black" : "#ccc"}`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: dark ? "black" : "white",
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      {completed ? "✔" : icon}
    </div>
  );
}

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = useState();
  const [coinData, setCoinData] = useState([]);
  const [network, setNewwork] = useState([]);
  const [icon, setIcon] = useState({});
  const [openCoin, setOpenCoin] = useState(false);
  const [openNetwork, setOpenNetwork] = useState(false);
  const [obj, setObj] = useState({});
  const [addressCode, setAddressCode] = useState({});
  const dark = useSelector((state) => state.counter.dark);
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
        console.log(data, "ipl");
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
    <div className=" mt-18 w-full  flex justify-center ">
      <div className="w-full">
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          connector={<CustomConnector dark={dark} />}
        >
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div className="text-[20px] font-medium leading-[24px]">
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
                          "search"
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
                  {filteredCoins.map((coin, ind) => (
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
                  ))}
                </ul>
              </CoinSelect>
            </div>
          </Step>
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div className="text-[20px] font-medium leading-[24px]">
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
                    {network.map((coin, ind) => (
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
                          <span className="font-medium">{coin.chain_name}</span>
                          <span className="text-gray-500 text-sm">
                            {coin.coin}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CoinSelect>
              </div>
            )}
          </Step>
          <Step>
            <StepLabel StepIconComponent={DiamondStepIcon}>
              <div className="text-[20px] font-medium leading-[24px]">
                Deposit Address
              </div>
            </StepLabel>
            {activeStep > 1 && (
              <div
                className={`pl-10 w-[520px] max-md:w-full  border-1 ${
                  dark ? "border-[#333B47]" : "border-[#EDEDED]"
                }  p-[12px] rounded-lg`}
              >
                <div className="flex gap-2">
                  <div>
                    <QRCode
                      className="w-[80px] h-[80px]"
                      value={addressCode?.address || ""}
                    />
                  </div>
                  <div className="text-[14px] font-medium">
                    <div className="font-normal">Address</div>
                    <div className="leading-[22px] flex-wrap break-all">
                      {addressCode?.address}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
