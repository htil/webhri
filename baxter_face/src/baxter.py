#!/usr/bin/python2
import os
import sys
import argparse
import random

import rospy
import roslibpy
import roslibpy.actionlib

import cv2
import cv_bridge

import baxter_interface

from baxter_interface import CHECK_VERSION
from sensor_msgs.msg import (
    Image,
)
client = roslibpy.Ros(host='localhost', port=9090)
server = roslibpy.actionlib.SimpleActionServer(client, '/baxterFace', 'actionlib_tutorials/FibonacciAction')

class Face(object):

    def __init__(self):
        self._done = False
        # verify robot is enabled
        print("Getting robot state... ")
        self._rs = baxter_interface.RobotEnable(CHECK_VERSION)
        self._init_state = self._rs.state().enabled
        print("Enabling robot... ")
        self._rs.enable()
        print("Running. Ctrl-z to quit")

    def clean_shutdown(self):
        print("\nExiting...")
        if self._done:
            self.set_neutral()
        if not self._init_state and self._rs.state().enabled:
            print("Disabling robot...")
            self._rs.disable()

def execute(goal):
    print(goal)
    path="/home/htil/ros_ws/baxter_faces/"
    files=os.listdir(path)
    d=random.choice(files)
    img = path + d
    #print(img)
    send_image(img)
    print('Button has been pressed')
    seq = [0, 1]
    for i in range(1, goal['order']):
        if server.is_preempt_requested():
            server.set_preempted()
            return

        seq.append(seq[i] + seq[i - 1])

    server.send_feedback({'sequence': seq})

    server.set_succeeded({'sequence': seq})

def send_image(path):
    img = cv2.imread(path)
    msg = cv_bridge.CvBridge().cv2_to_imgmsg(img, encoding="bgr8")
    pub = rospy.Publisher('/robot/xdisplay', Image, latch=True, queue_size=1)
    pub.publish(msg)
    rospy.sleep(1)

def main():
    rospy.init_node('rsdk_xdisplay_image', anonymous=True)
    baxterFace = Face()
    server.start(execute)
    client.run_forever()
    baxterFace.execute()


if __name__ == '__main__':
    sys.exit(main())
