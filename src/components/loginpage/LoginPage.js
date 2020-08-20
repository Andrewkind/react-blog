import React, { Component } from 'react' //react
import { login } from '../../actions/blogposts'; //action
import { connect } from 'react-redux'; // Connect

// Import Reusable
import Nav from '../reusable/Nav';
import Header from '../reusable/Header';
import Footer from '../reusable/Footer';

// Import CSS
import '../../css/reset.css';
import '../../css/login.css';
import '../../css/styles.css';
import '../../css/color.css';

/*
    LoginPage Component
    Main component to display the Login page.
*/
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      showError : false
    }
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const PASS_WORD = this.props.blogPosts.password.toLowerCase(); //grab the password using props and convert into lower case
    const USER_NAME = this.props.blogPosts.username.toLowerCase(); //grab the UserName using props and convert into lower case
    // Match the UserName and Password
    if (PASS_WORD === this.state.password.trim().toLowerCase() && USER_NAME === this.state.username.trim().toLowerCase()) {
      // log user in
      this.props.dispatch(login());
     // updateItem("showError", false);
      this.props.history.replace({ pathname: `/` })
    }
    else {
      this.updateItem("showError", true);
      
    }
  }

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
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="userName" htmlFor="user-Name"> Username:</label>
          <input type="text"
          title = "username"
            autoFocus
            value={this.props.username}
            onChange={event => this.updateItem('username', event.target.value)}
          />

          <label className="password" htmlFor="user-Password"> Password:</label>
          <input type="password"
          title = "password"
            value={this.props.password}
            onChange={event => this.updateItem('password', event.target.value)}
          />
          {errorMessage}
          <input className="submit-button login-button" type="submit" value="Login" />

        </form>
        <Footer sticky="true" /> {/* Footer */}
      </>
    )
  }
}

export default connect(
  state => { return { blogPosts: state } },
)(LoginPage); 