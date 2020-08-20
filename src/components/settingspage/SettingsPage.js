import React from 'react'; //react

//Import Reuseable 
import Nav from '../reusable/Nav';
import Header from '../reusable/Header';
import Footer from '../reusable/Footer';

//Import CSS
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css'; 

import { updatePassword } from '../../actions/blogposts'; //action
import { connect } from 'react-redux'; //connect

/*
    SettingsPage Component : Admin can change the settings (reset Password)
*/
class SettingsPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      newPassword: "",
      currentPassword: "",
      showError : false
    }

    // Check if user is logged in
    let loggedIn = this.props.blogPosts.loggedIn
    if (!loggedIn) {
        // we are not logged in. Do not allow
        window.location.href = "/";
    }
  }

  // Form submit
  // Change username and password
  handleSubmit = (event) => {
    event.preventDefault();

    // New inputs
    let newPassword = this.state.newPassword.trim().toLowerCase();

    let username = this.state.username.trim().toLowerCase();
    let currentPassword = this.state.currentPassword.trim().toLowerCase();

    // Stored Credentials
    const PASS_WORD = this.props.blogPosts.password.toLowerCase();
    const USER_NAME = this.props.blogPosts.username.toLowerCase();

    // Verify if credentials match
    if (username === USER_NAME && currentPassword === PASS_WORD) {
      //validated
      this.props.dispatch(updatePassword(newPassword));
      this.props.history.replace({ pathname: `/`})
    }
    else {
      this.updateItem("showError", true);
    }
  }

  // Update State Method
  updateItem(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    let errorMessage;
    if (this.state.showError) {
      errorMessage = <label className="error-message">Error: Incorrect username or password.</label>
    }
    else {
      errorMessage = <> </>;
    }
    return (
      <>
        <span className="header-nav">
          <Header /> {/* Header */}
          <Nav /> {/* Navigation */}
        </span>
        <h1>Settings Page</h1>

        {/* Password / Username Change Form */}
        <form onSubmit={this.handleSubmit}>
          <label className="username" htmlFor="username"> Current Username</label>
          <input type="text"
            autoFocus
            value={this.props.username}
            onChange={event => this.updateItem('username', event.target.value)}
          />
          <label className="current-password" htmlFor="new-Password"> Current Password :</label>
          <input type="text"
            value={this.props.currentPassword}
            onChange={event => this.updateItem('currentPassword', event.target.value)}
          />
          <label className="confirm-password" htmlFor="new-Password"> New Password :</label>
          <input type="text"
            value={this.props.newPassword}
            onChange={event => this.updateItem('newPassword', event.target.value)}
          />
                   {errorMessage}
          <input className="submit-button reset-button" type="submit" value="Reset Password" />
 
        </form>
     
        <Footer sticky="true"/> {/* Footer */}
      </>
    )
  }
}

export default connect(
  state => { return { blogPosts: state } },
)(SettingsPage); 