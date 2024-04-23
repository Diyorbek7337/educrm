// StudentDetails.js
import "./student.css"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { useTheme } from "../../../../../context/ThemeContext";
import Form from 'react-bootstrap/Form';

function StudentDetails({ id }) {
  // const { id } = useParams();
  const [student, setStudent] = useState(null);
  const { isNightMode } = useTheme();
  const URL = `https://nice-shift-goat.cyclic.app/pupils/${id}`;
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        setLoader(true)
        const response = await fetch(URL, { signal: abortController.signal });

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
                  <p><span className="lidDetailContentTitle">Tug'ilgan sanasi:</span> <span className="lidDetailContentInfo">{student.year}</span>"</p>
                  <p><span className="lidDetailContentTitle">Telefon nomeri:</span> <span className="lidDetailContentInfo">{student.phone}</span>"</p>
                  <p><span className="lidDetailContentTitle">Ota-onasini telefon raqami:</span> <span className="lidDetailContentInfo">{student.fphone}</span>"</p>
                  <p><span className="lidDetailContentTitle">Tanlagan 1-fani:</span> <span className="lidDetailContentInfo">{student.subject1}</span>"</p>
                  <p><span className="lidDetailContentTitle">Tanlagan 2-fani:</span> <span className="lidDetailContentInfo">{student.subject2}</span>"</p>
                  <p><span className="lidDetailContentTitle">Bo'sh vaqti:</span> <span className="lidDetailContentInfo">{student.free}</span>"</p>
                  <div className="lidDetailContentInfoEdit">
                    <button type="button" className="deleteLidDetail editDetail"><FaUserEdit className="editIcon" /> <span>Profilni tahrirlash</span></button>
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
                      <option>Tanlash</option>
                      <option value="boshlamagan">Hali boshlamagan</option>
                      <option value="oqimoqda">Ayni vaqtda o'qimoqda</option>
                      <option value="yakunlagan">Yakunlagan</option>
                      <option value="Tashlab ketgan">Tashlab ketgan</option>
                    </Form.Select>
                  </div>
                  <div className='formGroupSelect lidDetailForm'>
                    <Form.Label className="lidDetailLabel"><span>*</span> Kurs muddati</Form.Label>
                    <Form.Select aria-label="Default select example" required >
                      <option>Tanlash</option>
                      <option value="one">1</option>
                      <option value="two">2</option>
                      <option value="three">3</option>
                      <option value="four">4</option>
                      <option value="five">5</option>
                      <option value="six">6</option>
                      <option value="seven">7</option>
                      <option value="eight">8</option>
                    </Form.Select>
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
