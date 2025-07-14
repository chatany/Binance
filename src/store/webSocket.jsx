import { createSlice } from "@reduxjs/toolkit";
const updateMoversSection = (existing, incoming) => {
  const updated = {};
  for (const key in existing) {
    updated[key] = existing[key].map((item) => {
      const updatedItem = incoming[key]?.find(
        (d) => d.pair_symbol === item.pair_symbol
      );
      return updatedItem ? { ...item, ...updatedItem } : item;
    });
  }
  return updated;
};

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
    loading: false,
    open: false,
    orderData: [],
    tradeData: [],
    lastPrice: 0,
    movers: { Hot: [], Losers: [], Gainers: [], "24h Vol": [] },
    allMovers: [],
    countryData: [],
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
    setTopMovers: (state, action) => {
      const incoming = action.payload;
      // if (state.movers && Object.keys(state.movers).length > 0) {
      //   state.movers = updateMoversSection(state.movers, action.payload);
      // } else {
      //   state.movers = action.payload;
      // }
      if (
        state.movers.Hot.length > 0 ||
        state.movers.Losers.length > 0 ||
        state.movers.Gainers.length > 0
      ) {
        state.movers.Hot = state.movers.Hot.map((item) => {
          const updatedItem = incoming.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
        state.movers.Losers = state.movers.Losers.map((item) => {
          const updatedItem = incoming.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
        state.movers.Gainers = state.movers.Gainers.map((item) => {
          const updatedItem = incoming.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
        state.movers["24h Vol"] = state.movers["24h Vol"].map((item) => {
          const updatedItem = incoming.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
      } else {
        state.movers = action.payload;
      }
    },
    setAllMovers: (state, action) => {
      const start = action.payload;

      if (state.allMovers.length > 0) {
        state.allMovers = state.allMovers.map((item) => {
          const updatedItem = start.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
      } else {
        // No existing data, just set directly
        state.allMovers = start;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCountryData: (state, action) => {
      state.countryData = action.payload;
    },
  },
});

export const {
  increment,
  setCountryData,
  decrement,
  incrementByAmount,
  setOpen,
  setOrderData,
  setTradeData,
  setTopMovers,
  setAllMovers,
  setLoading,
  setLastPrice,
} = counterSlice.actions;

export default counterSlice.reducer;
