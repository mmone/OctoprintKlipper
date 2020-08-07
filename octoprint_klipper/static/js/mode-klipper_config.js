ace.define("ace/mode/klipper_config_highlight_rules",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var KlipperConfigHighlightRules = function() {
    
        this.$rules = {
            start: [{
                include: "#single_line_comment"
            }, {
                include: "#config_block"
            }, {
                include: "#config_line"
            }, {
                include: "#number"
            }, {
                include: "#config_line_start_gcode"
            }],
            "#single_line_comment": [{
                token: "comment.line.number-sign",
                regex: /#.*$/
            }, {
                token: "comment.line.gcode",
                regex: /;.*$/
            }],
            "#number": [{
                token: "constant.numeric",
                regex: /\-?\d+(?:[\.,]\d+)?\b/
            }, {
                token: "constant.numeric",
                regex: /\-?[\.,]\d+?\b/
            }],
            "#boolean": [{
                token: "constant.language",
                regex: /\b(?:true|false)\b/,
                caseInsensitive: true
            }],
            "#config_block": [{
                token: "text",
                regex: /^\[/,
                push: [{
                    token: "text",
                    regex: /\]\s*$/,
                    next: "pop"
                }, {
                    include: "#known_config_block_name"
                }, {
                    include: "#known_driver_type"
                }, {
                    defaultToken: "keyword.control"
                }]
            }],
            "#known_config_block_name": [{
                token: "storage.type",
                regex: /\b(?:ad5206|adc_temperature|bed_mesh|bed_screws|bed_tilt|bltouch|board_pins|controller_fan|delayed_gcode|delta_calibrate|display|display_data|display_template|dotstar|dual_carriage|endstop_phase|extruder_stepper|extruder[1-9]{0,1}|fan|filament_switch_sensor|firmware_retraction|force_move|gcode_arcs|gcode_button|gcode_macro|hall_filament_width_sensor|heater_bed|heater_fan|heater_generic|homing_heaters|homing_override|idle_timeout|include|manual_stepper|mcp4018|mcp4451|mcp4728|mcu|menu|multi_pin|neopixel|output_pin|pause_resume|printer|probe|quad_gantry_level|replicape|respond|safe_z_home|samd_sercom|screws_tilt_adjust|servo|skew_correction|static_digital_output|stepper_(?:bed|arm|[abcdxy]|z[1-9]{0,1})|sx1509|temperature_fan|temperature_sensor|thermistor|tsl1401cl_filament_width_sensor|verify_heater|virtual_sdcard|z_tilt)\b/,
                caseInsensitive: true
            }],
            "#known_driver_type": [{
                token: "support.type",
                regex: /\btmc(?:2130|2208|2209|2660|5160)\b/,
                caseInsensitive: true
            }],
            "#known_thermistor_type": [{
                token: "support.type",
                regex: /\b(?:EPCOS 100K B57560G104F|ATC Semitec 104GT-2|NTC 100K beta 3950|Honeywell 100K 135-104LAG-J01|NTC 100K MGB18-104F39050L32)\b/,
                caseInsensitive: true
            }],
            "#known_extruder_sensor_type": [{
                token: "support.type",
                regex: /\b(?:MAX6675|MAX31855|MAX31856|MAX31865|PT100 INA826|AD595|AD8494|AD8495|AD8496|AD8497|PT1000|BME280)\b/,
                caseInsensitive: true
            }],
            "#known_control_type": [{
                token: "support.type",
                regex: /\b(?:watermark|pid)\b/,
                caseInsensitive: true
            }],
            "#known_display_type": [{
                token: "support.type",
                regex: /\b(?:hd44780|st7920|uc1701|ssd1306|sh1106)\b/,
                caseInsensitive: true
            }],
            "#serial": [{
                token: "support.type",
                regex: /\/dev\/serial\/by-(?:id|path)\/[\d\w\/\-:\.]+/
            }],
            "#pin": [{
                token: "support.type",
                regex: /[\^~!]*(?:ar|analog)\d{1,2}/,
                caseInsensitive: true
            }, {
                token: "support.type",
                regex: /(?<![\w\d])[\^~!]*(?:z:)?[a-z]{1,2}\d{1,2}(?:\.\d{1,2})?/,
                caseInsensitive: true
            }],
            "#config_line_start_gcode": [{
                token: ["variable.name", "text"],
                regex: /^(gcode)(\s*[:=]\s*)/,
                push: [{
                    token: "text",
                    regex: /(?=(\[))/,
                    next: "start"
                }, {
                    include: "#gcode_line"
                }, {
                    include: "#single_line_comment"
                }]
            }],
            "#config_line": [{
                token: ["variable.name", "text"],
                regex: /^(?!(gcode))(\w+)(\s*[:=]\s*)/,
                push: [{
                    token: "text",
                    regex: /$/,
                    next: "pop"
                }, {
                    include: "#known_thermistor_type"
                }, {
                    include: "#known_extruder_sensor_type"
                }, {
                    include: "#known_control_type"
                }, {
                    include: "#known_display_type"
                }, {
                    include: "#pin"
                }, {
                    include: "#serial"
                }, {
                    include: "#number"
                }, {
                    include: "#boolean"
                }, {
                    include: "#single_line_comment"
                }]
            }],
           "#gcode_line": [{
                include: "#gcode_command"
            }, {
                include: "#gcode_extended_command"
            }, {
                include: "#gcode_parameter"
            }, {
                include: "#gcode_extended_parameter"
            }, {
                include: "#gcode_macro_block"
            }],
            "#gcode_command": [{
                token: ["text", "keyword.operator"],
                regex: /^(\s*)([A-z]+)(?![A-z])/,
                caseInsensitive: true,
                push: [{
                    token: "text",
                    regex: /(\s|$)/,
                    next: "pop"
                }, {
                    include: "#number"
                }, {
                    include: "#gcode_macro_block"
                }]
            }],
            "#gcode_parameter": [{
                token: "variable.parameter",
                regex: /\b[A-z]+(?![a-z])/,
                caseInsensitive: true,
                push: [{
                    token: "text",
                    regex: /(\s|$)/,
                    next: "pop"
                }, {
                    include: "#number"
                }, {
                    include: "#gcode_macro_block"
                }]
            }],
            "#gcode_extended_command": [{
                token: "keyword.operator",
                regex: /^\s*(?:ABORT|ACCEPT|ACTIVATE_EXTRUDER|BED_MESH_CALIBRATE|BED_MESH_CLEAR|BED_MESH_MAP|BED_MESH_OUTPUT|BED_MESH_PROFILE|BED_SCREWS_ADJUST|BED_TILT_CALIBRATE|BLTOUCH_DEBUG|BLTOUCH_STORE|CALC_MEASURED_SKEW|CLEAR_PAUSE|DELTA_ANALYZE|DELTA_CALIBRATE|DUMP_TMC|ENDSTOP_PHASE_CALIBRATE|FIRMWARE_RESTART|FORCE_MOVE|GET_CURRENT_SKEW|GET_POSITION|GET_RETRACTION|HELP|MANUAL_PROBE|MANUAL_STEPPER|PAUSE|PID_CALIBRATE|PROBE|PROBE_ACCURACY|PROBE_CALIBRATE|QUAD_GANTRY_LEVEL|QUERY_ADC|QUERY_ENDSTOPS|QUERY_FILAMENT_SENSOR|QUERY_PROBE|RESPOND|RESTART|RESTORE_GCODE_STATE|RESUME|SAVE_CONFIG|SAVE_GCODE_STATE|SCREWS_TILT_CALCULATE|SET_DUAL_CARRIAGE|SET_EXTRUDER_STEP_DISTANCE|SET_FILAMENT_SENSOR|SET_GCODE_OFFSET|SET_GCODE_VARIABLE|SET_HEATER_TEMPERATURE|SET_IDLE_TIMEOUT|SET_KINEMATIC_POSITION|SET_LED|SET_PIN|SET_PRESSURE_ADVANCE|SET_RETRACTION|SET_SERVO|SET_SKEW|SET_STEPPER_ENABLE|SET_TMC_CURRENT|SET_TMC_FIELD|SET_VELOCITY_LIMIT|SKEW_PROFILE|STATUS|STEPPER_BUZZ|TESTZ|TUNING_TOWER|TURN_OFF_HEATERS|UPDATE_DELAYED_GCODE|Z_ENDSTOP_CALIBRATE|Z_TILT_ADJUST)\s/,
                caseInsensitive: true
            }],
            "#gcode_extended_parameter": [{
                token: ["variable.parameter", "text"],
                regex: /\b(AC|ACCEL|ACCEL_TO_DECEL|AD|ADVANCE|ANGLE|BAND|BD|BLUE|CARRIAGE|CLEAR|COMMAND|CURRENT|DISTANCE|DURATION|ENABLE|EXTRUDER|FACTOR|FIELD|GREEN|HEATER|HOLDCURRENT|ID|INDEX|LED|LIFT_SPEED|LOAD|MACRO|METHOD|MODE|MOVE_SPEED|MSG|NAME|PARAMETER|PGP|PIN|PREFIX|PROBE_SPEED|PULLUP|RED|REMOVE|RETRACT_LENGTH|RETRACT_SPEED|SAMPLE_RETRACT_DIST|SAMPLES|SAMPLES_RESULT|SAMPLES_TOLERANCE|SAMPLES_TOLERANCE_RETRIES|SAVE|SENSOR|SERVO|SET_POSITION|SMOOTH_TIME|SPEED|SQUARE_CORNER_VELOCITY|START|STEPPER|STOP_ON_ENDSTOP|SYNC|TARGET|TIMEOUT|TRANSMIT|TYPE|UNRETRACT_EXTRA_LENGTH|UNRETRACT_SPEED|VALUE|VARIABLE|VELOCITY|WIDTH|WRITE_FILE|X|X_ADJUST|XY|XZ|Y|Y_ADJUST|YZ|Z|Z_ADJUST)(=)/,
                caseInsensitive: true,
                push: [{
                    token: "text",
                    regex: /[^\d\w]/,
                    next: "pop"
                }, {
                    token: "constant.language",
                    regex: /5V|average|command|echo|error|manual|median|OD|output_mode_store|pin_down|pin_up|reset|self_test|set_5V_output_mode|set_5V_output_mode|set_OD_output_mode|touch_mode/,
                    caseInsensitive: true
                }, {
                    include: "#number"
                }, {
                    include: "#gcode_macro_block"
                }]
            }],
            "#gcode_macro_block": [{
                token: "string.unquoted",
                regex: /{/,
                push: [{
                    token: "string.unquoted",
                    regex: /}/,
                    next: "pop"
                }, {
                    defaultToken: "string.unquoted"
                }]
            }]
        }
    
        this.normalizeRules();
    };
    
    KlipperConfigHighlightRules.metaData = {
        "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
        name: "Klipper Config",
        scopeName: "source.klipper-config"
    }
    
    
    oop.inherits(KlipperConfigHighlightRules, TextHighlightRules);
    
    exports.KlipperConfigHighlightRules = KlipperConfigHighlightRules;
    });
    
    ace.define("ace/mode/folding/cstyle",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../../lib/oop");
    var Range = require("../../range").Range;
    var BaseFoldMode = require("./fold_mode").FoldMode;
    
    var FoldMode = exports.FoldMode = function(commentRegex) {
        if (commentRegex) {
            this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
            );
            this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
            );
        }
    };
    oop.inherits(FoldMode, BaseFoldMode);
    
    (function() {
    
        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
        this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
        this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
        this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
        this._getFoldWidgetBase = this.getFoldWidget;
        this.getFoldWidget = function(session, foldStyle, row) {
            var line = session.getLine(row);
    
            if (this.singleLineBlockCommentRe.test(line)) {
                if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                    return "";
            }
    
            var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
            if (!fw && this.startRegionRe.test(line))
                return "start"; // lineCommentRegionStart
    
            return fw;
        };
    
        this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
            var line = session.getLine(row);
    
            if (this.startRegionRe.test(line))
                return this.getCommentRegionBlock(session, line, row);
    
            var match = line.match(this.foldingStartMarker);
            if (match) {
                var i = match.index;
    
                if (match[1])
                    return this.openingBracketBlock(session, match[1], row, i);
    
                var range = session.getCommentFoldRange(row, i + match[0].length, 1);
    
                if (range && !range.isMultiLine()) {
                    if (forceMultiline) {
                        range = this.getSectionRange(session, row);
                    } else if (foldStyle != "all")
                        range = null;
                }
    
                return range;
            }
    
            if (foldStyle === "markbegin")
                return;
    
            var match = line.match(this.foldingStopMarker);
            if (match) {
                var i = match.index + match[0].length;
    
                if (match[1])
                    return this.closingBracketBlock(session, match[1], row, i);
    
                return session.getCommentFoldRange(row, i, -1);
            }
        };
    
        this.getSectionRange = function(session, row) {
            var line = session.getLine(row);
            var startIndent = line.search(/\S/);
            var startRow = row;
            var startColumn = line.length;
            row = row + 1;
            var endRow = row;
            var maxRow = session.getLength();
            while (++row < maxRow) {
                line = session.getLine(row);
                var indent = line.search(/\S/);
                if (indent === -1)
                    continue;
                if  (startIndent > indent)
                    break;
                var subRange = this.getFoldWidgetRange(session, "all", row);
    
                if (subRange) {
                    if (subRange.start.row <= startRow) {
                        break;
                    } else if (subRange.isMultiLine()) {
                        row = subRange.end.row;
                    } else if (startIndent == indent) {
                        break;
                    }
                }
                endRow = row;
            }
    
            return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
        };
        this.getCommentRegionBlock = function(session, line, row) {
            var startColumn = line.search(/\s*$/);
            var maxRow = session.getLength();
            var startRow = row;
    
            var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
            var depth = 1;
            while (++row < maxRow) {
                line = session.getLine(row);
                var m = re.exec(line);
                if (!m) continue;
                if (m[1]) depth--;
                else depth++;
    
                if (!depth) break;
            }
    
            var endRow = row;
            if (endRow > startRow) {
                return new Range(startRow, startColumn, endRow, line.length);
            }
        };
    
    }).call(FoldMode.prototype);
    
    });
    
    ace.define("ace/mode/klipper_config",[], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var KlipperConfigHighlightRules = require("./klipper_config_highlight_rules").KlipperConfigHighlightRules;
    var FoldMode = require("./folding/cstyle").FoldMode;
    
    var Mode = function() {
        this.HighlightRules = KlipperConfigHighlightRules;
        this.foldingRules = new FoldMode();
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
        this.$id = "ace/mode/klipper_config"
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
    });                (function() {
                        ace.require(["ace/mode/klipper_config"], function(m) {
                            if (typeof module == "object" && typeof exports == "object" && module) {
                                module.exports = m;
                            }
                        });
                    })();
