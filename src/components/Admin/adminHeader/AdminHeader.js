import React, { useEffect } from 'react'
import './adminheader.css'
import UserImg from '../../../image/user.png'
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from '../../context/ThemeContext';



function AdminHeader() {


    const { isNightMode, toggleNightMode } = useTheme()

    useEffect(() => {
        // Update local storage when the mode changes
        localStorage.setItem('nightMode', isNightMode);
    }, [isNightMode]);



    return (
        <div className={isNightMode ? 'adminHeaderBox' : 'adminHeaderBox dark'}>
            <div className='adminHeader'>
                <div className='leftHeaderBox'>
                    <div className='logo'>
                        <h1>EduMe</h1>
                    </div>

                </div>
                <div className='rightHeaderBox'>
                    <div className='user'>
                        <button className='rejim' onClick={toggleNightMode}>
                            {isNightMode
                                ? <FaSun className='sun' />
                                : <FaMoon className='moon' />}
                        </button>
                        <div className='user__info'>
                            <div className='userImg'>
                                <img src={UserImg} alt='user' />
                            </div>
                            <div className='userInfo'>
                                <h2>Abdiqayumov Diyorbek</h2>
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader