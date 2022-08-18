import React from "react";

import "./HomePage.css"

export default function HomePage(){
    return (
        <div className="home--container">
            <h1>This is an Expense Tracker App.</h1>
            <p className="desktop">Please Authenticate on the top right to use it!</p>
            <p className="mobile">Please Authenticate, using the left slider to use it!</p>
        </div>
    )
}