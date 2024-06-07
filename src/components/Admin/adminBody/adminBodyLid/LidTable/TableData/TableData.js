import React, { useState } from 'react'
import "../lidTable.css";
import { useSearch } from '../../../../../context/SearchContext';
import { useTheme } from '../../../../../context/ThemeContext';
import Spinner from 'react-bootstrap/Spinner'
import { useAddDataLid } from '../../../../../context/AddDataLidsFromModal';
import Alert from 'react-bootstrap/Alert';
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { PiSealCheckFill } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';
import { MdVisibility } from "react-icons/md";


function TableData() {



  const { deleteData, PeopleTables, loader, showWarning, showDelete } = useAddDataLid()

  const { searchValues, handleInputChange, filteredResults } = useSearch()

  const { isNightMode } = useTheme("")
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = PeopleTables.slice(firstIndex, lastIndex);
  const npage = Math.ceil(PeopleTables.length / recordsPerPage);
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
    <div>
      <div className={isNightMode ? 'lidHeaderSecond' : 'lidHeaderSecond dark'}>


        <h2 className={isNightMode ? 'titleLists' : 'titleLists dark'}>Lidlar ro'yhati</h2>
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
              <th className='tartib tab__1'>No.</th>
              <th className='ism tab__2'>Ism</th>
              <th className="familiya tab__3">Familiya</th>
              <th className="raqam tab__4">Telefon raqam</th>
              <th className="haqida tab__5">Markaz haqida</th>
              <th className="guruh tab__6">Fanlar</th>
              <th className="sinov tab__7">Bo'sh vaqt</th>
              <th className='actions tab__8'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={isNightMode ? "searchRow" : "searchRow dark"}>
              <td className="tartib"></td>
              <td className='tab__6'>
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
              <td className='tab__3'>
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
              <td className='tab__4'>
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
              <td className='tab__5'>
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
              <td className='tab__6'>
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
              <td className='tab__7'>
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
                    <td className='tab__1'>{peopleTable[index + 1]}</td>
                    <td className='tab__2'>{peopleTable.name}</td>
                    <td className='tab__3'>{peopleTable.surname}</td>
                    <td className='tab__4'>{peopleTable.pNumber}</td>
                    <td className='tab__5'>{peopleTable.about}</td>
                    <td className='tab__6'>{peopleTable.sub1}</td>
                    <td className='tab__7'>{peopleTable.free}</td>

                  </tr>
                </Link>
              ))
            ) : (
              searchValues.category1 === "" ? (
                records.map((peopleTable, index) => (
                  <tr key={index} className={isNightMode ? 'recordsMap' : 'recordsMap dark'}>
                    <td className='tab__1'>{index + 1}</td>
                    <td className='tab__2'>{peopleTable.name}</td>
                    <td className='tab__3'>{peopleTable.surname}</td>
                    <td className='tab__4'>{peopleTable.pNumber}</td>
                    <td className='tab__5'>{peopleTable.about}</td>
                    <td className='tab__6'>{peopleTable.sub1}</td>
                    <td className='tab__7'>{peopleTable.free}</td>
                    <td className='actionstab tab__8'>
                      <button className='delete' onClick={() => deleteData(peopleTable._id)}><MdDelete /></button>
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

export default TableData