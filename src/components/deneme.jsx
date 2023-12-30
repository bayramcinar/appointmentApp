import React from "react";
import pp from "../images/pp.png";

function Deneme({
  appointmentNumber,
  name,
  service,
  status,
  time,
  remainingTime,
}) {
  return (
    <div className="flex flex-col">
      <div className="card flex w-[100%] border-2 border-stepBorder1 rounded-xl m-3">
        <div className="numAndInfo flex-col flex items-center justify-center border-r-2 border-stepBorder1">
          <div className="appointmentNumber">
            <h1 className="text-[11px] text-center">{appointmentNumber}</h1>
          </div>
          <div className="flex">
            <img src={pp} className="w-[40px]" alt="" />
            <h1 className="text-[11px] text-center">{name}</h1>
          </div>
        </div>
        <div className="service flex items-center justify-center border-r-2 border-stepBorder1">
          <h1 className="text-[11px] text-center">{service}</h1>
        </div>
        <div className="status flex items-center justify-center border-r-2 border-stepBorder1">
          <i className="fa-solid fa-circle text-[10px] text-red-600 flashing-text flex items-center justify-center mx-1"></i>
          <h1 className="text-[11px] text-center ">{status}</h1>
        </div>
        <div className="timeInfos flex-col flex items-center justify-center">
          <div className="saatAraliği border-b-2 border-stepBorder1">
            <h1 className="text-[11px] text-center">{time}</h1>
          </div>
          <div className="kalanSüre">
            <h1 className="text-[11px] text-center">{remainingTime}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deneme;
