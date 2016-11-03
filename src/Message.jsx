import React, {Component} from 'react';

class Message extends Component {

  componentDidMount() {
    console.log("Display componentDidMount Message")
  }

  render() {
    console.log("Rendering <Message />");
    // console.log("this.props", this.props);
    return (
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
    );
  }
}
export default Message;