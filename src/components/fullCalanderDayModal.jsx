import React, { useState, useEffect } from "react";
import pp from "../images/pp.png";
import FullCalendarAppointmentBox from "./fullCalendarAppointmentBox";
import FullCalanderTimeBox from "./fullCalanderTimeBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const FullCalendarDayModal = ({ isOpen, onClose, time }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [choosenTimes, setChoosenTimes] = useState([]);
  const [selectedFormDatas, setSelectedFormDatas] = useState([]);
  const [choosenFormDatas, setChoosenFormDatas] = useState([]);
  function convertToISODate(inputDate) {
    // Split the input date by space or dot
    const dateComponents = inputDate.split(/\s|\./);

    // Extract day, month, and year
    const day = dateComponents[0];
    const month = dateComponents[1];
    const year = dateComponents[2];

    // Format the date in ISO 8601 format (YYYY-MM-DD)
    const isoFormattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    return isoFormattedDate;
  }

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
  const renderSwiper = (appointments) => {
    //en fazla alt alta 2 tane randevu görüntülememizi sağlayan kod
    console.log(appointments);
    const swiperSlides = [];
    for (let i = 0; i < appointments.length; i += 2) {
      const choosenFormDatas = appointments.slice(i, i + 2);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center appointmentBoxArea">
            {choosenFormDatas.map((formData, index) => (
              <FullCalendarAppointmentBox
                key={index}
                infos={formData}
                image={pp}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }
    return (
      <Swiper
        navigation={{
          prevEl: ".custom-swiper-button-prev1",
          nextEl: ".custom-swiper-button-next1",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";
  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative w-auto max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown">
          <div className="flex items-center justify-center ">
            <div className="titleModal m-3">
              <h1 className="text-center text-lg mr-auto ml-auto w-full mb-0">
                {time} Tarihindeki Randevular
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
            <div className=" flex items-center justify-center">
              <div className="border-b-2 border-deepSlateBlue w-fit">
                <h1 className="text-[17px]  font-semibold text-center text-deepSlateBlue">
                  Hala Randevu alınmayan veya süresi geçmiş saatler
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center">
              {choosenTimes.filter((time) => time.active === true).length >
              0 ? (
                choosenTimes.map((time, index) =>
                  time.active === true ? (
                    <React.Fragment key={index}>
                      <FullCalanderTimeBox
                        key={index}
                        active={time.active}
                        time={time.time}
                        date={time.date}
                        duration={time.duration}
                      />
                    </React.Fragment>
                  ) : null
                )
              ) : (
                <h1 className="text-center text-coral font-semibold text-lg m-3">
                  Tüm Randevu Saatleri Dolmuştur.
                </h1>
              )}
            </div>

            <div className=" flex items-center justify-center">
              <div className="border-b-2 border-deepSlateBlue w-fit">
                <h1 className="text-[17px] font-semibold text-center text-deepSlateBlue">
                  Randevu Alınan Saatler
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center">
              {choosenTimes.filter((time) => time.active === false).length >
              0 ? (
                choosenTimes.map((time, index) =>
                  time.active === false ? (
                    <React.Fragment key={index}>
                      <FullCalanderTimeBox
                        key={index}
                        active={time.active}
                        time={time.time}
                        date={time.date}
                        duration={time.duration}
                      />
                    </React.Fragment>
                  ) : null
                )
              ) : (
                <h1 className="text-center text-coral font-semibold text-lg m-3">
                  Henüz Randevu Alınmamıştır.
                </h1>
              )}
            </div>
            <div className=" flex items-center justify-center m-3 mt-0">
              <div className="border-b-2 border-deepSlateBlue w-fit">
                <h1 className="text-[17px] font-semibold text-center text-deepSlateBlue">
                  Randevular
                </h1>
              </div>
            </div>
            <div className="swipperAppointments lg:w-[35rem] lg:h-auto relative">
              {choosenFormDatas.length > 2 ? (
                renderSwiper(choosenFormDatas)
              ) : (
                <>
                  {choosenFormDatas.map((appointmentData, index) => (
                    <FullCalendarAppointmentBox
                      key={index}
                      infos={appointmentData}
                      image={pp}
                    />
                  ))}
                </>
              )}
              {choosenFormDatas.length > 2 && (
                <>
                  <div className="custom-swiper-button-prev1 absolute left-0 top-[45%] text-xl text-deepSlateBlue cursor-pointer z-[2]">
                    <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                  </div>
                  <div className="custom-swiper-button-next1 absolute right-0 top-[45%] text-xl text-deepSlateBlue cursor-pointer z-[2]">
                    <i className="fa-solid fa-arrow-right" alt="Next"></i>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCalendarDayModal;
