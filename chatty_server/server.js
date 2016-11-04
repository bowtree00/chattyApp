// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const app = express();

const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// This function will broadcast data to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

var usersOnline = 0; 

wss.on('connection', (ws) => {
  // Callback that will run when client connects to the server
  // They are assigned a socket, represented by the ws parameter in the callback

  console.log('Client connected');

  usersOnline += 1;

  var userId = uuid.v4();

  // For the new user, set id for the message, set the type, the number of users now online
  // In socket.onmessage in the App, when a message with type 'userConnectedUpdated' is sent, the App will re-set the number of users online
  testMessage = JSON.stringify({ userId: userId, type: 'userConnectedUpdate', content: "SOMEONE CONNECTED! Total online: " + usersOnline, usersOnline: usersOnline });

  wss.broadcast(testMessage);

  ws.on('message', function incoming(message) {
     
    var tempMessage = JSON.parse(message);

    if (tempMessage["type"] === 'postMessage') {
        tempMessage["type"]='incomingMessage';
      } else if (tempMessage["type"] === 'postNotification') {
        tempMessage["type"]='incomingNotification';
      } else {
        tempMessage["type"]='UNKNOWN_TYPE';
    }

    tempMessage["userId"]=userId;

    var newMessage = JSON.stringify(tempMessage);

    wss.broadcast(newMessage);

    console.log('sending: ', JSON.parse(newMessage));
    
  });
 
  // 
  ws.on('close', () => {
     // Callback for when a client closes the socket

     usersOnline -= 1;
    
    var closeId = uuid.v4();

    testMessage = JSON.stringify({ id: closeId, type: 'userConnectedUpdate', content: "SOMEONE DISCONNECTED! Total online: " + usersOnline, usersOnline: usersOnline });

     console.log('Client disconnected')

  });
});

