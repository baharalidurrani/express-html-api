var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
function reset() {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const hundred = new Date(now.getTime() - 100 * 3600000)
    .toISOString()
    .split("T")[0];

  //@ts-ignore
  startDate.max = endDate.max = today;
  //@ts-ignore
  startDate.min = "2014-01-01";
  //@ts-ignore
  endDate.min = hundred;
  // @ts-ignore
  endDate.value = today;
  // @ts-ignore
  startDate.value = hundred;

  latest(null);
}
reset();

function startChange(e) {
  let ms = new Date(e.value).getTime();
  ms = ms + 24 * 60 * 60 * 1000;
  const min = new Date(ms).toISOString().split("T")[0];
  //@ts-ignore
  endDate.min = min;
}
function endChange(e) {
  let ms = new Date(e.value).getTime();
  ms = ms - 24 * 60 * 60 * 1000;
  const max = new Date(ms).toISOString().split("T")[0];
  //@ts-ignore
  startDate.max = max;
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

async function latest(input) {
  input ? null : (input = document.getElementById("reset"));
  try {
    input.disabled = true;
    const res = await fetch("api/latest");
    const jsonData = await res.json();
    console.log(jsonData.length, "records retrieved");
    input.disabled = false;
    config.data.labels = jsonData.map((r) =>
      new Date(r.date * 1000).toISOString()
    );
    config.data.datasets[0].data = jsonData.map((r) => r.price);
    chart.update();
  } catch (error) {
    input.disabled = false;
    throw error;
  }
}

async function historic(input) {
  try {
    input.disabled = true;
    // @ts-ignore
    const startMS = new Date(startDate.value).getTime();
    const start = parseInt((startMS / 1000).toFixed(0));
    // @ts-ignore
    const endMS = new Date(endDate.value).getTime();
    const end = parseInt((endMS / 1000).toFixed(0));

    const url = `api/historic?start=${start}&end=${end}`;
    const res = await fetch(url);
    const jsonData = await res.json();
    console.log(jsonData.length, "records retrieved");
    input.disabled = false;
    config.data.labels = jsonData.map((r) =>
      new Date(r.date * 1000).toISOString()
    );
    config.data.datasets[0].data = jsonData.map((r) => r.price);
    chart.update();
  } catch (error) {
    input.disabled = false;
    throw error;
  }
}
