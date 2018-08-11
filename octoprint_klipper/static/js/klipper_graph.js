$(function() {

function KlipperGraphViewModel(parameters) {
   var self = this;
   self.header = {
      "x-api-key": "2CE2F6BA87244897B7F3A1BED3B1A3ED",
      "content-type": "application/json",
      "cache-control": "no-cache"
   }
   
   self.apiUrl = "http://corexy.local/api/plugin/klipper"
   self.availableLogFiles = ko.observableArray();
   self.logFile = ko.observable();
   
   self.onStartup = function() {
      self.listLogFiles();
   }
   
   self.listLogFiles = function() {
      var settings = {
        "url": self.apiUrl,
        "method": "POST",
        "headers": self.header,
        "processData": false,
        "dataType": "json",
        "data": JSON.stringify({command: "listLogFiles"})
      }
      
      $.ajax(settings).done(function (response) {
         self.availableLogFiles(response["data"]);
      });
   }
   
   self.loadData = function() {
      var settings = {
        "crossDomain": true,
        "url": self.apiUrl,
        "method": "POST",
        "headers": self.header,
        "processData": false,
        "dataType": "json",
        "data": JSON.stringify(
           {
              command: "getStats",
              logFile: self.logFile()
           }
        )
      }

      $.ajax(settings).done(function (response) {
         //console.log(response.times);

         ctx = $("#klipper_graph_canvas")[0].getContext("2d");
         var myChart = new Chart(ctx, {
            type: 'line',
            data: {
               labels: response.times,
               datasets: [
                  {
                     label: "MCU Load",
                     backgroundColor: "rgba(75, 75, 75, 0.5)",
                     borderColor: "rgb(75, 75, 75)",
                     fill: false,
                     pointRadius: 0,
                     borderColor: "#FF0000",
                     borderWidth: 1,
                     data: response.loads
                  },
                  {
                     label: "Bandwith",
                     backgroundColor: "rgba(75, 192, 192, 0.5)",
                     borderColor: "rgb(75, 192, 192)",
                     fill: false,
                     pointRadius: 0,
                     borderWidth: 1,
                     data: response.bwdeltas
                  },
                  {
                     label: "Hostbuffers",
                     backgroundColor: "rgba(54, 162, 235, 0.5)",
                     borderColor: "rgb(54, 162, 235)",
                     fill: false,
                     pointRadius: 0,
                     borderWidth: 1,
                     data: response.buffers
                  },
                  {
                     label: "Awake",
                     backgroundColor: "rgba(255, 99, 132, 0.5)",
                     borderColor: "rgb(255, 99, 132",
                     fill: false,
                     pointRadius: 0,
                     borderWidth: 1,
                     data: response.awake
                  }
               ]
            },
            options: {
               elements:{
                  line: {
                     tension: 0
                  }
               },
               scales: {
                  xAxes: [{
                     type: 'time',
                     distribution: "linear",
                     time: {
                        parser: "X",
                        displayFormats: {
                           millisecond: "HH:mm:ss",
                           second: 'HH:mm:ss',
                           minute: 'HH:mm:ss'
                        },
                        tooltipFormat: "HH:mm:ss"
                     },
                     scaleLabel: {
                        display: true,
                        labelString: 'Time'
                     }
                  }],
                  yAxes: [{
                     scaleLabel: {
                        display: true,
                        labelString: '%'
                     }
                  }]
               }
            }
         });
        
      });
   }
}

OCTOPRINT_VIEWMODELS.push({
      construct: KlipperGraphViewModel,
      dependencies: [],
      elements: ["#klipper_graph_dialog"]
   });
});
