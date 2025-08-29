import { useEffect, useState } from "react";
import { menu } from "../Constant";
import { FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { setActiveItem } from "../store/webSocket";
import { useDispatch, useSelector } from "react-redux";

export const Menu = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.counter.activeItem);
  const getInitialState = () => {
    const stored = localStorage.getItem("openMenus");
    if (stored) return JSON.parse(stored);

    return Object.fromEntries(menu.map((m) => [m.name, false]));
  };

  const [openMenus, setOpenMenus] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);
  const navigate = useNavigate();
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const location = useLocation();
  const dark = JSON.parse(localStorage.getItem("theme"));
  const handleClose = (path) => {
    navigate(path);
  };
  const getActiveName = () => {
    // parent match
    const parent = menu.find((item) => item.path === location.pathname);
    if (parent) return parent.name;

    // subitem match
    for (const item of menu) {
      if (item.category) {
        const sub = item.category.find(
          (subItem) => subItem.path === location.pathname
        );
        if (sub) return sub.name; // sub ka name return karega
      }
    }

    return null; // agar kuch match na ho
  };

  const activeName = getActiveName();
  return (
    <div
      className={` ${
        dark ? "bg-[#0B0E11] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#262030]"
      }
       ${active ? "max-md:min-h-screen" : ""} w-full`}
    >
      <div className="pt-10 md:block hidden">
        {menu.map((item, index) => {
          /* item?.name != "Assets" && item?.name != "Orders"
              ? location.pathname === item.path
              : false; */

          const isActive = () => {
            if (item?.path === location?.pathname) {
              return true;
            } else {
              return false;
            }
          };
          return (
            <>
              <div
                onClick={() => {
                  item?.category && toggleMenu(item?.name);
                  handleClose(item?.path);
                }}
                key={index}
                className={`flex flex-col ${
                  dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                } p-[10px_20px_10px_20px] ${
                  isActive() ? (dark ? "bg-[#2B3139]" : "bg-[#EAECEF]") : ""
                }  cursor-pointer rounded-xl gap-2 `}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div> {item.icon}</div>
                    <div>{item?.name}</div>
                  </div>
                  <div>
                    {item?.category && (
                      <FaChevronDown
                        className={`transition-transform h-3 w-3 ${
                          openMenus[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
              {openMenus[item.name] && (
                <div>
                  {item?.category
                    ? item?.category?.map((val, index) => (
                        <div
                          key={index}
                          className={` p-[10px_10px_10px_40px] ${
                            location.pathname === val.path
                              ? dark
                                ? "bg-[#2B3139]"
                                : "bg-[#EAECEF]"
                              : ""
                          } cursor-pointer rounded-xl ${
                            dark ? "hover:bg-[#2B3139]" : "hover:bg-[#EAECEF]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose(val?.path);
                          }}
                        >
                          {val.name}
                        </div>
                      ))
                    : ""}
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="pt-[0px_40px_40px_40px] md:hidden block w-full">
        <div
          className={`flex justify-between  ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-b-1 w-full p-[0px_30px_10px_30px]`}
          onClick={() => dispatch(setActiveItem(!active))}
        >
          <div className="text-[16px] font-medium leading-[24px]">
            {activeName}
          </div>
          <div className="flex justify-end">
            {" "}
            <FaChevronDown
              className={`transition-transform h-6 w-6 ${
                active ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {menu.map((item, index) => {
          /* item?.name != "Assets" && item?.name != "Orders"
              ? location.pathname === item.path
              : false; */

          return (
            <>
              {active && (
                <>
                  <div
                    onClick={() => {
                      item?.category && toggleMenu(item?.name);
                      handleClose(item?.path);
                    }}
                    key={index}
                    className={`flex flex-col p-[10px_20px_10px_20px]  cursor-pointer rounded-xl gap-2 w-full`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div> {item.icon}</div>
                        <div>{item?.name}</div>
                      </div>
                      <div>
                        {item?.category && (
                          <FaChevronDown
                            className={`transition-transform h-3 w-3 ${
                              openMenus[item.name] ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <>
                    {openMenus[item.name] && (
                      <div>
                        {item?.category
                          ? item?.category?.map((val, index) => (
                              <div
                                key={index}
                                className={` p-[10px_10px_10px_40px]  cursor-pointer rounded-xl `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClose(val?.path);
                                }}
                              >
                                {val.name}
                              </div>
                            ))
                          : ""}
                      </div>
                    )}
                  </>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
