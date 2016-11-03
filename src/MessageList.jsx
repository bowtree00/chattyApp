import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  componentDidMount() {
    console.log("Display componentDidMount MessageList")
  }

  render() {
    console.log("Rendering <MessageList />");
    console.log("this.props.messages", this.props.messages);

    return (

      <div id="message-list">
        
          {this.props.messages.map( (message) =>
            {
              return <Message 
                key={message.id}
                username={message.username}
                content={message.content} />
            })}
    
     </div>

    );
  }
}
export default MessageList;