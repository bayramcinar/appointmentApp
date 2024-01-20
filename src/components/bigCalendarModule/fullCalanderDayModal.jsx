import React, { useState, useEffect } from "react";
import FullCalanderTimeBox from "./fullCalanderTimeBox";

const FullCalendarDayModal = ({ isOpen, onClose, time }) => {
  function formatTurkishDate(inputDate) {
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];

    const dateComponents = inputDate.split("-");
    const year = parseInt(dateComponents[0]);
    const monthIndex = parseInt(dateComponents[1]) - 1; // Months are 0-indexed in JavaScript
    const day = parseInt(dateComponents[2]);

    const formattedDate = `${day} ${months[monthIndex]} ${
      days[new Date(year, monthIndex, day).getDay()]
    }`;
    return formattedDate;
  }
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [choosenTimes, setChoosenTimes] = useState([]);
  const [selectedFormDatas, setSelectedFormDatas] = useState([]);
  const [choosenFormDatas, setChoosenFormDatas] = useState([]);
  const [cancelledTimes, setCancelledTimes] = useState([]);
  const [completedTimes, setCompletedTimes] = useState([]);
  function convertToISODate(inputDate) {
    const dateComponents = inputDate.split(/\s|\./);

    const day = dateComponents[0];
    const month = dateComponents[1];
    const year = dateComponents[2];

    const isoFormattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    return isoFormattedDate;
  }

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = convertToISODate(
      currentDate.toLocaleDateString()
    );

    const completedAppointments = selectedFormDatas.filter(
      (formData) =>
        formData.delete &&
        convertToISODate(formData.time) < formattedCurrentDate
    );
    setCompletedTimes(completedAppointments.map((formData) => formData.time));
  });

  useEffect(() => {
    const storedSelectedTimes = localStorage.getItem("selectedTimes");
    if (storedSelectedTimes) {
      const parsedSelectedTimes = JSON.parse(storedSelectedTimes);
      setSelectedTimes(parsedSelectedTimes);
    }
    const storedSelectedFormDatas = localStorage.getItem("formData");
    if (storedSelectedFormDatas) {
      const parsedSelectedFormDatas = JSON.parse(storedSelectedFormDatas);
      setSelectedFormDatas(parsedSelectedFormDatas);
    }
    const filteredTimes = selectedTimes.filter(
      (timeObj) => timeObj.date === time
    );
    setChoosenTimes(filteredTimes);

    const filteredFormDatas = selectedFormDatas.filter(
      (timeObj) => convertToISODate(timeObj.time) === time
    );
    setChoosenFormDatas(filteredFormDatas);
  });
  const deletedTimes = choosenFormDatas
    .filter((formData) => formData.delete)
    .map((formData) => formData.time);

  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";
  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative w-auto max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown">
          <div className="flex items-center justify-center ">
            <div className="titleModal m-3">
              <h1 className="text-center text-lg mr-auto ml-auto w-full mb-0 font-semibold">
                {formatTurkishDate(time)}
              </h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 absolute right-5"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="relative">
            <div className="colorsMean mt-[25px] mb-5 right-1 top-1 font-semibold justify-center items-center">
              <div className="">
                <div className="flex max-[500px]:mr-2 mr-2 items-center justify-center">
                  <i class="fa-solid fa-circle text-green-500 max-[500px]:text-sm flex justify-center items-center"></i>
                  <h1 className="max-[500px]:text-sm text-[#000000a8]  ml-2 max-[500px]:text-center flex justify-center items-center">
                    Dolu Randevular
                  </h1>
                </div>
                <div className="flex flex-wrap items-center justify-center w-[500px] max-[768px]:w-[300px] mx-auto my-1">
                  {choosenTimes.filter((time) => time.active === false).length >
                  0 ? (
                    choosenTimes.map((time, index) =>
                      time.active === false ? (
                        <React.Fragment key={index}>
                          <FullCalanderTimeBox
                            key={index}
                            bg={"green"}
                            time={time.time}
                            date={time.date}
                            duration={time.duration}
                          />
                        </React.Fragment>
                      ) : null
                    )
                  ) : (
                    <h1 className="text-center text-coral font-semibold text-sm m-1">
                      Dolu Randevu Bulunmamaktadır.
                    </h1>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex max-[500px]:mr-2 mr-2 items-center justify-center">
                  <i class="fa-solid fa-circle text-calanderAppointment max-[500px]:text-sm  flex justify-center items-center"></i>
                  <h1 className="max-[500px]:text-sm  text-[#000000a8] ml-2 max-[500px]:text-center flex justify-center items-center">
                    Boş Randevular
                  </h1>
                </div>
                <div className="flex flex-wrap items-center justify-center w-[500px] max-[768px]:w-[300px] mx-auto  my-1">
                  {choosenTimes.filter((time) => time.active === true).length >
                  0 ? (
                    choosenTimes.map((time, index) =>
                      time.active === true ? (
                        <React.Fragment key={index}>
                          <FullCalanderTimeBox
                            key={index}
                            bg={"orange"}
                            active={time.active}
                            time={time.time}
                            date={time.date}
                            duration={time.duration}
                          />
                        </React.Fragment>
                      ) : null
                    )
                  ) : (
                    <h1 className="text-center text-coral font-semibold text-sm m-1">
                      Boş Randevu Bulunmamaktadır.
                    </h1>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex max-[500px]:mr-2 mr-2 items-center justify-center">
                  <i class="fa-solid fa-circle text-stepBorder1 max-[500px]:text-sm   flex justify-center items-center"></i>
                  <h1 className="max-[500px]:text-sm text-[#000000a8] ml-2 max-[500px]:text-center flex justify-center items-center">
                    Tamamlanmış Randevular
                  </h1>
                </div>
                <div className="flex flex-wrap items-center justify-center w-[500px] max-[768px]:w-[300px] mx-auto  my-1">
                  {completedTimes.length > 0 ? (
                    completedTimes.map((time, index) => (
                      <React.Fragment key={index}>
                        <FullCalanderTimeBox
                          key={index}
                          bg={"gray"}
                          time={time.split(" ")[2]}
                          date={time.split(" ")[0]}
                          duration={90}
                        />
                      </React.Fragment>
                    ))
                  ) : (
                    <h1 className="text-center text-coral font-semibold text-sm m-1">
                      Tamamlanmış Randevu Bulunmamaktadır.
                    </h1>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex max-[500px]:mr-2 mr-2 items-center justify-center">
                  <i class="fa-solid fa-circle text-coral max-[500px]:text-sm  flex  justify-center items-center"></i>
                  <h1 className="max-[500px]:text-sm text-[#000000a8] ml-2 max-[500px]:text-center flex justify-center items-center">
                    İptal Edilen Randevular
                  </h1>
                </div>
                <div className="flex flex-wrap items-center justify-center w-[500px] max-[768px]:w-[300px] mx-auto  my-1">
                  {deletedTimes.length > 0 ? (
                    deletedTimes.map((time, index) => (
                      <React.Fragment key={index}>
                        <FullCalanderTimeBox
                          key={index}
                          bg={"red"}
                          time={time.split(" ")[2]}
                          date={time.split(" ")[0]}
                          duration={90}
                        />
                      </React.Fragment>
                    ))
                  ) : (
                    <h1 className="text-center text-coral font-semibold text-sm m-1">
                      İptal Edilen Randevu Bulunmamaktadır.
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCalendarDayModal;
