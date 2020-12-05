var createCustomBlocks = function(){

    /* pan() */
    var panBy = {
        "message0": "pan by %1",
        "args0": [
          {"type": "input_value", "name": "ANGLE", "check": "Number"}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 355
      };
      
      Blockly.Blocks['pan_by'] = {
        init: function() { this.jsonInit(panBy); }
      };

    Blockly.JavaScript['pan_by'] = function(block) {
        var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE',
        Blockly.JavaScript.ORDER_NONE)
        angle = angle > 1.5 ? 1.5 : angle
        angle = angle < -1.5 ? -1.5 : angle
        code = `pan(${angle})`
        return code;
    }

    /* Print */
    var print = {
        "message0": "print %1",
        "args0": [
          {"type": "input_value", "name": "MSG", "check": "Number"}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_VARIABLES_HUE}"
    };

    Blockly.Blocks['print'] = {
        init: function() { this.jsonInit(print); }
    };

    Blockly.JavaScript['print'] = function(block) {
        var msg = Blockly.JavaScript.valueToCode(block, 'MSG',
        Blockly.JavaScript.ORDER_NONE)
        return `print(${msg})`
    }
      

    /* Alpha */
    var alpha = {
        "message0": "Alpha",
        "output": "Number",
        "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
        "extensions": ["parent_tooltip_when_inline"]
    }

    Blockly.Blocks['alpha'] = {
        init: function() { this.jsonInit(alpha); }
    };


    Blockly.JavaScript['alpha'] = function(block) {
        return Date.now()
    }

}
