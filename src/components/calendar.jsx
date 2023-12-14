import Calendar from 'react-calendar';
import "../style/calender.css"


function CalendarBox({ selectedDate, onDateChange }) { //güne tıkladığımuzda değeri geri döndürüyor
    return (
      <div className='max-[768px]:p-[10px]'>
        <Calendar minDate={new Date()} onClickDay={(value) => onDateChange(value)} onChange={onDateChange} value={selectedDate} />         
      </div>
    );
  }

export default CalendarBox
