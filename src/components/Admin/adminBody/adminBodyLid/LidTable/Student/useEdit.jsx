import React, {useState} from 'react'

function useEdit({data}) {
  console.log(data._id);

    const initialState = {
        name: data.name,
        surname: data.surname,
        pNumber: data.pNumber,
        parentsNumber: data.parentsNumber,
        address: data.address,
        about: data.about,
        born: data.born,
        free: data.free,
        sub1: data.sub1,
        sub2: data.sub2,
      };

    const [addData, setAddData] = useState(initialState);

    const handleInputChangeDataLid = (e, types) => {
      const { names, value } = e.target;
      setAddData({
        ...addData,
        [types]: value,
      });
    };

    async function addLid(e) {
      e.preventDefault();
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(initialState)
        };
        await fetch(`https://otviz-backend.vercel.app/lids/${data._id}`, requestOptions)
         .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }

  return {
    setAddData, handleInputChangeDataLid, initialState, addLid, addData
  }
}

export default useEdit