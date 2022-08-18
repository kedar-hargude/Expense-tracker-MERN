import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { MyAuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

export default function NavLinks(){

    const auth = useContext(MyAuthContext);

    return(
        <ul className="nav-links">
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