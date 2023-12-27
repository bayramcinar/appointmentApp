import React from "react";
import AppointmentInfoBox from "./appointmentInfoBox";

function AppointmentInfos() {
  return (
    <div className="w-full">
      <div className="infosArea flex items-center justify-center flex-wrap">
        <AppointmentInfoBox
          number={5}
          title={"Bu gün Randevu"}
          changeRate={5}
        />
        <AppointmentInfoBox
          number={15}
          title={"Bu hafta Randevu"}
          changeRate={5}
        />
        <AppointmentInfoBox
          number={45}
          title={"Bu ay Randevu"}
          changeRate={-10}
        />
        <AppointmentInfoBox
          number={505}
          title={"Bu yıl Randevu"}
          changeRate={486}
        />
        <AppointmentInfoBox
          number={7}
          title={"Randevu Talebi"}
          changeRate={-6}
        />
        <AppointmentInfoBox
          number={8}
          title={"Randevu İptali"}
          changeRate={2}
        />
        <AppointmentInfoBox
          number={18}
          title={"Randevu Onayı"}
          changeRate={10}
        />
        <AppointmentInfoBox
          number={12}
          title={"Hizmet Sayısı"}
          changeRate={15}
        />
      </div>
    </div>
  );
}

export default AppointmentInfos;
