import { useDispatch, useSelector } from "react-redux";
import ScrollStatsBar from "../common/TopIconBar";
import { FaStar } from "react-icons/fa6";
import { apiRequest } from "../Helper";
import { getFaverateData } from "./apiCall";
import { formatToKMB } from "../Constant";
import { RiArrowDownSFill } from "react-icons/ri";
export const TopIconBar1 = ({ dark }) => {
  const { tikerData, iconURL, isFav, tradeData, pairId } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const handleChange = async () => {
    const faverae = !isFav;
    const favData = {
      pair_id: pairId,
      type: faverae ? faverae : "false",
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200) {
      }
      if (data?.status == 0) {
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
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
          className={`h-6 cursor-pointer w-6 ${isFav ? "text-yellow-400" : ""}`}
          onClick={handleChange}
        />
        <img src={iconURL} className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <div className="lg:text-[18px] text-[10px] font-medium min-w-max">
          {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
        </div>
        <div className="lg:text-[18px] text-gray-400 text-[10px] font-medium min-w-max">
          Bitcoin Price
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div
          className={`${
            !tradeData[0]?.m ? "text-[#2EBD85] " : "text-[#F6465D] "
          } text-[20px] leading-5  min-w-max `}
        >
          {parseFloat(tikerData?.lastPrice).toFixed(2)}
        </div>
        <div className="lg:text-[12px]  text-[8px] leading-4 min-w-max ">
          ${parseFloat(tikerData?.lastPrice).toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 lg:text-[12px] text-[8px] min-w-max">
          24h Change
        </div>
        <div
          className={`${
            tikerData?.priceChange > 0 ? "text-[#2EBD85]" : "text-[#F6465D]"
          } lg:text-[12px] text-[8px] min-w-max`}
        >
          {parseFloat(tikerData?.priceChange).toString()}
          {tikerData?.priceChange > 0 ? " +" : " "}
          {parseFloat(tikerData?.priceChangePercent).toString()} %
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 lg:text-[12px] text-[10px] min-w-max">
          24h High
        </div>
        <div className="lg:text-[12px] text-[10px] min-w-max">
          {parseFloat(tikerData?.highPrice).toString()}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 lg:text-[12px] text-[10px] leading-4 min-w-max">
          24h Low
        </div>
        <div className="lg:text-[12px] text-[10px] leading-4 min-w-max">
          {parseFloat(tikerData?.lowPrice).toString()}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 md:text-[12px] text-[10px] leading-4 min-w-max">
          24h Volume (BTC)
        </div>
        <div className="md:text-[12px] text-[10px] leading-4 min-w-max">
          {parseFloat(tikerData?.volume).toString()}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-gray-400 md:text-[12px] text-[10px] leading-4 min-w-max">
          24h Volume (USDT)
        </div>
        <div className="md:text-[12px] text-[10px] leading-4 min-w-max">
          {parseFloat(tikerData?.quoteVolume).toString()}
        </div>
      </div>
      <div className="flex flex-col min-w-max">
        <div className="text-gray-400 md:text-[12px] text-[12px] leading-4 min-w-max">
          Token Tags
        </div>
        <div className="flex gap-1 md:text-[12px] text-amber-400 text-[10px] leading-4 min-w-max">
          <span>Pow</span>
          <span>|</span>
          <span>Payments</span>
          <span>|</span>
          <span>Price Protection</span>
        </div>
      </div>
    </div>
  );
};
export const TopIconBar2 = ({ dark }) => {
  const { tikerData, iconURL, isFav, tradeData, pairId } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const handleChange = async () => {
    const faverae = !isFav;
    const favData = {
      pair_id: pairId,
      type: faverae ? faverae : "false",
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200) {
      }
      if (data?.status == 0) {
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
    }
  };
  return (
    <div
      className={` w-full   ${
        dark ? "border-[#2B3139] bg-[#181A20]" : "border-[#EAECEF] bg-white"
      } text-xs p-2 max-xl:flex hidden`}
    >
      <div className="max-w-[30%] flex items-center gap-1.5">
        <div className="flex gap-1">
          <FaStar
            className={`h-6 cursor-pointer w-6 ${
              isFav ? "text-yellow-400" : ""
            }`}
            onClick={handleChange}
          />
          <img src={iconURL} className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <div className="md:text-[14px] text-[10px]">
            {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
          </div>
          <div className="md:text-[14px] text-[10px] text-gray-400 min-w-max">
            Bitcoin Price
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`${
              !tradeData[0]?.m ? "text-[#2EBD85] " : "text-[#F6465D] "
            }  md:text-[12px] text-[10px]`}
          >
            {parseFloat(tikerData?.lastPrice).toFixed(2)}
          </div>
          <div className="md:text-[12px] text-[10px]">
            ${parseFloat(tikerData?.lastPrice).toFixed(2)}
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
                <div className="text-green-500 md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.priceChange).toString()} +{" "}
                  {parseFloat(tikerData?.priceChangePercent).toString()} %
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h High
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.highPrice).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400md:text-[12px] text-[10px]]">
                  24h Low
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.lowPrice).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h Volume (BTC)
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.volume).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px] min-w-max">
                  24h Volume (USDT)
                </div>
                <div className="md:text-[11px] text-[12px]">
                  {parseFloat(tikerData?.quoteVolume).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  Token Tags
                </div>
                <div className="flex gap-1 md:text-[12px] text-[10px] text-amber-400 ">
                  <span>Pow</span>
                  <span>|</span>
                  <span>Payments</span>
                  <span>|</span>
                  <span>Price Protection</span>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};
