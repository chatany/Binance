import { apiRequest } from "../../Helper";
import {
  setActivity,
  setAllMovers,
  setAuth,
  setAuthEnticatorKey,
  setBalance,
  setCountryData,
  setDepositHistory,
  setFaverateData,
  setFundData,
  SetHelpCenterData,
  setLoading,
  setLockedTime,
  setOpenOrderData,
  setOrderHistory,
  setReferralData,
  setSearchData,
  setTopMovers,
  setUserProfile,
  setWithdrawHistory,
} from "../../store/webSocket";
import { showError, showSuccess } from "../../Toastify/toastServices";

export const fetchData = async () => {
  try {
    const response1 = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/currency/get-exchange-url`,
    });
  } catch (err) {
    console.error("Failed to fetch data", err);
  } finally {
  }
};

export const SearchData = async ({ dispatch, setIsLoading }) => {
  setIsLoading(true);
  try {
    const response1 = await apiRequest({
      method: "get",
      url: `https://server-yo1d.onrender.com/binance-exchange`,
    });
    const formattedData = response1?.data.filter(
      (item) => item?.pair_symbol.toLowerCase() !== "coreumusdt"
    );
    dispatch(setSearchData(formattedData));
  } catch (err) {
    console.error("Failed to fetch data", err);
  } finally {
    setIsLoading(false);
  }
};

