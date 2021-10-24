const puppeteer = require("puppeteer");
require("dotenv").config();
const fs = require("fs");

async function crawl_detail() {
  const browser = await puppeteer.launch({
    slowMo: 10,
    headless: false,
  });
  const page = await browser.newPage();
  //
  const fileData = fs.readFileSync(__dirname + "/data.json");
  const fileData_format = fileData.toString();
  const list_href = JSON.parse(fileData_format);
  //
  for (const item of list_href) {
    try {
      await page.goto(`https://nha.chotot.com${item}`, {
        waitUntil: "networkidle2",
      });
      console.log(`Đang lấy dữ liệu trang: https://nha.chotot.com${item}`);
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
      for (const item in addressElement) {
        a[`${item}`] = await page.$eval(addressElement[item], (el) =>
          el.textContent.trim()
        );
      }
      a.link = `https://nha.chotot.com${item}`;
      // console.log(a);
      const fileData = fs.readFileSync(__dirname + "/data_detail.json");
      const fileData_format = fileData.toString();
      const fileData_format2 = JSON.parse(fileData_format);
      fileData_format2.push(a);
      fs.writeFileSync(
        __dirname + "/data_detail.json",
        JSON.stringify(fileData_format2)
      );
      console.log('Đã ghi dữ liệu vào file data_detail.json');
    } catch (error) {
      console.log(error);
      console.log(
        "NẾU FILE data_detail.json TRỐNG THÌ DỮ LIỆU BAN ĐẦU LÀ [] 🚧🚧🚧"
      );
      continue;
    }
  }
  await browser.close();
}
crawl_detail();
