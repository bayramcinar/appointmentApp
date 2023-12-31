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

  function calculateEndTime(startTime, duration) {
    const durationMinutes = parseInt(duration, 10);
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const endTime = `${hours + endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
    return endTime;
  }

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
              <div key={index} className="flex-shrink-0 p-2 mb-0 m-3">
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
      <div className="bg-dayComponentBg max-[1023px]:flex max-[1023px]:justify-center max-[1023px]:items-center max-[1023px]:flex-col max-[1023px]:w-full lg:scale-[1] md:scale-[0.9] border-stepBorder1 border-2 rounded-xl lg:w-[300px] xl:w-[330px] max-[768px]:mx-auto max-[768px]:w-[23rem] mb-5 justify-center items-center flex-grow ">
        {numberOfNewAppointments > 0 && (
          <>
            <div className="flex flex-col">
              <h1 className="text-deepSlateBlue lg:text-[1.3vw] max-[768px]:text-xl text-center font-semibold mt-[30px]">
                Yeni Randevular
              </h1>
              <h1 className="text-deepSlateBlue lg:text-[1.3vw] max-[768px]:text-xl text-center font-semibold">
                ({numberOfNewAppointments} Yeni Randevu)
              </h1>
            </div>
          </>
        )}
        <div className="relative flex items-center flex-wrap justify-center w-full max-[768px]:block bg-dayComponentBg rounded-xl">
          {formData.length > 2 ? (
            renderSwiper(formData)
          ) : (
            <>
              {formData.map((data, index) => (
                <div key={index} className="flex-shrink-0 p-2 mb-0 m-3">
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
                <h1 className="text-center text-lg text-coral font-semibold">
                  Randevu Talebi Bulunmamaktadır
                </h1>
              </div>
            </>
          )}
          {formData.length > 2 && (
            <>
              <div className="custom-swiper-button-prev4 absolute top-[50%] left-3 text-xl text-deepSlateBlue cursor-pointer z-[2]">
                <i className="fa-solid fa-arrow-left" alt="Previous"></i>
              </div>
              <div className="custom-swiper-button-next4 absolute top-[50%] right-3 text-xl text-deepSlateBlue cursor-pointer z-[2]">
                <i className="fa-solid fa-arrow-right" alt="Next"></i>
              </div>
            </>
          )}
        </div>
      </div>
      <RequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedAppointment}
        randevuTarih={
          selectedAppointment && selectedAppointment.time.split(" ")[0]
        }
        randevuSaat={
          selectedAppointment && selectedAppointment.time.split(" ")[2]
        }
        endSaat={
          selectedAppointment &&
          calculateEndTime(
            selectedAppointment.time.split(" ")[2],
            selectedAppointment.duration
          )
        }
      />
    </>
  );
}

export default AppointmentRequestList;
