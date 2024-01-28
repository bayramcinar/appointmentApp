import React from "react";

function AppointmentInfoBox({ number, title, changeRate, lastOne }) {
  return (
    <div className="border-gray-200 border-2 rounded-md bg-white w-[11vw] m-3">
      <div className="px-[0.5vw] py-[1.5vw] ">
        <div className="titleArea flex justify-start">
          <h1 className="text-[0.8vw] text-deepSlateBlue font-semibold">
            {title}
          </h1>
        </div>
        <div className="rateArea flex justify-start">
          <div className="rate text-lg font-semibold flex items-center justify-center">
            <h1 className="text-[1.7vw]">{number}</h1>
            {changeRate > 0 && (
              <i class="fa-solid fa-caret-up text-greenStatus ml-4 text-2xl"></i>
            )}
            {changeRate < 0 && (
              <i class="fa-solid fa-caret-down text-coral ml-4 text-2xl"></i>
            )}
          </div>
        </div>
        <div className="lastRate flex text-gray-500 font-medium text-[0.8vw]">
          <h1 className="mr-2">Bir Önceki {lastOne}</h1>
          <h1
            className={`${changeRate > 0 ? "text-greenStatus" : "text-coral"}`}
          >
            ({changeRate}%)
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
