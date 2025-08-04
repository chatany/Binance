import React, { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { getFaverateData, SearchData } from "./apiCall";
import { CiRepeat } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIconUrl,
  setIsFav,
  setPairId,
  setRoundingVal,
} from "../store/webSocket";
import { ScaleLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import { apiRequest } from "../Helper";
import { formatDecimal } from "../Constant";
export const MarketCom = ({ dark, SetSearchQuery, searchQuery }) => {
  const [activeTab, setActiveTab] = useState("Market Trade");
  const [isVolume, setIsVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    SearchData({ setIsLoading, dispatch });
  }, []);

  const {
    tikerData,
    rounding,
    tradeData,
    faverateData,
    priceDecimal,
    searchData,
  } = useSelector((state) => state.counter);
  useEffect(() => {
    // Step 1: Start with full searchData
    let data = [...searchData];

    // Step 2: Apply search filter first
    if (searchInput) {
      data = data.filter((item) =>
        item.pair_symbol?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Step 3: If favorite mode is on, filter from search-filtered data
    if (favorite && Array.isArray(faverateData)) {
      data = data.filter((item) =>
        faverateData.some((fav) => fav.pair_id === item.pair_id)
      );
    }

    // Step 4: Set final filtered result
    setFilteredData(data);
  }, [searchData, searchInput, favorite, faverateData]);

  const handleToggle = () => {
    setIsVolume(!isVolume);
  };
  const handleChange = async (pairId, fav) => {
    const faverae = !fav;
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
    } catch (err) {
      console.error("Failed to fetch second API", err);
    } finally {
      getFaverateData(dispatch);
    }
  };
  const formatToKMB = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + "K";
    } else {
      return (num / 1).toFixed(3);
    }
  };
  const navigate = useNavigate();
  const handleRounding = (e) => {
    const val = e.target.checked;
    dispatch(setRoundingVal(val));
  };
  const handlePairClick = (item) => {
    SetSearchQuery(item);
    const symbols = item;
    if (symbols) {
      navigate(`/spot/${symbols}`);
    }
  };
  useEffect(() => {
    const icon = searchData.find((item) =>
      item.pair_symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const isFav = faverateData?.some((item) => item?.pair_id === icon?.pair_id);

    dispatch(setIconUrl(icon?.coin_icon));
    dispatch(setPairId(icon?.pair_id));
    dispatch(setIsFav(isFav));
  }, [searchQuery, isLoading, faverateData]);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
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
    getFaverateData(dispatch);
  }, []);
  return (
    <div className="flex flex-col items-center w-full  gap-1 ">
      <div
        className={`${
          dark ? "bg-[#181A20] text-white " : "bg-white text-black "
        } w-full   rounded-lg `}
      >
        <div className="pt-5 pr-3 pl-3 pb-0">
          <input
            className={`
    w-full capitalize rounded-lg
    h-[1.5rem] p-4 text-[1rem] text-gray-400
    border
    hover:border-[#b89c4f]
     border-[${dark ? `#474D57` : `#D8DCE1`}]
    focus:border-[${dark ? `#b89c4f` : `#fce788`}] 
    focus:outline-none 
     transition-colors duration-300 delay-200
    `}
            placeholder="search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex gap-[30%] items-center">
          <div className="pl-4">
            <FaStar
              className={`h-[14px] w-[14px] cursor-pointer ${
                favorite ? "text-yellow-400" : " text-[#707A8A]"
              } `}
              onClick={(e) => {
                e.stopPropagation();
                setFavorite(!favorite);
              }}
            />{" "}
          </div>
          <div
            className={`flex text-[12px]  flex-col justify-center font-semibold items-center p-1 pr-3 pl-3  border-b-1 ${
              dark ? "border-[#2B3139]" : "border-[#EAECEF]"
            }`}
          >
            USDT{" "}
            <div className="border-b-4 border-amber-400 w-[35px] rounded-full"></div>
            {/* <ScrollableTabsBar dark={dark} /> */}
          </div>
        </div>
        {!isLoading ? (
          <div className="h-[19rem] overflow-x-auto overflow-y-auto p-[0px_8px_8px_12px]">
            {filteredData?.length > 0 ? (
              <div>
                <table className="w-full">
                  <thead
                    className={`${
                      dark ? "text-[#EAECEF]" : "text-black"
                    } text-[12px]`}
                  >
                    <tr>
                      <th
                        className={`text-left ${
                          dark
                            ? "bg-[#181A20] text-[#848E9C]"
                            : "bg-white text-[#707A8A]"
                        }  p-1 font-light capitalize sticky top-0 z-30`}
                      >
                        pair
                      </th>
                      <th
                        className={`capitalize ${
                          dark
                            ? "bg-[#181A20] text-[#848E9C]"
                            : "bg-white text-[rgb(112,122,138)]"
                        } text-left font-light sticky min-w-max    top-0 z-30`}
                        colSpan={2}
                      >
                        last Price/{isVolume ? "vol" : "24h chg"}
                      </th>
                      <th
                        className={`sticky top-0 text-right z-30 capitalize ${
                          dark
                            ? "bg-[#181A20] text-[#848E9C]"
                            : "bg-white text-[#707A8A]"
                        }  p-1 cursor-pointer`}
                      >
                        <CiRepeat
                          className={`text-right absolute right-10 top-1  ${
                            dark ? "text-[#EAECEF]" : "text-black "
                          }`}
                          onClick={handleToggle}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((item) => {
                      const fav = faverateData?.some(
                        (val) => val?.pair_id === item?.pair_id
                      );
                      return (
                        <tr
                          key={item?.pair_id}
                          onClick={() => {
                            handlePairClick(item?.pair_symbol);
                          }}
                          className="cursor-pointer"
                        >
                          <td className="xl:text-[12px] text-[.6rem]  w-1/3 ">
                            <div className="flex gap-2 items-center">
                              <FaStar
                                className={`h-[14px] w-[14px] ${
                                  fav ? "text-yellow-400" : " text-[#707A8A]"
                                } `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChange(item?.pair_id, fav);
                                }}
                              />{" "}
                              {`${item?.pair_symbol}`}
                            </div>
                          </td>
                          <td className="xl:text-[12px] text-[.6rem]  p-[2px] text-right w-1/3">
                            {item?.current_price}
                          </td>
                          <td
                            className={`  ${
                              item?.change_in_price > 0
                                ? `${!isVolume && "text-[#2EBD85]"}`
                                : `${!isVolume && "text-[#F6465D]"}`
                            } xl:text-[12px] text-[.6rem]  p-[2px] min-w-max text-right w-1/3`}
                          >
                            {!isVolume && item?.change_in_price > 0
                              ? "+"
                              : "   "}
                            {!isVolume
                              ? item?.change_in_price
                              : formatToKMB(item?.volume)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                No Data Found
              </div>
            )}
          </div>
        ) : (
          <div className="h-[19rem] w-full flex justify-center items-center">
            <ScaleLoader color="#FCD535" />
          </div>
        )}
      </div>
      <div
        className={`${
          dark ? "bg-[#181A20] text-white " : "bg-white text-black "
        } overflow-x-auto overflow-y-auto w-full rounded-lg    space-y-4 `}
      >
        <div
          className={`w-full  flex  gap-2 ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          } justify-between border-b-1 p-[10px_30px_10px_10px]`}
        >
          <div
            className="flex flex-col items-center text-[14px] cursor-pointer gap-[2px]"
            onClick={() => setActiveTab("Market Trade")}
          >
            Markets Trade{" "}
            {activeTab === "Market Trade" && (
              <div className="border-[0.1rem] border-amber-400 w-[40%] h-[2px] "></div>
            )}
          </div>
          <div
            className="flex flex-col items-center text-[14px] cursor-pointer gap-[2px]"
            onClick={() => setActiveTab("My Trade")}
          >
            My Trade
            {activeTab === "My Trade" && (
              <div className="border-[0.1rem] border-amber-400 w-[50%] h-[2px] "></div>
            )}
          </div>
          <div className="relative">
            <HiDotsHorizontal
              onClick={() => setShowPopup(!showPopup)}
              className="h-[16px] w-[16px] cursor-pointer text-[#848E9C]"
            />
            {showPopup && (
              <div
                className={`absolute top-6  ${
                  dark
                    ? "bg-[#1E2329] border-gray-700 text-white "
                    : "bg-white  text-black border-gray-200 "
                } z-50 h-fit w-30 rounded-[12px] right-2 p-4`}
                ref={popupRef}
                style={{ boxShadow: "0px 0px 40px 0px rgb(0,0,0,0.40)" }}
                onMouseLeave={() => setShowPopup(!showPopup)}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-[11px] font-extralight min-w-max">
                    Trade Display
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>
                      <input
                        type="checkbox"
                        checked={rounding}
                        name="rounding"
                        onChange={handleRounding}
                      />
                    </div>
                    <div className="text-[12px]">Rounding</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {activeTab === "Market Trade" && (
          <div className="no-scrollbar h-[20rem] overflow-x-auto overflow-y-auto p-[0px_8px_8px_8px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 p-1 sticky top-0 z-30 text-left`}
                  >
                    Price (USDT)
                  </th>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400  sticky top-0 min-w-max text-center  z-30`}
                  >
                    Amount ({tikerData?.symbol?.split("USDT")[0]})
                  </th>
                  <th
                    className={`${
                      dark ? "bg-[#181A20]" : "bg-white"
                    } text-[12px] text-gray-400 p-2 sticky top-0 text-center  z-30`}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tradeData) && tradeData?.length > 0 ? (
                  <>
                    {Array.isArray(tradeData) &&
                      tradeData?.map((item, inde) => {
                        const formatTime = (ms) => {
                          const date = new Date(ms);
                          return (
                            `${date.getHours().toString().padStart(2, "0")}:` +
                            `${date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}:` +
                            `${date.getSeconds().toString().padStart(2, "0")}`
                          );
                        };
                        const time = formatTime(item?.T);
                        const price = formatDecimal(item?.p, priceDecimal);
                        const amount = parseFloat(item?.q).toString();
                        const formatToKMB = (num) => {
                          if (num >= 1_000_000_000) {
                            return (num / 1_000_000_000).toFixed(2) + "B";
                          } else if (num >= 1_000_000) {
                            return (num / 1_000_000).toFixed(2) + "M";
                          } else if (num >= 1_000) {
                            return (num / 1_000).toFixed(2) + "K";
                          } else {
                            return (num / 1).toFixed(3);
                          }
                        };
                        const amounts = formatToKMB(amount);
                        return (
                          <tr key={inde}>
                            <td
                              className={`lg:text-[12px] ${
                                !item?.m ? "text-[#2EBD85]" : "text-[#F6465D]"
                              } text-[.6rem]  pl-[8px] text-left w-1/3 `}
                            >
                              {price}
                            </td>
                            <td className="lg:text-[12px] text-[.6rem] p-[2px]  text-center w-1/3">
                              {amounts}
                            </td>
                            <td className="lg:text-[12px] text-[.6rem] text-center p-[2px] w-1/3">
                              {time}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="h-[16rem] w-full flex justify-center items-center">
                        <ScaleLoader color="#FCD535" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "My Trade" && (
          <div className="no-scrollbar h-[20rem] overflow-x-auto overflow-y-auto">
            <div className="h-full w-full flex justify-center items-center">
              No Data Found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
