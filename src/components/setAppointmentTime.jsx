import React, { useState } from 'react';
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
    <div className='ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col lg:w-[56rem] md:w-[24rem] lg:h-[515px] sm:h-auto'>
      <h2 className='text-buttonColor text-2xl m-3 font-semibold'>Randevu Zamanı Belirle</h2>
      <div>
        <div className='m-3'>
          <input
            id="datepicker"
            className={`p-3 lg:w-[30rem] max-[768px]:w-[22rem] focus:border-none outline-none before:content-'Tarih:' before:mr-1 before:text-gray-600`}
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
            className={`p-3 lg:w-[30rem] max-[768px]:w-[22rem] focus:border-none outline-none before:content-'Saat:' before:mr-1 before:text-gray-600`}
            type="time"
            placeholder='Saat'
            value={hour + ':' + minute} 
            onChange={(e) => {
              const [newHour, newMinute] = e.target.value.split(':');
              setHour(newHour);
              setMinute(newMinute);
            }}
            min={getCurrentTime()}
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


function getCurrentTime() {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = now.getMinutes().toString().padStart(2, '0');
  return `${currentHour}:${currentMinute}`;
}

export default SetAppointmentTime;
