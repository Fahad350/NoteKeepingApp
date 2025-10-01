import express from "express";
import cors from "cors";
import databaseConnection from "./connections/database.js";
import dotenv from "dotenv";
import noteRoute from "./routers/noteRoute.js";
import aboutRoute from "./routers/aboutRoute.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(
  cors({
    origin: ["http://localhost:4000", "https://note-keepings-app.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
databaseConnection;

app.use("/api/v1", noteRoute);
app.use("/api/v1/about", aboutRoute);
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});
app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});
