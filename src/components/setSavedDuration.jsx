import React from "react";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

const SetSavedDuration = () => {
  const handleSaveDuration = (values) => {
    const { duration } = values;

    if (!duration) {
      Swal.fire({
        title: "Hata !",
        text: "Lütfen bir süre giriniz.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    const existingSavedDurations =
      JSON.parse(localStorage.getItem("savedDurations")) || []; //DATABASE DEN savedDuration TABLOSUNU OKUYACAĞIMIZ YER BEN BURDA DİREK LOCAL DEN ALDIM

    const isDuplicate = existingSavedDurations.some(
      (savedDurations) => savedDurations === duration
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Hata !",
        text: "Bu süre zaten kaydedilmiş.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    existingSavedDurations.push(duration);
    localStorage.setItem(
      "savedDurations",
      JSON.stringify(existingSavedDurations) // GÜNCELLEMİŞ SÜRELERİ DATABASE E GÖNDERECEĞİMİZ YER BEN BURDA DİREK LOCAL A GÖNDERDİM
    );

    Swal.fire({
      title: "Başarılı !",
      text: "Süre başarıyla kaydedildi.",
      icon: "success",
      confirmButtonText: "Kapat",
    });
  };

  return (
    <div className="ml-auto mr-auto bg-dayComponentBg mt-10 flex items-center justify-center flex-col lg:w-[20rem] md:w-[24rem] lg:h-autp sm:h-auto shadow-xl border-stepBorder1 border-2 rounded-xl">
      <h1 className="text-buttonColor text-center font-semibold text-xl m-2">
        Hazır Süre Ekle
      </h1>
      <div className="p-5 pt-0">
        <h2 className="text-sm text-red-600 text-center font-semibold">
          Aşağıya eklemek istediğiniz süreyi yazınız
        </h2>
        <Formik initialValues={{ duration: "" }} onSubmit={handleSaveDuration}>
          {(formikProps) => (
            <Form>
              <div className="m-3 field-container w-[16rem]">
                <Field
                  name="duration"
                  type="number"
                  className={`p-3 w-[16rem] focus:border-none outline-none bg-white rounded-xl`}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-buttonColor px-5 py-1 text-white rounded-2xl text-sm"
                  type="submit"
                >
                  Süreyi Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetSavedDuration;
