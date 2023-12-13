import React, { useState, useEffect } from 'react';
import AppointmentBox from './appointmentBox';
import CalendarBox from './calendar';
import '../style/dayComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

function TimeAndDate({ setReturnDate, times,live }) {
  const [selectedDate, setSelectedDate] = useState(new Date());   // seçtiğimiz date i tutan değişken
  const [currentDateDisplay, setCurrentDateDisplay] = useState("");   // güncel tarihi saatlerin üstünde göstermemizi sağlayan değişken
  const [selectedTime, setSelectedTime] = useState(null); // seçtiğimiz saati tuttuğumuz değişken

  useEffect(() => {   // güncel olarak tarih değiştiğimizde gösterilen tarihide değiştiren useEffect
    const formattedDate = formatDateDisplay(selectedDate);
    setCurrentDateDisplay(formattedDate);
  }, [selectedDate]);

  const handleDateChange = (value) => {  // tarihi değiştirdiğimizde selected date i değiştiren fonksiyon
    setSelectedDate(value);
    setSelectedTime(null);
  };

  const formatDateDisplay = (date) => {  // takvimden dönen tarih değerini gün ay yıl ve gün ismi formatına çeviren fonksiyon
    const tarihNesnesi = new Date(date);
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = tarihNesnesi.toLocaleDateString('tr-TR', options);
    return formattedDate;
  };

  const formatDate = (date) => {  // takvimden dönen değeri gün ay yıl a çeviren fonksiyon
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const handleAppointmentBoxClick = (clickedTime) => {  // seçtiğimiz saat ve tarihi selectedtime a atayan fonksiyon
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
      <Swiper 
      navigation={{
        prevEl: '.custom-swiper-button-prev', // Class or element for the back button
        nextEl: '.custom-swiper-button-next', // Class or element for the next button
      }} modules={[Navigation]} className="mySwiper">
        {swiperSlides}
      </Swiper>
    );
  };

  const appointmentTimesForSelectedDate = times.filter((time) => {  // sadece seçtiğimiz tarihdeki randevu saatlerini göstermeye yarayan fonksiyon
    const formattedSelectedDate = formatDate(selectedDate);
    return formatDate(new Date(time.date)) === formattedSelectedDate;
  });

  return (
    <div className='animate__animated animate__fadeInLeft'>
      <div className="title">
        <h2 className="text-buttonColor text-center text-3xl font-bold p-3">Tarih ve Zaman Seçiniz</h2>
      </div>
      <div className="bg-white dayComponent flex flex-col md:flex-row border-2 border-appoinmentBox rounded-2xl shadow-xl m-3">
        <div className='flex flex-col items-center justify-between md:order-1 md:w-1/2 '>
          <div className="choosenDate mb-2">
            <div className="dateText m-2">
              <h2 className="text-center text-buttonColor text-lg font-semibold">{currentDateDisplay}</h2>
            </div>
          </div>
          {live &&
            <div className='hemenGorus w-full flex items-center justify-center'> <Link to={"/"} className='py-1 px-5 rounded-3xl bg-appoinmentBox text-white text-mb text-center'>Hemen Görüş</Link></div>
          }
          <div className="leftArea flex-1 mt-3">
            <div className="appointmentTimes w-96 h-52 relative">
              <div className="custom-swiper-button-prev absolute left-3 top-2/4 text-xl text-buttonColor">
                <i className="fa-solid fa-arrow-left" alt="Previous"></i>
              </div>
              <div className="custom-swiper-button-next absolute right-3 top-2/4 text-xl text-buttonColor">
                <i className="fa-solid fa-arrow-right" alt="Next"></i>
              </div>
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
