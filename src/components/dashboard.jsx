import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";
import Agenda from "./agenda";
import SetService from "./setService";
import AppointmentRequestList from "./appointmentRequestList";

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
        <div className="flex items-center justify-center bg-dayComponentBg pb-8 ">
          <div className="bg-dayComponentBg mr-[9rem] mt-[50px] shadow-xl border-stepBorder1 border-2 rounded-xl hidden md:block">
            <FullCalendarComponent />
          </div>
          <div>
            <SetAppointmentTime />
          </div>
        </div>
        <div className="flex max-[768px]:block lg:mx-[9rem]">
          <div className="flex items-center justify-center bg-dayComponentBg pb-8 w-[100%] pl-5  max-[768px]:pr-[1.5rem] ">
            <SetService />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
