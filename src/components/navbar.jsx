import React from 'react'
import { Link } from "react-router-dom";
import "../style/navbar.css"

function Navbar() {
  return (
    <div className='sticky flex items-center justify-center top-0 bg-buttonColor w-full z-[2]'>
        <nav>
            <ul className='flex flex-row'>
                <li className='text-mb text-dayComponentBg font-semibold text-center m-5 nav-item'>
                    <Link className='nav-link relative' to={""}>Appointment Area</Link>
                </li>
                <li className='text-mb text-dayComponentBg font-semibold text-center m-5 nav-item'>
                    <Link className='nav-link relative' to={"setAppointmentTime"}>Set Appointment Time Area</Link>
                </li>
                <li className='text-mb text-dayComponentBg font-semibold text-center m-5 nav-item'>
                    <Link className='nav-link relative' to={"myAppointments"}>My Appointments</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
