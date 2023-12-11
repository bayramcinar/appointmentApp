import React, { useState } from 'react';
import "../style/setAppointmentTime.css"
import { useAppointmentContext } from "./appointmentContext";

function SetAppointmentTime({ onSetTime }) {
  const [hour, setHour] = useState('');  //saati tuttuğumuz değişken
  const [minute, setMinute] = useState(''); //dakika yı tuttuğumuz değişken
  const [chosenDate, setChosenDate] = useState('');  // tarihi tuttuğumuz değişken

  const { addSelectedTime } = useAppointmentContext();  //useContext ile sessionStorage a gönderdiğimiz time lar
  
  const handleSetTime = () => {  //form submit fonksionu
    const selectedTime = `${hour}:${minute}`;
    const dateTimeObject = {
      time: selectedTime,
      date: chosenDate,
      active: true,
    };
    addSelectedTime(dateTimeObject);

    setHour('');
    setMinute('');
    setChosenDate('');
  };

  const today = new Date().toISOString().split('T')[0]; // Bugünkü tarihi al

  return (
    <div className='ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col'>
      <h2 className='text-buttonColor text-2xl m-3 font-semibold'>Randevu Zamanı Belirle</h2>
      <div>
        <div className='m-3'>
          <input
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
            className='p-3 focus:border-none outline-none'
            type="number"
            placeholder='Saat'
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </div>
        <div className='m-3'>
          <input
            className='p-3 focus:border-none outline-none'
            type="number"
            placeholder='Dakika'
            min="0"
            max="59"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
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
