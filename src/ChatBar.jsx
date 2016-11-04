import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {messageValue: '', usernameValue: this.props.currentUser.name }; // Be sure to initialize here or it won't work!

    this.messageInputChange = this.messageInputChange.bind(this);
    this.onMessageKeyUp = this.onMessageKeyUp.bind(this);
    this.userInputChange = this.userInputChange.bind(this);
    this.onUsernameKeyUp = this.onUsernameKeyUp.bind(this);
  }

  componentDidMount() {
    console.log("Display componentDidMount ChatBar")
  }



  messageInputChange(event) {
    // console.log("letter entered in box") 
    this.setState({messageValue: event.target.value});  
  }

  onMessageKeyUp(event) {
    // console.log("in handleEvent")

    event.preventDefault();

    if (event.key === 'Enter') {
      this.props.onMessageCompleted(this.state.messageValue); // event.target.value
      this.setState({messageValue:''}); // Resets the text box

      console.log("MESSAGE SUBMITTED")
    }
  }



  userInputChange(event) {
    // console.log("letter entered in box") 
    // console.log("event.target.value", event.target.value)
    this.setState({usernameValue: event.target.value});  
  }

  onUsernameKeyUp(event) {
    // console.log("in onUsernameKeyUp")

    event.preventDefault();

    if (event.key === 'Enter' || event.keyCode === 9 /* Tab Key */) { // UPDATE THIS 
      this.props.usernameChanged(this.state.usernameValue);
      // this.setState({usernameValue:''}); // Resets the text box
      console.log("USERNAME CHANGE SUBMITTED")
    }

  }


  render() {
    console.log("Rendering <ChatBar />");

    return (

      <footer>
        <input 
          id="username" 
          type="text" 
          placeholder="Your Name (Optional)" 
          // value={this.props.currentUser.name}
          value={this.state.usernameValue} 
          onChange={this.userInputChange}
          onKeyUp={this.onUsernameKeyUp}
        />

        <input 
          id="new-message" 
          type="text" 
          placeholder="Type a message and hit ENTER" 
          value={this.state.messageValue} 
          onChange={this.messageInputChange}
          onKeyUp={this.onMessageKeyUp} 
        /> 
      </footer>
      // NOTE: need to use 'onKeyUp' in the form submission above - onSubmit does not work for a form if there is no 'submit' button

    );
  }
}
export default ChatBar;