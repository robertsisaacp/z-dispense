var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spawn = require("child_process").spawn;

app.get('/params', callParams);

function callParams(req, res) {



//io.on('connection', function(socket){
//    socket.on('chat message', function(msg){
//        console.log('message' + msg);
//    });
//});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// Parameters passed in spawn -
// 1. type_of_script
// 2. list containing Path of the script
//    and arguments for the script 
 
// E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
// so, first name = Mike and last name = Will

var process = spawn("python", ["./test.py"]);
//var process = spawn('python',["./test.py",
                        //req.query.firstname,
                        //req.query.lastname] );

// Takes stdout data from script which executed
// with arguments and send this data to res object
process.stdout.on('data', function(data) {
    //res.send(data.toString());
} )
