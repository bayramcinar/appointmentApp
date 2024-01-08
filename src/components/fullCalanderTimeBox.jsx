import React from "react";

function FullCalanderTimeBox({ time, date, active, duration }) {
  const durationMinutes = parseInt(duration, 10);
  const [hours, minutes] = time.split(":").map(Number);
  const endHours = Math.floor((minutes + durationMinutes) / 60);
  const endMinutes = (minutes + durationMinutes) % 60;
  const endTime = `${hours + endHours}:${endMinutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <div
        className={`timeBox w-[135px] max-[768px]:w-[115px] m-3 ${
          active ? "bg-royalPurple" : "bg-stepBorder1"
        } rounded-3xl mb-[5px] p-[2px] py-[5px] max-[768px]:m-[5px]`}
      >
        <>
          <h4 className="text-sm text-text p-1 pb-0 text-center">
            {time} - {endTime}
          </h4>
        </>
      </div>
    </div>
  );
}

export default FullCalanderTimeBox;
