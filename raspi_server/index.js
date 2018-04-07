var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//'use strict';
//const WebSocketServer = require('ws').Server;
//const WebSocket = require('ws');
//const connections = {};
//var http = require('http').createServer(handler); //require http server, and create server with function handler()
//var fs = require('fs'); //require filesystem module
//var io = require('socket.io')(http); //require socket.io module and pass the http object (server)

//var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
//var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms
//
//var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
//  ledRed = new Gpio(4, {mode: Gpio.OUTPUT}), //use GPIO pin 4 as output for RED
//  ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}), //use GPIO pin 17 as output for GREEN
//  ledBlue = new Gpio(27, {mode: Gpio.OUTPUT}), //use GPIO pin 27 as output for BLUE
//  redRGB = 0, //set starting value of RED variable to off (0 for common cathode)
//  greenRGB = 0, //set starting value of GREEN variable to off (0 for common cathode)
//  blueRGB = 0; //set starting value of BLUE variable to off (0 for common cathode)
//
////RESET RGB LED
//ledRed.digitalWrite(0); // Turn RED LED off
//ledGreen.digitalWrite(0); // Turn GREEN LED off
//ledBlue.digitalWrite(0); // Turn BLUE LED off

//http.listen(8080); //listen to port 8080
//function blinkLED() { //function to start blinking
//  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//    LED.writeSync(1); //set pin state to 1 (turn LED on)
//  } else {
//    LED.writeSync(0); //set pin state to 0 (turn LED off)
//  }
//}
  
//function endBlink() { //function to stop blinking
//  clearInterval(blinkInterval); // Stop blink intervals
//  LED.writeSync(0); // Turn LED off
//  LED.unexport(); // Unexport GPIO to free resources
//}
  
//setTimeout(endBlink, 5000); //stop blinking after 5 seconds

//http.listen(8080); //listen to port 8080

//function handler (req, res) { //create server
//  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
//    if (err) {
//      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
//      return res.end("404 Not Found");
//    } 
//    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
//    res.write(data); //write data from index.html
//    return res.end();
//  });
//}
//
//io.sockets.on('connection', function (socket) {// WebSocket Connection
//  var lightvalue = 0; //static variable for current status
//  socket.on('light', function(data) { //get light switch status from client
//    lightvalue = data;
//    if (lightvalue) {
//      console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
//    }
//  });
//});


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

//function onNewConnection (socket) {
//    let isAuthenticated = true;
//    const id = Math.random();
//    connections[id] = socket;
//
//    socket.on('message', (data) => {
//      data = JSON.parse(data);
//      console.log(data);
//    },

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
//    }

//const wss = new WebSocketServer({ port: 3000 });
//
//wss.on('connection', function connection(ws) {
//  ws.on('message', function incoming(message) {
//    console.log('received: %s', message);
//  });
//
//  ws.send('back');
//});