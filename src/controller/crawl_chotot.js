const puppeteer = require("puppeteer");
require("dotenv").config();
const fs = require("fs");

// const expect =require('jest')
/**
 * cào danh sách id bài đăng
 * CHỢ TỐT
 */
async function crawlListData() {
  console.log(process.env.LOOP);
  const browser = await puppeteer.launch({
    slowMo: 10,
    headless: false,
  });
  const page = await browser.newPage();
  for (let i = 1; i <= process.env.LOOP; i++) {
    try {
      await page.goto(
        `https://nha.chotot.com/tp-ho-chi-minh/mua-ban-nha-dat?page=${i}&f=p`,
        { waitUntil: "networkidle2" }
      );
      console.log(
        `Đang lấy trang: https://nha.chotot.com/tp-ho-chi-minh/mua-ban-nha-dat?page=${i}&f=p`
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
      const fileData = fs.readFileSync(__dirname + "/data.json");
      const fileData_format = fileData.toString();
      const fileData_format2 = JSON.parse(fileData_format);
      // const data_format = data.flat(Infinity);
      result.forEach((item) => {
        if (item) {
          fileData_format2.push(item);
        }
      });
      fs.writeFileSync(
        __dirname + "/data.json",
        JSON.stringify(fileData_format2)
      );
      console.log("Đã ghi dữ liệu vào file data.json");
    } catch (error) {
      console.log(error);
      console.log("NẾU FILE data.json TRỐNG THÌ DỮ LIỆU BAN ĐẦU LÀ [] 🚧🚧🚧");
      continue;
    }
  }
  await browser.close();
}
crawlListData();
