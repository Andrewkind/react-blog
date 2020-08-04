import { v4 as uuidv4 } from 'uuid';

/**
 * Redux Reducer
 * A reducer will actually carry out the manipulation/mutation on the
 * state data. It should expect an "action" to be passed in with any
 * necessary target data to perform its duty.
 */
const blogPostReducer = (state = [], action) => { // Default state is an empty array here.
  switch (action.type) {
    // What happens if we are adding a new to-do:
    case 'ADD_BLOG_POST':
      // Set up new task.

      const newBlogPost = {
        uniqueId: uuidv4(), // Ensure a unique ID.
        blogContent: action.blogContent,
        blogTitle : action.blogTitle // Read passed-in "new to-do" value.
      };
      // Create a new array (with the same contents as the original.)
      const updatedState = state.slice();
      // Add this task to the state.
      updatedState.push(newBlogPost);
      // Return the updated state value.
      return updatedState;
    // What happens if we are removing an existing to-do:
    case 'REMOVE_BLOG_POST':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state = state.filter(blogPost => blogPost.uniqueId !== action.value); // We'll have an array without the target!
      // Return the updated state value.
      return state;
    default:
      return state;

  }
}

export default blogPostReducer;
