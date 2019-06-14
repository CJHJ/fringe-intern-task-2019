import React from 'react'
import './ComplimentPoster.css'

// Target user image component - shows target user profile picture
class Image extends React.Component {
  render() {
    return (
      <img className="target-user-image" src={process.env.PUBLIC_URL + this.props.path} alt="Target user." />
    );
  }
}

// Target user selector component - change target user
class Selector extends React.Component {
  createOptions() {
    let options = [];

    // List all users except current user
    for (const user of this.props.userList) {
      if (this.props.currentUserID !== user.id) {
        options.push(<option key={user.id} value={user.id}>{user.name}</option>);
      } 
    }

    return options;
  }

  render() {
    return (
      <select 
        className="target-user-selector" 
        value={this.props.targetUserID}
        onChange={this.props.onChange}
      >
        {this.createOptions()}
      </select>
    );
  }
}

// Compliment form component - post compliment
class TextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      disabled: true,
    };
  }

  // Handle textarea changes - disable button if characters are less than or equal to 5
  handleChange = (event) => {
    if (event.target.value.length >= 5) {
      this.setState({
        value: event.target.value,
        disabled: false,
      });
    }
    else {
      this.setState({
        value: event.target.value,
        disabled: true,
      });
    }
  }

  // Handle submitted text - post it
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <form className="compliment-form" onSubmit={this.handleSubmit}>
        <textarea 
          className="compliment-textarea" 
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input className="compliment-submit" type="submit" value="投稿" disabled={this.state.disabled} />
      </form>
    );
  }
}

// Compliment poster component
class ComplimentPoster extends React.Component {
  render() {
    const userList = this.props.userList;
    const targetUser = userList.find(user => user.id === this.props.targetUserID);

    return (
      <div className="compliment-poster-container">
        <div className="target-user-image-and-selector">
          <Image path={targetUser.imagePath} />
          <Selector 
            currentUserID={this.props.currentUserID}
            targetUserID={this.props.targetUserID}
            userList={userList} 
            onChange={this.props.onChange}
          />
        </div>
        <TextBox 
          value={this.props.complimentText} 
          onChange={this.props.onComplimentTextChange}
          onSubmit={this.props.onSubmit} 
        />
      </div>
    );
  }
}

export default ComplimentPoster;