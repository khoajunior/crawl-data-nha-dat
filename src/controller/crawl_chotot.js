const puppeteer = require("puppeteer");
require("dotenv").config();
const fs = require("fs");
const list = [
  "/tp-ho-chi-minh/quan-8/mua-ban-nha-dat/88403203.htm",
  "/tp-ho-chi-minh/quan-go-vap/mua-ban-nha-dat/88470437.htm",
];

const addressElement = {
  so_dien_thoai:
    "#__next > div.container > div.ct-detail.adview > div > div.col-md-4.no-padding.dtView > div > div:nth-child(2) > div.LeadButton_wrapperLeadButtonDesktop__13fEA > div.LeadButton_showPhoneButton__1KVb- > div > div > span",
  tieu_de:
    "#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > h1",
  gia: "#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > div.AdDecription_priceWrapper__38i3q > div.AdDecription_adPrice__1Ps8j > span > div > span > span > span:nth-child(1)",
  dia_chi:
    "#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > div:nth-child(5) > div > div > div.media-body.media-middle.AdParam_address__1pmCR.AdParam_addressClickable__1_93I > span",
  mo_ta:
    "#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > p",
};
// const expect =require('jest')
/**
 * cào danh sách id bài đăng
 * CHỢ TỐT
 */
async function crawlListData() {
  const browser = await puppeteer.launch({
    slowMo: 100,
    // headless: false,
  });
  const page = await browser.newPage();
  // let data = [];
  for (let i = 1; i <= 10; i++) {
    // console.log(i);
    await page.goto(
      `https://nha.chotot.com/tp-ho-chi-minh/mua-ban-nha-dat?page=${i}&f=p`,
      { waitUntil: "networkidle2" }
    );

    const result = await page.$$eval(
      "#__next > div.container.ct-listing > div.styles_listViewWrapper__162PR > div.styles_base__2D2wo > main > div.no-padding.col-md-8.ct-col-8 > div.list-view > div > div",
      (el) => {
        let arr = [];
        el.forEach((n) => {
          const ul = n.querySelectorAll("ul");
          ul.forEach((e) => {
            const div = e.querySelectorAll("div");
            div.forEach((r) => {
              try {
                const a = r.querySelector("li > a").getAttribute("href");
                const a_format = a.replace(
                  "[object Object]",
                  "mua-ban-nha-dat"
                );
                arr.push(a_format);
              } catch (error) {}
            });
          });
        });
        //
        return arr;
      }
    );
    const fileData = fs.readFileSync(__dirname+"/data.json");
    const fileData_format = fileData.toString();
    const fileData_format2 = JSON.parse(fileData_format);
    // const data_format = data.flat(Infinity);
    result.forEach((item) => {
      if (item) {
        // console.log(i);
        // console.log(item);
        fileData_format2.push(item);
      }
    });
    fs.writeFileSync(__dirname+"/data.json", JSON.stringify(fileData_format2));
  }

  await browser.close();
}
async function crawl_detail({ addressElement }) {
  const browser = await puppeteer.launch({
    slowMo: 100,
    headless: false,
  });
  const page = await browser.newPage();
  //
  const fileData = fs.readFileSync(__dirname+"/data.json");
  const fileData_format = fileData.toString();
  const list_href = JSON.parse(fileData_format);
  //
  for (const item of list_href) {
    await page.goto(`https://nha.chotot.com${item}`, {
      waitUntil: "networkidle2",
    });
    await page.click(
      "#__next > div.container > div.ct-detail.adview > div > div.col-md-4.no-padding.dtView > div > div:nth-child(2) > div.LeadButton_wrapperLeadButtonDesktop__13fEA > div.LeadButton_showPhoneButton__1KVb- > div",
      { delay: 100 }
    );

    const a = await page.$$eval(
      "#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div",
      (el) => {
        let l = {};
        el.map((n) => {
          try {
            const key = n
              .querySelector(
                "div > div:nth-child(2) > span > span:nth-child(2)"
              )
              .getAttribute("itemprop");
            const value = n
              .querySelector(
                "div > div:nth-child(2) > span > span:nth-child(2)"
              )
              .textContent.trim();
            l[`${key}`] = value;
            // return l;
          } catch (error) {}
        });
        return l;
      }
    );
    //
    for (const item in addressElement) {
      a[`${item}`] = await page.$eval(addressElement[item], (el) =>
        el.textContent.trim()
      );
    }
    a.link = `https://nha.chotot.com${item}`;
    // console.log(a);
    const fileData = fs.readFileSync(__dirname+"/data_detail.json");
    const fileData_format = fileData.toString();
    const fileData_format2 = JSON.parse(fileData_format);
    fileData_format2.push(a);
    fs.writeFileSync(__dirname+"/data_detail.json", JSON.stringify(fileData_format2));
  }
  await browser.close();
}
// crawlListData();
crawl_detail({ addressElement });
module.exports = {
  crawlListData,
};
