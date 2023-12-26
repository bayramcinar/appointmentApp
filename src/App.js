import "./App.css";
import "react-calendar/dist/Calendar.css";
import React from "react";
import AppointmentComponent from "./components/appointmentComponent";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import MyAppointments from "./components/myAppointments";
import Dashboard from "./components/dashboard";

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
