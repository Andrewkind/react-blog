import React from 'react'; //react
import { removeBlogPost, login } from '../../actions/blogposts'; //action
import { connect } from 'react-redux'; // connect

// Import react-icons/fa
import { FaThumbsUp, FaThumbsDown, FaEdit, FaShare, FaTrash, FaPrint } from 'react-icons/fa';

// Import Link
import { Link } from 'react-router-dom';

/*
    BlogPost Component
    Main component to display the all details(BlogPost,Icons(share,edit,delete,print,like,dislike))
*/
class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: 0, //Initial state for Likes Icon
      dislikes: 0, //Initial state for DisLikes Icon
    };
  }

  /*
    editBlogPost method: Admin can Edit in existing Post
  */
  editBlogPost = () => {
    const id = this.props.uniqueId; // store unique id 
    let text = "http://localhost:3000/edit/$Blog=" + id; //querystring 
    window.location.href = text; // redirect to EditPage
  }
  /*
    PrintBlogPost method: Print the BlogContent
  */
  printBlogPost = () => {
    const id = ".print-" + this.props.uniqueId;
    // HTML print
    // source: https://stackoverflow.com/questions/12997123/print-specific-part-of-webpage
    let prtContent = document.querySelector(id); //grab the info from Blog
    let WinPrint = window.open('', 'printwindow'); //Pop Up (open) Print Dialog Box
    WinPrint.document.write('< html lang="en-ca"><head><title>Print it!</title><style>body {text-align: center;}</style></head><body>');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  /*
    copyToClipBoard method: copy the particular blog link and User can share it to other.. 
  */
  // source : https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  copyToClipBoard = () => {
    const id = this.props.uniqueId;
    let link = "http://localhost:3000/share/$Blog=" + id; //queryString with uniqueId
    navigator.clipboard.writeText(link).then(function () {
      console.log(`Copy to clipboard success: ${link}`);
      // ToolTip  
      let tooltipText = document.querySelector(".share-tooltiptext");
      tooltipText.innerHTML = "Copied Link";
      setTimeout(() => {
        tooltipText.innerHTML = "Share Link";
      }, 1200);
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  /*
    deleteBlogPost method: delete the Particular Blog
  */
  deleteBlogPost = () => {
    // We'll grab our ID from props.
    const id = this.props.uniqueId;

    // run dispatch on reducer
    this.props.dispatch(removeBlogPost(id));

    // Check if user is logged in.
    let loggedIn = this.props.blogPosts.loggedIn

    if (loggedIn) {
      this.props.dispatch(login());
    }
  }
  /* addLike and DisLike method is use for Like and DisLike Icon */
  addLike = () => {
    let newCount = this.state.likes + 1; // increment the state value by 1
    this.setState({
      likes: newCount
    });
  }
  disLike = () => {
    let newCount = this.state.dislikes + 1; // increment the state value by 1
    this.setState({
      dislikes: newCount
    });
  }

  render() {
    // React Icon Font Awesome Icons
    const thumbsUpIcon = <FaThumbsUp className="icon thumb thumbs-up" onClick={this.addLike}>Likes: {this.state.likes}</FaThumbsUp>
    const thumbsDownIcon = <FaThumbsDown className="icon thumb thumbs-down" onClick={this.disLike}>DisLikes: {this.state.dislikes}</FaThumbsDown>
    let editIcon;

    // Get User login status
    let loggedIn = false;
    if (this.props.blogPosts !== undefined) {
      if (this.props.blogPosts.loggedIn !== undefined) {
        loggedIn = this.props.blogPosts.loggedIn;
      }
    }
    let deleteIcon; // delete the blog when admin click on the icon
    if (loggedIn) {
      deleteIcon = <div className="tooltip">
        <FaTrash className="icon delete-icon" onClick={this.deleteBlogPost} />
        <span className="tooltiptext">Delete</span>
      </div>

      // edit the blog when admin click on the icon
      editIcon = <div className="tooltip">
        <FaEdit className="icon" onClick={this.editBlogPost} />
        <span className="tooltiptext">Edit</span>
      </div>
    }
    else {
      deleteIcon = <></>
      editIcon = <></>
    }

    // User can Share blog Link when they hit the Share Icon
    const shareIcon = <div className="tooltip">
      <FaShare className="icon" onClick={this.copyToClipBoard} />
      <span className="tooltiptext share-tooltiptext">Share Link</span>
    </div>

    // User Can Print the blog when they hit the Print Icon
    const printIcon = <div className="tooltip">
      <FaPrint className="icon" onClick={this.printBlogPost} />
      <span className="tooltiptext">Print</span>
    </div>

    // Begin parsing blog content
    let text = this.props.blogContent;
    let photoLink = "##";
    let num = text.indexOf(photoLink);

    // Break pieces apart from the identifier
    let indexOfParenthese = text.indexOf(')');
    let newText = text.substr(0, text.indexOf(']'));
    let imageName = newText.split('##[')[1];
    let captionText = text.substr(text.indexOf('(') + 1);
    captionText = captionText.substr(0, captionText.indexOf(')'));

    // make the caption element with the proper text
    let caption = <figcaption > {captionText} </figcaption>;

    // dynamic image during runtime
    // source: https://stackoverflow.com/a/54311930
    let image = <img className="blog-image" alt="Rebound" src={`/images/${imageName}`} />
    
    // Store text in whole element
    let whole = <label>{text}</label>

    // If we found the identifier (##), start the process to break apart text
    if (num > 0) {
      let part1 = <label className="p1">{text.substring(0, num)}</label>
      let part2 = <label className="p2">{text.substring(indexOfParenthese + 1)}</label>

      // Create photo element
      let photo = <figure>
        {image}
        {caption}
      </figure>

      // Add photo to whole
      whole = <> {part1} {photo} </>

      // Remove previous part of text
      text = text.substring(indexOfParenthese + 1);

      // Begin loop through for additional photos
      let index = 0;
      let lastPart;

      // If we have no more photos, append remaining part
      if (text.indexOf(photoLink) < 0) {
        whole = <> {whole} {part2} </>
      }

      // Start loop to look for additional photos
      while (text.indexOf(photoLink) >= 0) {
        index++;
        if (index > 30) {
          break;
        }

        // Find position of identifier
        num = text.indexOf(photoLink);

        // Find location of next parenthese following identifier
        indexOfParenthese = text.indexOf(')');

        // Split text up
        newText = text.substr(0, text.indexOf(']'));
        imageName = newText.split('##[')[1];
        captionText = text.substr(text.indexOf('(') + 1);
        captionText = captionText.substr(0, captionText.indexOf(')'));

        // Create caption
        caption = <figcaption > {captionText} </figcaption>;

        // create image
        image = <img className="blog-image" alt="Rebound" src={`/images/${imageName}`} />
        
        // Check if we found an identifier
        if (num > 0) {
          part1 = <label className="p1">{text.substring(0, num)}</label>
          part2 = <label className="p2">{text.substring(indexOfParenthese + 1)}</label>
         
         // Create photo element
         photo = <figure>
            {image}
            {caption}
          </figure>
          let newPart = <> {part1} {photo}  </>

          // Add new part and photo to whole element
          whole = <> {whole} {newPart} </>
          text = text.substring(indexOfParenthese + 1);

          // Append any text after the photo
          lastPart = <label className="p1">{text}</label>
        }
      }

      // Append any text after the photo
      whole = <> {whole} {lastPart} </>
    }

    // Format Date to proper date style (ie: 02/13/2020)
    //source: https://stackoverflow.com/a/58900382
    function formatDate(date) {
      if (date === undefined || date === "") {
        return
      }
      let s = date.split(/\D/),
        dt = new Date(s[2], s[0] - 1, s[1]);
      return dt.toLocaleString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }

    let formattedDate = formatDate(this.props.blogDate);

    // Returns the amount of time needed in minutes to read the blog post
    function getReadTime(text) {
      let length = text.length;
      let time = length / 600
      if (time < 1) {
        time = 1;
      }
      return Math.round(time)
    }

    // Get the time needed to read the blog
    let readTime = getReadTime(this.props.blogContent);
    let last = <label />;
    if (this.props.last === true) {
      last = <hr />
    }

    return (
      // List Item begins
      <>
        <li className="blog-li">
          <span className={"print-" + this.props.uniqueId}>
            {/* For now, this is our TOP section
          holds Title, date, etc 
        */}
            <section>
              <label className="title-label">
                {this.props.blogTitle}
              </label>
              <p className="blog-info-p">
                <label ><span className="read-time">{readTime}</span> min read</label>
                <label> {formattedDate}</label>
              </p>
              <p className="topics-label">
                 {this.props.blogTopics}
              </p>
            </section>
            <hr />
            <span className="whole-content">
              {whole}
            </span>

          </span>
          {/* blog content end */}

          {/* Like,DisLike,share,delete,print Icon Display */}
          <span className="bottom-span">
            <span>
              {thumbsUpIcon} {this.state.likes}  {thumbsDownIcon} {this.state.dislikes}
            </span>
            <span className="blog-icons">
              {deleteIcon}
              {shareIcon}
              <Link to="/edit">{editIcon}</Link>
              {printIcon}
            </span>
          </span>
          {/* Comments Section Start */}
          <span className="blog-bottom">
            <details>
              <summary>
                Comments
          </summary>
              <label>
                Comments go here...
          </label>
            </details>
          </span>
        </li>
        {last}
      </>
      // List Item Ends
    );
    // Return Function Ends
  }
}

export default connect(
  state => { return { blogPosts: state } },
)(BlogPost);