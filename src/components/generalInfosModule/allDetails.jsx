import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

function AllDetails({ isOpen, onClose }) {
  Chart.register(...registerables);
  Chart.register(CategoryScale);
  const isMobile = window.innerWidth <= 768;
  const [selectedGraph, setSelectedGraph] = useState("appointmentDetails");

  const appointmentDetails = {
    //RANDEVU
    labels: ["Aktif", "Pasif", "Tamamlanmış", "İptal"],
    datasets: [
      {
        data: [5, 8, 12, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const appointmentAgeRate = {
    labels: ["0-18", "18-25", "25-50", "50+"],
    datasets: [
      {
        data: [1, 6, 14, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const appointmentGender = {
    labels: ["Erkek", "Kadın"],
    datasets: [
      {
        data: [5, 8],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const appointmentLanguage = {
    labels: ["Türkçe", "İngilizce"],
    datasets: [
      {
        data: [12, 3],
        backgroundColor: ["#4BC0C0", "#FFCE56"],
      },
    ],
  };
  const appointmentRequest = {
    labels: ["Kabul Edilen Talepler", "Rabul Edilen Talepler"],
    datasets: [
      {
        data: [3, 6],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const appointmentCancelled = {
    labels: ["Depresyon", "Kaygı", "Fitness", "Futbol"],
    datasets: [
      {
        data: [4, 9, 7, 13],
        backgroundColor: ["#FFCE56", "#4BC0C0", "#36A2EB", "#FFCE90"],
      },
    ],
  };
  const whyAppointmentCancelled = {
    labels: [
      "Müşterinin İptal Ettiği",
      "Benim İptal Ettiği",
      "Ofistik Tarafından İptal Edilen",
    ],
    datasets: [
      {
        data: [3, 5, 1],
        backgroundColor: ["#FFCE56", "#4BC0C0", "#36A2EB"],
      },
    ],
  };
  const appointmentCategories = {
    labels: [
      "İlişki Terapisi",
      "Depresyon",
      "Kilo Verme",
      "Uyum Bozuklukları",
      "Fitness",
    ],
    datasets: [
      {
        data: [3, 7, 10, 6, 8],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#ac4abf",
        ],
      },
    ],
  };
  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  const total =
    selectedGraph === "appointmentDetails"
      ? appointmentDetails.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : selectedGraph === "appointmentCategories"
      ? appointmentCategories.datasets[0].data.reduce(
          (acc, val) => acc + val,
          0
        )
      : selectedGraph === "appointmentAgeRate"
      ? appointmentAgeRate.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : selectedGraph === "appointmentLanguage"
      ? appointmentLanguage.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : appointmentRequest.datasets[0].data.reduce((acc, val) => acc + val, 0);

  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTabChange = (selected) => {
    setSelectedGraph(selected);
  };

  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative mx-[3rem] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown max-w-[1200px]">
          <div className="flex items-center justify-center relative">
            <div className="titleModal m-3">
              <h1 className="text-center mr-auto ml-auto w-full mb-0 text-md md:text-[1.5vw] lg:text-[1.4vw] xl:text-[1.3vw]">
                {selectedGraph === "appointmentDetails"
                  ? "Randevu Statüleri"
                  : selectedGraph === "appointmentGender"
                  ? "Randevu Cinsiyet Dağılımı"
                  : selectedGraph === "appointmentCategories"
                  ? "Randevu Kategorileri"
                  : selectedGraph === "appointmentAgeRate"
                  ? "Randevu Yaş Dağılımı"
                  : selectedGraph === "appointmentLanguage"
                  ? "Randevu Dil Dağılımı"
                  : selectedGraph === "appointmentCancelled"
                  ? "İptal Edilen Randevu Kategorileri"
                  : selectedGraph === "whyAppointmentCancelled"
                  ? "İptal Edilme Nedenleri"
                  : "Randevu Talepleri"}
              </h1>
            </div>
            <div
              className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
              onClick={onClose}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
              </svg>
            </div>
          </div>
          {!isMobile && (
            <div className="flex justify-center my-5 flex-wrap text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
              <button
                className={`px-4 py-1 mx-2 ${
                  selectedGraph === "appointmentDetails"
                    ? " text-premiumOrange border-b-2 border-premiumOrange"
                    : " text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentDetails")}
              >
                Randevu İstatistikleri
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentCategories"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentCategories")}
              >
                Randevu Kategorileri
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentCancelled"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentCancelled")}
              >
                İptal Edilen Randevu Kategorileri
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "whyAppointmentCancelled"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("whyAppointmentCancelled")}
              >
                İptal Edilme Nedenleri
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentGender"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentGender")}
              >
                Cinsiyet Dağılımı
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentAgeRate"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentAgeRate")}
              >
                Yaş Dağılımı
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentLanguage"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentLanguage")}
              >
                Dil Dağılımı
              </button>
              <button
                className={`px-4 py-2 mx-2 ${
                  selectedGraph === "appointmentRequest"
                    ? "text-premiumOrange border-b-2 border-premiumOrange"
                    : "text-gray-400  border-b-2 border-gray-300"
                }`}
                onClick={() => handleTabChange("appointmentRequest")}
              >
                Talepler
              </button>
            </div>
          )}

          {isMobile && (
            <div className="flex justify-center items-center text-sm w-full ">
              <select
                onChange={(e) => handleTabChange(e.target.value)}
                value={selectedGraph}
                className="p-1 border-b-2 border-gray-300 m-2 text-gray-500 cursor-pointer w-[100%]"
              >
                <option value="appointmentDetails">
                  Randevu İstatistikleri
                </option>
                <option value="appointmentCategories">
                  Randevu Kategorileri
                </option>
                <option value="appointmentCancelled">
                  İptal Edilen Randevu Kategorileri
                </option>
                <option value="whyAppointmentCancelled">
                  İptal Edilme Nedenleri
                </option>
                <option value="appointmentGender">Cinsiyet Dağılımı</option>
                <option value="appointmentAgeRate">Yaş Dağılımı</option>
                <option value="appointmentLanguage">Dil Dağılımı</option>
                <option value="appointmentRequest">Talepler</option>
              </select>
            </div>
          )}
          <div className="block md:flex text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
            <div className="generalDiv flex items-center justify-center">
              <div className="graphArea  mb-5 lg:mb-0 lg:h-[15vw] lg:w-[15vw] md:h-[25vw] md:w-[25vw] h-[40vw] w-[40vw] p-4 lg:p-8">
                <Doughnut
                  data={
                    selectedGraph === "appointmentDetails"
                      ? appointmentDetails
                      : selectedGraph === "appointmentGender"
                      ? appointmentGender
                      : selectedGraph === "appointmentCategories"
                      ? appointmentCategories
                      : selectedGraph === "appointmentAgeRate"
                      ? appointmentAgeRate
                      : selectedGraph === "appointmentLanguage"
                      ? appointmentLanguage
                      : selectedGraph === "appointmentCancelled"
                      ? appointmentCancelled
                      : selectedGraph === "whyAppointmentCancelled"
                      ? whyAppointmentCancelled
                      : appointmentRequest
                  }
                  options={options}
                />
              </div>
            </div>
            <div className="ml-5 w-[68vw] lg:w-[55vw]">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-start">Durum</th>
                    <th className="text-start">Adet</th>
                    <th className="text-start">Yüzde</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGraph === "appointmentDetails"
                    ? appointmentDetails.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentDetails.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentDetails.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentDetails.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "appointmentGender"
                    ? appointmentGender.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentGender.datasets[0].backgroundColor[
                                    index
                                  ],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentGender.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentGender.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "appointmentCategories"
                    ? appointmentCategories.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentCategories.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentCategories.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentCategories.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "appointmentAgeRate"
                    ? appointmentAgeRate.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentAgeRate.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentAgeRate.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentAgeRate.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "appointmentLanguage"
                    ? appointmentLanguage.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentLanguage.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentLanguage.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentLanguage.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "appointmentCancelled"
                    ? appointmentCancelled.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentCancelled.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentCancelled.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentCancelled.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "whyAppointmentCancelled"
                    ? whyAppointmentCancelled.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  whyAppointmentCancelled.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {whyAppointmentCancelled.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              whyAppointmentCancelled.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : appointmentRequest.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  appointmentRequest.datasets[0]
                                    .backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {appointmentRequest.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              appointmentRequest.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold">
                    <td style={{ padding: "12px 0" }}>Toplam</td>
                    <td style={{ padding: "12px 0" }}>{total}</td>
                    <td style={{ padding: "12px 0" }}>100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllDetails;
