import React from 'react';
import "../style/serviceBox.css"

function ServiceBox({ title, selectedService, onServiceClick,image }) {

  const handleServiceClick = () => {                  //seçtiğimiz servisi geri döndürüyor ve background renk ayarlamalarını yapıyor
    if (onServiceClick && typeof onServiceClick === 'function') {
      onServiceClick(title);
    }
  };

  const isSelected = selectedService === title;   // seçtiğimiz service i tuttuğumuz değişken

  return (
    <div>
      <div className='service cursor-pointer flex rounded-2xl w-84 m-2' onClick={handleServiceClick}>
        <div className={`imgAreaService p-3 ${isSelected ? 'bg-white border-2 border-buttonColor border-r-0' : 'bg-buttonColor'} rounded-s-2xl w-20 flex items-center justify-center`}>
          <img src={image} className='w-10' alt='' />
        </div>
        <div className={`textArea bg-buttonColor ${isSelected ? 'bg-white border-2 border-buttonColor border-l-0' : 'bg-buttonColor'} w-64 p-2 rounded-e-2xl flex items-center justify-center`}>
          <h3 className={`text-mb ${isSelected ? 'text-buttonColor' : 'text-white'} text-center`}>{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
