import React from 'react'
import './PostViewer.css'

// Each post component - show each posts with its text and other data
class Post extends React.Component {
  constructor(props) {
    super(props);

    // Assets
    this.arrowImage = process.env.PUBLIC_URL + "/assets/images/arrow.png";
    this.clapImage = process.env.PUBLIC_URL + "/assets/images/clap-hand.png";
  }

  // Handle applause
  handleApplause = () => {
    this.props.onApplause(this.props.post);
  };

  // Calculate applauses
  calcApplauses() {
    const applauses = this.props.post.applauses;
    let total = 0;

    if (applauses.length !== 0) {
      for (const applause of Object.values(applauses)) {
        total += applause;
      }
    }

    return total;
  }

  render() {
    // Show time
    const timestamp = new Date(Date.parse(this.props.post.timestamp));
    const timeString = formatDate(timestamp);

    return (
      <div className="post-container">
        <div className="post-images">
          <img className="image-poster" src={this.props.postUser.imagePath} alt="Poster user" />
          <img className="image-arrow" src={this.arrowImage} alt="Arrow" />
          <img className="image" src={this.props.targetUser.imagePath} alt="Target user" />
        </div>
        <p className="post-text">
          {this.props.post.textCompliment}
        </p>
        <div className="post-info">
          <button 
            onMouseOver={(event) => this.props.onMouseOver(event, this.props.post.applauses)}
            onMouseOut={this.props.onMouseOut}
            disabled={this.props.applauseDisabled} 
            onClick={this.handleApplause}
          >
            <img className="image-clap" src={this.clapImage} alt="Claphand" /> 
            <label>{this.calcApplauses()}</label>
          </button>
          <label className="timestamp">{timeString}</label>
        </div>
      </div>
    );
  }
}

// The whole post viewer component - contains all posts
class PostViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlay: false,
      overlayX: 0,
      overlayY: 0,
      applauses: null,
    };
  }

  // Handle mouse over event - shows an overlay
  handleHover = (event, applauses) => {
    this.setState({
      overlay: true,
      overlayX: event.clientX,
      overlayY: event.clientY + 10,
      applauses: applauses,
    });
  };

  // Handle mouse out event - turn off the overlay
  handleOut = (event) => {
    this.setState({
      overlay: false,
    });
  };

  // List all the posts
  listPosts() {
    let posts = [];

    // Sort according to timestamp - ascending
    this.props.postList.sort((a, b) => 
      parseInt(Date.parse(a.timestamp)) - parseInt(Date.parse(b.timestamp))
    );

    // Show all the posts from the back - from the newest post
    for (const post of this.props.postList.slice(0).reverse()) {
      const currentUserID = this.props.currentUserID;
      const currentUser = this.props.userList.find(user => user.id === currentUserID);
      const postUser = this.props.userList.find(user => user.id === post.postUserId);
      const targetUser = this.props.userList.find(user => user.id === post.targetUserId);
      let applauseDisabled = false;

      // Check if the current user is the poster or the target
      // Or if current user already has 15 claps
      // Or if current user has insufficient points
      if (post.postUserId === currentUserID ||
        post.targetUserId === currentUserID ||
        post.applauses[currentUserID] === 15 ||
        currentUser.applausePoint < 2) {
          applauseDisabled = true;
      }

      posts.push(<Post 
        key={post.id}
        post={post}
        postUser={postUser}
        targetUser={targetUser}
        applauseDisabled={applauseDisabled}
        onApplause={this.props.onApplause}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleOut}
      />
      ); 
    }

    return posts;
  }

  // List all the applauses using an overlay
  listApplauses() {
    const applauses = this.state.applauses;
    const list = [];

    // Show nothing if there is no applauses
    if (applauses === null || applauses.length === 0) {
      return ;
    }

    // Sort by points - descending
    const sortedApplauses = [...Object.entries(applauses)].sort((a, b) => {
      return b[1] - a[1];
    });

    // Show list of applauses
    for (const applause of sortedApplauses) {
      const user = this.props.userList.find(user => user.id === parseInt(applause[0]))
      list.push(
        <li key={user.id}>{user.name} : {applause[1]}</li>
      );
    }

    return list;
  }

  render() {
    // Style for the overlay
    const overlayStyle = {
      display: this.state.overlay ? "block" : "none",
      top: this.state.overlayY + "px",
      left: this.state.overlayX + "px",
    };
    
    return (
      <div className="post-viewer-container">
        <div className="overlay" style={overlayStyle}>
          <p>拍手一覧</p>
          <ul>
            {this.listApplauses()}
          </ul>
        </div>    
        {this.listPosts()}
      </div>
    );
  }
}

export default PostViewer;

/*
  Helper functions
*/
// Format date from timestamp
function formatDate(timestamp) {
  return timestamp.getFullYear() + '/' 
  + padder(timestamp.getMonth() + 1) + '/'
  + padder(timestamp.getDate()) + ' ' 
  + padder(timestamp.getHours()) + ':' 
  + padder(timestamp.getMinutes());
}

// Pad 0 to single digit number
function padder(date) {
  return ("0" + date).slice(-2);
}