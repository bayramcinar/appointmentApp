import React from "react";
import pp from "../images/pp.png";

function Deneme() {
  return (
    <div className="flex flex-col">
      <div className="card flex w-[100%] border-2 border-stepBorder1 rounded-xl m-3">
        <div className="numAndInfo flex-col flex items-center justify-center border-r-2 border-stepBorder1">
          <div className="appointmentNumber">
            <h1 className="text-[11px] text-center">291220230830</h1>
          </div>
          <div className="flex">
            <img src={pp} className="w-[40px]" alt="" />
            <h1 className="text-[11px] text-center">Bayram Çınar</h1>
          </div>
        </div>
        <div className="service flex items-center justify-center border-r-2 border-stepBorder1">
          <h1 className="text-[11px] text-center">İlişki problemleri</h1>
        </div>
        <div className="status flex items-center justify-center border-r-2 border-stepBorder1">
          <i className="fa-solid fa-circle text-[10px] text-red-600 flashing-text flex items-center justify-center mx-1"></i>
          <h1 className="text-[11px] text-center ">
            Randevu Talebi Onay Bekleniyor
          </h1>
        </div>
        <div className="timeInfos flex-col flex items-center justify-center">
          <div className="saatAraliği border-b-2 border-stepBorder1">
            <h1 className="text-[11px] text-center">
              29.12.2023 Cuma 08:30 - 10:00
            </h1>
          </div>
          <div className="kalanSüre">
            <h1 className="text-[11px] text-center">18 saat 12 dakika</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deneme;
