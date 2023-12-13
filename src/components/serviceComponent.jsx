import React, { useState, useEffect } from 'react';
import '../style/serviceComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import ServiceBox from './serviceBox';

function ServiceComponent({ services, setReturnService }) {
  const [selectedService, setSelectedService] = useState(null);
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

  const handleAppointmentBoxClick = (clickedService) => {
    const formattedReturnService = `${clickedService}`;
    setReturnService(formattedReturnService);
    setSelectedService(clickedService);
  };

  const renderSwiper = (times) => {
    const itemsPerSlide = isMobile ? 8 : 6; // Change this to 9 for mobile screens
    const swiperSlides = [];
    for (let i = 0; i < times.length; i += itemsPerSlide) {
      const currentTimes = times.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center h-52 appointmentBoxArea ">
            {currentTimes.map((title, index) => (
              <ServiceBox
                key={index}
                title={title.title}
                onServiceClick={handleAppointmentBoxClick}
                selectedService={selectedService}
                image={title.image}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    if (isMobile) {
      return (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    } else {
      return (
        <Swiper
          navigation={{
            prevEl: '.custom-swiper-button-prev',
            nextEl: '.custom-swiper-button-next',
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    }
  };

  const servicesArray = services;

  return (
    <div>
      <div className='serviceArea animate__animated animate__fadeInLeft '>
        <div className="title">
          <h2 className="text-buttonColor text-center text-3xl font-bold p-3">Hizmet Seçiniz</h2>
        </div>
        <div className="serviceBoxes relative border-2 border-appoinmentBox rounded-2xl shadow-xl m-3 bg-white mb-5">
          {!isMobile &&
            <>
                  <div className="custom-swiper-button-prev absolute left-3 text-xl text-buttonColor">
                      <i className="fa-solid fa-arrow-left" alt="Previous"></i>
                    </div>
                    <div className="custom-swiper-button-next absolute right-3 text-xl text-buttonColor">
                      <i className="fa-solid fa-arrow-right" alt="Next"></i>
                    </div>
            </>
          }
          {renderSwiper(servicesArray)}
        </div>
      </div>
    </div>
  );
}

export default ServiceComponent;
