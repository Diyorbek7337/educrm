// StudentDetails.js
import "./student.css"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { useTheme } from "../../../../../context/ThemeContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditModal from "./EditModal";

function StudentDetails({ id }) {
  // const { id } = useParams();
  const [student, setStudent] = useState(0);
  const { isNightMode } = useTheme();
  const URL = `https://otviz-backend.vercel.app/lids/${id}`;
  const [loader, setLoader] = useState(true);   

  const [numberWords, setNumberWords] = useState();
  function numberToWords(numberWords) {
    const units = ['', 'bir', 'ikki', 'uch', "to'rt", 'besh', 'olti', 'yetti', 'sakkiz', "to'qqiz"];
    const teens = ['', "o'n bir", "o'n ikki", "o'n uch", "o'n to'rt", "o'n besh", "o'n olti", "o'n yetti", "o'n sakkiz", "o'n to'qqiz"];
    const tens = ['', "o'n", 'yigirma', "o'ttiz", 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', "to'qson"];

    if (numberWords === 0) return 'zero';

    let word = '';

    if (numberWords >= 10000000) {
<<<<<<< HEAD
      word += tens[Math.floor(numberWords / 10000000)] + ' ';
      if (numberWords % 10000000 === 0) word += 'million'
      if (numberWords < 11000000 && numberWords > 99999999) {
        word += tens[Math.floor(numberWords / 10000000)] + ' million ';
      }
=======
      word += tens[Math.floor(numberWords / 10000000)] + ' million ';
>>>>>>> b95aa3a8637f270412e0b454b796a3c9e64d54b8
      numberWords %= 10000000;
    }

  if (numberWords >= 1000000 ) {
      word += units[Math.floor(numberWords / 1000000)] + ' million ';
      numberWords %= 1000000;
    }

<<<<<<< HEAD
    if (numberWords >= 100000) {
      if (numberWords <= 999999) {
        word += units[Math.floor(numberWords / 100000)] + ' yuz ';
      } else {
        word += tens[Math.floor(numberWords / 100000)] + ' ming ';
      }
      if (numberWords % 100000 === 0) word += 'ming ';
=======
  if (numberWords >= 100000) {
      word += units[Math.floor(numberWords / 100000)] + ' yuz ';
>>>>>>> b95aa3a8637f270412e0b454b796a3c9e64d54b8
      numberWords %= 100000;
    }

<<<<<<< HEAD
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

=======
  if (numberWords >= 10000) {
      word += tens[Math.floor(numberWords / 10000)] + ' ming ';
      numberWords %= 10000;
  }
>>>>>>> b95aa3a8637f270412e0b454b796a3c9e64d54b8

  if (numberWords >= 1000) {
      word += units[Math.floor(numberWords / 1000)] + ' ming ';
<<<<<<< HEAD
      if (numberWords % 1000 === 0) word += '';
=======
>>>>>>> b95aa3a8637f270412e0b454b796a3c9e64d54b8
      numberWords %= 1000;
    }

<<<<<<< HEAD
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
=======
  if (numberWords >= 100) {
      word += units[Math.floor(numberWords / 100)] + ' yuz ';
      numberWords %= 100;
  }
>>>>>>> b95aa3a8637f270412e0b454b796a3c9e64d54b8

  if (numberWords > 0) {
      if (word !== '') word += 'va ';
      if (numberWords >= 10 && numberWords <= 19) {
          word += teens[numberWords - 10];
          numberWords = 0; // Skip units for teens
      } else {
          word += tens[Math.floor(numberWords / 10)];
          numberWords %= 10;
          if (numberWords > 0) word += ' ' + units[numberWords];
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
        console.log(data)
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
  console.log(student);
  

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
                    <button type="button" className="deleteLidDetail editDetail"><FaUserEdit className="editIcon" /> <EditModal data={student} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                </div>
              </Form>

            </div>
          </div>
          <div className="lidDetailRightBottom">

          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;