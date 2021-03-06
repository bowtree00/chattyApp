import React, {Component} from 'react';

class Message extends Component {

  componentDidMount() {
    console.log("Display componentDidMount Message")
  }

  render() {
    console.log("Rendering <Message />");
    
    return (
        <div className="message">
          <span className="username" id={this.props.userColour}>{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
    );
  }
}
export default Message;