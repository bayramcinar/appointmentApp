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

function AppointmentRequestList() {
  const [formData, setFormData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filterFormDataRequests = (formData) => {
    const filteredData = formData.filter((data) => {
      const timeArray = data.time.split(" ");
      const lastElement = timeArray[timeArray.length - 2];
      const appointmentDate = new Date(
        timeArray[0].split(".").reverse().join("-") + " " + timeArray[2]
      );

      return (
        lastElement.toLowerCase() === "true" &&
        data.confirm === "false" &&
        appointmentDate >= new Date()
      );
    });

    return filteredData;
  };

  const filterFormDataNotConfirmed = (formData) => {
    const filteredData = formData.filter((data) => {
      const timeArray = data.time.split(" ");
      const lastElement = timeArray[timeArray.length - 2];
      const appointmentDate = new Date(
        timeArray[0].split(".").reverse().join("-") + " " + timeArray[2]
      );

      return (
        lastElement.toLowerCase() === "false" &&
        data.confirm === "false" &&
        appointmentDate >= new Date()
      );
    });

    return filteredData;
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));

    const filteredFormDataForRequests = filterFormDataRequests(
      storedFormData || []
    );
    const filteredFormDataForNotConfirm = filterFormDataNotConfirmed(
      storedFormData || []
    );

    setFormData([
      ...filteredFormDataForNotConfirm,
      ...filteredFormDataForRequests,
    ]);
  });

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
    const visibleAppointments = 2;

    for (let i = 0; i < appointments.length; i += visibleAppointments) {
      const currentAppointments = appointments.slice(
        i,
        i + visibleAppointments
      );
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap justify-center h-auto mb-3">
            {currentAppointments.map((data, index) => (
              <div key={index} className="flex-shrink-0 p-2 mb-0 m-5">
                {data.confirm === "false" &&
                data.time.split(" ")[3] === "true" ? (
                  <AppointmentRequestBox
                    image={pp}
                    infos={data}
                    onDetails={() => handleOpenModal(data)}
                  />
                ) : (
                  <NotAppointmentRequestBox
                    image={pp}
                    infos={data}
                    onDetails={() => handleOpenModal(data)}
                  />
                )}
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

  const numberOfNewAppointments = formData.length;

  return (
    <>
      {numberOfNewAppointments > 0 && (
        <h1 className="text-buttonColor text-xl  text-center font-semibold mt-[30px]">
          Yeni Randevular ({numberOfNewAppointments} Yeni Randevu)
        </h1>
      )}
      <div className="relative flex items-center flex-wrap justify-center w-full max-[768px]:block bg-dayComponentBg rounded-xl">
        {formData.length > 2 ? (
          renderSwiper(formData)
        ) : (
          <>
            {formData.map((data, index) => (
              <div key={index} className="flex-shrink-0 p-2 mb-0 m-5">
                {data.confirm === "false" &&
                data.time.split(" ")[3] === "true" ? (
                  <AppointmentRequestBox
                    image={pp}
                    infos={data}
                    onDetails={() => handleOpenModal(data)}
                  />
                ) : (
                  <NotAppointmentRequestBox
                    image={pp}
                    infos={data}
                    onDetails={() => handleOpenModal(data)}
                  />
                )}
              </div>
            ))}
          </>
        )}
        {formData.length === 0 && (
          <>
            <div className="m-5">
              <h1 className="text-center text-lg text-red-600 font-semibold">
                Randevu Talebi Bulunmamaktadır
              </h1>
            </div>
          </>
        )}
        {formData.length > 2 && (
          <>
            <div className="custom-swiper-button-prev4 absolute top-[50%] left-3 text-xl text-buttonColor cursor-pointer z-[2]">
              <i className="fa-solid fa-arrow-left" alt="Previous"></i>
            </div>
            <div className="custom-swiper-button-next4 absolute top-[50%] right-3 text-xl text-buttonColor cursor-pointer z-[2]">
              <i className="fa-solid fa-arrow-right" alt="Next"></i>
            </div>
          </>
        )}

        <RequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedAppointment}
        />
      </div>
    </>
  );
}

export default AppointmentRequestList;
