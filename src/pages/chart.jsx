export const ChartEmbed = ({ searchQuery }) => {
  return (
    <div className="max-w-full h-[624px] rounded-lg">
      <iframe
        src={`https://chart.bitzup.com/?market=${searchQuery}`}
        title="BTCUSDT Chart"
        className="w-full h-full rounded-lg"
        allowFullScreen
        aria-controls
      />
    </div>
  );
};
