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


  const units = ["", "bir", "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"];
  const teens = ["o'n", "o'n bir", "o'n ikki", "o'n uch", "o'n to'rt", "o'n besh", "o'n olti", "o'n yetti", "o'n sakkiz", "o'n to'qqiz"];
  const tens = ["", "", "yigirma", "o'ttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "to'qson"];
  const thousands = ["", "ming", "million", "milliard", "trillion"];
  function numberToWords(number) {
    if (number === 0) return "nol";

    let words = '';

    function getHundreds(n) {
      let str = '';

      if (n > 99) {
        str += units[Math.floor(n / 100)] + ' yuz ';
        n %= 100;
      }
      if (n > 19) {
        str += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      }
      if (n > 9) {
        str += teens[n - 10] + ' ';
      }
      else {
        str += units[n] + ' ';
      }
      return str.trim();
    }

    let thousandCounter = 0;

    while (number > 0) {
      let chunk = number % 1000;
      if (chunk) {
        words = getHundreds(chunk) + ' ' + thousands[thousandCounter] + ' ' + words;
      }
      number = Math.floor(number / 1000);
      thousandCounter++;
    }

    return words.trim();
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