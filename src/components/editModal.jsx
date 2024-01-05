import React from "react";
import { Formik, Field, Form } from "formik";
import pp from "../images/pp.png";

const EditModal = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }
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
              appointmentNumber: event.appointmentNumber || "",
              notes: event.notes || "",
              time: {
                date: formatDate(event.time.split(" ")[0]) || "",
                time: event.time.split(" ")[2] || "",
                status: event.time.split(" ")[3] + " ",
              },
            }}
            onSubmit={(values) => {
              //DATABASE DEN VERİLERİ GÜNCELLEYECİĞİMİZ YER BEN BURDA LOCAL DE GÜNCELLEDİM VALUES İ GÖNDERECEĞİZ
              const updatedTime = convertTime(values.time);
              values.time = updatedTime;
              const storedEvents =
                JSON.parse(localStorage.getItem("formData")) || [];
              const updatedEvents = storedEvents.map((storedEvent) =>
                storedEvent.appointmentNumber === values.appointmentNumber
                  ? { ...storedEvent, ...values }
                  : storedEvent
              );
              localStorage.setItem("formData", JSON.stringify(updatedEvents));
            }}
          >
            <Form>
              <div className="flex items-center justify-center relative">
                <div className="titleModal m-3">
                  <h1 className="text-center text-xl mr-auto ml-auto w-full mb-0">
                    Randevu Detayları
                  </h1>
                </div>
                <button
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
                        <div className="imgArea w-[120px] p-2">
                          <img src={pp} alt="" />
                        </div>
                        <div className="forSomeone flex mt-3 flex-wrap items-center justify-center">
                          <div className="generalNameAreaSomeOne">
                            <div className="nameAreaSomeone flex mb-1 w-full items-center justify-center">
                              <i className="fa-solid fa-user text-callNowButtonColor flex items-center justify-center"></i>
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
                    <div className="flex">
                      <div className="serviceNameArea mt-3 mr-2">
                        <div className="service flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-user text-callNowButtonColor flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Hizmet
                          </h2>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="service"
                            className="text-sm p-1 border-2 w-[100px] border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="generalAppointmentTime mt-3 flex flex-col items-center justify-center">
                        <div className="appointmentTimeArea flex">
                          <i class="fa-regular fa-calendar-check text-callNowButtonColor flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Randevu Tarihi
                          </h2>
                        </div>
                        <div className="flex items-center justify-center">
                          <Field
                            type="date"
                            name="time.date"
                            className="text-sm text-center mr-1 w-[100px] p-1 border-2 border-stepBorder1 rounded-xl"
                          />
                          <Field
                            type="time"
                            name="time.time"
                            className="text-sm text-center w-[100px] p-1 border-2 border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full mt-5 justify-around">
                      <div className="languageArea">
                        <div className="textLogoArea flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-earth-americas text-callNowButtonColor flex items-center justify-center"></i>
                          <h5 className="text-sm font-semibold ml-[8px] mt-auto mb-auto text-center">
                            Dil
                          </h5>
                        </div>
                        <div className="appointmentLanguage">
                          <Field
                            type="text"
                            name="language"
                            className="text-sm p-1 border-2 w-[100px] border-stepBorder1 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="generalAppointmentNumber">
                        <div className="birthdayAreaSomeone flex mb-1 w-full items-center justify-center">
                          <i className="fa-solid fa-calendar-check text-callNowButtonColor flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Randevu Numarası
                          </h2>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="appointmentNumber"
                            className="text-sm text-center w-[150px] p-1 border-2 border-stepBorder1 rounded-xl mx-[auto]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="notesArea mt-[18px] border-2 border-callNowButtonColor rounded-xl">
                      <div className="p-3">
                        <div className="flex">
                          <i className="fa-solid fa-book text-xl text-callNowButtonColor"></i>
                          <h2 className="text-xl ml-2 text-callNowButtonColor">
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
                  onClick={onClose}
                  className=" bg-lightBlue py-2 px-5 text-sm rounded-2xl font-semibold text-white"
                >
                  Update
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
