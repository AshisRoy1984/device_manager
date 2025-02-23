'use strict';

$(document).ready(function() {

    
	function generateData(baseval, count, yrange) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

			series.push([x, y, z]);
			baseval += 86400000;
			i++;
		}
		return series;
	}

// counter number 
$('.counters').each(function() {
    $(this).prop('Counter', 0.0).animate({
      Counter: $(this).text().replace(/,/g, '')
    }, {
      duration: 2000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now).toLocaleString());
      }
    });
  });

	// Column chart
    if($('#sales_chart').length > 0 ){
    	var columnCtx = document.getElementById("sales_chart"),
    	columnConfig = {
    		colors: ['#FFD599', '#FFD599'],
    		series: [
    			
    			{
    			name: "Pending",
    			type: "column",
    			data: [23, 42, 35, 27, 43, 22]
    			}
    		],
    		chart: {
    			type: 'bar',
    			fontFamily: 'Poppins, sans-serif',
    			height: 200,
    			toolbar: {
    				show: false
    			}
    		},
    		plotOptions: {
    			bar: {
    				horizontal: false,
    				columnWidth: '60%',
    				// endingShape: 'rounded'
    			},
    		},
    		dataLabels: {
    			enabled: false
    		},
    		stroke: {
    			show: true,
    			width: 2,
    			colors: ['transparent']
    		},
    		xaxis: {
    			categories: [' ', ' ', ' ', ' ', ' ', ' '],
    		},
    	
    		fill: {
    			opacity: 1
    		},
    		tooltip: {
    			y: {
    				formatter: function (val) {
    					return "$ " + val + " thousands"
    				}
    			}
    		}
    	};
    	var columnChart = new ApexCharts(columnCtx, columnConfig);
    	columnChart.render();
    }


    
	// Column chart
    if($('#sales_chart2').length > 0 ){
    	var columnCtx = document.getElementById("sales_chart2"),
    	columnConfig = {
    		colors: ['#0E5FD9', '#0E5FD9'],
    		series: [
    			
    			{
    			name: "Pending",
    			type: "column",
    			data: [23, 42, 35, 27, 43, 22]
    			}
    		],
    		chart: {
    			type: 'bar',
    			fontFamily: 'Poppins, sans-serif',
    			height: 200,
    			toolbar: {
    				show: false
    			}
    		},
    		plotOptions: {
    			bar: {
    				horizontal: false,
    				columnWidth: '60%',
    				endingShape: 'rounded'
    			},
    		},
    		dataLabels: {
    			enabled: false
    		},
    		stroke: {
    			show: true,
    			width: 2,
    			colors: ['transparent']
    		},
    		xaxis: {
    			categories: [' ', ' ', ' ', ' ', ' ', ' '],
    		},
    	
    		fill: {
    			opacity: 1
    		},
    		tooltip: {
    			y: {
    				formatter: function (val) {
    					return "$ " + val + " thousands"
    				}
    			}
    		}
    	};
    	var columnChart = new ApexCharts(columnCtx, columnConfig);
    	columnChart.render();
    }

    

	// Simple Line
    if($('#s-line').length > 0 ){
    var sline = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      // colors: ['#4361ee'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      series: [{
        name: "Project",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      
      grid: {
        row: {
          colors: ['#f1f2f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    }

    var chart = new ApexCharts(
      document.querySelector("#s-line"),
      sline
    );

    chart.render();
    }



// Simple Bar
if($('#s-bar').length > 0 ){
var sBar = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
    },
    colors: ['#4361ee'],
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    xaxis: {
        categories: ['Delta Bottled Water Factory CO.LLC', 'Mawared Al-Hayattrd. CO', 'Nile Soft Drinks Bottling Factory', 'Al Jomaih Bottling Plant', 'Afnan Water Factory', 'Refreshment Trading CO(KUWAIT)', 'Dubhai Refreshment (P.S.C)Dubai-pep', 'Middle East & North Africa Beverage', 'Sudanese German Factory', 'Sudanese German'],
    }
}

var chart = new ApexCharts(
    document.querySelector("#s-bar"),
    sBar
);

chart.render();
}


  
	
if($('#sales_charts').length > 0) {
	var options = {
		series: [{
		name: 'Sales',
		data: [90, 70, 100, 80 ],
	  
	  }],
	  colors: ['#0FAF62', '#0FAF62'],
		chart: {
		type: 'area',
		height: 250,
		stacked: true,
		
		zoom: {
		  enabled: true
		}
	  },
	  responsive: [{
		breakpoint: 20,
		options: {
		  legend: {
			position: 'bottom',
			offsetY: 0
		  }
		}
	  }],
	  plotOptions: {
		bar: {
		  horizontal: false,
		  columnWidth: '0%',
		  endingShape: ''
		},
	  },
	  xaxis: {
		categories: ['   ', ' ', ' ', ' '
		],
	  },
	  legend: {
		position: 'right',
		offsetY: 40
	  },
	  fill: {
		opacity: 1
	  }
	  };

	  var chart = new ApexCharts(document.querySelector("#sales_charts"), options);
	  chart.render();
	}

	
/* line chart */

	 var options = {
          series: [
          {
			name:" ",
            data: [20, 21, 18, 22],
          },
          {
			name:" ",
            data: [6, 7, 5, 8]
          }
        ],
          chart: {
          height: 250,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },

        colors: ['#0FAF62', '#E84646'],
        dataLabels: {
          enabled: true,
		  borderWidth: 1 
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
        //   text: 'Average High & Low Temperature',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: [' ', ' ', ' ', ' '],
          title: {
			show: false
          }
        },
        yaxis: {
          title: {
			show: false
          },
          min: 0,
          max: 25
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -0,
          offsetX: -0
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();




	 /* -----  Apex Line1 Chart ----- */
	 var options = {
		series: [
			{
			  name:" ",
			  data: [20, 21, 18, 22, 20, 21, 18, 22, 21, 18,],
			},
			{
			  name:" ",
			  data: [6, 7, 5, 8, 6, 7, 5, 8, 6, 7, ]
			}
		  ],
        chart: {
            height: 150,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
		
		colors: ['#0FAF62', '#E84646'],
       
        
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], opacity: .2
            },
            borderColor: 'transparent'
        },
        yaxis: {
            labels: {
                show: false
            },
            min: 0
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',  ' '],
          
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#apex-line-chart1"),
        options
    );
    chart.render();

	
  
});






