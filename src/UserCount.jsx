import React, {Component} from 'react';

class UserCount extends Component {

  componentDidMount() {
    console.log("Display componentDidMount UserCount")
  }

  render() {
    console.log("Rendering <UserCount />");
    // console.log("this.props", this.props);
    return (
      <div id="navbar-user-count" >
        <p>{this.props.usersOnline} users online</p>
      </div>
    );
  }
}
export default UserCount;