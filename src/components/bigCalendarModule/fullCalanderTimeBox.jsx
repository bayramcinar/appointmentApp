import React from "react";

function FullCalanderTimeBox({ time, active, duration, bg }) {
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
        className={`timeBox w-[135px] max-[768px]:w-[90px] m-3 ${
          bg === "green"
            ? "bg-green-500"
            : bg === "orange"
            ? "bg-calanderAppointment"
            : bg === "red"
            ? "bg-coral"
            : bg === "gray"
            ? "bg-stepBorder1"
            : ""
        } rounded-3xl mb-[5px] p-[2px] py-[3px] max-[768px]:m-[3px]`}
      >
        <>
          <h4 className="text-xs lg:text-sm text-white p-1 text-center">
            {time} - {endTime}
          </h4>
        </>
      </div>
    </div>
  );
}

export default FullCalanderTimeBox;
