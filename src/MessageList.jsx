import React, {Component} from 'react';
import Message from './Message.jsx';

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
              return <Message 
                key={message.id}
                username={message.username}
                content={message.content} />
            })}
        
        <div className="message system"> 
          Anonymous1 changed their name to nomnom.
        </div>
        
     </div>

    );
  }
}
export default MessageList;