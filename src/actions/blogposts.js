/**
 * Redux Actions
    Main Actions
     */

/*
  Adds a blog post to our storage
  parameter blog: object
*/
const addBlogPost = (blog) => {
  return {
    type: 'ADD_BLOG_POST', 
    blogContent: blog.blogContent,
    blogTitle: blog.blogTitle,
    blogTopics: blog.blogTopics,
    blogDate: blog.blogDate,
    uniqueId: blog.uniqueId,
  }
}

/*
  Removes a blog post from our storage
  parameter blogPostId: unique Id to delete
*/
const removeBlogPost = blogPostId => {
  return {
    type: 'REMOVE_BLOG_POST', 
    value: blogPostId
  }
}

/*
  Modify a blog post already in our system
  parameter blog: blog object to be updated
*/
const modifyBlogPost = (blog) => {
  return {
    type: 'MODIFY_BLOG_POST', 
    blogContent: blog.blogContent,
    blogTitle: blog.blogTitle,
    blogTopics: blog.blogTopics,
    uniqueId: blog.uniqueId,
  }
}

/*
  Log the admin in
  */
const login = () => {
  return {
    type: 'LOG_IN', 
    value: true 
  }
}

/*
  Log the admin out
  */
const logout = () => {
  return {
    type: 'LOG_OUT', 
    value: false 
  }
}

/*
  Update the admin username
  */
const updateUsername = newUserName => {
  return {
    type: 'UPDATE_USERNAME', 
    value: newUserName 
  }
}

/*
  Update the admin password
  */
const updatePassword = newPassword => {
  return {
    type: 'UPDATE_PASSWORD', 
    value: newPassword 
  }
}

export { addBlogPost, removeBlogPost, login, logout, updateUsername, updatePassword, modifyBlogPost };
