import { CgArrowsExchangeV, CgEye } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import {
  FaBalanceScale,
  FaComments,
  FaGlobe,
  FaMoneyBill,
  FaQuestionCircle,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiAccountCircle2Line } from "react-icons/ri";


export const marks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];
export const tabs = ["Open Orders", "Order History", "Funds"];
export const tab = ["Spot", "Cross", "Isolated", "Grid"];
export const marketTabs = ["Limit", "Market", "Stop Limit"];
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is 0-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};
export const supportOptions = [
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
export const formatToKMB = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K";
  } else {
    return (num / 1).toFixed(3);
  }
};
export const formatToKMBWithCommas = (num) => {
  const n = Number(num);
  if (isNaN(n)) return "";

  // For large numbers use Intl formatting with commas
  if (n >= 1000) {
    return new Intl.NumberFormat("en-IN").format(n);
  }

  // For small numbers → don’t use Intl, just format decimals
  return formatDecimal(n, 8);
};
export const MenuItem = [
  { icon: <CgEye />, name: "Dashboard" },
  { icon: <CgEye />, name: "Assets" },
  { icon: <CgEye />, name: "Orders" },
  { icon: <CgEye />, name: "Account" },
  { icon: <CgEye />, name: "Referral" },
  { icon: <CgEye />, name: "Rewards Hub" },
  { icon: <RiAccountCircle2Line />, name: "Sub Accounts" },
  { icon: <IoSettings />, name: "Settings" },
  { icon: <CgArrowsExchangeV />, name: "Switch Account" },
  { icon: <CiLogout />, name: "Log Out" }

];
export const formatDecimal = (value, decimalPlaces) => {
  const num = Number(value);
  if (isNaN(num)) return "";

  // Convert to string with full precision
  let str = num.toString();

  // If in scientific notation (e.g., 1.234e-5), convert to fixed-point
  if (str.includes("e") || str.includes("E")) {
    str = num.toFixed(decimalPlaces + 2); // extra buffer
  }

  // Ensure decimal part exists
  if (!str.includes(".")) str += ".";

  let [intPart, decPart = ""] = str.split(".");

  // Trim/pad decimal part without rounding
  decPart = (decPart + "0".repeat(decimalPlaces)).slice(0, decimalPlaces);

  return `${intPart}.${decPart}`;
};

export const RenderLabel = ({ childern, dark }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${childern}% - 14px)`, // center align
        top: -25,
        background: dark ? "#333" : "#fff",
        color: dark ? "#fff" : "#000",
        padding: "2px 6px",
        fontSize: "12px",
        fontWeight: "bold",
        borderRadius: "4px",
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        transition: "left 0.2s",
      }}
    >
      {childern}%
    </div>
  );
};
export const data = [
  {
    category: "Trade",
    item: [
      {
        section: 1,
        array: [
          {
            title: "Spot",
            description: "Buy and sell on the Spot market with advanced tools",
          },
        ],
      },
    ],
  },
  {
    category: "Futures",
    item: [
      {
        title: "USDⓈ-M Futures",
        description: "Contracts settled in USDT and USDC",
      },
      {
        title: "COIN-M Futures",
        description: "Contracts settled in cryptocurrency",
      },
    ],
  },
  {
    category: "Earn",
    item: [
      {
        title: "Overview",
        description: "One-stop portal for all Earn products",
      },
      {
        title: "Simple Earn",
        description:
          "Earn passive income on 300+ crypto assets with flexible and locked terms",
      },
    ],
  },
  {
    category: "More",
    item: [
      {
        section: 1,
        array: [
          {
            title: "VIP & Institutional",
            description:
              "Your trusted digital asset platform for VIPs and institutions",
          },
          {
            title: "Affiliate",
            description: "Earn up to 50% commission per trade from referrals",
          },
          {
            title: "Referral Program",
            description:
              "Invite friends to earn either a commission rebate or a one-time reward",
          },
        ],
      },
    ],
  },
];
