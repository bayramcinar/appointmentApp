import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";
import Agenda from "./agenda";
import AppointmentRequestList from "./appointmentRequestList";

function Dashboard() {
  return (
    <>
      <div className="bg-dayComponentBg">
        <div className="bg-dayComponentBg lg:mx-[9rem]">
          <AppointmentInfos />
        </div>
        <div className="flex max-[768px]:block  lg:mx-[9rem] items-center justify-center">
          <div className="bg-dayComponentBg border-stepBorder1 border-2 rounded-xl h-fit  mr-[2rem] max-[768px]:h-auto  max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 w-full">
            <Agenda />
          </div>
          <div className="bg-dayComponentBg border-stepBorder1 border-2 rounded-xl ml-[2rem] max-[768px]:h-auto w-[400px] max-[768px]:mx-auto max-[768px]:w-[23rem]  mb-5 ">
            <AppointmentRequestList />
          </div>
        </div>
        <div className="flex max-[768px]:block bg-dayComponentBg lg:mx-[9rem] ">
          <div className="bg-dayComponentBg lg:mr-[4rem] mt-[50px] shadow-xl border-stepBorder1 border-2 rounded-xl max-[768px]:mx-[10px] flex items-center justify-center lg:w-full">
            <FullCalendarComponent />
          </div>
          <div className="flex items-center justify-center">
            <SetAppointmentTime />
          </div>
        </div>
        /
      </div>
    </>
  );
}

export default Dashboard;
