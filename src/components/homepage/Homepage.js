import React from 'react';
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';
import { connect } from 'react-redux';
import BlogPost from './BlogPost';
import { FaGithubSquare, FaTwitterSquare, FaEnvelopeSquare } from 'react-icons/fa';
import Header from '../reusable/Header';
import Nav from '../reusable/Nav';
import Footer from '../reusable/Footer';

/*
  App Component
  App component holds the children components that make the 
  content of the page loaded
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

    // Font Awesome Element
    const githubIcon = <FaGithubSquare className="icon follow-icon" />
    const twitterIcon = <FaTwitterSquare className="icon follow-icon" />
    const emailIcon = <FaEnvelopeSquare className="icon follow-icon" />

    return (
      <>
        {/* Header holds the logo on left
            Nav holds links on right
        */}
        <span className="header-nav">
          <Header />
          <Nav />
        </span>

        {/* Nav has our navigation links */}
        {/* Main contains the blogs */}


        {/* Author info block */}

        {/* Avatar Photo */}
        <img className="avatar" alt="Rebound" src={require('../../media/barney.jpg')} />

        {/* Author Name */}
        <p className="author-p">Barney Anderson</p>

        {/*Follow Icons */}
        <span className="follow-span">
          {githubIcon}
          {twitterIcon}
          {emailIcon}
        </span>

        {/* Blog Posts */}
        <ul className="blogs-ul">
          {this.props.blogPosts.map(blogPost => (
            <BlogPost
              key={blogPost.uniqueId}
              uniqueId={blogPost.uniqueId}
              blogContent={blogPost.blogContent}
              blogTitle={blogPost.blogTitle}
            />
          ))}
        </ul>

        <Footer />
      </>
    );
  }
}
export default connect(
  state => { return { blogPosts: state } },
)(Homepage);
