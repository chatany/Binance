// SupportMenu.jsx
import { useState } from "react";
import { FaComments, FaQuestionCircle, FaMoneyBill, FaBalanceScale, FaGlobe } from "react-icons/fa";

const supportOptions = [
  {
    icon: <FaComments className="text-yellow-500" />,
    title: "Submit Live Chat",
    desc: "Chat with Customer Support",
  },
  {
    icon: <FaQuestionCircle className="text-yellow-500" />,
    title: "Support Centre",
    desc: "Access Support FAQ articles",
  },
  {
    icon: <FaMoneyBill className="text-yellow-500" />,
    title: "Trading Fees",
    desc: "View the trading fees",
  },
  {
    icon: <FaBalanceScale className="text-yellow-500" />,
    title: "Trading Rule",
    desc: "View the trading rules and limits",
  },
  {
    icon: <FaGlobe className="text-yellow-500" />,
    title: "Travel Rule",
    desc: "Enhance transparency and combat financial crimes",
  },
];

export default function SupportMenu() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button className="px-4 py-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600" name="support">
        Support
      </button>

      {isHovering && (
        <div className="absolute top-full mt-2 w-64 bg-white text-black shadow-xl rounded-lg z-50">
          {supportOptions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="text-xl">{item.icon}</div>
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
