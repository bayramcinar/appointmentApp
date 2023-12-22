import React from "react";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

const SetSavedTime = () => {
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

    // Get existing saved times from local storage or initialize an empty array
    const existingSavedTimes =
      JSON.parse(localStorage.getItem("savedTimes")) || [];

    // Check if the selected time already exists in the saved times
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

    // Save the new time to local storage
    existingSavedTimes.push(time);
    localStorage.setItem("savedTimes", JSON.stringify(existingSavedTimes));

    Swal.fire({
      title: "Başarılı !",
      text: "Zaman başarıyla kaydedildi.",
      icon: "success",
      confirmButtonText: "Kapat",
    });
  };

  return (
    <div className="ml-auto mr-auto bg-dayComponentBg mt-10 flex items-center justify-center flex-col lg:w-[20rem] md:w-[24rem] lg:h-autp sm:h-auto shadow-xl border-stepBorder1 border-2 rounded-xl">
      <h1 className="text-buttonColor text-center font-semibold text-xl m-2">
        Hazır Saat Ekle
      </h1>
      <div className="p-5 pt-0">
        <h2 className="text-sm text-red-600 text-center font-semibold">
          Aşağıdan Kaydetmek istediğiniz saati seçiniz
        </h2>
        <Formik initialValues={{ time: "" }} onSubmit={handleSaveTime}>
          {(formikProps) => (
            <Form>
              <div className="m-3 field-container w-[16rem]">
                <Field
                  name="time"
                  type="time"
                  className={`p-3 w-[16rem] focus:border-none outline-none bg-white rounded-xl`}
                  placeholder="Saat"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-buttonColor px-5 py-1 text-white rounded-2xl text-sm"
                  type="submit"
                >
                  Zamanı Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetSavedTime;
