import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { Menu } from "./menu";
import { Footer } from "./Footer";
import MobileSidebar from "./sidebar";

export const LayoutWeb = ({ component }) => {
  const { dark, activeItem,show } = useSelector((state) => state.counter);
  return (
    <div
      className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full flex flex-col gap-0  `}
    >
      {show && (
        <div className="App">
          <MobileSidebar />
        </div>
      )}
      <header>
        <TopNav />
      </header>

      <div className="flex max-md:flex-col">
        <aside className="md:w-64 w-full">
          <Menu />
        </aside>
        {!activeItem && (
          <main className="flex-1 p-6 overflow-y-auto">{component}</main>
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
