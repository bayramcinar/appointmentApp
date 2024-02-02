import React, { useState, useEffect } from "react";
import AppointmentBox from "./appointmentBox";
import CalendarBox from "./calendar";
import "../../style/dayComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import RequestTimeBox from "./requestTimeBox";
import AppointmentRequest from "./appointmentRequest";

function TimeAndDate({
  setReturnDate,
  times,
  selectedTimes,
  setRequest,
  request,
  setDuration1,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateDisplay, setCurrentDateDisplay] = useState(""); //GÜNCEL DATE İ ATADIĞIMIZ DEĞİŞKEN
  const [currentDateDisplayNotDay, setCurrentDateDisplayNotDay] = useState(""); //GÜNCEL DATE İ GÜN OLMADAN ATADIĞIMIZ DEĞİŞKEN
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // EKRANIN MOBİL OLUP OLMADIĞINI ATADIĞIMIZ DEĞİŞKEN
  const [requestForTimedDays, setRequestForTimedDays] = useState(false); // RANDEVU SAATİ OLAN GÜNLERDE TALEP OLUŞUTURUP OLUŞTURMADIĞMIZI ATADIĞIMIZ DEĞİŞKEN

  const [appointmentRequestNormal, setAppointmentRequestNormal] =
    useState(false); // RANDEVU SAATİ OLMAYAN GÜNCE RANDEVU TALEP OLUŞUTURUP OLUŞTURMADIĞMIZI ATADIĞIMIZ DEĞİŞKEN
  const [appointmentRequest, setAppointmentRequest] = useState(false);
  const [requestSelectedTime, setRequestSelectedTime] = useState(""); //TALEP OLUŞTURURKEN SEÇTİĞİMİZ SAATİ ATADIĞIMIZ DEĞİŞKEN
  const [timedRequestSelectedTime, setTimesRequestSelectedTime] = useState(""); //RANDEVU SAATİ OLAN GÜNLERDE TALEP OLUŞTURURKEN SEÇTİĞİMİZ SAATİ ATADIĞIMIZ DEĞİŞKEN
  const [duration, setDuration] = useState("");
  const [requestSelectedDuration, setRequestSelectedDuration] = useState("");
  const [timedRequestSelectedDuration, setTimesRequestSelectedDuration] =
    useState("");

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
    // TARİH DEĞİŞTİRDİĞİMİZDE ÖNCEKİ BİLGİLERİN SİLİNMESİNİ SAĞLAYAN FONKSİYON
    setSelectedDate(value);
    setSelectedTime(null);
    setRequestSelectedTime("");
    setTimesRequestSelectedTime("");
    setRequestSelectedDuration("");
    setTimesRequestSelectedDuration("");
  };

  const formatDateDisplay = (date) => {
    // DATE İ TÜRKÇE FORMATA ÇEVİREN FONKSİYON
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
    // DATE İ DAY-MONTH-YEAR FORMATINA ÇEVİREN FONKSİYON
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleAppointmentBoxClickTimed = (clickedTime) => {
    //SAAT BUTONUNA TIKLADIĞIMIZDA ÇALIŞAN FONKSİYON
    const formattedReturnDate = `${currentDateDisplay} ${clickedTime} ${requestForTimedDays} ${duration}`;
    setReturnDate(formattedReturnDate);
    setSelectedTime(clickedTime);
  };

  const handleAppointmentBoxClick = (clickedTime) => {
    //SAAT BUTONUNA TIKLADIĞIMIZDA ÇALIŞAN FONKSİYON
    const formattedReturnDate = `${currentDateDisplay} ${clickedTime} ${appointmentRequestNormal} ${duration}`;
    setReturnDate(formattedReturnDate);
    setSelectedTime(clickedTime);
  };

  function formatDateToDDMMYYYY(inputDate) {
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = inputDate.getFullYear();
    const datee = `${day}-${month}-${year}`;
    return datee;
  }

  const renderSwiper = (times) => {
    const swiperSlides = [];
    const slidesPerRow = isMobile ? 9 : 4;

    const currentDate1 = new Date();
    const currentDate = formatDateToDDMMYYYY(currentDate1);
    const currentDateFormatted = currentDate;
    const currentTimeFormatted = `${currentDate1.getHours()}:${currentDate1.getMinutes()}`;

    if (!isMobile) {
      for (let i = 0; i < times.length; i += slidesPerRow) {
        const currentTimes = times.slice(i, i + slidesPerRow);
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
              {sortedTimes.map((time, index) => {
                const currentTime = moment(`${time.date} ${time.time}`);
                const currentDateTime = currentTime.toDate();
                const now = new Date();

                const isPast = currentDateTime < now;

                return (
                  <AppointmentBox
                    isMobile={isMobile}
                    key={index}
                    time={time.time}
                    duration={time.duration}
                    onTimeClick={handleAppointmentBoxClick}
                    selectedTime={selectedTime}
                    active={!isPast && time.active}
                    date={time.date}
                  />
                );
              })}
            </div>
          </SwiperSlide>
        );
        swiperSlides.push(swiperSlide);
      }
    } else {
      for (let i = 0; i < times.length; i += 9) {
        const currentTimes = times.slice(i, i + 9);
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
                    isMobile={isMobile}
                    key={index}
                    time={time.time}
                    duration={time.duration}
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

  const isDurationTime = (selectedTime, duration) => {
    // SEÇİLEN RANDEVU TALEBİ SAATİ EĞER ZATEN NORMAL RANDEVU SAATLERİ İÇİNDE VARSA TRUE DÖNDÜREN FONKSİYON
    const [selectedHour, selectedMinute] = selectedTime.split(":");
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedHour, selectedMinute);

    for (const existingTime of selectedTimes) {
      const existingDateTime = new Date(existingTime.date);
      existingDateTime.setHours(
        existingTime.time.split(":")[0],
        existingTime.time.split(":")[1]
      );
      const endTime = new Date(
        existingDateTime.getTime() + existingTime.duration * 60000
      );
      if (selectedDateTime >= existingDateTime && selectedDateTime < endTime) {
        return true;
      }
    }
    return false;
  };

  const handleFormSubmit = (values) => {
    //RANDEVUYU TAMAMLADIĞIMIZ FONKSİYON
    const selectedTime = values.time;
    const selectedDuration = appoinmentDuration;
    setDuration1(selectedDuration);

    if (selectedTime === "" || selectedDuration === "") {
      Swal.fire({
        title: "Hata!",
        text: "Lütfen tüm alanları doldurunuz.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
    } else {
      const isTimeAlreadyBooked = selectedTimes.some((timeObj) => {
        const selectedDateReuest = selectedDate;
        return (
          timeObj.time === selectedTime &&
          timeObj.date === convertDateFormat(formatDate(selectedDateReuest))
        );
      });

      if (isTimeAlreadyBooked) {
        Swal.fire({
          title: "Hata!",
          text: "Bu randevu saati zaten randevu listesinde var.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      const hasDurationConflict = isDurationTime(selectedTime, values.duration);

      if (hasDurationConflict) {
        Swal.fire({
          title: "Hata!",
          text: "Bu saat aralığı zaten bir randevu ile çakışıyor.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      setRequestSelectedDuration(selectedDuration);
      setTimesRequestSelectedDuration(selectedDuration);
      setRequestSelectedTime(selectedTime);
      setTimesRequestSelectedTime(selectedTime);
      closeModalRequest();
    }
  };

  const openModalRequest = () => {
    setAppointmentRequest(true);
  };

  const closeModalRequest = () => {
    setAppointmentRequest(false);
  };

  const appoinmentDuration = 90; //HİZMET VERENIN RANDEVU SÜRESİNİ ALACAĞIMIZ YER
  return (
    <>
      <div className="animate__animated animate__fadeInLeft">
        <div className="title">
          <h2 className=" text-center text-3xl font-bold p-3">
            Tarih ve Zaman Seçiniz
          </h2>
          <h2 className="text-premiumPurple text-center text-md font-bold">
            Ortalama randevu süresi {appoinmentDuration} dakikadır
          </h2>
        </div>
        <div className="bg-grayBg dayComponent flex flex-col md:flex-row md:h-[20rem] m-3 lg:w-[34rem] lg:h-[20rem] md:w-[25rem] sm:w-[25rem]  sm:h-[40rem]">
          <div className="flex flex-col items-center justify-between lg:order-1  max-[768px]:order-2 lg:w-[10rem]  rounded-2xl shadow-xl md:mr-3 bg-white rightMobile md:w-[25rem] max-[768px]:h-auto">
            <div className="choosenDate h-[62px]">
              <div className="dateText m-2">
                <h2 className="text-center  text-md font-semibold  w-[90px]">
                  {currentDateDisplay}
                </h2>
              </div>
            </div>
            {appointmentTimesForSelectedDate.length > 0 && (
              <div className="flex flex-col items-center justify-center">
                {timedRequestSelectedTime === "" && (
                  <>
                    <h1 className="text-xs text-[#000000a9] font-semibold text-center">
                      Size uyan bir saat yoksa randevu talebi oluşturabilirsiniz
                    </h1>
                    <button
                      className="bg-deepSlateBlue rounded-2xl p-1 px-6 text-white text-sm mt-[5px] mb-[10px]"
                      onClick={() => {
                        setRequest(true);
                        setAppointmentRequest(true);
                        setRequestForTimedDays(true);
                      }}
                    >
                      Talep oluştur
                    </button>
                  </>
                )}
                {timedRequestSelectedTime !== "" &&
                  formatDate(selectedDate) === currentDateDisplayNotDay && (
                    <>
                      <h2 className="text-sm text-gray-400 text-center font-semibold mt-[8px]">
                        Seçtiğiniz randevu talebi saati
                      </h2>
                      <h2 className="text-sm text-gray-400 text-center font-semibold mb-[8px] ml-auto mr-auto">
                        (Lütfen aşağıdan seçiniz ! )
                      </h2>
                      <RequestTimeBox
                        isMobile={isMobile}
                        key={formatDate(selectedDate)}
                        duration={timedRequestSelectedDuration}
                        time={requestSelectedTime}
                        date={formatDate(selectedDate)}
                        selectedTime={selectedTime}
                        onTimeClick={handleAppointmentBoxClickTimed}
                      />
                    </>
                  )}
                {timedRequestSelectedTime !== "" && (
                  <>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setAppointmentRequest(true)}
                        className="bg-premiumPurple font-semibold text-sm text-white p-1 px-6 rounded-2xl"
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
                    <div className="custom-swiper-button-prev absolute left-1 top-[41%] text-xl text-purpleElite z-[2] cursor-pointer">
                      <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                    </div>
                    <div className="custom-swiper-button-next absolute right-1 top-[41%] text-xl text-purpleElite z-[2] cursor-pointer">
                      <i className="fa-solid fa-arrow-right" alt="Next"></i>
                    </div>
                  </>
                )}
                {appointmentTimesForSelectedDate.length > 0 ? (
                  renderSwiper(appointmentTimesForSelectedDate)
                ) : (
                  <>
                    <div
                      className={`${
                        requestSelectedTime === "" ? "flex" : "block"
                      } flex-wrap items-center justify-center lg:w-[10rem] appointmentBoxArea mr-auto ml-auto`}
                    >
                      {requestSelectedTime === "" && (
                        <>
                          <p className="text-[#000000a8] text-center text-sm">
                            Uygun saatler bulunamadı.
                          </p>
                          <p className="text-[#000000a8] text-center text-sm">
                            (İsterseniz randevu talebi oluşturabilirsiniz)
                          </p>
                        </>
                      )}
                      {requestSelectedTime === "" && (
                        <button
                          className="bg-deepSlateBlue rounded-2xl p-1 px-6 text-white text-sm my-[15px]"
                          onClick={() => {
                            setAppointmentRequestNormal(true);
                            setRequest(true);
                            setAppointmentRequest(true);
                          }}
                        >
                          Talep oluştur
                        </button>
                      )}
                      {requestSelectedTime !== "" &&
                        formatDate(selectedDate) ===
                          currentDateDisplayNotDay && (
                          <>
                            <h2 className="text-sm text-gray-600 text-center font-semibold mt-[8px]">
                              Seçtiğiniz randevu talebi saati
                            </h2>
                            <h2 className="text-sm text-gray-600 text-center font-semibold mb-[8px] ml-auto mr-auto">
                              (Lütfen aşağıdan seçiniz ! )
                            </h2>
                            <RequestTimeBox
                              isMobile={isMobile}
                              duration={requestSelectedDuration}
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
                              onClick={() => setAppointmentRequest(true)}
                              className="bg-premiumPurple font-semibold text-sm text-white p-1 px-6 rounded-2xl"
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
          <div className="max-[768px]:mb-[10px] rightArea max-[768px]:flex-1 flex items-center justify-center md:order-2  rounded-2xl shadow-xl bg-white md:h-[20rem]">
            <CalendarBox
              selectedDate={selectedDate}
              onDateChange={(value) => {
                handleDateChange(value);
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
