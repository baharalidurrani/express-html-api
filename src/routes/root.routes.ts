import express from "express";
import { homeController } from "../controller/home.controller";
import {
  latestController,
  historicController
} from "../controller/cryptowat.controller";

export const Router = express.Router();

Router.get("/", homeController);
Router.get("/api/latest", latestController);
Router.get("/api/historic", historicController);
