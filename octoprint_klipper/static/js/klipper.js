// OctoPrint Klipper Plugin
//
// Copyright (C) 2018  Martin Muehlhaeuser <github@mmone.de>
//
// This file may be distributed under the terms of the GNU GPLv3 license.

$(function() {
    function KlipperViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];
        self.loginState = parameters[1];
        self.connectionState = parameters[2];
        self.levelingViewModel = parameters[3];
        self.paramMacroViewModel = parameters[4];
        
        self.shortStatus = ko.observable();
        self.logMessages = ko.observableArray();
        
        self.showLevelingDialog = function() {
           var dialog = $("#klipper_leveling_dialog");
           dialog.modal({
              show: 'true',
              backdrop: 'static',
              keyboard: false
           });
           self.levelingViewModel.initView();
        }
        
        self.showPidTuningDialog = function() {
           var dialog = $("#klipper_pid_tuning_dialog");
           dialog.modal({
              show: 'true',
              backdrop: 'static',
              keyboard: false
           });
        }
        
        self.showOffsetDialog = function() {
           var dialog = $("#klipper_offset_dialog");
           dialog.modal({
              show: 'true',
              backdrop: 'static'
           });
        }
        
        self.showGraphDialog = function() {
           var dialog = $("#klipper_graph_dialog");
           dialog.modal({
              show: 'true',
              minHeight: "500px",
              maxHeight: "600px"
           });
        }
        
        self.executeMacro = function(macro) {
           var paramObjRegex = /{(.*?)}/g;
           
           if (macro.macro().match(paramObjRegex) == null) {
              OctoPrint.control.sendGcode(
                 // Use .split to create an array of strings which is sent to 
                 // OctoPrint.control.sendGcode instead of a single string.
                 macro.macro().split(/\r\n|\r|\n/)
              );
           } else {
              self.paramMacroViewModel.process(macro);
              
              var dialog = $("#klipper_macro_dialog");
              dialog.modal({
                 show: 'true',
                 backdrop: 'static'
              });
           }
        }
     
        self.onGetStatus = function() {
           OctoPrint.control.sendGcode("Status")
        }
        
        self.onRestartFirmware = function() {
           OctoPrint.control.sendGcode("FIRMWARE_RESTART")
        };
        
        self.onRestartHost = function() {
           OctoPrint.control.sendGcode("RESTART")
        };
        
        self.onAfterBinding = function() {
           self.connectionState.selectedPort(self.settings.settings.plugins.klipper.connection.port());
        }
        
        self.onDataUpdaterPluginMessage = function(plugin, message) {
           if(plugin == "klipper") {
              if(message["type"] == "status") {
                 self.shortStatus(message["payload"]);
              } else {
                 self.logMessage(message["time"], message["subtype"], message["payload"]);
              }
           }
        }

        self.logMessage = function(timestamp, type, message) {
           self.logMessages.push({
              time: timestamp,
              type: type,
              msg: message.replace(/\n/gi, "<br>")}
           );
        }
        
        self.onClearLog = function() {
           self.logMessages.removeAll();
        };
        
        self.isActive = function() {
           return self.connectionState.isOperational() && self.loginState.isUser();
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: KlipperViewModel,
        dependencies: [
           "settingsViewModel",
           "loginStateViewModel",
           "connectionViewModel",
           "klipperLevelingViewModel",
           "klipperMacroDialogViewModel"
        ],
        elements: ["#tab_plugin_klipper_main", "#sidebar_plugin_klipper", "#navbar_plugin_klipper"]
    });
});