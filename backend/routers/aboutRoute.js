import express from "express";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "../controllers/aboutController.js";

const router = express.Router();

router.post("/create-about", createAbout);
router.get("/get-about", getAbout);
router.put("/update-about/:id", updateAbout);
router.delete("/delete-about/:id", deleteAbout);

export default router;
