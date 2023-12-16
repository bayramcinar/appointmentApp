import serviceImage from '../images/person.jpg';
import "../style/appointmentView.css"
import '../style/appointmentView.css';

function AppointmentView({img,serviceProviderName,serviceProviderJob,service,date,time,language,price,forWho,notes,isOpen,onClose,show,confirmButton,firstName,lastName,gender,birthday}) {
    const modalClass = isOpen  ? 'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50'
    : 'hidden';

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            console.log(31)
            onClose();
        }
      };
  return (
    <>
    <div className={modalClass} onClick={handleOverlayClick}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative w-[430px] max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown">
          <div className="flex items-center justify-center relative">
            <div className='titleModal m-3'>
                <h1 className='text-center text-xl mr-auto ml-auto w-full mb-0'>Online Randevu Özeti</h1> 
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute right-1">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>

            <div className='serviceProviderArea w-auto flex m-3'>
                <div className='profileImg w-1/4 bg-cover h-[100px]'>
                    <img src={serviceImage} alt='' className='p-[5px] rounded-2xl w-full object-cover h-full'/>
                </div>
                <div className='detailInfos w-3/4 ml-[8px] flex flex-col justify-center'>
                    <div className='nameArea'>
                        <h2 className=' text-left text-base font-semibold'>{serviceProviderName}</h2>
                    </div>
                    <div className='jobArea'>
                        <h3 className=' text-left text-base font-normal'>{serviceProviderJob}</h3>
                    </div>
                    <div className='serviceType'>
                        <h2 className='text-sm font-semibold'>({service})</h2>
                    </div>
                    <div className='forWho flex'>
                        <i class="fa-solid fa-circle mt-[4px] text-[15px] text-callNowButtonColor"></i>
                        <h2 className='text-[15px] font-bold ml-2'>{forWho} İçin</h2>
                    </div>
                </div>
            </div>
            <div className='m-3'>
                <div className='appointmentDetailsArea flex'>
                    <div className='dateArea mr-5'>
                        <div className='textLogoArea flex'>
                            <i class="fa-solid fa-calendar text-callNowButtonColor flex items-center justify-center"></i>
                            <h5 className='text-sm font-semibold ml-[8px] mt-auto mb-auto text-center'>Tarih</h5>
                        </div>
                        <div className='appointmentDate mt-[5px]'>
                            <h2 className='text-xs text-center'>{date}</h2>
                        </div>
                    </div>
                    <div className='timeArea mr-5'>
                        <div className='textLogoArea flex'>
                            <i class="fa-solid fa-clock text-callNowButtonColor flex items-center justify-center"></i>
                            <h5 className='text-sm font-semibold ml-[8px] mt-auto mb-auto text-center'>Saat</h5>
                        </div>
                        <div className='appointmentTime mt-[5px]'>
                            <h2 className='text-xs text-center'>{time}</h2>
                        </div>
                    </div>
                    <div className='languageArea mr-5'>
                        <div className='textLogoArea flex'>
                            <i class="fa-solid fa-earth-americas text-callNowButtonColor flex items-center justify-center"></i>
                            <h5 className='text-sm font-semibold ml-[8px] mt-auto mb-auto text-center'>Dil</h5>
                        </div>
                        <div className='appointmentLanguage mt-[5px]'>
                            <h2 className='text-xs text-center'>{language}</h2>
                        </div>
                    </div>
                    <div className='moneyArea mr-5'>
                        <div className='textLogoArea flex'>
                            <i class="fa-regular fa-money-bill-1 text-callNowButtonColor flex items-center justify-center"></i>
                            <h5 className='text-sm font-semibold ml-[8px] mt-auto mb-auto text-center'>Ücret/Dakika</h5>
                        </div>
                        <div className='appointmentLanguage mt-[5px]'>
                            <h2 className='text-xs text-center'>{price} TL / DK</h2>
                        </div>
                    </div>
                </div>
                <div className='appointmentNotes'>
                {forWho === "Başkası" &&
                    <div className='forSomeone flex mt-3'>
                                    <div className='generalNameAreaSomeOne mr-5'>
                                        <div className='nameAreaSomeone flex'>
                                            <i class="fa-solid fa-user text-callNowButtonColor flex items-center justify-center"></i>
                                            <h2 className='text-sm font-bold ml-[8px] text-center' >İsim Soyisim</h2>
                                        </div>
                                        <div>
                                            <h2 className='text-sm text-center'>{firstName} {lastName}</h2>
                                        </div>
                                    </div>
                                    <div className='generalGenderAreaSomeOne mr-5'>
                                        <div className='genderAreaSomeone flex'>
                                            <i class="fa-solid fa-venus-mars text-callNowButtonColor flex items-center justify-center"></i>
                                            <h2 className='text-sm font-bold ml-[8px] text-center'>Cinsiyet</h2>
                                        </div>
                                        <div>
                                            <h2 className='text-sm text-center'>{gender}</h2>
                                        </div>
                                    </div>
                                    <div className='generalGenderAreaSomeOne mr-5'>
                                        <div className='birthdayAreaSomeone flex'>
                                            <i class="fa-solid fa-cake-candles text-callNowButtonColor flex items-center justify-center"></i>
                                            <h2 className='text-base font-bold ml-[8px] text-center'>Doğum Tarihi</h2>
                                        </div>
                                        <div>
                                            <h2 className='text-sm text-center'>{birthday}</h2>
                                        </div>
                                    </div>
                    </div>
                }
                <div className='notesArea border-2 border-callNowButtonColor rounded-xl'>
                    <div className='p-3'>
                        <div className='flex'>
                            <i className="fa-solid fa-book text-xl text-callNowButtonColor"></i>
                                <h2 className="text-xl ml-2 text-callNowButtonColor">Notlar</h2>
                        </div>
                        <p className='text-sm'>{notes}</p>
                    </div>
                </div>
                </div>
            </div>
            <div className='confirmButtonArea'>
                <button onClick={confirmButton} className='bg-callNowButtonColor p-2 w-full text-white rounded-xl text-lg'>Onayla</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AppointmentView;