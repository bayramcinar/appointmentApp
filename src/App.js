import './App.css';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import AppointmentComponent from './components/appointmentComponent';
import Navbar from './components/navbar';
import SetAppointmentTime from './components/setAppointmentTime';
import { Route, Routes } from "react-router-dom";
import MyAppointments from './components/myAppointments';

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  
  return (
      <>
      <Navbar/>
      <Routes>
        <Route path='*' element={<AppointmentComponent/>} />  
        <Route path='/' element={<AppointmentComponent/>} />
        <Route path='/setAppointmentTime' element={<SetAppointmentTime/>} />
        <Route path='/myAppointments' element={<MyAppointments/>} />
      </Routes>
    </>
  );
}

export default App;
