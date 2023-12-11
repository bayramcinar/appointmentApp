import React from 'react'
import {Link} from "react-router-dom"

function FinishScreen({time,service,name,job,surname}) {
  return (
    <div className='animate__animated animate__fadeInLeft'>
      <div className='finishScreen w-96 bg-dayComponentBg p-5  ml-auto mr-auto mt-8'>
            <div className="title p-4">
                <h2 className="text-buttonColor text-center text-3xl font-bold p-3">Randevu Bilgileri</h2>
            </div>
            <div className='userInfo flex items-center justify-center'>
                <h2 className='text-buttonColor text-center text-lg m-2 font-semibold'>{name} {surname}</h2>
                <h2 className='text-appoinmentBox text-center text-xl m-2 font-semibold'>(Öğrenci)</h2>
            </div>
            <div className='appointmentInfo p-4'>
                <h2 className='text-buttonColor text-center text-lg m-2 font-semibold'>{time}</h2>
                <h2 className='text-appoinmentBox text-center text-xl m-2 font-semibold'>{service}</h2>
            </div>
            <div className='m-3'>
                <div className='IconArea w-full flex flex-col items-center justify-center'>
                    <i class="fa-solid fa-calendar-check text-buttonColor text-7xl text-center"></i>
                    <h1 className="text-buttonColor text-center text-3xl font-bold p-3">Teşekkürler !</h1>
                    <h2 className='text-stepBorder1 text-center text-xl font-semibold p-4'>
                        Sizinle buluşmayı büyük bir heyecan ile bekliyoruz.
                        <Link className='text-buttonColor text-xl font-semibold' to="/myAppointments"> Randevularım </Link>
                        bölümünden randevunuzun detaylarını inceleyebilir ve yönetebilirsiniz. 
                    </h2>
                </div>
            </div>
            <div className="nextStep flex items-center justify-center m-3 mb-5">
              <button className="bg-buttonColor rounded-3xl flex items-center justify-center w-44">
                <h4 className="text-text p-2 text-lg tracking-wider">Kapat <i class="fa-solid fa-xmark ml-16"></i></h4>
              </button>
            </div>
      </div>
    </div>
  )
}

export default FinishScreen
