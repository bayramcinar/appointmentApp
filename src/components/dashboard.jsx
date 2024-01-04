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
        <div className="block lg:flex lg:mx-[4rem] items-stretch justify-center lg:scale-[0.80] md:scale-[0.85] xl:scale-[1]">
          <div className="bg-dayComponentBg lg:scale-[1] md:scale-[0.9] lg:mr-[1rem] border-stepBorder1 border-2 rounded-xl max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 w-full flex-grow">
            <Agenda />
          </div>

          <div className="bg-dayComponentBg max-[1023px]:flex max-[1023px]:justify-center max-[1023px]:items-center max-[1023px]:flex-col max-[1023px]:w-full lg:scale-[1] md:scale-[0.9] border-stepBorder1 border-2 rounded-xl w-[400px] max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 justify-center items-center flex-grow">
            <AppointmentRequestList />
          </div>
        </div>

        <div className="block lg:flex  bg-dayComponentBg lg:mx-[4rem] pb-5">
          <div className="bg-dayComponentBg  lg:scale-[1] md:scale-[0.9] lg:mr-[1rem]  shadow-xl border-stepBorder1 border-2 rounded-xl max-[768px]:mx-[10px] flex items-center justify-center lg:w-full">
            <FullCalendarComponent />
          </div>
          <div className="flex items-center border-stepBorder1  p-[1vw] w-[auto] max-[768px]:p-1 max-[768px]:max-w-[380px] max-[768px]:mt-10 ml-auto mr-auto lg:h-auto sm:h-auto lg:min-h-[35vw]  border-2 shadow-xl rounded-xl lg:scale-[1] md:scale-[0.9] justify-center">
            <SetAppointmentTime />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
