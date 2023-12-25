import React from "react";
import FullCalendarComponent from "./fullCalendar";
import SetAppointmentTime from "./setAppointmentTime";
import AppointmentInfos from "./appointmentInfos";
import SetSavedTime from "./setSavedTime";
import SetSavedDuration from "./setSavedDuration";
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
        <div className="flex items-center justify-center bg-dayComponentBg pb-8">
          {/* Ekran genişliği 768 pikselden büyükse (mobil ekran değilse) FullCalendarComponent göster */}
          <div className="bg-dayComponentBg mr-[9rem] mt-[50px] shadow-xl border-stepBorder1 border-2 rounded-xl hidden md:block">
            <FullCalendarComponent />
          </div>
          <div>
            <SetAppointmentTime />
          </div>
        </div>
        <div className="flex max-[768px]:block">
          <div className="flex justify-start bg-dayComponentBg pb-8 w-[100%]">
            <div className="w-[750px] ml-[9rem] max-[768px]:ml-[1rem] bg-dayComponentBg setAppointmentTime flex flex-col shadow-xl border-stepBorder1 border-2 rounded-xl">
              <h1 className="text-buttonColor text-2xl text-center font-semibold mt-5">
                Kayıtlı alan ekleme
              </h1>
              <div className="flex m-5 mt-0 justify-center max-[768px]:block">
                <SetSavedTime />
                <SetSavedDuration />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-dayComponentBg pb-8 w-[100%] pl-5 pr-[9rem] max-[768px]:pr-[2rem]">
            <SetService />
          </div>
        </div>
        <div className="w-[100%] bg-dayComponentBg ">
          <div className="flex justify-start bg-dayComponentBg pb-8 lg:mx-[9rem] max-[768px]:mx-[2rem]">
            <Agenda />
          </div>
        </div>
        <div className="bg-dayComponentBg border-stepBorder1 border-2 rounded-xl mx-[9rem] max-[768px]:h-auto  max-[768px]:mx-[2rem] b-5">
          <h1 className="text-buttonColor text-2xl text-center font-semibold mt-3">
            Randevu Talepleri
          </h1>
          <AppointmentRequestList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
