import nFetch from "node-fetch";
import { Request, Response } from "express";
import { processResult } from "../utils/utils";
import { Cryptowat } from "../types/api";

const EXCHANGE = "kraken";
const PAIR = "btcusd";
const INTERVAL = 3600;

const CRYPTOWATCH_INTERVALS = [
  60,
  180,
  300,
  900,
  1800,
  3600,
  7200,
  14400,
  21600,
  43200,
  86400,
  259200,
  604800
];
const optimalInterval = (start: number, end: number) => {
  const goal = (end - start) / 50;
  return CRYPTOWATCH_INTERVALS.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
};

export const latestController = async (req: Request, res: Response) => {
  try {
    const end = parseInt((new Date().getTime() / 1000).toFixed(0));
    const start = end - 86400; //24hrs
    const latest = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${INTERVAL}`;

    const apiRes = await nFetch(latest);
    const jsonData = (await apiRes.json()) as Cryptowat;
    console.log("API Allowance Remaining", jsonData.allowance.remaining);
    const formatted = processResult(jsonData.result, INTERVAL);

    res.send(formatted);
  } catch (error) {
    console.log(error);
    res.status(503).send("Problem while fetching data from CryptoWatch API!");
  }
};

export const historicController = async (req: Request, res: Response) => {
  try {
    const start = req.query.start as string;
    const end = req.query.end as string;
    const interval =
      optimalInterval(parseInt(start), parseInt(end)) || INTERVAL;
    const history = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${interval}`;

    const apiRes = await nFetch(history);
    const jsonData = (await apiRes.json()) as Cryptowat;
    console.log("API Allowance Remaining", jsonData.allowance.remaining);
    const formatted = processResult(jsonData.result, interval);

    res.send(formatted);
  } catch (error) {
    console.log(error);
    res.status(503).send("Problem while fetching data from CryptoWatch API!");
  }
};