export const TikerData = async ({ setTikerData, searchQuery }) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://api.binance.com/api/v3/ticker/24hr?symbol=${searchQuery}`,
    });
    setTikerData({
      symbol: data?.symbol,
      lastPrice: data?.lastPrice,
      highPrice: data?.highPrice,
      lowPrice: data?.lowPrice,
      priceChange: data?.priceChange,
      priceChangePercent: data?.priceChangePercent,
      quoteVolume: data?.quoteVolume,
      volume: data?.volume,
    });
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const Orders = async ({ searchQuery, setOrderData }) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://server-yo1d.onrender.com/binance-order?url=${searchQuery}`,
    });
    if (status === 200) {
      setOrderData(data);
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const Trades = async ({ searchQuery, setTradesData }) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://server-yo1d.onrender.com/binance-Trades?url=${searchQuery}`,
    });
    if (status === 200) {
      setTradesData(data);
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const TopMoves = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://server-yo1d.onrender.com/binance-Movers`,
    });
    if (status === 200) {
      dispatch(setTopMovers(data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const allMover = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://server-yo1d.onrender.com/binance-allMovers`,
    });
    if (status === 200) {
      dispatch(setAllMovers(data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const country = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/user/get-all-countries`,
    });
    if (status === 200) {
      dispatch(setCountryData(data.data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const buysellBalance = async (pairId, dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/blockchain/wallet/get-buy-sell-balance`,
      data: { pair_id: pairId },
    });
    if (status === 200 && data.status == 1) {
      dispatch(setBalance(data?.data));
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
      // window.location.href = "/login";
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const openOrders = async (pairId, userId, dispatch) => {
  const userI = userId.trim();
  dispatch(setLoading(true));
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/order/user/get-open-orders?user_id=${userI}&pair_id=${pairId}`,
    });
    if (status === 200 && data?.status == 1) {
      dispatch(setOpenOrderData(data?.data));
    }
    if (status === 400 && data?.status == 3) {
      // window.location.href = "/login";
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const OrderHistory = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/blockchain/wallet/get-all-buy-sell-order`,
      data: {},
    });
    if (status === 400 && data?.status == 3) {
      // window.location.href = "/login";
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
    if (status === 200 && data?.status == 1) {
      dispatch(setOrderHistory(data?.data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const deleteOpenOrder = async (
  orderData,
  dispatch,
  setIsSuccess,
  pair_id,
  user_id
) => {
  try {
    dispatch(setIsSuccess(true));
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/order/user/cancel-order`,
      data: orderData,
    });
    if (status === 200 && data?.status == 1) {
      showSuccess(data?.message);
    } else {
      showError(data?.message);
      if (status === 400 && data?.status == 3) {
        // window.location.href = "/login";
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("userDataChanged"));
      }
      if (status === 400 && data?.status == 0) {
      }
      if (status === 500) {
        showError(data?.msg);
      }
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
    showError(err);
  } finally {
    openOrders(pair_id, user_id, dispatch);
    buysellBalance(pair_id, dispatch);
    OrderHistory(dispatch);
    dispatch(setIsSuccess(false));
  }
};

export const helpCenterApi = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/market/getsupportinfo`,
    });

    if (status === 200) {
      dispatch(SetHelpCenterData(data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    setLoading(false);
  }
};

export const getFaverateData = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/currency/favorites`,
    });

    if (status === 200) {
      dispatch(setFaverateData(data.data));
    }
    if (status === 400 && data?.status == 3) {
      // window.location.href = "/login";
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const getFundsData = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/blockchain/wallet/get-all-currencies-balance`,
      data: {},
    });

    if (status === 200 && data?.status == 1) {
      dispatch(
        setFundData({
          totalBalance: data?.totalBalance,
          totalCoinBalance: data?.totalCoinBalance,
          data: data?.data,
        })
      );
    }
    if (status === 400 && data?.status == 3) {
      // window.location.href = "/login";
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const getReferralData = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/user/getReferralCodeURl`,
    });

    if (status === 200 && data?.status == 1) {
      dispatch(setReferralData(data.data));
    }

    if (data?.status != 1) {
      showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const getAuthenticationKey = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/onboarding/user/generate-2fa-key`,
      data: {},
    });
    if (status === 200 && data?.status == 1) {
      const key = JSON.parse(data?.data);
      dispatch(setAuthEnticatorKey(key));
    }
    if (data?.status != 1) {
      showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const getAuth = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "post",
      url: `https://test.bitzup.com/onboarding/user/get-2fa`,
      data: {},
    });

    if (status === 200 && data?.status == 1) {
      dispatch(setAuth(data?.data));
    }

    if (data?.status != 1) {
      showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const getActivity = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/user/getUserActivity`,
    });

    if (status === 200 && data?.status === "1") {
      dispatch(setActivity(data?.data));
    }

    if (data?.status != 1) {
      showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const getUserProfile = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/user/getUserProfile`,
    });

    if (status === 200 && data?.status === "1") {
      dispatch(setUserProfile(data?.data));
    }

    if (data?.status != 1) {
      showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const getDepositHistory = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/blockchain/deposit/deposit-history`,
    });

    if (status === 200 && data?.status === 1) {
      dispatch(setDepositHistory(data?.data));
    }

    if (data?.status != 1) {
      // showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const getWithdrawHistory = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/blockchain/withdraw/withdrawal-history`,
    });

    if (status === 200 && data?.status === 1) {
      dispatch(setWithdrawHistory(data?.data));
    }

    if (data?.status != 1) {
      // showError(data?.message);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const getLockedTime = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/blockchain/withdraw/withdrawal_lockout-time`,
    });

    if (status === 200 && data?.status === 1) {
      dispatch(setLockedTime(data?.lockout_time));
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
export const getBonus = async (setBonusData, setLoading) => {
  try {
    setLoading(true);
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/user/get-user-bonus-details`,
    });

    if (status === 200 && data?.status === "1") {
      setBonusData({
        bonusAmount: data?.data?.bonus_amount,
        validTill: data?.data?.valid_till,
        bonusHistory: data?.data?.bonusHistory,
      });
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    setLoading(false);
  }
};
export const getStakingCoin = async (setStakingData, setLoading) => {
  try {
    setLoading(true);
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/currency/get-staking-coins`,
    });

    if (status === 200 && data?.status === "1") {
      setStakingData(data?.data);
    }
    if (status === 400 && data?.status == 3) {
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    setLoading(false);
  }
};
export const getRunningSubscription = async (setStakingData, setLoading) => {
  try {
    setLoading(true);
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://test.bitzup.com/onboarding/currency/get-user-staking`,
    });

    if (status === 200 && data?.status === "1") {
      setStakingData(data?.data);
    }
    // if (status === 400 && data?.status == 3) {
    //   localStorage.removeItem("userData");
    //   window.dispatchEvent(new Event("userDataChanged"));
    // }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  } finally {
    setLoading(false);
  }
};
