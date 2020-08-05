import React from 'react';
import { removeBlogPost } from '../../actions/blogposts';
import { connect } from 'react-redux';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaShare, FaTrash, FaPrint } from 'react-icons/fa';


class BlogPost extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        likes: 0,
        dislikes: 0,
    };
}

  // DeleteBlogPost event handler
  deleteBlogPost = () => {
    // We'll grab our ID from props.
    const id = this.props.uniqueId;
    // run dispatch on reducer
    this.props.dispatch(removeBlogPost(id));
  }
  addLike = () => {
    let newCount = this.state.likes + 1;
      this.setState({
      likes: newCount
    });
  };
  disLike = () => {
    let newCount = this.state.dislikes + 1;
      this.setState({
      dislikes: newCount
    });
  };


  render() {

 

    // React Icon Font Awesome Icons
    const thumbsUpIcon = <FaThumbsUp className="icon thumb thumbs-up selected-thumb" onClick={this.addLike}>Likes: {this.state.likes}</FaThumbsUp>
    const thumbsDownIcon = <FaThumbsDown className="icon thumb thumbs-down" onClick={this.disLike}>DisLikes: {this.state.dislikes}</FaThumbsDown>
    const editIcon = <FaEdit className="icon" onClick={this.deleteBlogPost} />
    const deleteIcon = <FaTrash className="icon" onClick={this.deleteBlogPost} />
    const shareIcon = <FaShare className="icon" onClick={this.deleteBlogPost} />
    const printIcon = <FaPrint className="icon" onClick={this.deleteBlogPost} />

    let text = this.props.blogContent;

    // add an element half-way thru for testing

    var photoLink = "(test)[http://www.google.com]";
    var num = text.indexOf(photoLink);

    var whole;
    var testing = false;
    if (testing && num > 1) {
      var part1 = <label className="p1">{text.substring(0, num)}</label>
      var part2 = <label className="p2">{text.substring(num + photoLink.length)}</label>


      var photo = <figure><img className="blog-image" alt="Rebound" src={require('../../media/bird.jpg')} />
        <figcaption >Barney...!</figcaption>
      </figure>

      whole = <> {part1} {photo} </>
      text = text.substring(num + photoLink.length);

      //remove from text

      var index = 0;
      while (text.indexOf(photoLink) > 1) {

        num = text.indexOf(photoLink);

        index++;
        if (index > 30) {
          break;
        }
        part1 = <label className="p3">{text.substring(0, num)}</label>
        console.log(text.substring(num + photoLink.length));
        part2 = <label className="p4">{text.substring(num + photoLink.length)}</label>
        photo = <figure><img className="blog-image" alt="Rebound" src={require('../../media/mona.jpg')} />
          <figcaption >Mona...</figcaption>
        </figure>




        var newPart = <> {part1} {photo} {part2} </>
        whole = <> {whole} {newPart} </>
        text = text.substring(num + photoLink.length);

      }
    }
    else {
      whole = <label> {text} </label>
    }


       // Format Date
    //source: https://stackoverflow.com/a/58900382
    // formatDate = (date) => {
    //   var date = date.split(/\D/),
    //     dt = new Date(date[2], date[0] - 1, date[1]);
    //   return dt.toLocaleString('en-CA', {
    //     month: 'short',
    //     day: 'numeric',
    //     year: 'numeric'
    //   });
    // }

    function format (s) {

 
      if (s === undefined || s === "" ) {
        return
      }
      var s = s.split(/\D/),
      dt = new Date(s[2], s[0] - 1, s[1]);
    return dt.toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  let formattedDate = format(this.props.blogDate);

    // Return Function Begins
    return (

      // List Item begins
      <>
        <li className="blog-li">

          {/* For now, this is our TOP section
          holds Title, date, etc 
        */}
          <section>

            <label className="title-label">
              {this.props.blogTitle}
            </label>

            <p className="blog-info-p">

              <label>3 min read</label>
              <label> {formattedDate}</label>

            </p>
            <p className="topics-label">
              Topics: {this.props.blogTopics}
          </p>

          </section>

          <hr />
          <p className="blog-p">

            {whole}
          </p>

          <span className="bottom-span">

            <span>
              {thumbsUpIcon} {this.state.likes}  {thumbsDownIcon} {this.state.dislikes}
          </span>

            <span className="blog-icons">
              {deleteIcon}
              {shareIcon}
              {editIcon}
              {printIcon}
            </span>

          </span>

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
        <hr />
      </>

      // List Item Ends

    );
    // Return Function Ends

  }
}

export default connect(
  null
)(BlogPost);
