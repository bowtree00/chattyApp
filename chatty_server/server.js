// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const app = express();

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Function that will broadcast data to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

var usersOnline = 0; 

wss.on('connection', (ws) => {
  console.log('Client connected');

  usersOnline += 1;

  var userId = uuid.v4();

  // colourNumber = usersOnline % 4

  // var userColour = "purple"; // initialize it

  // switch(colourNumber) {
  //   case 1:
  //     userColour = "tomato"
  //     break;
  //   case 2:
  //     userColour = "green"
  //     break;
  //   case 3:
  //     userColour = "blue"
  //     break;
  // }

  // For the new user, set id for the message, set the type, the number of users now online, and the colour for the user
  // In socket.onmessage in the App, when a message with type 'userConnectedUpdated' is sent, the App will re-set the number of users online, and will also set the colour for the current user
  testMessage = JSON.stringify({ userId: userId, type: 'userConnectedUpdate', content: "SOMEONE CONNECTED! Total online: " + usersOnline, usersOnline: usersOnline });



  wss.broadcast(testMessage);



  ws.on('message', function incoming(message) {
 
    // console.log('received: ', JSON.parse(message));
    
    var tempMessage = JSON.parse(message);


    if (tempMessage["type"] === 'postMessage') {
        tempMessage["type"]='incomingMessage';
      } else if (tempMessage["type"] === 'postNotification') {
        tempMessage["type"]='incomingNotification';
      } else {
        tempMessage["type"]='UNKNOWN_TYPE';
    }

    tempMessage["userId"]=userId;
    // can add colour here too - if I want the server to control implementation of colours

    var newMessage = JSON.stringify(tempMessage);

    wss.broadcast(newMessage);

    console.log('sending: ', JSON.parse(newMessage));
    
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // 
  ws.on('close', () => {
    usersOnline -= 1;
    
    var closeId = uuid.v4();

    testMessage = JSON.stringify({ id: closeId, type: 'userConnectedUpdate', content: "SOMEONE DISCONNECTED! Total online: " + usersOnline, usersOnline: usersOnline });

     console.log('Client disconnected')

  });
});

