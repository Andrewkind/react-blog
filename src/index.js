import React from 'react'; // react
import PropTypes from 'prop-types'; //PropTypes
import HomePage from './components/homepage/Homepage'; // HomePage Component
import { addBlogPost, updateUsername, updatePassword, login, logout } from './actions/blogposts'; //action
import blogPostReducer from './reducers/blogposts'; //reducer

// Import Components 
import LoginPage from './components/loginpage/LoginPage'; //Login Page
import Settings from './components/settingspage/SettingsPage'; // Settings Page
import EditPage from './components/editpage/EditPage'; // Edit Page
import CreatePage from './components/createpage/CreatePage'; // CreatePage

import { createStore } from 'redux'; // createStore (redux)
import { Provider } from 'react-redux'; // Provider (react-redux)
import { BrowserRouter as Router, Route } from 'react-router-dom'; // router
import { render } from '@testing-library/react'; // render

import './css/fonts.css';


/**
 * Redux Store.
 * Store is the full representation of our state. It is a complex object that
 * keeps track of the state data, and will help us operate on it using defined
 * reducers/actions.
 */


// This is to clear ALL blogs from your system!
// *WARNING: This will clear all local storage in your browser! 
// Set to true to clear data, recompile, then set back to false.
const CLEAR_DATA = false;


// Main store for server
const store = createStore(blogPostReducer);

// Attempt to output, see if we're getting an error.
//store.subscribe(() => console.log(store.getState())); // Outputs each time a change occurs (subscribe watches for changes.)

// Data clear
if (CLEAR_DATA) {
  localStorage.clear();
}

// Check for persistance data in localstorage
let data = JSON.parse(localStorage.getItem("blogs"));
let password = JSON.parse(localStorage.getItem("password"));
let username = JSON.parse(localStorage.getItem("username"));
let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

if (data != null && data.length > 0) {
  for (let i = 0; i < data.length; i++) {
    let blog = data[i];
    store.dispatch(addBlogPost(blog));
  }
  // Check if we have username and password stored
  if (password === undefined) {
    // we have no user name
    username = "admin";
    password = "admin";
    store.dispatch(updateUsername(username.username)); // dispatch username with admin value
    store.dispatch(updatePassword(password.password)); // dispatch password with admin value
  }
  else {
    store.dispatch(updateUsername(username.username));
    store.dispatch(updatePassword(password.password));
  }

  if (loggedIn === undefined || loggedIn === null) {
    store.dispatch(logout());
  }
  else {
    if (loggedIn.loggedIn === true) { // check the loggedIn value If its true...
      store.dispatch(login()); //  Log the admin in
    }
    else {
      store.dispatch(logout()); //  Logout admin 
    }
  }
}
else {

  // Blogs to seed a first-start server
  const blog2 = { blogContent: "Congratulations on your first blog! Here is a picture of a bird encounter: ##[bird.jpg](This bird is crazy!) Can't forget the cat tax. Here is a photo of Mona... ##[mona.jpg](Such a lovely face.) Just for kicks here are some more photos to show off the photo feature! ##[bug.jpg](Ooh trees!) And since we are here, we might as well show a drawing of the neighbour's dog! He's a yapper but he's chill. ##[birds.jpg](Barney is happy!) Well I hope you enjoyed the photos. Gotta go, take care!", blogTitle: "Welcome", blogDate: "08/07/2020", blogTopics: "#welcome #hello #world" };

  const starWarsBlog = {
    blogContent: "Star Wars is an American epic space-opera  media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became  a worldwide pop-culture phenomenon. The franchise has been expanded into various films and other media, including television series, video games, novels, comic books, theme park attractions, and themed areas, comprising an all-encompassing fictional universe. ##[starwars.jpg](Episode 1 Poster) The original film, retroactively subtitled Episode IV: A New Hope, was followed by the sequels Episode V: The Empire Strikes Back and Episode VI: Return of the Jedi, forming the original Star Wars trilogy. The subsequently produced sequel trilogy consists of Episode VII: The Force Awakens, Episode VIII: The Last Jedi and Episode IX: The Rise of Skywalker. Together, the three trilogies form what has been referred to as the \"Skywalker saga\". All nine films were nominated for Academy Awards and were commercially successful.  ##[jarjar.jpg](Sith?)   Spacecraft range from small starfighters, to huge capital ships such as the Star Destroyers, to space stations such as the moon-sized Death Stars. Telecommunication includes two-way audio and audiovisual screens, and holographic projections..",
    blogTitle: "A long time ago...", blogDate: "08/09/2020", blogTopics: "#starwars #jarjar #sith"
  }

  // Add to store / storage
  store.dispatch(addBlogPost(blog2)); 
  store.dispatch(addBlogPost(starWarsBlog)); 

  // Set up Admin settings
  let newUsername = "admin";
  let newPassword = "admin";
  store.dispatch(updateUsername(newUsername));
  store.dispatch(updatePassword(newPassword));
}
// Set up a "root" for our Router.
const Root = (store) => (
  <Provider store={store.store}>
    <Router>
      <Route path="/" component={HomePage} exact /> {/* Navigate HomePage */}
      <Route path="/admin" component={CreatePage} exact /> {/* Navigate CreatePage */}
      <Route path="/create" component={CreatePage} exact />
      <Route path="/login" component={LoginPage} exact /> {/* Navigate Login Page */}
      <Route path="/share" component={HomePage} /> {/* Share Link and Navigate to HomePage  */}
      <Route path="/settings" component={Settings} /> {/* Navigate settings Page*/}
      <Route path="/edit" component={EditPage} /> {/* Navigate EditPage*/}
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

// Render the route-enabled configuration.
render(
  <Root store={store} />,
  document.getElementById('root')
);


