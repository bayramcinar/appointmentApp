import React, { useState } from 'react';

function ContactForm({ onFormSubmit, formData, onOptionSelect,service,time }) {
  const [formData1, setFormData1] = useState({  //forOwn formu
    kimIçin :"kendim",
    time:time,
    service:service,
    notes: '',
  });

  const [isOwn, setIsOwn] = useState(true);  // kimin için olduğunu tuttuğumuz değişken

  const [formData2, setFormData2] = useState({  //forSomeone formu
    kimIçin :"başkası",
    time:time,
    service:service,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    notes: '',
    gender: '',
  });

  const handleChange = (e) => {       //formdaki değişiklikleri algılayan fonksiyon
    const { name, value } = e.target;
    if (isOwn === true) {
      setFormData1((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      onFormSubmit({ ...formData1, [name]: value });
    } else {
      setFormData2((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      onFormSubmit({ ...formData2, [name]: value });
    }
  };
  
  

  const handleOptionChange = (option) => {  // kendim için ve başkası için değişkenleri arasında geçişi sağlayan
    setIsOwn(option);
    onOptionSelect(option);
  };

  return (
    <div className='contactComponent animate__animated animate__fadeInLeft lg:w-[48rem] lg:h-auto md:w-[24rem] sm:w-[24rem] md:h-auto sm:h-auto'>
      <div className='title'>
        <h2 className='text-buttonColor text-center text-3xl font-bold p-3'>Ön Bilgi Formu</h2>
      </div>
      <div className='flex flex-col items-center justify-center h-auto'>
        <div className='choosePerson'>
          <button
            onClick={() => handleOptionChange(true)}
            className={`bg-appoinmentBox p-2 text-white tex-sm rounded-3xl m-3 px-7 ${
              isOwn === true ? 'selected' : ''
            } ${
              isOwn === true ? 'bg-appoinmentBox' : 'bg-backButtonColor'
            }`}
          >
            Kendim İçin
          </button>
          <button
            onClick={() => handleOptionChange(false)}
            className={`bg-appoinmentBox p-2 text-white tex-sm rounded-3xl m-3 px-7 ${
              isOwn === false ? 'selected' : ''
            } ${
              isOwn === false ? 'bg-appoinmentBox' : 'bg-backButtonColor'
            }`}
          >
            Başkası İçin
          </button>
        </div>
        {isOwn === true && (
          <div className='forOwn'>
            <form onSubmit={onFormSubmit} className='flex flex-col items-center justify-center'>
              <div className='m-3'>
                <textarea
                  rows='4'
                  cols='50'
                  className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                  placeholder='Notlar (Size daha iyi bir hizmet verebilmemiz için lütfen almak istediğiniz hizmetin içeriğini birkaç cümleyle açıklayınız.)'
                  name='notes'
                  value={formData1.notes}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        )}
        {isOwn === false && (
          <div className='forSomeOne'>
            <form onSubmit={onFormSubmit} className='flex flex-col items-center justify-center'>
              <div className='m-3'>
                <input
                  className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                  type='text'
                  placeholder='İsim'
                  name='firstName'
                  value={formData2.firstName}
                  onChange={handleChange}
                />
              </div> 
              <div className='m-3'>
                <input
                  className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                  type='text'
                  placeholder='Soyisim'
                  name='lastName'
                  value={formData2.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='m-3'>
                <input
                  id='birthdaypicker'
                  type="date"
                  className={`before:bg-gray-300 before:content-'Doğum Tarihi:' before:mr-1 before:text-gray-600 p-3 focus:border-none outline-none text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem] `}
                  name='dateOfBirth'
                  value={formData2.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className='m-3'>
                <textarea
                  rows='4'
                  cols='50'
                  className='p-3 focus:border-none outline-none lg:w-[30rem] max-[768px]:w-[22rem]'
                  placeholder='Notlar (Size daha iyi bir hizmet verebilmemiz için lütfen almak istediğiniz hizmetin içeriğini birkaç cümleyle açıklayınız.)'
                  name='notes'
                  value={formData2.notes}
                  onChange={handleChange}
                />
              </div>
              <div className='m-3 flex w-44'>
                <input
                  type="radio"
                  className='text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem]'
                  id="erkek"
                  name="gender"
                  value="erkek"
                  onChange={handleChange}
                />
                <label htmlFor="erkek" className='text-stepBorder1'>Erkek</label>
                <input
                  type="radio"
                  className='text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem]'
                  id="kadın"
                  name="gender"
                  value="kadın"
                  onChange={handleChange}
                />
                <label htmlFor="kadın" className='text-stepBorder1'>Kadın</label>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;