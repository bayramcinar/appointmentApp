import React, { useEffect, useState } from 'react';
import MyAppointmentBox from './myAppointmentBox';
import "../style/myAppointments.css";
import resim from "../images/service.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function MyAppointments() {
  const [formData, setFormData] = useState([]);  // sessionStorage daki formları tuttuğumuz değişken

  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);
    }
  }, []);

  const renderSwiper = (appointments) => {   //en fazla 3 tane alt alta randevu gelmesini sağlayan kod
    const swiperSlides = [];
    for (let i = 0; i < appointments.length; i += 3) {
      const currentAppointments = appointments.slice(i, i + 3);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center h-96  appointmentBoxArea">
            {currentAppointments.map((appointmentData, index) => (
              <MyAppointmentBox key={index} image={resim} infos={appointmentData} />
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

  return (
    <div className='myAppointments bg-dayComponentBg flex flex-col items-center justify-center p-3'>
      <h1 className='text-center text-2xl font-semibold text-buttonColor p-3'>Randevularım</h1>
      <div className='swipperAppointments h-96 '>
        {formData.length > 3 ? (
            renderSwiper(formData)
        ) : (
            <>
            {formData.map((appointmentData, index) => (
                <MyAppointmentBox key={index} image={resim} infos={appointmentData} />
            ))}
            </>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
