import React, { useState, useEffect } from "react";
import "../style/myAppointments.css";

function MyAppointmentBox({ image, infos, onDelete }) {
  const [request, setRequest] = useState(false);

  const handleDelete = () => {
    // randevulari silmeye yarayan fonksiyon
    onDelete(infos);
  };

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
    <div className="bg-white myAppointmentBox lg:w-[500px] max-[768px]:w-[320px] mb-5 rounded-lg ml-auto mr-auto">
      <div className="p-2 flex">
        <div className="imgArea1 w-1/3 flex items-center justify-center">
          <img src={image} className="w-20" alt="" />
        </div>
        {infos["kimIçin"] === "Kendim" && (
          <div className="infoAreaForOwn w-2/3">
            {request && (
              <h1 className="text-sm text-red-600 p-1 text-center font-semibold m-1">
                Bu bir randevu talebidir.
              </h1>
            )}
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {infos["kimIçin"]} için ({infos["notes"]})
            </h1>
            <div className="flex ">
              <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
                {removeTrueValue(infos["time"])}
              </h1>
              <h1 className="text-xs text-buttonColor py-1  text-left font-medium my-1">
                ({infos["duration"]} Dakika)
              </h1>
            </div>
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {infos["service"]}
            </h1>
          </div>
        )}
        {infos["kimIçin"] === "Başkası" && (
          <div className="infoAreaForSomeOne w-2/3">
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {infos["kimIçin"]} için ({infos["notes"]})
            </h1>
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {infos["firstName"]} {infos["lastName"]} ({infos["gender"]})
              (Doğum Tarihi :{infos["dateOfBirth"]})
            </h1>
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {removeTrueValue(infos["time"])}
            </h1>
            <h1 className="text-xs text-buttonColor p-1 text-left font-medium m-1">
              {infos["service"]}
            </h1>
          </div>
        )}
        <div className="deleteArea flex items-center justify-center m-1">
          <button onClick={handleDelete} className="text-red">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAppointmentBox;
