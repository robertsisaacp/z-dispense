// http://localhost:3000/params?prec=100&type=10&zHeight=100

var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('server running on port 3000');
})

app.get('/params', callParams);

function callParams(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  var spawn = require('child_process').spawn;
  var process = spawn('python', ['./python/test.py',
    req.query.prec,    // precision
    req.query.type,    // circle, line, ... 
    req.query.zHeight, // in mm
  ]);
  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
}
