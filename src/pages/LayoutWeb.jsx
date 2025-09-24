import { useDispatch, useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { Menu } from "./menu";
import { Footer } from "./Footer";
import {
  getActivity,
  getAuth,
  getAuthenticationKey,
  getFundsData,
  getUserProfile,
} from "./apiCall";
import { useEffect, useState } from "react";
import { Loder } from "../common/Loder";

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
        <footer className="mt-[100px] p-10">
          <Footer />
        </footer>
      )}
      {isLoading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
