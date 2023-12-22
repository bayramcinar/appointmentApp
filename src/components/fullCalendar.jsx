import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../style/fullCalendar.css";
import "moment-timezone";
import EventModal from "./eventModal";

const localizer = momentLocalizer(moment);

const convertToISOFormat = (inputDate) => {
  // Gelen tarihi boşluktan ve noktadan ayır
  const dateComponents = inputDate.split(/[.\s]/);

  // Gün, ay ve yıl bilgilerini al
  const day = dateComponents[0];
  const month = dateComponents[1];
  const year = dateComponents[2];

  // Saat ve dakika bilgilerini al ve ":" karakterinden böl
  const timeComponents = dateComponents[4].split(":");
  const hour = timeComponents[0];
  const minute = timeComponents[1];

  // Tarihi ISO 8601 formata dönüştür ve moment nesnesine çevir
  const isoFormattedDate = moment(
    `${year}-${month}-${day}T${hour - 3}:${minute}:00.000Z`,
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "Europe/Istanbul"
  );

  return isoFormattedDate;
};

// sessionStorage'den alınan veriyi events dizisine dönüştüren fonksiyon
const getSessionStorageData = () => {
  const formDataString = sessionStorage.getItem("formData");
  const formData = JSON.parse(formDataString);

  if (!formData || !Array.isArray(formData)) {
    return [];
  }

  // Tüm formData elemanlarını dolaş ve yazdır
  formData.forEach((formEntry, index) => {
    const convertedDate = convertToISOFormat(formEntry.time);
  });

  // events dizisine dönüştürme
  const events = formData.map((formEntry) => ({
    name: formEntry.firstName + " " + formEntry.lastName,
    gender: formEntry.gender,
    birthday: formEntry.dateOfBirth,
    language: formEntry.language,
    notes: formEntry.notes,
    title: formEntry.service,
    start: convertToISOFormat(formEntry.time).toDate(),
    end: convertToISOFormat(formEntry.time)
      .add(formEntry.duration, "minutes")
      .toDate(),
  }));

  return events;
};

function FullCalendarComponent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const eventsFromSessionStorage = getSessionStorageData();

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto p-5">
        <h1 className="text-buttonColor text-2xl m-6 mt-1 font-semibold text-center">
          Randevular Takvim Görünümü
        </h1>
        <div className="myCustomHeight">
          <Calendar
            localizer={localizer}
            events={eventsFromSessionStorage}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, width: 900 }}
            onSelectEvent={handleEventClick} // Add this line
            popup
          />
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        event={selectedEvent}
      />
    </>
  );
}

export default FullCalendarComponent;
