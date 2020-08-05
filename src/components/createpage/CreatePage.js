import React, { Component } from 'react'
import { addBlogPost } from '../../actions/blogposts';
import { connect } from 'react-redux';
import Nav from '../reusable/Nav';
import Header from '../reusable/Header';
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';
import '../../css/createblog.css';

class CreatePage extends Component {

    constructor(props) {
        super(props)

        var date = new Date();
        var day = date.getDate()
        var month = date.getMonth() + 1; //Current Month
        var year = date.getFullYear();        //Current Year
        var newDate = month + '/' + day + '/' + year;

        this.state = {
            blogPost: "",
            blogTitle: "",
            blogTopics: "",
            blogDate: newDate
        }


    }

    addBlogPost = (event) => {

        event.preventDefault(); // Stop the page from reloading.

        const blog = {
            blogContent: this.state.blogPost,
            blogTitle: this.state.blogTitle,
            blogTopics: this.state.blogTopics,
            blogDate: this.state.blogDate
        };
        // Dispatch an action; this one we set to require some "newToDo" text.
        this.props.dispatch(addBlogPost(blog));

        // Clear the field for new input.
        // this.setState( { "newToDo": "" } ); // Do it the ol' fashioned way.
        this.updateItem('blogPost', ''); // Or use our pre-formatted method.
        this.updateItem('blogTitle', ''); // Or use our pre-formatted method.
        this.updateItem('blogTopics', '');
        this.updateItem('blogDate', '');


        this.test();
        //Make sure to update date every time we render
        //   var date = new Date();
        //   var day = date.getDate()
        //   var month = date.getMonth() + 1; //Current Month
        //   var year = date.getFullYear();        //Current Year
        //   var newDate = month + '/' + day + '/' + year;
        //   this.updateItem('blogDate', newDate);

        //   window.location = '/';

    }

    updateItem(key, value) {
        // We never re-assign the contents of this.state.
        // this.state is ONLY USED FOR READING VALUES, NOT writing.
        // When we need to update anything in state, we need to use this.setState()
        // this.setState() triggers the render() method, so we can see updated state info in our presentation.
        this.setState({ [key]: value });
    }


    test() {
        let jsonData = require('./test.json');

        console.log(jsonData);

        const fs = require('fs');

        let student = {
            name: 'Mike',
            age: 23,
            gender: 'Male',
            department: 'English',
            car: 'Honda'
        };

        let data = JSON.stringify(student, null, 2);
        fs.writeFileSync('student-2.json', data);
    }

    render() {

        // Update date


        return (
            <>
                <span className="header-nav">
                    <Header />
                    <Nav />
                </span>

                <form onSubmit={this.addBlogPost}>

                    <label className="blog-date" htmlFor="date-text"> Blog Date :</label>
                    <input type="text"
                        name="date-text"
                        id="date-text"
                        required
                        value={this.state.blogDate}
                        onChange={event => this.updateItem('blogDate', event.target.value)}
                    />
                    <label className="new-blog-Title" htmlFor="blogTitle" >Blog Title:</label>
                    <input
                        className="blog-title"
                        type="text"
                        name="blogTitle"
                        id="blogTitle"
                        required
                        value={this.state.blogTitle}
                        onChange={event => this.updateItem('blogTitle', event.target.value)}
                    />
                    <label className="new-blog-Topics" htmlFor="blogTopic"> Blog Topics:</label>
                    <input className="blog-Topics"
                        type="text"
                        name="blogTopics"
                        id="blogTopics"
                        value={this.state.blogTopics}
                        onChange={event => this.updateItem('blogTopics', event.target.value)} />


                    <label className="new-blog-label" htmlFor="blogPost">
                        Enter a new Blog-Post:
                         </label>
                    <textarea
                        className="blog-content"
                        type="textarea"
                        name="blogPost"
                        id="blogPost"
                        value={this.state.blogPost}
                        onChange={event => this.updateItem('blogPost', event.target.value)}
                    >test</textarea>
                    <input className="submit-button" type="submit" value="Add New BlogPost" />

                </form>

            </>
        )
    }
}

export default connect(
    // First argument is a "mapStateToProps" method.
    // We need to tell react-redux what prop names in
    // our component should link up to our redux state.
    // We are formatting redux state ("state") to
    // a prop in our component called:
    //                    "this.props.toDos"
    state => { return { blogposts: state } },
)(CreatePage); // Name of the component (in this case: App.)