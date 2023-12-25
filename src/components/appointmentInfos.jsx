import React from "react";
import AppointmentInfoBox from "./appointmentInfoBox";

function AppointmentInfos() {
  return (
    <div className="w-full">
      <div className="infosArea flex items-center justify-center flex-wrap">
        <AppointmentInfoBox number={5} title={"Bu gün Randevu"} />
        <AppointmentInfoBox number={15} title={"Bu hafta Randevu"} />
        <AppointmentInfoBox number={45} title={"Bu ay Randevu"} />
        <AppointmentInfoBox number={505} title={"Bu yıl Randevu"} />
        <AppointmentInfoBox number={7} title={"Randevu Talebi"} />
        <AppointmentInfoBox number={8} title={"Randevu İptali"} />
        <AppointmentInfoBox number={18} title={"Randevu Onayı"} />
        <AppointmentInfoBox number={12} title={"Hizmet Sayısı"} />
      </div>
    </div>
  );
}

export default AppointmentInfos;
