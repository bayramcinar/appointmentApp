import React from "react";
import { Formik, Field, Form } from "formik";
import Swal from "sweetalert2";

const SetService = () => {
  const handleSaveService = (values) => {
    const { service } = values;

    if (!service) {
      Swal.fire({
        title: "Hata !",
        text: "Lütfen bir hizmet giriniz.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    const existingSavedServices =
      JSON.parse(localStorage.getItem("services")) || []; //DATABASE DEN services TABLOSUNU OKUYACAĞIMIZ YER BEN BURDA DİREK LOCAL DEN ALDIM

    const isDuplicate = existingSavedServices.some(
      (savedServices) => savedServices === service
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Hata !",
        text: "Bu hizmet zaten kaydedilmiş.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }

    existingSavedServices.push(service);
    localStorage.setItem(
      "services",
      JSON.stringify(existingSavedServices) // GÜNCELLEMİŞ SERVİSLERİ DATABASE E GÖNDERECEĞİMİZ YER BEN BURDA DİREK LOCAL A GÖNDERDİM
    );

    Swal.fire({
      title: "Başarılı !",
      text: "Hizmet başarıyla kaydedildi.",
      icon: "success",
      confirmButtonText: "Kapat",
    });
  };

  return (
    <div className="ml-auto mr-auto bg-dayComponentBg flex items-center justify-center flex-col w-[100%] lg:h-[358px] lg:h-autp sm:h-auto shadow-xl border-stepBorder1 border-2 rounded-xl">
      <h1 className="text-buttonColor text-center font-semibold text-xl m-2 mb-0">
        Hizmet Ekle
      </h1>
      <div className="p-5">
        <h2 className="text-sm text-red-600 text-center font-semibold m-3 mt-0">
          Eklemek istediğiniz servisi aşağıya giriniz.
        </h2>
        <Formik initialValues={{ service: "" }} onSubmit={handleSaveService}>
          <Form>
            <div>
              <Field
                type="text"
                id="serviceName"
                name="serviceName"
                className={`p-3 w-[16rem] focus:border-none outline-none bg-white rounded-xl`}
              />
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                type="submit"
                className="bg-buttonColor px-5 py-1 text-white rounded-2xl text-sm"
              >
                Servisi Kaydet
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SetService;
