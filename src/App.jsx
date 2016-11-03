import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuid from 'node-uuid';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000/"); // by using 'this' here, then 'socket' takes the scope of 'App' rather than 'componentDidMount'. if we didn't use 'this', then socket wouldn't be available throughout App.
    
    this.socket.onopen = (event) => {
      // NOTE: This main function is a fat arrow function because you want to cancel out the behaviour of 'this.socket' below pointing to this.socket above, which would make 'this.socket' below be like 'this.socket.socket' (??)
      // When you use the fat arrow, it won't create a closure, which is what happens when you write this as function () {...}
      
      
      console.log("Connected to server!"); 
      


    //       socket.onmessage = function (messageEvent) {
    //   console.log(messageEvent.data);
    //   var message = JSON.parse(messageEvent.data);
    //   messageHandlers[message.type](message.data);
    // };

    };

    this.socket.onmessage = (event) => {
      // SET STATE!
      console.log("I got a message!!!")
      var message = JSON.parse(event.data);

      var messages = this.state.messages;
      messages.push(message);

      this.setState({ messages: messages });

    } 

  }

  sendMessageToServer (message) {
    // create a function here that does what I want it to do when a message is typed in
    // Then - send the function to ChatBar below

    var newId = uuid.v4();
    var userName = this.state.currentUser;

    // this.state.messages.push({ id: newId, username: userName.name, content: message }) // this adds the new message on to the messages array in state

    // this.setState(this.state) // This replaces the state with a copy of itself (with the new message appended), then triggers render

    this.socket.send(JSON.stringify({ id: newId, username: userName.name, content: message }));

  }

  updateUsername (username) {
  
    this.setState({ currentUser: { name: username } });

  }

  render() {
    console.log("Rendering <App />");

    return (
      <div className="wrapper">
        <nav><h1>Chatty</h1></nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onMessageCompleted={this.sendMessageToServer} usernameChanged={this.updateUsername} /> 
      </div>
    )
  }
}
export default App;
