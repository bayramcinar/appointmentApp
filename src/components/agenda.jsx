import React, { useEffect, useState } from "react";
import EventModal from "./eventModal";
import Swal from "sweetalert2";
function Agenda() {
  const [formData, setFormData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const filterFormData = (formData) => {
    const filteredData = formData.filter((data) => {
      // Örnek olarak 'true' içeren öğeleri filtrele
      const timeArray = data.time.split(" ");
      const lastElement = timeArray[timeArray.length - 2];

      return lastElement.toLowerCase() === "false";
    });

    return filteredData;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // localStorage'dan formData'yı al
    const storedFormData = localStorage.getItem("formData");

    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      const filteredFormData = filterFormData(parsedFormData);

      if (filteredFormData) {
        const sortedFormData = filteredFormData.sort((a, b) => {
          const dateA = new Date(
            a.time.split(" ")[0].split(".").reverse().join("-") +
              " " +
              a.time.split(" ")[2]
          );
          const dateB = new Date(
            b.time.split(" ")[0].split(".").reverse().join("-") +
              " " +
              b.time.split(" ")[2]
          );

          return dateA - dateB;
        });

        setFormData(sortedFormData);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [formData]);

  function convertFormDataToTable() {
    // TABLODA DÖNDÜRDÜĞÜMÜZ HER BİR SATIR
    return formData.map((formEntry, index) => {
      const { time, duration, service } = formEntry;
      const parsedInfos = time.split(/\s+/);
      const dateInfo = parsedInfos[0] + " " + parsedInfos[1];
      const timeInfo = getTime(parsedInfos[2], duration);
      const remainingTime = getRemainingTime(time);

      const currentDate = new Date();
      const appointmentDate = new Date(
        time.split(" ")[0].split(".").reverse().join("-") +
          " " +
          time.split(" ")[2]
      );
      const isPastAppointment = appointmentDate < currentDate;
      const isToday = isSameDay(appointmentDate, currentDate);

      return (
        <tr
          key={index}
          className={
            isPastAppointment
              ? "bg-grayForTable" // Gri renk tarihi geçmiş randevular için
              : isToday
              ? "bg-greenForTable" // Yeşil renk bu gün olan randevular için
              : index % 2 === 0
              ? "bg-white"
              : "bg-white"
          }
        >
          <td className="text-center border-dashed border-2 border-[#0003]">
            {index + 1}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003]">
            {dateInfo}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003]">
            {timeInfo}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003]">
            {service}
          </td>
          <td className="border-dashed border-2 border-[#0003]">
            <div className="flex items-center justify-center">
              <div className="m-2">
                <button
                  onClick={() => handleDelete(formEntry)}
                  className="p-2 bg-red-600 text-white text-sm font-semibold rounded-xl"
                >
                  Sil
                </button>
              </div>
              <div className="m-2 ml-0">
                <button className="p-2 bg-appoinmentBox text-white text-sm font-semibold rounded-xl">
                  Düzenle
                </button>
              </div>
              <div className="m-2 ml-0">
                <button
                  onClick={() => handleOpenModal(formEntry)}
                  className="p-2 bg-lightBlue text-white text-sm font-semibold rounded-xl"
                >
                  Detaylar
                </button>
              </div>
            </div>
          </td>
          <td className="text-center border-dashed border-2 border-[#0003]">
            {remainingTime.remainingHours > 0 ? (
              `${remainingTime.remainingHours} saat ${remainingTime.remainingMinutes} dakika`
            ) : (
              <span>
                {remainingTime.remainingMinutes > 0
                  ? `${remainingTime.remainingMinutes} dakika`
                  : "Randevu Bitti"}
              </span>
            )}
          </td>
        </tr>
      );
    });
  }

  function getTime(start, duration) {
    const durationMinutes = parseInt(duration, 10);
    const [hours, minutes] = start.split(":").map(Number);
    const endHours = Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const endTime = `${hours + endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
    return start + " - " + endTime;
  }

  function getRemainingTime(start) {
    //KALAN SAATİ HESAPLAYAN FONKSİYON
    const currentDate = new Date();
    const appointmentDate = new Date(
      start.split(" ")[0].split(".").reverse().join("-") +
        " " +
        start.split(" ")[2]
    );

    const remainingTimeInMilliseconds =
      appointmentDate.getTime() - currentDate.getTime();

    const remainingHours = Math.floor(
      remainingTimeInMilliseconds / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (remainingTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor(
      (remainingTimeInMilliseconds % (1000 * 60)) / 1000
    );

    return {
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    };
  }

  function updateRemainingTime() {
    setFormData((prevFormData) =>
      prevFormData.map((formEntry) => {
        return {
          ...formEntry,
          remainingTime: getRemainingTime(formEntry.time),
        };
      })
    );
  }

  const handleDelete = (selectedAppointment) => {
    //SİLME FONKSİYONU
    console.log(selectedAppointment);
    const selectedTimes =
      JSON.parse(localStorage.getItem("selectedTimes")) || []; // BU İŞLEMİ DATABASE DEN YAPACAĞIZ BEN BURDA RANDEVUYU SİLERKEN AYNI ZAMANDA selectedTimes (randevu saatleri) ögesindeki o saatin active değerini false dan true ya çeviriyorum randevu silindiği için

    const dateParts = selectedAppointment.time.split(" ");
    const datePart = dateParts[0].split(".");
    const timePart = dateParts[2];

    const year = parseInt(datePart[2], 10);
    const month = parseInt(datePart[1], 10) - 1;
    const day = parseInt(datePart[0], 10);

    const timeParts = timePart.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    const originalDate = new Date(year, month, day, hours, minutes);

    const formattedDate = originalDate.toISOString().split("T")[0];
    const formattedTime = originalDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const result = {
      date: formattedDate,
      time: formattedTime,
    };

    Swal.fire({
      title: "Başarılı !",
      text: "Randevu başarılı bir şekilde silindi.",
      icon: "success",
      confirmButtonText: "Kapat",
    });

    const updatedSelectedTimes = selectedTimes.map((appointment) => {
      if (
        appointment.date === result.date &&
        appointment.time === result.time
      ) {
        return { ...appointment, active: true };
      }
      return appointment;
    });

    localStorage.setItem("selectedTimes", JSON.stringify(updatedSelectedTimes)); // GÜNCELLENMİŞ SAATLERİ YENİDEN DATABASE E GÖNDERECEĞİZ

    // Form datayı güncelle
    const updatedFormData = formData.filter(
      (appointment) =>
        appointment.date !== selectedAppointment.date ||
        appointment.time !== selectedAppointment.time
    );
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData)); // GÜNCELLENMİŞ RANDEVULERİ formData (randevular) DATABASE İNE GÖNDERECEĞİZ
  };

  // İki tarihin aynı gün olup olmadığını kontrol eden fonksiyon
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <>
      <div className="w-[100%] shadow-xl border-stepBorder1 border-2 rounded-xl overflow-auto max-h-[500px]">
        <h1 className="text-buttonColor text-2xl text-center font-semibold mt-5 sticky">
          Ajanda
        </h1>
        <table className="rounded-xl w-[100%] my-5">
          <thead>
            <tr className="bg-buttonColor text-white font-semibold sticky">
              <th className="p-3">Sıra</th>
              <th className="p-3">Tarih</th>
              <th className="p-3">Saat</th>
              <th className="p-3">Randevu</th>
              <th className="p-3">İşlemler</th>
              <th className="p-3">Kalan Süre</th>
            </tr>
          </thead>
          <tbody>{convertFormDataToTable()}</tbody>
        </table>
      </div>
      <EventModal
        isOpen={openModal}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </>
  );
}

export default Agenda;
