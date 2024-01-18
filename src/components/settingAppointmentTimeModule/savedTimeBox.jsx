import React from "react";

function SavedTimes({ time, onTimeClick, selectedTime }) {
  const handleTimeClick = () => {
    if (onTimeClick && typeof onTimeClick === "function") {
      onTimeClick(time);
    }
  };

  return (
    <div>
      <div
        className={`timeBox w-[115px] max-[768px]:w-[115px] ${
          selectedTime
            ? "bg-deepSlateBlue"
            : " bg-white border-2 border-deepSlateBlue "
        } rounded-3xl m-[5px] p-[5px] max-[768px]:m-[5px] cursor-pointer`}
        onClick={handleTimeClick}
      >
        <h4
          className={`text-sm  p-1 pb-0 text-center ${
            selectedTime ? "text-white" : " text-deepSlateBlue font-bold"
          }`}
        >
          {time}
        </h4>
      </div>
    </div>
  );
}

export default SavedTimes;
