import React, { useEffect, useState } from 'react';
import MyAppointmentBox from './myAppointmentBox';
import "../style/myAppointments.css";
import resim from "../images/service.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Swal from 'sweetalert2';

function MyAppointments() {
  const [formData, setFormData] = useState([]);

  const handleDelete = (selectedAppointment) => {
    const selectedTimes = JSON.parse(sessionStorage.getItem('selectedTimes')) || [];
  
    const dateParts = selectedAppointment.time.split(" ");
    const datePart = dateParts[0].split(".");
    const timePart = dateParts[2];
  
    const year = parseInt(datePart[2], 10);
    const month = parseInt(datePart[1], 10) - 1;
    const day = parseInt(datePart[0], 10);
  
    const timeParts = timePart.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
  
    const originalDate = new Date(year, month, day, hours, minutes);
  
    const formattedDate = originalDate.toISOString().split("T")[0];
    const formattedTime = originalDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    const result = {
      date: formattedDate,
      time: formattedTime
    };

    Swal.fire({
      title: 'Başarılı !',
      text: 'Randevu başarılı bir şekilde silindi.',
      icon: 'success',
      confirmButtonText: 'Kapat'
    })

    const updatedSelectedTimes = selectedTimes.map(appointment => {
      if (appointment.date === result.date && appointment.time === result.time) {
        return { ...appointment, active: true };
      }
      return appointment;
    });
  
    sessionStorage.setItem('selectedTimes', JSON.stringify(updatedSelectedTimes));
  
    // Form datayı güncelle
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
          <div className="flex flex-col items-center justify-center appointmentBoxArea">
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
    <div className='myAppointments bg-dayComponentBg flex flex-col items-center justify-center p-3 relative lg:w-[56rem] mr-auto ml-auto mt-[50px] lg:h-[515px]'>
      <h1 className='text-center text-2xl font-semibold text-buttonColor p-3'>Randevularım</h1>
      <div className='swipperAppointments h-96 lg:w-[56rem] lg:h-[27rem]'>
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
      {formData.length > 3 &&
      <>
      <div className="custom-swiper-button-prev absolute left-3 text-xl text-buttonColor cursor-pointer z-[2]">
        <i className="fa-solid fa-arrow-left" alt="Previous"></i>
      </div>
      <div className="custom-swiper-button-next absolute right-3 text-xl text-buttonColor cursor-pointer z-[2]">
        <i className="fa-solid fa-arrow-right" alt="Next"></i>
      </div>
      </>
      }

    </div>
  );
}

export default MyAppointments;
