import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css";

function Navbar() {
  return (
    <div className="sticky flex items-center justify-center top-0 bg-mistikBlue w-full z-[5] max-w-[100vw]">
      <nav>
        <ul className="flex flex-row max-w-[100vw] justify-around">
          <li className="text-sm text-dayComponentBg font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" to={""}>
              Appointment Area
            </Link>
          </li>
          <li className="text-sm text-dayComponentBg font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" to={"dashboard"}>
              Dashboard
            </Link>
          </li>
          <li className="text-sm text-dayComponentBg font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" to={"myAppointments"}>
              My Appointments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
