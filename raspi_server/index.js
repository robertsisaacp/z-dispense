'use strict';
//const WebSocketServer = require('ws').Server;
//const WebSocket = require('ws');

//const connections = {};
var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http); //require socket.io module and pass the http object (server)

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue) {
      console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
    }
  });
});


//function broadcast (key, value) {
//    for (let id in connections) {
//        connections[id].send(
//            JSON.stringify({
//                key,
//                value
//            })
//        );
//    }
//}
//
//function onNewConnection (socket) {
//    let isAuthenticated = true;
//    const id = Math.random();
//    connections[id] = socket;
//
//    socket.on('message', (data) => {
//        try {
//            data = JSON.parse(data);
//            console.logl
//        } catch (e){
//            data = {};
//        }
//
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

//        if (data.key === 'STATUS') {
//            setTimeout(() => {
//                broadcast('STATUS');
//            }, 250);
//        }
//    });
//
//    socket.on('close', () => {
//        // remove connection from the broadcast list
//        delete connections[id];
//    });
//}
//
//
//const wss = new WebSocketServer({ port: 3000 });
//
//wss.on('connection', function connection(ws) {
//  ws.on('message', function incoming(message) {
//    console.log('received: %s', message);
//  });
//
//  ws.send('back');
//});

