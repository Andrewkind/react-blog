import React from 'react'; //react 

// Import CSS
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';

import { connect } from 'react-redux'; // Connect
import BlogPost from './BlogPost'; // BlogPost component
import { FaGithubSquare, FaTwitterSquare, FaEnvelopeSquare } from 'react-icons/fa'; // Import React-Icons

// Import Reusable
import Header from '../reusable/Header';
import Nav from '../reusable/Nav';
import Footer from '../reusable/Footer';


/*
    HomePage Component: Display Main Page
*/

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  updateItem(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const path = this.props.location.pathname;
    let id;
    if (path !== "/") {
      //we have query string
      var query = path.replace("/", "");
      query = query.replace("share/", "");
      id = query.replace("$Blog=", "");
    }
    // Font Awesome Element
    const githubIcon = <FaGithubSquare className="icon follow-icon" />
    const twitterIcon = <FaTwitterSquare className="icon follow-icon" />
    const emailIcon = <FaEnvelopeSquare className="icon follow-icon" />

    var refinedBlogPosts = this.props.blogPosts;
    // Check if we used query string to share only one post
    if (id !== undefined) {
      refinedBlogPosts = refinedBlogPosts.filter(function (obj) {
        return obj.uniqueId === id;
      });
    }
    
    return (
      <>
        {/* Header holds the logo on left
            Nav holds links on right
        */}
        <span className="header-nav">
          <Header /> {/* Header */}
          <Nav /> {/* Navigation */}
        </span>
        {/* Nav has our navigation links */}
        {/* Main contains the blogs */}
        {/* Author info block */}
        <span className="info-block">
          {/* Avatar Photo */}
          <img className="avatar" alt="Rebound" src={require('../../media/avatar.jpg')} />
          {/* Author Name */}
          <p className="author-p">Mr. Bruce Wayne</p>
          {/*Follow Icons */}
          <span className="follow-span">
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" > {githubIcon} </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" > {twitterIcon} </a>
            <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer" > {emailIcon} </a>
          </span>
        </span>
        {/* Blog Posts */}
        <ul className="blogs-ul">
          {refinedBlogPosts.slice().reverse().map((blogPost, index) => (
            <BlogPost
              last={index + 1 < refinedBlogPosts.length}
              key={blogPost.uniqueId}
              uniqueId={blogPost.uniqueId}
              blogContent={blogPost.blogContent}
              blogTitle={blogPost.blogTitle}
              blogTopics={blogPost.blogTopics}
              blogDate={blogPost.blogDate}
            />
          ))}
        </ul>
        <Footer /> {/* Footer */}
      </>
    );
  }
}

export default connect(
  state => { return { blogPosts: state } },
)(Homepage);
