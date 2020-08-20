import React, { Component } from 'react' // react
import { login, modifyBlogPost } from '../../actions/blogposts'; //action
import { connect } from 'react-redux'; //connect

// Import reusable
import Nav from '../reusable/Nav';//Nav
import Footer from '../reusable/Footer';//Footer
import Header from '../reusable/Header';//Header

// Import CSS 
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';
import '../../css/createblog.css';

/*
    EditPage Component
    Admin can edit existing blog using this component.
*/
class EditPage extends Component {
    constructor(props) {
        super(props)
        let date = new Date(); // Date
        let day = date.getDate() // Today
        let month = date.getMonth() + 1; //Current Month
        let year = date.getFullYear(); //Current Year
        let newDate = month + '/' + day + '/' + year; //  02/04/2020

        let path = this.props.location.pathname;
        let id;
     
        if (path !== "/") {
            //we have query string
            let query = path.replace("/", "");
            query = query.replace("edit/", "");
            id = query.replace("$Blog=", "");
        }

        let refinedBlogPosts = this.props.blogPosts;
        
        refinedBlogPosts = refinedBlogPosts.filter(function (obj) {
            return obj.uniqueId === id;
        });

        const blog = refinedBlogPosts[0];
        const blogText = blog.blogContent;

        this.state = {
            blogContent: blogText,
            blogTitle: blog.blogTitle,
            blogTopics: blog.blogTopics,
            blogDate: newDate, // Set date immediately
            uniqueId: id
        }

        // Check if admin is logged in
        let loggedIn = this.props.blogPosts.loggedIn

        if (!loggedIn) {
            // we are not logged in. Do not allow
            window.location.href = "/";
        }
    }

    /*
    modifyBlogPost method
    parameter: event -> Disable the default behaviour
    modify the existing blog
    */
    modifyBlogPost = (event) => {

        event.preventDefault(); // Stop the page from reloading.

        const blog = {
            blogContent: this.state.blogContent,
            blogTitle: this.state.blogTitle,
            blogTopics: this.state.blogTopics,
            blogDate: this.state.blogDate,
            uniqueId: this.state.uniqueId
        };

        let loggedIn = this.props.blogPosts.loggedIn
        // Dispatch an action(modify)
        this.props.dispatch(modifyBlogPost(blog));
        // Clear the field for new input.
        // Use our pre-formatted method.
        this.updateItem('blogPost', '');
        this.updateItem('blogTitle', '');
        this.updateItem('blogTopics', '');
        this.updateItem('blogDate', '');

        if (loggedIn) {
             // check if loggedIn 
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
                    <Header /> {/* Header */}
                    <Nav /> {/* Navigation */}
                </span>
                <h1>Edit Blog</h1>
                <form onSubmit={this.modifyBlogPost}>
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
                        title = "blog topics"
                        value={this.state.blogTopics}
                        onChange={event => this.updateItem('blogTopics', event.target.value)}
                    />
                    <label className="new-blog-label" htmlFor="blogPost">
                        Enter a new Blog-Post:
                    </label>
                    <textarea
                        className="blog-content"
                        type="textarea"
                        title = "blog content"
                        name="blogPost"
                        id="blogPost"
                        value={this.state.blogContent}
                        onChange={event => this.updateItem('blogContent', event.target.value)}>
                    </textarea>
                   
                    <input className="submit-button edit-button" type="submit" value="Edit" />
                </form>
                <Footer /> {/* Footer */}
            </>
        )
    }
}

export default connect(
    state => { return { blogPosts: state } },
)(EditPage); 