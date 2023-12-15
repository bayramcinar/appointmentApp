import React from 'react';
import { useAppointmentContext } from "./appointmentContext";
import { Field, Form, Formik } from 'formik';
import "../style/setAppointmentTime.css"
import Swal from 'sweetalert2';

function SetAppointmentTime() {
  const { addSelectedTime } = useAppointmentContext();

  const handleSetTime = (values,{ resetForm }) => {
    const { chosenDate, time } = values;

    console.log(values);
  
    if (!time || !chosenDate) {
      Swal.fire({
        title: 'Hata !',
        text: 'Lütfen tüm bilgileri doldurun.',
        icon: 'error',
        confirmButtonText: 'Kapat'
      })
      return;
    }

    // Extracting hour and minute from the time string
    const [hour, minute] = time.split(':');
  
    const selectedTime = `${hour}:${minute}`;
    const selectedDateTime = `${chosenDate} ${selectedTime}`;
  
    const existingTimes = JSON.parse(sessionStorage.getItem('selectedTimes')) || [];
    const isDuplicate = existingTimes.some((item) => {
      const existingDateTime = `${item.date} ${item.time}`;
      return existingDateTime === selectedDateTime;
    });
  
    if (isDuplicate) {
      Swal.fire({
        title: 'Hata !',
        text: 'Bu randevu saati zaten mevcut.',
        icon: 'error',
        confirmButtonText: 'Kapat'
      })
      return;
    }
  
    const dateTimeObject = {
      time: selectedTime,
      date: chosenDate,
      active: true,
    };
  
    addSelectedTime(dateTimeObject);

    resetForm();

    Swal.fire({
      title: 'Başarılı',
      text: 'Randevu saati başarılı bir şekilde eklendi.',
      icon: 'success',
      confirmButtonText: 'Kapat'
    })
  };
  

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col lg:w-[35rem] md:w-[24rem] lg:h-[515px] sm:h-auto'>
      <h2 className='text-buttonColor text-2xl m-3 font-semibold'>Randevu Zamanı Belirle</h2>
      <Formik
      initialValues={{ chosenDate: '', time: '' }}
      onSubmit={handleSetTime}
    >
      <Form>
        <div className='m-3 field-container'>
          <Field
            name="chosenDate"
            type="date"
            min={today}
            className={`p-3 lg:w-[30rem] max-[768px]:w-[22rem] focus:border-none outline-none`}
            placeholder='Tarih'
          />
        </div>
        <div className='m-3 field-container'>
          <Field
            name="time"
            type="time"
            min={getCurrentTime()}
            className={`p-3 lg:w-[30rem] max-[768px]:w-[22rem] focus:border-none outline-none`}
            placeholder='Saat'
          />
        </div>
        <div className='w-full flex items-center justify-center'>
          <button type="submit" className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4">
            <h4 className="text-text p-2 px-6 text-sm tracking-wider">Zamanı ve Tarihi Ayarla</h4>
          </button>
        </div>
      </Form>
    </Formik>
    </div>
  );
}

function getCurrentTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = now.getMinutes().toString().padStart(2, '0');
  return `${currentHour}:${currentMinute}`;
}

export default SetAppointmentTime;