export const TopIconBar3 = ({ dark }) => {
  const { tikerData, iconURL, isFav, tradeData, pairId } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const handleChange = async () => {
    const faverae = !isFav;
    const favData = {
      pair_id: pairId,
      type: faverae ? faverae : "false",
    };
    try {
      const { data, status } = await apiRequest({
        method: "post",
        url: `https://test.bitzup.com/onboarding/currency/add-favorite`,
        data: favData,
      });
      if (status === 200) {
      }
      if (data?.status == 0) {
      }
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
    }
  };
  return (
    <div
      className={` w-full text-xs  ${
        dark ? "bg-[#181A20]  " : "bg-white  "
      } p-2 md:flex hidden mb-2 rounded-lg `}
    >
      <div className="w-full flex items-center gap-2">
        <div className="flex gap-1">
          <FaStar
            className={`h-6 cursor-pointer w-6 ${
              isFav ? "text-yellow-400" : ""
            }`}
            onClick={handleChange}
          />
          <img src={iconURL} className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <div className="md:text-[14px] text-[10px]">
            {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
          </div>
          <div className="md:text-[14px] text-[10px] text-gray-400 min-w-max">
            Bitcoin Price
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`${
              !tradeData[0]?.m ? "text-[#2EBD85] " : "text-[#F6465D] "
            } md:text-[12px] text-[10px]`}
          >
            {parseFloat(tikerData?.lastPrice).toFixed(2)}
          </div>
          <div className="md:text-[12px] text-[10px]">
            ${parseFloat(tikerData?.lastPrice).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="w-[70%] flex flex-wrap">
        <ScrollStatsBar
          dark={dark}
          items={
            <>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h Change
                </div>
                <div className="text-green-500 md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.priceChange).toString()} +{" "}
                  {parseFloat(tikerData?.priceChangePercent).toString()} %
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h High
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.highPrice).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400md:text-[12px] text-[10px]]">
                  24h Low
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.lowPrice).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  24h Volume (BTC)
                </div>
                <div className="md:text-[12px] text-[10px]">
                  {parseFloat(tikerData?.volume).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px] min-w-max">
                  24h Volume (USDT)
                </div>
                <div className="md:text-[11px] text-[12px]">
                  {parseFloat(tikerData?.quoteVolume).toString()}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-400 md:text-[12px] text-[10px]">
                  Token Tags
                </div>
                <div className="flex gap-1 md:text-[12px] text-[10px] text-amber-400 ">
                  <span>Pow</span>
                  <span>|</span>
                  <span>Payments</span>
                  <span>|</span>
                  <span>Price Protection</span>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};
export const TopIconBar4 = ({ dark, setOpenMarketPopup }) => {
  const { tikerData, iconURL, tradeData } = useSelector(
    (state) => state.counter
  );
 
  return (
    <div
      className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"}
                  grid grid-cols-2 p-3 gap-1`}
    >
      <div className="flex gap-3">
        <img src={iconURL} className="h-6 w-6" />
        <div
          className="text-[20px]  min-w-max flex gap-2"
          onClick={() => setOpenMarketPopup(true)}
        >
          {tikerData?.symbol?.split("USDT")[0] + "/USDT"}
          <RiArrowDownSFill onClick={() => setOpenMarketPopup(true)} />
        </div>
      </div>
      <div className="flex items-center text-gray-400  text-[10px] justify-center pl-10">
        Bitcoin Price
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div
              className={`text-[28px] ${
                !tradeData[0]?.m ? "text-[#2EBD85] " : "text-[#F6465D] "
              } `}
            >
              {parseFloat(tikerData?.lastPrice).toString()}
            </div>
            <div className="flex gap-6">
              <div className="text-[12px]  min-w-max">
                ${parseFloat(tikerData?.lastPrice).toString()}
              </div>
              <div className="text-green-500 text-[12px]  min-w-max">
                {parseFloat(tikerData?.priceChangePercent).toString()} %
              </div>
            </div>
          </div>
        </div>

        <div className="flex  gap-[6px] text-[12px]  text-amber-400  overflow-x-auto scrollbar-hide  w-[80%]">
          <span className="min-w-max">Pow |</span>
          <span className="min-w-max">Payments |</span>
          <span className="min-w-max">Price Protection</span>
        </div>
      </div>
      <div className="grid grid-cols-2 pr-10">
        <div className="flex flex-col">
          <div className="text-gray-400  text-[10px]">24h High</div>
          <div className=" text-[12px]">
            {parseFloat(tikerData?.highPrice).toString()}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400 text-[10px] min-w-max">
            24h Volume (BTC)
          </div>
          <div className=" text-[12px]">
            {formatToKMB(parseFloat(tikerData?.volume).toString())}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400 text-[10px] min-w-max">24h Low</div>
          <div className="text-[12px]">
            {parseFloat(tikerData?.lastPrice).toString()}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400  text-[10px] min-w-max">
            24h Volume (USDT)
          </div>
          <div className=" text-[12px]">
            {formatToKMB(parseFloat(tikerData?.quoteVolume).toString())}
          </div>
        </div>
      </div>
    </div>
  );
};
