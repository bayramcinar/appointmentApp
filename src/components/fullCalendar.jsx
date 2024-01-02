import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../style/fullCalendar.css";
import "moment-timezone";
import FullCalendarDayModal from "./fullCalanderDayModal";

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
        : "Bayram Çınar";
    const gender = formEntry.gender || "erkek";
    const birthday = formEntry.dateOfBirth || "2023-02-13";
    const language = formEntry.language;
    const notes = formEntry.notes;
    const service = formEntry.service;
    const requestInfo = formEntry.time.split(" ")[3];

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
      gender: gender,
      birthday: birthday,
      language: language,
      notes: notes,
      title: service + " " + (request ? "(Randevu Talebi)" : ""),
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
  const isMobile = window.innerWidth <= 768;

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

  // Add events from selectedTimes to the eventsFromSessionStorage array
  selectedTimes.forEach((timeObj) => {
    if (timeObj.active) {
      const event = {
        title: "Boş Randevu",
        start: moment(timeObj.date + " " + timeObj.time).toDate(),
        end: moment(timeObj.date + " " + timeObj.time)
          .add(timeObj.duration, "minutes")
          .toDate(),
      };

      eventsFromSessionStorage.push(event);
    }
  });

  const handleFullDayModalOpen = () => {
    setFullDayModalOpen(true);
  };

  const handleFullDayModalClose = () => {
    setFullDayModalOpen(false);
  };

  const onSelectSlot = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    const isPastDate = moment(selectedDate).isBefore(moment(), "day");

    if (!isPastDate) {
      handleFullDayModalOpen();
      const filteredTimes = selectedTimes.filter(
        (timeObj) => timeObj.date === selectedDate
      );
      setSelectedDay(selectedDate);
    }
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    const isPastEvent = moment(event.start).isBefore(moment(), "day");
    if (event.requestInfo === "true") {
      return {
        className: "request-appointment",
        style: {
          backgroundColor: "#5D3587",
          opacity: 0.6,
        },
      };
    }

    if (isPastEvent) {
      return {
        className: "past-event",
        style: {
          backgroundColor: "gray",
          opacity: 0.6,
        },
      };
    }

    if (event.title === "Boş Randevu") {
      return {
        className: "empty-appointment",
        style: {
          backgroundColor: "#FF9800",
        },
      };
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
  };

  return (
    <>
      <div className="mx-auto lg:p-5 max-[768px]:p-3 relative w-full">
        <h1 className="text-buttonColor text-2xl m-6 max-[768px]:m-3 mt-1 font-semibold text-center">
          Randevular Takvimi
        </h1>
        <div className="colorsMean mt-[25px] max-[768px]:mb-5 lg:absolute max-[768px]:flex  max-[768px]:justify-center max-[768px]:items-center right-1 top-1 font-semibold justify-center items-center">
          <div className="lg:flex lg:items-center lg:justify-center">
            <div className="flex max-[768px]:mr-2 mr-2">
              <i class="fa-solid fa-circle text-appoinmentBox text-xs  max-[768px]:flex  max-[768px]:justify-center max-[768px]:items-center"></i>
              <h1 className="text-xs max-[768px]:text-xs ml-2 max-[768px]:text-center">
                Randevu alınmış saatler
              </h1>
            </div>
            <div className="flex  max-[768px]:mr-2 mr-2">
              <i class="fa-solid fa-circle text-calanderAppointment text-xs max-[768px]:flex  max-[768px]:justify-center max-[768px]:items-center"></i>
              <h1 className="text-xs max-[768px]:text-xs ml-2 max-[768px]:text-center">
                Randevu alınmamış saatler
              </h1>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-center">
            <div className="flex max-[768px]:mr-2 mr-2">
              <i class="fa-solid fa-circle text-stepBorder1 text-xs max-[768px]:flex  max-[768px]:justify-center max-[768px]:items-center"></i>
              <h1 className="text-xs max-[768px]:text-xs ml-2 max-[768px]:text-center">
                Geçmiş Randevular
              </h1>
            </div>
            <div className="flex max-[768px]:mr-2 mr-2">
              <i class="fa-solid fa-circle text-appointmentRequest text-xs  max-[768px]:flex  max-[768px]:justify-center max-[768px]:items-center"></i>
              <h1 className="text-xs max-[768px]:text-xs ml-2 max-[768px]:text-center">
                Randevu Talepleri
              </h1>
            </div>
          </div>
        </div>
        <div className="myCustomHeight">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={isMobile ? { height: 600 } : { height: 700, width: 900 }}
            events={eventsFromSessionStorage}
            onSelectEvent={onSelectSlot}
            defaultView={isMobile ? Views.WEEK : Views.MONTH}
            views={isMobile ? ["week", "day"] : ["month", "week", "day"]}
            selectable
            popup
            messages={messages}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>
      <FullCalendarDayModal
        isOpen={isFullDayModalOpen}
        onClose={handleFullDayModalClose}
        time={selectedDay}
      />
    </>
  );
}

export default FullCalendarComponent;
