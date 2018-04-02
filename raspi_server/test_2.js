var Gpio = require('onoff').Gpio;
var led4 = new Gpio(4, 'out');
blink(led4, 500);

function blink(led, period) {
  led.write(1, function () {
  setTimeout(function(){
    led.write(0);
    }, period);
  });
}
