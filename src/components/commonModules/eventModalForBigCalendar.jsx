import React from "react";
import pp from "../../images/pp.png";
import moment from "moment-timezone";

const EventModalForCalendar = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }
  const formatTimeInterval = (start, end) => {
    const formattedStart = moment(start).format("DD.MM.YYYY HH:mm");
    const formattedEnd = moment(end).format("HH:mm");

    return `${formattedStart} - ${formattedEnd}`;
  };
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";
  return (
    <div className={modalClass} onClick={onClose}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative w-[430px] max-[768px]:w-[375px] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown">
          <div className="flex items-center justify-center relative">
            <div className="titleModal m-3">
              <h1 className="text-center text-xl mr-auto ml-auto w-full mb-0">
                Randevu Detayları
              </h1>
            </div>
            <div
              className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
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
          <div>
            <div className="m-3">
              <div className="appointmentNotes">
                <div className="flex">
                  <div className="imgArea w-[120px] p-2">
                    <img src={pp} alt="" />
                  </div>
                  <div className="forSomeone flex mt-3 flex-wrap items-center justify-center">
                    <div className="generalNameAreaSomeOne mr-5">
                      <div className="nameAreaSomeone flex">
                        <i class="fa-solid fa-user text-premiumPurple flex items-center justify-center"></i>
                        <h2 className="text-sm font-bold ml-[8px] text-center">
                          İsim Soyisim
                        </h2>
                      </div>
                      <div>
                        <h1 className="text-sm">{event.name}</h1>
                      </div>
                    </div>
                    <div className="generalGenderAreaSomeOne mr-5">
                      <div className="genderAreaSomeone flex">
                        <i class="fa-solid fa-venus-mars text-premiumPurple flex items-center justify-center"></i>
                        <h2 className="text-sm font-bold ml-[8px] text-center">
                          Cinsiyet
                        </h2>
                      </div>
                      <div>
                        <h2 className="text-sm text-center">{event.gender}</h2>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="generalBirthdayAreaSomeOne mr-5 mt-3">
                        <div className="birthdayAreaSomeone flex">
                          <i class="fa-solid fa-cake-candles text-premiumPurple flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Doğum Tarihi
                          </h2>
                        </div>
                        <div>
                          <h2 className="text-sm text-center">
                            {event.birthday}
                          </h2>
                        </div>
                      </div>
                      <div className="generalAppointmentTime mr-5 mt-3">
                        <div className="appointmentTimeArea flex">
                          <i class="fa-regular fa-calendar-check text-premiumPurple flex items-center justify-center"></i>
                          <h2 className="text-sm font-bold ml-[8px] text-center">
                            Randevu Tarihi
                          </h2>
                        </div>
                        <div className="flex items-center justify-center">
                          <h2 className="text-sm text-center w-[110px]">
                            {formatTimeInterval(event.start, event.end)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full mt-5 justify-around">
                  <div className="serviceNameArea">
                    <div className="service flex">
                      <i class="fa-solid fa-user text-premiumPurple flex items-center justify-center"></i>
                      <h2 className="text-sm font-bold ml-[8px] text-center">
                        Hizmet
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-sm w-[100px]">{event.title}</h1>
                    </div>
                  </div>
                  <div className="languageArea">
                    <div className="textLogoArea flex">
                      <i class="fa-solid fa-earth-americas text-premiumPurple flex items-center justify-center"></i>
                      <h5 className="text-sm font-semibold ml-[8px] mt-auto mb-auto text-center">
                        Dil
                      </h5>
                    </div>
                    <div className="appointmentLanguage">
                      <h1 className="text-sm">{event.language}</h1>
                    </div>
                  </div>
                  <div className="generalAppointmentNumber">
                    <div className="birthdayAreaSomeone flex">
                      <i class="fa-solid fa-calendar-check text-premiumPurple flex items-center justify-center"></i>
                      <h2 className="text-sm font-bold ml-[8px] text-center">
                        Randevu Numarası
                      </h2>
                    </div>
                    <div>
                      <h2 className="text-sm text-center">
                        {event.appointmentNumber}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="notesArea mt-[8px] border-2 border-premiumPurple rounded-xl">
                  <div className="p-3">
                    <div className="flex">
                      <i className="fa-solid fa-book text-xl text-premiumPurple"></i>
                      <h2 className="text-xl ml-2 text-premiumPurple">
                        Notlar
                      </h2>
                    </div>
                    <p className="text-sm">{event.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModalForCalendar;
