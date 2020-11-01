import nFetch from "node-fetch";
import { Request, Response } from "express";
import { processResult } from "../utils/utils";
import { Cryptowat } from "../types/api";

const EXCHANGE = "kraken";
const PAIR = "btcusd";
const INTERVAL = 3600;

export const latestController = async (req: Request, res: Response) => {
  try {
    const end = parseInt((new Date().getTime() / 1000).toFixed(0));
    const start = end - 86400;
    const latest = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${INTERVAL}`;

    const apiRes = await nFetch(latest);
    const jsonData = (await apiRes.json()) as Cryptowat;
    console.log("API Allowance Remaining", jsonData.allowance.remaining);
    const formatted = processResult(jsonData.result, INTERVAL);

    res.send(formatted);
  } catch (error) {
    res.status(503).send(error);
  }
};

export const historicController = async (req: Request, res: Response) => {
  try {
    const start = req.query.start;
    const end = req.query.end;
    const history = `https://api.cryptowat.ch/markets/${EXCHANGE}/${PAIR}/ohlc?after=${start}&before=${end}&periods=${INTERVAL}`;

    const apiRes = await nFetch(history);
    const jsonData = (await apiRes.json()) as Cryptowat;
    console.log("API Allowance Remaining", jsonData.allowance.remaining);
    const formatted = processResult(jsonData.result, INTERVAL);

    res.send(formatted);
  } catch (error) {
    res.status(503).send(error);
  }
};
