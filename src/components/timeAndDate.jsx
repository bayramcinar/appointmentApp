import React, { useState, useEffect } from 'react';
import AppointmentBox from './appointmentBox';
import CalendarBox from './calendar';
import '../style/dayComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination,Mousewheel } from 'swiper/modules';
import RequestTimeBox from './requestTimeBox';

function TimeAndDate({ setReturnDate, times,setAppointmentRequest, appointmentRequest,selectedRequestTime,request,setRequest }) {
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
    const formattedReturnDate = `${currentDateDisplay} ${clickedTime} ${request}`;
    setReturnDate(formattedReturnDate);
    setSelectedTime(clickedTime);
  };



  const renderSwiper = (times) => {
    const swiperSlides = [];
    const slidesPerRow = isMobile ? 9 : 5; // Set the number of slides per row based on the screen size
    
    if (!isMobile) {
      for (let i = 0; i < times.length; i += slidesPerRow) {
        const currentTimes = times.slice(i, i + slidesPerRow);
        // Sort currentTimes array by time in ascending order
        const sortedTimes = currentTimes.sort((a, b) => {
          const timeA = a.time.split(':').join('');
          const timeB = b.time.split(':').join('');
          return parseInt(timeA) - parseInt(timeB);
        });

        const swiperSlide = (
          <SwiperSlide key={i}>
            <div className="flex flex-wrap items-center justify-center appointmentBoxArea mr-auto ml-auto">
              {sortedTimes.map((time, index) => (
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
        // Sort currentTimes array by time in ascending order
        const sortedTimes = currentTimes.sort((a, b) => {
          const timeA = a.time.split(':').join('');
          const timeB = b.time.split(':').join('');
          return parseInt(timeA) - parseInt(timeB);
        });

        const swiperSlide = (
          <SwiperSlide key={i}>
            <div className="flex flex-wrap items-center justify-center appointmentBoxArea mr-auto ml-auto">
              {sortedTimes.map((time, index) => (
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
        mousewheel={!isMobile ? true : false}
        direction={isMobile ? 'horizontal' : 'vertical'}
        pagination={isMobile ? {
          clickable: true,
          dynamicBullets: true,
        } : {
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={isMobile ? {
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        } : ""}
        modules={isMobile ? [Pagination, Navigation] : [Pagination,Mousewheel]}
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
          <div className="choosenDate mb-2 h-[72px]">
            <div className="dateText m-2">
              <h2 className="text-center text-buttonColor text-lg font-semibold  w-[120px]">{currentDateDisplay}</h2>
            </div>
          </div>
          <div className="leftArea flex-1 mt-3 md:mr-[0px] lg:w-[10rem] lg:h-[10rem] max-[768px]:w-[24rem] max-[768px]:h-auto">
            <div className="appointmentTimes relative lg:w-[10rem] lg:h-[12rem] flex flex-col items-center justify-center max-[768px]:w-[24rem] max-[768px]:h-auto">
              {isMobile && appointmentTimesForSelectedDate.length > 9 &&
                <>
                  <div className="custom-swiper-button-prev absolute left-3 top-[41%] text-xl text-buttonColor z-[2] cursor-pointer">
                    <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                  </div>
                  <div className="custom-swiper-button-next absolute right-3 top-[41%] text-xl text-buttonColor z-[2] cursor-pointer">
                    <i className="fa-solid fa-arrow-right" alt="Next"></i>
                  </div>
                </>
              }
              {appointmentTimesForSelectedDate.length > 0 ? (
                renderSwiper(appointmentTimesForSelectedDate)
              ) : (
                <div className={`${selectedRequestTime !== "" ? 'block' : 'flex'} flex-wrap items-center justify-center lg:w-[10rem] appointmentBoxArea mr-auto ml-auto`}>
                  {selectedRequestTime === ""  && 
                     <>
                       <p className="text-red-500 text-center text-sm">Uygun saatler bulunamadı.</p>
                      <p className="text-red-500 text-center text-sm">(İsterseniz randevu talebi oluşturabilirsiniz)</p>
                     </>
                   }
                  {selectedRequestTime === "" && (
                    <button
                      className='bg-callNowButtonColor rounded-2xl p-1 px-6 text-white text-sm mt-[15px]'
                      onClick={() => {
                        setRequest(!request) 
                        setAppointmentRequest(!appointmentRequest); // setRequest(!request) korunuyor
                      }}
                    >
                      Talep oluştur
                    </button>
                  )}
                  {selectedRequestTime !== "" && (
                    <>
                      <h2 className='text-sm text-buttonColor text-center font-semibold mt-[8px]'>Seçtiğiniz randevu talebi saati</h2>
                      <h2 className='text-sm text-buttonColor text-center font-semibold mb-[8px] ml-auto mr-auto'>(Lütfen aşağıdan seçiniz ! )</h2>
                      <RequestTimeBox time={selectedRequestTime} date={formatDate(selectedDate)} selectedTime={selectedTime} onTimeClick={handleAppointmentBoxClick}/>
                    </>
                  )}
                </div>
              )}
            </div>
            {selectedRequestTime !== "" && (
              <> 
                <div className='flex items-center justify-center'>
                <button  onClick={() => setAppointmentRequest(!appointmentRequest)} className='bg-appoinmentBox font-semibold text-sm text-white p-1 px-6 rounded-2xl '><i class="fa-solid fa-file-pen"></i> Düzenle</button>
                </div>
              </>
            )}
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
