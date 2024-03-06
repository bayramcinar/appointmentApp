import React from "react";

function Steps({ active }) {
  return (
    <div className="h-min flex items-center justify-center m-3 mb-0">
      <div className="stepsArea flex flex-row">
        <div
          className={`rounded-full w-9 flex items-center justify-center m-3 ${
            active === 1
              ? "bg-premiumOrange"
              : "bg-text border-stepBorder1 border-2"
          }`}
        >
          <i
            className={`fa-solid fa-1 text-stepBorder1 text-${
              active === 1 ? "white" : "stepBorder1"
            } p-2 text-center`}
          ></i>
        </div>
        <div
          className={`rounded-full w-9 flex items-center justify-center m-3 ${
            active === 2
              ? "bg-premiumOrange"
              : "bg-text border-stepBorder1 border-2"
          }`}
        >
          <i
            className={`fa-solid fa-2 text-stepBorder1 text-${
              active === 2 ? "white" : "stepBorder1"
            } p-2 text-center`}
          ></i>
        </div>
        <div
          className={`rounded-full w-9 flex items-center justify-center m-3 ${
            active === 3
              ? "bg-premiumOrange"
              : "bg-text border-stepBorder1 border-2"
          }`}
        >
          <i
            className={`fa-solid fa-3 text-stepBorder1 text-${
              active === 3 ? "white" : "stepBorder1"
            } p-2 text-center`}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Steps;
