---
title: Cool your Raspberry Pi with GPIO controlled fan
date: 2019-02-28 16:46:55
tags: [raspberry, bash]
---
Recently I bought enclosure for my Raspberry Pi 3 B+ with included fan. Instruction said that it should be connected to GPIO pins 4 and 6 (5V and GND). Problem with that is fan works constantly and it's quite loud.

<!-- more -->
I was googling a solution and [found this post on hackernoon](https://hackernoon.com/how-to-control-a-fan-to-cool-the-cpu-of-your-raspberrypi-3313b6e7f92c) and it was almost exactly what I was looking for.

The only thing that I didn't like was using python and configuring this program as a service (which normally is really good solution), so I decided to write bash script to do exactly same thing.

```bash
#!/bin/bash
GPIO=21
TEMP_MAX=55

# Check if gpio is already exported
if [ ! -d /sys/class/gpio/gpio$GPIO  ]
then
    echo $GPIO > /sys/class/gpio/export
    sleep 1;
fi
# Make sure that pin is in output mode
echo "out" > /sys/class/gpio/gpio$GPIO/direction
# Get the temperature as integer
TEMP=`vcgencmd measure_temp | egrep -oh -m 1 [0-9]+ | head -n 1`
if [ "$TEMP" -gt "$TEMP_MAX" ]; then
    # If temperature on CPU is greater than $TEMP_MAX then set GPIO to high
    echo "1" > /sys/class/gpio/gpio$GPIO/value
else
    # If not, set GPIO to low
    echo "0" > /sys/class/gpio/gpio$GPIO/value
fi
```

Then I put it in `/usr/local/bin/fan.sh` file and added it as cron task to run every minute.
