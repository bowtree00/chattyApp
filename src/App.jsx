import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import UserCount from './UserCount.jsx';
import uuid from 'node-uuid';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usersOnline: "",
      userMap: {}
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000/"); // by using 'this' here, then 'socket' takes the scope of 'App' rather than 'componentDidMount'. if we didn't use 'this', then socket wouldn't be available throughout App.
    
    this.socket.onopen = (event) => {
      // NOTE: This function is a fat arrow function because you don't want to create a closure here (arrow functions allow you to retain the scope of the caller inside the function) - if you did, then when you called 'this' inside this function, it would point to scope created in this function and point to 'scope', rather than to the global scope of 'app'. 
      
      console.log("Connected to server!"); 

    };

    this.socket.onmessage = (event) => {
      // SET STATE!
      
      var message = JSON.parse(event.data);

      switch(message.type) {
        case "incomingMessage":
          // handle incoming message
          console.log("I got a message!!!", message)

          message.type = "userMessage"; // change the message type to scrub the 'type' message to/from the websocket server. Make these more meaningful for messageList, which shouldn't have to know about different server messages in order to render messages appropriately. Also, what happens if the user is being sent 'old' messages, not new incoming messages? Then using 'incomingMessage' in MessageList, they would miss the old messages.

          var messages = this.state.messages.concat(message); // use CONCAT instead of PUSH because with push, you are mutating the state!  If you change state without using setState, React won't know about it and won't update.
            // var messages = this.state.messages;
            // messages.push(message);

          this.setState({ messages: messages });

          break;
        case "incomingNotification":
    
          console.log("incomingNotification received!");

          message.type = "notification"; // change the message type to scrub the messages to/from the websocket server. Make these more meaningful.

          var messages = this.state.messages.concat(message); 

          this.setState({ messages: messages });

          console.log("NOTIFICATION", message)

          break;
        case "userConnectedUpdate":

          // The following will update state with the number of users online and the user colour for the current user
          // this.setState({ usersOnline: message.usersOnline, userColour: message.userColour}) // Sets the current number of users online, also sets the colour for the current user's name
          

          var colourNumber = message.usersOnline % 4

          var userColour = "purple"; // initialize it

          switch(colourNumber) {
            case 1:
              userColour = "tomato"
              break;
            case 2:
              userColour = "green"
              break;
            case 3:
              userColour = "blue"
              break;
          }

          var userId = message.userId;
          console.log("USERID", userId);

          var userMap = this.state.userMap;
          userMap[userId] = userColour;

          this.setState({ usersOnline: message.usersOnline, userMap: userMap }) // Sets the current number of users online, also sets the colour for the current user's name


          console.log("message", message);

          console.log("USERS ONLINE: ", this.state.usersOnline);

          console.log("userMap: *******", userMap);

          break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
      };
    } 
  }

  sendMessageToServer (message) {
    var newId = uuid.v4();
    var userName = this.state.currentUser;
    // var userColour = this.state.userColour;

    // this.socket.send(JSON.stringify({ type: "postMessage", id: newId, username: userName.name, content: message, userColour: userColour }));

    this.socket.send(JSON.stringify({ type: "postMessage", id: newId, username: userName.name, content: message }));

    // Note - with each message
  }

  updateUsername (newUsername) {
    var newId = uuid.v4();
    
    let currUser = this.state.currentUser.name

    let message = JSON.stringify({ type: "postNotification", id: newId,content: currUser + " has changed their name to " + newUsername })
    
    this.setState({ currentUser: { name: newUsername } });

    this.socket.send(message);

  }

  render() {
    console.log("Rendering <App />");

    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <UserCount usersOnline={this.state.usersOnline} />
        </nav>
        <MessageList messages={this.state.messages} userMap={this.state.userMap}/>
        <ChatBar currentUser={this.state.currentUser} onMessageCompleted={this.sendMessageToServer} usernameChanged={this.updateUsername} /> 
      </div>
    )
  }
}
export default App;
