import React, { useState, useEffect } from "react";
import "../style/myAppointments.css";

function FullCalendarAppointmentBox({ image, infos, onDelete }) {
  const [request, setRequest] = useState(false);
  function extractTimeFromDate(dateString) {
    const parse = dateString.split(" ");
    const time = parse[2];
    return time;
  }

  const duration = infos["duration"];
  const time = extractTimeFromDate(infos["time"]);
  const durationMinutes = parseInt(duration, 10);
  const [hours, minutes] = time.split(":").map(Number);
  const endHours = Math.floor((minutes + durationMinutes) / 60);
  const endMinutes = (minutes + durationMinutes) % 60;
  const endTime = `${hours + endHours}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
  const isRequestFunction = () => {
    const timeArray = infos["time"].split(" ");
    const trueValue = timeArray[timeArray.length - 2];
    const isRequest = trueValue.toLowerCase() === "true";
    return isRequest;
  };

  useEffect(() => {
    const isRequest = isRequestFunction();
    if (isRequest !== request) {
      setRequest(true);
    }
  }, [infos, request]);

  const removeTrueValue = (timeString) => {
    const stringWithoutTrue = timeString.includes("true")
      ? timeString.replace("true", "")
      : timeString;

    const stringWithoutFalse = stringWithoutTrue.includes("false")
      ? stringWithoutTrue.replace("false", "")
      : stringWithoutTrue;

    return stringWithoutFalse;
  };

  return (
    <div className="bg-white myAppointmentBox lg:w-[500px] max-[768px]:w-[320px] mb-5 ml-auto mr-auto border-2 border-deepSlateBlue rounded-2xl shadow-2xl">
      <div className="p-2 flex">
        <div className="imgArea1 w-1/3 flex items-center justify-center">
          <img src={image} className="w-20" alt="" />
        </div>
        {infos["kimIçin"] === "Kendim" && (
          <div className="infoAreaForOwn w-2/3">
            {request && (
              <h1 className="text-sm text-coral text-center font-semibold m-1 ">
                Bu bir randevu talebidir.
              </h1>
            )}
            <div className="forWho flex">
              <i class="fa-solid fa-circle mt-[3px] text-[15px] text-deepSlateBlue"></i>
              <h2 className="text-[14px] font-bold ml-2">
                {infos["kimIçin"]} İçin
              </h2>
            </div>
            <div className="flex ">
              <i class="fa-regular fa-clock mt-[9px] text-deepSlateBlue text-[15px]"></i>
              <h1 className="text-xs  p-1 text-left font-semibold m-1">
                {extractTimeFromDate(infos["time"])} - {endTime}
              </h1>
              <h1 className="text-xs  py-1  text-left font-semibold my-1">
                ({infos["duration"]} Dakika)
              </h1>
            </div>
            <div className="flex">
              <i class="fa-solid fa-hospital-user  mt-[9px] text-deepSlateBlue text-[15px]"></i>
              <h1 className="text-xs  p-1 text-left font-semibold m-1">
                {infos["service"]}
              </h1>
            </div>
          </div>
        )}
        {infos["kimIçin"] === "Başkası" && (
          <div className="infoAreaForSomeOne w-2/3">
            <div className="forWho flex">
              <i class="fa-solid fa-circle mt-[3px] text-[15px] text-deepSlateBlue"></i>
              <h2 className="text-[14px] font-bold ml-2">
                {infos["kimIçin"]} İçin
              </h2>
            </div>
            <div className="personalInfo flex">
              <i class="fa-solid fa-user mt-[8px] text-[15px] text-deepSlateBlue"></i>
              <h1 className="text-xs  p-1 text-left font-semibold m-1">
                {infos["firstName"]} {infos["lastName"]} ({infos["gender"]})
                (Doğum Tarihi :{infos["dateOfBirth"]})
              </h1>
            </div>

            <div className="flex">
              <i class="fa-regular fa-clock mt-[9px] text-deepSlateBlue text-[15px]"></i>
              <h1 className="text-xs  p-1 text-left font-semibold m-1">
                {extractTimeFromDate(infos["time"])} - {endTime}
              </h1>
              <h1 className="text-xs py-1  text-left font-semibold my-1">
                ({infos["duration"]} Dakika)
              </h1>
            </div>
            <div className="flex">
              <i class="fa-solid fa-hospital-user  mt-[9px] text-deepSlateBlue text-[15px]"></i>
              <h1 className="text-xs  p-1 text-left font-semibold m-1">
                {infos["service"]}
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="notesArea mt-[8px] border-2 border-deepSlateBlue rounded-xl mx-8 my-3">
        <div className="p-3">
          <div className="flex">
            <i className="fa-solid fa-book text-xl text-deepSlateBlue"></i>
            <h2 className="text-xl ml-2 text-deepSlateBlue font-semibold">
              Notlar
            </h2>
          </div>
          <p className="text-sm">{infos["notes"]}</p>
        </div>
      </div>
    </div>
  );
}

export default FullCalendarAppointmentBox;
