// import express from "express";
const express = require("express");
const path = require("path");
const nFetch = require("node-fetch");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "client" + "index.html"));
});

app.get("/api/current", async (req, res) => {
  const endpoint = `https://rest.coinapi.io/v1/exchangerate/BTC/USD`;
  const period = `1DAY`;
  const latest = `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=${period}`;
  const historic = `https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?period_id=${period}&time_start=2016-01-01T00:00:00`;

  const headers = {
    "X-CoinAPI-Key": "7922AEFB-B522-4E06-9720-2298F282EA12"
  };

  const apiRes = await nFetch(latest, { headers });
  const jsonData = await apiRes.json();

  res.send(jsonData);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
