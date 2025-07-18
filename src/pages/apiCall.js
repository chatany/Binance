import { useDispatch } from "react-redux";
import { apiRequest } from "../Helper";
import {
  setAllMovers,
  setCountryData,
  setLastPrice,
  setTopMovers,
} from "../store/webSocket";

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

export const SearchData = async ({ setSearchData }) => {
  try {
    const response1 = await apiRequest({
      method: "get",
      url: `http://localhost:5000/binance-exchange`,
    });
    setSearchData(response1?.data);
  } catch (err) {
    console.error("Failed to fetch data", err);
  } finally {
  }
};

export const TikerData = async ({ setTikerData, searchQuery }) => {
  try {
    const { data, status } = await apiRequest({
      method: "get",
      url: `http://localhost:5000/binance-ticker?url=${searchQuery}`,
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
      url: `http://localhost:5000/binance-order?url=${searchQuery}`,
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
      url: `http://localhost:5000/binance-Trades?url=${searchQuery}`,
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
      url: `http://localhost:5000/binance-Movers`,
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
      url: `http://localhost:5000/binance-allMovers`,
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

export const register = async ({ user, setUserData }) => {
  
};
