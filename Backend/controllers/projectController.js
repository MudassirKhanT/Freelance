import Project from "../models/Project.js";

// export const createProject = async (req, res) => {
//   try {
//     const {
//       title,
//       category,
//       subCategory,
//       description,
//       contactDescription, // 🆕 Added
//       isPrior,
//       toHomePage,
//       homePageOrder,
//     } = req.body;

//     const images = req.files?.images?.map((file) => file.path) || [];
//     const pdfFile = req.files?.pdfFile ? req.files.pdfFile[0].path : null;
//     const videoFile = req.files?.videoFile ? req.files.videoFile[0].path : null;

//     if (toHomePage && homePageOrder) {
//       const orderNum = Number(homePageOrder);
//       await Project.updateMany({ toHomePage: true, homePageOrder: { $gte: orderNum } }, { $inc: { homePageOrder: 1 } });
//     }

//     const newProject = new Project({
//       title,
//       category,
//       subCategory,
//       description,
//       contactDescription, // 🆕 Added
//       images,
//       pdfFile,
//       videoFile,
//       isPrior: isPrior === "true" || isPrior === true,
//       toHomePage: toHomePage === "true" || toHomePage === true,
//       homePageOrder: homePageOrder ? Number(homePageOrder) : null,
//     });

//     const savedProject = await newProject.save();

//     return res.status(201).json({
//       success: true,
//       message: "Project created successfully",
//       project: savedProject,
//     });
//   } catch (err) {
//     console.error("❌ Error creating project:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while creating project",
//       error: err.message,
//     });
//   }
// };

import fs from "fs";
import path from "path";
import sharp from "sharp";

