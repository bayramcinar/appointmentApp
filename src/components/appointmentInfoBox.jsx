import React from "react";

function AppointmentInfoBox({ number, title }) {
  return (
    <div>
      <div className="w-[150px] h-[150px] shadow-lg flex flex-col items-center justify-center border border-stepBorder1 border-2 rounded-xl m-6">
        <div className="imgArea w-[80px] m-4 mb-0">
          <h1
            className="number text-center text-5xl font-semibold"
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
