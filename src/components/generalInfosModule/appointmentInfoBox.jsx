import React from "react";

function AppointmentInfoBox({
  number,
  title,
  changeRate,
  lastOne,
  changeGraph,
}) {
  return (
    <div className="rounded-md bg-gray-50 lg:w-[10.5vw] m-1 2xl:m-3 w-44">
      <div className={`px-[0.3vw]  2xl:px-[0.5vw] py-[0.5vw] 2xl:py-[1.2vw] `}>
        <div className="titleArea flex justify-center m-2 ">
          <h1 className="text-sm lg:text-[0.8vw] text-gray-600 font-semibold">
            {title}
          </h1>
        </div>
        <div className="rateArea flex justify-center m-2">
          <div className="rate font-semibold flex items-center justify-center">
            <h1 className="text-sm lg:text-[2.2vw]">{number}</h1>
            {changeRate > 0 && (
              <i class="fa-solid fa-caret-up  text-greenStatus ml-2 text-2xl"></i>
            )}
            {changeRate < 0 && (
              <i class="fa-solid fa-caret-down text-coral ml-2 text-2xl"></i>
            )}
          </div>
        </div>
        <div className="lastRate flex text-gray-500 font-medium text-xs lg:text-[0.6vw] m-2 items-center justify-center">
          <h1 className="mr-2">Bir Önceki {lastOne}</h1>
          <h1
            className={`${changeRate > 0 ? "text-greenStatus" : "text-coral"}`}
          >
            ({changeRate}%)
          </h1>
        </div>
        <div className="seeReport m-1 flex items-center justify-center">
          <h1
            className={`underline text-premiumPurple text-xs lg:text-[0.7vw] cursor-pointer`}
            onClick={() => changeGraph()}
          >
            Grafikte Gör
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
