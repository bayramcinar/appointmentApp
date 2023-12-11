import React from 'react';

function AppointmentBox({ time, date, selectedTime, onTimeClick, active }) {
  const handleTimeClick = () => {                //seçtiğimiz saati geri döndürüyor ve background renk ayarlamarını yapıyor
    if (active) {
      if (onTimeClick && typeof onTimeClick === 'function') {
        onTimeClick(time, date);
      }
    } else {
      alert("This time is selected from someone");
    }
  };                                                              

  const isSelected = selectedTime === time;     // seçtiğimiz saati atadığımız değişken

  return (
    <div>
      <div
        className={`timeBox w-20 ${
          isSelected ? 'bg-red-600' : 'bg-appoinmentBox'
        } ${active ? 'bg-appoinmentBox' : 'bg-stepBorder1'} rounded-3xl p-2 m-3 cursor-pointer`}
        onClick={handleTimeClick}
      >
        <h4 className='text-sm text-text p-1 text-center'>{time}</h4>
      </div>
    </div>
  );
}


export default AppointmentBox;
