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
        <div className="bg-dayComponentBg lg:mx-[4rem]">
          <AppointmentInfos />
        </div>
        <div className="block xl:flex  lg:mx-[4rem] items-center justify-center">
          <div className="bg-dayComponentBg lg:scale-[1] md:scale-[0.9] lg:mr-[1rem] border-stepBorder1 border-2 rounded-xl h-fit max-[768px]:h-auto  max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 w-full">
            <Agenda />
          </div>
          <div className="bg-dayComponentBg max-[1280px]:flex max-[1280px]:justify-center max-[1280px]:items-center  max-[1280px]:flex-col  max-[1280px]:w-full  lg:scale-[1] md:scale-[0.9] border-stepBorder1 border-2 rounded-xl  max-[768px]:h-auto w-[400px] max-[768px]:mx-auto max-[768px]:w-[23rem]  mb-5 justify-center items-center">
            <AppointmentRequestList />
          </div>
        </div>
        <div className="block lg:flex  bg-dayComponentBg lg:mx-[4rem] ">
          <div className="bg-dayComponentBg  lg:scale-[1] md:scale-[0.9] lg:mr-[1rem]  shadow-xl border-stepBorder1 border-2 rounded-xl max-[768px]:mx-[10px] flex items-center justify-center lg:w-full">
            <FullCalendarComponent />
          </div>
          <div className="flex items-center  lg:scale-[1] md:scale-[0.9] justify-center">
            <SetAppointmentTime />
          </div>
        </div>
        /
      </div>
    </>
  );
}

export default Dashboard;
