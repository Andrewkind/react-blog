import React from 'react';
import PropTypes from 'prop-types';
import HomePage from './components/homepage/Homepage';
import { addBlogPost} from './actions/blogposts';
import blogPostReducer from './reducers/blogposts';
import CreatePage from './components/createpage/CreatePage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

const store = createStore (blogPostReducer);

// Attempt to output, see if we're getting an error.
store.subscribe( () => console.log( store.getState() ) ); // Outputs each time a change occurs (subcribe watches for changes.)

/**
 * Redux Dispatch
 * Dispatch is used for us to send commands for mutation/manipulation/reads from
 * our store/state data.
 */

//const blog2 = {blogContent: "I'm baby humblebrag brunch hammock forage. Marfa tumblr twee glossier PBR&B succulents before they sold out bitters paleo adaptogen vegan disrupt keffiyeh. Forage intelligentsia live-edge 90's salvia, cloud bread brooklyn quinoa mlkshk chicharrones swag thundercats tbh skateboard lo-fi. VHS meh crucifix, subway tile freegan sustainable hella helvetica shaman echo park hot chicken hashtag viral. Selvage craft beer raclette yr, kitsch intelligentsia pinterest artisan portland VHS swag bitters.This is the first paragraph. Here is a photo....(test)[http://www.google.com]Now is some more text.  A new paragraph is coming up. \n \n  Ok we are done for now. Hell of stumptown bushwick, vice drinking vinegar kickstarter twee slow-carb venmo. Meh locavore jean shorts ennui mumblecore live-edge. Jean shorts selfies lomo stumptown meh skateboard you  haven't heard of them.  (test)[http://www.google.com]Pickled hashtag single-origin coffee, tacos sartorial small batch kickstarter slow-carb shaman put a bird on it.  Locavore cray dreamcatcher yuccie, seitan squid vice single-origin coffee swag 8-bit biodiesel slow-carb edison bulb narwhal portland. Hexagon seitan la croix photo booth forage fashion axe beard whatever deep v cloud bread chartreuse pitchfork sriracha crucifix aesthetic.", blogTitle : "Coffee. How do you take it?"};
const blog1 = {blogContent: "I'm baby humblebrag brunch hammock forage. Marfa tumblr twee glossier PBR&B succulents before they sold out bitters paleo adaptogen vegan disrupt keffiyeh. Forage intelligentsia live-edge 90's salvia, cloud bread brooklyn quinoa mlkshk chicharrones swag thundercats tbh skateboard lo-fi. VHS meh crucifix, subway tile freegan sustainable hella helvetica shaman echo park hot chicken hashtag viral. Selvage craft beer raclette yr, kitsch intelligentsia pinterest artisan portland VHS swag bitters.This is the first paragraph. Here is a photo....Now is some more text.  A new paragraph is coming up. \n \n  Ok we are done for now. Hell of stumptown bushwick, vice drinking vinegar kickstarter twee slow-carb venmo. Meh locavore jean shorts ennui mumblecore live-edge. Jean shorts selfies lomo stumptown meh skateboard you  haven't heard of them. Pickled hashtag single-origin coffee, tacos sartorial small batch kickstarter slow-carb shaman put a bird on it.  Locavore cray dreamcatcher yuccie, seitan squid vice single-origin coffee swag 8-bit biodiesel slow-carb edison bulb narwhal portland. Hexagon seitan la croix photo booth forage fashion axe beard whatever deep v cloud bread chartreuse pitchfork sriracha crucifix aesthetic.", blogTitle : "Coffee. How do you take it?"};

store.dispatch( addBlogPost( blog1 ) );
store.dispatch( addBlogPost( blog1 ) );
//store.dispatch( addBlogPost( blog1 ) );

// Set up a "root" for our Router.
const Root = (store) => (
  <Provider store={store.store}>
    <Router>
        <Route path="/" component={HomePage} exact />
        <Route path="/admin" component={CreatePage} />
        <Route path="/create" component={CreatePage}/>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}; 

render(
  <Root store={store} />,
  document.getElementById('root')
);