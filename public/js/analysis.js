// google.charts.load('current', {'packages':['timeline']});
google.charts.load('current', {packages: ['corechart', 'bar']});
var hoursData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var chartData = [];
$(document).ready(function() {
	console.log('got to this');
	$.get("/getAllData", function(data, status){
		var parsedData = JSON.parse(data);
		var baseHtml = '<table style="width:100%"><tr><th>Caller Name</th><th>Date</th><th>Receiver Name</th><th>Phone Number</th><th>Call Recording</th><th>Transcription Details</th><th>Call Transcription</th></tr>'
		var htmlTable = baseHtml;
		if (status === 'success') {
			for (i in parsedData) {
				var convo = parsedData[i];
				console.log(convo);
				htmlTable += '<tr>'
		// 1) date (store day of the week seperately)
		// 2) Number
		// 3) Name  
		// 4) call transcription (via a button to a new window)
		// 5) call recording (via a button)
		// example convo
		// {"_id":"58eead0e4bbe0f5ef3bd72fa","updatedAt":"2017-04-12T22:41:18.026Z","createdAt":"2017-04-12T22:41:18.026Z","transcriptionUrl":"https://api.twilio.com/2010-04-01/Accounts/AC9cf7aec71223f7cecc9e2eb1c1d7632a/Recordings/RE3c58315695adc606724d4eaf9ebf279d","recordingUrl":"https://api.twilio.com/2010-04-01/Accounts/AC9cf7aec71223f7cecc9e2eb1c1d763…3877793738e383a84ee072353/Payloads/XH0353842062eeb6d6566302819b366c02/Data","transcription":"this is the second call I've made I'm just curious to see if this is working three two one ","receiverName":"John Rick","receiverNumber":"+1 510-332-4325","__v":0,"callerName":"Admin","callerNumber":"+15107579475","created":"2017-04-12T22:41:18.016Z"}]
				var startDate = new Date(convo['createdAt']);
				htmlTable += '<td>'+convo['callerName']+'</td>';
				htmlTable += '<td>'+startDate.toString()+'</td>';
				htmlTable += '<td>'+convo['receiverName']+'</td>';
				htmlTable += '<td>'+convo['receiverNumber']+'</td>';
				htmlTable += '<td><a href="'+convo['transcriptionUrl']+'" class="button">Listen</a></td>';
				htmlTable += '<td><a href="'+convo['recordingUrl']+'" class="button">View</a></td>';
				htmlTable += '<td>'+convo['transcription']+'</td></tr>';
				chartData.push([convo['receiverName'], startDate, addMinutes(startDate, 5)]);
				hoursData[startDate.getHours()] += 1;
			}
			if(htmlTable === baseHtml) {
				htmlTable = '<h2>Make a call! No data to show.</h2>';
			} else {
				htmlTable += '</table>'
				google.charts.setOnLoadCallback(drawCharts);
			}
		} else {
			htmlTable = '<h2>Error retreiving data.</h2>';
		}
		$('#callTable').html(htmlTable);
    });
});


function addMinutes(date, minutes) {
	console.log(date);
    return new Date(date.getTime() + minutes*60000);
}

// function drawBarChart() {
// 	  var inputDataForBarChart = [];
// 	  console.log(hoursData);
// 	  var j = 0
// 	  for(i in hoursData) {
// 	  	obj = {v: [1, 0, 0], f: '1 am'};
// 	  	j = parseInt(i) + 1;
// 	  	inputDataForBarChart.push([{v: [j, 0, 0], f: 'Hour:'+j}, hoursData[i]]);
// 	  }
// 	  console.log(inputDataForBarChart);
//       var data = new google.visualization.DataTable();
//       data.addColumn('timeofday', 'Time of Day');
//       data.addColumn('number', 'Calls');

//       data.addRows(inputDataForBarChart);

//       var options = google.charts.Bar.convertOptions({
//         title: 'Total Calls Made and Received Throughout the Day',
//         height: 450
//       });

//       var chart = new google.charts.Bar(document.getElementById('chart_div'));

//       chart.draw(data, options);
//     }

// function drawChartGraphic() {
//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Receiver Name');
//   data.addColumn('date', 'Start Start');
//   data.addColumn('date', 'End Time');

//   data.addRows(chartData);

//   var options = {
//     height: 450,
//     timeline: {
//       groupByRowLabel: true
//     }
//   };


function drawBasicBarChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Number of Calls');
      	  var inputDataForBasicBarChart = [];
	  console.log(hoursData);
	  var j = 0
	  for(i in hoursData) {
	  	obj = {v: [1, 0, 0], f: '1 am'};
	  	j = parseInt(i) + 1;
	  	inputDataForBasicBarChart.push([{v: [j, 0, 0], f: ''}, hoursData[i]]);
	  }

      data.addRows(inputDataForBasicBarChart);

      var options = {
        title: 'Number of Calls Made and Received Throughout the Day, Grouped By Hour',
        height: 450,
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          // viewWindow: {
          //   min: [7, 30, 0],
          //   max: [17, 30, 0]
          // }
        },
        vAxis: {
          title: 'Number of calls'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }

function drawCharts() {
	drawBasicBarChart();
}
