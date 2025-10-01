import express from "express";
import cors from "cors";
import databaseConnection from "./connections/database.js";
import dotenv from "dotenv";
import noteRoute from "./routers/noteRoute.js";
import aboutRoute from "./routers/aboutRoute.js";

dotenv.config({ path: "./config.env" });

const app = express();

// ✅ Fix CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local React dev server (adjust if different)
      "https://note-keepings-app.netlify.app", // Netlify deployed frontend (NO trailing slash)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to DB
databaseConnection();

const PORT = process.env.PORT || 5000;

// Routes
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
