import path from "path";
import { fileURLToPath } from "url";

export const getHtmlJsonPathV2 = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);

  const __dirname = path.dirname(__filename);
  const mainPageHtml = `${__dirname}\\pageHtml.html`;
  const mainDataJson = `${__dirname}\\data.json`;

  return { mainPageHtml, mainDataJson };
};
