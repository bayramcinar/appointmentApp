import React, { useEffect, useState } from "react";
import AppointmentRequestBox from "./appointmentRequestBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import pp from "../images/pp.png";
import RequestModal from "./requestModal"; // Import the RequestModal component

function AppointmentRequestList() {
  const [formData, setFormData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filterFormData = (formData) => {
    const filteredData = formData.filter((data) => {
      // Örnek olarak 'true' içeren öğeleri filtrele
      const timeArray = data.time.split(" ");
      const lastElement = timeArray[timeArray.length - 2];

      return lastElement.toLowerCase() === "true";
    });

    return filteredData;
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));

    const filteredFormData = filterFormData(storedFormData || []);

    setFormData(filteredFormData);
  }, []);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const renderSwiper = (appointments) => {
    const isMobile = window.innerWidth <= 768; // Örnek bir mobil ekran genişliği

    const swiperSlides = [];
    const visibleAppointments = isMobile ? 2 : 4; // Mobil ekranlarda sadece 2, diğerlerinde 4 görünecek

    for (let i = 0; i < appointments.length; i += visibleAppointments) {
      const currentAppointments = appointments.slice(
        i,
        i + visibleAppointments
      );
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap justify-center h-auto">
            {currentAppointments.map((data, index) => (
              <div key={index} className="p-2 m-5">
                <AppointmentRequestBox
                  image={pp}
                  infos={data}
                  onDetails={() => handleOpenModal(data)}
                />
              </div>
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    return (
      <Swiper
        navigation={{
          prevEl: ".custom-swiper-button-prev4",
          nextEl: ".custom-swiper-button-next4",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  return (
    <div className="h-auto relative flex items-center justify-center w-full md:block max-[768px]:block">
      {formData.length > 3 ? (
        renderSwiper(formData)
      ) : (
        <>
          {formData.map((data, index) => (
            <div key={index} className=" p-2">
              <AppointmentRequestBox
                image={pp}
                infos={data}
                onDetails={() => handleOpenModal(data)} // Pass appointment data to open modal
              />
            </div>
          ))}
        </>
      )}
      {formData.length > 4 && (
        <>
          <div className="custom-swiper-button-prev4 absolute top-[50%] left-3 text-xl text-buttonColor cursor-pointer z-[2]">
            <i className="fa-solid fa-arrow-left" alt="Previous"></i>
          </div>
          <div className="custom-swiper-button-next4 absolute top-[50%] right-3 text-xl text-buttonColor cursor-pointer z-[2]">
            <i className="fa-solid fa-arrow-right" alt="Next"></i>
          </div>
        </>
      )}

      {/* Render the RequestModal */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedAppointment}
      />
    </div>
  );
}

export default AppointmentRequestList;
