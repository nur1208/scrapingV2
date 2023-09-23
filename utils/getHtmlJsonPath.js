import path from "path";
import { fileURLToPath } from "url";

export const getHtmlJsonPath = (folderPath) => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);
  //   console.log("directory-name 👉️", __dirname);
  const projectPath = __dirname
    .split("\\")
    .slice(0, __dirname.split("\\").length - 1)
    .join("\\");
  const mainPageHtml = folderPath
    ? `${projectPath}\\${folderPath}\\pageHtml.html`
    : `${__dirname}\\pageHtml.html`;
  const mainDataJson = folderPath
    ? `${projectPath}\\${folderPath}\\data.json`
    : `${__dirname}\\data.json`;

  return { mainPageHtml, mainDataJson };
};
