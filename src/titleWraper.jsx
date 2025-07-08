import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TitleUpdater = () => {
  // Example: assuming you have a title in your redux slice like state.app.title
  const title = useSelector((state) => state.counter.tikerData);

  useEffect(() => {
    if (title) {
      document.title = title?.lastPrice;
    }
  }, [title]);

  return null; // This component doesn't render anything
};

export default TitleUpdater;
