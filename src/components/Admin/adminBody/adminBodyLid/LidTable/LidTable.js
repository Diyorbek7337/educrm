import React,{useState} from "react";
import "./lidTable.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from 'react-router-dom'
import TableData from "./TableData/TableData";

import { useTheme } from "../../../../context/ThemeContext";

import Childrenmodal from "./LidModal/Childrenmodal";
import { useModal } from "../../../../context/Addmodal";
 

function LidTable() {

  const {isNightMode} = useTheme()

  const {handleShow} = useModal()
  
  const [showTableData] = useState(true);




  

  return (
    <div className="lidTable">
      <div className={isNightMode ? 'lidTableHeader': 'lidTableHeader dark'}>
        <div className="lidBreadCrumb">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Lidlar</Breadcrumb.Item>
            <Breadcrumb.Item active><Link to='.'>Lidlar ro'yhati</Link></Breadcrumb.Item>
            {
              !showTableData && (
                <Breadcrumb.Item active >Lid qo'shish</Breadcrumb.Item>
                
              )
            }
          </Breadcrumb>
          
        </div>
        {
          showTableData ? 
            <div className="lidAddButton">
          
            <span  role="button" onClick={handleShow} className={isNightMode ? "addLid" : "addLid dark"}>+ Lid qo'shish</span>
            
            <Childrenmodal/>
            
          </div>
          :
          null
        }
      </div>
      <TableData /> 
    </div>
  );
}

export default LidTable;
