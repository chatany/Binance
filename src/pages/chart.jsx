import { useSelector } from "react-redux";

export const ChartEmbed = () => {
  const { searchQuery, dark, apiId } = useSelector((state) => state.counter);
  const query = searchQuery || "BTCUSDT";
  const url = `https://chart.bitzup.com/${
    apiId === "binance" ? "v1" : "v2"
  }/${query}?theme=${dark ? "dark" : "light"}
  `;
console.log(url,"oo");

  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        src={query&&url}
        title="BTCUSDT Chart"
        width={"100%"}
        height={"100%"}
        style={{ border: "none" }}
        allowFullScreen={true}
      />
    </div>
  );
};
