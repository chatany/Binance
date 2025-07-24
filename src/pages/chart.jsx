export const ChartEmbed = ({ searchQuery }) => {
  const query = searchQuery || "BTCUSDT";
  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        src={`https://chart.bitzup.com/?market=${query}`}
        title="BTCUSDT Chart"
        width={"100%"}
        height={"100%"}
        style={{border:"none"}}
      />
    </div>
  );
};
