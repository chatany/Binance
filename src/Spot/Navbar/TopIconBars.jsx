import { useDispatch, useSelector } from "react-redux";
import ScrollStatsBar from "../../common/TopIconBar";
import { FaStar } from "react-icons/fa6";
import { apiRequest } from "../../Helper";
import { getFaverateData } from "../Apis/apiCall";
import { formatDecimal, formatToKMB, formatToKMBWithCommas } from "../../Constant";
import { RiArrowDownSFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { showError, showSuccess } from "../../Toastify/toastServices";
import { Loder } from "../../common/Loder";
export const TopIconBar1 = () => {
  const tikerData = useSelector((state) => state.counter.tikerData);
  const iconURL = useSelector((state) => state.counter.iconURL);
  const isFav = useSelector((state) => state.counter.isFav);
  const coinName = useSelector((state) => state.counter.coinName);
  const pairId = useSelector((state) => state.counter.pairId);
  const priceDecimal = useSelector((state) => state.counter.priceDecimal);
  const dark = useSelector((state) => state.counter.dark);
  const [priceColor, setPriceColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastPriceRef = useRef(null);
  const token = useAuth();

  useEffect(() => {
    const currentPrice = parseFloat(tikerData?.lastPrice);

    if (!isNaN(currentPrice) && lastPriceRef.current !== null) {
      if (currentPrice > lastPriceRef.current) {
        setPriceColor(true);
      } else if (currentPrice < lastPriceRef.current) {
        setPriceColor(false);
      } else {
        setPriceColor(false);
      }
    }

    if (!isNaN(currentPrice)) {
      lastPriceRef.current = currentPrice;
    }
  }, [tikerData?.lastPrice]);

  const dispatch = useDispatch();
  const handleChange = async () => {
    if (!token) {
      showError("You are not authorized");
      return;
    }
    const faverae = !isFav;
    const favData = {
      pair_id: String(pairId),
      type: faverae ? String(faverae) : "false",
    };
    setIsLoading(true)
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200 && data?.status === "1") {
        showSuccess(data?.message);
      }
      if (data?.status != 1) {
        showError(data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
      setIsLoading(false)
    }
  };
  return (
    <div
      className={`hidden ${
        dark ? "border-[#2B3139] bg-[#181A20]" : "border-[#EAECEF] bg-white"
      } border-b-1  items-center w-full justify-evenly xl:flex  font-normal p-4 rounded-lg`}
    >
      <div className="flex gap-1">
        <FaStar
          className={`h-6 cursor-pointer w-6 ${
            isFav ? "text-[#2EDBAD]" : "text-[#707A8A]"
          }`}
          onClick={handleChange}
        />
        {iconURL && <img src={iconURL} className="h-6 w-6" alt="icon" />}
      </div>
      <div className="flex flex-col">
        <div className="lg:text-[18px] text-[10px] font-medium min-w-max">
          {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
        </div>
        <div className="lg:text-[18px] text-gray-400 text-[10px] font-medium min-w-max">
          {coinName} Price
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div
          className={`${
            priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
          } text-[20px] leading-5  min-w-max `}
        >
          {formatToKMBWithCommas(
            formatDecimal(tikerData?.lastPrice, priceDecimal)
          )}
        </div>
        <div className="text-[12px] leading-4 min-w-max ">
          $
          {formatToKMBWithCommas(
            formatDecimal(tikerData?.lastPrice, priceDecimal)
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 text-[12px] min-w-max">
          24h Change
        </div>
        <div
          className={`${
            tikerData?.priceChange > 0 ? "text-[#2EBD85]" : "text-[#F6465D]"
          } text-[12px]  min-w-max flex`}
        >
          {tikerData?.priceChange
            ? parseFloat(tikerData?.priceChange).toString()
            : 0}{"  "}
          {/* {tikerData?.priceChange > 0 ? " +" : " "} */}
          <div className="ml-2">

          {tikerData?.priceChangePercent
            ? parseFloat(tikerData?.priceChangePercent).toString()
            : 0}{" "}
          %
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 text-[12px] text-[10px] min-w-max">
          24h High
        </div>
        <div className="text-[12px] text-[10px] min-w-max">
          {tikerData?.highPrice
            ? parseFloat(tikerData?.highPrice).toString()
            : 0}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 text-[12px] text-[10px] leading-4 min-w-max">
          24h Low
        </div>
        <div className="text-[12px] text-[10px] leading-4 min-w-max">
          {tikerData?.lowPrice ? parseFloat(tikerData?.lowPrice).toString() : 0}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 md:text-[12px] text-[10px] leading-4 min-w-max">
          24h Volume ({tikerData?.symbol?.split("USDT")[0]})
        </div>
        <div className="md:text-[12px] text-[10px] leading-4 min-w-max">
          {tikerData?.volume ? parseFloat(tikerData?.volume).toString() : 0}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 md:text-[12px] text-[10px] leading-4 min-w-max">
          24h Volume (USDT)
        </div>
        <div className="md:text-[12px] text-[10px] leading-4 min-w-max">
          {tikerData?.quoteVolume
            ? parseFloat(tikerData?.quoteVolume).toString()
            : 0}
        </div>
      </div>
      {/* <div className="flex flex-col min-w-max">
        <div className="text-gray-400 md:text-[12px] text-[12px] leading-4 min-w-max">
          Token Tags
        </div>
        <div className="flex gap-1 md:text-[12px] text-[#2EDBAD] text-[10px] leading-4 min-w-max">
          <span>Pow</span>
          <span>|</span>
          <span>Payments</span>
          <span>|</span>
          <span>Price Protection</span>
        </div>
      </div> */}
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
export const TopIconBar2 = () => {
  const tikerData = useSelector((state) => state.counter.tikerData);
  const iconURL = useSelector((state) => state.counter.iconURL);
  const isFav = useSelector((state) => state.counter.isFav);
  const coinName = useSelector((state) => state.counter.coinName);
  const pairId = useSelector((state) => state.counter.pairId);
  const priceDecimal = useSelector((state) => state.counter.priceDecimal);
  const dark = useSelector((state) => state.counter.dark);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useAuth();
  const handleChange = async () => {
    if (!token) {
      showError("You are not authorized");
      return;
    }
    const faverae = !isFav;
    const favData = {
      pair_id: String(pairId),
      type: faverae ? String(faverae) : "false",
    };
    setIsLoading(true)
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200 && data?.status === "1") {
        showSuccess(data?.message);
      }
      if (data?.status != 1) {
        showError(data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
      setIsLoading(false)
    }
  };
  const [priceColor, setPriceColor] = useState(false);
  const lastPriceRef = useRef(null);

  useEffect(() => {
    const currentPrice = parseFloat(tikerData?.lastPrice);

    if (!isNaN(currentPrice) && lastPriceRef.current !== null) {
      if (currentPrice > lastPriceRef.current) {
        setPriceColor(true);
      } else if (currentPrice < lastPriceRef.current) {
        setPriceColor(false);
      } else {
        setPriceColor(false);
      }
    }

    if (!isNaN(currentPrice)) {
      lastPriceRef.current = currentPrice;
    }
  }, [tikerData?.lastPrice]);
  return (
    <div
      className={` w-full   ${
        dark ? "border-[#2b3139] bg-[#181A20]" : "border-[#EAECEF] bg-white"
      } text-xs p-5 max-xl:flex hidden`}
    >
      <div className="max-w-[30%] flex items-center gap-1.5">
        <div className="flex gap-1">
          <FaStar
            className={`h-6 cursor-pointer w-6 ${
              isFav ? "text-[#2EDBAD]" : "text-[#707A8A]"
            }`}
            onClick={handleChange}
          />
          {iconURL && <img src={iconURL} className="h-6 w-6" alt="icon" />}
        </div>
        <div className="flex flex-col">
          <div className="md:text-[14px] text-[10px]">
            {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
          </div>
          <div className="md:text-[14px] text-[10px] text-gray-400 min-w-max">
            {coinName} Price
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`${
              priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
            }  md:text-[12px] text-[10px]`}
          >
            {formatToKMBWithCommas(
              formatDecimal(tikerData?.lastPrice, priceDecimal)
            )}
          </div>
          <div className="md:text-[12px] text-[10px]">
            $
            {formatToKMBWithCommas(
              formatDecimal(tikerData?.lastPrice, priceDecimal)
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[70%] flex flex-wrap">
        <ScrollStatsBar
          dark={dark}
          items={
            <>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h Change
                </div>
                <div className={`${
            tikerData?.priceChange > 0 ? "text-[#2EBD85]" : "text-[#F6465D]"
          } text-[12px]  min-w-max flex`}>
                  {tikerData?.priceChange
                    ? parseFloat(tikerData?.priceChange).toString()
                    : 0}{" "}
                  {/* +{" "} */}
                  <div className="ml-2">

                  {tikerData?.priceChangePercent
                    ? parseFloat(tikerData?.priceChangePercent).toString()
                    : 0}{" "}
                  </div>
                  %
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h High
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {tikerData?.highPrice
                    ? parseFloat(tikerData?.highPrice).toString()
                    : 0}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400md:text-[12px] text-[10px]]">
                  24h Low
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {tikerData?.lowPrice
                    ? parseFloat(tikerData?.lowPrice).toString()
                    : 0}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h Volume ({tikerData?.symbol?.split("USDT")[0]})
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {tikerData?.volume
                    ? parseFloat(tikerData?.volume).toString()
                    : 0}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px] min-w-max">
                  24h Volume (USDT)
                </div>
                <div className="md:text-[11px] text-[12px]">
                  {tikerData?.quoteVolume
                    ? parseFloat(tikerData?.quoteVolume).toString()
                    : 0}
                </div>
              </div>
              {/* <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  Token Tags
                </div>
                <div className="flex gap-1 md:text-[12px] text-[10px] text-[#2EDBAD] ">
                  <span>Pow</span>
                  <span>|</span>
                  <span>Payments</span>
                  <span>|</span>
                  <span>Price Protection</span>
                </div>
              </div> */}
            </>
          }
        />
      </div>
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
export const TopIconBar3 = () => {
  const tikerData = useSelector((state) => state.counter.tikerData);
  const iconURL = useSelector((state) => state.counter.iconURL);
  const isFav = useSelector((state) => state.counter.isFav);
  const coinName = useSelector((state) => state.counter.coinName);
  const pairId = useSelector((state) => state.counter.pairId);
  const priceDecimal = useSelector((state) => state.counter.priceDecimal);
  const dark = useSelector((state) => state.counter.dark);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const token = useAuth();
  const handleChange = async () => {
    if (!token) {
      showError("You are not authorized");
      return;
    }
    const faverae = !isFav;
    const favData = {
      pair_id: String(pairId),
      type: faverae ? String(faverae) : "false",
    };
    setIsLoading(true)
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200 && data?.status === "1") {
        showSuccess(data?.message);
      }
      if (data?.status != 1) {
        showError(data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
      setIsLoading(false)
    }
  };
  const [priceColor, setPriceColor] = useState(false);
  const lastPriceRef = useRef(null);

  useEffect(() => {
    const currentPrice = parseFloat(tikerData?.lastPrice);

    if (!isNaN(currentPrice) && lastPriceRef.current !== null) {
      if (currentPrice > lastPriceRef.current) {
        setPriceColor(true);
      } else if (currentPrice < lastPriceRef.current) {
        setPriceColor(false);
      } else {
        setPriceColor(false);
      }
    }

    if (!isNaN(currentPrice)) {
      lastPriceRef.current = currentPrice;
    }
    const num = formatToKMBWithCommas(
      formatDecimal(tikerData?.lastPrice, priceDecimal)
    );
    document.title = `${num} | ${symbol} | ${coinName?.toUpperCase()} to USDT | Bitzup Spot`;
  }, [tikerData?.lastPrice, coinName]);
  return (
    <div
      className={` w-full text-xs  ${
        dark ? "bg-[#181A20]  " : "bg-white  "
      } p-2 md:flex hidden  rounded-lg `}
    >
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex items-center gap-2">
          <div className="flex gap-1">
            <FaStar
              className={`h-6 cursor-pointer w-6 ${
                isFav ? "text-[#2EDBAD]" : "text-[#707A8A]"
              }`}
              onClick={handleChange}
            />
            {iconURL && <img src={iconURL} className="h-6 w-6" alt="coin" />}
          </div>
          <div className="flex flex-col">
            <div className="md:text-[14px] text-[10px]">
              {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
            </div>
            <div className="md:text-[14px] text-[10px] text-gray-400 min-w-max">
              {coinName} Price
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={`${
                priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
              } md:text-[12px] text-[10px]`}
            >
              {formatToKMBWithCommas(
                formatDecimal(tikerData?.lastPrice, priceDecimal)
              )}
            </div>
            <div className="md:text-[12px] text-[10px]">
              $
              {formatToKMBWithCommas(
                formatDecimal(tikerData?.lastPrice, priceDecimal)
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-wrap">
          <ScrollStatsBar
            dark={dark}
            items={
              <>
                <div className="flex flex-col">
                  <div className="text-gray-400 md:text-[12px] text-[10px]">
                    24h Change
                  </div>
                  <div className={`${
            tikerData?.priceChange > 0 ? "text-[#2EBD85]" : "text-[#F6465D]"
          } text-[12px]  min-w-max flex`}>
                    {tikerData?.priceChange
                      ? parseFloat(tikerData?.priceChange).toString()
                      : 0}{" "}
                    {/* +{" "} */}
                    <div className="ml-2">

                    {tikerData?.priceChangePercent
                      ? parseFloat(tikerData?.priceChangePercent).toString()
                      : 0}{" "}
                    </div>
                    %
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 md:text-[12px] text-[10px]">
                    24h High
                  </div>
                  <div className="md:text-[12px] text-[10px]">
                    {tikerData?.highPrice
                      ? parseFloat(tikerData?.highPrice).toString()
                      : 0}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400md:text-[12px] text-[10px]]">
                    24h Low
                  </div>
                  <div className="md:text-[12px] text-[10px]">
                    {tikerData?.lowPrice
                      ? parseFloat(tikerData?.lowPrice).toString()
                      : 0}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 md:text-[12px] text-[10px]">
                    24h Volume ({tikerData?.symbol?.split("USDT")[0]})
                  </div>
                  <div className="md:text-[12px] text-[10px]">
                    {tikerData?.volume
                      ? parseFloat(tikerData?.volume).toString()
                      : 0}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 md:text-[12px] text-[10px] min-w-max">
                    24h Volume (USDT)
                  </div>
                  <div className="md:text-[11px] text-[12px]">
                    {tikerData?.quoteVolume
                      ? parseFloat(tikerData?.quoteVolume).toString()
                      : 0}
                  </div>
                </div>
                {/* <div className="flex flex-col">
                  <div className="text-gray-400 md:text-[12px] text-[10px]">
                    Token Tags
                  </div>
                  <div className="flex gap-1 md:text-[12px] text-[10px] text-[#2EDBAD] ">
                    <span>Pow</span>
                    <span>|</span>
                    <span>Payments</span>
                    <span>|</span>
                    <span>Price Protection</span>
                  </div>
                </div> */}
              </>
            }
          />
        </div>
      </div>
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
export const TopIconBar4 = ({ setOpenMarketPopup }) => {
  const tikerData = useSelector((state) => state.counter.tikerData);
  const iconURL = useSelector((state) => state.counter.iconURL);
  const coinName = useSelector((state) => state.counter.coinName);
  const priceDecimal = useSelector((state) => state.counter.priceDecimal);
  const dark = useSelector((state) => state.counter.dark);
  const [priceColor, setPriceColor] = useState(false);
  const lastPriceRef = useRef(null);

  useEffect(() => {
    const currentPrice = parseFloat(tikerData?.lastPrice);

    if (!isNaN(currentPrice) && lastPriceRef.current !== null) {
      if (currentPrice > lastPriceRef.current) {
        setPriceColor(true);
      } else if (currentPrice < lastPriceRef.current) {
        setPriceColor(false);
      } else {
        setPriceColor(false);
      }
    }

    if (!isNaN(currentPrice)) {
      lastPriceRef.current = currentPrice;
    }
  }, [tikerData?.lastPrice]);
  return (
    <div
      className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"}
                  grid grid-cols-2 p-3 gap-1`}
    >
      <div className="flex gap-3">
        {iconURL && <img src={iconURL} className="h-6 w-6" alt="coin" />}
        <div
          className="text-[20px]  min-w-max flex gap-2"
          onClick={() => setOpenMarketPopup(true)}
        >
          {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
          <RiArrowDownSFill onClick={() => setOpenMarketPopup(true)} />
        </div>
      </div>
      <div className="flex items-center text-gray-400  text-[10px] justify-center pl-10">
        {coinName} Price
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div
              className={`text-[28px] ${
                priceColor ? "text-[#2EBD85] " : "text-[#F6465D] "
              } `}
            >
              {formatToKMBWithCommas(
                formatDecimal(tikerData?.lastPrice, priceDecimal)
              )}
            </div>
            <div className="flex gap-6">
              <div className="text-[12px]  min-w-max">
                $
                {formatToKMBWithCommas(
                  formatDecimal(tikerData?.lastPrice, priceDecimal)
                )}
              </div>
              <div className={`${
            tikerData?.priceChange > 0 ? "text-[#2EBD85]" : "text-[#F6465D]"
          } text-[12px]  min-w-max`}>
                {tikerData?.priceChangePercent
                  ? parseFloat(tikerData?.priceChangePercent).toString()
                  : 0}{" "}
                %
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex  gap-[6px] text-[12px]  text-[#2EDBAD]  overflow-x-auto scrollbar-hide  w-[80%]">
          <span className="min-w-max">Pow |</span>
          <span className="min-w-max">Payments |</span>
          <span className="min-w-max">Price Protection</span>
        </div> */}
      </div>
      <div className="grid grid-cols-2 pr-10">
        <div className="flex flex-col">
          <div className="text-gray-400  text-[10px]">24h High</div>
          <div className=" text-[12px]">
            {tikerData?.highPrice
              ? parseFloat(tikerData?.highPrice).toString()
              : 0}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400 text-[10px] min-w-max">
            24h Volume ({tikerData?.symbol?.split("USDT")[0]})
          </div>
          <div className=" text-[12px]">
            {tikerData?.volume
              ? formatToKMB(parseFloat(tikerData?.volume).toString())
              : 0}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400 text-[10px] min-w-max">24h Low</div>
          <div className="text-[12px]">
            {tikerData?.lastPrice
              ? parseFloat(tikerData?.lastPrice).toString()
              : 0}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400  text-[10px] min-w-max">
            24h Volume (USDT)
          </div>
          <div className=" text-[12px]">
            {tikerData?.quoteVolume
              ? formatToKMB(parseFloat(tikerData?.quoteVolume).toString())
              : 0}
          </div>
        </div>
      </div>
    </div>
  );
};
