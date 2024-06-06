import React, {createContext, useState, useContext, useEffect} from "react";
import Student from "../json files/student.json";


const SearchPupilContext = createContext();


export const useSearchPupil = () => {
  return useContext(SearchPupilContext)
}
export const SearchPupilProvider = ({children}) => {
   
    const [searchValues, setSearchValues] = useState({
        category1: '',
        category2: '',
        category3: '',
        category4: '',
        category5: '',
        category6: ''
      });
    
      const handleInputChange = (e, category) => {
        const { name, value } = e.target;
        setSearchValues({
          ...searchValues,
          [category]: value.toLowerCase(),
        });
      };
    
    
    
      const filteredResults = [];
    
      if (searchValues.category1) {
        const nameResults = Student.filter((students) =>
          students.name.toLowerCase().includes(searchValues.category1.toLowerCase())
        );
        filteredResults.push(...nameResults);
      }
      
      // Search for category 2 (surname)
      if (searchValues.category2) {
        const surnameResults = Student.filter((students) =>
          students.surname.toLowerCase().includes(searchValues.category2.toLowerCase())
        );
        filteredResults.push(...surnameResults);
      }
      
      // Search for category 3 (raqam)
      if (searchValues.category3) {
        const raqamResults = Student.filter((students) =>
          students.raqam.toLowerCase().includes(searchValues.category3.toLowerCase())
        );
        filteredResults.push(...raqamResults);
      }
      if (searchValues.category4) {
        const ustozResults = Student.filter((students) =>
          students.ustoz.toLowerCase().includes(searchValues.category4.toLowerCase())
        );
        filteredResults.push(...ustozResults);
      }
      if (searchValues.category5) {
        const subjectsResults = Student.filter((students) =>
          students.fanlar.toLowerCase().includes(searchValues.category5.toLowerCase())
        );
        filteredResults.push(...subjectsResults);
      }
      if (searchValues.category6) {
        const tolovResults = Student.filter((students) =>
          students.tolov.toLowerCase().includes(searchValues.category6.toLowerCase())
        );
        filteredResults.push(...tolovResults);
      }
    
    return (
        <SearchPupilContext.Provider value={{searchValues, handleInputChange, filteredResults}}>
        {children}
        </SearchPupilContext.Provider>
           
        
    )
}