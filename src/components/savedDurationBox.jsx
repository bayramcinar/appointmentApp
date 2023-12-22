import React from "react";

function SavedDurations({ time, onTimeClick, selectedDuration }) {
  const handleTimeClick = () => {
    //seçtiğimiz saati geri döndürüyor ve background renk ayarlamarını yapıyor
    if (onTimeClick && typeof onTimeClick === "function") {
      onTimeClick(time);
    }
  };
  const isSelected = selectedDuration === time; // seçtiğimiz saati atadığımız değişken

  return (
    <div>
      <div
        className={`timeBox w-[115px] max-[768px]:w-[115px] ${
          isSelected ? "bg-red-600" : "bg-callNowButtonColor"
        } rounded-3xl m-[5px] p-[5px] max-[768px]:m-[5px] cursor-pointer`}
        onClick={handleTimeClick}
      >
        <h4 className="text-sm text-text p-1 pb-0 text-center">
          {time} Dakika
        </h4>
      </div>
    </div>
  );
}

export default SavedDurations;
