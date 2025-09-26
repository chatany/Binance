import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loder } from "../common/Loder";

export const ChartEmbed = () => {
  const searchQuery = useSelector((state) => state.counter.searchQuery);
  const dark = useSelector((state) => state.counter.dark);
  const [loading, setLoading] = useState(true);
  const query = searchQuery;
  const url = `https://chart.bitzup.com/v2/${query}?theme=${
    dark ? "dark" : "light"
  }`;

  useEffect(() => {
    setLoading(true);
  }, [searchQuery, dark]);
  const handleLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="max-w-full h-full rounded-lg">
      <iframe
        key={url}
        src={url}
        title={`${query} Chart`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen={true}
        onLoad={handleLoading}
      />
      {loading && <Loder className="bg-[#00000040]" />}
    </div>
  );
};
