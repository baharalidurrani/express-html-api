import express from "express";
import { homeController } from "../controllers/home.controller";
import {
  latestController,
  historicController
} from "../controllers/cryptowat.controller";

export const Router = express.Router();

Router.get("/", homeController);
Router.get("/api/latest", latestController);
Router.get("/api/historic", historicController);
