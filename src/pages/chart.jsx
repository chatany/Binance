export const ChartEmbed = ({ searchQuery }) => {
  const query = searchQuery || "BTCUSDT";
  return (
    <div className="max-w-full h-[624px] rounded-lg">
      <iframe
        src={`https://chart.bitzup.com/?market=${query}`}
        title="BTCUSDT Chart"
        className="w-full h-full rounded-lg"
        allowFullScreen
        aria-controls
      />
    </div>
  );
};
