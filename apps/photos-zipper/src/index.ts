import express from "express";
import { upload } from "./middleware/multer.js";

const app = express();
const port = 8080;

app.get("/", (_req, res) => {
  res.send("Hello, from Photos Zipper!");
});

app.post("/zip", upload.array("photos", 30), (req, res) => {
  const files = req.files;
  console.log({ files });

  res.send("Photos zipped successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
