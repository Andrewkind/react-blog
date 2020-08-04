import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Nav extends Component {
    render() {

        // This will be handled 
        const loggedIn = true;

        let message;
        if (loggedIn) {
            message = <><li className="header-li"><Link to="/create"> Create</Link></li>
                <li className="header-li"><Link to="/admin">Settings</Link></li>
                <li className="header-li"><Link to="/logout">Logout</Link></li>
            </>
        }
        else {
            message = <li className="header-li"><Link to="/login">Login</Link></li>
        }
        return (
            <ul className="nav-ul">
                {message}
            </ul>
        )
    }
}
