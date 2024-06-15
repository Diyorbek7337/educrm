import React from 'react';
import './Pupil.css'

function AddGroup({data}) {
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
          <p><span>Fan nomi :</span> {data.subject.name}</p>
        </div>
      </div>
    </div>
  )
}

export default AddGroup