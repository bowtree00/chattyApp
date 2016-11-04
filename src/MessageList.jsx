import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  componentDidMount() {
    console.log("Display componentDidMount MessageList")
  }

  render() {
    console.log("Rendering <MessageList />");

    return (

      <div id="message-list">
        
          {this.props.messages.map( (message) =>
            {
              if (message.type === "userMessage") {
              return <Message 
                key={message.id}
                username={message.username}
                content={message.content} 
                userColour={message.userColour} />
              } else if (message.type === "notification") {
                return <Notification
                  key={message.id}
                  content={message.content} />
              }
            })}
    
     </div>

    );
  }
}
export default MessageList;