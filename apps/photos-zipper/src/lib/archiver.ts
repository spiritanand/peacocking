import fs from "fs";
import archiver from "archiver";
import { nanoid } from "nanoid";
import path from "path";

const outputDirectory = "./zipped";

export class Archiver {
  id: string;
  outputPath: string;
  output: fs.WriteStream;
  archive: archiver.Archiver;

  constructor() {
    // Ensure the outputDirectory directory exists
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory, { recursive: true });

    // Generate a unique ID for tracking the zip
    this.id = nanoid();

    // Set the output path using the generated ID
    this.outputPath = path.join(outputDirectory, `${this.id}.zip`);

    // Create a file to stream archive data to
    this.output = fs.createWriteStream(this.outputPath);

    // Initialize the archiver instance
    this.archive = archiver("zip");

    // Listen for various events
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // 'close' event
    this.output.on("close", () => {
      console.log(this.archive.pointer() + " total bytes");
      console.log("Archiver has been finalized and the output file descriptor has closed.");
    });

    // 'end' event
    this.output.on("end", () => {
      console.log("Data has been drained");
    });

    // Warning event
    this.archive.on("warning", (err: any) => {
      if (err.code === "ENOENT") {
        console.warn("Warning:", err.message);
      } else {
        throw err;
      }
    });

    // Error event
    this.archive.on("error", (err: any) => {
      throw err;
    });

    // Pipe archive data to the file
    this.archive.pipe(this.output);
  }

  appendFileFromStream(filePath: string, name: string) {
    this.archive.append(fs.createReadStream(filePath), { name });
  }

  appendFileFromString(content: string, name: string) {
    this.archive.append(content, { name });
  }

  appendFileFromBuffer(buffer: Buffer, name: string) {
    this.archive.append(buffer, { name });
  }

  appendFile(filePath: string, name: string) {
    this.archive.file(filePath, { name });
  }

  appendDirectory(sourceDir: string, destDir: string | false) {
    this.archive.directory(sourceDir, destDir);
  }

  async finalizeArchive() {
    // Finalize the archive, which will finish the streams
    await this.archive.finalize();

    return this.outputPath; // Return the path to the created zip file
  }
}
