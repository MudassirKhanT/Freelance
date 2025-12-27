import Project from "../models/Project.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const createProject = async (req, res) => {
  try {
    const { title, category, subCategory, description, contactDescription, isPrior, toHomePage, homePageOrder } = req.body;

    // ✅ FIX: prevent empty string enum error
    const cleanedSubCategory = subCategory && subCategory.trim() !== "" ? subCategory : undefined;

    /* -------------------- IMAGE PROCESSING ------------------- */
    const processedImages = [];

    if (req.files?.images) {
      for (const file of req.files.images) {
        const inputPath = file.path;

        // Read file into memory (prevents Windows lock)
        const buffer = await fs.promises.readFile(inputPath);

        // Sharp metadata
        const metadata = await sharp(buffer).metadata();
        const ratio = (metadata.width / metadata.height).toFixed(3);

        const ext = path.extname(inputPath);
        const folder = path.dirname(inputPath);
        const newPath = path.join(folder, `${Date.now()}.${ratio}${ext}`);

        // Safe rename
        await fs.promises.rename(inputPath, newPath);

        processedImages.push(newPath);
      }
    }

    /* -------------------- FILES ------------------- */
    const pdfFile = req.files?.pdfFile ? req.files.pdfFile[0].path : null;

    // image / gif / video (kept name as videoFile)
    const videoFile = req.files?.videoFile ? req.files.videoFile[0].path : null;

    /* ---------------- HOME PAGE ORDER ---------------- */
    if (toHomePage === "true" && homePageOrder) {
      await Project.updateMany({ toHomePage: true, homePageOrder: { $gte: Number(homePageOrder) } }, { $inc: { homePageOrder: 1 } });
    }

    /* ---------------- CREATE PROJECT ---------------- */
    const newProject = new Project({
      title,
      category,
      subCategory: cleanedSubCategory,
      description,
      contactDescription,
      images: processedImages,
      pdfFile,
      videoFile,
      isPrior: isPrior === "true" || isPrior === true,
      toHomePage: toHomePage === "true" || toHomePage === true,
      homePageOrder: homePageOrder ? Number(homePageOrder) : null,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (err) {
    console.error("❌ Error creating project:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
      error: err.message,
    });
  }
};

/* ============================================================
   UPDATE PROJECT
============================================================ */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, subCategory, description, isPrior, toHomePage, homePageOrder, contactDescription } = req.body;

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    /* ---------------- BASIC FIELDS ---------------- */
    if (title) existingProject.title = title;
    if (category) existingProject.category = category;

    // ✅ FIX: handle empty subCategory safely
    if (subCategory !== undefined) {
      existingProject.subCategory = subCategory.trim() === "" ? undefined : subCategory;
    }

    if (description) existingProject.description = description;
    if (contactDescription) existingProject.contactDescription = contactDescription;

    if (isPrior !== undefined) existingProject.isPrior = isPrior === "true" || isPrior === true;

    if (toHomePage !== undefined) existingProject.toHomePage = toHomePage === "true" || toHomePage === true;

    if (homePageOrder !== undefined) existingProject.homePageOrder = Number(homePageOrder);

    /* ---------------- UPDATE IMAGES ---------------- */
    if (req.files?.images) {
      const processedImages = [];

      for (const file of req.files.images) {
        const inputPath = file.path;
        const buffer = await fs.promises.readFile(inputPath);
        const metadata = await sharp(buffer).metadata();

        const ratio = (metadata.width / metadata.height).toFixed(3);
        const ext = path.extname(inputPath);
        const folder = path.dirname(inputPath);
        const newPath = path.join(folder, `${Date.now()}.${ratio}${ext}`);

        await fs.promises.rename(inputPath, newPath);
        processedImages.push(newPath);
      }

      existingProject.images = processedImages;
    }

    /* ---------------- UPDATE PDF ---------------- */
    if (req.files?.pdfFile) {
      existingProject.pdfFile = req.files.pdfFile[0].path;
    }

    /* ---------------- UPDATE VIDEO / IMAGE / GIF ---------------- */
    if (req.files?.videoFile) {
      existingProject.videoFile = req.files.videoFile[0].path;
    }

    /* ---------------- SAVE ---------------- */
    await existingProject.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: existingProject,
    });
  } catch (error) {
    console.error("❌ Error updating project:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get home page projects
export const getHomePageProjects = async (req, res) => {
  try {
    const projects = await Project.find({ toHomePage: true }).sort({ homePageOrder: 1 }); // order ascending
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all projects (sorted by isPrior + latest)
export const getProjects = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    // Sort by isPrior first (true first), then latest createdAt
    const projects = await Project.find(query).sort({ isPrior: -1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
