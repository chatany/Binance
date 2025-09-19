import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../store/webSocket";
import { HeroSection } from "./heroCard";
import { allMover, TopMoves } from "./apiCall";

export const Dashboard = () => {
  const dark = JSON.parse(localStorage.getItem("theme"));
  const tabs = ["All", "Hot", "Losers", "24h Vol", "Gainers"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allMovers, movers, userProfile } = useSelector(
    (state) => state.counter
  );

  const filteredData = () => {
    return activeTab !== "All" ? movers[activeTab] : allMovers;
  };
  const handlePairClick = (item) => {
    dispatch(setSearchQuery(item));
    const symbols = item;
    if (symbols) {
      navigate(`/spot/${symbols}`);
    }
  };
  useEffect(() => {
    if (allMovers?.length === 0) {
      TopMoves(dispatch);
      allMover(dispatch);
    }
  }, []);
  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <div className="flex justify-between w-full p-5">
        <div className="flex gap-4">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <img src="/Avatar.png" />
          </div>
          <div className="flex flex-col">
            <div>{userProfile?.name}</div>
            <div className="flex gap-4">
              <div>UID</div>
              <div>{userProfile?.uid}</div>
            </div>
            {/* <div className="flex">
              <div className="p-1">
                <CiAlarmOff />
              </div>
              <div className="p-1">
                <CiAirportSign1 />
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="border-l-1 m-3"></div> */}
        {/* <div className="w-[70%] flex justify-evenly flex-wrap">
          <div>
            <div>UID</div>
            <div>{userProfile?.uid}</div>
          </div>
          <div>
            <div>VIP Level</div>
            <div>Regular User</div>
          </div>
           <div>
            <div>Following</div>
            <div>8</div>
          </div>
          <div>
            <div>Followers</div>
            <div>1</div>
          </div> 
        </div> */}
      </div>
      <HeroSection />
      <div
        className={` h-[500px]  ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-1 w-full justify-between p-5 rounded-2xl`}
      >
        <div className="w-full flex justify-between">
          <div>Markets</div>
          <div>More</div>
        </div>
        <div>
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                name="item1"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 rounded-md text-[16px] whitespace-nowrap cursor-pointer
                ${activeTab === tab ? " " : "text-[#707A8A]"}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="flex justify-center w-full">
                    <div className="w-[60%] border-b-4 border-amber-300"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="overflow-y-auto h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="font-light text-[16px]">
                  <th className="text-left p-[20px] text-[14px] font-light">
                    Coin
                  </th>
                  <th className="text-right text-[14px] font-light">
                    Coin Price
                  </th>
                  <th className="text-right text-[14px] font-light">
                    24H Change
                  </th>
                  <th className="text-right text-[14px] font-light">Trade</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData()) && filteredData()?.length > 0 ? (
                  <>
                    {filteredData()?.map((mover, index) => (
                      <tr
                        key={index}
                        className={` cursor-pointer p-[20px] `}
                        onClick={() => {
                          handlePairClick(mover?.pair_symbol);
                        }}
                      >
                        <td className="text-center p-[20px] ">
                          <div className="flex gap-3 items-center w-full ">
                            <div>
                              <img
                                src={mover?.coin_icon}
                                className="h-6 w-6"
                                alt="coin_image"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-xs">
                                {mover?.pair_symbol}
                              </div>
                              {/* <div className="text-xs text-gray-400">
                                    {mover?.volume}
                                  </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <div>
                            <div className="text-xs text-gray-400">
                              ${mover?.current_price}
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <div
                            className={`font-semibold text-[12px] p-1 rounded-md ${
                              mover?.change_in_price > 0
                                ? "text-[#2EBD85]"
                                : "text-[#F6465D]"
                            }
              `}
                          >
                            {mover?.change_in_price > 0 ? "+" : " "}
                            {mover?.change_in_price}%
                          </div>
                        </td>
                        <td
                          className={`text-right ${
                            dark ? "text-[#F0B90B]" : " text-[#D89F00]"
                          } underline`}
                        >
                          Trade
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="h-full w-full flex justify-center items-center">
                        <ScaleLoader color="#FCD535" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
