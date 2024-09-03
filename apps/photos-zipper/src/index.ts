import express from "express";
import { upload } from "./middleware/multer.js";
import { Archiver } from "./lib/archiver.js";

const app = express();
const port = 8080;

app.get("/", (_req, res) => {
  res.send("Hello, from Photos Zipper!");
});

app.post("/zip", upload.array("photos", 30), async (req, res) => {
  const files = req.files;
  console.log({ files });

  const archiverInstance = new Archiver();

  if (files)
    if (Array.isArray(files))
      for (const file of files) archiverInstance.appendFile(file.path, file.originalname);

  const zipPath = await archiverInstance.finalizeArchive();

  res.json({ zipUrl: zipPath });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
