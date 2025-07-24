import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const TradingViewChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Initialize the chart when the component mounts
    const chartInstance = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#fff',
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: '#eee',
        },
        horzLines: {
          color: '#eee',
        },
      },
      crosshair: {
        vertLine: {
          color: '#D1D4D8',
          width: 1,
        },
        horzLine: {
          color: '#D1D4D8',
          width: 1,
        },
      },
      timeScale: {
        borderColor: '#D1D4D8',
      },
    });
    setChart(chartInstance);

    // Cleanup chart instance on unmount
    return () => chartInstance.remove();
  }, []);

  useEffect(() => {
    // Once the chart is initialized and data is available, add the candlestick series
    if (chart && data.length > 0) {
      const formattedData = data.map(item => ({
        time: item.timestamp / 1000, // Convert timestamp to seconds
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
      }));

      // Create candlestick series and set data
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(formattedData);
    }
  }, [chart, data]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default TradingViewChart;