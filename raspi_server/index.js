// http://{ip}:3000/params?prec=100&type=10&zHeight=100

var express = require('express');
var app = express();

app.listen(3000, function() {
  console.log('listening on port 3000');
})

app.get('/params', callParams);

function callParams(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  console.log('test')
  var spawn = require('child_process').spawn;
  var process = spawn('python', 
    ["./python/test.py",
    req.query._prec,    // precision
    req.query._type,    // circle, line, ... 
    req.query._height  // in mm
  ]);
  console.log(req.query._height)
  process.stdout.on('data', function(data) {
    res.send(data.toString());
  });
}
