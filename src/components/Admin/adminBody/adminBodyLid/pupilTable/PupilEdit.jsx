import React from 'react';
import './Pupil.css'

function PupilEdit({data}) {
  return (
    <div className='pupil'>
      <div className="pupil__card">
        <div className="pupil__img">  </div>
        <div className="pupil__info">
          <h2>{data.name} {data.surname}</h2>
          <p><span>Tugilgan sanasi :</span> {data.born}</p>
          <p><span>Telefon raqami :</span> {data.pNumber}</p>
          <p><span>Ota-onasining telefon r :</span> {data.parentsNumber}</p>
          <p><span>Manzili :</span> {data.address}</p>
          <p><span>Fanlar soni :</span> {data.subjects.length} ta</p>
        </div>
      </div>
    </div>
  )
}

export default PupilEdit