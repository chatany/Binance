import React from "react";
export const ChartEmbed = ({ searchQuery }) => {
  return (
    <div className="max-w-full h-[524px]">
      <iframe
        src={`https://chart.bitzup.com/?market=${searchQuery}`}
        title="BTCUSDT Chart"
        className="w-full h-full"
        allowFullScreen
        aria-controls
      />
    </div>
  );
};
