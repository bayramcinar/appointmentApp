import React from "react";

function AppointmentInfoBox({ number, title, changeRate }) {
  return (
    <div className="w-[8vw] h-[8vw] max-[768px]:w-[175px] max-[768px]:h-[175px] shadow-xl flex flex-col animate__animated animate__zoomIn items-center bg-white justify-center  rounded-2xl m-[1.4vw] max-[500px]:m-[10px] relative">
      {changeRate > 0 && (
        <div className="absolute right-2 top-2 flex">
          <i class="fa-solid fa-arrow-up lg:text-[0.8vw] max-[768px]:text-sm mr-[2px] text-green-600"></i>
          <h1 className="lg:text-[0.7vw] max-[768px]:text-sm font-semibold text-center text-green-600">
            {changeRate}
          </h1>
        </div>
      )}
      {changeRate < 0 && (
        <div className="absolute right-2 top-2 flex">
          <i className="fa-solid fa-arrow-down lg:text-[0.8vw] max-[768px]:text-sm mr-[2px] text-coral"></i>
          <h1 className="lg:text-[0.7vw] max-[768px]:text-sm font-semibold text-center text-coral">
            {changeRate}
          </h1>
        </div>
      )}

      <div className="infoArea w-[6vw] m-4 mt-0 mb-0 max-[768px]:w-[100%]">
        <h1
          className="number text-center text-[#000000a8] text-[3vw] max-[768px]:text-5xl font-semibold"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {number}
        </h1>
        <h1 className="text-[0.8vw] text-center max-[768px]:text-base font-medium max-[768px]:mt-[8px]">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
