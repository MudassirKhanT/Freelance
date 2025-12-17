import Press from "../models/Press.js";

export const createPress = async (req, res) => {
  try {
    const { title, description, date, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPress = await Press.create({ title, description, date, image, link });
    res.status(201).json(newPress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPress = async (req, res) => {
  try {
    const press = await Press.find();
    res.json(press);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePress = async (req, res) => {
  try {
    const { title, description, date, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Press.findByIdAndUpdate(req.params.id, { title, description, date, link, ...(image && { image }) }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePress = async (req, res) => {
  try {
    await Press.findByIdAndDelete(req.params.id);
    res.json({ message: "Press deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
