import './App.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import AppointmentComponent from './components/appointmentComponent';

function App() {
  return (
    <div className="App">
        <AppointmentComponent/>
    </div>
  );
}

export default App;
