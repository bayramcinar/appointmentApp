import React from "react";
import pp from "../images/pp.png";

function AgendaCard({
  appointmentNumber,
  name,
  service,
  status,
  date,
  time,
  remainingTime,
  requestStatus,
  isPastAppointment,
  showDetails,
  deleteFunction,
  isCancelDisabled,
  isCancelled,
}) {
  const last12Hours = (remainingTime) => {
    try {
      const hourAndMin = remainingTime.split(" ");

      const hour = parseInt(hourAndMin[0]);
      const min = parseInt(hourAndMin[2]);

      const totalHours = hour + min / 60;

      const isLast12Hours = totalHours < 12;

      return isLast12Hours;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`card mx-auto flex w-[330px] border-2 ${
          status === true ? "border-green-500" : "border-lightOrange"
        }
        } rounded-2xl m-3`}
      >
        <div
          className={`numAndInfo w-4/12 flex-col flex items-center  ${
            status === true
              ? "border-green-500 bg-green-500"
              : "border-lightOrange bg-lightOrange"
          }
          } justify-center border-r-2  text-white rounded-s-[0.8rem]`}
        >
          <div className="appointmentNumber">
            <h1 className="text-[11px] text-center">{appointmentNumber}</h1>
          </div>
          <div className="flex items-center justify-center">
            <img src={pp} className="w-[30px] ml-[3px]" alt="" />
            <h1 className="text-[10px] text-center ml-[3px]">{name}</h1>
          </div>
        </div>
        <div className="service flex w-2/12 items-center justify-center border-r-2 border-stepBorder1">
          <h1 className="text-[10px] text-center">{service}</h1>
        </div>
        <div className="status flex flex-col w-2/12 items-center justify-center border-r-2 border-stepBorder1">
          <i
            className={`fa-solid fa-circle text-[10px] ${
              isCancelled ? "hidden" : isPastAppointment ? "hidden" : ""
            } ${
              status === false ? "text-coral flashing-text" : "text-green-500"
            }  flex items-center justify-center my-0.5`}
          ></i>
          <h1 className="text-[10px] text-center ">
            {isCancelled ? (
              <span className="text-red-500">Randevu İptal Edildi</span>
            ) : isPastAppointment ? (
              <span className="text-coral">Randevu Sonlandı</span>
            ) : (
              <>
                {status === true && "Aktif"}
                {status === false &&
                  requestStatus === "false" &&
                  "İşleme Alınması Bekleniyor"}
                {requestStatus === "true" &&
                  status === false &&
                  "Randevu Talebi Onay Bekleniyor"}
              </>
            )}
          </h1>
        </div>
        <div className="timeInfos w-4/12 border-r-2 border-stepBorder1">
          <div className="saatAraliği border-b-2  border-stepBorder1 flex flex-col items-center justify-center w-full">
            <h1 className="text-[11px] text-center w-min">{date}</h1>
            <h1 className="text-[11px] text-center">{time}</h1>
          </div>
          <div className="kalanSüre my-auto items-center justify-center">
            <h1
              className={`text-[11px] text-center mb-auto w-full py-[2px] pb-0 ${
                remainingTime === "Randevu Bitti"
                  ? "text-coral"
                  : last12Hours(remainingTime) === true
                  ? "text-white bg-green-500 border-green-500 border"
                  : ""
              }`}
            >
              {remainingTime.split(" ")[0] + " " + remainingTime.split(" ")[1]}
            </h1>
            <h1
              className={`text-[11px] text-center mb-auto w-full py-[2px] pt-0 ${
                remainingTime === "Randevu Bitti"
                  ? "text-coral"
                  : last12Hours(remainingTime) === true
                  ? "text-white bg-green-500 border-green-500 border"
                  : ""
              }`}
            >
              {remainingTime.split(" ")[2] + " " + remainingTime.split(" ")[3]}
            </h1>
          </div>
        </div>
        <div className="buttonsArea flex flex-col items-center justify-center">
          {isCancelled && (
            <h1 className="text-[11px] text-center p-1 pb-0">
              Randevu İptal Edildi
            </h1>
          )}
          {!isCancelled && (
            <>
              <div className="m-1">
                <button
                  onClick={() => deleteFunction()}
                  className={`p-[7px]
               ${
                 isCancelDisabled
                   ? "bg-gray-400 text-white cursor-not-allowed"
                   : "bg-coral text-white"
               } font-semibold rounded-xl text-xs `}
                >
                  İptal Et
                </button>
              </div>
            </>
          )}
          <div className="m-1">
            <button
              onClick={() => showDetails()}
              className="p-1 bg-premiumPurple text-white text-xs font-semibold rounded-lg w-full"
            >
              Detaylar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendaCard;
