import React, { useState, useEffect } from "react";
import Steps from "./steps";
import TimeAndDate from "./timeAndDate";
import ContactForm from "./contactInfo";
import ServiceComponent from "./serviceComponent";
import serviceImage from "../images/service.png";
import turkish from "../images/turkish.png";
import english from "../images/english.png";
import Swal from "sweetalert2";
import AppointmentView from "./appointmentView";
import AppointmentRequest from "./appointmentRequest";

function AppointmentComponent() {
  const [step, setStep] = useState(1); // en üstte gözüken stepleri tutan değişken
  const [returnDate, setReturnDate] = useState(""); // seçtiğimiz saat ve tarihi tutan değişken
  const [returnService, setReturnService] = useState(""); // seçtiğimiz service i tutan değişken
  const [showFinishScreen, setShowFinishScreen] = useState(false); // finishScreen i göstereceğimiz değişken
  const [forWho, setForWho] = useState("");
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [isOwn, setIsOwn] = useState(true); // kendim için ve başkası için değişkenlerini tutan değişken (true false yapısı)
  const [request, setRequest] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    // ileri butonu fonksiyonu (seçim yapmadan ileri gitmeye çalıştığımızda hata veriyor)
    if (step === 2) {
      if (!returnService) {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen bir servis seçin.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }
    }
    if (step === 1) {
      if (!returnDate) {
        Swal.fire({
          title: "Hata !",
          text: "Devam etmeden önce lütfen randevu saati seçiniz.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    //back butonu fonksiyonu
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const selectedTimes = [
    { time: "10:02", date: "2023-12-20", active: true },
    { time: "10:03", date: "2023-12-20", active: true },
    { time: "10:02", date: "2023-12-21", active: true },
    { time: "10:03", date: "2023-12-21", active: true },
    { time: "10:04", date: "2023-12-21", active: true },
    { time: "10:05", date: "2023-12-21", active: true },
    { time: "10:02", date: "2023-12-22", active: true },
    { time: "10:03", date: "2023-12-22", active: true },
    { time: "10:04", date: "2023-12-22", active: true },
    { time: "10:05", date: "2023-12-22", active: true },
    { time: "10:06", date: "2023-12-22", active: true },
    { time: "10:07", date: "2023-12-22", active: true },
    { time: "10:02", date: "2023-12-23", active: true },
    { time: "10:03", date: "2023-12-23", active: true },
    { time: "10:04", date: "2023-12-23", active: true },
    { time: "10:05", date: "2023-12-23", active: true },
    { time: "10:06", date: "2023-12-23", active: true },
    { time: "10:07", date: "2023-12-23", active: true },
    { time: "10:08", date: "2023-12-23", active: true },
    { time: "10:09", date: "2023-12-23", active: true },
    { time: "10:02", date: "2023-12-24", active: true },
    { time: "10:03", date: "2023-12-24", active: true },
    { time: "10:04", date: "2023-12-24", active: true },
    { time: "10:05", date: "2023-12-24", active: true },
    { time: "10:06", date: "2023-12-24", active: true },
    { time: "10:07", date: "2023-12-24", active: true },
    { time: "10:08", date: "2023-12-24", active: true },
    { time: "10:09", date: "2023-12-24", active: true },
    { time: "10:12", date: "2023-12-24", active: true },
    { time: "10:22", date: "2023-12-24", active: true },
  ];

  // const [selectedTimes, setSelectedTimes] = useState([]); //saatleri atadığımız değişken

  // useEffect(() => {                             //DATABASE DEN OKUCAAK SAATLER
  //   const storedTimes = sessionStorage.getItem('selectedTimes');
  //   const parsedTimes = storedTimes ? JSON.parse(storedTimes) : [];
  //   setSelectedTimes(parsedTimes);
  // }, []);

  const obje = [
    //örnek services datası
    {
      title: "İlişki Terapisi",
      image: serviceImage,
    },
    {
      title: "Kaygı (Anksiyete)",
      image: serviceImage,
    },
    {
      title: "Depresyon",
      image: serviceImage,
    },
    {
      title: "Travma Sonrası Stres Bozukluğu",
      image: serviceImage,
    },
    {
      title: "Uyum Bozuklukları",
      image: serviceImage,
    },
    {
      title: "Bireysel Terapi",
      image: serviceImage,
    },
    {
      title: "Aile ve Çift Terapisi",
      image: serviceImage,
    },
    {
      title: "Varoluşsal Problemler",
      image: serviceImage,
    },
    {
      title: "Kilo Verme",
      image: serviceImage,
    },
    {
      title: "Fitness",
      image: serviceImage,
    },
    {
      title: "Futbol Antremanı",
      image: serviceImage,
    },
    {
      title: "Basketbol Antremanı",
      image: serviceImage,
    },
  ];

  const handleFinish = (formDataa) => {
    setForWho(formDataa.kimIçin);
    setNotes(formDataa.notes);
    setLanguage(formDataa.language);
    setGender(formDataa.gender);
    setBirthday(formDataa.dateOfBirth);
    setFirstName(formDataa.firstName);
    setLastName(formDataa.lastName);
    if (step === 3) {
      // Check if any required field is empty except for "kendim" or "başkası"
      const isFormValid = Object.keys(formDataa).every(
        (key) => formDataa[key] !== ""
      );

      if (isFormValid) {
        const existingSelectedTimes =
          JSON.parse(sessionStorage.getItem("selectedTimes")) || [];

        const selectedDateTime = returnDate.split(" ")[2];
        const selectedDate = returnDate.split(" ")[0];

        const parts = selectedDate.split(".");
        const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
          .toISOString()
          .split("T")[0];

        const timeIndex = existingSelectedTimes.findIndex(
          (timeObj) =>
            timeObj.time === selectedDateTime && timeObj.date === formattedDate
        );

        if (timeIndex !== -1) {
          existingSelectedTimes[timeIndex].active = false;
          sessionStorage.setItem(
            "selectedTimes",
            JSON.stringify(existingSelectedTimes)
          );
        }

        let existingFormData =
          JSON.parse(sessionStorage.getItem("formData")) || [];

        const circularReplacer = () => {
          const seen = new WeakSet();
          return (_, value) => {
            if (typeof value === "object" && value !== null) {
              if (seen.has(value)) {
                return;
              }
              seen.add(value);
            }
            return value;
          };
        };

        existingFormData.push(formDataa);
        // Update the 'formData' in sessionStorage using the replacer function
        sessionStorage.setItem(
          "formData",
          JSON.stringify(existingFormData, circularReplacer())
        );
        setShowFinishScreen(true);
        openModal();
      } else {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen tüm alanları doldurunuz.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
      }
    }
  };

  const openAlert = () => {
    Swal.fire({
      title: "Başarılı",
      html: request
        ? '<h2 class="text-stepBorder1 text-center text-base font-semibold p-4">' +
          "Randevu talebiniz başarılı bir şekilde oluşturuldu." +
          '<a class="text-buttonColor text-lg font-semibold" href="/myAppointments"> Randevularım </a>' +
          "bölümünden randevunuzun detaylarını inceleyebilir ve yönetebilirsiniz." +
          "</h2>"
        : '<h2 class="text-stepBorder1 text-center text-base font-semibold p-4">' +
          "Sizinle buluşmayı büyük bir heyecan ile bekliyoruz." +
          '<a class="text-buttonColor text-lg font-semibold" href="/myAppointments"> Randevularım </a>' +
          "bölümünden randevunuzun detaylarını inceleyebilir ve yönetebilirsiniz." +
          "</h2>",
      icon: "success",
      confirmButtonText: "Kapat",
    });
    closeModal();
  };

  const handleOptionChange = (option) => {
    // forOwn ve forSomeone ögeleri arasında değişimi sağlıyor
    setIsOwn(option);
  };

  const [formData2, setFormData2] = useState({
    kimIçin: "başkası",
    time: "",
    service: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    notes: "",
    gender: "",
  });

  const parseDateTime = (returnDate) => {
    const dateTimeParts = returnDate.split(" ");
    if (dateTimeParts.length === 4) {
      const [day, month, year] = dateTimeParts[0].split(".");
      const dateFormatted = `${day}.${month}.${year}`;

      return {
        date: dateFormatted,
        time: dateTimeParts[2],
      };
    }

    // Varsayılan olarak returnDate'i direkt olarak date prop'una ekleyebilirsiniz
    return {
      date: returnDate,
      time: "",
    };
  };

  // Kullanım
  const returnDateFinal = returnDate;
  const { date, time } = parseDateTime(returnDateFinal);
  const [appointmentRequest, setAppointmentRequest] = useState(false);
  const [requestSelectedTime, setRequestSelectedTime] = useState("");

  const [timedRequestSelectedTime, setTimesRequestSelectedTime] = useState("");

  const [timedRequestSelectedDate, setTimesRequestSelectedDate] = useState("");
  const handleFormSubmit = (values) => {
    setRequestSelectedTime(values.time);
    setTimesRequestSelectedTime(values.time);
    closeModalRequest();
  };

  useEffect(() => {}, [requestSelectedTime]);

  const openModalRequest = () => {
    setAppointmentRequest(true);
  };

  const closeModalRequest = () => {
    setAppointmentRequest(false);
  };

  return (
    <>
      {showFinishScreen && (
        <AppointmentView
          isRequest={request}
          isOpen={isModalOpen}
          confirmButton={openAlert}
          onClose={closeModal}
          time={time}
          service={returnService}
          date={date}
          forWho={forWho}
          language={language}
          notes={notes}
          gender={gender}
          birthday={birthDay}
          firstName={firstName}
          lastName={lastName}
          price={"100"}
          serviceProviderName={"Bayram Çınar"}
          serviceProviderJob={"Uzman, Klinik Psikoloji"}
        />
      )}
      {!showFinishScreen && (
        <div className="bg-dayComponentBg generalDiv lg:w-[35rem] ml-auto mr-auto mt-[50px] sm:w-[26rem] md:w-[26rem] md:h-auto sm:h-auto">
          {appointmentRequest === true && (
            <AppointmentRequest
              isOpen={openModalRequest}
              onClose={closeModalRequest}
              handleFormSubmit={handleFormSubmit}
            />
          )}
          <Steps active={step} />
          {step === 2 && (
            <ServiceComponent
              services={obje}
              setReturnService={setReturnService}
            />
          )}
          {step === 1 && (
            <TimeAndDate
              selectedDateRequest={timedRequestSelectedDate}
              setSelectedDateRequest={setTimesRequestSelectedDate}
              request={request}
              setRequest={setRequest}
              selectedRequestTime={requestSelectedTime}
              appointmentRequest={appointmentRequest}
              setAppointmentRequest={setAppointmentRequest}
              timedSelectedRequestTime={timedRequestSelectedTime}
              setReturnDate={setReturnDate}
              times={selectedTimes}
              setTimesRequestSelectedTime={setTimesRequestSelectedTime}
              setSelectedRequestTime={setRequestSelectedTime}
              live={true}
            />
          )}
          {step === 3 && (
            <>
              <ContactForm
                time={returnDate}
                service={returnService}
                onFormSubmit={handleFinish}
                onOptionSelect={handleOptionChange}
                languages={[
                  {
                    language: "English",
                    flagImg: english,
                  },
                  {
                    language: "Turkish",
                    flagImg: turkish,
                  },
                ]}
              />
            </>
          )}
          <div className="flex items-center justify-center buttonArea mt-4">
            {step > 1 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button
                  onClick={handleBack}
                  className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons"
                >
                  <h4 className="text-text p-2 text-lg tracking-wider">
                    <i className="mr-16 fa-solid fa-arrow-left"></i> Geri
                  </h4>
                </button>
              </div>
            )}
            {step === 2 && (
              <>
                <div className="nextStep flex items-center justify-center m-3 mb-5">
                  <button
                    onClick={handleNext}
                    className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons"
                  >
                    <h4 className="text-text p-2 text-lg tracking-wider">
                      İleri <i className="ml-8 fa-solid fa-arrow-right"></i>
                    </h4>
                  </button>
                </div>
              </>
            )}
            {step < 2 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button
                  onClick={handleNext}
                  className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons"
                >
                  <h4 className="text-text p-2 text-lg tracking-wider">
                    İleri<i className="ml-8 fa-solid fa-arrow-right"></i>
                  </h4>
                </button>
              </div>
            )}
            {step === 3 && (
              <>
                <div className="nextStep flex items-center justify-center m-3 mb-5">
                  <button
                    value="Submit"
                    form="myform"
                    type="submit"
                    className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons"
                  >
                    <h4 className="text-text p-2 text-lg tracking-wider">
                      Bitir<i className="ml-14 fa-solid fa-check"></i>
                    </h4>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentComponent;
