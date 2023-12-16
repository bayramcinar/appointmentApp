import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import "../style/contactInfo.css"

function ContactForm({ onFormSubmit, onOptionSelect, service, time, languages }) {
  const [isOwn, setIsOwn] = useState(true);

  const handleOptionChange = (option) => {
    setIsOwn(option);
    onOptionSelect(option);
  };

  return (
    <div className='contactComponent animate__animated animate__fadeInLeft lg:w-[35rem] lg:h-auto md:w-[24rem] sm:w-[24rem] md:h-auto sm:h-auto'>
      <div className='title'>
        <h2 className='text-buttonColor text-center text-3xl font-bold p-3'>Ön Bilgi Formu</h2>
      </div>
      <div className='flex flex-col items-center justify-center h-auto'>
        <div className='choosePerson'>
          <button
            onClick={() => handleOptionChange(true)}
            className={`bg-appoinmentBox p-2 text-white tex-sm rounded-3xl m-3 px-7 ${isOwn === true ? 'selected' : ''} ${isOwn === true ? 'bg-appoinmentBox' : 'bg-backButtonColor'}`}
          >
            Kendim İçin
          </button>
          <button
            onClick={() => handleOptionChange(false)}
            className={`bg-appoinmentBox p-2 text-white tex-sm rounded-3xl m-3 px-7 ${isOwn === false ? 'selected' : ''} ${isOwn === false ? 'bg-appoinmentBox' : 'bg-backButtonColor'}`}
          >
            Başkası İçin
          </button>
        </div>
        {isOwn === true && (
          <div className='forOwn'>
            <Formik
              initialValues={{
                kimIçin: 'kendim',
                time: time,
                service: service,
                notes: '',
                language: '', // New field for language selection
              }}
              onSubmit={onFormSubmit}
            >
              <Form id="myform" className='flex flex-col items-center justify-center'>
                <div className='m-3'>
                  <Field
                    as='textarea'
                    rows='4'
                    cols='50'
                    className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                    placeholder='Notlar (Size daha iyi bir hizmet verebilmemiz için lütfen almak istediğiniz hizmetin içeriğini birkaç cümleyle açıklayınız.)'
                    name='notes'
                  />
                </div>
                <div className='m-3 flex w-[17rem]'>
                  {languages.map((lang, index) => (
                    <React.Fragment key={index}>
                      <Field
                        type="radio"
                        className='text-stepBorder1 w-[25px]'
                        id={lang.language.toLowerCase()}
                        name="language"
                        value={lang.language}
                      />
                      <label htmlFor={lang.language.toLowerCase()} className='text-stepBorder1 flex mr-[3rem]' >
                        <img src={lang.flagImg} alt={lang.language} className='w-8 h-6 mr-2 inline-block' />
                        {lang.language}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </Form>
            </Formik>
          </div>
        )}
        {isOwn === false && (
          <div className='forSomeOne'>
            <Formik
              initialValues={{
                kimIçin: 'başkası',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                notes: '',
                gender: '',
                service: service,
                time: time,
                language: '', 
              }}
              onSubmit={onFormSubmit}
            >
              <Form id="myform" className='flex flex-col items-center justify-center'>
                <div className='m-3'>
                  <Field
                    className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                    type='text'
                    placeholder='İsim'
                    name='firstName'
                  />
                </div>
                <div className='m-3'>
                  <Field
                    className='lg:w-[30rem] max-[768px]:w-[22rem] p-3 focus:border-none outline-none'
                    type='text'
                    placeholder='Soyisim'
                    name='lastName'
                  />
                </div>
                <div className='m-3 flex w-44'>
                  <Field
                    type="radio"
                    className='text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem]'
                    id="erkek"
                    name="gender"
                    value="erkek"
                  />
                  <label htmlFor="erkek" className='text-stepBorder1'>Erkek</label>
                  <Field
                    type="radio"
                    className='text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem]'
                    id="kadın"
                    name="gender"
                    value="kadın"
                  />
                  <label htmlFor="kadın" className='text-stepBorder1'>Kadın</label>
                </div>
                <div className='m-3 relative birthDay'>
                  <Field
                    id='birthdaypicker'
                    type="date"
                    className={`before:bg-gray-300 before:content-'Doğum Tarihi:' before:mr-1 before:text-gray-600 p-3 focus:border-none outline-none text-stepBorder1 lg:w-[30rem] max-[768px]:w-[22rem] `}
                    name='dateOfBirth'
                  />
                </div>
                <div className='m-3'>
                  <Field
                    as='textarea'
                    rows='4'
                    cols='50'
                    className='p-3 focus:border-none outline-none lg:w-[30rem] max-[768px]:w-[22rem]'
                    placeholder='Notlar (Size daha iyi bir hizmet verebilmemiz için lütfen almak istediğiniz hizmetin içeriğini birkaç cümleyle açıklayınız.)'
                    name='notes'
                  />
                </div>
                
                <div className='m-3 flex w-[17rem]'>
                  {languages.map((lang, index) => (
                    <React.Fragment key={index}>
                      <Field
                        type="radio"
                        className='text-stepBorder1  w-[25px]'
                        id={lang.language.toLowerCase()}
                        name="language"
                        value={lang.language}
                      />
                      <label htmlFor={lang.language.toLowerCase()} className='text-stepBorder1 flex mr-[3rem]'>
                        <img src={lang.flagImg} alt={lang.language} className='w-8 h-6 mr-2 inline-block' />
                        {lang.language}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
