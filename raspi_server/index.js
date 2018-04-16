var express = require('express');
var app = express();

app.listen(3000, function() {
  console.log('listening on port 3000');
});

// Use the following URL example to send params:
// http://{ip}:3000/params?_prec=100&_type=10&_height=100

var PythonShell = require('python-shell');
var pyshell = new PythonShell('./python/test3.py')

app.get('/params', callParams);

pyshell.on('message', function (message) {
  console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  //if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
});


function callParams(req, res) {
  var options = {
  //  pythonPath: 'path/to/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './python',
    args: [
      req.query.prec,    // precision
      req.query.type,    // 0: line, 1: circle, 2: square
      req.query.height  // in mm
    ]
  };

  PythonShell.run('test3.py', options, function (err, results) {
    if (err) throw (err);
    console.log('results: %j', results);
  });
};

