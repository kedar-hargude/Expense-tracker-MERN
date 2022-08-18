import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from 'react-dark-mode-toggle';

import { MyAuthContext } from "../../context/auth-context";
import { DarkThemeContext } from "../../context/darkTheme-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

export default function NavLinks(){

    const auth = useContext(MyAuthContext);
    const darkTheme = useContext(DarkThemeContext);

    return(
        <ul className="nav-links">

            <li className="center">
                {/* <button onClick={darkTheme.darkThemeToggle} className='theme-toggle--btn'>Change Theme</button> */}
                <DarkModeToggle onChange={darkTheme.darkThemeToggle} checked={darkTheme.isDarkMode} size={80} />
            </li>

            <li>
                <NavLink to='/' exact='true'>Dashboard</NavLink>
            </li>

            {auth.isLoggedIn && <li>
                <NavLink className='icon-container' to='/expenses' >
                    Expenses
                </NavLink>
            </li>}

            {auth.isLoggedIn && <li>
                <NavLink to='/settings'>Settings</NavLink>
            </li>}

            {!auth.isLoggedIn && <li>
                <NavLink to='/auth'>Authenticate</NavLink>
            </li>}

            {auth.isLoggedIn && 
                <li>
                    {/* <button onClick={auth.logout}>LOGOUT</button> */}
                    <Button 
                    onClick={auth.logout}
                    danger
                    >Logout</Button>
                </li>}

        </ul>
    )
}