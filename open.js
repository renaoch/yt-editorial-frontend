import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory path using `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://yt-editorial-backend.onrender.com";
const LOCALHOST_URL = "https://yt-editorial-backend.onrender.com";
const VITE_URL = "BASE_URL";

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace the localhost URLs
  content = content.replace(new RegExp(LOCALHOST_URL, "g"), BASE_URL);
  content = content.replace(new RegExp(VITE_URL, "g"), "BASE_URL");

  fs.writeFileSync(filePath, content, "utf8");
}

function replaceInDir(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      replaceInDir(fullPath); // Recursively process directories
    } else if (stats.isFile() && file.endsWith(".js")) {
      replaceInFile(fullPath); // Only process .js files
    }
  });
}

const rootDir = __dirname; // Current directory
replaceInDir(rootDir);
console.log("Replacement complete!");
