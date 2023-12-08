import { useState } from 'react';
import Calendar from 'react-calendar';
import "../style/calender.css"

const ValuePiece = Date | null;

const Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarBox({ selectedDate, onDateChange }) { //güne tıkladığımuzda değeri geri döndürüyor
    return (
      <div>
        <Calendar minDate={new Date()} onClickDay={(value) => onDateChange(value)} onChange={onDateChange} value={selectedDate} />         
      </div>
    );
  }

export default CalendarBox
