import React, { createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudentContext = () => {
    return useContext(StudentContext)
}

const StudentProvider = ({ children }) => {


const StudentInitialState = {
    status: "",
    duration: "",
    price: "",
    groupName: "",
    jadvalTuri: "",
    lessonsNumber: "",
    weekDays: "",
    startDate: "",
    startTime: "",
    endTime: ""
}

  const [studentData, setStudentData] = useState(StudentInitialState);

  const handleInputChangeDataStudent = (e, types) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [types]: value,
    });
  };


//   const updateStudentData = (data) => {
//     setStudentData(data);
//   };

//   const saveStudentData = async (id) => {
//     const URL = `https://otviz-backend.vercel.app/lids/${id}`;
//     try {
//       const response = await fetch(URL, {
//         method: 'PUT', // yoki 'POST' agar yangi student qo'shmoqchi bo'lsangiz
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentData),
//       });

//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('Error saving data:', error.message);
//       throw error;
//     }
//   };

  return (
    <StudentContext.Provider value={{ studentData, handleInputChangeDataStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
