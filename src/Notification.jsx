import React, {Component} from 'react';

class Notification extends Component {

  componentDidMount() {
    console.log("Display componentDidMount Notification")
  }

  render() {
    console.log("Rendering <Notification />");

    return (
      <div className="message system">
        <p>{this.props.content}</p>
      </div>
    );
  }
}
export default Notification;