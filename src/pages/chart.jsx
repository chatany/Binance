import { useSelector } from "react-redux";

export const ChartEmbed = ({ searchQuery }) => {
  const query = searchQuery || "BTCUSDT";
  const apiId  = useSelector((state) => state.counter.apiId);
  const url=`https://graph.suncrypto.in/`
  
  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        src={url}
        title="BTCUSDT Chart"
        width={"100%"}
        height={"100%"}
        style={{ border: "none", pointerEvents: "none" }}
        allowFullScreen={true}
      />
    </div>
  );
};
