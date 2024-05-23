import React, { createContext, useState, useContext, useEffect } from "react";
import { useModal } from "../context/Addmodal"


const API_URL = "https://otviz-backend.vercel.app/lids"
const AddDataLid = createContext();

export const useAddDataLid = () => {
  return useContext(AddDataLid)
}


export const AddDataLidProvider = ({ children }) => {






  const { handleClose } = useModal()

  const initialState = {
    name: "",
    surname: "",
    pNumber: "",
    parentsNumber: "",
    address: "",
    about: "",
    born: 0,
    free: "",
    sub1: "",
    sub2: "",
  };


  const [addData, setAddData] = useState(initialState)


  const handleInputChangeDataLid = (e, types) => {
    const { names, value } = e.target;
    setAddData({
      ...addData,
      [types]: value,
    });
  };

  const [PeopleTables, setPeopleTables] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const showWarningMessage = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000); // Hide the warning after 5 seconds
  };

  const showWDeleteMessage = () => {
    setShowDelete(true);
    setTimeout(() => setShowDelete(false), 3000); // Hide the warning after 5 seconds
  };

  const URL = "https://otviz-backend.vercel.app/lids";
  const [loader, setLoader] = useState(true);


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
        setPeopleTables(data)
        console.log(data, "jlhfvkycfycyhfcfcgyc")
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

  }, []);




  async function setdata(e) {
    console.log(addData);
    e.preventDefault(); // Prevent default form submission
    const abortController = new AbortController();
    try {
      const response = await fetch(API_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(addData),
      });

      if (response.ok) {
        handleClose();
        showWarningMessage();
        // Fetch the latest data from the server
        const updatedResponse = await fetch(URL, { signal: abortController.signal });
        const updatedData = await updatedResponse.json();
        setPeopleTables(updatedData);
        setAddData({ ...addData });

      } else {
        console.error('Error sending data to API:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  }

  async function deleteData(id) {
    const abortController = new AbortController();
    await fetch(`https://otviz-backend.vercel.app/lids/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));

    // Fetch the latest data from the server
    const updatedResponse = await fetch(URL, { signal: abortController.signal });
    const updatedData = await updatedResponse.json();
    showWDeleteMessage();
    setPeopleTables(updatedData);
    setAddData(initialState);
  }



  return (
    <AddDataLid.Provider value={{ addData, handleInputChangeDataLid, deleteData, setdata, PeopleTables, loader, showWarning, showDelete }}>
      {children}
    </AddDataLid.Provider>
  );

}