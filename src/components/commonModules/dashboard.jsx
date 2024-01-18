import React from "react";
import FullCalendarComponent from "../bigCalendarModule/fullCalendar";
import SetAppointmentTime from "../settingAppointmentTimeModule/setAppointmentTime";
import AppointmentInfos from "../generalInfosModule/appointmentInfos";
import Agenda from "../agendaModule/agenda";
import AppointmentRequestList from "../appointmentRequestListModule/appointmentRequestList";

function Dashboard() {
  return (
    <>
      <div className="bg-grayBg">
        <div className="bg-grayBg lg:mx-[3rem]  xl:text-[1rem] lg:text-[0.68rem] md:text-[0.90rem]">
          <AppointmentInfos />
        </div>
        <div className="block lg:flex lg:mx-[3rem] items-stretch justify-center xl:text-[1rem] lg:text-[0.68rem] md:text-[0.90rem]">
          <Agenda />
          <AppointmentRequestList />
        </div>
        <div className="block lg:flex lg:mx-[3rem] pb-5 xl:text-[1rem] lg:text-[0.70rem] md:text-[0.80rem]">
          <FullCalendarComponent />
          <SetAppointmentTime />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
