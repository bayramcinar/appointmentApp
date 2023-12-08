import React, { useState, useEffect } from 'react';
import AppointmentBox from './appointmentBox';
import CalendarBox from './calendar';
import '../style/dayComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

function TimeAndDate({ setReturnDate, times }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateDisplay, setCurrentDateDisplay] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const formattedDate = formatDateDisplay(selectedDate);
    setCurrentDateDisplay(formattedDate);
  }, [selectedDate]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setSelectedTime(null);
  };

  const formatDateDisplay = (date) => {
    const tarihNesnesi = new Date(date);
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = tarihNesnesi.toLocaleDateString('tr-TR', options);
    return formattedDate;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const handleAppointmentBoxClick = (clickedTime) => {
    const formattedReturnDate = `${currentDateDisplay} ${clickedTime}`;
    setReturnDate(formattedReturnDate);
    setSelectedTime(clickedTime);
  };

  const renderSwiper = (times) => {   //yan yana 3 toplam max 9 tane timeBox ekleyen kod
    const swiperSlides = [];
    for (let i = 0; i < times.length; i += 9) {
      const currentTimes = times.slice(i, i + 9);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center w-96 h-52 appointmentBoxArea">
            {currentTimes.map((time, index) => (
              <AppointmentBox
                key={index}
                time={time.time}
                onTimeClick={handleAppointmentBoxClick}
                selectedTime={selectedTime}
                active={time.active}
                date={time.date}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }
    return (
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {swiperSlides}
      </Swiper>
    );
  };

  const appointmentTimesForSelectedDate = times.filter((time) => {
    const formattedSelectedDate = formatDate(selectedDate);
    return formatDate(new Date(time.date)) === formattedSelectedDate;
  });

  return (
    <div className='animate__animated animate__fadeInLeft'>
      <div className="title">
        <h2 className="text-buttonColor text-center text-3xl font-bold p-3">Tarih ve Zaman Seçiniz</h2>
      </div>
      <div className="bg-dayComponentBg dayComponent flex flex-col md:flex-row">
        <div className='flex flex-col items-center justify-between md:order-1 md:w-1/2'>
          <div className="choosenDate mb-6">
            <div className="dateText m-2">
              <h2 className="text-center text-buttonColor text-lg font-semibold">{currentDateDisplay}</h2>
            </div>
          </div>
          <div className="leftArea flex-1">
            <div className="appointmentTimes w-96 h-52">
              {appointmentTimesForSelectedDate.length > 0 ? (
                renderSwiper(appointmentTimesForSelectedDate)
              ) : (
                <div className="flex flex-wrap items-center justify-center w-96 h-52 appointmentBoxArea">
                  <p className="text-red-500">Uygun saatler bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="rightArea flex-1 h-full flex items-center justify-center md:order-2">
          <CalendarBox selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
}

export default TimeAndDate;
