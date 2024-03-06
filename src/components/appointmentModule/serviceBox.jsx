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
        className="service max-[768px]:m-[13px] cursor-pointer flex rounded-lg w-[14.5rem] max-[768px]:w-[16rem] m-[7px]"
        onClick={handleServiceClick}
      >
        <div
          className={`textArea md:rounded-r-lg  ${
            isSelected
              ? " bg-premiumOrange transition duration-500"
              : " bg-gray-100 transition duration-500"
          } w-80 p-2 rounded-lg flex hover:bg-premiumOrange hover:text-white text-gray-500 items-center justify-center`}
        >
          <h3
            className={`text-sm max-[768px]:text-base  ${
              isSelected ? "text-gray-100" : " "
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
