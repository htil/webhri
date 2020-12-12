# BaxterWeb

# Installing Ubuntu 16.04

Download Ubuntu the IOS file

(Get the desktop image): https://releases.ubuntu.com/16.04/?_ga=2.51620777.1241983996.1599601430-1344357084.

Create a bootable flashdrive: https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-
overview

Full tutorial can be found here: https://ubuntu.com/tutorials/install-ubuntu-desktop-1604#1-
overview

Install ROS Kinetic: [http://wiki.ros.org/kinetic/Installation/Ubuntu](http://wiki.ros.org/kinetic/Installation/Ubuntu)

# Install Baxter SDK Dependencies
```
$ sudo apt-get update

$ sudo apt-get install git-core python-argparse python-wstool python-vcstools python-rosdep ros-kinetic-control-msgs ros-kinetic-joystick-drivers

$ sudo apt-get install gazebo7 ros-kinetic-qt-build ros-kinetic-gazebo-ros-control ros-kinetic-gazebo-ros-pkgs ros-kinetic-ros-control ros-kinetic-control-toolbox ros-kinetic-realtime-tools ros-kinetic-ros-controllers ros-kinetic-xacro python-wstool ros-kinetic-tf-conversions ros-kinetic-kdl-parser
```
# Install Baxter Research Robot SDK
```
$ cd ~/ros_ws/src
$ wstool init.
$ wstool merge
https://raw.githubusercontent.com/RethinkRobotics/baxter/master/baxter_sdk.rosinstall
$ wstool update
$ wstool merge https://raw.githubusercontent.com/RethinkRobotics/baxter_simulator/kinetic-devel/baxter_simulator.rosinstall
```
## Source ROS Setup
```
 $ source /opt/ros/kinetic/setup.bash
```
## Build and Install
```
$ cd ~/ros_ws

$ catkin_make
```
# Configure Baxter Communication/ROS Workspace

### Downlaoding the baxter.sh script (make sure you are the created workspace i.e /ros_ws )
```
$ wget https://github.com/RethinkRobotics/baxter/raw/master/baxter.sh

$ chmod u+x baxter.sh
```
### Edit the baxter.sh shell script
```
$ cd ~/ros_ws

$ gedit baxter.sh
```
#### In the script file:

modify IP_ADDRESS where IP_ADDRESS is your PC

your_ip="192.168.XXX.XXX"

Command for getting your IP address:
```
$ ifconfig
```
#place the IP address in the field.

Verify 'ros_version' field ros_version="kinetic"

If not, simply put “kinetic”

Save and close the baxter.sh script.

**_Initialize your SDK environment_**

```
$ source /opt/ros/kinetic/setup.bash

$ cd ~/ros_ws/

$ ./baxter.sh 

(you will get [baxter - [http://011605P0035.local:11311]](http://011605P0035.local:11311]) user@comp.name:~/ros_ws$)

$ roslaunch baxter_gazebo baxter_world.launch

```
Open a new terminal window:
```
$ source /opt/ros/kinetic/setup.bash

$ cd ~/ros_ws/

$ ./baxter.sh sim 

(you will get [baxter - [http://011605P0035.local:11311]](http://011605P0035.local:11311]) user@comp.name:~/ros_ws$)

$ rosrun baxter_tools enable_robot.py -e

```
*If you want to exit the simulation you will need to run killall gzserver and then hit ctrl +
c to close out of the simulation( ctrl + c must be executed in the window running the
simulation I.e the roslaunch command)

*roslaunch only needs to be ran if you want run the simulator of Baxter.

### Enable the Robot
```
$ rosrun baxter_tools enable_robot.py -e
```
### Run an Example Program
```
$ rosrun baxter_examples joint_velocity_wobbler.py
```
## Issues? 
[link to Helpful Links!](https://github.com/htil/webhri#helpful-links-for-installation-of-baxter-simulation)

# Running the program for Baxter in the Web
*Refer to Addtional Dependencies to install remainder components*
[link to Addtional dependencies](https://github.com/htil/webhri#addtional-dependencies)

## Replace the baxter.world file 

Replace the baxter.world file with the one provided in the repository because it contains the camera needed to view Baxter's face (file located [ros_ws -> src -> baxter_simulator -> baxter_gazebo -> worlds_]).  *This does not launch the world *

1. Launching Baxter:

    `cd ~/ros_ws`
    
    `source /opt/ros/kinetic/setup.bash;`
    
    `./baxter.sh sim`
    
    `roslaunch baxter_gazebo baxter_world.launch `
    
2. In another terminal start Rosbridge:

    **roslaunch rosbridge_server rosbridge_websocket.launch**
    
    *This can be included into the baxter_world.launch to save an extra step:*
    
    
             <launch>
                <include file="$(find rosbridge_server)/launch/rosbridge_websocket.launch"/>
            </launch>
            
            
3. In another terminal start the web video server:

    **rosrun web_video_server web_video_server**
    
4. Running your python file:

    In another terminal run the following:
    
     `cd ~/ros_ws`
     
     `source /opt/ros/kinetic/setup.bash;`
     
     `./baxter.sh sim`
     
    *Change to the directory to where your python file is located*
    python (name of your python file)
    
5. Viewing in Web:

   To test to see if everything is running correctly visit: http://0.0.0.0:8080/ and navigate to /bax/cam/image_raw
   *You should see Baxter's Face with a Rethink Robotics logo*
   
# Addtional dependencies 

## Install Rosbridge: (Allows us to send messages to roscore via roslibjs *Visit: http://iguanatronics.com/simple-tutorial-on-rosbridge-and-roslibjs/ for a tutorial*)
 ```
    sudo apt-get install ros-kinetic-rosbridge-suite
    
    If you are using pyhton on the server side you will need to run this command :
    
    sudo python -m easy_install --upgrade pyOpenSSL
    
    then
    
    pip install Twisted==18.9.0  #to downgrade twisted version
 ```   
#### [Installing roslibpy dependencies](*Will do the same thing as the above command but will exclude some additional files, needed if the above command fails*)(https://roslibpy.readthedocs.io/en/latest/reference/index.html#ros-setup)
```
    sudo apt-get install -y ros-kinetic-rosbridge-server

    sudo apt-get install -y ros-kinetic-tf2-web-republisher
    
    sudo python -m easy_install --upgrade pyOpenSSL
    
    then
    
    pip install Twisted==18.9.0** to downgrade your SSL version
 ```   
### Install Web video server: (Gives us access to cameras in Gazebo including manually placed ones)
 
    sudo apt-get install ros-kinetic-web-video-server
    
### Install Pip
 
    sudo apt-get install python python-pip

### Install roslibpy

    pip install roslibpy

# Quick Commands

### Gazebo
``
 roslaunch baxter_gazebo baxter_world.launch
``
### Rosbridge
```
 roslaunch rosbridge_server rosbridge_websocket.launch

 rosrun tf2_web_republisher tf2_web_republisher *Will need to be run if you didn't run {sudo apt-get install ros-kinetic-rosbridge-suite}
```
### Web Server video
```
 rosrun web_video_server web_video_server
```
### Baxter Face Program
```
 rosrun baxter_face baxter.py
```
### Starting rosbridge
```
   roslaunch rosbridge_server rosbridge_websocket.launch

   rosrun tf2_web_republisher tf2_web_republisher
```
### Web video server
```
   rosrun web_video_server web_video_server
 ```   
# Coding Python Files for Baxter

It is important to know what libraries you need to enter in here so make sure before you code you
know what you need to import.

Writing programs: https://sdk.rethinkrobotics.com/wiki/Foundations#Writing_Programs:

1. Open up the text editor

2. Place this at the top of your file before you begin —> #!/usr/bin/env python

3. Import your basic stuf

    a. Import rospy #this is ROS Python API
    
    b. Import baxter_interface #baxter interface - baxter python Api

4. Initialize your ROS node - registers it with the master

    a. rospy.init_node(‘whatever you want to call it’) [You can only use this once]
    
    b. http://wiki.ros.org/rospy/Overview/Initialization%20and%20Shutdown

5. Begin coding

6. Make sure to put quit() at the end of your code

### Running the file (make sure roscore is running)

7. Save the python file in the workplace you are working in

8. Open up the terminal

9. Run catkin_make in the place where the python file is. We run this just to rebuild the workspace in case any environment variables have changed

10. In the terminal run the following commands
    a. chmod +x [name of python file]. <— makes the script runnable (same for shell
       files)

11. To run this file you will need to have the environment running (localhost)

12. Run source /ost/ros/kinetic/setup.bash (try this if it doesn’t wanna work: https://github.com/RethinkRobotics/baxter_interface/issues/85)

#### *MAKE SURE YOU ARE DOING THE BELOW COMMANDS IN THE LOCAL HOST *

14. Make sure you enable the robot as well this command is in enable_robot.sh

15. Once the environment is up and running you can run this
      a. python [name of py file]

16. If you get errors you can use gedit [name of py file] this will open up the file and allow you to make changes

### Exiting everything

17. In local host run
     a. killall gzserver

18. Then in the running environment hit ctrl + c

19. Exit of localhost and stop roscore

## Helpful links and documentation for writing your code:

Advanced understanding: https://sdk.rethinkrobotics.com/wiki/Advanced_Understanding

API referencing: https://sdk.rethinkrobotics.com/wiki/API_Reference#tab.3DSimulator_API

Arms : https://sdk.rethinkrobotics.com/wiki/Arms 

Baxter Interface: https://sdk.rethinkrobotics.com/wiki/Baxter_Interface

Standard unit of measure and coordinates: https://www.ros.org/reps/rep-0103.html

Learning Main page: https://sdk.rethinkrobotics.com/wiki/Learning

SDK main page: https://sdk.rethinkrobotics.com/wiki/Home

Video Tutorials: https://sdk.rethinkrobotics.com/wiki/Video_Tutorials

References :https://sdk.rethinkrobotics.com/wiki/Reference

BAXTER INTERFACE: http://docs.ros.org/hydro/api/baxter_interface/html/baxter_interface-module.html

Overkill but take a peak: http://akihikoy.net/notes/?text%2FBaxter-2
   
## Helpful Links for installation of Baxter Simulation:

(Will need to be ran to install additional dependencies. SELECT ROS KINETIC)https://sdk.rethinkrobotics.com/wiki/Simulator_Installation

Rosbridge info: http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge#Talking_to_Rosbridge

Web server info: https://msadowski.github.io/ros-web-tutorial-pt3-web_video_server/

  https://wiki.ros.org/web_video_server

Roslibjs: http://wiki.ros.org/roslibjs

  https://roboticsknowledgebase.com/wiki/tools/roslibjs/
          
  https://github.com/RobotWebTools/roslibjs

Roslibpy: https://roslibpy.readthedocs.io/en/latest/examples.html

  https://github.com/gramaziokohler/roslibpy

Action client: http://robotwebtools.org/jsdoc/roslibjs/current/ActionClient.html

Gazebo: http://gazebosim.org/tutorials?cat=get_started

## Tips
Creating .sh to run commnads make starting the simulation quicker.(A few have been included in this repository. You will need to give them executable permissions.)

When changing networking enviorments you will need to update baxter.sh with your new IP address. 
## Demo
<a href="https://drive.google.com/file/d/1cztPJXZhYw7YmrD9DhBlbYk9OOiZN7jZ/view?usp=sharing" target="_blank"><img src="http://img.https://youtu.be/Jun_jPxmSTo.jpg" 
alt="Demo of Baxter in the Web" width="240" height="180" border="10" /></a>
