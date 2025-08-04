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
    currentPrice: 0,
    pairId: 0,
    openOrder: [],
    orderHistory: [],
    isSuccess: false,
    iconURL: "",
    rounding: true,
    helpCenter: [],
    faverateData: [],
    isFav: false,
    apiId: "",
    priceDecimal: 0,
    balance: {},
    searchData: [],
    fundData: [],
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.tikerData = action.payload;
    },
    setFundData: (state, action) => {
      state.fundData = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setPriceDecimal: (state, action) => {
      state.priceDecimal = action.payload;
    },
    SetHelpCenterData: (state, action) => {
      state.helpCenter = action.payload;
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
        state.movers.Hot?.length > 0 ||
        state.movers.Losers?.length > 0 ||
        state.movers.Gainers?.length > 0
      ) {
        state.movers.Hot = state.movers.Hot.map((item) => {
          const updatedItem =
            Array.isArray(incoming) &&
            incoming.find((d) => d.pair_symbol === item.pair_symbol);
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
        state.movers.Losers = state.movers.Losers.map((item) => {
          const updatedItem =
            Array.isArray(incoming) &&
            incoming.find((d) => d.pair_symbol === item.pair_symbol);
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
          const updatedItem =
            Array.isArray(start) &&
            start.find((d) => d.pair_symbol === item.pair_symbol);
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
    setCurrentPrice: (state, action) => {
      state.currentPrice = action.payload;
    },
    setPairId: (state, action) => {
      state.pairId = action.payload;
    },
    setOpenOrderData: (state, action) => {
      state.openOrder = action.payload;
    },
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setIconUrl: (state, action) => {
      state.iconURL = action.payload;
    },
    setRoundingVal: (state, action) => {
      state.rounding = action.payload;
    },
    setFaverateData: (state, action) => {
      state.faverateData = action.payload;
    },
    setIsFav: (state, action) => {
      state.isFav = action.payload;
    },
    setApiIds: (state, action) => {
      state.apiId = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {
  increment,
  setFundData,
  setCountryData,
  setBalance,
  setIsFav,
  setSearchData,
  decrement,
  setApiIds,
  incrementByAmount,
  setPriceDecimal,
  setOpen,
  setOrderData,
  setTradeData,
  setIconUrl,
  setIsSuccess,
  setTopMovers,
  setAllMovers,
  setLoading,
  setPairId,
  setOpenOrderData,
  setCurrentPrice,
  setLastPrice,
  setRoundingVal,
  setOrderHistory,
  SetHelpCenterData,
  setFaverateData,
} = counterSlice.actions;

export default counterSlice.reducer;
