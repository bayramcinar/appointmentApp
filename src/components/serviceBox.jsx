import React from 'react';

function ServiceBox({ title, selectedService, onServiceClick,image }) {

  const handleServiceClick = () => {                  //seçtiğimiz servisi geri döndürüyor ve background renk ayarlamalarını yapıyor
    if (onServiceClick && typeof onServiceClick === 'function') {
      onServiceClick(title);
    }
  };

  const isSelected = selectedService === title;   // seçtiğimiz service i tuttuğumuz değişken

  return (
    <div>
      <div className='service max-[768px]:m-[13px] cursor-pointer flex rounded-2xl w-[14.5rem] max-[768px]:w-[16rem] m-[2px]' onClick={handleServiceClick}>
        {/* <div className={`imgAreaService max-[768px]:hidden p-3 ${isSelected ? 'bg-white border-2 border-buttonColor border-r-0' : 'bg-buttonColor'} rounded-s-2xl w-20 flex items-center justify-center`}>
          <img src={image} className='w-10' alt='' />
        </div> */}
        <div className={`textArea md:rounded-r-2xl bg-buttonColor ${isSelected ? 'bg-white border-2 border-buttonColor border-l-0' : 'bg-buttonColor'} w-80 p-2 rounded-2xl flex items-center justify-center max-[768px]:rounded-2xl`}>
          <h3 className={`text-sm max-[768px]:text-base ${isSelected ? 'text-buttonColor' : 'text-white'} text-center`}>{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
