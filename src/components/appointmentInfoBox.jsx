import React from "react";

function AppointmentInfoBox({ number, title, changeRate }) {
  return (
    <div>
      <div className="w-[150px] h-[150px] shadow-lg flex flex-col items-center justify-center border-stepBorder1 border-2 rounded-xl m-6 relative">
        {changeRate > 0 && (
          <div className="absolute right-1 top-1 flex">
            <i class="fa-solid fa-arrow-up text-sm mr-[2px] text-green-600"></i>
            <h1 className="text-sm font-semibold text-center text-green-600">
              {changeRate}
            </h1>
          </div>
        )}
        {changeRate < 0 && (
          <div className="absolute right-1 top-1 flex">
            <i class="fa-solid fa-arrow-down text-sm mr-[2px] text-red-600"></i>
            <h1 className="text-sm font-semibold text-center text-red-600">
              {changeRate}
            </h1>
          </div>
        )}
        <div className="imgArea w-[80px] m-4 mb-0 ">
          <h1
            className="number text-center text-buttonColor text-5xl font-semibold"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {number}
          </h1>
        </div>
        <div className="titleArea h-1/2 m-3 flex items-center justify-center mt-0">
          <h1 className="text-md text-center">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
