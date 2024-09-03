import multer, { type FileFilterCallback } from "multer";
import { nanoid } from "nanoid";
import fs from "fs";

export const uploadDir = "./uploads";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb): void => {
      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      cb(null, uploadDir);
    },
    filename: (_req, file, cb): void => {
      cb(null, `${nanoid()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.includes("image")) callback(null, true);
    else callback(null, false);
  },
});
