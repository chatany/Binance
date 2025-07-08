import { useDispatch } from "react-redux";
import { apiRequest } from "../Helper";
import { setLastPrice } from "../store/webSocket";

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
    const dispatch = useDispatch();
    const { data, status } = await apiRequest({
      method: "get",
      url: `http://localhost:5000/binance-ticker?url=${searchQuery}`,
    });
    dispatch(setLastPrice(data?.lastPrice));
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
