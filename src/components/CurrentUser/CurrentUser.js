import React from 'react'
import './CurrentUser.css'

// Image component - shows profile picture
class Image extends React.Component {
  render() {
    return (
      <img className="current-user-image" src={process.env.PUBLIC_URL + this.props.path} alt="Current user." />
    );
  }
}

// User selector component - change active user when other username is selected
class Selector extends React.Component {
  createOptions() {
    let options = [];

    for (const user of this.props.userList) {
      options.push(<option key={user.id} value={user.id}>{user.name}</option>);
    }

    return options;
  }

  render() {
    return (
      <select 
        className="current-user-selector" 
        value={this.props.currentUserID}
        onChange={this.props.onChange}
      >
        {this.createOptions()}
      </select>
    );
  }
}

// Points info component - shows usable points and received points
class Info extends React.Component {
  render() {
    return (
      <div className="current-user-info">
        <h3>情報</h3>
        <p>拍手できる：{this.props.applausePoint}</p>
        <p>拍手された：{this.props.applaudedPoint}</p>
      </div>
    );
  }
}

// Current user component - shows the whole user banner
class CurrentUser extends React.Component {
  render() {
    const userList = this.props.userList;
    const currentUser = userList.find(user => user.id === this.props.currentUserID);

    return (
      <div className="current-user-container">
        <div className="current-user-image-and-selector">
          <Image path={currentUser.imagePath} />
          <Selector 
            userList={userList} 
            currentUserID={this.props.currentUserID}
            onChange={this.props.onChange}
          />
        </div>
        <Info 
          applausePoint={currentUser.applausePoint} 
          applaudedPoint={currentUser.applaudedPoint}
        />
      </div>
    );
  }
}

export default CurrentUser;