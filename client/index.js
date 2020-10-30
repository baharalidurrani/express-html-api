var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
function reset() {
  //@ts-ignore
  startDate.max = endDate.max = new Date().toISOString().split("T")[0];
  //@ts-ignore
  startDate.min = endDate.min = "2014-01-01";

  // latest();
}
reset();

function startChange(e) {
  console.log("start change", e.value);
}
function endChange(e) {
  console.log("end change", e.value);
}

var config = {
  type: "line",

  data: {
    labels: [0, 0],
    datasets: [
      {
        label: "Bitcoin Price",
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        data: [0, 0]
      }
    ]
  },

  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Timeline"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Price in USD"
          }
        }
      ]
    }
  }
};

var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
//@ts-ignore
var chart = new Chart(ctx, config);

async function latest() {
  const res = await fetch("api/latest");
  const jsonData = await res.json();
  console.log(jsonData);
  config.data.labels = jsonData.map((r) =>
    new Date(r.date * 1000).toISOString()
  );
  config.data.datasets[0].data = jsonData.map((r) => r.price);
  chart.update();
}

async function historic() {
  console.log("click");
}
