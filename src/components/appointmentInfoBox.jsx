import React from "react";

function AppointmentInfoBox({ number, title, changeRate }) {
  return (
    <div className="w-[8vw] h-[8vw] max-[768px]:w-[120px] max-[768px]:h-[120px] shadow-lg flex flex-col items-center justify-center border-stepBorder1 border-2 rounded-xl m-[1.4vw] max-[500px]:m-[20px] relative">
      {changeRate > 0 && (
        <div className="absolute right-1 top-1 flex">
          <i class="fa-solid fa-arrow-up lg:text-[0.8vw] max-[768px]:text-sm mr-[2px] text-green-600"></i>
          <h1 className="lg:text-[0.7vw] max-[768px]:text-sm font-semibold text-center text-green-600">
            {changeRate}
          </h1>
        </div>
      )}
      {changeRate < 0 && (
        <div className="absolute right-1 top-1 flex">
          <i class="fa-solid fa-arrow-down lg:text-[0.8vw] max-[768px]:text-sm mr-[2px] text-red-600"></i>
          <h1 className="lg:text-[0.7vw] max-[768px]:text-sm font-semibold text-center text-red-600">
            {changeRate}
          </h1>
        </div>
      )}
      <div className="infoArea w-[6vw] m-4 mb-0 max-[768px]:w-[15vw]">
        <h1
          className="number text-center text-buttonColor text-[3vw] max-[768px]:text-4xl font-semibold"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {number}
        </h1>
      </div>
      <div className="titleArea h-1/2 m-5 max-[768px]:m-2 flex items-center justify-center mt-0">
        <h1 className="text-[0.8vw] text-center max-[768px]:text-sm">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
