import React, {useState} from 'react'

function useEdit(data) {

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

    async function addLid() {
        const requestOptions = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addData)
        };
        await fetch(`https://otviz-backend.vercel.app/lids/${data._id}`, requestOptions)
         .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }

  return {
    setAddData, handleInputChangeDataLid, addLid, addData, setAddData
  }
}

export default useEdit