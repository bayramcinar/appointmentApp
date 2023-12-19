import React, { useState, useEffect } from "react";
import AppointmentBox from "./appointmentBox";
import CalendarBox from "./calendar";
import "../style/dayComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";

import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import RequestTimeBox from "./requestTimeBox";
import AppointmentRequest from "./appointmentRequest";

function TimeAndDate({ setReturnDate, times, selectedTimes }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateDisplay, setCurrentDateDisplay] = useState("");
  const [currentDateDisplayNotDay, setCurrentDateDisplayNotDay] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [requestForTimedDays, setRequestForTimedDays] = useState(false);
  const [appointmentRequest, setAppointmentRequest] = useState(false);
  const [requestSelectedTime, setRequestSelectedTime] = useState("");
  const [timedRequestSelectedTime, setTimesRequestSelectedTime] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const formattedDate = formatDateDisplay(selectedDate);
    setCurrentDateDisplayNotDay(formatDate(selectedDate));
    setCurrentDateDisplay(formattedDate);
  }, [selectedDate]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setSelectedTime(null);
    setRequestSelectedTime("");
    setTimesRequestSelectedTime("");
  };

  const formatDateDisplay = (date) => {
    const tarihNesnesi = new Date(date);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formattedDate = tarihNesnesi.toLocaleDateString("tr-TR", options);
    return formattedDate;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleAppointmentBoxClick = (clickedTime) => {
    const formattedReturnDate = `${currentDateDisplay} ${clickedTime} ${appointmentRequest}`;
    setReturnDate(formattedReturnDate);
    setSelectedTime(clickedTime);
  };

  const renderSwiper = (times) => {
    const swiperSlides = [];
    const slidesPerRow = isMobile ? 9 : 4; // Set the number of slides per row based on the screen size

    if (!isMobile) {
      for (let i = 0; i < times.length; i += slidesPerRow) {
        const currentTimes = times.slice(i, i + slidesPerRow);
        // Sort currentTimes array by time in ascending order
        const sortedTimes = currentTimes.sort((a, b) => {
          const timeA = a.time.split(":").join("");
          const timeB = b.time.split(":").join("");
          return parseInt(timeA) - parseInt(timeB);
        });

        const swiperSlide = (
          <SwiperSlide key={i}>
            <div
              className={`flex flex-wrap items-center justify-center ${
                timedRequestSelectedTime !== "" ? "hidden" : "block"
              }  appointmentBoxArea mr-auto ml-auto`}
            >
              {sortedTimes.map((time, index) => (
                <>
                  <AppointmentBox
                    key={index}
                    time={time.time}
                    onTimeClick={handleAppointmentBoxClick}
                    selectedTime={selectedTime}
                    active={time.active}
                    date={time.date}
                  />
                </>
              ))}
            </div>
          </SwiperSlide>
        );
        swiperSlides.push(swiperSlide);
      }
    } else {
      for (let i = 0; i < times.length; i += 9) {
        const currentTimes = times.slice(i, i + 9);
        // Sort currentTimes array by time in ascending order
        const sortedTimes = currentTimes.sort((a, b) => {
          const timeA = a.time.split(":").join("");
          const timeB = b.time.split(":").join("");
          return parseInt(timeA) - parseInt(timeB);
        });

        const swiperSlide = (
          <SwiperSlide key={i}>
            <div
              className={`flex flex-wrap items-center justify-center ${
                timedRequestSelectedTime !== "" ? "hidden" : "block"
              }  appointmentBoxArea mr-auto ml-auto`}
            >
              {sortedTimes.map((time, index) => (
                <>
                  <AppointmentBox
                    key={index}
                    time={time.time}
                    onTimeClick={handleAppointmentBoxClick}
                    selectedTime={selectedTime}
                    active={time.active}
                    date={time.date}
                  />
                </>
              ))}
            </div>
          </SwiperSlide>
        );
        swiperSlides.push(swiperSlide);
      }
    }

    return (
      <Swiper
        mousewheel={!isMobile ? true : false}
        direction={isMobile ? "horizontal" : "vertical"}
        pagination={
          isMobile
            ? {
                clickable: true,
                dynamicBullets: true,
              }
            : {
                clickable: true,
                dynamicBullets: true,
              }
        }
        navigation={
          isMobile
            ? {
                prevEl: ".custom-swiper-button-prev",
                nextEl: ".custom-swiper-button-next",
              }
            : ""
        }
        modules={isMobile ? [Pagination, Navigation] : [Pagination, Mousewheel]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  const appointmentTimesForSelectedDate = times.filter((time) => {
    const formattedSelectedDate = formatDate(selectedDate);
    return formatDate(new Date(time.date)) === formattedSelectedDate;
  });

  function convertDateFormat(inputDate) {
    const [day, month, year] = inputDate.split("-");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const handleFormSubmit = (values) => {
    const isTimeAlreadyBooked = selectedTimes.some((timeObj) => {
      const selectedTime = values.time;
      const selectedDateReuest = selectedDate;
      return (
        timeObj.time === selectedTime &&
        timeObj.date === convertDateFormat(formatDate(selectedDateReuest))
      );
    });
    console.log(isTimeAlreadyBooked);
    if (isTimeAlreadyBooked) {
      Swal.fire({
        title: "Hata !",
        text: "Bu randevu saati zaten randevu listesinde var.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    setRequestSelectedTime(values.time);
    setTimesRequestSelectedTime(values.time);
    closeModalRequest();
  };

  const openModalRequest = () => {
    setAppointmentRequest(true);
  };

  const closeModalRequest = () => {
    setAppointmentRequest(false);
  };

  return (
    <>
      <div className="animate__animated animate__fadeInLeft">
        <div className="title">
          <h2 className="text-buttonColor text-center text-3xl font-bold p-3">
            Tarih ve Zaman Seçiniz
          </h2>
        </div>
        <div className="bg-dayComponentBg dayComponent flex flex-col md:flex-row  m-3 lg:w-[34rem] lg:h-[20rem] md:w-[25rem] sm:w-[25rem] md:h-[40rem] sm:h-[40rem]">
          <div className="flex flex-col items-center justify-between lg:order-1  max-[768px]:order-2 lg:w-[10rem] border-2 border-buttonColor rounded-2xl shadow-xl lg:mr-3 bg-white rightMobile md:w-[25rem] max-[768px]:h-auto">
            <div className="choosenDate h-[62px]">
              <div className="dateText m-2">
                <h2 className="text-center text-buttonColor text-md font-semibold  w-[100px]">
                  {currentDateDisplay}
                </h2>
              </div>
            </div>
            {appointmentTimesForSelectedDate.length > 0 && (
              <div className="flex flex-col items-center justify-center">
                {timedRequestSelectedTime === "" && (
                  <>
                    <h1 className="text-xs text-red-600 font-semibold text-center">
                      Size uyan bir saat yoksa randevu talebi oluşturabilirsiniz
                    </h1>
                    <button
                      className="bg-callNowButtonColor rounded-2xl p-1 px-6 text-white text-sm mt-[5px] mb-[10px]"
                      onClick={() => {
                        setAppointmentRequest(!appointmentRequest);
                        setRequestForTimedDays(!requestForTimedDays);
                        setAppointmentRequest(!appointmentRequest); // setRequest(!request) korunuyor
                      }}
                    >
                      Talep oluştur
                    </button>
                  </>
                )}
                {timedRequestSelectedTime !== "" &&
                  formatDate(selectedDate) === currentDateDisplayNotDay && (
                    <>
                      <h2 className="text-sm text-buttonColor text-center font-semibold mt-[8px]">
                        Seçtiğiniz randevu talebi saati
                      </h2>
                      <h2 className="text-sm text-buttonColor text-center font-semibold mb-[8px] ml-auto mr-auto">
                        (Lütfen aşağıdan seçiniz ! )
                      </h2>
                      <RequestTimeBox
                        key={formatDate(selectedDate)}
                        time={requestSelectedTime}
                        date={formatDate(selectedDate)}
                        selectedTime={selectedTime}
                        onTimeClick={handleAppointmentBoxClick}
                      />
                    </>
                  )}
                {timedRequestSelectedTime !== "" && (
                  <>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          setAppointmentRequest(!appointmentRequest)
                        }
                        className="bg-appoinmentBox font-semibold text-sm text-white p-1 px-6 rounded-2xl"
                      >
                        <i class="fa-solid fa-file-pen"></i> Düzenle
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="leftArea flex-1 md:mr-[0px] lg:w-[10rem] lg:h-[10rem] max-[768px]:w-[24rem] max-[768px]:h-auto">
              <div
                className={`appointmentTimes relative lg:w-[10rem] ${
                  appointmentTimesForSelectedDate.length > 0
                    ? "lg:h-[10rem]"
                    : "lg:h-[13rem]"
                } flex flex-col items-center justify-center max-[768px]:w-[24rem] max-[768px]:h-auto`}
              >
                {isMobile && appointmentTimesForSelectedDate.length > 9 && (
                  <>
                    <div className="custom-swiper-button-prev absolute left-3 top-[41%] text-xl text-buttonColor z-[2] cursor-pointer">
                      <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                    </div>
                    <div className="custom-swiper-button-next absolute right-3 top-[41%] text-xl text-buttonColor z-[2] cursor-pointer">
                      <i className="fa-solid fa-arrow-right" alt="Next"></i>
                    </div>
                  </>
                )}
                {appointmentTimesForSelectedDate.length > 0 ? (
                  renderSwiper(appointmentTimesForSelectedDate)
                ) : (
                  <>
                    <div
                      className={`flex flex-wrap items-center justify-center lg:w-[10rem] appointmentBoxArea mr-auto ml-auto`}
                    >
                      {requestSelectedTime === "" && (
                        <>
                          <p className="text-red-500 text-center text-sm">
                            Uygun saatler bulunamadı.
                          </p>
                          <p className="text-red-500 text-center text-sm">
                            (İsterseniz randevu talebi oluşturabilirsiniz)
                          </p>
                        </>
                      )}
                      {requestSelectedTime === "" && (
                        <button
                          className="bg-callNowButtonColor rounded-2xl p-1 px-6 text-white text-sm mt-[15px]"
                          onClick={() => {
                            setAppointmentRequest(!appointmentRequest);
                            setAppointmentRequest(!appointmentRequest);
                          }}
                        >
                          Talep oluştur
                        </button>
                      )}
                      {requestSelectedTime !== "" &&
                        formatDate(selectedDate) ===
                          currentDateDisplayNotDay && (
                          <>
                            <h2 className="text-sm text-buttonColor text-center font-semibold mt-[8px]">
                              Seçtiğiniz randevu talebi saati
                            </h2>
                            <h2 className="text-sm text-buttonColor text-center font-semibold mb-[8px] ml-auto mr-auto">
                              (Lütfen aşağıdan seçiniz ! )
                            </h2>
                            <RequestTimeBox
                              key={formatDate(selectedDate)}
                              time={requestSelectedTime}
                              date={formatDate(selectedDate)}
                              selectedTime={selectedTime}
                              onTimeClick={handleAppointmentBoxClick}
                            />
                          </>
                        )}
                      {requestSelectedTime !== "" && (
                        <>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() =>
                                setAppointmentRequest(!appointmentRequest)
                              }
                              className="bg-appoinmentBox font-semibold text-sm text-white p-1 px-6 rounded-2xl"
                            >
                              <i class="fa-solid fa-file-pen"></i> Düzenle
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="max-[768px]:mb-[10px] rightArea max-[768px]:flex-1 flex items-center justify-center md:order-2 border-2 border-buttonColor rounded-2xl shadow-xl bg-white md:h-[20rem]">
            <CalendarBox
              selectedDate={selectedDate}
              onDateChange={(value) => {
                handleDateChange(value); // Call the prop to update selectedDate
              }}
            />
          </div>
        </div>
      </div>
      {appointmentRequest === true && (
        <AppointmentRequest
          date={selectedDate}
          isOpen={openModalRequest}
          onClose={closeModalRequest}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

export default TimeAndDate;
