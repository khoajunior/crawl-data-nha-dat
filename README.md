# crawl-data-nha-dat
Tool crawl dữ liệu nhà đất (đã hoàn thành chotot.com)
## Cài đặt (yêu cầu node & npm)
```bash 
yarn install 
```
## Hướng dẫn sử dụng
```
yarn start-chotot
```
câu lệnh trên để chạy tool crawl chotot lấy danh sách bài đăng

tiếp tục chạy:
```
yarn start-chotot-detail
```
Để crawl chi tiết bài đăng để lấy được dữ liệu dc lưu ở file data_detail.json (src/controller/data_detail.json)

Chỉnh số trong muốn cào trong file .env
```
LOOP=2
```
