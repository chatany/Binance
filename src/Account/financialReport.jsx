import { TbRefresh } from "react-icons/tb";
import { useSelector } from "react-redux";
import { NotFound } from "../icons";

export const Report = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div className="mt-5">
      <div className="flex flex-col items-center h-[300px]">
        <div className="flex justify-between items-center w-full">
          <div>Financial Reports</div>
          <div
            className={`hover:text-gray-400 rounded-sm text-[14px] flex gap-2 items-center font-semibold ${
              dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
            }  leading-6 px-2 py-1 `}
          >
            <TbRefresh /> Refresh
          </div>
        </div>
        <div className="flex flex-col items-center">
          <NotFound className="max-md:size-16 size-20" />
          <div className="text-[14px]">There are no documents generated for you at this time.</div>
        </div>
      </div>
    </div>
  );
};
