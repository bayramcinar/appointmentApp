import React, { useState,useEffect } from 'react'
import "../style/myAppointments.css"

function MyAppointmentBox({image,infos,onDelete}) {
    const [request,setRequest] = useState(false)
    const handleDelete = () => {
        // Call the onDelete function passed as a prop
        onDelete(infos);
      };
    const isRequestFunction = () => {
        const lastSpaceIndex = infos["time"].lastIndexOf(' ');
        const trueValue = infos["time"].substring(lastSpaceIndex + 1);
    
        if (trueValue.toLowerCase() === 'true') {
          setRequest(true);
        } else {
          setRequest(false);
        }
      };
    
      useEffect(() => {
        isRequestFunction();
      }, [infos]);
    
  return (
    <div className='bg-white myAppointmentBox lg:w-[500px] max-[768px]:w-[320px] mb-5 rounded-lg ml-auto mr-auto'>
        <div className='p-2 flex'>
            <div className='imgArea1 w-1/3 flex items-center justify-center'>
                <img src={image} className='w-20' alt=""/>
            </div>
            {infos["kimIçin"] === "Kendim" &&
                <div className='infoAreaForOwn w-2/3'>
                    {request &&
                        <h1 className='text-sm text-red-600 p-1 text-center font-semibold m-1'>Bu bir randevu talebidir.</h1>
                    }
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["kimIçin"]} için ({infos["notes"]})</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["time"]}</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["service"]}</h1>
                </div>
            }
            {infos["kimIçin"] === "Başkası" &&
                <div className='infoAreaForSomeOne w-2/3'>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["kimIçin"]} için ({infos["notes"]})</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["firstName"]} {infos["lastName"]} ({infos["gender"]}) (Doğum Tarihi :{infos["dateOfBirth"]})</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["time"]}</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["service"]}</h1>
                </div>
            }
            <div className='deleteArea flex items-center justify-center m-1'>
                <button onClick={handleDelete} className='text-red'>
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default MyAppointmentBox
