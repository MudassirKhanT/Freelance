// import multer from "multer";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     let folder = "uploads/";

//     if (file.mimetype.startsWith("video/")) {
//       folder = "uploads/videos/";
//     }

//     fs.mkdirSync(folder, { recursive: true });
//     cb(null, folder);
//   },

//   filename(req, file, cb) {
//     const tempName = Date.now() + "-" + file.originalname;
//     cb(null, tempName);
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "uploads/others/";

    if (file.mimetype.startsWith("video/")) {
      folder = "uploads/videos/";
    } else if (file.mimetype.startsWith("image/")) {
      folder = "uploads/images/";
    }

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image, gif, or video files are allowed"), false);
    }
  },
});

export default upload;
