anychart.onDocumentReady(function () {

    // create data
    var data = [
      {x: "A", value: 13},
      {x: "B", value: 14,
      
       normal:   {
           fill: "#5cd65c",
           stroke: null,
           label: {enabled: true}
         },
       hovered:  {
           fill: "#5cd65c",
           stroke: null,
           label: {enabled: true}
         },
       selected: {
           fill: "#5cd65c",
           stroke: null,
           label: {enabled: true}
         }
      },
      {x: "C", value: 10}
    ];

    // create a chart
    var chart = anychart.bar();

    // create a bar series and set the data
    var series = chart.bar(data);

    // set the chart title
    chart.title("Cantidad de mujeres por grupo");

    // set the titles of the axes
    chart.xAxis().title("Grupo");
    chart.yAxis().title("Cantidad de alumnos");

    // set the container id
    chart.container("barras");

    // initiate drawing the chart
   chart.draw();
});



// grafica de dispersion
$(document).ready(function() {  
  var chart = {
     type: 'scatter',
   zoomType: 'xy'
  };
  var title = {
     text: 'Altura - Peso por género'   
  };
  var subtitle = {
     text: 'Alumnos'  
  };
  var xAxis = {
     title: {
     enabled: true,
        text: 'Altura (cm)'
     },
     startOnTick: true,
     endOnTick: true,
     showLastLabel: true
  };
  var yAxis = {
     title: {
        text: 'Peso (kg)'
     }
  };
  var legend = {   
     layout: 'vertical',
     align: 'left',
     verticalAlign: 'top',
     x: 100,
     y: 70,
     floating: true,
     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
     borderWidth: 1
  }  
  var plotOptions = {
     scatter: {
        marker: {
           radius: 5,
           states: {
              hover: {
                 enabled: true,
                 lineColor: 'rgb(100,100,100)'
              }
           }
        },
        states: {
           hover: {
              marker: {
                 enabled: false
              }
           }
        },
        tooltip: {
           headerFormat: '<b>{series.name}</b><br>',
           pointFormat: '{point.x} cm, {point.y} kg'
        }
     }
  };
  var series= [{
           name: 'Mujeres',
           color: 'rgba(223, 83, 83, .5)',
           data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0],
          [155.8, 53.6], [175.3, 68.3]]

       }, {
           name: 'Hombres',
           color: 'rgba(119, 152, 191, .5)',
           data: [[174.0, 65.6], [175.3, 71.8], [179.1, 79.1],
               [180.3, 83.2], [180.3, 83.2], [161.2, 83.2]]      
     }
  ];     
     
  var json = {};   
  json.chart = chart; 
  json.title = title;   
  json.subtitle = subtitle; 
  json.legend = legend;
  json.xAxis = xAxis;
  json.yAxis = yAxis;  
  json.series = series;
  json.plotOptions = plotOptions;
  $('#dispersion').highcharts(json);
 
});


// Diagrama de cajas y vigotes
anychart.onDocumentReady(function () {
  var data = [    
    {x:"Grupo de personas A", low: 20, q1: 24.5, median: 33.5, q3: 39, high: 45},
    {x:"Grupo de personas B", low: 19, q1: 26.5, median: 29.5, q3: 38.5, high: 48}
  ]
  // create a chart
  chart = anychart.box();
  // create a box series and set the data
  series = chart.box(data);
  // set the container id
  chart.container("cajas");
  // initiate drawing the chart
  chart.draw();
});


//grafica de burbujas
$(document).ready(function() {  
  var chart = {
     type: 'bubble',
     zoomType: 'xy'
  };
  var title = {
     text: '% DE MERCADO'   
  };   
  var grupos = [{
          // productos, ventas, % de mercado
           data: 
           [[24, 28000, 27.61], 
           [20, 55000, 24.77], 
           [18, 24000, 30.81], 
           [22, 80000, 40.04], 
           [17, 35000, 15.77]]
       }
  ];     
     
  var json = {};   
  json.chart = chart; 
  json.title = title;     
  json.series = grupos;   
  $('#burbujas').highcharts(json);
 
});



// //histograma
var ctx = document.getElementById("histograma").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["10 - 15", "16 - 20", "21 - 25", "26 - 30"],
    // labels: ["Rangos de edad"]
    datasets: [{
      label: 'Mujeres',
      data: [12, 19, 13, 25],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },{
      label: 'Hombres',
      data: [14, 25, 29, 19],
      backgroundColor: 'rgba(74, 180, 252, 1)',
    }]
  },
  options: {
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 1.30,
      }, {
        display: true,
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});




// graficos de area


window.onload = function () {

   var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
         text: "Precipitaciones "
      },
      data: [{        
         type: "line",
            indexLabelFontSize: 16,
            dataPoints: [
               { x: new Date(2017, 0, 3), y: 17.6, indexLabel: "\u2193 Punto menor",markerColor: "DarkSlateGrey", markerType: "cross"},
               { x: new Date(2017, 1, 4), y: 42.8 },
               { x: new Date(2017, 0, 5), y: 82.2 },
               { x: new Date(2017, 2, 6), y: 107.0 },
               { x: new Date(2018, 0, 7), y: 115.4 },
               { x: new Date(2018, 8, 8), y: 38.0 },
               { x: new Date(2018, 9, 9), y: 86.0 },
               { x: new Date(2019, 0, 10), y: 129.4 },
               { x: new Date(2019, 4, 11), y: 32.3 },
               { x: new Date(2019, 9, 12), y: 166.2, indexLabel: "\u2191 Punto mayor",markerColor: "red", markerType: "triangle"},
               { x: new Date(2020, 9, 13), y: 65.0 }               
            ]
      }]
   });
   chart.render();
   
}