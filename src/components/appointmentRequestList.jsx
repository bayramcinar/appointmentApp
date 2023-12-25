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

  useEffect(() => {
    // localStorage'dan formData'yı al
    const storedFormData = JSON.parse(localStorage.getItem("formData"));

    setFormData(storedFormData || []);
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
    const swiperSlides = [];

    for (let i = 0; i < appointments.length; i += 4) {
      const currentAppointments = appointments.slice(i, i + 4);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap justify-center h-auto">
            {currentAppointments.map((data, index) => (
              <div key={index} className=" p-2 m-5">
                <AppointmentRequestBox
                  image={pp}
                  infos={data}
                  onDetails={() => handleOpenModal(data)} // Pass appointment data to open modal
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
    <div className="h-auto relative ">
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
