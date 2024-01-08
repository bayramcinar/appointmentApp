import React from "react";
import "../style/myAppointments.css";
import Swal from "sweetalert2";

function AppointmentRequestBox({ image, infos, onDetails }) {
  const timeString = infos.time;
  const timeStart = timeString.split(" ")[2];
  const requestOrNot = timeString.split(" ")[3];
  const addDurationToStartTime = (timeStart, duration) => {
    const durationMinutes = parseInt(duration, 10);
    const [hours, minutes] = timeStart.split(" ")[2].split(":").map(Number);
    const endHours = Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const endTime = `${hours + endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}`;

    return endTime;
  };

  const findObjectByTime = (timeObject) => {
    //TIKLADIĞIMIZ OBJEYİ ALIYORUZ
    const formDataString = localStorage.getItem("formData");

    if (!formDataString) {
      return [];
    }

    const formData = JSON.parse(formDataString);

    const foundObject = formData.find((obj) => obj.time === timeObject);
    console.log(foundObject);
    return foundObject || null;
  };

  const timeObject = infos.time;
  const onAccept = async (timeObject) => {
    // RANDEVU TALEBİNİ KABUL ETME FONKSİYONUNU request değerini false yapıyor
    const originalObje = findObjectByTime(timeObject);
    Swal.fire({
      title: "Emin misiniz!",
      text: "Randevu talebini kabul etmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        if (originalObje) {
          const falseValue2 = originalObje.confirm;
          const updatedValue2 = falseValue2 === "false" ? "true" : "";

          const updatedObje = {
            ...originalObje,
            confirm: updatedValue2,
          };

          const formDataString = localStorage.getItem("formData");

          if (formDataString) {
            const formData = JSON.parse(formDataString);

            const index = formData.findIndex(
              (obj) => obj.time === originalObje.time
            );

            if (index !== -1) {
              formData[index] = updatedObje;

              localStorage.setItem("formData", JSON.stringify(formData));
              Swal.fire({
                title: "Başarılı !",
                text: "Randevu talebi başarılı bir şekilde onaylandı ve kullanıcıya bildirildi.",
                icon: "success",
                confirmButtonText: "Kapat",
              });
              return updatedObje;
            }
          }
        }
      }
    });

    return null;
  };

  const onReject = () => {
    // RANDEVU TALEBİNİ RED ETME FONKSİYONUNU DİREK FORMDATA DAN O ÖGEYİ SİLİYOR
    Swal.fire({
      title: "Emin misiniz!",
      text: "Randevu talebini silmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        const obje = findObjectByTime(timeObject);

        if (obje) {
          const formDataString = localStorage.getItem("formData");

          if (formDataString) {
            const formData = JSON.parse(formDataString);

            const index = formData.findIndex((obj) => obj.time === obje.time);

            if (index !== -1) {
              formData.splice(index, 1);

              localStorage.setItem("formData", JSON.stringify(formData));

              Swal.fire({
                title: "Başarılı !",
                text: "Randevu talebi başarılı bir şekilde reddedildi.",
                icon: "success",
                confirmButtonText: "Kapat",
              });
            }
          }
        }
      }
    });
  };

  const startTime = infos.time;
  const date = infos.time.split(" ")[0];
  const endTime = addDurationToStartTime(startTime, infos.duration);

  return (
    <>
      <div className="bg-white myAppointmentBox lg:w-[280px] lg:scale-[0.85] xl:scale-[0.95] md:scale-[0.9] h-[205px] max-[768px]:w-[300px]  ml-auto mr-auto border-2 border-deepSlateBlue rounded-2xl shadow-2xl">
        <div className="p-2 flex flex-col pt-0">
          <div className="flex">
            <div className="imgArea1 w-1/3 flex items-center justify-center">
              <img src={image} className="w-20" alt="" />
            </div>
            <div className="infoArea w-2/3">
              <div>
                <h1
                  className={`flashing-text text-sm text-coral p-1 text-center font-semibold m-1`}
                >
                  Yeni Randevu Talebi
                </h1>
              </div>

              <div className="forWho flex">
                <i className="fa-solid fa-circle mt-[3px] text-[15px] text-royalPurple"></i>
                <h2 className="text-[14px] text-deepSlateBlue  font-bold ml-2">
                  {infos.kimIçin} İçin
                </h2>
              </div>
              <div className="flex">
                <i className="fa-regular fa-clock mt-[15px] text-royalPurple text-[15px]"></i>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-xs text-deepSlateBlue p-1 text-left font-semibold m-1 mb-0 pb-0">
                    {date}
                  </h1>
                  <h1 className="text-xs text-deepSlateBlue p-1 text-left font-semibold m-1 mt-0 pt-0">
                    {timeStart} - {endTime}
                  </h1>
                </div>
                <h1 className="text-xs text-deepSlateBlue py-1 text-left font-semibold my-1 flex items-center justify-center">
                  ({infos.duration} Dakika)
                </h1>
              </div>
              <div className="flex">
                <i className="fa-solid fa-hospital-user mt-[9px] text-royalPurple text-[15px]"></i>
                <h1 className="text-xs text-deepSlateBlue p-1 text-left font-semibold m-1">
                  {infos.service}
                </h1>
              </div>
            </div>
          </div>
          <div className="buttonsArea flex justify-center items-center mt-4">
            <button
              onClick={() => onAccept(timeObject)}
              className="p-2 bg-green-500 text-white text-sm font-semibold rounded-lg mx-2"
            >
              Onayla
            </button>
            <button
              onClick={() => onReject(timeObject)}
              className="p-2 bg-red-500 text-white text-sm font-semibold rounded-lg"
            >
              Reddet
            </button>
            <button
              onClick={() => onDetails()}
              className="p-2 bg-lightBlue text-white text-sm font-semibold rounded-lg mx-2"
            >
              Detaylar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentRequestBox;
