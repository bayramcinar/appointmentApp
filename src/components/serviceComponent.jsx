import React, { useState } from 'react';
import '../style/serviceComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import ServiceBox from './serviceBox';

function ServiceComponent({ services, setReturnService }) {
  const [selectedService, setSelectedService] = useState(null);  //seçilen service si tutan değişken 

  const handleAppointmentBoxClick = (clickedService) => {  // service e tıklandığında seçilen service e atayan fonksiyon
    const formattedReturnService = `${clickedService}`;
    setReturnService(formattedReturnService);
    setSelectedService(clickedService);
  };

  const renderSwiper = (times) => {     // yan yana 2 toplam max 6 tane service box ekleyen kod
    const swiperSlides = [];
    for (let i = 0; i < times.length; i += 6) {
      const currentTimes = times.slice(i, i + 6);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center h-52 appointmentBoxArea">
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
    return (
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  const servicesArray = services;   // gösterilecek servisleri props olarak atadığımız değişken
  

  return (
    <div>
      <div className='serviceArea animate__animated animate__fadeInLeft'>
        <div className="title">
          <h2 className="text-buttonColor text-center text-3xl font-bold p-3">Hizmet Seçiniz</h2>
        </div>
        <div className="serviceBoxes">
          {servicesArray.length > 6 ? (
            renderSwiper(servicesArray)
          ) : (
            <>
              {servicesArray.map((title, index) => (
                <ServiceBox
                  key={index}
                  title={title.title}
                  onServiceClick={handleAppointmentBoxClick}
                  selectedService={selectedService}
                  image={title.image}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceComponent;
