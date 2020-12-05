/** Main class used to manage the WebHRI App. 
 * @class
*/
var Main = function() {
    window.ros = new ROS()
    this.baxter = new Baxter()

}

Main.prototype.start = function() {
    window.ros.init()
    this.baxter.updateFace("Happy", "SW", "White")
    this.baxter.updateHeadPan(0.0)
}

// Wait until document is finished loading before starting App
$(document).ready(function(){ 
	var main = new Main();
	main.start()
});
