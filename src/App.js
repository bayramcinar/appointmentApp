import "./App.css";
import "react-calendar/dist/Calendar.css";
import React from "react";
import AppointmentComponent from "./components/appointmentComponent";
import Navbar from "./components/navbar";
import SetAppointmentTime from "./components/setAppointmentTime";
import { Route, Routes } from "react-router-dom";
import MyAppointments from "./components/myAppointments";
import FullCalendarComponent from "./components/fullCalendar";
import Dashboard from "./components/dashboard";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<AppointmentComponent />} />
        <Route path="/" element={<AppointmentComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myAppointments" element={<MyAppointments />} />
      </Routes>
    </>
  );
}

export default App;
