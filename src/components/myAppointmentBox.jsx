import React from 'react'
import "../style/myAppointments.css"

function MyAppointmentBox({image,infos,onDelete}) {

    const handleDelete = () => {
        // Call the onDelete function passed as a prop
        onDelete(infos);
      };
    
  return (
    <div className=' myAppointmentBox m-3 rounded-lg ml-auto mr-auto'>
        <div className='p-2 flex'>
            <div className='imgArea1 w-1/3 flex items-center justify-center'>
                <img src={image} className='w-20' alt=""/>
            </div>
            {infos["kimIçin"] === "kendim" &&
                <div className='infoAreaForOwn w-2/3'>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["kimIçin"]} için ({infos["notes"]})</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["time"]}</h1>
                    <h1 className='text-xs text-buttonColor p-1 text-left font-medium m-1'>{infos["service"]}</h1>
                </div>
            }
            {infos["kimIçin"] === "başkası" &&
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
