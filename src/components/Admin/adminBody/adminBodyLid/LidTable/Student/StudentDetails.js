// StudentDetails.js
import "./student.css"
import React, { useState, useEffect } from 'react';
import { useTheme } from "../../../../../context/ThemeContext";
import Form from 'react-bootstrap/Form';
import EditModal from "./EditModal";
import FetchGet from "../../../../../context/FetchGet";


function StudentDetails({ id }) {
  const [student, setStudent] = useState();
  const [visible, setVisible] = useState(false);
  const { isNightMode } = useTheme();
  const URL = `https://otviz-backend.vercel.app/lids/${id}`;
  const [loader, setLoader] = useState(true);

  const [selectedDays, setSelectedDays] = useState([]);
  const [scheduleType, setScheduleType] = useState("");
  const [weeklyClasses, setWeeklyClasses] = useState('');
  const [disableWeeklyClasses, setDisableWeeklyClasses] = useState(false);
  const {data} = FetchGet("https://otviz-backend.vercel.app/groups")


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
    } else {
      setSelectedDays([]);
    }
  };

  useEffect(() => {
    if (scheduleType === 'toq' || scheduleType === 'juft') {
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



  

  const [numberWords, setNumberWords] = useState();
  function numberToWords(numberWords) {
    const units = ['', 'bir', 'ikki', 'uch', "to'rt", 'besh', 'olti', 'yetti', 'sakkiz', "to'qqiz"];
    const teens = ['', "o'n bir", "o'n ikki", "o'n uch", "o'n to'rt", "o'n besh", "o'n olti", "o'n yetti", "o'n sakkiz", "o'n to'qqiz"];
    const tens = ['', "o'n", 'yigirma', "o'ttiz", 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', "to'qson"];

    if (numberWords === 0) return 'zero';

    let word = '';

    if (numberWords >= 10000000) {
      word += tens[Math.floor(numberWords / 10000000)] + ' ';
      if (numberWords % 10000000 === 0) word += 'million'
      if (numberWords < 11000000 && numberWords > 99999999) {
        word += tens[Math.floor(numberWords / 10000000)] + ' million ';
      }
      numberWords %= 10000000;
    }


    if (numberWords >= 1000000) {
      word += units[Math.floor(numberWords / 1000000)] + ' million ';
      numberWords %= 1000000;
    }

    if (numberWords >= 100000) {
      if (numberWords <= 999999) {
        word += units[Math.floor(numberWords / 100000)] + ' yuz ';
      } else {
        word += tens[Math.floor(numberWords / 100000)] + ' ming ';
      }
      if (numberWords % 100000 === 0) word += 'ming ';
      numberWords %= 100000;
    }

    if (numberWords >= 10000) {
      if (numberWords <= 99999) {
        word += tens[Math.floor(numberWords / 10000)] + ' ';
      }
      else {
        word += units[Math.floor(numberWords / 10000)] + ' ming ';
      }
      if (numberWords % 10000 === 0) word += 'ming ';
      numberWords %= 10000;
    }


    if (numberWords >= 1000) {
      word += units[Math.floor(numberWords / 1000)] + ' ming ';
      if (numberWords % 1000 === 0) word += '';
      numberWords %= 1000;
    }

    // Handle hundreds
    if (numberWords >= 100) {
      word += units[Math.floor(numberWords / 100)] + ' yuz ';
      if (numberWords % 100 === 0) word += '';
      numberWords %= 100;
    }

    // Handle tens and units
    if (numberWords > 0) {
      if (numberWords >= 10) {
        word += tens[Math.floor(numberWords / 10)] + ' ';
        numberWords %= 10;
      } else if (numberWords >= 11 && numberWords <= 19) {
        word += teens[numberWords - 10] + ' ';
        numberWords = 0; // Skip units for teens
      }
      if (numberWords % 10 === 0) word += '';
      if (numberWords > 0) {
        word += units[numberWords] + ' ';
        if (numberWords % 1 === 0) word += ' ';
      }

    }

    return word.trim();
  }
  const wordForm = numberToWords(numberWords)

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        setLoader(true)
        const response = await fetch(URL);

        if (!response.ok) {
          // throw new Error(response.statusText)
          throw new Error(response.statusText)
        }
        const data = await response.json();
        setStudent(data)
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      finally {
        setLoader(false);
      }

    }
    getData();
    return () => {
      abortController.abort();
    };

  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }



  return (
    <div className="lidDetailBox">
      <div className="lidDetailHeader">
        <div className="lidDirectionButtons">
          <button type="button" className="deleteLidDetail">
            <p>Lidni o'chirish</p>
          </button>
          <button type="button" className="addLidDetailPupil deleteLidDetail">
            <p>O'quvchilarga qo'shish</p>
          </button>
        </div>
      </div>
      <div className="lidDetailBody">
        <div className="lidDetailBodyLeft">
          <div className="lidDetailBodyLeftHeader">
            <div className="lidDetailAvatar">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" />
            </div>
            <div className="lidDetailFullName">
              <h2>{student.name} {student.surname}</h2>
            </div>
          </div>
          <div className="lidDetailBodyLeftBody">
            <div className="lidDetailBodyLeftBodyItem">
              <p className="lidDetailBodyLeftBodyItemTitle">Umumiy Ma'lumotlar</p>
              <div className="lidDetailBodyLeftBodyItemContent">
                <div className="lidDetailBodyLeftBodyItemContentItem">
                  <p><span className="lidDetailContentTitle">Yashash Manzili:</span> <span className="lidDetailContentInfo">{student.address}</span>"</p>
                  <p><span className="lidDetailContentTitle">Tug'ilgan sanasi:</span> <span className="lidDetailContentInfo">{student.born}</span>"</p>
                  <p><span className="lidDetailContentTitle">Telefon nomeri:</span> <span className="lidDetailContentInfo">{student.pNumber}</span>"</p>
                  <p><span className="lidDetailContentTitle">Ota-onasini telefon raqami:</span> <span className="lidDetailContentInfo">{student.parentsNumber}</span>"</p>
                  <p><span className="lidDetailContentTitle">Tanlagan 1-fani:</span> <span className="lidDetailContentInfo">{student.sub1}</span>"</p>
                  <p><span className="lidDetailContentTitle">Tanlagan 2-fani:</span> <span className="lidDetailContentInfo">{student.sub2}</span>"</p>
                  <p><span className="lidDetailContentTitle">Bo'sh vaqti:</span> <span className="lidDetailContentInfo">{student.free}</span>"</p>
                  <div className="lidDetailContentInfoEdit">
                    <div>
                      <EditModal data={student} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lidDetailBodyRight">
          <Form.Select >
            <option disabled selected>Guruhni tanlash</option>
            {
              data.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))
            }
          </Form.Select>
          <div className='formGroupSelect lidDetailForm mt-3'>
                  <Form.Label className="lidDetailLabel"><span>*</span> Kurs narxi</Form.Label>
                  <Form.Group controlId="formBasicAddress">
                    <Form.Control type="text" placeholder="Kurs narxi" required value={numberWords} onChange={(e) => setNumberWords(e.target.value)} />
                    <p className="wordNumber">{wordForm} so'm</p>
                  </Form.Group>
                </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;