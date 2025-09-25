import aboutUs from "../models/aboutSchema.js";

export const createAbout = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "please fill all form" });
    }
    const creation = await aboutUs.create({ name, email, address });
    return res.status(201).json({
      message: "create aboutus",
      data: creation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAbout = async (req, res) => {
  try {
    const getreq = await aboutUs.find();
    return res.status(200).json({
      message: "get about",
      data: getreq,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const updateAboutUs = await aboutUs.findByIdAndUpdate(
      req.params.id,
      { name, email, address },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "update about us",
      data: updateAboutUs,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const deleteAboutUs = await aboutUs.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "delete about us",
      data: deleteAboutUs,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
