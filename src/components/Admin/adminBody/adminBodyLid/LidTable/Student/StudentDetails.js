// StudentDetails.js
import "./student.css"
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from "../../../../../context/ThemeContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditModal from "./EditModal";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import FetchGet from "../../../../../context/FetchGet";

function StudentDetails({ id }) {
  const [student, setStudent] = useState();
  const { isNightMode } = useTheme();
  const URL = `https://otviz-backend.vercel.app/lids/${id}`;
  const [loader, setLoader] = useState(true);
  const [showToolTip, setShowToolTip] = useState(false);
  const target = useRef(null);
  const {data} = FetchGet("https://otviz-backend.vercel.app/groups");
  console.log("groups", data);

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
                    <Form.Select aria-label="Default select example" required >
                      <option className="lidDetailSelectTitle">Tanlash</option>
                      {
                        data.map((item) => (
                          <option value={item._id}>{item.name}</option>
                        ))
                      }
                    </Form.Select>
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
                  <div className='formGroupSelect lidDetailForm lidDetailFormBottom'>
                    <Form.Label className="lidDetailLabel"><span>*</span> Jadval turi</Form.Label>
                    <Form.Select aria-label="Default select example" required >
                      <option className="lidDetailSelectTitle">Tanlash</option>
                      <option value="boshlamagan">Haftaning toq kunlari</option>
                      <option value="oqimoqda">Haftaning juft kunlari</option>
                      <option value="yakunlagan">Hafta kunlarini tanlash</option>
                    </Form.Select>
                  </div>
                  <div className="formGroupSelect lidDetailForm lidDetailFormBottom">
                    <Form.Label className="lidDetailLabel"><span>*</span> Bir haftadagi darslar soni</Form.Label>
                    <div className="formRadioGroup">
                      <div className="formRadioItem">
                        <Form.Check type="radio" id="radio1" aria-label="radio 1" name="radio" />
                        <Form.Label for="radio1" className="radioLabel lidDetailLabel">1 marta</Form.Label>
                      </div>
                      <div className="formRadioItem">
                        <Form.Check id="radio2" type="radio" aria-label="radio 1" name="radio" />
                        <Form.Label for="radio2" className="radioLabel lidDetailLabel">2 marta</Form.Label>
                      </div>
                      <div className="formRadioItem">
                        <Form.Check id="radio3" type="radio" aria-label="radio 1" name="radio" />
                        <Form.Label for="radio3" className="radioLabel lidDetailLabel">3 marta</Form.Label>
                      </div>
                    </div>
                  </div>
                  <div className='formGroupSelect lidDetailForm lidDetailFormBottom'>
                    <Form.Label className="lidDetailLabel"><span>*</span> Hafta kunlari</Form.Label>
                    <span className="btnHafta" onClick={() => setShowToolTip(!showToolTip)}>Hafta kunlarini tanlang</span>
                    
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;