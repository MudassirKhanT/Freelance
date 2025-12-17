import Team from "../models/Team.js";

export const createTeamMember = async (req, res) => {
  try {
    const { name, role, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newMember = await Team.create({ name, role, image, description });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { name, role, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Team.findByIdAndUpdate(req.params.id, { name, role, description, ...(image && { image }) }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
