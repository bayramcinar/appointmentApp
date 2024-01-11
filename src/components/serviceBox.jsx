import React from "react";

function ServiceBox({ title, selectedService, onServiceClick, image }) {
  const handleServiceClick = () => {
    //seçtiğimiz servisi geri döndürüyor ve background renk ayarlamalarını yapıyor
    if (onServiceClick && typeof onServiceClick === "function") {
      onServiceClick(title);
    }
  };

  const isSelected = selectedService === title; // seçtiğimiz service i tuttuğumuz değişken

  return (
    <div>
      <div
        className="service max-[768px]:m-[13px] cursor-pointer flex rounded-2xl w-[14.5rem] max-[768px]:w-[16rem] m-[7px]"
        onClick={handleServiceClick}
      >
        <div
          className={`textArea md:rounded-r-3xl  ${
            isSelected
              ? "bg-purpleBg border-2 border-premiumPurple "
              : "bg-premiumPurple"
          } w-80 p-2 rounded-3xl flex items-center justify-center max-[768px]:rounded-2xl`}
        >
          <h3
            className={`text-sm max-[768px]:text-base ${
              isSelected ? "text-premiumPurple" : "text-white"
            } text-center`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
