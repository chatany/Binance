import { useDispatch, useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { Menu } from "./menu";
import { Footer } from "./Footer";
import { getActivity, getAuth, getAuthenticationKey, getUserProfile } from "./apiCall";
import { useEffect } from "react";

export const LayoutWeb = ({ component }) => {
  const { dark, activeItem } = useSelector((state) => state.counter);
   const dispatch = useDispatch();

  useEffect(() => {
    getAuthenticationKey(dispatch);
    getAuth(dispatch);
    getActivity(dispatch);
    getUserProfile(dispatch);
  }, []);
  return (
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full flex flex-col gap-0  `}
    >
      <header className="fixed inset-0 z-50 h-fit">
        <TopNav />
      </header>

      <div className="flex max-md:flex-col mt-12">
        <aside className="md:w-64 w-full">
          <Menu />
        </aside>
        {!activeItem && (
          <main className="flex-1 md:p-6 p-2 overflow-y-auto ">{component}</main>
        )}
      </div>
      {!activeItem && (
        <footer className="mt-[100px] p-10">
          <Footer />
        </footer>
      )}
    </div>
  );
};
