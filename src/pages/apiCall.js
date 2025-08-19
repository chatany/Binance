import { apiRequest } from "../Helper";
import {
  setAllMovers,
  setBalance,
  setCountryData,
  setFaverateData,
  setFundData,
  SetHelpCenterData,
  setLoading,
  setOpenOrderData,
  setOrderHistory,
  setSearchData,
  setTopMovers,
} from "../store/webSocket";
import { showError } from "../Toastify/toastServices";

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
      url: `https://server-production-70e4.up.railway.app/binance-exchange`,
    });
    dispatch(setSearchData(response1?.data));
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
      url: `https://server-production-70e4.up.railway.app/binance-order?url=${searchQuery}`,
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
      url: `https://server-production-70e4.up.railway.app/binance-Trades?url=${searchQuery}`,
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
      url: `https://server-production-70e4.up.railway.app/binance-Movers`,
    });
    if (status === 200) {
      dispatch(setTopMovers(data));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};

export const allMovers = async (dispatch) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `https://server-production-70e4.up.railway.app/binance-allMovers`,
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
    setLoading(false);
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
      dispatch(setIsSuccess(false));
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
  }
};

export const helpCenterApi = async (dispatch) => {
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
    if (status === 400 && data?.status === 3) {
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
      dispatch(setFundData(data.data));
    }
    if (status === 400 && data?.status === 3) {
      // window.location.href = "/login";
      localStorage.removeItem("userData");
      window.dispatchEvent(new Event("userDataChanged"));
    }
  } catch (err) {
    console.error("Failed to fetch second API", err);
  }
};
