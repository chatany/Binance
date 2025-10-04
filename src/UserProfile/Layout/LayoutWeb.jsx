import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getActivity,
  getAllOpenOrders,
  getAuth,
  getAuthenticationKey,
  getFundsData,
  getUserProfile,
} from "../../Spot/Apis/apiCall";
import { TopNav } from "../../Spot/Navbar/TopNavBar";
import { Menu } from "../Menubar/menu";
import { Footer } from "../../Spot/Footer/Footer";
import { Loder } from "../../Common/Loder";

export const LayoutWeb = ({ component }) => {
  const dark = useSelector((state) => state.counter.dark);
  const activeItem = useSelector((state) => state.counter.activeItem);
  const authEnticatorKey = useSelector(
    (state) => state.counter.authEnticatorKey
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(authEnticatorKey).length === 0) {
      getAuthenticationKey(dispatch);
      getAuth(dispatch);
      getActivity(dispatch);
      getUserProfile(dispatch);
      getFundsData(dispatch);
      getAllOpenOrders(dispatch);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div
      className={`
        ${dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full flex flex-col gap-0  `}
    >
      <header className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </header>

      <div className="flex max-md:flex-col mt-20">
        <aside className="md:w-64 w-full">
          <Menu />
        </aside>
        {!activeItem && (
          <main className="flex-1 md:p-6 p-2 overflow-y-auto ">
            {component}
          </main>
        )}
      </div>
      {!activeItem && (
        <footer className="mt-[100px] md:p-10 p-4">
          <Footer />
        </footer>
      )}
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
