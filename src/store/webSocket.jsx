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
const storedTheme = localStorage.getItem("theme");
const initialDark = storedTheme ? JSON.parse(storedTheme) : true;
const last = JSON.parse(localStorage.getItem("lastPair"));

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
    quantityDecimal: 0,
    balance: {},
    searchData: [],
    fundData: [],
    showPopup: false,
    coinName: "",
    dark: initialDark,
    searchQuery: last || "BTCUSDT",
    show: false,
    activeItem: false,
    referralCode: {},
    authEnticatorKey: {},
    auth: false,
    activity: [],
    userProfile: {},
    depositHistory: [],
    withdrawHistory: [],
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.tikerData = action.payload;
    },
    setDepositHistory: (state, action) => {
      state.depositHistory = action.payload;
    },
    setWithdrawHistory: (state, action) => {
      state.withdrawHistory = action.payload;
    },
    setActivity: (state, action) => {
      state.activity = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setAuthEnticatorKey: (state, action) => {
      state.authEnticatorKey = action.payload;
    },
    setReferralData: (state, action) => {
      state.referralCode = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setDark: (state, action) => {
      state.dark = action.payload;
      localStorage.setItem("theme", JSON.stringify(state.dark));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setCoinName: (state, action) => {
      state.coinName = action.payload;
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
    setQuantityDecimal: (state, action) => {
      state.quantityDecimal = action.payload;
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

      if (
        state.movers.Hot?.length > 0 ||
        state.movers.Losers?.length > 0 ||
        state.movers.Gainers?.length > 0
      ) {
        state.movers.Hot = state.movers.Hot.map((item) => {
          const updatedItem = incoming?.Hot?.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });

        state.movers.Losers = state.movers.Losers.map((item) => {
          const updatedItem = incoming?.Losers?.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });

        state.movers.Gainers = state.movers.Gainers.map((item) => {
          const updatedItem = incoming?.Gainers?.find(
            (d) => d.pair_symbol === item.pair_symbol
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });

        state.movers["24h Vol"] = state.movers["24h Vol"].map((item) => {
          const updatedItem = incoming?.["24h Vol"]?.find(
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
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
  },
});

export const {
  increment,
  setActivity,
  setUserProfile,
  setAuthEnticatorKey,
  setAuth,
  setReferralData,
  setDark,
  setActiveItem,
  setShow,
  setSearchQuery,
  setFundData,
  setCountryData,
  setBalance,
  setIsFav,
  setSearchData,
  setShowPopup,
  decrement,
  setApiIds,
  incrementByAmount,
  setPriceDecimal,
  setQuantityDecimal,
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
  setCoinName,
  setDepositHistory,
  setWithdrawHistory,
} = counterSlice.actions;

export default counterSlice.reducer;
