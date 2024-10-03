import express from "express";
import { upload } from "./middleware/multer.js";
import { Archiver } from "./lib/archiver.js";
import fs from "fs";
import dotenv from "dotenv";
import { MulterError } from "multer";
import cors, { type CorsOptions } from "cors";
import { promisify } from "util";
import { createSignedUrl, uploadToS3 } from "./lib/s3.js";
const unlinkFile = promisify(fs.unlink);

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// CORS configuration
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin && !isProduction) return callback(null, true); // Allow non-browser requests in local development

    if (isProduction) {
      const allowedDomains = ["https://peacocking.pro"]; // Add your production domains
      if (origin && allowedDomains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // Allow localhost:3001 in development
      if (origin === "http://localhost:3001") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
};

const app = express();
const port = 8080;

app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.json({ hi: "Hello, from Photos Zipper!" });
});

app.post("/zip", upload.array("photos", 30), async (req, res) => {
  let localZipPath = "";
  const files = req.files;

  if (!files || (Array.isArray(files) && files.length === 0))
    return res.status(415).json({ error: "No valid file uploaded" });

  const archiverInstance = new Archiver();

  try {
    if (files && Array.isArray(files))
      for (const file of files) archiverInstance.appendFile(file.path, file.originalname);

    localZipPath = await archiverInstance.finalizeArchive();

    // Read in the file, convert it to base64, store to S3
    const fileStream = fs.createReadStream(localZipPath);
    fileStream.on("error", function (err) {
      if (err) throw err;
    });
    fileStream.on("open", async function () {
      await uploadToS3(localZipPath, fileStream);

      const zipUrl = await createSignedUrl(localZipPath);
      return res.json({ success: true, zipUrl });
    });

    // FAL
    // const zipFileBuffer = fs.readFileSync(localZipPath);
    // const zipFileBlob = new Blob([zipFileBuffer], { type: "application/zip" });
    // const zipUrl = await fal.storage.upload(zipFileBlob);
    // return res.json({ success: true, zipUrl });
  } catch (err) {
    console.log({ err });

    if (err instanceof MulterError) return res.status(500).json({ error: "Multer error" });

    return res.status(500).json({ error: (err as Error)?.message ?? "Something went wrong" });
  } finally {
    // Remove the uploaded and zipped files
    if (files && Array.isArray(files))
      await Promise.allSettled(files.map((file) => unlinkFile(file.path)));

    // if (zipPath) await unlinkFile(zipPath);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
