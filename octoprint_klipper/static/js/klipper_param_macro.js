// OctoPrint Klipper Plugin
//
// Copyright (C) 2018  Martin Muehlhaeuser <github@mmone.de>
//
// This file may be distributed under the terms of the GNU GPLv3 license.

$(function() {
    function KlipperMacroDialogViewModel(parameters) {
        var self = this;
        
        self.parameters = ko.observableArray();
        self.interpolatedCmd;
        self.macro;
        self.macroName = ko.observable();
        
        var paramObjRegex = /{(.*?)}/g;
        var keyValueRegex = /(\w*)\s*:\s*([\w\s°"|]*)/g;
              
        self.process = function(macro) {
           self.macro = macro.macro();
           self.macroName(macro.name());
           
           var matches = self.macro.match(paramObjRegex);
           var params = [];
           
           for (var i=0; i < matches.length; i++) {
              var obj = {};
              var res = keyValueRegex.exec(matches[i]);
              
              while (res != null) {
                 if("options" == res[1]) {
                    obj["options"] = res[2].trim().split("|");
                 } else {
                    obj[res[1]] = res[2].trim();
                 }
                 res = keyValueRegex.exec(matches[i]);
              }
              
              if(!("label" in obj)) {
                 obj["label"] = "Input " + (i+1);
              }
              
              if(!("unit" in obj)) {
                 obj["unit"] = "";
              }
              
              if("default" in obj) {
                 obj["value"] = obj["default"];
              }
              
              params.push(obj);
           }
           self.parameters(params);
        }
        
        self.executeMacro = function() {
           var i=-1;
           
           function replaceParams(match) {
              i++;
              return self.parameters()[i]["value"];
           }
           // Use .split to create an array of strings which is sent to 
           // OctoPrint.control.sendGcode instead of a single string.
           expanded = self.macro.replace(paramObjRegex, replaceParams)
           expanded = expanded.split(/\r\n|\r|\n/);

           OctoPrint.control.sendGcode(expanded);
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: KlipperMacroDialogViewModel,
        dependencies: [],
        elements: ["#klipper_macro_dialog"]
    });
});
