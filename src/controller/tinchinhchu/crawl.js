"use strict";
const puppeteer = require("puppeteer");
require("dotenv").config();
/**
 *
 */
async function main() {
  const browser = await puppeteer.launch({
    slowMo: 0,
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
  try {
    const page = await browser.newPage();

    await page.setCookie({
      domain: "hcm.tinchinhchu.vn",
      hostOnly: true,
      httpOnly: true,
      name: ".TINCHINHCHU.VN",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: true,
      storeId: "1",
      value: process.env.COOKIE,
    });
    await page.goto("http://hcm.tinchinhchu.vn/", {
      waitUntil: "networkidle2",
    });

    //  const text= await page.$$eval(
    //     "#dnn_ctr453_View_ctl00_grvNews > tbody > tr",
    //     (items) => {
    //       return items.map((item) => {
    //        try {
    //          const tdEle= document.querySelector('td.columTitle > a').getAttribute('href');
    //         // return item.textContent.trim();
    //         return tdEle;
    //        } catch (error) {
    //          return null
    //        }
    //       });
    //     }
    //   );
    //   console.log(text);
    for (let i = 0; i < 22; i++) {
      await page.click(`#dnn_ctr453_View_ctl00_grvNews_hplDetails_${i}`, {
        delay: 100,
        waitUntil:"networkidle2"
      });
      await page.click("#fancybox-close", { delay: 100 });
    }
    await browser.close();
  } catch (error) {
    await browser.close();
    console.log(error);
  }
}
// main();
module.exports = { main };
