import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../style/fullCalendar.css";
import "moment-timezone";
import EventModal from "./eventModal";

const localizer = momentLocalizer(moment);

const convertToISOFormat = (inputDate, onRequestChange) => {
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

  // Set request based on the condition
  const request = dateComponents[5] === "true";
  onRequestChange(request);

  // Tarihi ISO 8601 formata dönüştür ve moment nesnesine çevir
  const isoFormattedDate = moment(
    `${year}-${month}-${day}T${hour - 3}:${minute}:00.000Z`,
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "Europe/Istanbul"
  );

  return isoFormattedDate;
};

// localStorage'den alınan veriyi events dizisine dönüştüren fonksiyon
const getSessionStorageData = (formData, setRequest) => {
  if (!formData || !Array.isArray(formData)) {
    return [];
  }

  return formData.map((formEntry) => {
    const title =
      formEntry.firstName && formEntry.lastName
        ? formEntry.firstName + " " + formEntry.lastName
        : "Bayram Çınar";

    const gender = formEntry.gender || "erkek";
    const birthday = formEntry.dateOfBirth || "2023-02-13";
    const language = formEntry.language;
    const notes = formEntry.notes;
    const service = formEntry.service;

    let request = false;

    const start = convertToISOFormat(formEntry.time, (value) => {
      request = value;
    }).toDate();

    const end = convertToISOFormat(formEntry.time, () => {})
      .add(formEntry.duration, "minutes")
      .toDate();

    return {
      name: title,
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    // kaydedilen randevuları localStorage dan alan hooks
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);
    }
  }, []);

  const eventsFromSessionStorage = getSessionStorageData(formData, setRequest);

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
