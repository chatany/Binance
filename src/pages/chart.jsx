import { useSelector } from "react-redux";

export const ChartEmbed = () => {
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const dark = useSelector((state) => state.counter.dark);
  const apiId = useSelector((state) => state.counter.apiId);
  const query = searchQuery || "BTCUSDT";
  const url = `https://chart.bitzup.com/${
    apiId === "binance" ? "v1" : "v2"
  }/${query}?theme=${dark ? "dark" : "light"}
  `;

  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        src={query && url}
        title="BTCUSDT Chart"
        width={"100%"}
        height={"100%"}
        style={{ border: "none" }}
        allowFullScreen={true}
      />
    </div>
  );
};
