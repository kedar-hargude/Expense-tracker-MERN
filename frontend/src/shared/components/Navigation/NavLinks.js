import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

export default function NavLinks(){

    return(
        <ul className="nav-links">
            <li>
                <NavLink to='/' exact='true'>Dashboard</NavLink>
            </li>
            <li>
                <NavLink to='/expenses' >Expenses</NavLink>
            </li>
            <li>
                <NavLink to='/settings'>Settings</NavLink>
            </li>
        </ul>
    )
}