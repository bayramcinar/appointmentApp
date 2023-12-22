import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";

function Dashboard() {
  return (
    <>
      <div className="bg-dayComponentBg">
        <AppointmentInfos />
      </div>
      <div className="flex items-center justify-center bg-dayComponentBg pb-8">
        <div className="bg-dayComponentBg mr-[50px] mt-[50px] shadow-xl border-stepBorder1 border-2 rounded-xl">
          <FullCalendarComponent />
        </div>
        <div>
          <SetAppointmentTime />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
