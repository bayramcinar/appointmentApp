import React from "react";
import AppointmentInfoBox from "./appointmentInfoBox";
import week from "../images/week.png";
import day from "../images/day.png";
import month from "../images/month.png";
import request from "../images/request.png";

function AppointmentInfos() {
  return (
    <div className="w-full">
      <div className="infosArea flex items-center justify-center">
        <AppointmentInfoBox img={day} title={"5 Randevu"} />
        <AppointmentInfoBox img={week} title={"15 Randevu"} />
        <AppointmentInfoBox img={month} title={"45 Randevu"} />
        <AppointmentInfoBox img={request} title={"6 randevu talebi"} />
      </div>
    </div>
  );
}

export default AppointmentInfos;
