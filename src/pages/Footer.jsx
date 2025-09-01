import { useSelector } from "react-redux";
import { footerItems, socialIcons } from "../Constant";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { FaMinus, FaPlus, FaReddit } from "react-icons/fa";
import { useState } from "react";

export const Footer = () => {
  const dark = useSelector((state) => state.counter.dark);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));
  };
  return (
    <div
      className={`
        ${dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#202630]"}
       h-full flex flex-col gap-0 w-full items-center `}
    >
      <div className=" xl:w-[1200px] w-full">
        <div className="  gap-[24px] w-full lg:flex hidden">
          <div className="w-[20%]">
            <div>Community</div>
            <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
              {socialIcons.map((ele, ind) => (
                <div key={ind}>{ele}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-[24px] w-[80%] mb-[24px]">
            {footerItems.map((item, index) => (
              <div key={index} className="w-[25%]">
                <div className="text-[16px] leading-[24px] font-semibold pb-2">
                  {item?.title}
                </div>
                <div>
                  {item?.category.map((ele, ind) => (
                    <div
                      key={ind}
                      className="text-[14px] font-normal leading-[20px] p-[4px_0px_4px_0px]"
                    >
                      {ele}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden block">
          <div>
            {footerItems?.map((item, index) => {
              const panelId = `panel${index + 1}`;
              const isOpen = expanded[panelId] || false;
              return (
                <Accordion
                  key={index}
                  expanded={isOpen}
                  onChange={handleChange(panelId)}
                  className={`!p-0 !shadow-none !border-none !bg-transparent `}
                >
                  <AccordionSummary
                    expandIcon={
                      isOpen ? (
                        <FaMinus
                          className={`${
                            dark ? "text-[#EAECEF]" : "text-[#202630]"
                          } size-3`}
                        />
                      ) : (
                        <FaPlus
                          className={`${
                            dark ? "text-[#EAECEF]" : "text-[#202630]"
                          } size-3`}
                        />
                      )
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                     className="!m-0 !px-0 !py-0 flex items-center  !border-none justify-between"
                  >
                    <Typography
                      component="span"
                      className={`${
                        dark ? "text-[#EAECEF]" : "text-[#202630]"
                      } text-[16px] leading-[32px] pl-0 font-medium`}
                    >
                      {item?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item?.category?.map((ele, ind) => (
                      <div
                        key={ind}
                        className={`${
                        dark ? "text-[#EAECEF]" : "text-[#202630]"
                      } text-[14px] font-normal leading-[22px] p-1.5`}
                      >
                        {ele}
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
          <div className="pt-10 pb-10">
            <div className="text-[16px] leading-[24px] font-semibold pb-7">
              Community
            </div>
            <div className="flex flex-wrap gap-6">
              {socialIcons.map((ele, ind) => (
                <div key={ind}>{ele}</div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-t-1 flex justify-center gap-3 items-center p-2`}
        >
          <div>BitZup© 2025</div>
          <div>Cookie Preferences</div>
        </div>
      </div>
    </div>
  );
};
