import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function GroupEdit({ data }) {

  const [student, setStudent] = useState();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);

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

  }, []);


  return (
    <div>

      <div className="lidDetailBodyRight">
        <div className="lidDetailRightTop">
          <div className="lidDetailRightTopTitle">
            <p className="lidDetailBodyLeftBodyItemTitle aboutCourse">Kurs haqida</p>
          </div>
          <div className="lidDetailRightTopContent">
            <Form>
              <div className="lidDetailRightTopContentItem">
                <div className='formGroupSelect lidDetailForm'>
                  <Form.Label className="lidDetailLabel"><span>*</span> O'quv holati</Form.Label>
                  <Form.Select aria-label="Default select example" required >
                    <option className="lidDetailSelectTitle">Tanlash</option>
                    <option value="boshlamagan">Hali boshlamagan</option>
                    <option value="oqimoqda">Ayni vaqtda o'qimoqda</option>
                    <option value="yakunlagan">Yakunlagan</option>
                    <option value="Tashlab ketgan">Tashlab ketgan</option>
                  </Form.Select>
                </div>
                <div className='formGroupSelect lidDetailForm'>
                  <Form.Label className="lidDetailLabel"><span>*</span> Kurs muddati</Form.Label>
                  <Form.Select aria-label="Default select example" required >
                    <option className="lidDetailSelectTitle">Tanlash</option>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                    <option value="four">4</option>
                    <option value="five">5</option>
                    <option value="six">6</option>
                    <option value="seven">7</option>
                    <option value="eight">8</option>
                    <option value="nine">9</option>
                    <option value="ten">10</option>
                    <option value="eleven">11</option>
                    <option value="twelve">12</option>
                  </Form.Select>
                </div>
                <div className='formGroupSelect lidDetailForm'>
                  <Form.Label className="lidDetailLabel"><span>*</span> Kurs narxi</Form.Label>
                  <Form.Group controlId="formBasicAddress">
                    <Form.Control type="text" placeholder="Kurs narxi" required value={numberWords} onChange={(e) => setNumberWords(e.target.value)} />
                    <p className="wordNumber">{wordForm} so'm</p>
                  </Form.Group>
                </div>
                <div className='formGroupSelect lidDetailForm'>
                  <Form.Label className="lidDetailLabel"><span>*</span> Guruh nomi</Form.Label>
                  <Form.Control type='text' />
                </div>

              </div>
            </Form>

          </div>
        </div>
        <div className="lidDetailRightBottom">
          <div className="lidDetailRightTopTitle">
            <p className="lidDetailBodyLeftBodyItemTitle aboutCourse">Davomat</p>
          </div>
          <div className="lidDetailRightBottomContent">
            <Form>
              <div className="lidDetailRightTopContentItem lidDetailRightTopContentItemBottom">
                <div className='formGroupSelect lidDetailForm lidDetailFormBottom' controlId="scheduleType">
                  <Form.Label className="lidDetailLabel"><span>*</span> Jadval turi</Form.Label>
                  <Form.Control as="select" value={scheduleType} onChange={handleScheduleTypeChange}>

                    <option value="" className="lidDetailSelectTitle">Tanlash</option>
                    <option value="toq">Haftaning toq kunlari</option>
                    <option value="juft">Haftaning juft kunlari</option>
                    <option value="boshqa">Hafta kunlarini tanlash</option>
                  </Form.Control>
                </div>
                <div className="formGroupSelect lidDetailForm lidDetailFormBottom">
                  <Form.Label className="lidDetailLabel"><span>*</span> Bir haftadagi darslar soni</Form.Label>
                  <div className="formRadioGroup">
                    <div className="formRadioItem">
                      <Form.Check
                        type="radio"
                        id="radio3"
                        aria-label="radio 3"
                        name="radio"
                        value={3}
                        checked={weeklyClasses === 3}
                        onChange={handleWeeklyClassesChange}
                        disabled={disableWeeklyClasses}
                      />
                      <Form.Label htmlFor="radio3" className="radioLabel lidDetailLabel">3 marta</Form.Label>
                    </div>
                    <div className="formRadioItem">
                      <Form.Check
                        id="radio4"
                        type="radio"
                        aria-label="radio 4"
                        name="radio"
                        value={4}
                        checked={weeklyClasses === 4}
                        onChange={handleWeeklyClassesChange}
                        disabled={disableWeeklyClasses}
                      />
                      <Form.Label htmlFor="radio4" className="radioLabel lidDetailLabel">4 marta</Form.Label>
                    </div>
                    <div className="formRadioItem">
                      <Form.Check
                        id="radio5"
                        type="radio"
                        aria-label="radio 5"
                        name="radio"
                        value={5}
                        checked={weeklyClasses === 5}
                        onChange={handleWeeklyClassesChange}
                        disabled={disableWeeklyClasses}
                      />
                      <Form.Label htmlFor="radio5" className="radioLabel lidDetailLabel">5 marta</Form.Label>
                    </div>
                  </div>
                </div>
                <div className='formGroupSelect lidDetailForm lidDetailFormBottom lidDetailWeekDays'>
                  <Form.Label className="lidDetailLabel"><span>*</span> Hafta kunlari</Form.Label>
                  <div className="formCheckButton">
                    <button className="formCheckButtonItem" type="button" onClick={() => setVisible(!visible)} disabled={disableWeeklyClasses}>
                      {selectedDays.length === 0 ? 'Tanlash' :
                        selectedDays.map((day, index) => (
                          <span key={index} className="formCheckButtonItemSelected">
                            <span>{day}</span> <button className="formCheckButtonItemCancel" type="button" onClick={() => removeDay(day)}>x</button>
                          </span>
                        ))
                      }
                    </button>
                  </div>
                  <div className={visible ? 'formCheckGroup visible' : 'formCheckGroup'}>
                    {Object.keys(dayAbbreviations).map((dayName, index) => (
                      <div className="formCheckItem" key={index}>
                        <Form.Check type="checkbox" id={dayName.toLowerCase()} name={dayName} onChange={handleCheckboxChange} />
                        <Form.Label htmlFor={dayName.toLowerCase()} className="checkboxLabel lidDetailLabel">{dayName}</Form.Label>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
              <div className="lidDetailRightTopContentItem lidDetailRightTopContentItemBottom">
                <div className="formGroupSelect lidDetailForm lidDetailFormBottom">
                  <Form.Label className="lidDetailLabel"><span>*</span> O'qishni boshlagan sanasi</Form.Label>
                  <Form.Control type="date" placeholder="O'qishni boshlagan sanasi" required className="lidDetailInputTime" />
                </div>
                <div className="formGroupSelect lidDetailForm lidDetailFormBottom">
                  <Form.Label className="lidDetailLabel"><span>*</span> O'qishni boshlagan sanasi</Form.Label>
                  <div className="formDetailTime">
                    <Form.Control type="time" placeholder="O'qishni boshlagan sanasi" required className="lidDetailInputTime" />
                    <Form.Control type="time" placeholder="O'qishni boshlagan sanasi" required className="lidDetailInputTime" />
                  </div>
                </div>

              </div>
            </Form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GroupEdit