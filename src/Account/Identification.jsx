import { PiHeadsetFill } from "react-icons/pi";
import { AiOutlinePullRequest } from "react-icons/ai";
import { useSelector } from "react-redux";
export const Identification = () => {
  const {dark,userProfile} = useSelector((state) => state.counter);
  return (
    <div
      className={`w-full ${
        dark ? "bg-[#181A20] flex justify-center flex-col  text-[#EAECEF]" : "bg-[#FFFFFF] text-[#000000]"
      }`}
    >
    <div className="md:ml-[100px] flex flex-col gap-10">

      <div className="flex gap-8">
        <div>
          <img src="./Avatar.png" className="h-[64px] w-[64px] rounded-[4px]" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-[16px]">{userProfile?.name}</div>
          <div className="flex justify-between text-[14px] gap-4 items-center">
            <div>ID: {userProfile?.uid}</div>
            <div className={`${
                dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
              } p-1`}>Unverified</div>
          </div>
        </div>
      </div>
      <div
        className={`flex gap-[16px] flex-col w-[600px] max-lg:w-full rounded-[16px] p-5 ${
          dark ? "border-[#333B47]" : "border-[#EDEDED]"
        } border-1`}
      >
        <div>Complete Identity Verification</div>
        <button className="text-[16px] bg-[#FCD535]  min-w-[20px] p-1 font-medium rounded-[10px] text-[#202630]">Get Verified</button>
        <div className="flex gap-3">
          <div className="flex gap-1.5 items-center">
            <PiHeadsetFill />
            <div>Need help?</div>
          </div>
          <div className="flex gap-1.5 items-center">
            <AiOutlinePullRequest />
            <div>Identity Verification FAQ</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
