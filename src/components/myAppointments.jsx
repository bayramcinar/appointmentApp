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
  const [formData, setFormData] = useState([]);

  const handleDelete = (selectedAppointment) => {  // seçilen randevuyu silme fonksiyonu
    const updatedFormData = formData.filter(appointment => appointment !== selectedAppointment);
    setFormData(updatedFormData);
    sessionStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  useEffect(() => {    // kaydedilen randevuları sessionStorage dan alan hooks
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);
    }
  }, []);

  const renderSwiper = (appointments) => {  //en fazla alt alta 3 tane randevu görüntülememizi sağlayan kod
    const swiperSlides = [];
    for (let i = 0; i < appointments.length; i += 3) {
      const currentAppointments = appointments.slice(i, i + 3);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center h-96  appointmentBoxArea">
            {currentAppointments.map((appointmentData, index) => (
              <MyAppointmentBox key={index} image={resim} infos={appointmentData} onDelete={handleDelete} />
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
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  return (
    <div className='myAppointments bg-dayComponentBg flex flex-col items-center justify-center p-3 relative'>
      <h1 className='text-center text-2xl font-semibold text-buttonColor p-3'>Randevularım</h1>
      <div className='swipperAppointments h-96 '>
        {formData.length > 3 ? (
          renderSwiper(formData)
        ) : (
          <>
            {formData.map((appointmentData, index) => (
              <MyAppointmentBox key={index} image={resim} infos={appointmentData} onDelete={handleDelete} />
            ))}
          </>
        )}
      </div>

      {/* Custom navigation buttons */}
      <div className="custom-swiper-button-prev absolute left-3 text-xl text-buttonColor">
        <i className="fa-solid fa-arrow-left" alt="Previous"></i>
      </div>
      <div className="custom-swiper-button-next absolute right-3 text-xl text-buttonColor">
        <i className="fa-solid fa-arrow-right" alt="Next"></i>
      </div>
    </div>
  );
}

export default MyAppointments;
