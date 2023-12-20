// SetAppointmentTime.js

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import "../style/setAppointmentTime.css";
import Swal from "sweetalert2";
import SetDateAndTime from "./setDateAndTime";

function SetAppointmentTime() {
  const [datesData, setDatesData] = useState([]);

  const getSelectedDate = (selectedDate) => {
    setDatesData(selectedDate);
    console.log("Seçilen Tarih:", selectedDate);
  };

  const handleSetTime = (values, { resetForm }) => {
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
      JSON.parse(sessionStorage.getItem("selectedTimes")) || [];

    // Her bir tarihi, seçilen saatle birlikte ekleyin
    datesData.forEach((chosenDate) => {
      // Extracting hour and minute from the time string
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

    // Save to sessionStorage
    sessionStorage.setItem("selectedTimes", JSON.stringify(existingTimes));

    resetForm();

    Swal.fire({
      title: "Başarılı",
      text: "Randevu saatleri başarılı bir şekilde eklenmiştir.",
      icon: "success",
      confirmButtonText: "Kapat",
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    return `${currentHour}:${currentMinute}`;
  };

  return (
    <div className="ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col lg:w-[35rem] md:w-[24rem] lg:h-[655px] sm:h-auto">
      <h2 className="text-buttonColor text-2xl m-3 font-semibold mb-0">
        Randevu Zamanı Belirle
      </h2>
      <Formik
        initialValues={{ chosenDate: "", time: "", duration: "" }}
        onSubmit={handleSetTime}
      >
        <Form>
          <div className="m-3 field-container flex items-center justify-center">
            <SetDateAndTime onDateChange={getSelectedDate} />
          </div>
          <div className="m-3 field-container lg:w-[21rem]">
            <Field
              name="time"
              type="time"
              min={getCurrentTime()}
              className={`p-3 lg:w-[21rem] max-[768px]:w-[22rem] focus:border-none outline-none bg-white`}
              placeholder="Saat"
            />
          </div>
          <div className="m-3 field-container lg:w-[21rem]">
            <Field
              name="duration"
              type="number"
              className={`p-3 lg:w-[21rem] max-[768px]:w-[22rem] focus:border-none outline-none bg-white`}
              placeholder="Randevu Süresi (örn: 30 dk)"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4"
            >
              <h4 className="text-text p-2 px-6 text-sm tracking-wider">
                Zamanı ve Tarihi Ayarla
              </h4>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SetAppointmentTime;
