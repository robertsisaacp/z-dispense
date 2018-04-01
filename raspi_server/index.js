'use strict';

/*
 * Third party
 */

const fs = require('fs');
const WebSocketServer = require('ws').Server;
const WebSocket = require('ws');
/*
 * Load all modules to array
 */
//const modules = fs
//    .readdirSync(MODULES_DIR)
//    .map(item => require(MODULES_DIR + item));

const connections = {};

/*
 * Broadcast key-value pair to all connections
 */
function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({
                key,
                value
            })
        );
    }
}

function onNewConnection (socket) {
    let isAuthenticated = true;
    const id = Math.random();
    connections[id] = socket;

    socket.on('message', (data) => {
        try {
            data = JSON.parse(data);
            console.logl
        } catch (e){
            data = {};
        }

        // disconnect client if the first message is not valid auth token
//        if (!isAuthenticated && data.auth !== homeConfig.authToken) {
//            socket.close();
//            return;
//        }

        // toggle auth flag if there is a valid auth token
 //       if (!isAuthenticated && data.auth === homeConfig.authToken) {
 //           isAuthenticated = true;
 //           return;
 //       }

        // pass message to all modules
 //       modules.forEach(module =>
 //           module(
 //               data.key,
 //               Records[data.key] ?
 //                   new Records[data.key](data.value) : // create record from json
 //                   {},
 //               broadcast
 //           )
 //       );

        if (data.key === 'STATUS') {
            setTimeout(() => {
                broadcast('STATUS');
            }, 250);
        }
    });

    socket.on('close', () => {
        // remove connection from the broadcast list
        delete connections[id];
    });
}


const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('back');
});

