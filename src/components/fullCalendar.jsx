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

  const now = moment(); // Get the current date and time

  return formData
    .map((formEntry) => {
      const name =
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

      // Check if the event has already occurred
      if (moment(start).isBefore(now)) {
        return null; // Skip past events
      }

      return {
        name: name,
        gender: gender,
        birthday: birthday,
        language: language,
        notes: notes,
        title: service + " " + (request ? "(Randevu Talebi)" : ""),
        start: start,
        end: end,
      };
    })
    .filter(Boolean); // Remove null entries (past events)
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
  }, []);

  const eventsFromSessionStorage = getSessionStorageData(formData, setRequest);

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

  return (
    <>
      <div className="mx-auto p-5">
        <h1 className="text-buttonColor text-2xl m-6 mt-1 font-semibold text-center">
          Randevular Takvim Görünümü
        </h1>
        <div className="myCustomHeight">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={isMobile ? { height: 600 } : { height: 700, width: 900 }}
            events={eventsFromSessionStorage}
            onSelectEvent={onSelectSlot}
            defaultView={isMobile ? Views.WEEK : Views.MONTH}
            views={
              isMobile ? ["week", "day"] : ["month", "week", "day", "agenda"]
            }
            selectable
            popup
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
