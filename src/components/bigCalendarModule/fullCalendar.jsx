import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../style/fullCalendar.css";
import "moment-timezone";
import EventModalForCalendar from "../commonModules/eventModalForBigCalendar";
import Swal from "sweetalert2";
const localizer = momentLocalizer(moment);

const convertToISOFormat = (inputDate, onRequestChange) => {
  const dateComponents = inputDate.split(/[.\s]/);
  const day = dateComponents[0];
  const month = dateComponents[1];
  const year = dateComponents[2];
  const timeComponents = dateComponents[4].split(":");
  const hour = timeComponents[0];
  const minute = timeComponents[1];
  const request = dateComponents[5] === "true";
  onRequestChange(request);
  const isoFormattedDate = moment(
    `${year}-${month}-${day}T${hour - 3}:${minute}:00.000Z`,
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "Europe/Istanbul"
  );
  return isoFormattedDate;
};

const getSessionStorageData = (formData, setRequest) => {
  if (!formData || !Array.isArray(formData)) {
    return [];
  }

  return formData.map((formEntry) => {
    const name =
      formEntry.firstName && formEntry.lastName
        ? formEntry.firstName + " " + formEntry.lastName
        : "Bayram Çınar"; // VEYA DAN SONRAKİ YERE DATA BASE DEN GİRİŞ YAPMIŞ KULLANICININ BİLGİLERİNİ VERECEĞİMİZ YERS
    const gender = formEntry.gender || "erkek";
    const birthday = formEntry.dateOfBirth || "2023-02-13";
    const language = formEntry.language;
    const notes = formEntry.notes;
    const service = formEntry.service;
    const deleteStatus = formEntry.delete;
    const requestInfo = formEntry.time.split(" ")[3];
    const appointmentNumber = formEntry.appointmentNumber;

    let request = false;

    const start = convertToISOFormat(formEntry.time, (value) => {
      request = value;
    }).toDate();

    const end = convertToISOFormat(formEntry.time, () => {})
      .add(formEntry.duration, "minutes")
      .toDate();

    return {
      requestInfo: requestInfo,
      name: name,
      appointmentNumber: appointmentNumber,
      gender: gender,
      birthday: birthday,
      language: language,
      delete: deleteStatus,
      notes: notes,
      title: service,
      start: start,
      end: end,
    };
  });
};

