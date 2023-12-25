import React from "react";
import "../style/myAppointments.css";

function AppointmentRequestBox({
  image,
  infos,
  onAccept,
  onReject,
  onDetails,
}) {
  const addDurationToStartTime = (startTime, duration) => {
    const durationMinutes = parseInt(duration, 10);
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const endTime = `${hours + endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}`;

    return endTime;
  };

  const startTime = infos.time;
  const endTime = addDurationToStartTime(startTime, infos.duration);

  return (
    <>
      <div className="bg-white myAppointmentBox lg:w-[280px] h-[250px] max-[768px]:w-[320px] mb-5 ml-auto mr-auto border-2 border-buttonColor rounded-2xl shadow-2xl">
        <div className="p-2 flex flex-col">
          <div className="flex">
            <div className="imgArea1 w-1/3 flex items-center justify-center">
              <img src={image} className="w-20" alt="" />
            </div>
            <div className="infoArea w-2/3">
              <h1 className="text-sm text-red-600 p-1 text-center font-semibold m-1">
                Bu bir randevu talebidir.
              </h1>
              <div className="forWho flex">
                <i className="fa-solid fa-circle mt-[3px] text-[15px] text-callNowButtonColor"></i>
                <h2 className="text-[14px] font-bold ml-2">
                  {infos.kimIçin} İçin
                </h2>
              </div>
              <div className="flex">
                <i className="fa-regular fa-clock mt-[9px] text-callNowButtonColor text-[15px]"></i>
                <h1 className="text-xs text-buttonColor p-1 text-left font-semibold m-1">
                  {startTime} - {endTime}
                </h1>
                <h1 className="text-xs text-buttonColor py-1 text-left font-semibold my-1">
                  ({infos.duration} Dakika)
                </h1>
              </div>
              <div className="flex">
                <i className="fa-solid fa-hospital-user mt-[9px] text-callNowButtonColor text-[15px]"></i>
                <h1 className="text-xs text-buttonColor p-1 text-left font-semibold m-1">
                  {infos.service}
                </h1>
              </div>
            </div>
          </div>
          <div className="buttonsArea flex justify-center items-center mt-4">
            <button
              onClick={onAccept}
              className="p-2 bg-green-500 text-white text-sm font-semibold rounded-lg mx-2"
            >
              Onayla
            </button>
            <button
              onClick={onReject}
              className="p-2 bg-red-500 text-white text-sm font-semibold rounded-lg"
            >
              Reddet
            </button>
            <button
              onClick={() => onDetails()}
              className="p-2 bg-lightBlue text-white text-sm font-semibold rounded-lg mx-2"
            >
              Detaylar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentRequestBox;
