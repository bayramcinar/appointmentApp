import React, { useState, useEffect } from 'react';
import AppointmentBox from './appointmentBox';
import CalendarBox from './calendar';
import '../style/dayComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';

function TimeAndDate({ setReturnDate, times,live }) {
  const [selectedDate, setSelectedDate] = useState(new Date());   // seçtiğimiz date i tutan değişken
  const [currentDateDisplay, setCurrentDateDisplay] = useState("");   // güncel tarihi saatlerin üstünde göstermemizi sağlayan değişken
  const [selectedTime, setSelectedTime] = useState(null); // seçtiğimiz saati tuttuğumuz değişken

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const renderSwiper = (times) => {
    const swiperSlides = [];
    const slidesPerRow = isMobile ? 9 : 5; // Set the number of slides per row based on the screen size
    
    if (!isMobile) {
      for (let i = 0; i < times.length; i += slidesPerRow) {
        const currentTimes = times.slice(i, i + slidesPerRow);
        const swiperSlide = (
          <SwiperSlide key={i}>
            <div className="flex flex-wrap items-center justify-center appointmentBoxArea mr-auto ml-auto">
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
    } else {
      for (let i = 0; i < times.length; i += 9) {
        const currentTimes = times.slice(i, i + 9);
        const swiperSlide = (
          <SwiperSlide key={i}>
            <div className="flex flex-wrap items-center justify-center appointmentBoxArea mr-auto ml-auto">
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
    }
  
    return (
      <Swiper
        direction={isMobile ? 'horizontal' : 'vertical'}
        pagination={isMobile ? {
          clickable: true,
          dynamicBullets: true,
        } : {
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={isMobile ? {
          prevEl: '.custom-swiper-button-prev', // Class or element for the back button
          nextEl: '.custom-swiper-button-next', // Class or element for the next button
        } : ""}
        modules={isMobile ? [Pagination,Navigation] : [Pagination]}
        className="mySwiper"
      >
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
      <div className="bg-dayComponentBg dayComponent flex flex-col md:flex-row  m-3 lg:w-[34rem] lg:h-[20rem] md:w-[25rem] sm:w-[25rem] md:h-[40rem] sm:h-[40rem]">
        <div className='flex flex-col items-center justify-between lg:order-1  max-[768px]:order-2 lg:w-[10rem] border-2 border-buttonColor rounded-2xl shadow-xl lg:mr-3 bg-white rightMobile md:w-[25rem] max-[768px]:h-auto'>
          <div className="choosenDate mb-2">
            <div className="dateText m-2">
              <h2 className="text-center text-buttonColor text-lg font-semibold">{currentDateDisplay}</h2>
            </div>
          </div>
          {live &&
            <div className='hemenGorus w-full flex items-center justify-center'> <Link to={"/"} className='py-1 px-5 rounded-3xl bg-callNowButtonColor text-white text-sm text-center'>Hemen Görüş</Link></div>
          }
          <div className="leftArea flex-1 mt-3 md:mr-[0px] lg:w-[10rem] lg:h-[10rem] max-[768px]:w-[24rem] max-[768px]:h-auto">
            <div className="appointmentTimes relative lg:w-[10rem] lg:h-[12rem] flex flex-col items-center justify-center max-[768px]:w-[24rem] max-[768px]:h-auto">
              {isMobile && appointmentTimesForSelectedDate.length > 9 &&
                <>
                  <div className="custom-swiper-button-prev absolute left-2 top-[43%] text-xl text-buttonColor z-[2] cursor-pointer">
                    <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                  </div>
                  <div className="custom-swiper-button-next absolute right-2 top-[43%] text-xl text-buttonColor z-[2] cursor-pointer">
                    <i className="fa-solid fa-arrow-right" alt="Next"></i>
                  </div>
                </>
              }
              {appointmentTimesForSelectedDate.length > 0 ? (
                renderSwiper(appointmentTimesForSelectedDate)
              ) : (
                <div className="flex flex-wrap items-center justify-center lg:w-[10rem] appointmentBoxArea mr-auto ml-auto">
                  <p className="text-red-500 text-center text-sm">Uygun saatler bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-[768px]:mb-[10px] rightArea max-[768px]:flex-1 flex items-center justify-center md:order-2 border-2 border-buttonColor rounded-2xl shadow-xl bg-white md:h-[20rem]">
          <CalendarBox selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
}

export default TimeAndDate;
