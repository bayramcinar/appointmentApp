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
  const [currentDate, setCurrentDate] = useState(new Date());

  const gun = currentDate.getDate().toString().padStart(2, "0");
  const ay = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const yil = currentDate.getFullYear();
  const saat = currentDate.getHours().toString().padStart(2, "0");
  const dakika = currentDate.getMinutes().toString().padStart(2, "0");

  const guncelTarih = `${gun}.${ay}.${yil} ${saat}:${dakika}`;

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
    //GUNLÜK RANDEVU SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "line",
        label: "Günlük Randevu Sayıları",
        data: [5, 8, 12, 3, 7, 1, 9],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
    datasets: [
      {
        type: "line",
        label: "Günlük Randevu Sayıları",
        data: [5, 8, 12, 3, 7, 1, 9],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Hafta Günlük Randevu Sayıları",
        data: [3, 5, 8, 1, 6, 7, 10],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const stateToday = {
    //BUGÜNKÜ RANDEVU SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: hoursArray,
    datasets: [
      {
        type: "bar",
        label: "Bugünkü Randevu Sayıları",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
          0,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Dünkü Randevu Sayıları",
        data: [
          0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,
          1,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
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

  const daysInMonth = new Array(31).fill().map((_, i) => i + 1);

  const stateYearly = {
    //YILLIK RANDEVU SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: months,
    datasets: [
      {
        type: "line",
        label: "Aylık Randevu Sayıları",
        data: [135, 180, 122, 91, 178, 160, 96, 45, 169, 110, 157, 83],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
  };

  const stateMonthly = {
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
        label: "Bu Ayki Randevu Sayıları",
        data: [
          3, 4, 1, 5, 6, 7, 1, 1, 2, 3, 3, 4, 1, 5, 6, 7, 1, 1, 2, 3, 3, 4, 1,
          5, 6, 7, 1, 1, 2, 3, 3,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Ayki Randevu Talep Sayıları",
        data: [
          4, 5, 1, 3, 7, 8, 3, 4, 2, 0, 3, 1, 5, 2, 3, 0, 1, 6, 3, 1, 0, 4, 1,
          5, 2, 0, 1, 4, 3, 0, 3,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Randevu Sayısı",
          },
        },
      },
    },
  };

  const stateRequest = {
    //RANDEVU TALEPLERİNİ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
        label: "Bu Ayki Randevu Talep Sayıları",
        data: [
          3, 0, 1, 5, 6, 7, 1, 1, 2, 0, 3, 4, 1, 5, 6, 0, 1, 1, 2, 3, 0, 4, 1,
          5, 6, 0, 1, 1, 2, 0, 3,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
  };
  const stateCancel = {
    // RANDEVU İPTALLERİNİ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
        label: "Bu Ayki Randevu İptal Sayıları",
        data: [
          0, 0, 1, 5, 0, 0, 1, 1, 2, 0, 3, 4, 1, 0, 0, 0, 1, 1, 2, 3, 0, 0, 1,
          5, 2, 0, 1, 1, 2, 0, 3,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
  };
  const stateConfirm = {
    //RANDEVU ONAYI SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
        label: "Bu Ayki Randevu Onay Sayıları",
        data: [
          5, 4, 2, 5, 3, 1, 1, 1, 2, 7, 3, 4, 1, 0, 8, 0, 1, 1, 2, 3, 4, 6, 1,
          5, 2, 0, 1, 1, 2, 0, 3,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
  };
  const stateTime = {
    // RANDEVU SÜRESİ GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
        label: "Bu Ayki Ortalama Randevu Süreleri",
        data: [
          300, 400, 150, 530, 200, 75, 123, 170, 210, 330, 310, 400, 110, 50,
          60, 70, 164, 198, 213, 332, 341, 401, 179, 50, 69, 79, 132, 176, 213,
          321, 365,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Süre (Dakika)",
          },
        },
      },
    },
  };
  const [graph, setGraph] = useState(stateToday);

  const boxes = [
    //İNFO KUTULARINA VERİLERİ GÖNDERDİĞİMİZ ARRAY
    {
      number: 5,
      title: "BU GÜN RANDEVU",
      changeRate: 5,
      lastOne: "3",
      graphType: "daily",
    },
    {
      number: 15,
      title: "BU HAFTA RANDEVU",
      changeRate: 5,
      lastOne: "14",
      graphType: "weekly",
    },
    {
      number: 45,
      title: "BU AY RANDEVU",
      changeRate: -10,
      lastOne: "55",
      graphType: "monthly",
    },
    {
      number: 505,
      title: "BU YIL RANDEVU",
      changeRate: 486,
      lastOne: "102",
      lastOne: "55",
      graphType: "yearly",
    },
    {
      number: 7,
      title: "RANDEVU TALEBİ",
      changeRate: -6,
      lastOne: "55",
      graphType: "request",
    },
    {
      number: 8,
      title: "RANDEVU İPTALİ",
      changeRate: 2,
      lastOne: "55",
      graphType: "cancel",
    },
    {
      number: 18,
      title: "RANDEVU ONAYI",
      changeRate: 10,
      lastOne: "55",
      graphType: "confirm",
    },

    {
      number: 9,
      title: "RANDEVU SÜRESİ",
      changeRate: 5,
      lastOne: "14",
      graphType: "time",
    },
  ];
  const optionsToday = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Saatler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const optionsMonthly = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsYearly = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsCancel = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu İptal Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsRequest = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu Talebi Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsConfirm = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Randevu Onay Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsTime = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Ortalama Randevu Süresi (DK)", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "bold", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const [options, setOptions] = useState(optionsToday);
  const changeGraph = (dataType) => {
    if (dataType === "weekly") {
      setGraph({ ...stateDay });
      setOptions(optionsMonthly);
    } else if (dataType === "yearly") {
      setGraph({ ...stateYearly });
      setOptions(optionsYearly);
    } else if (dataType === "daily") {
      setGraph({ ...stateToday });
      setOptions(optionsToday);
    } else if (dataType === "monthly") {
      setGraph({ ...stateMonthly });
      setOptions(optionsMonthly);
    } else if (dataType === "time") {
      setGraph({ ...stateTime });
      setOptions(optionsTime);
    } else if (dataType === "request") {
      setGraph({ ...stateRequest });
      setOptions(optionsRequest);
    } else if (dataType === "cancel") {
      setGraph({ ...stateCancel });
      setOptions(optionsCancel);
    } else if (dataType === "confirm") {
      setGraph({ ...stateConfirm });
      setOptions(optionsConfirm);
    }
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

  return (
    <div className="w-full my-4 bg-white mx-auto rounded-lg max-[768px]:max-w-[370px]">
      <div className="m-4 mb-0 block lg:flex items-center justify-center lg:justify-between">
        <h1 className="lg:text-[1.5vw] max-[768px]:text-xl font-semibold text-gray-600 pl-3 pt-4 text-center">
          İstatistikler
        </h1>
        <div className="block lg:flex items-center justify-center">
          <h1 className="text-xs lg:text-[0.8vw] text-gray-500 font-semibold flex items-center justify-center pt-4">
            Son Güncelleme : {guncelTarih}
          </h1>
          <button className="text-center flex items-center justify-center px-8 bg-gray-50 text-gray-600 border-2 border-gray-300 rounded-lg text-xs font-semibold lg:text-[0.8vw] h-[5vw] lg:h-[2vw] mt-4 lg:ml-5 mx-auto lg:mx-0">
            Tüm İstatistikler
          </button>
        </div>
      </div>
      <div className="infosArea block lg:flex  rounded-md">
        <>
          <div className="graphArea md:w-full lg:w-[50%] sm:flex block items-center justify-center mb-2 lg:mb-0 max-h-[345px] mt-3">
            <div className="lg:w-full h-full flex flex-col items-center justify-center lg:justify-start mr-1 ">
              <div className="titleArea block lg:flex mx-auto lg:mx-0 lg:ml-14 lg:justify-start items-center w-full ml-[55px] text-xs lg:text-[0.8vw] ">
                <div className="flex">
                  <h1 className=" text-gray-500 font-semibold">
                    {graph.datasets[0].label} :
                  </h1>
                  <h1 className=" text-orangeTable font-extrabold ml-1">
                    {graph.datasets[0].data.reduce(
                      (acc, currentValue) => acc + currentValue,
                      0
                    )}{" "}
                  </h1>
                  <h1 className=" text-gray-500 font-semibold ml-1">
                    (Toplam)
                  </h1>
                </div>
                {graph &&
                  graph.datasets &&
                  graph.datasets[1] &&
                  graph.datasets[1].label &&
                  graph.datasets[1].data && (
                    <>
                      <div className="flex my-3 lg:my-0">
                        {!isMobile && <h1 className="mx-3 text-gray-500">|</h1>}
                        <h1 className=" text-gray-500 font-semibold">
                          {graph.datasets[1].label} :
                        </h1>
                        <h1 className=" text-orangeTable font-extrabold ml-1">
                          {graph.datasets[1].data.reduce(
                            (acc, currentValue) => acc + currentValue,
                            0
                          )}{" "}
                        </h1>
                        <h1 className=" text-gray-500 font-semibold ml-1">
                          (Toplam)
                        </h1>
                      </div>
                    </>
                  )}

                {graph &&
                  graph.datasets &&
                  graph.datasets[1] &&
                  graph.datasets[1].label &&
                  graph.datasets[1].data && (
                    <>
                      <div className="flex">
                        {!isMobile && <h1 className="mx-3 text-gray-500">|</h1>}
                        <div className="changePercentage text-gray-500 font-semibold">
                          Değişim Yüzdesi:{" "}
                          {(
                            ((graph.datasets[0].data.reduce(
                              (acc, currentValue) => acc + currentValue,
                              0
                            ) -
                              graph.datasets[1].data.reduce(
                                (acc, currentValue) => acc + currentValue,
                                0
                              )) /
                              graph.datasets[1].data.reduce(
                                (acc, currentValue) => acc + currentValue,
                                0
                              )) *
                            100
                          ).toFixed(2)}
                          %{" "}
                          {graph.datasets[0].data.reduce(
                            (acc, currentValue) => acc + currentValue,
                            0
                          ) >
                          graph.datasets[1].data.reduce(
                            (acc, currentValue) => acc + currentValue,
                            0
                          ) ? (
                            <i className="fa-solid fa-arrow-up text-green-600"></i>
                          ) : (
                            <i className="fa-solid fa-arrow-down text-red-600"></i>
                          )}
                        </div>
                      </div>
                    </>
                  )}
              </div>
              <Line data={graph} options={options} className="p-2 " />
            </div>
          </div>
          <div className="infosArea flex items-center justify-end w-full lg:w-[50%] mx-auto">
            {renderSwiper(boxes)}
          </div>
        </>
      </div>
    </div>
  );
}

export default AppointmentInfos;
