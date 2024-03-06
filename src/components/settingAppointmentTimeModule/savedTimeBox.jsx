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
        className={`timeBox text-sm md:text-[1.2vw] lg:text-[1vw] xl:text-[0.9vw] w-[115px] max-[768px]:w-[115px] ${
          selectedTime ? "bg-premiumOrange" : " bg-gray-100 "
        } rounded-lg m-[5px] hover:bg-premiumOrange p-[5px] max-[768px]:m-[5px] cursor-pointer`}
        onClick={handleTimeClick}
      >
        <h4
          className={` px-1 hover:text-white text-center ${
            selectedTime ? "text-gray-100" : " text-gray-500 font-bold"
          }`}
        >
          {time}
        </h4>
      </div>
    </div>
  );
}

export default SavedTimes;
