import puppeteer from "puppeteer";

export const scrapWeb = async (
  url,
  waitForSelector,
  timeout = 1000 * 60,
  customAdditional,
  headless = false
) => {
  const browser = await puppeteer.launch({
    headless,
    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto(url, {
    timeout,
  });
  await page.waitForSelector(waitForSelector, { timeout });

  customAdditional && (await customAdditional(page));
  const html = await page.evaluate(
    () => document.body.innerHTML
  );

  await browser.close();

  return html;
};
