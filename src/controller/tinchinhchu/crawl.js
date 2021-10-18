"use strict";
const puppeteer = require("puppeteer");

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
      value:
        "5C2B1AF60096B7640A1DBFB5631049711740C9AA197A83E6E6466BA6368F127840A411C2953339017BFA4E557AF0FB24F7B95FA7D25BB6C3F4CA4F9C8E321403275F7A3EAC6CA9308EC1CAE6C67A138140149C411C7B197CFBEABA4F8A807489DA97D897B2A7D62A827240E9BC6AD41E933A7603",
    });
    await page.goto("http://hcm.tinchinhchu.vn/", {
      waitUntil: "networkidle2",
    });

   const text= await page.$$eval(
      "#dnn_ctr453_View_ctl00_grvNews > tbody > tr[align='left']",
      (items) => {
        return items.map((item) => {
         try {
          // console.log(item.textContent());
          return item.textContent.trim();
         } catch (error) {
           return null
         }
        });
      }
    );
    console.log(text);
    await browser.close();
  } catch (error) {
    await browser.close();
    console.log(error);
  }
}
main();
module.exports = { main };
