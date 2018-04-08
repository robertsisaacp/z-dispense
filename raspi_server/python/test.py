import sys
import Rpi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD) ## Use board pin numbering
GPIO.setup(22, GPIO.OUT) ## Setup GPIO Pin 7 to OUT
GPIO.output(22,True) ## Turn on GPIO pin 7

def blink(numTimes,speed):
    for i in range(0,numTimes):## Run loop numTimes
        print "Iteration " + str(i+1)## Print current loop
        GPIO.output(22,True)## Switch on pin 7
        time.sleep(speed)## Wait
        GPIO.output(22,False)## Switch off pin 7
        time.sleep(speed)## Wait
    print "Done" ## When loop is complete, print "Done"
    GPIO.cleanup()

_prec = float(sys.argv[1])
_type = float(sys.argv[2])
_height = float(sys.argv[3])

blink(_prec, 500)

# print("it worked!")

sys.stdout.flush()

