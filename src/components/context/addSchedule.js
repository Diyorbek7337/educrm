import React, {createContext, useState, useContext, useEffect} from "react";


const ScheduleAdd = createContext();

export const useSchedule = () => {
    return useContext(ScheduleAdd)
}

export const ScheduleProvider = ({children}) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [scheduleType, setScheduleType] = useState("");
    const [weeklyClasses, setWeeklyClasses] = useState('');
    const [disableWeeklyClasses, setDisableWeeklyClasses] = useState(false);



    const dayAbbreviations = {
        Dushanba: 'Dush',
        Seshanba: 'Sesh',
        Chorshanba: 'Chor',
        Payshanba: 'Pay',
        Juma: 'Jum',
        Shanba: 'Shan'
      };


      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
          if (selectedDays.length < weeklyClasses) {
            setSelectedDays((prevSelectedDays) => [...prevSelectedDays, name]);
          } else {
            alert('Tanlangan kunlar soni haftadagi darslar sonidan oshmasligi kerak.');
          }
        } else {
          setSelectedDays((prevSelectedDays) => prevSelectedDays.filter((day) => day !== name));
        }
      };
    
      const removeDay = (day) => {
        setSelectedDays((prevSelectedDays) => prevSelectedDays.filter(selectedDay => selectedDay !== day));
        const dayName = Object.keys(dayAbbreviations).find(key => dayAbbreviations[key] === day);
        if (dayName) {
          document.getElementById(dayName.toLowerCase()).checked = false;
        }
      };
    
    
      const handleScheduleTypeChange = (event) => {
        const { value } = event.target;
        setScheduleType(value);
    
        if (value === "toq") {
          setSelectedDays(["Dush", "Chor", "Jum"]);
        } else if (value === "juft") {
          setSelectedDays(["Sesh", "Pay", "Shan"]);
        }
        else if (value === "tanlash") {
          setSelectedDays([]);
        }
        else {
          setSelectedDays([]);
        }
      };
    
      useEffect(() => {
        if (scheduleType === 'toq' || scheduleType === 'juft' || scheduleType === 'tanlash') {
          setDisableWeeklyClasses(true);
        } else {
          setDisableWeeklyClasses(false);
        }
      }, [scheduleType]);
    
      const handleWeeklyClassesChange = (event) => {
        const { value } = event.target;
        if (parseInt(value) > 0 && parseInt(value) < 7) { // Qiymat 0 dan katta bo'lishini tekshiramiz
          setWeeklyClasses(parseInt(value));
        }
    
      };
    
    
    
      useEffect(() => {
        if (scheduleType === 'boshqa') {
          setSelectedDays([]);
        }
      }, [weeklyClasses]);
    
      return (
        <ScheduleAdd.Provider
          value={{
            selectedDays,
            setSelectedDays,
            scheduleType,
            setScheduleType,
            weeklyClasses,
            setWeeklyClasses,
            handleCheckboxChange,
            removeDay,
            handleScheduleTypeChange,
            handleWeeklyClassesChange,
            disableWeeklyClasses,
            dayAbbreviations
          }}
        >
          {children}
        </ScheduleAdd.Provider>
      )
    
}