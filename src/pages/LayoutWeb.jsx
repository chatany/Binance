import { useSelector } from "react-redux";
import { TopNav } from "./TopNavBar";
import { Menu } from "./menu";

export const LayoutWeb = ({ component }) => {
    const dark=useSelector((state)=>state.counter.dark)
  return (
    <div  className={`
        ${dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"}
       h-full flex flex-col gap-0  `}>
      <header>
        <TopNav />
      </header>

      <div className="flex ">
        <aside className="w-64">
          <Menu />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {component}
        </main>
      </div>
    </div>
  );
};
