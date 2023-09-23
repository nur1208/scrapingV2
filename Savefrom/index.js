import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";

import {
  scrapWeb,
  getHtmlJsonPath,
  getHref,
  getText,
  startAction,
} from "../utils/index.js";
const getYoutubeVideos = async () => {
  const { mainPageHtml, mainDataJson } =
    getHtmlJsonPath("Savefrom");
  const url =
    "https://www.youtube.com/watch?v=U2xlyxW6Xds&list=PLVWfp7qXLmKWAG5wXcJx8H2B0dEJUnLZS";
  const waitForSelector =
    "#video-title.ytd-playlist-panel-video-renderer";

  const html = await scrapWeb(url, waitForSelector);

  fs.writeFile(mainPageHtml, html, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });

  // const html = await promisify(fs.readFile)(mainPageHtml);

  let $ = cheerio.load(html.toString());
  const regex = /(?<=v\=).+?(?=\&)/g;

  return $("#playlist-items")
    .toArray()
    .map((a) => ({
      title: getText(
        $("#video-title.ytd-playlist-panel-video-renderer", $(a))
      ),
      videoId: getHref($("a", $(a))).match(regex)[0],
    }));
};

const downloadVideo = async (videoId) => {
  //   "https://www.youtube.com/watch?v=cc2D6t7tRcA";

  const url = `https://en.savefrom.net/383/#url=https://www.youtube.com/watch?v=${videoId}`;
  const mainSelector =
    "div.downloader-2.downloader-2-part2 .def-btn-box a";
  const customAdditional = async (page) => {
    console.log("processing... ");

    await page.waitForTimeout(1000 * 10);

    await page.click(mainSelector);

    await page.waitForTimeout(1000 * 60 * 2);
  };
  await scrapWeb(url, mainSelector, 1000 * 60, customAdditional);
};
(async () => {
  // step 1
  const videosID = await startAction(
    "getting youtube videos id",
    getYoutubeVideos
  );
  console.log(videosID);

  // step 2
  // for (let index = 40; index < videosID.length; index++) {
  //   const videoId = videosID[index];

  //   await startAction(
  //     `downloading youtube video number ${index + 1}`,
  //     () => downloadVideo(videoId)
  //   );
  // }
})();
