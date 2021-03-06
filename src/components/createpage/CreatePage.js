import React, { Component } from 'react' // react
import { addBlogPost, login } from '../../actions/blogposts'; // actions
import { connect } from 'react-redux'; // connect

// Import reusable
import Nav from '../reusable/Nav'; // nav
import Header from '../reusable/Header'; // header
import Footer from '../reusable/Footer'; // footer

// Import CSS
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';
import '../../css/createblog.css';

/*
    CreatePage Component
    Main component to display the create-new-blog page.
*/
class CreatePage extends Component {
    constructor(props) {
        super(props)
        let date = new Date(); // Date
        let day = date.getDate() // Today
        let month = date.getMonth() + 1; //Current Month
        let year = date.getFullYear();        //Current Year
        let newDate = month + '/' + day + '/' + year; //  02/04/2020

        this.state = {
            blogPost: "",
            blogTitle: "",
            blogTopics: "",
            blogDate: newDate // Set date immediately
        }

        // Check if user is logged in.
        let loggedIn = this.props.blogPosts.loggedIn

        if (!loggedIn) {
            // we are not logged in. Do not allow
            window.location.href = "/";
        }
    }

    /*
  AddBlogPost method
  parameter: event -> Disable the default behaviour
  */
    addBlogPost = (event) => {
        event.preventDefault(); // Stop the page from reloading.

        let loggedIn = this.props.blogPosts.loggedIn

        if (!loggedIn) {
            // we are not logged in. Do not allow?
            alert("You are not logged in!");
            window.location.href = "/";
        }

        // Create blog object
        const blog = {
            blogContent: this.state.blogPost,
            blogTitle: this.state.blogTitle,
            blogTopics: this.state.blogTopics,
            blogDate: this.state.blogDate
        };

        // Add
        this.props.dispatch(addBlogPost(blog));

        // Clear the field for new input.
        // Use our pre-formatted method.
        this.updateItem('blogPost', '');
        this.updateItem('blogTitle', '');
        this.updateItem('blogTopics', '');
        this.updateItem('blogDate', '');



        if (loggedIn) {
            this.props.dispatch(login());
        }
        this.props.history.replace({ pathname: `/` })
    }

    updateItem(key, value) {
        this.setState({ [key]: value });
    }

    render() {

        return (
            <>
                <span className="header-nav">
                    <Header />
                    <Nav />
                </span>
                <h1>New Blog</h1>
                <form onSubmit={this.addBlogPost}>
                    <label className="blog-date" htmlFor="date-text"> Blog Date:</label>
                    <input type="text"
                        name="date-text"
                        id="date-text"
                        title = "date text"
                        required
                        disabled
                        value={this.state.blogDate}
                        onChange={event => this.doNothing}
                    />
                    <label className="new-blog-Title" htmlFor="blogTitle" >Blog Title:</label>
                    <input
                        className="blog-title"
                        type="text"
                        name="blogTitle"
                        id="blogTitle"
                        title = "blog title"
                        required
                        value={this.state.blogTitle}
                        onChange={event => this.updateItem('blogTitle', event.target.value)}
                    />
                    <label className="new-blog-Topics" htmlFor="blogTopic"> Blog Topics:</label>
                    <input className="blog-Topics"
                        type="text"
                        name="blogTopics"
                        id="blogTopics"
                        title= "blog topics"
                        value={this.state.blogTopics}
                        onChange={event => this.updateItem('blogTopics', event.target.value)}
                    />
                    <label className="new-blog-label" htmlFor="blogPost">
                        Enter a new Blog-Post:
                         </label>

                    {/* Photo Hint */}
                    <details>
                        Use ##[filename](caption) to add a photo! <p className="photo-example"> ##[bird.jpg](a bird!)</p>

                             <summary>
                            Add photos?
                             </summary>
                    </details>
                    <textarea
                        className="blog-content"
                        type="textarea"
                        name="blogPost"
                        id="blogPost"
                        title = "blog post"
                        value={this.state.blogPost}
                        onChange={event => this.updateItem('blogPost', event.target.value)}>
                    </textarea>
                    <input className="submit-button add-button" type="submit" value="Add Blog!" />
                </form>
                <Footer />
            </>
        )
    }
}

export default connect(
    state => { return { blogPosts: state } },
)(CreatePage); // Name of the component (in this case: CreatePage)