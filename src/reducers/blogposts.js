import { v4 as uuidv4 } from 'uuid'; // uuid
/**
 * Redux Reducer
 * A reducer will actually carry out the manipulation/mutation on the
 * state data. It should expect an "action" to be passed in with any
 * necessary target data to perform its duty.
 */
const blogPostReducer = (state = [], action) => { // Default state is an empty array here.
  switch (action.type) {
    // What happens if we are adding a new BlogPost:
    case 'ADD_BLOG_POST':
      var uniqueId;
      // check If uniqueId is not undefined
      if (action.uniqueId !== undefined) {
        uniqueId = action.uniqueId // store the uniqueId into variable
      }
      else {
        uniqueId = uuidv4(); // If uniqueId is undefined then generate the uniqueId 
      }
      const newBlogPost = {
        uniqueId: uniqueId, // Ensure a unique ID.
        blogContent: action.blogContent, // Read passed-in "new blogContent" value.
        blogTitle: action.blogTitle,// Read passed-in "new blogTitle" value.
        blogTopics: action.blogTopics,// Read passed-in "new blogTopics" value.
        blogDate: action.blogDate // Read passed-in "new blogDate" value.
      };
      // Create a new array (with the same contents as the original.)
      const updatedState = state.slice();
      updatedState.push(newBlogPost);
      // save to localstorage
      localStorage.setItem("blogs", JSON.stringify(updatedState));
      // Return the updated state value.
      return updatedState;
    // What happens if we are removing an existing blog:
    case 'REMOVE_BLOG_POST':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state = state.filter(blogPost => blogPost.uniqueId !== action.value); // We'll have an array without the target!
      //remove from persistant
      localStorage.setItem("blogs", JSON.stringify(state));
      return state;
    case 'MODIFY_BLOG_POST':
      let id = action.uniqueId 
      let newContent = action.blogContent 
      let index = state.findIndex(el => el.uniqueId === id)
      let blogs = state.filter(blogPost => blogPost.uniqueId === id);
      let blog = blogs[0];
      blog.blogContent = newContent;
      blog.blogTopics = action.blogTopics;
      blog.blogTitle = action.blogTitle;
      state.splice(index, 1); // remove 
      state.splice(index, 0, blog); // add new
      //remove from persistant
      localStorage.setItem("blogs", JSON.stringify(state));
      return state;
    case 'LOG_IN':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state.loggedIn = action.value;
      // Return the updated state value.
      let loggedIn = { loggedIn: action.value }
      //remove from persistant
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      return state;
    case 'LOG_OUT':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state.loggedIn = action.value;
      // Return the updated state value.
      let loggedOut = { loggedIn: action.value }
      //remove from persistant
      localStorage.setItem("loggedIn", JSON.stringify(loggedOut));
      return state;
    case 'UPDATE_PASSWORD':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state.password = action.value;
      let password = { password: action.value }
      state.password = action.value
      localStorage.setItem("password", JSON.stringify(password));
      return state;
    case 'UPDATE_USERNAME':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state.username = action.value;
      // Return the updated state value.
      let username = { username: action.value }
      //remove from persistant
      localStorage.setItem("username", JSON.stringify(username));
      return state;
    default:
      return state;
  }
}

export default blogPostReducer;
