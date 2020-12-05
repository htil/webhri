/** Main class used to manage the WebHRI App. 
 * @class
*/
var Main = function() {

    //ROS
    window.ros = new ROS()

    //Baxter
    this.baxter = new Baxter()
    window.pan = this.baxter.updateHeadPan

    this.blocklyInterface = new BlocklyInterface()
    this.runButton = document.getElementById('runButton');

    this.createEventListener = function(id, callback) {
        document.getElementById(id).onclick = callback;
    }

    this.handleEvents = function(){
        this.createEventListener("runButton", window.runBlockCode)
    }
}

Main.prototype.start = function() {
    window.ros.init()
    this.blocklyInterface.init()
    this.handleEvents()
    this.baxter.updateFace("Happy", "SW", "White")
    this.baxter.updateHeadPan(0.0)
}

// Wait until document is finished loading before starting App
$(document).ready(function(){ 
	var main = new Main();
	main.start()
});
