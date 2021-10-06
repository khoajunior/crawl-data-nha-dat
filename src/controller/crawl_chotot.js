const puppeteer = require("puppeteer");
require('dotenv').config();

const list=[
    '/tp-ho-chi-minh/quan-go-vap/mua-ban-nha-dat/88443845.htm',
    '/tp-ho-chi-minh/huyen-nha-be/mua-ban-nha-dat/88443838.htm'
  ];

const addressElement={
    tieu_de:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > h1",
    gia:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > div.AdDecription_priceWrapper__38i3q > div.AdDecription_adPrice__1Ps8j > span > div > span > span > span:nth-child(1)",
    dien_tich:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(2) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    dia_chi:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > div:nth-child(5) > div > div > div.media-body.media-middle.AdParam_address__1pmCR.AdParam_addressClickable__1_93I > span",
    mo_ta:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div.AdDecription_adDecriptionWrapper__36qgN > p",
    so_phong:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(4) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    so_phong_ve_sinh:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(5) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    gia_met_vuong:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(3) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    giay_to_phap_ly:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(6) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    chieu_ngang:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(11) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    chieu_dai:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(12) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
    dien_tich_su_dung:"#__next > div.container > div.ct-detail.adview > div > div.col-md-8 > div:nth-child(5) > div:nth-child(13) > div > div.media-body.media-middle > span > span.AdParam_adParamValue__1ayWO",
}
// const expect =require('jest')
/**
 * cào danh sách id bài đăng
 * CHỢ TỐT
 */
async function crawlListData() {
  
  const browser = await puppeteer.launch({
    slowMo: 100,
    headless: false,
  });
  const page = await browser.newPage();

  const data=[];
  for (let i = 1; i <= 1; i++) {
          await page.goto(`https://nha.chotot.com/tp-ho-chi-minh/mua-ban-nha-dat?page=${i}&f=p`,{ waitUntil: "networkidle2",});
    
    const result =  await page.$$eval('#__next > div.container.ct-listing > div.styles_listViewWrapper__162PR > div.styles_base__2D2wo > main > div.no-padding.col-md-8.ct-col-8 > div.list-view > div > div:nth-child(2) > ul:nth-child(1) > div',
      el=>{
        return el.map(n=>{
            try {
               const a= n.querySelector("li > a").getAttribute("href");
               return a.replace('[object Object]', 'mua-ban-nha-dat');
            } catch (error) {
                return null
            }
        });
      });
   data.push(result)
   //    return 
}
console.log(data);
await browser.close();

}
async function crawl_detail({list_href,addressElement}){
    const browser = await puppeteer.launch({
        slowMo: 100,
        headless: false,
      });
      const page = await browser.newPage();

      for (const item of list_href) {
        await page.goto(`https://nha.chotot.com${item}`,{ waitUntil: "networkidle2",});
        let data={};
          for (const key in addressElement) {
              try {
                data[`${key}`]= await page.$eval(addressElement[key],el=>el.textContent.trim())
              } catch (error) {
                  continue;
              }
          }
          console.log(data);
      };
await browser.close();

}
// crawlListData();
crawl_detail({list_href:list,addressElement});
module.exports = {
    crawlListData,
};
