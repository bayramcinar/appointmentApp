import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";
import Agenda from "./agenda";
import AppointmentRequestList from "./appointmentRequestList";
import Deneme from "./agendaCard";

function Dashboard() {
  return (
    <>
      <div className="bg-dayComponentBg">
        <div className="bg-dayComponentBg">
          <AppointmentInfos />
        </div>
        <div className="flex max-[768px]:block  lg:mx-[9rem]  ">
          <div className="bg-dayComponentBg border-stepBorder1 border-2 rounded-xl h-fit  mr-[2rem] max-[768px]:h-auto  max-[768px]:mx-auto max-[768px]:w-[23rem] h- b-5 mb-5 w-[68%]">
            <Agenda />
          </div>
          <div className="bg-dayComponentBg border-stepBorder1 border-2 rounded-xl ml-[2rem] max-[768px]:h-auto  max-[768px]:mx-auto max-[768px]:w-[23rem] b-5 mb-5 w-[28%]">
            <AppointmentRequestList />
          </div>
        </div>
        <div className="flex max-[768px]:block  items-center justify-center bg-dayComponentBg pb-8 ">
          <div className="bg-dayComponentBg lg:mr-[9rem] mt-[50px] shadow-xl border-stepBorder1 border-2 rounded-xl max-[768px]:mx-[10px]">
            <FullCalendarComponent />
          </div>
          <div>
            <SetAppointmentTime />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
