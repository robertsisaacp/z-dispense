from time import sleep
from sys import argv
import RPi.GPIO as GPIO

# Import the ADS1x15 module.
import Adafruit_ADS1x15

# Create an ADS1115 ADC (16-bit) instance.
adc = Adafruit_ADS1x15.ADS1115()

RESOLUTION = { 'Full' : (0,0,0),
               'Half' : (1,0,0),
               '1/4'  : (0,1,0),
               '1/8'  : (1,1,0),
               '1/16' : (0,0,1),
               '1/32' : (1,0,1) }

CW, CCW = 1, 0    # Rotation

LIM_X = 7  # Limit Switch for X,Y,Z
DIR_X = 20  # Direction GPIO Pin
STEP_X = 19 # Step GPIO Pin
LIM_Y = 8  
DIR_Y = 13  
STEP_Y = 6 
LIM_Z = 24  
DIR_Z = 10  
STEP_Z = 9 
#(X & Y - Axis: 1step/16microns - 0.016 millimeter   6.25 steps - 1 millimeter) 
#(Z - Axis: 1step/10microns - 0.01 millimeter)

MODE_XY = (17,27,22)
MODE_Z = (14,15,18) # Mircostep  Resolution GPIO Pins

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM) # BCM - Broad COM Memory
GPIO.setup(DIR_X, GPIO.OUT) # Direction GPIO Pin
GPIO.setup(STEP_X, GPIO.OUT) # Stepper GPIO Pin
GPIO.setup(LIM_X, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Limit GPIO Pin
GPIO.setup(DIR_Y, GPIO.OUT) 
GPIO.setup(STEP_Y, GPIO.OUT) 
GPIO.setup(LIM_Y, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) 
GPIO.setup(DIR_Z, GPIO.OUT) 
GPIO.setup(STEP_Z, GPIO.OUT)
GPIO.setup(LIM_Z, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

GPIO.setup(MODE_XY,GPIO.OUT)

GPIO.setup(MODE_Z,GPIO.OUT)
GPIO.output(MODE_Z, RESOLUTION['Full'])

LED = 4
GPIO.setup(LED, GPIO.OUT)
GPIO.output(LED,GPIO.HIGH) #inicate machine is ready

def move_it(motor, dir): #moves specified motor one step in specified direction
    if dir == CW:
        if motor == 'X':
            GPIO.output(DIR_X,CW)
            
            GPIO.output(STEP_X,GPIO.HIGH)
            GPIO.output(STEP_X,GPIO.LOW)
                
        elif motor == 'Y':
            GPIO.output(DIR_Y,CW)
            
            GPIO.output(STEP_Y,GPIO.HIGH)
            GPIO.output(STEP_Y,GPIO.LOW)
                
        elif motor == 'Z':
            GPIO.output(DIR_Z,CW)
            
            GPIO.output(STEP_Z,GPIO.HIGH)
            GPIO.output(STEP_Z,GPIO.LOW)
        
    elif dir == CCW:
        if motor == 'X':
            GPIO.output(DIR_X,CCW) 
            
            GPIO.output(STEP_X,GPIO.HIGH)
            GPIO.output(STEP_X,GPIO.LOW)
                    
        elif motor == 'Y':
            GPIO.output(DIR_Y,CCW) 
            
            GPIO.output(STEP_Y,GPIO.HIGH)
            GPIO.output(STEP_Y,GPIO.LOW)
                    
        elif motor == 'Z':
            GPIO.output(DIR_Z,CCW) 
            
            GPIO.output(STEP_Z,GPIO.HIGH)
            GPIO.output(STEP_Z,GPIO.LOW)

def lines(length, distance): #makes a line of a specified length, then adjusts to a specified height

    values = [0 for x in range (length)]

    for x in range(length): 
        values[x] = (45+(adc.read_adc(0, gain=1))*0.0015259255) #reading ADC as height
        move_it('Y', CCW) #move to next location (toward motor)
        print values[x], 'mm' #print reading
        
    i = [0 for x in range (length)]
        
    for x in range(length):
        y = x
        reading = (45+(adc.read_adc(0, gain=1))*0.0015259255) #reading ADC as height
        i[y]=reading-distance #calculate difference between current and desired height
        check=1
        while check:
            if abs(i[y]) > 0.01: #if difference is more than 10 microns
                if i[y] > 0.001:
                    move_it('Z', CW) #move down if higher
                    reading = (45+(adc.read_adc(0, gain=1))*0.0015259255)
                    i[y]=reading-distance #update difference
                    print i[y], 'mm - high'
                elif i[y] < 0.001:
                    move_it('Z', CCW) #move up if lower
                    reading = (45+(adc.read_adc(0, gain=1))*0.0015259255)
                    i[y]=reading-distance #update difference
                    print i[y], 'mm - low'

            else: #once the difference is under 10 microns...
                check = 0
        move_it('Y', CW) #move to next point (away from motor)
        file.write(str(45+(adc.read_adc(0, gain=1))*0.0015259255))
        file.write("\n")

lngth = 10000

# arg1: precision, arg2: type, arg3: height
prec = argv[1]
type = argv[2]
height = argv[3]

#height = input("Desired height (mm):")
#shape = input("Desired shape: \n1. LINE \n \
#                                2. SQUARE \n \
#                                3. CIRCLE \n")
#res = input("Desired resolution:\n1. Full\n \
#                                  2. Half\n \
#                                  3. 1/4\n \
#                                  4. 1/8\n \
#                                  5. 1/16\n \
#                                  6. 1/32\n")

def run():
    file=open("results.txt","w")
    if res==1:
        GPIO.output(MODE_XY, RESOLUTION['Full'])
    elif res==2:
        GPIO.output(MODE_XY, RESOLUTION['Half'])
    elif res==3:
        GPIO.output(MODE_XY, RESOLUTION['1/4'])
    elif res==4:
        GPIO.output(MODE_XY, RESOLUTION['1/8'])
    elif res==5:
        GPIO.output(MODE_XY, RESOLUTION['1/16'])
    elif res==6:
        GPIO.output(MODE_XY, RESOLUTION['1/32'])
    else:
        # print 'Bitch wat'
        quit()
    lines(lngth, height)
    file.close()
    GPIO.output(LED,GPIO.LOW) #inicate machine is done


if __name__ == '__main__':
    from sys import argv
    while(True):
        print "hi"
