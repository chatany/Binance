import { useState } from "react";
import { menu } from "../Constant";
import { FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export const Menu = () => {
  const [openMenus, setOpenMenus] = useState(
    Object.fromEntries(menu.map((m) => [m.name, false]))
  );
  const navigate = useNavigate();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const location = useLocation();

  const dark = JSON.parse(localStorage.getItem("theme"));
  const [activeTab, setActiveTab] = useState(menu[0]?.name);
  const handleClose = (path, name) => {
    if (name === "Assets" || name === "Orders") return;

    navigate(path);
  };
  return (
    <div
      className={` ${
        dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"
      }
       min-h-screen w-full`}
    >
      <div className="pt-10">
        {menu.map((item, index) => {
          const isActive =
            item?.name != "Assets" && item?.name != "Orders"
              ? location.pathname === item.path
              : false;
          return (
            <>
              <div
                onClick={() => {
                  item?.item && toggleMenu(item?.name);
                  setActiveTab(item?.name);
                  handleClose(item?.path, item?.name);
                }}
                key={index}
                className={`flex flex-col ${
                  dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                } p-[10px_20px_10px_20px] ${
                  isActive ? (dark ? "bg-[#2B3139]" : "bg-[#EAECEF]") : ""
                }  cursor-pointer rounded-xl gap-2 `}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div> {item.icon}</div>
                    <div>{item?.name}</div>
                  </div>
                  <div>
                    {item?.item && (
                      <FaChevronDown
                        className={`transition-transform h-3 w-3 ${
                          openMenus[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
              {openMenus[item.name] && activeTab === item.name && (
                <div
                  className={` p-[10px_10px_10px_40px] ${
                    location.pathname === item.path ? (dark ? "bg-[#2B3139]" : "bg-[#EAECEF]") : ""
                  } cursor-pointer rounded-xl ${
                    dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                  }`}
                  onClick={() => handleClose(item?.path)}
                >
                  {item?.item}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
