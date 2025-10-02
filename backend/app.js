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
      "http://localhost:5173", // Local React dev server
      "https://note-keepings-app.netlify.app", // Netlify deployed frontend (NO trailing slash)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ For parsing JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to DB
databaseConnection();

// ✅ Routes
app.use("/api/v1", noteRoute);
app.use("/api/v1/about", aboutRoute);

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({
    activeStatus: true,
    error: false,
    message: "Backend is running ✅",
  });
});

// ✅ For Vercel: don't listen here, just export
// If running locally (node app.js), enable app.listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

export default app;
