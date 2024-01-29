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
  const hoursArray = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });
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
  const stateToday = {
    labels: hoursArray,
    datasets: [
      {
        type: "line",
        label: "Bugünkü Randevu Sayıları",
        data: [
          5, 8, 12, 3, 7, 1, 9, 5, 8, 12, 3, 7, 1, 9, 5, 8, 12, 3, 7, 1, 9, 9,
          3, 1,
        ],
        backgroundColor: "hsl(270, 100%, 90.75%)",
        borderColor: "hsl(270, 100%, 29.75%)",
      },
    ],
  };
  const stateYesterday = {
    labels: hoursArray,
    datasets: [
      {
        type: "line",
        label: "Dünkü Randevu Sayıları",
        data: [
          5, 8, 12, 3, 7, 1, 12, 3, 7, 1, 9, 5, 3, 7, 1, 9, 9, 3, 1, 10, 3, 7,
          6, 6,
        ],
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
  const [graph, setGraph] = useState(stateMonth);
  const boxes = [
    {
      number: 5,
      title: "BU GÜN RANDEVU",
      changeRate: 5,
      lastOne: "3",
      graphType: "daily",
      graph: true,
    },
    {
      number: 9,
      title: "DÜN RANDEVU",
      changeRate: 5,
      lastOne: "14",
      graphType: "yesterday",
      graph: true,
    },
    {
      number: 15,
      title: "BU HAFTA RANDEVU",
      changeRate: 5,
      lastOne: "14",
      graphType: "weekly",
      graph: true,
    },
    {
      number: 45,
      title: "BU AY RANDEVU",
      changeRate: -10,
      lastOne: "55",
      graphType: "monthly",
      graph: true,
    },
    {
      number: 505,
      title: "BU YIL RANDEVU",
      changeRate: 486,
      lastOne: "102",
      lastOne: "55",
      graph: false,
    },
    {
      number: 7,
      title: "RANDEVU TALEBİ",
      changeRate: -6,
      lastOne: "55",
      graph: false,
    },
    {
      number: 8,
      title: "RANDEVU İPTALİ",
      changeRate: 2,
      lastOne: "55",
      graph: false,
    },
    {
      number: 18,
      title: "RANDEVU ONAYI",
      changeRate: 10,
      lastOne: "55",
      graph: false,
    },
  ];
  const changeGraph = (dataType) => {
    if (dataType === "weekly") {
      setGraph({ ...stateDay });
    } else if (dataType === "monthly") {
      setGraph({ ...stateMonth });
    } else if (dataType === "daily") {
      setGraph({ ...stateToday });
    } else if (dataType === "yesterday") {
      setGraph({ ...stateYesterday });
    }
    console.log(`Changing graph to ${dataType} data`);
  };
  const renderSwiper = (items) => {
    const itemsPerSlide = isMobile ? 4 : 8;
    const swiperSlides = [];

    for (let i = 0; i < items.length; i += itemsPerSlide) {
      const currentTimes = items.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center">
            {currentTimes.map((box, index) => (
              <AppointmentInfoBox
                key={index}
                number={box.number}
                title={box.title}
                changeRate={box.changeRate}
                lastOne={box.lastOne}
                graph={box.graph}
                changeGraph={() => changeGraph(box.graphType)}
              />
            ))}
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
      <div className="infosArea block lg:flex">
        <>
          <div className="graphArea w-full lg:w-[45%] sm:flex block items-center justify-center mx-auto">
            <div className="w-full h-full flex items-center justify-center mr-1">
              <Line
                data={graph}
                options={options}
                className="p-2 bg-white border-2 border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="infosArea flex items-center justify-end w-full lg:w-[55%] mx-auto">
            {renderSwiper(boxes)}
          </div>
        </>
      </div>
    </div>
  );
}

export default AppointmentInfos;
