import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header>

                {/*  <label className="header-label">REBOUND</label> */}

                <Link to="/"> 
                
                <img className="logo" alt="Rebound" src={require('../../media/snail.png')} />

                </Link>
                
            </header>
        )
    }
}
