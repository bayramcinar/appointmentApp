import React from "react";
import { Formik, Form, Field } from "formik";

function AppointmentRequest({ isOpen, onClose, handleFormSubmit, date }) {
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50 "
    : "hidden";

  const getCurrentTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    return `${currentHour}:${currentMinute}`;
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };
  const appoinmentDuration = 90; //HİZMET VERENIN RANDEVU SÜRESİNİ ALACAĞIMIZ YER
  return (
    <>
      <div className={modalClass}>
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="relative w-[430px] max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__zoomIn">
            <div className="flex items-center justify-center relative">
              <div className="titleModal m-3">
                <h1 className="text-center text-xl mr-auto ml-auto w-full mb-0">
                  Randevu Talebi
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
              <div className="appointmentRequestArea">
                <h1 className="text-deepSlateBlue text-sm text-center font-semibold">
                  Lütfen Aşağıdan oluşturmak istediğiniz randevu talebin saatini
                  seçiniz
                </h1>
                <h2 className="text-coralext-center text-sm font-bold">
                  Ortalama randevu süresi {appoinmentDuration} dakikadır
                </h2>
                <Formik
                  initialValues={{
                    time: "",
                  }}
                  onSubmit={handleFormSubmit}
                >
                  <Form
                    id="appRequest"
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="m-3">
                      <Field
                        min={isToday(date) ? getCurrentTime() : ""}
                        type="time"
                        className="lg:w-[22rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none bg-dayComponentBg"
                        name="time"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-royalPurpleounded-2xl p-1 px-6 text-white text-sm mt-[15px]"
                    >
                      Talep Oluştur
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentRequest;
