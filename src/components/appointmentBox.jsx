import React from "react";
import Swal from "sweetalert2";

function AppointmentBox({
  time,
  date,
  selectedTime,
  onTimeClick,
  active,
  duration,
  isMobile,
}) {
  const handleTimeClick = () => {
    //seçtiğimiz saati geri döndürüyor ve background renk ayarlamarını yapıyor
    if (active) {
      if (onTimeClick && typeof onTimeClick === "function") {
        onTimeClick(time, date);
      }
    } else {
      Swal.fire({
        title: "Hata !",
        text: "Bu saat başkası tarafından alındı.",
        icon: "error",
        confirmButtonText: "Kapat",
      });
    }
  };

  const isSelected = selectedTime === time; // seçtiğimiz saati atadığımız değişken

  return (
    <div>
      <div
        className={`timeBox w-[145px] max-[768px]:w-[115px] ${
          isSelected ? "bg-red-600" : "bg-appoinmentBox"
        } ${
          active ? "bg-appoinmentBox" : "bg-stepBorder1"
        }  rounded-3xl mb-[5px] p-[2px] max-[768px]:m-[5px] cursor-pointer`}
        onClick={handleTimeClick}
      >
        {isMobile === true && (
          <>
            <h4 className="text-sm text-text p-1 pb-0 text-center">{time}</h4>
          </>
        )}
        {isMobile === false && (
          <>
            <h4 className="text-sm text-text p-1 text-center">{time}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentBox;
