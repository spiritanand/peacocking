import express from "express";
import { upload } from "./middleware/multer.js";
import { Archiver } from "./lib/archiver.js";
import fs from "fs";
import { promisify } from "util";
import { MulterError } from "multer";
import S3 from "./lib/s3.js";
const unlinkFile = promisify(fs.unlink);

const app = express();
const port = 8080;

app.get("/", (_req, res) => {
  res.json({ hi: "Hello, from Photos Zipper!" });
});

app.post("/zip", upload.array("photos", 30), async (req, res) => {
  let zipPath = "";
  const files = req.files;

  const archiverInstance = new Archiver();

  try {
    if (!files || (Array.isArray(files) && files.length === 0))
      return res.status(415).json({ error: "No valid file uploaded" });

    if (files && Array.isArray(files))
      for (const file of files) archiverInstance.appendFile(file.path, file.originalname);

    zipPath = await archiverInstance.finalizeArchive();
    const zipFileData = fs.createReadStream(zipPath);

    const s3 = new S3();
    await s3.upload(zipPath, zipFileData);

    const signedUrl = await s3.getSignedUrl(zipPath);

    return res.json({ zipUrl: signedUrl });
  } catch (err) {
    console.log({ err });

    if (err instanceof MulterError) return res.status(500).json({ error: "Multer error" });

    return res.status(500).json({ error: (err as Error)?.message ?? "Something went wrong" });
  } finally {
    // Remove the uploaded and zipped files
    if (files && Array.isArray(files))
      await Promise.allSettled(files.map((file) => unlinkFile(file.path)));

    if (zipPath) await unlinkFile(zipPath);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
