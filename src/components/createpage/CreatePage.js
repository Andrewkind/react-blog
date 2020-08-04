import React, { Component } from 'react'
import { addBlogPost } from '../../actions/blogposts';
import { connect } from 'react-redux';
import Nav from '../reusable/Nav';
import Header from '../reusable/Header';
import '../../css/reset.css';
import '../../css/styles.css';
import '../../css/color.css';

class CreatePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blogPost: "",
            blogTitle: "",
        }
    }

    addBlogPost = (event) => {

        const blog = { blogContent: this.state.blogPost, blogTitle: this.state.blogTitle };
        event.preventDefault(); // Stop the page from reloading.

        // Dispatch an action; this one we set to require some "newtoDo" text.
        this.props.dispatch(addBlogPost(blog));

        // Clear the field for new input.
        // this.setState( { "newToDo": "" } ); // Do it the ol' fashioned way.
        this.updateItem('blogPost', ''); // Or use our pre-formatted method.
        this.updateItem('blogTitle', ''); // Or use our pre-formatted method.
    }

    updateItem(key, value) {
        // We never re-assign the contents of this.state.
        // this.state is ONLY USED FOR READING VALUES, NOT writing.
        // When we need to update anything in state, we need to use this.setState()
        // this.setState() triggers the render() method, so we can see updated state info in our presentation.
        this.setState({ [key]: value });
    }

    render() {
        return (
            <>
                <span className="header-nav">
                    <Header />
                    <Nav />
                </span>

                <form onSubmit={this.addBlogPost}>
                    <label className="new-blog-label" htmlFor="blogPost">
                        Enter a new "Blog-Post":
                         </label>

                         <textarea
                    className="blog-content"
                    type="textarea"
                    name="blogPost"
                    id="blogPost"
                    
                    value={this.state.blogPost}
                    onChange={event => this.updateItem('blogPost', event.target.value)}
                >test</textarea>

                    <input type="submit" value="Add New BlogPost" />
                    <label className="new-blog-Title" htmlFor="blogTitle" />
                    <input
                        className="blog-title"
                        type="text"
                        name="blogTitle"
                        id="blogTitle"
                        required
                        value={this.state.blogTitle}
                        onChange={event => this.updateItem('blogTitle', event.target.value)}
                    />
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