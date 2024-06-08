import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaUserFriends } from 'react-icons/fa'
import { IoSchool } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import './leftsidebar.css'
import { useTheme } from '../../../context/ThemeContext'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from "react-icons/fa6";


function LeftSideBar() {
    const { isNightMode } = useTheme()
    const [changeColor, setChangeColor] = useState(null)
    const handleItemClick = (item) => {
        setChangeColor(item);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function leftSideBarMenu() {
        return (
            <div className={show ? null : "leftMenuBar"} >
                <ul className='leftMenu'>
                    <NavLink to='lid'>
                        <li className='leftMenuItem' onClick={() => {
                            handleItemClick('lid')
                            setShow(false)
                        }}><FaUserFriends className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'} /><span className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'}>Lidlar</span></li>
                    </NavLink>
                    <NavLink to='pupil'>
                        <li className='leftMenuItem' onClick={() => {
                            handleItemClick('pupil')
                            setShow(false)
                        }}><IoSchool className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'} /><span className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'}>O'quvchilar</span></li>
                    </NavLink>
                    <NavLink to='groups'>
                        <li className='leftMenuItem' onClick={() => {
                            handleItemClick('group')
                            setShow(false)
                        }}><FaUsers className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'} /><span className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'}>Guruhlar</span></li>
                    </NavLink>
                </ul>
                <NavLink to='/login'>
                    <div className='leftMenuItem logout__button'><BiLogOut className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'} /> <span className={isNightMode ? 'darkleftColor' : 'darkleftColor dark'}>Chiqish</span></div>
                </NavLink>
            </div>
        )
    }
    return (
        <div className={isNightMode ? 'leftSideBar' : 'leftSideBar dark'}>
            <div className='responsive__hide'>
                <FaBars className={isNightMode ? "responsive__hide-button" : "responsive__hide-button hide__btn-dark"} onClick={handleShow} />
            </div>
            <div className='offcanvas__responsive'>
                <Offcanvas className={isNightMode ? null : "offcanvas__dark"} show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>EduMe</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {leftSideBarMenu()}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            {leftSideBarMenu()}

        </div>
    )
}

export default LeftSideBar