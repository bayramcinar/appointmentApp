import React, { useEffect, useState } from "react";
import AppointmentRequestBox from "./appointmentRequestBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import pp from "../images/pp.png";
import RequestModal from "./requestModal"; // Import the RequestModal component
import NotAppointmentRequestBox from "./notConfirmedAppointmentBox";

function NotConfirmedAppointments() {
  const [formData, setFormData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filterFormData = (formData) => {
    const filteredData = formData.filter((data) => {
      // Örnek olarak 'false' içeren öğeleri ve data.confirm değeri false olanları filtrele
      const timeArray = data.time.split(" ");
      const lastElement = timeArray[timeArray.length - 2];

      return lastElement.toLowerCase() === "false" && data.confirm === "false";
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
    const isMobile = window.innerWidth <= 768;
    const swiperSlides = [];
    const visibleAppointments = isMobile ? 2 : 4;

    for (let i = 0; i < appointments.length; i += visibleAppointments) {
      const currentAppointments = appointments.slice(
        i,
        i + visibleAppointments
      );
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap justify-center h-auto mb-3">
            {currentAppointments.map((data, index) => (
              <div key={index} className="p-2 mb-0 m-5">
                <NotAppointmentRequestBox
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
        pagination={{
          dynamicBullets: true,
        }}
        navigation={{
          prevEl: ".custom-swiper-button-prev4",
          nextEl: ".custom-swiper-button-next4",
        }}
        modules={isMobile ? [Pagination] : [Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  return (
    <div className="h-auto relative flex flex-wrap items-center justify-center w-full max-[768px]:block">
      {formData.length > 2 ? (
        renderSwiper(formData)
      ) : (
        <>
          {formData.map((data, index) => (
            <div key={index} className=" p-2">
              <NotAppointmentRequestBox
                image={pp}
                infos={data}
                onDetails={() => handleOpenModal(data)}
              />
            </div>
          ))}
        </>
      )}
      {formData.length === 0 && (
        <>
          <div className="m-5">
            <h1 className="text-center text-lg text-red-600 font-semibold">
              Yeni Randevu Bulunmamaktadır.
            </h1>
          </div>
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

export default NotConfirmedAppointments;
