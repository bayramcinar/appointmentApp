import React, { useState } from 'react';
import Steps from './steps';
import TimeAndDate from './timeAndDate';
import ContactForm from './contactInfo';
import ServiceComponent from './serviceComponent';
import serviceImage from '../images/service.png';
import FinishScreen from './finishScreen';
import "../style/appointmentComponent.css"

function AppointmentComponent() {
  const [step, setStep] = useState(1);
  const [returnDate, setReturnDate] = useState("");
  const [returnService, setReturnService] = useState("");
  const [showFinishScreen, setShowFinishScreen] = useState(false);

  const [selectedOption, setSelectedOption] = useState('forOwn');

  const handleNext = () => {
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

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

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

  const times = [ //örnek time datası
    {
      time:"09:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"10:00",
      date: "2023-12-7",
      active: false
    },
    {
      time:"11:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"12:00",
      date: "2023-12-7",
      active: false
    },
    {
      time:"13:00",
      date: "2023-12-7",
      active: false
    },
    {
      time:"14:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"15:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"16:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"17:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"18:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"19:00",
      date: "2023-12-7",
      active: true
    },
    {
      time:"09:00",
      date: "2023-12-8",
      active: false
    },
    {
      time:"10:00",
      date: "2023-12-8",
      active: false
    },
    {
      time:"11:00",
      date: "2023-12-8",
      active: true
    },
    {
      time:"12:00",
      date: "2023-12-8",
      active: false
    },
    {
      time:"13:00",
      date: "2023-12-8",
      active: false
    },
    {
      time:"14:00",
      date: "2023-12-8",
      active: true
    },
    {
      time:"15:00",
      date: "2023-12-8",
      active: true
    },
    {
      time:"16:00",
      date: "2023-12-8",
      active: true
    },
  ];

  const handleFinish = () => {
    if (step === 3) {
      setShowFinishScreen(true);
      handleFormSubmit(selectedOption === 'forOwn' ? formData1 : formData2);
    }
  };

  const handleOptionChange = (option) => {
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
    if (selectedOption === 'forOwn') {
      setFormData1(formData);
    } else {
      setFormData2(formData);
    }
    console.log('Form Data from AppointmentComponent:', formData);
  };

  return (
    <>
      {showFinishScreen && <FinishScreen time={returnDate} service={returnService} name={formData2.firstName} surname={formData2.lastName} />}
      {!showFinishScreen && (
        <div className='bg-dayComponentBg generalDiv'>
          <Steps active={step} />
          {step === 2 && <ServiceComponent services={obje} setReturnService={setReturnService} />}
          {step === 1 && <TimeAndDate setReturnDate={setReturnDate} times={times}/>}
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