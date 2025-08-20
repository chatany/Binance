import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementByAmount,
  setAllMovers,
  setCurrentPrice,
  setOpenOrderData,
  setOrderData,
  setTopMovers,
  setTradeData,
} from "../store/webSocket";
import {
  allMovers,
  buysellBalance,
  getFundsData,
  OrderHistory,
  TopMoves,
} from "./apiCall";
import { io } from "socket.io-client";
import { apiRequest } from "../Helper";
import { useAuth } from "../hooks/useAuth";
const socket = io("https://socket.bitzup.com");
export const Socket = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const wsRef1 = useRef(null);
  const orderRef = useRef(null);
  const tradeRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const reconnectTimerRef1 = useRef(null);
  const fallbackIntervalRef = useRef(null);
  const fallbackIntervalRef1 = useRef(null);
  const reconnectTimerRef2 = useRef(null);
  const reconnectTimerRef4 = useRef(null);
  const token = useAuth();
  const fallbackIntervalRef2 = useRef(null);
  const userid = token?.user_id;
  const tradesDataRef = useRef([]);
  const { tradeData, apiId, openOrder, pairId } = useSelector(
    (state) => state.counter
  );
  useEffect(() => {
    tradesDataRef.current = tradeData; //
  }, [tradeData]);
  // useEffect(() => {
  //   TopMoves(dispatch);
  //   allMovers(dispatch);
  //   getFundsData(dispatch);
  // }, []);
  useEffect(() => {
    if (!searchQuery) return;
    const fetchRestData = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "get",
          url: `https://server-production-70e4.up.railway.app/binance-ticker?url=${searchQuery.toUpperCase()}`,
        });
        dispatch(setCurrentPrice(data?.lastPrice));
        if (status === 200) {
          dispatch(
            incrementByAmount({
              symbol: data?.symbol,
              lastPrice: data?.lastPrice,
              highPrice: data?.highPrice,
              lowPrice: data?.lowPrice,
              priceChange: data?.priceChange,
              priceChangePercent: data?.priceChangePercent,
              quoteVolume: data?.quoteVolume,
              volume: data?.volume,
            })
          );
        }
      } catch (err) {
        console.error("❌ REST fetch error", err);
      }
    };

    const startWebSocket = () => {
      const url =
        apiId === "bitget"
          ? `wss://ws.bitget.com/v2/ws/public`
          : `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@ticker@1000ms`;
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        if (apiId === "bitget") {
          const subscribeMsg = {
            op: "subscribe",
            args: [
              {
                instType: "SPOT",
                channel: "ticker",
                instId: searchQuery.toUpperCase(), // e.g. "BTCUSDT"
              },
            ],
          };
          wsRef.current.send(JSON.stringify(subscribeMsg));
        }
        if (fallbackIntervalRef.current)
          clearInterval(fallbackIntervalRef.current);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          if (apiId === "bitget") {
            dispatch(
              incrementByAmount({
                symbol: data?.data[0]?.instId,
                lastPrice: data.data[0]?.lastPr,
                highPrice: data.data[0]?.high24h,
                lowPrice: data.data[0]?.low24h,
                priceChange: data.data[0]?.change24h,
                priceChangePercent: data.data[0]?.changeUtc24h,
                quoteVolume: data.data[0]?.quoteVolume,
                volume: data.data[0]?.baseVolume,
              })
            );
          } else {
            dispatch(
              incrementByAmount({
                symbol: data?.s,
                lastPrice: data?.c,
                highPrice: data?.h,
                lowPrice: data?.l,
                priceChange: data?.p,
                priceChangePercent: data?.P,
                quoteVolume: data?.q,
                volume: data?.v,
              })
            );
          }
        }
      };

      wsRef.current.onerror = (err) => {
        wsRef.current.close();
      };

      wsRef.current.onclose = () => {
        // if (!fallbackIntervalRef.current)
        //   fallbackIntervalRef.current = setInterval(fetchRestData, 300);

        reconnectTimerRef.current = setTimeout(() => {
          startWebSocket();
        }, 1000);
      };
    };
    fetchRestData();
    startWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (fallbackIntervalRef.current)
        clearInterval(fallbackIntervalRef.current);
    };
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) return;
    const fetchRestData = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "get",
          url: `https://server-production-70e4.up.railway.app/binance-order?url=${searchQuery.toUpperCase()}`,
        });
        if (status === 200) {
          dispatch(setOrderData(data));
        }
      } catch (err) {}
    };

    const startWebSocket = () => {
      const url =
        apiId === "bitget"
          ? `wss://ws.bitget.com/v2/ws/public`
          : `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@depth20`;
      orderRef.current = new WebSocket(url);

      orderRef.current.onopen = () => {
        if (apiId === "bitget") {
          const subscribeMsg = {
            op: "subscribe",
            args: [
              {
                instType: "SPOT",
                channel: "books15",
                instId: searchQuery.toUpperCase(), // e.g. "BTCUSDT"
              },
            ],
          };
          orderRef.current.send(JSON.stringify(subscribeMsg));
        }
        if (fallbackIntervalRef1.current)
          clearInterval(fallbackIntervalRef1.current);
      };

      orderRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          if (apiId === "bitget") {
            dispatch(setOrderData(data?.data[0]));
          } else {
            dispatch(setOrderData(data));
          }
        }
      };

      orderRef.current.onerror = (err) => {
        orderRef.current.close();
      };

      orderRef.current.onclose = () => {
        // if (!fallbackIntervalRef1.current)
        //   fallbackIntervalRef1.current = setInterval(fetchRestData, 300);

        reconnectTimerRef1.current = setTimeout(() => {
          startWebSocket();
        }, 1000);
      };
    };
    fetchRestData();
    startWebSocket();

    return () => {
      if (orderRef.current) {
        orderRef.current.onclose = null;
        orderRef.current.close();
      }
      if (reconnectTimerRef1.current) clearTimeout(reconnectTimerRef1.current);
      if (fallbackIntervalRef1.current)
        clearInterval(fallbackIntervalRef1.current);
    };
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) return;
    const fetchRestData = async () => {
      try {
        const { data, status } = await apiRequest({
          method: "get",
          url: `https://server-production-70e4.up.railway.app/binance-Trades?url=${searchQuery.toUpperCase()}`,
        });
        if (status === 200) {
          dispatch(setTradeData(data));
        }
      } catch (err) {}
    };

    const startWebSocket = () => {
      const url =
        apiId === "bitget"
          ? `wss://ws.bitget.com/v2/ws/public`
          : `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@aggTrade`;
      tradeRef.current = new WebSocket(url);

      tradeRef.current.onopen = () => {
        if (apiId === "bitget") {
          const subscribeMsg = {
            op: "subscribe",
            args: [
              {
                instType: "SPOT",
                channel: "trade",
                instId: searchQuery.toUpperCase(), // e.g. "BTCUSDT"
              },
            ],
          };
          tradeRef.current.send(JSON.stringify(subscribeMsg));
        }
        if (fallbackIntervalRef2.current)
          clearInterval(fallbackIntervalRef2.current);
      };

      tradeRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // always use latest data via ref
        const updatedTrades = tradesDataRef.current
          ? [...tradesDataRef.current]
          : [];

        // new trade ko start me daalo
        if (apiId === "bitget") {
          const trade = {
            T: data?.ts,
            m: data?.data[0]?.side === "sell" ? true : false,
            p: data?.data[0]?.price,
            q: data?.data[0]?.size,
          };
          updatedTrades.unshift(trade);
        } else {
          updatedTrades.unshift(data);
        }

        if (updatedTrades.length > 20) {
          updatedTrades.pop();
        }

        // set redux state
        if (data) {
          dispatch(setTradeData(updatedTrades));
        }
      };

      tradeRef.current.onerror = (err) => {
        tradeRef.current.close();
      };

      tradeRef.current.onclose = () => {
        // if (!fallbackIntervalRef2.current)
        //   fallbackIntervalRef2.current = setInterval(fetchRestData, 300);

        reconnectTimerRef2.current = setTimeout(() => {
          startWebSocket();
        }, 1000);
      };
    };
    fetchRestData();
    startWebSocket();

    return () => {
      if (tradeRef.current) {
        tradeRef.current.onclose = null;
        tradeRef.current.close();
      }
      if (reconnectTimerRef2.current) clearTimeout(reconnectTimerRef2.current);
      if (reconnectTimerRef2.current)
        clearInterval(fallbackIntervalRef2.current);
    };
  }, [searchQuery]);
  useEffect(() => {
    // Step 1: Call API first
    const fetchInitialData = async () => {
      await TopMoves(dispatch);
      await allMovers(dispatch);
      if (token) {
        await getFundsData(dispatch);
      }

      // Step 2: Setup socket after API is done
      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.emit("market", (data) => {
        console.log("Market subscribed:", data);
      });

      socket.on("market", (event) => {
        try {
          const data = JSON.parse(event);
          if (data) {
            dispatch(setAllMovers(data));
            dispatch(setTopMovers(data));
          }
        } catch (err) {
          console.error("Invalid socket data:", event);
        }
      });
    };

    fetchInitialData();

    return () => {
      socket.off("market");
      socket.off("disconnect");
    };
  }, [dispatch]);
  useEffect(() => {
    if (!apiId) return;
    const startWebSocket = () => {
      const url =
        apiId == "bitget"
          ? "wss://test.bitzup.com/bit-exec-report"
          : "wss://test.bitzup.com/bin-exec-report";
      wsRef1.current = new WebSocket(url);

      wsRef1.current.onopen = () => {
        wsRef1.current.send(JSON.stringify({ user_id: userid }));

        console.log(`📤 Sent: ${userid}`);
      };

      wsRef1.current.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        if (!messageData?.status || !messageData?.data) return;

        const orderId = messageData.data.order_id;

        if (messageData.status === "1") {
          const orderExists = openOrder.some((o) => o.order_id === orderId);

          if (!orderExists) {
            dispatch(setOpenOrderData([messageData.data, ...openOrder]));
          }
        }

        if (messageData.status === "2") {
          const updated = openOrder.map((o) =>
            o.order_id === orderId ? messageData.data : o
          );
          dispatch(setOpenOrderData(updated));
        }

        if (messageData.status === "3" || messageData.status === "4") {
          const filtered = openOrder.filter((o) => o.order_id !== orderId);
          dispatch(setOpenOrderData(filtered));
          if (messageData.status === "3") {
            buysellBalance(pairId, dispatch);
            OrderHistory(dispatch);
          }
        }
        console.log("📩 Message:", messageData);
      };

      wsRef1.current.onerror = (error) => {
        wsRef1.current.close();
      };

      wsRef1.current.onclose = () => {
        reconnectTimerRef4.current = setTimeout(() => {
          startWebSocket();
        }, 1000);
      };
    };
    startWebSocket();
    // return () => {
    return () => {
      if (wsRef1.current) {
        wsRef1.current.onclose = null;
        wsRef1.current.close();
      }
      if (reconnectTimerRef4.current) clearTimeout(reconnectTimerRef4.current);
    };
    // };
  }, [apiId]);

  return null;
};
