import React from "react";

function AppointmentInfoBox({ img, title }) {
  return (
    <div>
      <div className="w-[150px] h-[150px] shadow-lg flex flex-col items-center justify-center border border-stepBorder1 border-1 rounded-xl m-6">
        <div className="imgArea w-[80px] m-2">
          <img src={img} alt="" className="cover" />
        </div>
        <div className="titleArea h-1/2 m-3">
          <h1 className="text-md text-center">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfoBox;
