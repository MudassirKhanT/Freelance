import Studio from "../models/studioModel.js";

// Get all studio entries
export const getStudios = async (req, res) => {
  try {
    const studios = await Studio.find().sort({ createdAt: -1 });
    res.status(200).json(studios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching studios", error });
  }
};

// Get one studio
export const getStudioById = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    res.status(200).json(studio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching studio", error });
  }
};

// Create studio
export const createStudio = async (req, res) => {
  try {
    const { title, description, location, contact, email } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const studio = new Studio({ title, description, location, contact, email, image });
    await studio.save();
    res.status(201).json(studio);
  } catch (error) {
    res.status(500).json({ message: "Error creating studio", error });
  }
};

// Update studio
export const updateStudio = async (req, res) => {
  try {
    const { title, description, location, contact, email } = req.body;
    const updateData = { title, description, location, contact, email };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const studio = await Studio.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!studio) return res.status(404).json({ message: "Studio not found" });

    res.status(200).json(studio);
  } catch (error) {
    res.status(500).json({ message: "Error updating studio", error });
  }
};

// Delete studio
export const deleteStudio = async (req, res) => {
  try {
    const studio = await Studio.findByIdAndDelete(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    res.status(200).json({ message: "Studio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting studio", error });
  }
};
