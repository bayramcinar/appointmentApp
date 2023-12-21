import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const events = [
  {
    title: "Fitness Görüşmesi",
    start: new Date("2023-12-25T10:30:00.000Z"),
  },
  {
    title: "İlişki Terapisi",
    start: new Date("2023-12-25T13:00:00.000Z"),
  },
  {
    title: "Depresyon",
    start: new Date("2023-12-25T15:30:00.000Z"),
  },
  {
    title: "Uyum Bozuklukları",
    start: new Date("2023-12-25T20:30:00.000Z"),
  },
];

console.log(new Date());

function FullCalendarComponent() {
  return (
    <div className=" w-[950px] ">
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default FullCalendarComponent;
