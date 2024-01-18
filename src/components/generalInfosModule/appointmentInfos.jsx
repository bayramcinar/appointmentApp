import React, { useEffect, useState } from "react";
import AppointmentInfoBox from "./appointmentInfoBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

function AppointmentInfos() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const boxes = [
    { number: 5, title: "Bu gün Randevu", changeRate: 5 },
    { number: 15, title: "Bu hafta Randevu", changeRate: 5 },
    { number: 45, title: "Bu ay Randevu", changeRate: -10 },
    { number: 505, title: "Bu yıl Randevu", changeRate: 486 },
    { number: 7, title: "Randevu Talebi", changeRate: -6 },
    { number: 8, title: "Randevu İptali", changeRate: 2 },
    { number: 18, title: "Randevu Onayı", changeRate: 10 },
    { number: 75, title: "Ortalama Randevu Süresi (Dakika)", changeRate: 15 },
  ];

  const renderSwiper = (items, renderItem) => {
    const itemsPerSlide = 4;
    const swiperSlides = [];

    for (let i = 0; i < items.length; i += itemsPerSlide) {
      const currentItems = items.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center serviceBoxArea">
            {currentItems.map((item, index) => renderItem(item, index))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    return (
      <Swiper
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  const renderItem = (box, index) => (
    <div key={index}>
      <AppointmentInfoBox
        number={box.number}
        title={box.title}
        changeRate={box.changeRate}
      />
    </div>
  );

  return (
    <div className="w-full">
      <div className="infosArea relative">
        {isMobile ? (
          renderSwiper(boxes, renderItem)
        ) : (
          <>
            <div className="infosArea flex items-center justify-center flex-row">
              {boxes.map((box, index) => (
                <div key={index}>
                  <AppointmentInfoBox
                    number={box.number}
                    title={box.title}
                    changeRate={box.changeRate}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentInfos;
