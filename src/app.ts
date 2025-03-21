import express, { Express } from "express";
import path from "path";
import apiRoute from "./routes/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoute);

app.listen(9468, () => {
  console.log("🚀 ~ app.listen ~ 9468:");
});