export const createProject = async (req, res) => {
  try {
    const { title, category, subCategory, description, contactDescription, isPrior, toHomePage, homePageOrder } = req.body;

    const processedImages = [];

    if (req.files?.images) {
      for (const file of req.files.images) {
        const inputPath = file.path;

        // ✅ Read file into memory (prevents Windows lock)
        const buffer = await fs.promises.readFile(inputPath);

        // ✅ Sharp uses buffer, NOT file path
        const metadata = await sharp(buffer).metadata();
        console.log("Height:-", metadata.height);

        const ratio = (metadata.width / metadata.height).toFixed(3);

        const ext = path.extname(inputPath);
        const folder = path.dirname(inputPath);

        const newPath = path.join(folder, `${Date.now()}.${ratio}${ext}`);

        // ✅ Safe rename (no lock now)
        await fs.promises.rename(inputPath, newPath);

        processedImages.push(newPath);
      }
    }

    const pdfFile = req.files?.pdfFile ? req.files.pdfFile[0].path : null;

    const videoFile = req.files?.videoFile ? req.files.videoFile[0].path : null;

    if (toHomePage === "true" && homePageOrder) {
      await Project.updateMany({ toHomePage: true, homePageOrder: { $gte: Number(homePageOrder) } }, { $inc: { homePageOrder: 1 } });
    }

    const newProject = new Project({
      title,
      category,
      subCategory,
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

// export const createProject = async (req, res) => {
//   try {
//     const { title, category, subCategory, description, contactDescription, isPrior, toHomePage, homePageOrder } = req.body;

//     /* -----------------------------------------------------------
//        1) PROCESS IMAGES + EXTRACT ASPECT RATIO + RENAME FILE
//     ------------------------------------------------------------*/
//     const processedImages = [];

//     if (req.files?.images) {
//       for (const file of req.files.images) {
//         const inputPath = file.path;

//         // Read metadata
//         const metadata = await sharp(inputPath).metadata();
//         const width = metadata.width;
//         const height = metadata.height;

//         const ratio = (width / height).toFixed(3); // example: "1.777"

//         const ext = path.extname(inputPath); // .jpg / .png
//         const folder = path.dirname(inputPath);

//         // NEW FORMAT: timestamp.aspect.ext
//         const newName = `${Date.now()}.${ratio}${ext}`;
//         const newPath = `${folder}/${newName}`;

//         // Rename file
//         fs.renameSync(inputPath, newPath);

//         processedImages.push(newPath);
//       }
//     }

//     /* -----------------------------------------------------------
//        2) PROCESS PDF + VIDEO
//     ------------------------------------------------------------*/
//     const pdfFile = req.files?.pdfFile ? req.files.pdfFile[0].path : null;
//     const videoFile = req.files?.videoFile ? req.files.videoFile[0].path : null;

//     /* -----------------------------------------------------------
//        3) SHIFT HOME PAGE ORDER IF NEEDED
//     ------------------------------------------------------------*/
//     if (toHomePage === "true" && homePageOrder) {
//       const orderNum = Number(homePageOrder);

//       await Project.updateMany({ toHomePage: true, homePageOrder: { $gte: orderNum } }, { $inc: { homePageOrder: 1 } });
//     }

//     /* -----------------------------------------------------------
//        4) CREATE PROJECT DOCUMENT
//     ------------------------------------------------------------*/
//     const newProject = new Project({
//       title,
//       category,
//       subCategory,
//       description,
//       contactDescription,
//       images: processedImages,
//       pdfFile,
//       videoFile,
//       isPrior: isPrior === "true" || isPrior === true,
//       toHomePage: toHomePage === "true" || toHomePage === true,
//       homePageOrder: homePageOrder ? Number(homePageOrder) : null,
//     });

//     const savedProject = await newProject.save();

//     return res.status(201).json({
//       success: true,
//       message: "Project created successfully",
//       project: savedProject,
//     });
//   } catch (err) {
//     console.error("❌ Error creating project:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while creating project",
//       error: err.message,
//     });
//   }
// };

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, subCategory, description, isPrior, toHomePage, homePageOrder, contactDescription } = req.body;

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    /* -----------------------------------------------------------
       1) UPDATE BASIC FIELDS
    ------------------------------------------------------------*/
    existingProject.title = title || existingProject.title;
    existingProject.category = category || existingProject.category;
    existingProject.subCategory = subCategory || existingProject.subCategory;
    existingProject.description = description || existingProject.description;
    existingProject.contactDescription = contactDescription || existingProject.contactDescription;

    if (isPrior !== undefined) existingProject.isPrior = isPrior === "true";
    if (toHomePage !== undefined) existingProject.toHomePage = toHomePage === "true";
    if (homePageOrder !== undefined) existingProject.homePageOrder = Number(homePageOrder);

    /* -----------------------------------------------------------
       2) UPDATE IMAGES (if new ones uploaded)
    ------------------------------------------------------------*/
    if (req.files?.images) {
      const processedImages = [];

      for (const file of req.files.images) {
        const inputPath = file.path;

        const metadata = await sharp(inputPath).metadata();
        const width = metadata.width;
        const height = metadata.height;

        const ratio = (width / height).toFixed(3); // ex: "1.777"
        const ext = path.extname(inputPath);
        const folder = path.dirname(inputPath);

        // Save as timestamp.aspect.ext (keep dots)
        const newName = `${Date.now()}.${ratio}${ext}`;
        const newPath = `${folder}/${newName}`;

        fs.renameSync(inputPath, newPath);
        processedImages.push(newPath);
      }

      existingProject.images = processedImages;
    }

    /* -----------------------------------------------------------
       3) UPDATE PDF
    ------------------------------------------------------------*/
    if (req.files?.pdfFile) {
      existingProject.pdfFile = req.files.pdfFile[0].path;
    }

    /* -----------------------------------------------------------
       4) UPDATE VIDEO
    ------------------------------------------------------------*/
    if (req.files?.videoFile) {
      existingProject.videoFile = req.files.videoFile[0].path;
    }

    /* -----------------------------------------------------------
       5) SAVE PROJECT
    ------------------------------------------------------------*/
    await existingProject.save();

    return res.status(200).json(existingProject);
  } catch (error) {
    console.error("❌ Error updating project:", error);
    res.status(500).json({ message: "Server error" });
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
