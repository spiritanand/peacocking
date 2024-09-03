import express from "express";
import { upload } from "./middleware/multer.js";
import { Archiver } from "./lib/archiver.js";
import fs from "fs";
import { promisify } from "util";
import multer from "multer";
const unlinkFile = promisify(fs.unlink);

const app = express();
const port = 8080;

app.get("/", (_req, res) => {
  res.send("Hello, from Photos Zipper!");
});

app.post("/zip", upload.array("photos", 30), async (req, res) => {
  const files = req.files;

  const archiverInstance = new Archiver();

  try {
    if (!files || (Array.isArray(files) && files.length === 0))
      return res.status(415).json({ error: "No valid file uploaded" });

    if (files && Array.isArray(files))
      for (const file of files) archiverInstance.appendFile(file.path, file.originalname);

    const zipPath = await archiverInstance.finalizeArchive();

    // Remove the uploaded files after they are zipped using Promise.allSettled
    if (files && Array.isArray(files))
      await Promise.allSettled(files.map((file) => unlinkFile(file.path)));

    await unlinkFile(zipPath);

    return res.json({ zipUrl: zipPath });
  } catch (err) {
    if (err instanceof multer.MulterError) return res.status(500).json({ error: "Multer error" });

    return res.status(500).json({ error: (err as Error)?.message ?? "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
