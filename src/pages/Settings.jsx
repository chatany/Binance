import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

export const Setting = () => {
  const dark = useSelector((state) => state.counter.dark);
  return (
    <div>
      <div className="text-[14px]">
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Profile
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Nickname & Avatar</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Set up an avatar and nickname, it is suggested not to use your
                real name or the name of your social account as a nickname.
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div className="flex gap-4 items-center ">
                <div className="h-10 w-10 rounded-full bg-[#4653C8] flex justify-center items-center">
                  s
                </div>
                <div>selma 1234</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">C2C Profile</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Edit your C2C nickname, manage your payment methods and the list
                of users you follow.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#4653C8] flex justify-center items-center">
                  s
                </div>
                <div>selma 1234</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Notifications
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Notification Language</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                This will affect the language settings of E-mail and App push.
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div className="flex gap-4 items-center ">
                <div>Default</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">Notification Preferences</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Once configured, you will receive relevant on-site inbox
                notifications within the app and website.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div>
                  Activities, Trade Notification, Binance News, System Messages
                </div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">Auto Price Alert</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Once configured, you will receive alerts on the price changes of
                major and holding cryptos.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div>Notification On, Sound On</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Withdrawal
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Withdrawal Whitelist</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Once this function is enabled, your account will only be able to
                withdraw to addresses on your whitelist.
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div className="flex gap-4 items-center ">
                <div>Default</div>
              </div>{" "}
              <div className="flex gap-5">
                <button className="flex items-center gap-1">
                  <RxCrossCircled /> OFF
                </button>
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">One-step Withdrawal</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                When this function is turned on, you can withdraw small amount
                crypto to whitelisted addresses without passing 2FA verification
              </div>
            </div>
            <div className="flex gap-5">
              <button className="flex items-center gap-1">
                <RxCrossCircled /> OFF
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
              >
                Enable
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">Withdraw Setting</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Choose to withdraw through on-chain or off-chain transfer for
                applicable addresses.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div>Off-chain withdrawal</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">Trade</div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Order Confirmation Reminders</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                If the order reminder function is enabled, it will need to be
                reconfirmed every time an order is submitted.
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div className="flex gap-4 items-center ">
                <div>
                  Limit Order, Market Order, Stop-Limit Order, Auto Borrow/Repay
                  for Margin
                </div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[16px]">Fee Deduction</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Use BNB to pay fees.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div>Spot fees</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Link Account
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Link X Account</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Link your X Account to Binance.
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div className="flex gap-4 items-center ">
                <div>Not Linked</div>
              </div>
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Link
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Privacy
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Download Personal Data</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                The download includes profile, withdrawal, deposit, and trading
                history data. 
                *For KYC documents, contact the
              </div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px] `}
                >
                  Download
                </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Export Transaction Records</div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px] `}
                >
                  Export
                </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Delete Account</div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="text-[16px]">Privacy Portal</div>
            </div>
            <div className="flex gap-4 items-center w-1/2 justify-end">
              <div>
                {" "}
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] h-[32px] w-[96px] rounded-[8px]`}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
