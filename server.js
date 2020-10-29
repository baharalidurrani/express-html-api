// import express from "express";
const express = require("express");
const path = require("path");
const nFetch = require("node-fetch");
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/client"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req, res) => {
    res.render("index.ejs", {});
});


app.get("/api/current", async(req, res) => {
    const endpoint = `https://rest.coinapi.io/v1/exchangerate/BTC/USD`;
    const period = `1DAY`;
    const latest = `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=${period}`;
    const historic = `https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?time_start=${'2016-01-01T00:00:00'}&time_end=${'2016-01-01T00:00:00'}`;

    const headers = {
        "X-CoinAPI-Key": "7922AEFB-B522-4E06-9720-2298F282EA12"
    };

    const apiRes = await nFetch(latest, { headers });
    const jsonData = await apiRes.json();
    // console.log(jsonData)
    res.send(jsonData);
});


app.post("/api/current/post", urlencodedParser, async(req, res) => {

    const data = fetch(`https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?time_start=${req.body.start}&time_end=${req.body.end}`, {
        method: 'POST', // or 'PUT'
        headers: {
            "X-CoinAPI-Key": "7922AEFB-B522-4E06-9720-2298F282EA12"
        },
        body: JSON.stringify(data),
    })
    const jsonData = await apiRes.json();
    console.log(jsonData);

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});