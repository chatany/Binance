import { PiHeadsetFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { showError } from "../../../Toastify/toastServices";
import { apiRequest } from "../../../Helper";
// import { Loder } from "../../../Common/Loder";
export const Identification = () => {
  const dark = useSelector((state) => state.counter.dark);
  const userProfile = useSelector((state) => state.counter.userProfile);
  const [loading, setLoading] = useState(false);
  const startKyc = async () => {
    setLoading(true);
    try {
      const { data, status } = await apiRequest({
        method: "get",
        url: `https://test.bitzup.com/onboarding/user/get-hyperverge-credentials?platform=web`,
      });
      if (status === 200 && data?.status === "1") {
        window.open(data?.kycUrl);
      }
    } catch (err) {
      console.error("Error starting KYC:", err);
      showError("Failed to start KYC");
    }
    setLoading(false);
  };
  return (
    <div
      className={`w-full ${
        dark
          ? "bg-[#181A20] flex justify-center flex-col  text-[#EAECEF]"
          : "bg-[#FFFFFF] text-[#000000] mt-5"
      }`}
    >
      <div className="md:ml-[100px] flex flex-col gap-10">
        <div className="flex gap-8">
          <div>
            <img
              src="./Avatar.png"
              className="h-[64px] w-[64px] rounded-[4px]"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-[16px]">{userProfile?.name}</div>
            <div className="flex justify-between text-[14px] gap-4 items-center">
              <div>ID: {userProfile?.uid}</div>
              <div className={`${dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"} p-[6px] rounded-[8px]`}>
               {userProfile?.kyc_level === 0?" Unverified":"Verified"}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex gap-[16px] flex-col w-[600px] max-lg:w-full rounded-[16px] p-5 ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1`}
        >
          <div>Complete Identity Verification</div>
          <button
            onClick={userProfile?.kyc_level === 0 && startKyc}
            disabled={loading}
            className={`text-[16px] ${
              userProfile?.kyc_level === 1 ? "bg-[#2EDBAD] cursor-not-allowed" : "bg-yellow-200 cursor-pointer"
            }   min-w-[20px] p-1 font-medium rounded-[10px] text-[#202630]`}
          >
            {userProfile?.kyc_level === 1 ? "Kyc Completed" : "Get Verified"}
          </button>
          <div className="flex gap-3">
            <Link to={"https://bitzup.freshdesk.com/support/home"} target="_blank">
            <div className="flex gap-1.5 items-center" >
              <PiHeadsetFill />
              <div>Need help?</div>
            </div>
            </Link>
            {/* <div className="flex gap-1.5 items-center">
              <AiOutlinePullRequest />
              <div>Identity Verification FAQ</div>
            </div> */}
          </div>
        </div>
      </div>
      {loading && <Loder className="bg-[#00000080]" />}
    </div>
  );
};