function FullCalendarComponent() {
  const [formData, setFormData] = useState([]);
  const [request, setRequest] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isFullDayModalOpen, setFullDayModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [isHalfMid, setHalfMid] = useState(
    500 < window.innerWidth && window.innerWidth <= 1024
  );
  const [isMid, setIsMid] = useState(
    window.innerWidth <= 1360 && 1024 < window.innerWidth
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setHalfMid(500 <= window.innerWidth && window.innerWidth <= 1024);
    setIsMid(window.innerWidth <= 1360 && 1024 <= window.innerWidth);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);
    }

    const storedSelectedTimes = localStorage.getItem("selectedTimes");
    if (storedSelectedTimes) {
      const parsedSelectedTimes = JSON.parse(storedSelectedTimes);
      setSelectedTimes(parsedSelectedTimes);
    }
  });

  const eventsFromSessionStorage = getSessionStorageData(formData, setRequest);

  selectedTimes.forEach((timeObj) => {
    if (timeObj.active) {
      try {
        const event = {
          title: "Boş Randevu",
          start: moment(timeObj.date + " " + timeObj.time).toDate(),
          end: moment(timeObj.date + " " + timeObj.time)
            .add(timeObj.duration, "minutes")
            .toDate(),
        };
        eventsFromSessionStorage.push(event);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const handleFullDayModalOpen = () => {
    setFullDayModalOpen(true);
  };

  const handleFullDayModalClose = () => {
    setFullDayModalOpen(false);
  };

  const [selectedEvent, setSelectedEvent] = useState([]);
  const parseDateAndTime = (dateTimeString) => {
    // Örnek dateTimeString: "Thu Mar 07 2024 11:00:00 GMT+0300 (GMT+03:00)"
    // Verilen stringi boşluklara göre parçalara ayırma
    const parts = String(dateTimeString).split(" ");
    console.log(parts);
    // Gün, Ay ve Yıl bilgisini alarak düzgün bir string oluşturma
    const dateString = `${parts[3]}-${getMonthNumber(parts[1])}-${parts[2]}`;

    // Saat ve Dakika bilgisini alarak düzgün bir string oluşturma
    const timeString = parts[4];
    const realTİmeString = timeString.split(":");
    const realTime = realTİmeString[0] + ":" + realTİmeString[1];
    // Oluşturulan stringleri bir araya getirerek sonuç oluşturma
    const result = {
      date: dateString,
      time: realTime,
    };
    console.log(result);
    return result;
  };

  // Ay isimlerinden ayın numarasını almak için bir yardımcı fonksiyon
  const getMonthNumber = (monthName) => {
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return months[monthName];
  };
  const deleteSelectedTime = (date, time) => {
    console.log(date);
    console.log(time);
    const updatedSelectedTimes = selectedTimes.filter(
      (timeObj) => !(timeObj.date === date && timeObj.time === time)
    );
    setSelectedTimes(updatedSelectedTimes);
    localStorage.setItem("selectedTimes", JSON.stringify(updatedSelectedTimes));
  };
  const onSelectEvent = (event) => {
    if (event.title === "Boş Randevu") {
      parseDateAndTime(event.start);
      const selectedDate = moment(event.start).format("YYYY-MM-DD");
      setSelectedDay(selectedDate);
      Swal.fire({
        title: "Emin misiniz!",
        text: "Boş randevuyu silmek istediğinize emin misiniz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteSelectedTime(
            parseDateAndTime(event.start).date,
            parseDateAndTime(event.start).time
          );
          Swal.fire({
            title: "Başarılı !",
            text: "Boş randevu başarılı bir şekilde silindi.",
            icon: "success",
            confirmButtonText: "Kapat",
          });
        }
      });
    } else {
      setSelectedEvent(event);
      handleFullDayModalOpen();
    }
  };

  const eventPropGetter = (event) => {
    try {
      if (event && event.title) {
        const isPastEvent = moment(event.start).isBefore(moment(), "day");

        if (isPastEvent) {
          return {
            className: "past-event",
            style: {
              backgroundColor: "hsl(0, 0%, 75%)",
            },
          };
        } else {
          if (event.delete === true) {
            return {
              className: "deleted-appointment",
              style: {
                backgroundColor: "hsl(0, 89.87%, 75%)",
              },
            };
          }
          if (event.title === "Boş Randevu") {
            return {
              className: "empty-appointment",
              style: {
                backgroundColor: "hsl(36, 100%, 75%)",
              },
            };
          }
        }
      }
    } catch (error) {
      console.error("Error handling event:", error);
    }

    return {};
  };

  const messages = {
    allDay: "Tüm gün",
    previous: "Önceki",
    next: "Sonraki",
    today: "Bugün",
    month: "Ay",
    week: "Hafta",
    day: "Gün",
    agenda: "Ajanda",
    date: "Tarih",
    time: "Saat",
    event: "Olay",
    more: "Daha",
  };

  const isMobileForAnimation = window.innerWidth <= 768;
  return (
    <>
      <div
        className={`bg-white lg:scale-[1] md:scale-[0.9] lg:mr-[1rem] shadow-xl rounded-xl max-[768px]:mx-[15px] flex items-center justify-center animate__animated lg:w-full ${
          isMobileForAnimation ? "" : "animate__fadeInBottomLeft"
        }`}
      >
        <div className="lg:mx-auto relative w-full max-[500px]:w-[360px] p-2 lg:p-5">
          <h1 className=" text-[1.5vw] max-[768px]:text-xl m-6 mb-2 ml-5 max-[500px]:m-3 mt-1 text-gray-600 font-semibold text-center flex justify-center lg:justify-start">
            Randevu Takvimi
          </h1>
          <div className="colorsMean mb-5  flex right-1 ml-5 top-1 font-semibold justify-start items-center text-gray-600 md:text-[1.2vw] lg:text-[1vw] xl:text-[0.9vw]">
            <div className="lg:flex lg:flex-row lg:justify-start">
              <div className="flex max-[500px]:mr-2 mr-2">
                <i class="fa-solid fa-circle text-greenCalendar max-[500px]:text-xs flex justify-center items-center"></i>
                <h1 className="max-[500px]:text-xs  ml-2 max-[500px]:text-center flex justify-center items-center">
                  Dolu Randevular
                </h1>
              </div>
              <div className="flex  max-[500px]:mr-2 mr-2">
                <i class="fa-solid fa-circle text-calanderAppointment max-[500px]:text-xs    flex justify-center items-center"></i>
                <h1 className="max-[500px]:text-xs   ml-2 max-[500px]:text-center flex justify-center items-center">
                  Boş Randevular
                </h1>
              </div>
            </div>
            <div className="lg:flex lg:flex-row lg:justify-start">
              <div className="flex max-[500px]:mr-2 mr-2">
                <i class="fa-solid fa-circle text-grayCalendar max-[500px]:text-xs   flex justify-center items-center"></i>
                <h1 className="max-[500px]:text-xs ml-2 max-[500px]:text-center flex justify-center items-center">
                  Tamamlanmış Randevular
                </h1>
              </div>
              <div className="flex max-[500px]:mr-2 mr-2">
                <i class="fa-solid fa-circle text-coral max-[500px]:text-xs  flex  justify-center items-center"></i>
                <h1 className="max-[500px]:text-xs  ml-2 max-[500px]:text-center flex justify-center items-center">
                  İptal Edilen Randevular
                </h1>
              </div>
            </div>
          </div>
          <div className="myCustomHeight">
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: isMobile
                  ? "600px"
                  : isHalfMid
                  ? "600px"
                  : isMid
                  ? "600px"
                  : "35vw",
                width: isMobile
                  ? "100%"
                  : isHalfMid
                  ? "100%"
                  : isMid
                  ? "100%"
                  : "100%",
              }}
              events={eventsFromSessionStorage}
              onSelectEvent={onSelectEvent}
              defaultView={Views.WEEK}
              views={
                isMobileForAnimation
                  ? ["week", "day"]
                  : ["month", "week", "day"]
              }
              selectable
              popup
              messages={messages}
              eventPropGetter={eventPropGetter}
            />
          </div>
        </div>
      </div>
      <EventModalForCalendar
        event={selectedEvent}
        isOpen={isFullDayModalOpen}
        onClose={handleFullDayModalClose}
      />
    </>
  );
}

export default FullCalendarComponent;
