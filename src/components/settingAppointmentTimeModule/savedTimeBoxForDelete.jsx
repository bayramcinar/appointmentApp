import React from "react";
import Swal from "sweetalert2";

function SavedTimesForDeletion({ time }) {
  const handleDeleteClick = () => {
    Swal.fire({
      title: "Emin misiniz!",
      text: "Seçilen saati kayıtlı saatlerden silmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        const savedTimesString = localStorage.getItem("savedTimes");
        let savedTimes = savedTimesString ? JSON.parse(savedTimesString) : [];

        savedTimes = savedTimes.filter((saved) => saved !== time);

        localStorage.setItem("savedTimes", JSON.stringify(savedTimes));
        Swal.fire({
          title: "Başarılı !",
          text: "Seçilen saat başarılı bir şekilde silindi.",
          icon: "success",
          confirmButtonText: "Kapat",
        });
      }
    });
  };

  return (
    <div>
      <div
        className={`timeBox w-[95px] max-[768px]:w-[95px] text-sm  md:text-[1.2vw] lg:text-[1vw] xl:text-[0.9vw] hover:bg-premiumPurple text-gray-500 hover:text-white bg-gray-100 rounded-3xl m-[5px] p-[1px] max-[768px]:m-[5px] cursor-pointer flex`}
      >
        <h4 className={`  font-bold ml-[7px] mt-[7px] pb-0 text-center `}>
          {time}
        </h4>
        <div className="rounded-3xl ml-3 mr-[5px]" onClick={handleDeleteClick}>
          <i className="fa-solid fa-trash text-center p-2  text-coral hover:text-white flex justify-center items-center"></i>
        </div>
      </div>
    </div>
  );
}

export default SavedTimesForDeletion;
