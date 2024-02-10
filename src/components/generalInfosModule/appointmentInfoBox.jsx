import React, { useState } from "react";

function AppointmentInfoBox({
  number,
  title,
  changeRate,
  lastOne,
  changeGraph,
  description,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInfoIconHover = () => {
    setShowTooltip(true);
  };

  const handleInfoIconLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="rounded-md bg-gray-50 relative lg:w-[10.5vw] m-1 2xl:m-3 w-44 animate__animated animate__zoomIn">
      <div className="infoIcon absolute right-0 top-0">
        <i
          onMouseOver={handleInfoIconHover}
          onMouseLeave={handleInfoIconLeave}
          className="fa-solid fa-circle-info text-lg text-gray-500 absolute right-1 top-1 cursor-pointer"
        ></i>
        {showTooltip && (
          <div className="tooltip z-[3] bg-white border border-gray-300 p-2 rounded-xl shadow-lg absolute transform -translate-x-0 top-7 right-[2px] transition duration-300 w-[150px]">
            <h1 className="text-xs font-semibold text-center text-gray-600">
              {description}
            </h1>
          </div>
        )}
      </div>
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
              <i className="fa-solid fa-caret-up  text-greenStatus ml-2 text-2xl"></i>
            )}
            {changeRate < 0 && (
              <i className="fa-solid fa-caret-down text-coral ml-2 text-2xl"></i>
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
