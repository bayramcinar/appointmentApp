import React, { useEffect, useState } from "react";
import EventModal from "./eventModal";
import "../style/agenda.css";
import Swal from "sweetalert2";
import AgendaCard from "./agendaCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

function Agenda() {
  const [formData, setFormData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const isMobile = window.innerWidth <= 768;
  const handleOpenModal = (event) => {
    setSelectedEvent({
      ...event,
    });
    setOpenModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedFormData = formData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterFormData = (formData, filter) => {
    const currentDate = new Date();
    const filteredData = formData.filter((data) => {
      const timeArray = data.time.split(" ");
      const appointmentDate = new Date(
        timeArray[0].split(".").reverse().join("-") + " " + timeArray[2]
      );

      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      switch (filter) {
        case "cancelled":
          return data.delete === true;
        case "past":
          return appointmentDate < currentDateOnly && data.delete === false;
        case "today":
          return (
            isSameDay(currentDateOnly, appointmentDate) && data.delete === false
          );
        case "future":
          return (
            appointmentDate > currentDate &&
            !isSameDay(currentDate, appointmentDate) &&
            data.delete === false
          );
        default:
          return (
            (appointmentDate > currentDate ||
              isSameDay(currentDate, appointmentDate)) &&
            data.delete === false
          );
      }
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
      const filteredFormData = filterFormData(parsedFormData, filter);

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
  }, [formData]);

  useEffect(() => {
    const buttons = document.querySelectorAll(".rbc-button-link");

    if (buttons) {
      buttons.forEach((button) => {
        const spanElement = button.querySelector("span[role='columnheader']");

        if (isMobile && spanElement) {
          const originalText = spanElement.textContent;
          const datePart = originalText.split(" ")[0];
          spanElement.textContent = datePart;
        }
      });
    }
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function calculateEndTime(startTime, duration) {
    const durationMinutes = parseInt(duration, 10);
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const endTime = `${hours + endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
    return endTime;
  }

  function convertFormDataToTable() {
    return paginatedFormData.map((formEntry, index) => {
      const status = formEntry.confirm;
      const { time, duration, service } = formEntry;
      const parsedInfos = time.split(/\s+/);
      const dateInfo = parsedInfos[0] + " " + parsedInfos[1];
      const timeInfo = getTime(parsedInfos[2], duration);
      const remainingTime = getRemainingTime(time);
      const requestStatus = parsedInfos[3];
      const currentDate = new Date();
      const appointmentDate = new Date(
        time.split(" ")[0].split(".").reverse().join("-") +
          " " +
          time.split(" ")[2]
      );
      const isPastAppointment = appointmentDate < currentDate;
      const isToday = isSameDay(appointmentDate, currentDate);
      const isCancelDisabled = remainingTime.remainingHours < 12;
      const actualIndex = (currentPage - 1) * itemsPerPage + index;
      const isCancelled = formEntry.delete === true;
      return (
        <tr
          key={actualIndex}
          className={
            isCancelled
              ? "bg-red-200" // İptal edilen randevular için kırmızı arka plan
              : isPastAppointment
              ? "bg-grayForTable" // Gri renk tarihi geçmiş randevular için
              : isToday
              ? "bg-greenForTable"
              : actualIndex % 2 === 0
              ? "bg-white"
              : "bg-white"
          }
        >
          <td className="text-center border-dashed border-2 border-[#0003] ">
            {actualIndex + 1}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003] ">
            {formEntry.appointmentNumber}
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
          <td className="border-dashed border-2 border-[#0003] h-[60px]">
            {isCancelled && (
              <h1 className="text-center  ">Randevu İptal Edildi</h1>
            )}

            {!isCancelled && (
              <div className="flex items-center justify-center">
                <div className="m-2">
                  <button
                    onClick={() => handleDelete(formEntry, isCancelDisabled)}
                    className={`p-[7px] ${
                      isCancelDisabled
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-coral text-white"
                    } font-semibold rounded-xl`}
                  >
                    İptal Et
                  </button>
                </div>
                <div className="m-2 ml-0">
                  <button
                    onClick={() => handleOpenModal(formEntry)}
                    className="p-2 bg-lightBlue text-white font-semibold rounded-xl"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            )}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003] status">
            {isCancelled ? (
              <span className="text-red-500">Randevu İptal Edildi</span>
            ) : isPastAppointment ? (
              <span className="text-coral">Randevu Sonlandı</span>
            ) : (
              <>
                {status === false && requestStatus === "false" && (
                  <div className="flex w-full justify-center">
                    <i className="fa-solid fa-circle text-coral flashing-text text-center flex items-center justify-center mx-2"></i>
                    <h1 className="text-md text-center ">
                      İşleme Alınması Bekleniyor
                    </h1>
                  </div>
                )}
                {status === true && (
                  <div className="flex items-center w-full justify-center">
                    <i className="fa-solid fa-circle text-green-500 items-center justify-center mx-2"></i>
                    <h1 className="text-md text-center ">Aktif</h1>
                  </div>
                )}
                {requestStatus === "true" && status === false && (
                  <div className="flex w-full justify-center">
                    <i className="fa-solid fa-circle text-coral flashing-text flex items-center justify-center mx-2"></i>
                    <h1 className="text-md text-center ">
                      Randevu Talebi Onay Bekleniyor
                    </h1>
                  </div>
                )}
              </>
            )}
          </td>
          <td className="text-center border-dashed border-2 border-[#0003] ">
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

  const handleDelete = (selectedAppointment, isCancelDisabled) => {
    //SİLME FONKSİYONU
    if (isCancelDisabled) {
      Swal.fire({
        title: "Hata !",
        text: "Randevu saatine 12 saatten az kaldığı için randevuyu iptal edemezsiniz.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
      return;
    }
    Swal.fire({
      title: "Emin misiniz!",
      text: "Randevuyu iptal etmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
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

        const result1 = {
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
            appointment.date === result1.date &&
            appointment.time === result1.time
          ) {
            return { ...appointment, active: true };
          }
          return appointment;
        });

        localStorage.setItem(
          "selectedTimes",
          JSON.stringify(updatedSelectedTimes)
        ); // GÜNCELLENMİŞ SAATLERİ YENİDEN DATABASE E GÖNDERECEĞİZ

        // Form datayı güncelle
        const updatedFormData = formData.map((appointment) => {
          if (
            appointment.date === selectedAppointment.date &&
            appointment.time === selectedAppointment.time
          ) {
            return { ...appointment, delete: true };
          }
          return appointment;
        });

        setFormData(updatedFormData);
        localStorage.setItem("formData", JSON.stringify(updatedFormData)); // GÜNCELLENMİŞ RANDEVULERİ formData (randevular) DATABASE İNE GÖNDERECEĞİZ
      }
    });
  };

  // İki tarihin aynı gün olup olmadığını kontrol eden fonksiyon
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(formData.length / itemsPerPage);

  const pendingAppointments = formData.filter(
    (formEntry) =>
      formEntry.confirm === "false" && isFutureAppointment(formEntry.time)
  );

  function isFutureAppointment(time) {
    const currentDate = new Date();
    const appointmentDate = new Date(
      time.split(" ")[0].split(".").reverse().join("-") +
        " " +
        time.split(" ")[2]
    );
    return appointmentDate > currentDate;
  }
  const renderSwiper = (times) => {
    const itemsPerSlide = 4;
    const swiperSlides = [];

    for (let i = 0; i < times.length; i += itemsPerSlide) {
      const currentTimes = times.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap  justify-center h-[auto] agendaCardBoxArea ">
            {currentTimes.map((formEntry, index) => {
              const status = formEntry.confirm;
              const { time, duration, service } = formEntry;
              const parsedInfos = time.split(/\s+/);
              const dateInfo = parsedInfos[0] + " " + parsedInfos[1];
              const timeInfo = getTime(parsedInfos[2], duration);
              const remainingTime = getRemainingTime(time);
              const requestStatus = parsedInfos[3];
              const currentDate = new Date();
              const appointmentDate = new Date(
                time.split(" ")[0].split(".").reverse().join("-") +
                  " " +
                  time.split(" ")[2]
              );
              const isCancelDisabled = remainingTime.remainingHours < 12;
              const isPastAppointment = appointmentDate < currentDate;
              const name =
                `${formEntry.firstName || ""} ${
                  formEntry.lastName || ""
                }`.trim() || "Bayram Çınar"; //DATA BASE DEN ALINAN GİRİŞ YAPMIŞ KULLANICI İSMİ

              return (
                <AgendaCard
                  key={index}
                  appointmentNumber={formEntry.appointmentNumber}
                  name={name}
                  remainingTime={
                    remainingTime.remainingHours > 0 ? (
                      `${remainingTime.remainingHours} saat ${remainingTime.remainingMinutes} dakika`
                    ) : remainingTime.remainingMinutes > 0 ? (
                      <span>{`${remainingTime.remainingMinutes} dakika`}</span>
                    ) : (
                      <span>Randevu Bitti</span>
                    )
                  }
                  isPastAppointment={isPastAppointment}
                  requestStatus={requestStatus}
                  service={service}
                  status={status}
                  time={timeInfo}
                  date={dateInfo}
                  showDetails={() => handleOpenModal(formEntry)}
                  deleteFunction={() =>
                    handleDelete(formEntry, isCancelDisabled)
                  }
                  isCancelDisabled={isCancelDisabled}
                />
              );
            })}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    const swiperProps = isMobile
      ? {
          direction: "vertical",
          pagination: { clickable: true, dynamicBullets: true },
          modules: [Pagination, Navigation],
          navigation: {
            prevEl: ".custom-swiper-button-prev",
            nextEl: ".custom-swiper-button-next",
          },
        }
      : {
          navigation: {
            prevEl: ".custom-swiper-button-prev",
            nextEl: ".custom-swiper-button-next",
          },
          modules: [Navigation],
        };

    return (
      <Swiper {...swiperProps} className="mySwiper">
        {swiperSlides}
      </Swiper>
    );
  };

  function getTableHeaders() {
    switch (filter) {
      case "past":
        return "Geçmiş Randevularım";
      case "cancelled":
        return "İptal Edilen Randevularım";
      case "today":
        return "Bugünki Randevularım";
      case "future":
        return "Gelecek Randevularım";
      default:
        return "Yaklaşan Randevularım";
    }
  }

  return (
    <>
      <div className="bg-white lg:scale-[1] md:scale-[0.9] lg:mr-[1rem] border-premiumPurple border-2 rounded-xl max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 w-full flex-grow">
        <div className="w-full shadow-xl overflow-auto max-h-600">
          <div className="flex">
            <div className="w-[33%] flex items-center justify-center"></div>
            <h1 className=" lg:text-[1.5vw] max-[768px]:text-xl max-[768px]:w-[48%] w-[33%] text-center max-[768px]:justify:start font-semibold mt-5 sticky top-0 text-deepSlateBlue p-3 pb-0">
              {getTableHeaders()}
            </h1>
            <div className="flex w-[33%] max-[768px]:w-[48%] justify-end items-center mb-4 mt-6">
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="p-2 w-[11vw] border rounded-3xl text-sm max-[768px]:w-[120px]"
              >
                <option value="all">Yaklaşan Randevular</option>
                <option value="past">Geçmiş Randevular</option>
                <option value="today">Bugünki Randevular</option>
                <option value="future">Gelecekteki Randevular</option>
                <option value="cancelled">İptal Edilen Randevular</option>
              </select>
            </div>
          </div>
          {pendingAppointments.length > 0 && (
            <h1 className="text-md max-[768px]:text-sm text-coral text-center font-semibold flashing-text mb-2 max-[768px]:mb-0">
              {pendingAppointments.length} İşlem bekleyen randevu lütfen kontrol
              ediniz.
            </h1>
          )}
          {pendingAppointments.length === 0 && (
            <h1 className="text-md max-[768px]:text-sm text-coral text-center font-semibold mb-2 max-[768px]:mb-0">
              Yaklaşan randevunuz bulunmamaktadır.
            </h1>
          )}
          <div className=" agendaCardSwiper">
            {!isMobile && (
              <table className="rounded-xl w-full ">
                <thead>
                  <tr className="sticky top-0 bg-premiumPurple text-white">
                    <th className="p-3">Sıra</th>
                    <th className="p-3">Randevu Numarası</th>
                    <th className="p-3">Tarih</th>
                    <th className="p-3">Saat</th>
                    <th className="p-3">Randevu</th>
                    <th className="p-3">İşlemler</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3">Kalan Süre</th>
                  </tr>
                </thead>
                <tbody>{convertFormDataToTable()}</tbody>
              </table>
            )}
            {isMobile && <>{renderSwiper(paginatedFormData)}</>}
          </div>
        </div>
        {!isMobile && (
          <div className="flex justify-center my-3">
            <ul className="flex space-x-2">
              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-2 border cursor-pointer rounded-2xl ${
                    page + 1 === currentPage
                      ? "bg-premiumPurple text-white"
                      : "border-gray-300"
                  }`}
                >
                  <button onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <EventModal
        isOpen={openModal}
        onClose={handleCloseModal}
        event={selectedEvent}
        randevuTarih={selectedEvent && selectedEvent.time.split(" ")[0]}
        randevuSaat={selectedEvent && selectedEvent.time.split(" ")[2]}
        endSaat={
          selectedEvent &&
          calculateEndTime(
            selectedEvent.time.split(" ")[2],
            selectedEvent.duration
          )
        }
      />
    </>
  );
}

export default Agenda;
