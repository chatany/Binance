import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../store/webSocket";

export const Socket = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const fallbackIntervalRef = useRef(null);

  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/binance-ticker?url=${searchQuery}`);
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
      wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${searchQuery.toLowerCase()}@ticker`);


      wsRef.current.onopen = () => {
        console.log("✅ WebSocket Connected for:", searchQuery);
        if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(
          incrementByAmount({
            symbol: data?.s,
            lastPrice: data?.l,
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
        console.error("❌ WS Error", err);
        wsRef.current.close();
      };

      wsRef.current.onclose = () => {
        console.log("🔌 WS Closed for:", searchQuery);
        if (!fallbackIntervalRef.current)
          fallbackIntervalRef.current = setInterval(fetchRestData, 300);

        reconnectTimerRef.current = setTimeout(() => {
          console.log("♻️ Reconnecting WS for:", searchQuery);
          startWebSocket();
        }, 300);
      };
    };

    fetchRestData();
    startWebSocket();

    return () => {
      console.log("🧹 Cleaning up for:", searchQuery);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current);
    };
  }, [searchQuery, dispatch]);

  return null;
};
