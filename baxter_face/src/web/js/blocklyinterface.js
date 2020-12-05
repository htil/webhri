
/** Class used to manage Blockly interface
 * @class
*/


var BlocklyInterface = function(){

    // Handle custom block creation
    createCustomBlocks()

    // UI Elements
    this.runButton = document.getElementById('runButton');

    window.interpreter = null
    window.runner = null
    window.latestCode = ''
    

    window.workspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});

    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
    window.workspace);

    // Exit is used to signal the end of a script.
    Blockly.JavaScript.addReservedWords('exit');

    // Clear interpreter
    window.resetInterpreter = function() {
        window.interpreter = null;
        if (window.runner) {
            clearTimeout(window.runner)
            window.runner = null  
        }
    }

    window.generateCodeAndLoadIntoInterpreter = function() {
        //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        //Blockly.JavaScript.addReservedWords('highlightBlock');
        window.latestCode = Blockly.JavaScript.workspaceToCode(window.workspace);
        this.runButton = ''
    }

    window.initApi = function(interpreter, globalObject) {

        // Create custom rappers 
        var wrapper = function(cmd) {
            window.pan(cmd)
        }

        interpreter.setProperty(globalObject, 'pan', 
            interpreter.createNativeFunction(wrapper));


        var wrapper = function(cmd) {
            console.log(cmd)
        }

        interpreter.setProperty(globalObject, 'print', 
            interpreter.createNativeFunction(wrapper));


        // Add an API for the wait block.  See wait_block.js
        initInterpreterWaitForSeconds(interpreter, globalObject);
    }

    window.runBlocklyCode = function() {
        //console.log("latest Code: ", window.latestCode)
        window.interpreter = new Interpreter(window.latestCode, window.initApi);
        window.runner = function() {
            var hasMore =  window.interpreter.run();
            //console.log("hasMore: ", hasMore)
            if (hasMore) {
                setTimeout(window.runner, 10);
            } else {
                //console.log("window.resetInterpreter")
                window.resetInterpreter()
            }
        }
        window.runner()
    }


}

BlocklyInterface.prototype.init = function() {
    //console.log("Blockly interface started")
    window.generateCodeAndLoadIntoInterpreter()
    window.workspace.addChangeListener(function(event) {
        if (!(event instanceof Blockly.Events.Ui)) {
          // Something changed. Parser needs to be reloaded.
          window.resetInterpreter();
          window.generateCodeAndLoadIntoInterpreter();
          window.runBlockCode()
        }
    });
}

window.runBlockCode = function() {
   if (!window.interpreter){
       this.runButton = 'disabled'
       //console.log("setTimeout(window.runBlocklyCode, 1)")
       setTimeout(window.runBlocklyCode, 1)
   }
}

