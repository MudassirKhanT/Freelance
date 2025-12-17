// import multer from "multer";
// import fs from "fs";
// import sharp from "sharp";

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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "uploads/";

    if (file.mimetype.startsWith("video/")) {
      folder = "uploads/videos/";
    }

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename(req, file, cb) {
    const tempName = Date.now() + "-" + file.originalname;
    cb(null, tempName);
  },
});

const upload = multer({ storage });

export default upload;
