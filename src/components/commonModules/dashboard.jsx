import React from "react";
import FullCalendarComponent from "../bigCalendarModule/fullCalendar";
import SetAppointmentTime from "../settingAppointmentTimeModule/setAppointmentTime";
import AppointmentInfos from "../generalInfosModule/appointmentInfos";
import Agenda from "../agendaModule/agenda";

function Dashboard() {
  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <div className="bg-grayBg">
        <div className="bg-grayBg lg:mx-[3rem]  xl:text-[1rem] lg:text-[0.68rem] md:text-[0.90rem]">
          <AppointmentInfos />
        </div>
        {isMobile && (
          <div className="block lg:flex lg:mx-[3rem] items-stretch justify-center xl:text-[1rem] lg:text-[0.68rem] md:text-[0.90rem] ">
            {/* <AppointmentRequestList /> */}
            <Agenda />
          </div>
        )}
        {!isMobile && (
          <div className="block lg:flex lg:mx-[3rem] items-stretch justify-center xl:text-[1rem] lg:text-[0.68rem] md:text-[0.90rem] min-h-[575px] ">
            <Agenda />
            {/* <AppointmentRequestList /> */}
          </div>
        )}
        <div className="block lg:flex lg:mx-[3rem] pb-5 xl:text-[1rem] lg:text-[0.70rem] md:text-[0.80rem]">
          <FullCalendarComponent />
          <SetAppointmentTime />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
