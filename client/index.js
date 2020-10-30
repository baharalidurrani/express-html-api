//data for graph plot
const timeStart = [];
const timeEnd = [];
const date = [];

//fetch data
async function main() {
    const res = await fetch("api/current");
    const jsonData = await res.json();
    return jsonData;
}

//for historic data
function getHistory() {
    date = [];
    const start = document.getElementsByName("startDate");
    date.push(start);
    const end = document.getElementsByName("endDate");
    date.push(end)
}

//get arrays to plot graph
async function getData() {

    const data = await main();
    console.log(data);
    data.forEach(row => {
        timeStart.push(row.price_open)
        timeEnd.push(row.price_close)

        date.push(row.time_period_start);
        date.push(row.time_period_end);
    });

}

getData();

// Graph Plot
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
    labels: date,
    datasets: [{
            label: "Price Open",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "green",
            borderColor: "rgb(167, 105, 0)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "white",
            pointBackgroundColor: "black",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "brown",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: timeEnd,
            spanGaps: false,
        }, {
            label: "Price Close",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "red",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: timeStart,
            spanGaps: true,
        }

    ]
};

// options for line graph 
var options = {
    responsive: true,
    layout: {
        padding: {
            left: 50,
            top: 5
        }
    },
    legend: {
        display: true,
        position: "bottom",

    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            },
            scaleLabel: {
                display: true,
                labelString: 'Price cap',
                fontSize: 16
            }
        }]
    }
};

// Chart declaration:
var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});