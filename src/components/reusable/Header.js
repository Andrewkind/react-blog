import React, { Component } from 'react' //react 
import { Link } from 'react-router-dom'; // Link from react-router-dom

/*
    Header Component : Header for all page
*/
export default class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/">
                    <img className="logo" alt="Rebound" src={require('../../media/snail.png')} /> 
                </Link>
             
            </header> 
        )
    }
}
