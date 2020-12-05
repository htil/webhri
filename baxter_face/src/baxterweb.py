#!/usr/bin/env python

import argparse
import random
import rospy
import roslibpy
import roslibpy.actionlib
import baxter_interface
from baxter_interface import CHECK_VERSION
import cv2
import cv_bridge

from sensor_msgs.msg import (
    Image,
)

from std_msgs.msg import String

from std_msgs.msg import Float32

class BaxterHead(object):
    def __init__(self):
        self._head = baxter_interface.Head()
        self._control_rate = rospy.Rate(100)

    def pan(self, angle, speed, time):
        self._head.set_pan(angle, speed=speed, timeout=time)
        self._control_rate.sleep()

class BaxterDispay(object):
    def __init__(self):
        self.path = "/home/htil/ros_ws/src/baxter_face/src/baxter_faces/"
        self.pub = rospy.Publisher('/robot/xdisplay', Image, latch=True, queue_size=1)
        print("BaxterDispay init")
    
    def send_image(self, image):
        imagePath = self.path + image
        print(imagePath)
        img = cv2.imread(imagePath)
        msg = cv_bridge.CvBridge().cv2_to_imgmsg(img, encoding="bgr8")
        self.pub.publish(msg)
        rospy.sleep(1)

class BaxterWeb(object):

    def __init__(self):
        """
        Connects Baxter to Web Interface
        """
        self._done = False
        self.client = roslibpy.Ros(host='localhost', port=9090)
        self.sub_pan = rospy.Subscriber('/web_pan', Float32, self.panMessage)
        self.sub_face = rospy.Subscriber('/web_face', String, self.faceMessage)
        self.baxterDisplay = BaxterDispay()
        self.baxterHead = BaxterHead()

        # verify robot is enabled
        print("Getting robot state... ")
        self._rs = baxter_interface.RobotEnable(CHECK_VERSION)
        self._init_state = self._rs.state().enabled
        print("Enabling robot... ")
        self._rs.enable()
        print("Running. Ctrl-c to quit")

    def panMessage(self, msg):
        self.baxterHead.pan(msg.data, 0.3, 10.0)

    def faceMessage(self, msg):
        self.baxterDisplay.send_image(msg.data)

    def start(self):
        #self.server.start(self.webMessage)
        self.client.run_forever()

def main():
    print("Initializing node...")
    rospy.init_node("baxter_web")
    baxterWeb = BaxterWeb()
    baxterWeb.start()

if __name__ == '__main__':
    main()