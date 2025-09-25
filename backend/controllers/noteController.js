import Note from "../models/noteSchema.js";
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "please enter title and content here!" });
    }
    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const modify = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!modify) {
      return res.status(404).json({ message: "data not found !" });
    }
    return res.status(200).json(modify);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "not delted this data" });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
