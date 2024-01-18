import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { tr } from "date-fns/locale";

function SetDateAndTime({ onDateChange }) {
  const currentDate = new Date();
  // RANDEVU SAATİ EKLEME YERİNDEKİ TAKVİM COMPONENTİ
  const [state, setState] = useState([
    {
      startDate: currentDate,
      endDate: currentDate,
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    //BİRDEN ÇOK TARİH SEÇTİĞİMİZDE ÇALIŞAN FONKSİYON (SADECE İLK VE SONU ALIYOR)
    const startDateString = formatDate(item.selection.startDate);
    const endDateString = item.selection.endDate
      ? formatDate(item.selection.endDate)
      : null;

    const dateArray = getDates(startDateString, endDateString);
    onDateChange(dateArray);

    setState([item.selection]);
  };

  const getDates = (startDate, endDate) => {
    //SEÇLEN TARİHLER ARASINDAKİ (İLK VE SON TARİH) ARASINDAKİ TARİHLERİ BULUP ARRAY E ATIYOR
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const formattedDates = dates.map((date) => formatDate(date));

    return formattedDates;
  };

  const formatDate = (date) => {
    //DATE İ YEAR-MONTH-DAY FORMATINA ÇEVİRİYOR
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <DateRange
        locale={tr}
        minDate={currentDate}
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
        dateDisplayFormat="dd.MM.yyyy"
      />
    </>
  );
}

export default SetDateAndTime;
