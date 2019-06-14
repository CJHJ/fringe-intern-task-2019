import React from 'react';
import CurrentUser from './components/CurrentUser/CurrentUser'
import ComplimentPoster from './components/ComplimentPoster/ComplimentPoster'
import PostViewer from './components/PostViewer/PostViewer'
import './App.css';

// ----------------------------
// Main application component
// ----------------------------
class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      firstLaunch: true,
      users: null,
      posts: null,
      currentUserID: 0,
      targetUserID: 1,
    };
  }

  componentWillMount() {
    // Check whether app is being launched for the first time
    const firstLaunch = localStorage.getItem('firstLaunch');

    // If the app is launched for the first time
    if (firstLaunch === null) {
      // Set firstLaunch state into false
      localStorage.setItem('firstLaunch', false);
      this.setState({firstLaunch: false});

      // Create first time users and posts
      const users = [
        createUser(0, "Calvin JH", "pp-calvinjh.png"),
        createUser(1, "Michael", "pp-michael.png"),
        createUser(2, "河村恭兵", "pp-kawahei.png"),
        createUser(3, "栗崎太郎", "pp-kurita.png"),
        createUser(4, "高橋純也", "pp-takajun.png"),
      ];
      const posts = [];

      // Save users and posts to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Get users and posts from localStorage
    const users = localStorage.getItem('users');
    const posts = localStorage.getItem('posts');
    this.setState({
      users: JSON.parse(users),
      posts: JSON.parse(posts),
    });
  }

  /*
    Handle requests from child components
   */
  // Change user
  changeUser = (event) => {
    this.setState({currentUserID: parseInt(event.target.value)}, () => {
      // Check conflict with target user ID
      // If current user ID is 0, change into 1
      // If not change into 0
      if (this.state.currentUserID === 0) {
        this.setState({targetUserID: 1});
      }
      else {
        this.setState({targetUserID: 0});
      }
    });
  };

  // Change target user
  changeTargetUser = (event) => {
    this.setState({targetUserID: parseInt(event.target.value)});
  };

  // Handle compliment submission
  handleComplimentSubmit = (value) => {
    // Submit to localStorage
    let posts = this.state.posts;

    // If there are post(s), assign post ID into last_id + 1
    let postID = posts.length === 0 ? 0 : posts[posts.length - 1].id + 1;
    
    // Add post
    const currentTime = new Date();
    posts.push(createPost(postID, currentTime, this.state.currentUserID, this.state.targetUserID, value));
    localStorage.setItem('posts', JSON.stringify(posts));
    this.setState({posts: posts});

    alert("投稿しました！");
  };

  // Handle applauses
  handleApplause = (post) => {
    this.setState(state => {
      // Update applause point of post
      const posts = state.posts.map((elPost, j) => {
        if (elPost.id === post.id) {
          let currentUserApplause = elPost.applauses[state.currentUserID];

          // If current user id field doesn't exist create it
          if (currentUserApplause === undefined) {
            currentUserApplause = 1;
          }
          else {
            // Check if points are less than 15. If yes, add point
            if (currentUserApplause < 15) {
              currentUserApplause += 1;
            }
          }

          elPost.applauses[state.currentUserID] = currentUserApplause;
        }

        return elPost;
      });

      // Reduce user point, add points to poster and target
      const users = state.users.map((elUser, j) => {
        if (elUser.id === state.currentUserID) {
          elUser.applausePoint -= 2;
        }

        if (elUser.id === post.postUserId || elUser.id === post.targetUserId) {
          elUser.applaudedPoint += 1;
        }

        return elUser;
      });

      // Save to localStorage
      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('users', JSON.stringify(users));

      return {
        posts,
        users
      };
    });
  };

  render() {
    return (
      <div className="App">
        <CurrentUser 
          currentUserID={this.state.currentUserID}
          userList={this.state.users} 
          onChange={this.changeUser}  
        />
        <ComplimentPoster
          currentUserID={this.state.currentUserID}
          targetUserID={this.state.targetUserID}
          userList={this.state.users}
          complimentText={this.state.complimentText}
          onChange={this.changeTargetUser}
          onSubmit={this.handleComplimentSubmit}
        />
        <PostViewer
          currentUserID={this.state.currentUserID}
          postList={this.state.posts}
          userList={this.state.users}
          onApplause={this.handleApplause}
        />
      </div>
    );
  }
}

export default App;

/*
  Helper functions
 */
// Create user JSON
function createUser(id, name, imageFilename) {
  return ({
    id: id,
    name: name,
    imagePath: "/assets/images/" + imageFilename,
    applausePoint: 100,
    applaudedPoint: 0,
  });
}

// Create post JSON
function createPost(id, timestamp, postUser, targetUser, textCompliment, applauses) {
  return ({
    id: id,
    timestamp: timestamp,
    postUserId: postUser,
    targetUserId: targetUser,
    textCompliment: textCompliment,
    applauses: {},
  });
}
