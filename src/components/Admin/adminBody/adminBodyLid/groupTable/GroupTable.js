import React, { useState } from 'react';
import { useSearch } from '../../../../context/SearchContext'
import { useTheme } from '../../../../context/ThemeContext';
import Spinner from 'react-bootstrap/Spinner'
import { useAddDataLid } from '../../../../context/AddDataLidsFromModal'
import { PiSealCheckFill } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';
import { MdVisibility } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import GroupJson from "../../../../json files/groups.json"

function GroupTable() {
  const { deleteData, PeopleTables, loader, showWarning, showDelete } = useAddDataLid()

  const { searchValues, handleInputChange, filteredResults } = useSearch()
  const { isNightMode } = useTheme("")
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = GroupJson.slice(firstIndex, lastIndex);
  const npage = Math.ceil(GroupJson.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);



  function prePage() {
    if (currentPage !== firstIndex && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    if (currentPage !== lastIndex && currentPage < npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div className='groupTable'>
      <div className={isNightMode ? 'lidHeaderSecond' : 'lidHeaderSecond dark'}>


        <h2 className={isNightMode ? 'titleLists' : 'titleLists dark'}>Guruhlar ro'yhati</h2>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className={isNightMode ? "page-link" : "page-link dark"} onClick={prePage}>Prev</a>
          </li>
          {
            numbers.map((n, id) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={id}>
                <a href="#" className={isNightMode ? "page-link" : "page-link dark "} onClick={() => changeCurrentPage(n)}  >{n}</a>
              </li>
            ))
          }
          <li className="page-item">
            <a href="#" className={isNightMode ? "page-link" : "page-link dark"} onClick={nextPage}>Next</a>
          </li>
        </ul>
      </div>
      <div className={isNightMode ? 'lidTableBody' : 'lidTableBody dark'}>
        {showWarning && <div className={isNightMode ? 'warning-message' : 'warning-message dark'}>
          <PiSealCheckFill className='checkFill' />
          <p>Lid muvaffaqiyatli qo'shildi!</p></div>}
        {showDelete && <div className={isNightMode ? 'warning-message delete' : 'warning-message dark delete'}>
          <PiSealCheckFill className='checkFill redFill' />
          <p className='redFill'>Lid o'chirildi!</p></div>}

        <table className={isNightMode ? "tables" : "tables darks"}>
          <thead>
            <tr className={isNightMode ? 'tr' : 'tr dark'}>
              <th className='tartib'>No.</th>
              <th className='ism'>Guruh nomi</th>
              <th className="familiya">Fan nomi</th>
              <th className="raqam">O'qituvchi F.I.SH</th>
              <th className="haqida">Xona</th>
              <th className="guruh">Dars kunlari</th>
              <th className="sinov">Dars vaqti</th>
              <th className='actions'>Boshqaruv</th>
            </tr>
          </thead>
          <tbody>
            <tr className={isNightMode ? "searchRow" : "searchRow dark"}>
              <td className="tartib"></td>
              <td>
                <input
                  type="text"
                  name="searchLid"
                  className="searchLid"
                  id="searchLidName"
                  placeholder="...Izlash"
                  value={searchValues.category1}
                  onChange={(e) => handleInputChange(e, 'category1')}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="searchLid"
                  name="searchLid"
                  id="searchLidFname"
                  value={searchValues.category2}
                  onChange={(e) => handleInputChange(e, 'category2')}
                  placeholder="...Izlash"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="searchLid"
                  className="searchLid"
                  id="searchLidPhone"
                  value={searchValues.category3}
                  onChange={(e) => handleInputChange(e, 'category3')}
                  placeholder="...Izlash"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="searchLid"
                  className="searchLid"
                  id="searchLidAbout"
                  placeholder="...Izlash"
                  value={searchValues.category4}
                  onChange={(e) => handleInputChange(e, 'category4')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="searchLid"
                  className="searchLid"
                  id="searchLidSubject"
                  placeholder="...Izlash"
                  value={searchValues.category5}
                  onChange={(e) => handleInputChange(e, 'category5')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="searchLid"
                  className="searchLid"
                  id="searchLidDate"
                  placeholder="...Izlash"
                  value={searchValues.category6}
                  onChange={(e) => handleInputChange(e, 'category6')}

                />
              </td>
            </tr>
            {loader && <tr>
              <td> <Spinner animation="border" /></td>
            </tr>}

            {filteredResults.length > 0 ? (
              filteredResults.map((peopleTable, index) => (
                <Link to={`/adminBody/${peopleTable._id}`}>
                  <tr key={peopleTable.id} className={isNightMode ? 'recordsMap' : 'recordsMap dark'}>
                    <td>{peopleTable[index + 1]}</td>
                    <td>{peopleTable.groupName}</td>
                    <td>{peopleTable.subName}</td>
                    <td>{peopleTable.techName}</td>
                    <td>{peopleTable.classRoom}</td>
                    <td>{peopleTable.lessDay}</td>
                    <td>{peopleTable.lessTime}</td>
                  </tr>
                </Link>
              ))
            ) : (
              searchValues.category1 === "" ? (
                records.map((peopleTable, index) => (
                  <tr key={index} className={isNightMode ? 'recordsMap' : 'recordsMap dark'}>
                    <td>{index + 1}</td>
                    <td>{peopleTable.groupName}</td>
                    <td>{peopleTable.subName}</td>
                    <td>{peopleTable.techName}</td>
                    <td>{peopleTable.classRoom}</td>
                    <td>{peopleTable.lessDay}</td>
                    <td>{peopleTable.lessTime}</td>
                    <td className='actions'>
                      {/* <button className='delete' onClick={() => deleteData(peopleTable._id)}><MdDelete /></button> */}
                      <Link to={`/adminBody/${peopleTable._id}`}>
                        <button className='visible'><MdVisibility /></button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={isNightMode ? 'nfound' : 'nfound dark'}>No information found</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GroupTable