import React, { useState, useEffect } from "react";
import Steps from "./steps";
import TimeAndDate from "./timeAndDate";
import ContactForm from "./contactInfo";
import ServiceComponent from "./serviceComponent";
import turkish from "../images/turkish.png";
import english from "../images/english.png";
import Swal from "sweetalert2";
import AppointmentView from "./appointmentView";

function AppointmentComponent() {
  const [step, setStep] = useState(1); // en üstte gözüken stepleri tutan değişken
  const [returnDate, setReturnDate] = useState(""); // seçtiğimiz saat ve tarihi tutan değişken
  const [returnService, setReturnService] = useState(""); // seçtiğimiz service i tutan değişken
  const [showFinishScreen, setShowFinishScreen] = useState(false); // finishScreen i göstereceğimiz değişken
  const [forWho, setForWho] = useState(""); //Appointment view ekranında kullandığımız kim için i atadığımız değişkern
  const [notes, setNotes] = useState(""); //Appointment view ekranında kullandığımız notları i atadığımız değişkern
  const [language, setLanguage] = useState(""); //Appointment view ekranında kullandığımız dili i atadığımız değişkern
  const [firstName, setFirstName] = useState(""); //Appointment view ekranında kullandığımız ilk ismi i atadığımız değişkern
  const [lastName, setLastName] = useState(""); //Appointment view ekranında kullandığımız soyismi i atadığımız değişkern
  const [gender, setGender] = useState(""); //Appointment view ekranında kullandığımız cinsiyet i atadığımız değişkern
  const [birthDay, setBirthday] = useState(""); //Appointment view ekranında kullandığımız doğum datiri i atadığımız değişkern
  const [isOwn, setIsOwn] = useState(true); // kendim için ve başkası için değişkenlerini tutan değişken (true false yapısı)
  const [request, setRequest] = useState(false); //Appointment view ekranında kullandığımız talep olup olmadığını i atadığımız değişkern
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duration, setDuration] = useState("");
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

  const [selectedTimes, setSelectedTimes] = useState([]); //saatleri atadığımız değişken

  useEffect(() => {
    //DATABASE DEN OKUCAAK SAATLER
    const storedTimes = localStorage.getItem("selectedTimes");
    const parsedTimes = storedTimes ? JSON.parse(storedTimes) : [];
    setSelectedTimes(parsedTimes);
  }, []);

  const obje = [
    //örnek services datası
    {
      title: "İlişki Terapisi",
    },
    {
      title: "Kaygı (Anksiyete)",
    },
    {
      title: "Depresyon",
    },
    {
      title: "Travma Sonrası Stres Bozukluğu",
    },
    {
      title: "Uyum Bozuklukları",
    },
    {
      title: "Bireysel Terapi",
    },
    {
      title: "Aile ve Çift Terapisi",
    },
    {
      title: "Varoluşsal Problemler",
    },
    {
      title: "Kilo Verme",
    },
    {
      title: "Fitness",
    },
    {
      title: "Futbol Antremanı",
    },
    {
      title: "Basketbol Antremanı",
    },
  ];

  const handleFinish = (formDataa) => {
    // randevuyu tamamlamamızı sağlayan fonksiyon
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
          JSON.parse(localStorage.getItem("selectedTimes")) || [];

        const selectedDateTime = returnDate.split(" ")[2];
        const selectedDate = returnDate.split(" ")[0];

        console.log(selectedDate);

        // Gününüze bir gün ekleyin
        const parts = selectedDate.split(".");
        const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        formattedDate.setDate(formattedDate.getDate() + 1);

        console.log(formattedDate.toISOString().split("T")[0]);
        console.log(selectedDateTime);

        const timeIndex = existingSelectedTimes.findIndex(
          (timeObj) =>
            timeObj.time === selectedDateTime &&
            timeObj.date === formattedDate.toISOString().split("T")[0]
        );
        console.log(timeIndex);

        if (timeIndex !== -1) {
          existingSelectedTimes[timeIndex].active = false;
          localStorage.setItem(
            "selectedTimes",
            JSON.stringify(existingSelectedTimes)
          );
        }

        let existingFormData =
          JSON.parse(localStorage.getItem("formData")) || [];

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

        // Update the 'formData' in localStorage using the replacer function
        localStorage.setItem(
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
    //onaylama alerti
    Swal.fire({
      title: "Başarılı",
      html: request
        ? '<h2 class="text-stepBorder1 text-center text-base font-semibold p-4">' +
          "Randevu talebiniz başarılı bir şekilde oluşturuldu." +
          '<a class="text-deepSlateBlue text-lg font-semibold" href="/myAppointments"> Randevularım </a>' +
          "bölümünden randevunuzun detaylarını inceleyebilir ve yönetebilirsiniz." +
          "</h2>"
        : '<h2 class="text-stepBorder1 text-center text-base font-semibold p-4">' +
          "Sizinle buluşmayı büyük bir heyecan ile bekliyoruz." +
          '<a class="text-deepSlateBlue text-lg font-semibold" href="/myAppointments"> Randevularım </a>' +
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
    // date i day.month.year formuna dönüştüren fonksiyon
    const dateTimeParts = returnDate.split(" ");
    if (dateTimeParts.length === 5) {
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

  const appointmentDuration = 90; //KULLANICI PROFİLİNDEN ALDIĞIMIZ SÜRE

  // Kullanım
  const returnDateFinal = returnDate;
  const { date, time } = parseDateTime(returnDateFinal);

  const parseDateTimeString = (dateTimeString) => {
    // date i year-month-day formuna dönüştüren fonksiyon
    const dateTimeParts = dateTimeString.split(" ");
    if (dateTimeParts.length === 5) {
      const [day, month, year] = dateTimeParts[0].split(".");
      const dateFormatted = `${year}-${month}-${day}`;
      const time = dateTimeParts[2];
      return { date: dateFormatted, time };
    }
    // Hata durumu için boş bir obje döndürebilirsiniz.
    return { date: "", time: "" };
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
          duration={appointmentDuration}
          price={"100"}
          serviceProviderName={"Bayram Çınar"} //DATABASE DEN ALINAN SERVİSİ VEREN KİŞİNİN ADI
          serviceProviderJob={"Uzman, Klinik Psikoloji"} //DATABASE DEN ALINAN SERVİSİ VEREN KİŞİNİN MESLEĞİ
        />
      )}
      {!showFinishScreen && (
        <div className="bg-dayComponentBg generalDiv lg:w-[35rem] ml-auto mr-auto mt-[50px] sm:w-[26rem] md:w-[26rem] md:h-auto sm:h-auto">
          <Steps active={step} />
          {step === 2 && (
            <ServiceComponent
              services={obje}
              setReturnService={setReturnService}
            />
          )}
          {step === 1 && (
            <TimeAndDate
              request={request}
              setRequest={setRequest}
              selectedTimes={selectedTimes}
              setReturnDate={setReturnDate}
              times={selectedTimes}
              setDuration1={setDuration}
              live={true}
            />
          )}
          {step === 3 && (
            <>
              <ContactForm
                duration={appointmentDuration}
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
                  className="border-premiumPurple bg-white border-2 rounded-3xl flex items-center justify-center w-[9rem] buttons"
                >
                  <h4 className="text-premiumPurple p-2 text-md tracking-wider">
                    <i className="mr-2 fa-solid fa-chevron-left"></i> Geri
                  </h4>
                </button>
              </div>
            )}
            {step === 2 && (
              <>
                <div className="nextStep flex items-center justify-center m-3 mb-5">
                  <button
                    onClick={handleNext}
                    className="bg-premiumPurple rounded-3xl flex items-center justify-center w-[9rem] buttons"
                  >
                    <h4 className="text-text p-2 text-md tracking-wider">
                      İleri <i className="ml-2 fa-solid fa-chevron-right"></i>
                    </h4>
                  </button>
                </div>
              </>
            )}
            {step < 2 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button
                  onClick={handleNext}
                  className="bg-premiumPurple rounded-3xl flex items-center justify-center w-[9rem] buttons"
                >
                  <h4 className="text-text p-2 text-md tracking-wider">
                    İleri<i className="ml-2 fa-solid fa-chevron-right"></i>
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
                    className="bg-premiumPurple rounded-3xl flex items-center justify-center w-[9rem] buttons"
                  >
                    <h4 className="text-text p-2 text-md tracking-wider">
                      Bitir<i className="ml-2 fa-solid fa-check"></i>
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
