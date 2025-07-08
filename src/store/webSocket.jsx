import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    tikerData: {
      symbol: "",
      lastPrice: "",
      priceChange: "",
      priceChangePercent: "",
      highPrice: "",
      lowPrice: "",
      volume: "",
      quoteVolume: "",
    },
    open: false,
    orderData: [],
    tradeData: [],
    lastPrice: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.tikerData = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setTradeData: (state, action) => {
      state.tradeData = action.payload;
    },
    setLastPrice: (state, action) => {
      state.lastPrice = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setOpen,
  setOrderData,
  setTradeData,
  setLastPrice,
} = counterSlice.actions;

export default counterSlice.reducer;
