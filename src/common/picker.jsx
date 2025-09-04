import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BinanceDatePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(2019, 0, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Track which month/year is currently visible
  const [shownDate, setShownDate] = useState(new Date());

  const handleQuickSelect = (type) => {
    let startDate,
      endDate = new Date();

    if (type === "7") {
      startDate = addDays(new Date(), -7);
    } else if (type === "30") {
      startDate = addDays(new Date(), -30);
    } else if (type === "all") {
      startDate = new Date(2019, 0, 1);
    }

    setRange([{ startDate, endDate, key: "selection" }]);
  };

  // Year navigation (preserve month, only change year)
  const handleYearChange = (direction) => {
    setShownDate((prev) => {
      const newDate = new Date(prev);
      const currentMonth = prev.getMonth(); // preserve current month
      newDate.setFullYear(prev.getFullYear() + direction, currentMonth, 1);
      return newDate;
    });
  };
  console.log(range, "ll");

  return (
    <div className="relative flex flex-col items-center gap-4 p-4 rounded-2xl">
      {/* Year Navigation */}

      {/* Calendar */}
      <div className="relative justify-between flex">
        <DateRangePicker
          className="w-[10px] rounded-2xl"
          key={shownDate.toISOString()} // 👈 force re-render
          ranges={range}
          onChange={(item) => setRange([item.selection])}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          direction="horizontal"
          months={2}
          staticRanges={[]}
          inputRanges={[]}
          shownDate={shownDate} // 👈 control calendar view
        />
        <div className=" absolute flex items-center justify-between w-full gap-10">
          <button
            onClick={() => handleYearChange(-1)}
            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
          >
            ⬅
          </button>
          <button
            onClick={() => handleYearChange(1)}
            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
          >
            ➡
          </button>
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="mt-3 text-sm text-gray-700">
        {range[0].startDate.toLocaleDateString("en-CA")} →{" "}
        {range[0].endDate.toLocaleDateString("en-CA")}
      </div>
    </div>
  );
};

export default BinanceDatePicker;
