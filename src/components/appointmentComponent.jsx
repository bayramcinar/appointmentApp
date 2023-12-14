import React, { useState } from 'react';
import Steps from './steps';
import TimeAndDate from './timeAndDate';
import ContactForm from './contactInfo';
import ServiceComponent from './serviceComponent';
import serviceImage from '../images/service.png';
import FinishScreen from './finishScreen';
import { useAppointmentContext } from "./appointmentContext";

function AppointmentComponent() {
  const [step, setStep] = useState(1);      // en üstte gözüken stepleri tutan değişken
  const [returnDate, setReturnDate] = useState("");       // seçtiğimiz saat ve tarihi tutan değişken
  const [returnService, setReturnService] = useState("");   // seçtiğimiz service i tutan değişken
  const [showFinishScreen, setShowFinishScreen] = useState(false);   // finishScreen i göstereceğimiz değişken

  const [isOwn, setIsOwn] = useState(true);   // kendim için ve başkası için değişkenlerini tutan değişken (true false yapısı)

  const handleNext = () => {       // ileri butonu fonksiyonu (seçim yapmadan ileri gitmeye çalıştığımızda hata veriyor)
    if (step === 2) {
      if (!returnService) {
        alert("Please select a service before proceeding to the next step.");
        return;
      }
    }
    if (step === 1) {
      if (!returnDate) {
        alert("Please select a Date before proceeding to the next step.");
        return;
      }
    }
    setStep((prevStep) => prevStep + 1);
  };
   
  const handleBack = () => {   //back butonu fonksiyonu 
    if(step > 1){
      setStep((prevStep) => prevStep - 1);
    }
  };


  const { selectedTimes } = useAppointmentContext();   //useContext den saatleri alıyoruz


  const obje = [   //örnek services datası
    {
      title:"İlişki Terapisi",
      image:serviceImage
    },
    {
      title:"Kaygı (Anksiyete)",
      image:serviceImage
    },
    {
      title:"Depresyon",
      image:serviceImage
    },
    {
      title:"Travma Sonrası Stres Bozukluğu",
      image:serviceImage
    },
    {
      title:"Uyum Bozuklukları",
      image:serviceImage
    },
    {
      title:"Bireysel Terapi",
      image:serviceImage
    },
    {
      title:"Aile ve Çift Terapisi",
      image:serviceImage
    },
    {
      title:"Varoluşsal Problemler",
      image:serviceImage
    },
    {
      title:"Kilo Verme",
      image:serviceImage
    }
  ];

  const handleFinish = (formDataa) => {
    if (step === 3) {
  
      // Check if any required field is empty except for "kendim" or "başkası"
      const isFormValid = Object.keys(formDataa)
        .every((key) => formDataa[key] !== "");
  
      if (isFormValid) {
        const existingSelectedTimes = JSON.parse(sessionStorage.getItem('selectedTimes')) || [];

  
        const selectedDateTime = returnDate.split(' ')[2];
        const selectedDate = returnDate.split(' ')[0];
  
        const parts = selectedDate.split('.');
        const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString().split('T')[0];
  
        const timeIndex = existingSelectedTimes.findIndex(
          (timeObj) => timeObj.time === selectedDateTime && timeObj.date === formattedDate
        );

  
        if (timeIndex !== -1) {
          existingSelectedTimes[timeIndex].active = false;
          sessionStorage.setItem('selectedTimes', JSON.stringify(existingSelectedTimes));
        }
  
        let existingFormData = JSON.parse(sessionStorage.getItem('formData')) || [];
  
        const circularReplacer = () => {
          const seen = new WeakSet();
          return (_, value) => {
            if (typeof value === 'object' && value !== null) {
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
        sessionStorage.setItem('formData', JSON.stringify(existingFormData, circularReplacer()));
  
        setShowFinishScreen(true);
      } else {
        alert('Please fill out all required fields');
      }
    }
  };
  


  const handleOptionChange = (option) => {    // forOwn ve forSomeone ögeleri arasında değişimi sağlıyor
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
   
  

  return (
    <>
      {showFinishScreen && <FinishScreen time={returnDate} service={returnService} name={formData2.firstName} surname={formData2.lastName} />}
      {!showFinishScreen && (
        <div className='bg-dayComponentBg generalDiv lg:w-[50rem] ml-auto mr-auto mt-[50px] sm:w-[26rem] md:w-[26rem] md:h-auto sm:h-auto'>
          <Steps active={step} />
          {step === 2 && <ServiceComponent services={obje} setReturnService={setReturnService} />}
          {step === 1 && <TimeAndDate setReturnDate={setReturnDate} times={selectedTimes} live={true}/>}
          {step === 3 && (
            <>
              <ContactForm
                time={returnDate}
                service={returnService}
                onFormSubmit={handleFinish}
                onOptionSelect={handleOptionChange}
              />
            </>
          )}
          <div className='flex items-center justify-center buttonArea mt-4'>
            {step > 1 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button onClick={handleBack} className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons" >
                  <h4 className="text-text p-2 text-lg tracking-wider"><i className="mr-16 fa-solid fa-arrow-left"></i> Geri</h4>
                </button>
              </div>
            )}
            {step === 2 && (
              <>
                <div className="nextStep flex items-center justify-center m-3 mb-5">
                  <button onClick={handleNext} className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons">
                    <h4 className="text-text p-2 text-lg tracking-wider">İleri <i className="ml-8 fa-solid fa-arrow-right"></i></h4>
                  </button>
                </div>
              </>
            )}
            {step < 2 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button onClick={handleNext} className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons">
                  <h4 className="text-text p-2 text-lg tracking-wider">İleri<i className="ml-8 fa-solid fa-arrow-right"></i></h4>
                </button>
              </div>
            )}
            {step === 3 && (
              <>
                <div className="nextStep flex items-center justify-center m-3 mb-5">
                  <button value="Submit" form='myform' type='submit' className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons">
                    <h4 className="text-text p-2 text-lg tracking-wider">Bitir<i className="ml-14 fa-solid fa-check"></i></h4>
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