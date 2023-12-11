import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {   //eklediğimiz zamanları sessionStorage da saklamamızı sağlayan kod
  const [selectedTimes, setSelectedTimes] = useState(() => {
    const storedTimes = sessionStorage.getItem('selectedTimes');
    return storedTimes ? JSON.parse(storedTimes) : [];
  });

  const addSelectedTime = (dateTimeObject) => {
    setSelectedTimes((prevTimes) => [...prevTimes, dateTimeObject]);
  };

  useEffect(() => {
    sessionStorage.setItem('selectedTimes', JSON.stringify(selectedTimes));
  }, [selectedTimes]);

  return (
    <AppointmentContext.Provider value={{ selectedTimes, addSelectedTime }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {  // times diğer componentlerde kullanmamızı sağlayan fonksiyon
  return useContext(AppointmentContext);
};
