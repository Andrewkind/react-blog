/**
 * Redux Actions
 * Actions are "labels" for what type of functionality/manipulation
 * we will be performing/allowing on our global state data.
 * The action "names" ('type' property values), by convention, are
 * uppercase as they are representing a "constant" value.
 */
const addBlogPost = (blog ) => {
  return {
    type: 'ADD_BLOG_POST', // Our action "label."
    blogContent: blog.blogContent,
    blogTitle: blog.blogTitle// We can also transport necessary info that the reducer might need.
  }
}
const removeBlogPost = blogPostId => {
  return {
    type: 'REMOVE_BLOG_POST', // Our action "label."
    value: blogPostId // For removal, we need a unique identifier.
  }
}


export { addBlogPost, removeBlogPost};
