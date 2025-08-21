import { useSelector } from "react-redux";

export const ChartEmbed = ({ searchQuery }) => {
  const query = searchQuery || "BTCUSDT";
  const apiId  = useSelector((state) => state.counter.apiId);
  const url=`http://localhost:3000/v2`
  
  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        src={url}
        title="BTCUSDT Chart"
        width={"100%"}
        height={"100%"}
        style={{ border: "none" }}
        allowFullScreen={true}
      />
    </div>
  );
};
