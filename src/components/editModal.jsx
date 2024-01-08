import React from "react";
import { Formik, Field, Form } from "formik";
import pp from "../images/pp.png";
import Swal from "sweetalert2";

const EditModal = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }
  console.log(event.time.split(" ")[2]);
  function formatDate(inputDate) {
    const parts = inputDate.split(".");
    const day = parts[0].length === 1 ? "0" + parts[0] : parts[0];
    const month = parts[1].length === 1 ? "0" + parts[1] : parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
  }

  function convertTime(inputTime) {
    const dateObj = new Date(inputTime.date);
    const dayNames = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const dayOfWeek = dateObj.getDay();
    const formattedDate = `${dateObj.getDate()}.${
      dateObj.getMonth() + 1
    }.${dateObj.getFullYear()} ${dayNames[dayOfWeek]} ${inputTime.time} ${
      inputTime.status
    }`;

    return formattedDate;
  }

  function areTimesOverlapping(time1, time2, duration1, duration2) {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1 + duration1;
    const totalMinutes2 = hours2 * 60 + minutes2 + duration2;
    return totalMinutes1 > hours2 * 60 && totalMinutes2 > hours1 * 60;
  }

  const submitForm = async (values) => {
    // Create a separate variable to store the converted time for validation
    const convertedTime = convertTime(values.time);

    const storedEvents = JSON.parse(localStorage.getItem("formData")) || [];

    const isDuplicate = storedEvents.some(
      (storedEvent) =>
        storedEvent.appointmentNumber !== values.appointmentNumber &&
        storedEvent.time === convertedTime
    );

    const isOverlapping = storedEvents.some((storedEvent) => {
      if (storedEvent.appointmentNumber !== values.appointmentNumber) {
        const newDate = convertedTime.split(" ")[0];
        const newTime = convertedTime.split(" ")[2];
        const oldDate = storedEvent.time.split(" ")[0];
        const oldTime = storedEvent.time.split(" ")[2];
        const newDuration = values.duration;
        const oldDuration = storedEvent.duration;
        if (newDate === oldDate) {
          return areTimesOverlapping(
            newTime,
            oldTime,
            newDuration,
            oldDuration
          );
        }
      }

      return false;
    });
    if (isDuplicate || isOverlapping) {
      if (isDuplicate) {
        await Swal.fire({
          title: "Hata!",
          text: "Bu saatte başka bir randevu var.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
      } else if (isOverlapping) {
        await Swal.fire({
          title: "Hata!",
          text: "Bu saat başka bir randevu zamanı ile çakışıyor.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
      }
    } else {
      values.time = convertedTime;
      const updatedEvents = storedEvents.map((storedEvent) =>
        storedEvent.appointmentNumber === values.appointmentNumber
          ? { ...storedEvent, ...values }
          : storedEvent
      );
      localStorage.setItem("formData", JSON.stringify(updatedEvents));
      onClose();
    }
  };

  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative w-[430px] max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown">
          <Formik
            initialValues={{
              firstName: event.firstName || "",
              lastName: event.lastName || "",
              gender: event.gender || "",
              dateOfBirth: event.dateOfBirth || "",
              service: event.service || "",
              language: event.language || "",
              duration: event.duration,
              appointmentNumber: event.appointmentNumber || "",
              notes: event.notes || "",
              time: {
                date: formatDate(event.time.split(" ")[0]) || "",
                time: event.time.split(" ")[2] || "",
                status: event.time.split(" ")[3] + " " || "",
              },
            }}
            onSubmit={submitForm}
          >
            <Form>
              <div className="flex items-center justify-center relative">
                <div className="titleModal m-3">
                  <h1 className="text-center text-xl mr-auto ml-auto w-full mb-0">
                    Randevu Detayları
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 absolute right-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <div className="m-3">
                  <div className="appointmentNotes">
                    <div className="">
                      <div className="flex justify-around">
                        <div className="imgArea w-[100px] p-2">
                          <img src={pp} alt="" />
                        </div>
                        <div className="forSomeone flex mt-3 flex-wrap items-center justify-center">
                          <div className="generalNameAreaSomeOne">
                            <div className="nameAreaSomeone flex mb-1 w-full items-center justify-center">
                              <i className="fa-solid fa-user text-callNowdeepSlateBlueue flex items-center justify-center"></i>
                              <h2 className="text-sm font-bold ml-[8px] text-center">
                                İsim Soyisim
                              </h2>
                            </div>
                            <div className="flex">
                              <Field
                                type="text"
                                name="firstName"
                                className="text-sm w-[100px] mr-1 p-1 border-2 border-stepBorder1 rounded-xl"
                              />
                              <Field
                                type="text"
                                name="lastName"
                                className="text-sm p-1 w-[100px] border-2 border-stepBorder1 rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around">
                      <div className="serviceNameArea mt-3 mr-2">
                        <div className="service flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-user text-callNowdeepSlateBlue flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Hizmet
                          </h2>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="service"
                            className="text-sm p-1 border-2 w-[120px] border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="generalAppointmentTime mt-3 flex flex-col items-center justify-center">
                        <div className="appointmentTimeArea flex">
                          <i class="fa-regular fa-calendar-check text-callNowdeepSlateBlueue flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Randevu Tarihi
                          </h2>
                        </div>
                        <div className="flex items-center justify-center mt-1">
                          <Field
                            type="date"
                            name="time.date"
                            className="text-sm text-center mr-1 w-[120px] p-1 border-2 border-stepBorder1 rounded-xl"
                          />
                          <Field
                            type="time"
                            name="time.time"
                            className="text-sm text-center w-[110px] p-1 border-2 border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full mt-5 justify-around">
                      <div className="languageArea">
                        <div className="textLogoArea flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-earth-americas text-callNowdeepSlateBlue flex items-center justify-center"></i>
                          <h5 className="text-sm font-semibold ml-[8px] mt-auto mb-auto text-center">
                            Dil
                          </h5>
                        </div>
                        <div className="appointmentLanguage">
                          <Field
                            type="text"
                            name="language"
                            className="text-sm p-1 border-2 w-[150px] border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="generalAppointmentNumber">
                        <div className="birthdayAreaSomeone flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-calendar-check text-callNowdeepSlateBlue flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Randevu Numarası
                          </h2>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="appointmentNumber"
                            className="text-sm text-center w-[200px] p-1 border-2 border-stepBorder1 rounded-xl mx-[auto]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="notesArea mt-[18px] border-2 border-callNowdeepSlateBlue rounded-xl">
                      <div className="p-3">
                        <div className="flex">
                          <i className="fa-solid fa-book text-xl text-callNowdeepSlateBlue"></i>
                          <h2 className="text-xl ml-2 text-callNowdeepSlateBlueue">
                            Notlar
                          </h2>
                        </div>
                        <Field
                          as="textarea"
                          name="notes"
                          className="text-sm p-1 border-2 border-stepBorder1 rounded-xl w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className=" bg-lightBlue py-2 px-5 text-sm rounded-2xl font-semibold text-white"
                >
                  Güncelle
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
