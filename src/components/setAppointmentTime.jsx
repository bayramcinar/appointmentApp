import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import SetDateAndTime from "./setDateAndTime";
import SavedTimes from "./savedTimeBox";
import SavedDurations from "./savedDurationBox";
import moment from "moment";

function SetAppointmentTime() {
  const [datesData, setDatesData] = useState([]); // TAKVİMDEN SEÇTİĞİMİZ TARİHLERİ TUTAN ARRAY
  const [selectedTimes, setSelectedTimes] = useState([]); // SEÇTİĞİMİZ SAATLERİ TUTAN DEĞİŞKEN
  const [selectedDuration, setSelectedDuration] = useState(""); //SEÇTİĞİMİZ RANDEVU SÜRESİNİ TUTAN DEĞİŞKEN
  const [savedTimesArray, setSavedTimesArray] = useState([]); // KAYITLI SAATLER BÖLGESİNDE GÖSTERİLEN SAATLERİ TUTAN ARRAY
  const [savedDurationsArray, setSavedDurationsArray] = useState([]); // KAYITLI SÜRELER BÖLGESİNDE GÖSTERİLEN SÜRELERİ TUTAN ARRAY
  const [savedTimes, setSavedTimes] = useState(true); // KAYITLI SAATLER VEYA SAAT SEÇ EKRANINDA GİDİP GELMEMİZİ SĞLAYAN DEĞİŞKEN
  useEffect(() => {
    const localStorageSavedTimes =
      JSON.parse(localStorage.getItem("savedTimes")) || []; // DATABASE DEN RANDEVU SAATİ OLUŞTURMAK İÇİN KULLANDIĞIMIZ KAYITLI SAATLERİ ALACAĞIMIZ YER BEN BURDA DİREK LOCALDEN ALDIM(savedTimes) ADINDA TABLODAN ALACAĞIZ
    setSavedTimesArray(localStorageSavedTimes);
    const localStorageSavedDurations =
      JSON.parse(localStorage.getItem("savedDurations")) || []; // DATABASE DEN RANDEVU SAATİ OLUŞTURMAK İÇİN KULLANDIĞIMIZ KAYITLI SÜRELERİ ALACAĞIMIZ YER BEN BURDA DİREK LOCALDEN ALDIM(savedDurations) ADINDA TABLODAN ALACAĞIZ
    setSavedDurationsArray(localStorageSavedDurations);
  }, []);

  const getSelectedDate = (selectedDate) => {
    // TAKVİMDEKİ DEĞİŞİKLİKLERE GÖRE SEÇİLEN TARİHLERİ AYARLAYAN FONKSİYON
    setDatesData(selectedDate);
    setSelectedTimes([]);
  };

  const handleSetTime = (values, { resetForm }) => {
    // RANDEVU SAATİ EKLEMEMİZİ SAĞLAYAN FONKSİYON
    if (savedTimes === true) {
      const { duration } = values;

      if (!selectedTimes.length || !datesData.length || !duration) {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen tüm bilgileri doldurun.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      const existingTimes =
        JSON.parse(localStorage.getItem("selectedTimes")) || []; // DATABASE DEN RANDEVU SAATLERİNİ ALACAĞIZ (selectedTimes) BEN BURDA DİREK LOCAL DEN ALDIM

      // Check for conflicts
      const conflictingAppointments = existingTimes.some((item) => {
        const existingStartDateTime = moment(`${item.date} ${item.time}`);
        const existingEndDateTime = existingStartDateTime
          .clone()
          .add(item.duration, "minutes");

        return selectedTimes.some((selectedTime) => {
          const selectedDateTime = moment(`${datesData[0]} ${selectedTime}`);
          const selectedEndDateTime = selectedDateTime
            .clone()
            .add(duration, "minutes");

          return (
            (selectedDateTime.isSameOrAfter(existingStartDateTime) &&
              selectedDateTime.isBefore(existingEndDateTime)) ||
            (existingStartDateTime.isSameOrAfter(selectedDateTime) &&
              existingStartDateTime.isBefore(selectedEndDateTime))
          );
        });
      });

      if (conflictingAppointments) {
        Swal.fire({
          title: "Hata !",
          text: "Seçilen tarih ve saatlerde bir randevu zaten mevcut.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      // Continue with adding the appointment if no conflicts
      datesData.forEach((selectedDate) => {
        selectedTimes.forEach((selectedTime) => {
          const dateTimeObject = {
            time: selectedTime,
            date: selectedDate,
            duration: duration,
            active: true,
          };

          existingTimes.push(dateTimeObject);
        });
      });

      localStorage.setItem("selectedTimes", JSON.stringify(existingTimes)); //DATABASE E GÜNCELLENMİŞ RANDEVU SAATLERİNİ GÖNDERECEĞİMİZ YER

      resetForm();
      setSelectedTimes([]);

      Swal.fire({
        title: "Başarılı",
        text: "Randevu saatleri başarılı bir şekilde eklenmiştir.",
        icon: "success",
        confirmButtonText: "Kapat",
      });
    } else {
      const { time, duration } = values;

      if (!time || !datesData.length || !duration) {
        Swal.fire({
          title: "Hata !",
          text: "Lütfen tüm bilgileri doldurun.",
          icon: "error",
          confirmButtonText: "Kapat",
        });
        return;
      }

      const existingTimes =
        JSON.parse(localStorage.getItem("selectedTimes")) || []; // DATABASE DEN RANDEVU SAATLERİNİ ALACAĞIZ (selectedTimes) BEN BURDA DİREK LOCAL DEN ALDIM

      // Her bir tarihi, seçilen saatle birlikte ekleyin
      datesData.forEach((chosenDate) => {
        const [hour, minute] = time.split(":");
        const selectedTime = `${hour}:${minute}`;
        const selectedDateTime = `${chosenDate} ${selectedTime}`;

        const isDuplicate = existingTimes.some((item) => {
          const existingDateTime = `${item.date} ${item.time}`;
          return existingDateTime === selectedDateTime;
        });

        if (!isDuplicate) {
          const dateTimeObject = {
            time: selectedTime,
            date: chosenDate,
            duration: duration,
            active: true,
          };

          existingTimes.push(dateTimeObject);
        }
      });

      localStorage.setItem("selectedTimes", JSON.stringify(existingTimes)); //DATABASE E GÜNCELLENMİŞ RANDEVU SAATLERİNİ GÖNDERECEĞİMİZ YER

      resetForm();

      Swal.fire({
        title: "Başarılı",
        text: "Randevu saatleri başarılı bir şekilde eklenmiştir.",
        icon: "success",
        confirmButtonText: "Kapat",
      });
    }
  };

  const handleOptionChange = (option) => {
    //KAYITLI SAATLER VEYA SAAT SEÇ EKRANLARINDA GEZİNMEMEİZİ SAĞLAYAN FONKSİYON
    setSavedTimes(option);
  };

  const handleAppointmentBoxClick = (
    // KAYITLI SAATLERDE BİRDEN ÇOK SAAT SEÇEBİLMEMİZİ SAĞLAYAN FONKSİYON
    clickedTime,
    selectedDate,
    setFieldValue
  ) => {
    const [hour, minute] = clickedTime.split(":");
    const selectedTime = `${hour}:${minute}`;
    setFieldValue("chosenDate", selectedDate);

    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(selectedTime)) {
        return prevSelectedTimes.filter((time) => time !== selectedTime);
      } else {
        return [...prevSelectedTimes, selectedTime];
      }
    });
  };

  const handleAppointmentDurationBoxClick = (
    //SÜREYİ SEÇTİĞİMİZDE BUNU SEÇİLEN SÜREYE ATAYAN FONKSİYON
    clickedDuration,
    setFieldValue
  ) => {
    setSelectedDuration(clickedDuration);
    setFieldValue("duration", clickedDuration);
  };

  return (
    <div className="ml-auto mr-auto bg-dayComponentBg mt-10 setAppointmentTime flex items-center justify-center flex-col lg:w-[33rem] md:w-[24rem] lg:h-autp sm:h-auto shadow-xl border-stepBorder1 border-2 rounded-xl">
      <h2 className="text-buttonColor text-2xl m-3 font-semibold mb-0">
        Randevu Zamanı Belirle
      </h2>
      <div className="chooseSavedTimes flex items-center justify-center ">
        <button
          onClick={() => handleOptionChange(true)}
          className={`bg-appoinmentBox p-1 text-white tex-sm rounded-3xl m-3 mb-0 px-7 ${
            savedTimes === true ? "selected" : ""
          } ${savedTimes === true ? "bg-appoinmentBox" : "bg-backButtonColor"}`}
        >
          Kayıtlı Saatler
        </button>
        <button
          onClick={() => handleOptionChange(false)}
          className={`bg-appoinmentBox p-1 text-white tex-sm rounded-3xl m-3 mb-0 px-7 ${
            savedTimes === false ? "selected" : ""
          } ${
            savedTimes === false ? "bg-appoinmentBox" : "bg-backButtonColor"
          }`}
        >
          Saat Seç
        </button>
      </div>
      <Formik
        initialValues={{ chosenDate: "", duration: "" }}
        onSubmit={handleSetTime}
      >
        {(formikProps) => (
          <Form>
            <div className="m-3 field-container flex items-center justify-center">
              <SetDateAndTime onDateChange={getSelectedDate} />
            </div>
            {savedTimes === false && (
              <>
                <div className="m-3 field-container lg:w-[21rem]">
                  <Field
                    name="time"
                    type="time"
                    className={`p-3 lg:w-[21rem] max-[768px]:w-[22rem] focus:border-none outline-none bg-white`}
                    placeholder="Saat"
                  />
                </div>
                <div className="m-3 field-container lg:w-[21rem]">
                  <Field
                    name="duration"
                    type="number"
                    className={`p-3 lg:w-[21rem] max-[768px]:w-[22rem] focus:border-none outline-none bg-white`}
                    placeholder="Randevu Süresi (örn: 30 dk)"
                  />
                </div>
              </>
            )}
            {savedTimes === true && (
              <>
                <div className="flex items-center justify-center flex-col">
                  <div className="border-b-2 border-buttonColor mb-1">
                    <h1 className="text-md font-semibold text-center text-buttonColor mb-[2px]">
                      Kayıtlı Saatler
                    </h1>
                  </div>
                  <div className="chooseSavedTimes flex items-center justify-center flex-wrap mx-[15px]">
                    {savedTimesArray.map((savedTime, index) => (
                      <SavedTimes
                        key={index}
                        time={savedTime}
                        onTimeClick={(clickedTime) =>
                          handleAppointmentBoxClick(
                            clickedTime,
                            datesData,
                            formikProps.setFieldValue
                          )
                        }
                        selectedTime={selectedTimes.includes(savedTime)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <div className="border-b-2 border-buttonColor mb-1">
                    <h1 className="text-md font-semibold text-center text-buttonColor mb-[2px]">
                      Kayıtlı Süreler
                    </h1>
                  </div>
                  <div className="savedTimes flex flex-wrap justify-center items-center mx-[15px]">
                    {savedDurationsArray.map((savedDuration, index) => (
                      <SavedDurations
                        key={index}
                        time={savedDuration}
                        onTimeClick={(clickedDuration) =>
                          handleAppointmentDurationBoxClick(
                            clickedDuration,
                            formikProps.setFieldValue
                          )
                        }
                        selectedDuration={selectedDuration}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="bg-buttonColor rounded-3xl flex items-center justify-center w-56 buttons mt-4 mb-4"
              >
                <h4 className="text-text p-2 px-6 text-sm tracking-wider">
                  Zamanı ve Tarihi Ayarla
                </h4>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SetAppointmentTime;
