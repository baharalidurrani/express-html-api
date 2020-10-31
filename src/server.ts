import express from "express";
import path from "path";
import nFetch from "node-fetch";

import { processResult } from "./utils/utils";

const PORT = 3000;
const EXCHANGE = "kraken";
const PAIR = "btcusd";
const INTERVAL = 3600;

const app = express();

app.use(express.static(__dirname + "./../client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "client" + "index.html"));
});

app.get("/api/latest", async (req, res) => {
  const end = parseInt((new Date().getTime() / 1000).toFixed(0));
  const start = end - 86400;
  const latest = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${INTERVAL}`;

  const apiRes = await nFetch(latest);
  const jsonData = await apiRes.json();
  console.log("API Allowance Remaining", jsonData.allowance.remaining);
  const formatted = processResult(jsonData.result, INTERVAL);

  res.send(formatted);
});

app.get("/api/historic", async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const history = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${INTERVAL}`;

  const apiRes = await nFetch(history);
  const jsonData = await apiRes.json();
  console.log("API Allowance Remaining", jsonData.allowance.remaining);
  const formatted = processResult(jsonData.result, INTERVAL);

  res.send(formatted);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://127.0.0.1:${PORT}`);
});
