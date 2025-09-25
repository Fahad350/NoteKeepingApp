import express from "express";
import {
  createNote,
  deleteNotes,
  getAllNotes,
  updateNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/note-create", createNote);
router.get("/all-notes", getAllNotes);
router.put("/update-notes/:id", updateNotes);
router.delete("/delete-notes/:id", deleteNotes);

export default router;
