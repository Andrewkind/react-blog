import React, { Component } from 'react' // react
import { Link } from 'react-router-dom'; // Link from react-router-dom
import { connect } from 'react-redux'; // connect
import { logout } from '../../actions/blogposts'; // action
 

/*
    Nav Component : Navigation for Create Page/Login Page and Settings Page
*/
class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    // Logout method 
    logout = (event) => {
        //logout
        this.props.dispatch(logout());
        window.location.href = "/";
    }

    render() {
        let path = window.location.pathname.split("/").pop()
        // Link highlighting
        const settingsClass = path === "settings" ? "active header-li" : "header-li"; // Highlight setting Link If user in settings page
        const createClass = path === "create" ? "active header-li" : "header-li"; // Highlight create Link If user in createBlog page
        const loginClass = path === "login" ? "active header-li" : "header-li"; // Highlight create Login If user in Login page
        // This will be handled 
        let loggedIn = false;

        if (this.props.blogPosts !== undefined) {
            if (this.props.blogPosts.loggedIn !== undefined) {
                loggedIn = this.props.blogPosts.loggedIn;
            }
        }

        let navLinks;
        if (loggedIn) { // If Admin is Logged In...can see CreatePage/settingsPage and Logout in Heder
            navLinks = <><li className={createClass}><Link to="/create" > Create</Link></li>
                <li className={settingsClass}><Link to="/settings" >Settings</Link></li>
                <li className="header-li" onClick={this.logout}>Logout</li>
            </>
        }
        else { // If not LoggedIn...(user/Admin) can see Login Option  
            navLinks = <li className={loginClass}><Link to="/login"  >Login</Link></li>
        }
        return (
            <ul className="nav-ul">
                {navLinks}
            </ul>
        )
    }
}

export default connect(
    state => { return { blogPosts: state } },
)(Nav);

