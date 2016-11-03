import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000/"); // by using 'this' here, then 'socket' takes the scope of 'App' rather than 'componentDidMount'. if we didn't use 'this', then socket wouldn't be available throughout App.
    
    this.socket.onopen = function (event) {
      console.log("Connected to server!"); 
    };

  }


  someFunction (message) {
    // create a function here that does what I want it to do when a message is typed in
    // Then - send the function to ChatBar below

    var newId = this.state.messages.length + 1;
    var userName = this.state.currentUser;

    // this.state.messages.push({ id: newId, username: userName.name, content: message }) // this adds the new message on to the messages array in state

    // this.setState(this.state) // This replaces the state with a copy of itself (with the new message appended), then triggers render

    this.socket.send(JSON.stringify({ id: newId, username: userName.name, content: message }));


  }

  render() {
    console.log("Rendering <App />");

    return (
      <div className="wrapper">
        <nav><h1>Chatty</h1></nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} someFunction={this.someFunction.bind(this)} /> 
      </div>
    )
  }
}
export default App;
