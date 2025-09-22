import { CgPassword } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { MdOutlineDevices } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { TbBrandAuth0, TbUserCog } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { formatDate } from "../Constant";
export const Security = () => {
  const dark = useSelector((state) => state.counter.dark);
  const auth = useSelector((state) => state.counter.auth);
  const activity = useSelector((state) => state.counter.activity);
  const userProfile = useSelector((state) => state.counter.userProfile);

  const navigate = useNavigate();

  return (
    <div
      className={`${
        dark ? "bg-[#181A20] text-[#EAECEF]" : "bg-[#FFFFFF] text-[#282828]"
      }`}
    >
      <div className="md:p-10 p-2">
        <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] leading-[34px] font-semibold">
            Security Checkup
          </div>
          <div className="flex gap-5 flex-wrap max-md:flex-col w-full">
            <div className="flex gap-3 items-center">
              {!auth ? (
                <RxCrossCircled />
              ) : (
                <IoIosCheckmarkCircleOutline className=" text-green-400 size-[18px]" />
              )}
              <div>Two-Factor Authentication (2FA)</div>
            </div>
            <div className="flex gap-3 items-center">
              <RxCrossCircled />
              <div>Identity Verification</div>
            </div>
            <div className="flex gap-3 items-center">
              {userProfile?.anti_phishing_code ? (
                <IoIosCheckmarkCircleOutline className=" text-green-400 size-[18px]" />
              ) : (
                <RxCrossCircled />
              )}
              <div>Anti-Phishing Code</div>
            </div>
            <div className="flex gap-3 items-center">
              <RxCrossCircled />
              <div>Withdrawal Whitelist</div>
            </div>
          </div>
        </div>
        <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] leading-[34px] font-semibold">
            Two-Factor Authentication (2FA)
          </div>
          {/* <div className="flex justify-between max-md:flex-col items-center">
            <div className="flex gap-5">
              <GoPasskeyFill className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Passkeys (Biometrics)</div>
                <div className="text-[#848E9C] text-[16px]">
                  Protect your account and withdrawals with Passkeys and/or
                  security keys, such as Yubikey.
                </div>
              </div>
            </div>
            <div className="flex gap-5 max-md:w-full justify-between">
              <button className="flex items-center gap-1">
                <RxCrossCircled /> OFF
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Enable
              </button>
            </div>
          </div> */}
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <TbBrandAuth0 className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Authenticator App</div>
                <div className="text-[#848E9C] text-[16px]">
                  Use Binance/Google Authenticator to protect your account and
                  transactions.
                </div>
              </div>
            </div>
            <div className="flex gap-5 max-md:w-full justify-between">
              <button className="flex items-center gap-1">
                {!auth ? (
                  <>
                    <RxCrossCircled /> OFF
                  </>
                ) : (
                  <>
                    <IoIosCheckmarkCircleOutline className=" text-green-400 size-[18px]" />{" "}
                    ON
                  </>
                )}
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px] cursor-pointer`}
                onClick={() =>
                  navigate("/security/manage-google-authenticator")
                }
              >
                Manage
              </button>
            </div>
          </div>
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5">
              <CiMail className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Email</div>
                <div className="text-[#848E9C] text-[16px]">
                  Use your email to protect your account and transactions.
                </div>
              </div>
            </div>
            <div className="flex max-md:w-full justify-between gap-5">
              <button className="flex items-center gap-1">
                {userProfile?.email}
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
                onClick={() => navigate("/security/manage-email-address")}
              >
                Manage
              </button>
            </div>
          </div>
          {/* <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <FaPhoneVolume className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Phone Number</div>
                <div className="text-[#848E9C] text-[16px]">
                  Use your phone number to protect your account and
                  transactions.
                </div>
              </div>
            </div>
            <div className="flex max-md:w-full justify-between gap-5">
              <button className="flex items-center gap-1">
                <RxCrossCircled /> OFF
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Manage
              </button>
            </div>
          </div> */}
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <CgPassword className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Login Password</div>
                <div className="text-[#848E9C] text-[16px]">
                  Login password is used to log in to your account.
                </div>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
                onClick={() => navigate("/security/manage-password")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] leading-[34px] font-semibold">
            Advanced Security
          </div>
          {/* <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5">
              <RiContactsBook2Fill className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Emergency Contact</div>
                <div className="text-[#848E9C] text-[16px]">
                  Add emergency contacts for when your account is inactive
                </div>
              </div>
            </div>
            <div className="flex gap-5 max-md:w-full justify-between">
              <button className="flex items-center gap-1">
                <RxCrossCircled /> OFF
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Manage
              </button>
            </div>
          </div> */}
          {/* <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <LuUsers className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Account Connections</div>
                <div className="text-[#848E9C] text-[16px]">
                  Connect your account with third-party accounts. Anti
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Manage
              </button>
            </div>
          </div> */}
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5">
              <MdOutlineDevices className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Anti-Phishing Code</div>
                <div className="text-[#848E9C] text-[16px]">
                  Protect your account from phishing attempts and ensure that
                  your notification emails are from Binance only.
                </div>
              </div>
            </div>
            <div className="flex gap-5 max-md:w-full justify-between">
              <button className="flex items-center gap-1">
                {!userProfile?.anti_phishing_code ? (
                  <>
                    <RxCrossCircled /> OFF
                  </>
                ) : (
                  <>
                    <IoIosCheckmarkCircleOutline className=" text-green-400 size-[18px]" />{" "}
                    ON
                  </>
                )}
              </button>
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
                onClick={() => navigate("/security/anti-phishing-code")}
              >
                Enable
              </button>
            </div>
          </div>
          {/* <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <PiUserListLight className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>App Authorization</div>
                <div className="text-[#848E9C] text-[16px]">
                  You use your Binance Account to sign in to third party sites
                  and apps.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Manage
              </button>
            </div>
          </div> */}
        </div>
        <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "md:border-[#333B47]" : "md:border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] font-semibold leading-[32px]">
            Withdrawal
          </div>
          <div className="flex justify-between flex-col md:flex-row  gap-2">
            <div className="flex flex-col gap-1 md:w-1/2">
              <div className="text-[16px]">Withdrawal Password</div>
              <div className="text-[#707A8A] text-[14px] font-normal leading-[20px]">
                Once this function is enabled, your account will be able to
                withdraw to addresses.
              </div>
            </div>
            <div className="flex gap-4 items-center md:w-1/2 md:justify-end">
              <div className="flex gap-5 max-md:w-full justify-between">
                <button className="flex items-center gap-1">
                  {!userProfile?.withdrawal_password ? (
                    <>
                      <RxCrossCircled /> OFF
                    </>
                  ) : (
                    <>
                      <IoIosCheckmarkCircleOutline className=" text-green-400 size-[18px]" />{" "}
                      ON
                    </>
                  )}
                </button>
                <button
                  className={`${
                    dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                  } p-[6px_12px_6px_12px] rounded-[8px]`}
                  onClick={() => navigate("/security/manage-withdraw-password")}
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] leading-[34px] font-semibold">
            Devices and Activities
          </div>
          {/* <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5">
              <MdOutlineDevices className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>My Devices</div>
                <div className="text-[#848E9C] text-[16px]">
                  Manage devices that have login status, and view your device
                  history.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Manage
              </button>
            </div>
          </div> */}
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <TbUserCog className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Account Activity</div>
                <div className="text-[#848E9C] text-[16px]">
                  {`Last login: ${formatDate(
                    activity[0]?.timestamp
                  )}  Suspicious account activity?`}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px] cursor-pointer`}
                onClick={() => navigate("/security/account-activity")}
              >
                More
              </button>
            </div>
          </div>
        </div>
        {/* <div
          className={`md:p-[24px] mb-[24px] ${
            dark ? "border-[#333B47]" : "border-[#EDEDED]"
          } md:border-1 flex flex-col rounded-[16px] gap-[20px]`}
        >
          <div className="text-[24px] leading-[34px] font-semibold">
            Account Management
          </div>
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5">
              <LiaUserTimesSolid className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Disable Account</div>
                <div className="text-[#848E9C] text-[16px]">
                  Once the account is disabled, most of your actions will be
                  restricted, such as logging in and trading. You can choose to
                  unblock the account at any time. This action will not delete
                  your account.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Disable
              </button>
            </div>
          </div>
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex gap-5 ">
              <LiaUserTimesSolid className="size-6" />
              <div className="flex flex-col gap-0.5 md:w-[60%] w-fit">
                <div>Delete Account</div>
                <div className="text-[#848E9C] text-[16px]">
                  Please note that account deletion is irreversible. Once
                  deleted, you will not be able to access your account or view
                  your transaction history.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${
                  dark ? "bg-[#2b3139]" : "bg-[#EAECEF]"
                } p-[6px_12px_6px_12px] rounded-[8px]`}
              >
                Delete
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
