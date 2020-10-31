import { Request, Response } from "express";
import path from "path";

export const homeController = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "client" + "index.html"));
};
