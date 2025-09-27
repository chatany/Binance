import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ChartEmbed = () => {
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const dark = useSelector((state) => state.counter.dark);
  const apiId = useSelector((state) => state.counter.apiId);
  // const [loading, setLoading] = useState(true);
  const query = searchQuery.toUpperCase();
  const url1 = `https://chart.bitzup.com/v1/${query}?theme=${
    dark ? "dark" : "light"
  }`;
  const url2 = `https://chart.bitzup.com/v2/${query}?theme=${
    dark ? "dark" : "light"
  }`;
  // useEffect(() => {
  //   setLoading(true);
  // }, [searchQuery, dark]);
  // const handleLoading = () => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  return (
    <div className="max-w-full h-full rounded-lg">
      {apiId === "binance" ? (
        <iframe
          src={url1}
          title={`${query} Chart`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen={true}
          // onLoad={handleLoading}
        />
      ) : (
        apiId === "bitget" && (
          <iframe
            src={url2}
            title={`${query} Chart`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen={true}
            // onLoad={handleLoading}
          />
        )
      )}
    </div>
  );
};
