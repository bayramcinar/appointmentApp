import React, { useState } from 'react';
import "../style/setAppointmentTime.css"
import { useAppointmentContext } from "./appointmentContext";

function SetAppointmentTime({ onSetTime }) {
  const [hour, setHour] = useState('');  //saati tuttuğumuz değişken
  const [minute, setMinute] = useState(''); //dakika yı tuttuğumuz değişken
  const [chosenDate, setChosenDate] = useState('');  // tarihi tuttuğumuz değişken

  const { addSelectedTime } = useAppointmentContext();  //useContext ile sessionStorage a gönderdiğimiz time lar
  
  const handleSetTime = () => {
    if (!hour || !minute || !chosenDate) {
      alert('Please fill in all fields'); // Show an alert for empty inputs
      return;
    }
  
    const selectedTime = `${hour}:${minute}`;
    const selectedDateTime = `${chosenDate} ${selectedTime}`;
  
    // Check if the selected date and time already exist in sessionStorage
    const existingTimes = JSON.parse(sessionStorage.getItem('selectedTimes')) || [];
    const isDuplicate = existingTimes.some((item) => {
      const existingDateTime = `${item.date} ${item.time}`;
      return existingDateTime === selectedDateTime;
    });
  
    if (isDuplicate) {
      alert('This appointment date and time already exist. Please choose a different date or time.');
      return;
    }
  
    // Add the selected date and time to sessionStorage
    const dateTimeObject = {
      time: selectedTime,
      date: chosenDate,
      active: true,
    };
  
    addSelectedTime(dateTimeObject);
  
    setHour('');
    setMinute('');
    setChosenDate('');
    alert('Appointment date and time are added');
  };

  const today = new Date().toISOString().split('T')[0]; // Bugünkü tarihi al

  return (
    <div className='ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col'>
      <h2 className='text-buttonColor text-2xl m-3 font-semibold'>Randevu Zamanı Belirle</h2>
      <div>
        <div className='m-3'>
          <input
            id="datepicker"
            className='p-3 focus:border-none outline-none'
            placeholder='Tarih'
            type="date"
            min={today}
            value={chosenDate}
            onChange={(e) => setChosenDate(e.target.value)}
          />
        </div>
        <div className='m-3'>
          <input
  id="timepicker"
  className='p-3 focus:border-none outline-none'
  type="time"
  placeholder='Saat'
  value={hour + ':' + minute} 
  onChange={(e) => {
    const [newHour, newMinute] = e.target.value.split(':');
    setHour(newHour);
    setMinute(newMinute);
  }}
  min={new Date().toLocaleTimeString('en-US', { hour12: false })}
/>

        </div>
        <div className='w-full flex items-center justify-center'>
          <button onClick={handleSetTime} className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4">
            <h4 className="text-text p-2 px-6 text-sm tracking-wider">Zamanı ve Tarihi Ayarla</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetAppointmentTime;
