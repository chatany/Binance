import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementByAmount,
  setAllMovers,
  setOrderData,
  setTopMovers,
  setTradeData,
} from "../store/webSocket";
import { allMovers, TopMoves } from "./apiCall";
import { io } from "socket.io-client";
const socket = io("https://socket.bitzup.com");
export const Socket = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const orderRef = useRef(null);
  const tradeRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const allMover = useSelector((state) => state.counter.allMovers);
  const reconnectTimerRef1 = useRef(null);
  const fallbackIntervalRef = useRef(null);
  const fallbackIntervalRef1 = useRef(null);
  const reconnectTimerRef2 = useRef(null);
  const fallbackIntervalRef2 = useRef(null);
  const tradesDataRef = useRef([]);
  const tradesData = useSelector((state) => state.counter.tradeData);
  useEffect(() => {
    tradesDataRef.current = tradesData; // hamesha latest data rakhne ke liye
  }, [tradesData]);
  useEffect(() => {
    TopMoves(dispatch);
    allMovers(dispatch);
  }, []);
  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/binance-ticker?url=${searchQuery}`
        );
        const data = await res.json();
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
      } catch (err) {
        console.error("❌ REST fetch error", err);
      }
    };

    const startWebSocket = () => {
      wsRef.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@ticker@1000ms`
      );

      wsRef.current.onopen = () => {
        if (fallbackIntervalRef.current)
          clearInterval(fallbackIntervalRef.current);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "socket for tiker");

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
  }, [searchQuery, dispatch]);
  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/binance-order?url=${searchQuery}`
        );
        const data = await res.json();
        dispatch(setOrderData(data));
      } catch (err) {}
    };

    const startWebSocket = () => {
      orderRef.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@depth20`
      );

      orderRef.current.onopen = () => {
        if (fallbackIntervalRef1.current)
          clearInterval(fallbackIntervalRef1.current);
      };

      orderRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "socket for order");

        dispatch(setOrderData(data));
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
      if (reconnectTimerRef1.current)
        clearInterval(fallbackIntervalRef1.current);
    };
  }, [searchQuery, dispatch]);
  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/binance-Trades?url=${searchQuery}`
        );
        const data = await res.json();
        dispatch(setTradeData(data));
      } catch (err) {}
    };

    const startWebSocket = () => {
      tradeRef.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@aggTrade`
      );

      tradeRef.current.onopen = () => {
        if (fallbackIntervalRef2.current)
          clearInterval(fallbackIntervalRef2.current);
      };

      tradeRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "socket for trade");

        // always use latest data via ref
        const updatedTrades = tradesDataRef.current
          ? [...tradesDataRef.current]
          : [];

        // new trade ko start me daalo
        updatedTrades.unshift(data);

        if (updatedTrades.length > 20) {
          updatedTrades.pop();
        }

        // set redux state
        dispatch(setTradeData(updatedTrades));
      };

      tradeRef.current.onerror = (err) => {
        console.log(err, "po");

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
  }, [searchQuery, dispatch]);
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });
    socket.emit("market", (data) => {
      console.log(data, "po");
    });
    socket.on("market", (event) => {
      const data = JSON.parse(event);
      console.log(event, "event");
      dispatch(setAllMovers(data));
      dispatch(setTopMovers(data));
    });
  }, []);
  return null;
};