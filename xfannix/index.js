import cheerio from "cheerio";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import {
  scrapWeb,
  getHtmlJsonPath,
  getHref,
  getText,
  startAction,
  getFolderName,
  getHtmlJsonPathV2,
} from "../utils/index.js";

const getTreeData = async () => {
  const { mainPageHtml, mainDataJson } = getHtmlJsonPathV2(
    import.meta.url
  );

  console.log({ mainPageHtml, mainDataJson });
};

(async () => {
  // step 1

  getTreeData();
})();
