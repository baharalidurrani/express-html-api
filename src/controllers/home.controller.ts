import { Request, Response } from "express";

export const homeController = (req: Request, res: Response) => {
  res.sendFile("index.html", { root: "../../client" });
};
