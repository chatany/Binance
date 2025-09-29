import { useEffect, useRef, useState } from "react";
import { getFaverateData, SearchData } from "./apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/webSocket";
import { useNavigate } from "react-router-dom";
import { CiRepeat } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { apiRequest } from "../Helper";
import { formatToKMB } from "../Constant";
import { IoCloseSharp } from "react-icons/io5";
import { showError, showSuccess } from "../Toastify/toastServices";
import { useAuth } from "../hooks/useAuth";
import { Loder } from "../common/Loder";
export const MarketPopup = ({ handleClose, openMarketPopup }) => {
  const faverateData = useSelector((state) => state.counter.faverateData);
  const searchData = useSelector((state) => state.counter.searchData);
  const dark = useSelector((state) => state.counter.dark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAuth();
  const [isVolume, setIsVolume] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const filteredData =
    Array.isArray(searchData) &&
    searchData?.filter(
      (item) =>
        item.pair_symbol?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.coin_name?.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
  const handleChange = async (pairId, fav) => {
    if (!token) {
      showError("You are not authorized");
      return;
    }
    setIsDisable(true);
    const faverae = !fav;
    const favData = {
      pair_id: String(pairId),
      type: faverae ? String(faverae) : "false",
    };
    setIsLoading(true);
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
      setIsDisable(false);
      getFaverateData(dispatch);
      setIsLoading(false);
    }
  };
  const handleToggle = () => {
    setIsVolume(!isVolume);
  };
  const handlePairClick = (item) => {
    dispatch(setSearchQuery(item));
    const symbols = item;
    if (symbols) {
      navigate(`/spot/${item}`);
      handleClose();
    }
  };

  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (openMarketPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [openMarketPopup]);
  return (
    <div className="w-full h-screen  fixed inset-0  z-40 bg-[#00000080] overflow-hidden">
      <div
        className={`${
          dark ? "bg-[#181A20] text-white " : "bg-white text-black "
        } w-full h-[70%] absolute slide-inTop bottom-0 z-50  rounded-[8px_8px_0px_0px] p-2 `}
        ref={popupRef}
      >
        <div className="justify-between flex p-3">
          <div>Market</div>
          <IoCloseSharp className="h-6 w-6" onClick={handleClose} />
        </div>
        <div className="w-full flex justify-center p-2">
          <input
            className={`
                    w-[100%] capitalize rounded-lg
                    h-[1.5rem] p-4 text-[1rem] text-gray-400
                    border
                    hover:border-[#2EDBAD]
                     border-[${dark ? `#474D57` : `#D8DCE1`}]
                    focus:border-[${dark ? `#b89c4f` : `#fce788`}] 
                    focus:outline-none 
                     transition-colors duration-300 delay-200
                    `}
            placeholder="search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
        <div
          className={`flex text-[14px]  flex-col justify-center font-semibold items-center p-2 pr-3 pl-3  border-b-1 ${
            dark ? "border-[#2B3139]" : "border-[#EAECEF]"
          }`}
        >
          USDT{" "}
          <div className="border-b-4 border-[#2EDBAD] w-[35px] rounded-full"></div>
          {/* <ScrollableTabsBar dark={dark} /> */}
        </div>
        <div className="h-[80%] overflow-x-auto overflow-y-auto p-2">
          {filteredData?.length > 0 ? (
            <div>
              <table className="w-full">
                <thead
                  className={`${
                    dark ? "text-[#EAECEF]" : "text-black"
                  } text-[14px]`}
                >
                  <tr>
                    <th className="text-left  p-[4px] font-medium capitalize">
                      pair
                    </th>
                    <th className="capitalize text-end font-light  p-[4px]">
                      lastPrice/vol
                    </th>
                    <th className="flex justify-center  p-[4px] capitalize cursor-pointer">
                      <CiRepeat
                        className={`text-right ${
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
                      (val) => val?.pair_id == item?.pair_id
                    );
                    return (
                      <tr
                        key={item?.pair_id}
                        onClick={() => {
                          handlePairClick(item?.pair_symbol);
                        }}
                        className="cursor-pointer"
                      >
                        <td className="text-[12px]  p-[4px] w-1/3 ">
                          <div className="flex gap-2 items-center">
                            <FaStar
                              className={`h-[14px] w-[14px] ${
                                fav ? "text-[#2EDBAD]" : ""
                              } `}
                              onClick={(e) => {
                                e.stopPropagation();
                                !isDisable && handleChange(item?.pair_id, fav);
                              }}
                            />{" "}
                            {`${item?.pair_symbol}`}
                          </div>
                        </td>
                        <td className="text-[12px]  p-[4px] text-end w-1/3">
                          {item?.current_price}
                        </td>
                        <td
                          className={`  ${
                            item?.change_in_price > 0
                              ? `${!isVolume && "text-[#2EBD85]"}`
                              : `${!isVolume && "text-[#F6465D]"}`
                          }  text-[12px]  p-[4px] min-w-max text-center w-1/3`}
                        >
                          {!isVolume && item?.change_in_price > 0 ? "+" : "   "}
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
      </div>
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
