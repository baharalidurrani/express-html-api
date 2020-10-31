import express from "express";
import { Router } from "./routes/root.routes";

const PORT = 3000;

const app = express();
app.use(express.static("./client"));

app.use(Router);

app.listen(PORT, () => {
  console.log(`Example app listening at http://127.0.0.1:${PORT}`);
});

app.use((req, res, next) => {
  res.status(404).sendFile("404.html", { root: "./client" });
});
