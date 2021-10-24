"use strict";
const puppeteer = require("puppeteer");

async function botMain() {
  console.log(process.env);
  const browser = await puppeteer.launch({
    slowMo: 100,
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--no-zygote",
      "--disable-setuid-sandbox",
      "--disable-accelerated-2d-canvas",
      "--disable-dev-shm-usage",
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
    ],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://id.muaban.net/", {
    waitUntil: "networkidle2",
  });
  await page.type("#UserName", process.env.PHONE);
  await page.type("#Password", process.env.PASS);
  
    await page.click("button[data-gtm-action='sign-in']");

    await page.waitForTimeout(10000);
    await page.click("a[data-gtm-action='add-posting']");
    await page.waitForTimeout(1000);
  
  await page.click(
    "#page-wrap > div.main-container.lazy > div.page-content.container.mbn-posting.clearfix > div.post-step-1 > div > div:nth-child(1) > ul > li:nth-child(1) > a > span > span.category-name",
    { delay: 100 }
  );
  await page.click(
    "#page-wrap > div.main-container.lazy > div.page-content.container.mbn-posting.clearfix > div.post-step-1 > div > div:nth-child(2) > ul > li:nth-child(1) > a"
  );
  await page.waitForTimeout(1000)
  await page.select('select[data-placeholder="Chọn Tỉnh/Thành"]',"0");
  await page.select('select[data-placeholder="Chọn quận/huyện"]',"0");

  await page.waitForTimeout(1000);

  await browser.close();
}
module.exports = { botMain };
