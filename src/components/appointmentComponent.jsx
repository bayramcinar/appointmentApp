import React, { useState } from 'react';
import Steps from './steps';
import TimeAndDate from './timeAndDate';
import ContactForm from './contactInfo';
import ServiceComponent from './serviceComponent';
import serviceImage from '../images/service.png';
import FinishScreen from './finishScreen';
import "../style/appointmentComponent.css";
import { useAppointmentContext } from "./appointmentContext";

function AppointmentComponent() {
  const [step, setStep] = useState(1);      // en üstte gözüken stepleri tutan değişken
  const [returnDate, setReturnDate] = useState("");       // seçtiğimiz saat ve tarihi tutan değişken
  const [returnService, setReturnService] = useState("");   // seçtiğimiz service i tutan değişken
  const [showFinishScreen, setShowFinishScreen] = useState(false);   // finishScreen i göstereceğimiz değişken

  const [selectedOption, setSelectedOption] = useState('forOwn');   // kendim için ve başkası için değişkenlerini tutan değişken

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
    setStep((prevStep) => prevStep - 1);
  };


  const { selectedTimes } = useAppointmentContext();


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


  const handleFinish = () => {   // eğer 3. step de isek çağırılan fonksiyon showFinish screen değerini true yapıp finishScreen i gösteriyor ve form bilgilerini forOwn veya forSomeone şeklinde submitliyor
    if (step === 3) {
      const currentFormData = selectedOption === 'forOwn' ? formData1 : formData2;
  
      if(handleFormSubmit(currentFormData) !== "invalid"){
        // Find the index of the selected time in sessionStorage
      const existingSelectedTimes = JSON.parse(sessionStorage.getItem('selectedTimes')) || [];
      
  
      const selectedDateTime = returnDate.split(' ')[2]; // Extract the time part
      const selectedDate = returnDate.split(' ')[0];

      const parts = selectedDate.split('.');
      const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString().split('T')[0];
      
  
      const timeIndex = existingSelectedTimes.findIndex(
        (timeObj) => timeObj.time === selectedDateTime && timeObj.date === formattedDate
      );
  
      console.log('timeIndex:', timeIndex);
  
      if (timeIndex !== -1) {
        // Update the active property to false for the selected time
        existingSelectedTimes[timeIndex].active = false;
        sessionStorage.setItem('selectedTimes', JSON.stringify(existingSelectedTimes));
      }
  
      let existingFormData = sessionStorage.getItem('formData');
  
      if (!existingFormData) {
        existingFormData = [];
      } else {
        existingFormData = JSON.parse(existingFormData);
      }
  
      existingFormData.push(currentFormData);
      sessionStorage.setItem('formData', JSON.stringify(existingFormData));
  
      setShowFinishScreen(true);
      handleFormSubmit(currentFormData);
      }else{
        alert('Please fill out all required fields');
      }
    }
  };

  const handleOptionChange = (option) => {    // forOwn ve forSomeone ögeleri arasında değişimi sağlıyor
    setSelectedOption(option);
  };


  const [formData1, setFormData1] = useState(
    { 
      kimIçin :"",
      time:"",
      service:"",
      notes: '' 
    }
  
    ); // forOwn form datası
  const [formData2, setFormData2] = useState({ // forSomeOne form datası
    kimIçin :"",
    time:"",
    service:"",
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    notes: '',
    gender: '',
  });


  const handleFormSubmit = (formData) => {
    // Check if any required field is empty
    const isFormValid = Object.values(formData).every((value) => value !== '');
  
    if (isFormValid) {
      if (selectedOption === 'forOwn') {
        setFormData1(formData);
      } else {
        setFormData2(formData);
      }
    } else {
      return "invalid";
    }
  };
  
  

  return (
    <>
      {showFinishScreen && <FinishScreen time={returnDate} service={returnService} name={formData2.firstName} surname={formData2.lastName} />}
      {!showFinishScreen && (
        <div className='bg-dayComponentBg generalDiv'>
          <Steps active={step} />
          {step === 2 && <ServiceComponent services={obje} setReturnService={setReturnService} />}
          {step === 1 && <TimeAndDate setReturnDate={setReturnDate} times={selectedTimes} live={true}/>}
          {step === 3 && (
            <>
              <ContactForm
                time={returnDate}
                service={returnService}
                onFormSubmit={handleFormSubmit}
                formData={selectedOption === 'forOwn' ? formData1 : formData2}
                onOptionSelect={handleOptionChange}
              />
            </>
          )}
          <div className='flex items-center justify-center buttonArea'>
            {step > 1 && (
              <div className="nextStep flex items-center justify-center m-3 mb-5">
                <button onClick={handleBack} className="bg-backButtonColor rounded-3xl flex items-center justify-center w-44 buttons" >
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
                  <button type='submit' onClick={handleFinish} className="bg-buttonColor rounded-3xl flex items-center justify-center w-44 buttons">
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