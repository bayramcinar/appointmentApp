import React from "react";
import pp from "../../images/pp.png";
function CardMobile({
  appointmentNumber,
  name,
  service,
  status,
  date,
  time,
  remainingTime,
  requestStatus,
  showDetails,
  deleteFunction,
  isPastAppointment,
  isCancelDisabled,
  isCancelled,
  joinFunction,
  formEntry,
  remainingHours,
  onAccept,
  joinMeet,
}) {
  return (
    <div className="bg-[#fdfdfd] border-2 border-gray-300 rounded-xl w-[300px] m-4">
      <div className="upSide flex border-b-2 border-gray-300 px-4 py-2 items-center justify-start">
        <h1 className="text-sm font-semibold text-gray-600">{name} - </h1>
        <h1 className="text-sm font-semibold text-gray-600 ml-1"> {service}</h1>
      </div>
      <div className="downSide">
        <div className="m-1">
          <div className="dateAndTimeArea text-gray-500 pb-0 p-1 flex">
            <i class="fa-solid fa-clock text-gray-500 p-2 flex items-center justify-center"></i>
            <div>
              <h1 className="text-xs text-gray-500 p-1 pb-0">Tarih & Zaman</h1>
              <h1 className="text-sm text-gray-700 p-1">
                {date} | {time}
              </h1>
            </div>
          </div>
          <div className="flex">
            {" "}
            <div className="appointmentStatus text-gray-500 p-1 flex">
              <i class="fa-solid fa-calendar-days text-gray-500 p-2 flex items-center justify-center"></i>
              <div>
                <h1 className="text-xs text-gray-500 p-1 pb-0">
                  Randevu Durumu
                </h1>
                <div className="status flex items-center justify-start ">
                  {isCancelled ? (
                    <div className="flex justify-start items-center  ">
                      <div className="p-1 flex">
                        <i className="fa-solid fa-circle text-coral text-[0.5rem] text-center flex items-center justify-center mx-1"></i>
                        <h1 className="text-center text-sm text-coral">
                          İptal Edildi
                        </h1>
                      </div>
                    </div>
                  ) : isPastAppointment ? (
                    <div className="flex items-center justify-start ">
                      <div className="flex p-1">
                        <i className="fa-solid fa-circle text-gray-500 text-[0.5rem] flex items-center justify-center mx-1"></i>
                        <h1 className="text-center text-sm">Tamamlandı</h1>
                      </div>
                    </div>
                  ) : (
                    <>
                      {status === false && requestStatus === "false" && (
                        <div className="flex justify-start items-center ">
                          <div className="p-1 flex">
                            <i className="fa-solid fa-circle text-orangeTable text-[0.5rem] text-center flex items-center justify-center mx-1"></i>
                            <h1 className="text-center text-sm text-orangeTable">
                              İşlem Bekleniyor
                            </h1>
                          </div>
                        </div>
                      )}
                      {status === true && (
                        <div className="flex items-center justify-start ">
                          <div className="flex p-1">
                            <i className="fa-solid fa-circle text-greenStatus text-[0.5rem] flex items-center justify-center mx-1"></i>
                            <h1 className="text-center text-sm text-greenStatus">
                              Aktif
                            </h1>
                          </div>
                        </div>
                      )}
                      {requestStatus === "true" && status === false && (
                        <div className="flex justify-start items-center  ">
                          <div className="p-[2px] flex">
                            <i className="fa-solid fa-circle text-orangeTable text-[0.5rem] text-center flex items-center justify-center mx-1"></i>
                            <h1 className="text-center text-sm text-orangeTable">
                              Onay Bekleniyor
                            </h1>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="dateAndTimeArea text-gray-500 pb-0 p-1 pl-0 flex">
              <i class="fa-solid fa-hourglass-half text-gray-500 p-2 flex items-center justify-center"></i>
              <div>
                <h1 className="text-xs text-gray-500 p-1 pb-0">Kalan Süre</h1>
                <h1 className="text-sm text-gray-700 p-1">{remainingTime}</h1>
              </div>
            </div>
          </div>
          <div className="cardButtons flex items-center justify-center my-2">
            {!isCancelled && !isPastAppointment && status && (
              <>
                <button
                  onClick={() => deleteFunction()}
                  className="bg-lightRed2 text-red-500 py-2 px-1 text-xs  rounded-lg mx-1 w-full"
                >
                  İptal Et
                </button>
                <button
                  onClick={() =>
                    joinMeet(formEntry, remainingTime.remainingHours)
                  }
                  className=" bg-lightGreen2 text-greenStatus py-2 px-1 text-xs rounded-lg mx-1 w-full"
                >
                  Katıl
                </button>
              </>
            )}
            {status === false && !isCancelled && !isPastAppointment && (
              <>
                <button
                  onClick={() => onAccept(formEntry.time)}
                  className=" bg-lightGreen2 text-greenStatus py-2 px-1  text-xs rounded-lg mx-1 w-full"
                >
                  İşleme Al
                </button>
                <button
                  onClick={() => deleteFunction()}
                  className="bg-lightRed2 text-red-500 py-2 px-1 text-xs  rounded-lg mx-1 w-full"
                >
                  Reddet
                </button>
              </>
            )}
            <button
              onClick={() => showDetails()}
              className="bg-lightOrange3 text-premiumPurple py-2 px-1 text-xs  rounded-lg mx-1 w-full"
            >
              Mesaj
            </button>
            <button
              onClick={() => showDetails()}
              className="bg-lightGray2 text-gray-500 py-2 px-1 text-xs  rounded-lg mx-1 w-full"
            >
              Detaylar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMobile;
