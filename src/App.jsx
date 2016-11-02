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
    
    // this.state = {
    //   currentUser: {},
    //   messages: [{
    //     id: "",
    //     username: "",
    //     content: ""
    //   }]
    // };

  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);


    // const newMessage = ??
    // const messages = this.state.messages
    // this.setState({messages: messages})

  }


  // changeMessage(message) {
  //   let contact = this.state.contacts.filter(function(c) {        
  //     return c.id === id;
  //   })[0];
  //   this.setState({currentContact: contact});
  // }

  someFunction (message) {
    // create a function here that does what I want it to do when a message is typed in
    // Then - send the function to ChatBar below

    console.log("App - someFunction");
    console.log("message", message);

    this.state.messages.push(message)
    this.setState(this.state) // This replaces the state with a copy of itself (with the new message appended), then triggers render
    console.log("this.state", this.state)
  }

  render() {
    console.log("Rendering <App />");
    // debugger;

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
