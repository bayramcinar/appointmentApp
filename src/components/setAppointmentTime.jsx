import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import SetDateAndTime from "./setDateAndTime";
import SavedTimes from "./savedTimeBox";
import moment from "moment";
import SavedTimesForDeletion from "./savedTimeBoxForDelete";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

function SetAppointmentTime() {
  const [datesData, setDatesData] = useState([]); // TAKVİMDEN SEÇTİĞİMİZ TARİHLERİ TUTAN ARRAY
  const [selectedTimes, setSelectedTimes] = useState([]); // SEÇTİĞİMİZ SAATLERİ TUTAN DEĞİŞKEN
  const [selectedDuration, setSelectedDuration] = useState(""); //SEÇTİĞİMİZ RANDEVU SÜRESİNİ TUTAN DEĞİŞKEN
  const [savedTimesArray, setSavedTimesArray] = useState([]); // KAYITLI SAATLER BÖLGESİNDE GÖSTERİLEN SAATLERİ TUTAN ARRAY
  const [savedTimes, setSavedTimes] = useState(true); // KAYITLI SAATLER VEYA SAAT SEÇ EKRANINDA GİDİP GELMEMİZİ SĞLAYAN DEĞİŞKEN
  const appointmentDuration = 90; // BU KISIM KULLANICI PROFİLİNDEN ALINAN RANDEVU SÜRESİ YERİ
  const appointmentPrice = 1000; // BU KISIM KULLANICI PROFİLİNDEN ALINAN RANDEVU ÜCRETİ YERİ
  useEffect(() => {
    const localStorageSavedTimes =
      JSON.parse(localStorage.getItem("savedTimes")) || [];
    const timeSortingFunction = (a, b) => {
      const timeA = new Date("1970-01-01T" + a + ":00");
      const timeB = new Date("1970-01-01T" + b + ":00");

      return timeA - timeB;
    };
    const sortedSavedTimes = localStorageSavedTimes.sort(timeSortingFunction);

    setSavedTimesArray(sortedSavedTimes);
  });

  const getSelectedDate = (selectedDate) => {
    // TAKVİMDEKİ DEĞİŞİKLİKLERE GÖRE SEÇİLEN TARİHLERİ AYARLAYAN FONKSİYON
    setDatesData(selectedDate);
    setSelectedTimes([]);
  };

  const handleSetTime = (values, { resetForm }) => {
    // RANDEVU SAATİ EKLEMEMİZİ SAĞLAYAN FONKSİYON

    setSelectedDuration(appointmentDuration);

    if (savedTimes === true) {
      const duration = selectedDuration;

      if (!selectedTimes.length || !datesData.length || !duration) {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen tüm bilgileri doldurun.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      const existingTimes =
        JSON.parse(localStorage.getItem("selectedTimes")) || []; // DATABASE DEN RANDEVU SAATLERİNİ ALACAĞIZ (selectedTimes) BEN BURDA DİREK LOCAL DEN ALDIM

      // Check for conflicts
      const conflictingAppointments = existingTimes.some((item) => {
        const existingStartDateTime = moment(`${item.date} ${item.time}`);
        const existingEndDateTime = existingStartDateTime
          .clone()
          .add(item.duration, "minutes");

        return selectedTimes.some((selectedTime) => {
          const selectedDateTime = moment(`${datesData[0]} ${selectedTime}`);
          const selectedEndDateTime = selectedDateTime
            .clone()
            .add(duration, "minutes");

          return (
            (selectedDateTime.isSameOrAfter(existingStartDateTime) &&
              selectedDateTime.isBefore(existingEndDateTime)) ||
            (existingStartDateTime.isSameOrAfter(selectedDateTime) &&
              existingStartDateTime.isBefore(selectedEndDateTime))
          );
        });
      });

      if (conflictingAppointments) {
        Swal.fire({
          title: "Hata !",
          text: "Seçilen tarih ve saatlerde bir randevu zaten mevcut.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      // Continue with adding the appointment if no conflicts
      datesData.forEach((selectedDate) => {
        selectedTimes.forEach((selectedTime) => {
          const dateTimeObject = {
            time: selectedTime,
            date: selectedDate,
            duration: duration,
            active: true,
          };

          existingTimes.push(dateTimeObject);
        });
      });

      localStorage.setItem("selectedTimes", JSON.stringify(existingTimes)); //DATABASE E GÜNCELLENMİŞ RANDEVU SAATLERİNİ GÖNDERECEĞİMİZ YER

      resetForm();
      setSelectedTimes([]);

      Swal.fire({
        title: "Başarılı",
        text: "Randevu saatleri başarılı bir şekilde eklenmiştir.",
        icon: "success",
        confirmButtonText: "Kapat",
      });
    } else {
      const { time, duration } = values;

      if (!time || !datesData.length || !duration) {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen tüm bilgileri doldurun.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      const existingTimes =
        JSON.parse(localStorage.getItem("selectedTimes")) || []; // DATABASE DEN RANDEVU SAATLERİNİ ALACAĞIZ (selectedTimes) BEN BURDA DİREK LOCAL DEN ALDIM

      // Her bir tarihi, seçilen saatle birlikte ekleyin
      datesData.forEach((chosenDate) => {
        const [hour, minute] = time.split(":");
        const selectedTime = `${hour}:${minute}`;
        const selectedDateTime = `${chosenDate} ${selectedTime}`;

        const isDuplicate = existingTimes.some((item) => {
          const existingDateTime = `${item.date} ${item.time}`;
          return existingDateTime === selectedDateTime;
        });

        if (!isDuplicate) {
          const dateTimeObject = {
            time: selectedTime,
            date: chosenDate,
            duration: duration,
            active: true,
          };

          existingTimes.push(dateTimeObject);
        }
      });

      localStorage.setItem("selectedTimes", JSON.stringify(existingTimes)); //DATABASE E GÜNCELLENMİŞ RANDEVU SAATLERİNİ GÖNDERECEĞİMİZ YER

      resetForm();

      Swal.fire({
        title: "Başarılı",
        text: "Randevu saatleri başarılı bir şekilde eklenmiştir.",
        icon: "success",
        confirmButtonText: "Kapat",
      });
    }
  };

  const handleOptionChange = (option) => {
    //KAYITLI SAATLER VEYA SAAT SEÇ EKRANLARINDA GEZİNMEMEİZİ SAĞLAYAN FONKSİYON
    setSavedTimes(option);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const renderSwiper = (times) => {
    const itemsPerSlide = 6;
    const swiperSlides = [];
    for (let i = 0; i < times.length; i += itemsPerSlide) {
      const currentTimes = times.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center serviceBoxArea ">
            {currentTimes.map((savedTime, index) => (
              <SavedTimesForDeletion key={index} time={savedTime} />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    if (isMobile) {
      return (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    } else {
      return (
        <Swiper
          navigation={{
            prevEl: ".custom-swiper-button-prev8",
            nextEl: ".custom-swiper-button-next8",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    }
  };
  const renderSwiper2 = (times, formikProps) => {
    const itemsPerSlide = 6;
    const swiperSlides = [];
    for (let i = 0; i < times.length; i += itemsPerSlide) {
      const currentTimes = times.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center serviceBoxArea ">
            {currentTimes.map((savedTime, index) => (
              <SavedTimes
                key={index}
                time={savedTime}
                onTimeClick={(clickedTime) =>
                  handleAppointmentBoxClick(
                    clickedTime,
                    datesData,
                    formikProps.setFieldValue
                  )
                }
                selectedTime={selectedTimes.includes(savedTime)}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    if (isMobile) {
      return (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    } else {
      return (
        <Swiper
          navigation={{
            prevEl: ".custom-swiper-button-prev9",
            nextEl: ".custom-swiper-button-next9",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    }
  };

  const handleAppointmentBoxClick = (
    // KAYITLI SAATLERDE BİRDEN ÇOK SAAT SEÇEBİLMEMİZİ SAĞLAYAN FONKSİYON
    clickedTime,
    selectedDate,
    setFieldValue
  ) => {
    const [hour, minute] = clickedTime.split(":");
    const selectedTime = `${hour}:${minute}`;
    setFieldValue("chosenDate", selectedDate);
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(selectedTime)) {
        return prevSelectedTimes.filter((time) => time !== selectedTime);
      } else {
        return [...prevSelectedTimes, selectedTime];
      }
    });
  };

  const handleSaveTime = (values) => {
    const { time } = values;

    if (!time) {
      Swal.fire({
        title: "Hata !",
        text: "Lütfen bir zaman seçiniz.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    const existingSavedTimes =
      JSON.parse(localStorage.getItem("savedTimes")) || []; //DATABASE DEN savedTime TABLOSUNU OKUYACAĞIMIZ YER BEN BURDA DİREK LOCAL DEN ALDIM

    const isDuplicate = existingSavedTimes.some(
      (savedTime) => savedTime === time
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Hata !",
        text: "Bu zaman zaten kaydedilmiş.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    existingSavedTimes.push(time);
    localStorage.setItem("savedTimes", JSON.stringify(existingSavedTimes)); // GÜNCELLEMİŞ SAATLERİ DATABASE E GÖNDERECEĞİMİZ YER BEN BURDA DİREK LOCAL A GÖNDERDİM

    Swal.fire({
      title: "Başarılı !",
      text: "Zaman başarıyla kaydedildi.",
      icon: "success",
      confirmButtonText: "Kapat",
    });
  };
  const handleInfoIconHover = () => {
    const tooltip = document.querySelector(".tooltip");
    console.log(tooltip);
    tooltip.style.display = "block";
  };

  const handleInfoIconLeave = () => {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.display = "none";
  };

  const emptyOrNot = savedTimesArray.length;
  return (
    <div className=" bg-dayComponentBg  setAppointmentTime flex items-center justify-center flex-col relative rounded-xl">
      <div className="infoIcon absolute right-2 top-4">
        <div
          className="infoIcon relative inline-block cursor-pointer"
          onMouseEnter={handleInfoIconHover}
          onMouseLeave={handleInfoIconLeave}
        >
          <i className="fa-solid fa-circle-info text-xl text-buttonColor"></i>
        </div>
        <div className="tooltip z-[3] hidden bg-white border border-gray-300 p-2 rounded-xl shadow-lg absolute transform -translate-x-0 right-[2px] transition duration-300 w-[200px]">
          <h1 className="text-xs font-semibold text-center text-red-500">
            Randevu süresi {appointmentDuration} dakika, randevu ücreti{" "}
            {appointmentPrice} ₺ olarak ayarlıdır. Dilerseniz bu bilgileri
            profilinizden güncelleyebilirsiniz.
          </h1>
          <div className=" my-1 flex items-center justify-center">
            <div className="flex mr-5">
              <i class="fa-solid fa-clock text-lightBlue flex items-center justify-center mr-2"></i>
              <h1 className="text-xs font-semibold text-center mb-[2px]">
                {appointmentDuration} Dakika
              </h1>
            </div>
            <div className="flex">
              <i class="fa-solid fa-money-bill-1-wave text-lightBlue flex items-center justify-center mr-2"></i>
              <h1 className="text-xs font-semibold text-center  mb-[2px]">
                {appointmentPrice} ₺
              </h1>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-buttonColor text-2xl m-3 font-semibold mb-0">
        Randevu Zamanı Belirle
      </h2>
      <div className="chooseSavedTimes flex items-center justify-center ">
        <button
          onClick={() => handleOptionChange(true)}
          className={`bg-appoinmentBox p-1 text-white text-sm rounded-3xl m-3 mb-0 px-7 ${
            savedTimes === true ? "selected" : ""
          } ${savedTimes === true ? "bg-appoinmentBox" : "bg-backButtonColor"}`}
        >
          Kayıtlı Saatler
        </button>
        <button
          onClick={() => handleOptionChange(false)}
          className={`bg-appoinmentBox p-1 text-white text-sm rounded-3xl m-3 mb-0 px-7 ${
            savedTimes === false ? "selected" : ""
          } ${
            savedTimes === false ? "bg-appoinmentBox" : "bg-backButtonColor"
          }`}
        >
          Saat Ekle
        </button>
      </div>
      <Formik
        initialValues={savedTimes === true ? { chosenDate: "" } : { time: "" }}
        onSubmit={savedTimes === true ? handleSetTime : handleSaveTime}
      >
        {(formikProps) => (
          <Form>
            <div
              className={`m-3 field-container flex items-center ${
                savedTimes === false ? "hidden" : ""
              } justify-center`}
            >
              <SetDateAndTime onDateChange={getSelectedDate} />
            </div>
            {savedTimes === false && (
              <>
                <h2 className="text-sm text-red-600 text-center font-semibold m-5">
                  Aşağıdan Kaydetmek istediğiniz saati seçiniz
                </h2>
                <div className="m-3 field-container lg:w-[21rem] mx-auto flex items-center justify-center">
                  <Field
                    name="time"
                    type="time"
                    className={`p-3 lg:w-[21rem] max-[768px]:w-[20rem] focus:border-none outline-none bg-white mx-auto`}
                    placeholder="Saat"
                  />
                </div>
                <div className="w-full justify-center flex items-center">
                  <div
                    className={`savedTimesList flex flex-wrap items-center justify-center ${
                      emptyOrNot > 0 ? "w-[385px]" : "full"
                    } h-auto relative`}
                  >
                    {savedTimesArray.length > 0 &&
                      renderSwiper(savedTimesArray)}

                    {savedTimesArray.length === 0 && (
                      <h2 className="text-sm text-red-600 text-center font-semibold m-5 w-full">
                        Kayıtlı saat bulunmamaktadır
                      </h2>
                    )}

                    {savedTimesArray.length > 0 && !isMobile && (
                      <>
                        <div className="custom-swiper-button-prev8 absolute left-2 text-xl text-buttonColor top-[45%] z-[2] cursor-pointer">
                          <i
                            className="fa-solid fa-arrow-left"
                            alt="Previous"
                          ></i>
                        </div>
                        <div className="custom-swiper-button-next8 top-[45%] absolute right-2 text-xl text-buttonColor z-[2] cursor-pointer">
                          <i className="fa-solid fa-arrow-right" alt="Next"></i>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {savedTimes === true && (
              <>
                <div className="flex items-center justify-center flex-col">
                  <div
                    className={`chooseSavedTimes flex flex-wrap items-center justify-center ${
                      emptyOrNot > 0 ? "w-[345px]" : "full"
                    }  flex-wrap mx-[15px] relative`}
                  >
                    {renderSwiper2(savedTimesArray, formikProps)}
                    {savedTimesArray.length === 0 && (
                      <h1 className="text-center text-sm text-red-600 font-semibold mx-auto">
                        Kayıtlı saat bulunmamaktadır.
                      </h1>
                    )}
                    {savedTimesArray.length > 6 && !isMobile && (
                      <>
                        <div className="custom-swiper-button-prev9 absolute left-2 text-xl text-buttonColor top-[40%] z-[2] cursor-pointer">
                          <i
                            className="fa-solid fa-arrow-left"
                            alt="Previous"
                          ></i>
                        </div>
                        <div className="custom-swiper-button-next9 top-[40%] absolute right-2 text-xl text-buttonColor z-[2] cursor-pointer">
                          <i className="fa-solid fa-arrow-right" alt="Next"></i>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {savedTimes === true && (
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4 mb-4"
                >
                  <h4 className="text-text p-2 px-6 text-sm tracking-wider">
                    Zamanı ve Tarihi Ayarla
                  </h4>
                </button>
              </div>
            )}
            {savedTimes === false && (
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4 mb-4"
                >
                  <h4 className="text-text p-2 px-6 text-sm tracking-wider">
                    Kayıt Et
                  </h4>
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SetAppointmentTime;
