import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";
import SetSavedTime from "./setSavedTime";
import SetSavedDuration from "./setSavedDuration";

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
      <div className="flex justify-start bg-dayComponentBg pb-8">
        <div className="w-[750px] ml-[190px] bg-dayComponentBg setAppointmentTime flex flex-col shadow-xl border-stepBorder1 border-2 rounded-xl">
          <h1 className="text-buttonColor text-2xl text-center font-semibold mt-5">
            Kayıtlı alan ekleme
          </h1>
          <div className="flex m-5 mt-0 justify-center">
            <SetSavedTime />
            <SetSavedDuration />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
