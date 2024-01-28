import React, { useEffect, useState } from "react";
import AppointmentInfoBox from "./appointmentInfoBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

function AppointmentInfos() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  Chart.register(...registerables);
  Chart.register(CategoryScale);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const days = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const stateDay = {
    labels: days,
    datasets: [
      {
        type: "line",
        label: "Günlük Randevu Sayıları",
        data: [5, 8, 12, 3, 7, 1, 9],
        backgroundColor: "hsl(270, 100%, 90.75%)",
        borderColor: "hsl(270, 100%, 29.75%)",
      },
    ],
  };

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const stateMonth = {
    labels: months,
    datasets: [
      {
        type: "line",
        label: "Aylık Randevu Sayıları",
        data: [135, 180, 122, 91, 178, 160, 96, 45, 169, 110, 157, 83],
        backgroundColor: "hsl(270, 100%, 90.75%)",
        borderColor: "hsl(270, 100%, 29.75%)",
      },
    ],
  };

  const boxes = [
    { number: 5, title: "BU GÜN RANDEVU", changeRate: 5, lastOne: "3" },
    { number: 15, title: "BU HAFTA RANDEVU", changeRate: 5, lastOne: "14" },
    { number: 45, title: "BU AY RANDEVU", changeRate: -10, lastOne: "55" },
    { number: 505, title: "BU YIL RANDEVU", changeRate: 486, lastOne: "102" },
    { number: 7, title: "RANDEVU TALEBİ", changeRate: -6 },
    { number: 8, title: "RANDEVU İPTALİ", changeRate: 2 },
    { number: 18, title: "RANDEVU ONAYI", changeRate: 10 },
    { number: 18, title: "RANDEVU TALEBİ", changeRate: 10 },
  ];

  const renderSwiper = (items) => {
    const itemsPerSlide = 4;
    const swiperSlides = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
      const currentTimes = items.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center serviceBoxArea w-[530px] ml-auto">
            {currentTimes.map((box, index) => (
              <AppointmentInfoBox
                key={index}
                number={box.number}
                title={box.title}
                changeRate={box.changeRate}
                lastOne={box.lastOne}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    if (isMobile) {
      return (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    } else {
      return (
        <Swiper
          navigation={{
            prevEl: ".custom-swiper-button-prev9",
            nextEl: ".custom-swiper-button-next9",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {swiperSlides}
        </Swiper>
      );
    }
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "hsl(270, 100%, 29.75%)",
        },
      },
    },
  };

  return (
    <div className="w-full my-4">
      <div className="infosArea flex ">
        {isMobile ? (
          renderSwiper(boxes)
        ) : (
          <>
            <div className="graphArea w-[73%] xl:flex items-center">
              <div className="w-full p-4">
                <Line
                  data={stateDay}
                  options={options}
                  className="p-2 bg-white border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full p-4">
                <Line
                  data={stateMonth}
                  options={options}
                  className="p-2 bg-white border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="infosArea flex items-center justify-end w-[27%]">
              {renderSwiper(boxes)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentInfos;
