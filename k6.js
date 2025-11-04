//K6 Introduction
//K6 adalah aplikasi open source untuk load testing yang membuat kegiatan performance testing jadi lebih mudah
//K6 merupakan aplikasi gratis, fokus untuk developer dan mudah dikembangkan
//Dengan menggunakan K6 bisa melakukan pengujian performa aplikasi yang dibuat, dan dapat mencari masalah sedini mungking. K6 bisa membantu memastikan aplikasi yang dibuat memiliki performa yang baik
k6.io/ //K6 dibuat oleh perusahaan Grafana Labs
//K6 merupakan aplikasi berbasis terminal, sehingga mudah dijalankan bahkan di sistem operasi yang berbasis terminal sekalipun (tanpa GUI)
//Script yang dibuat untuk melakukan test menggunakan JavaScript
//K6 menyediakan library untuk digunakan sehingga mempermudah ketika membuat skenario test
//K6 tidak jalan di browser, K6 merupakan aplikasi berbasis terminal, sehingga jika digunakan untuk menguji web, halaman web tidak akan di render layaknya seperti di browser
//K6 tidak berjalan di NodeJS, walaupun nanti project K6 dibuat menggunakan NodeJS, namun ketika dijalankan script pengujian tidak dijalankan menggunakan NodeJS, melainkan dijalankan menggunakan aplikasi K6 yang dibuat menggunakan Golang
//K6 tidak mendukung Node Modules, jadi jika ingin menggunakan library NPM, kita perlu sebutkan file nya secara langsung, bukan melakukan import module, karena import module tidak didukung
//Walaupun script untuk K6 dibuat menggunakan bahasa pemrograman JavaScript
//Tapi bukan berarti semua fitur JavaScript didukung oleh K6, hal ini karena K6 sendiri dibuat menggunakan Golang
//K6 menggunakan library bernama Goja untuk mengeksekusi kode JavaScript di Golang
github.com/dop251/goja //Oleh karena itu fitur JavaScript yang bisa digunakan terbatas pada fitur yang dipunyai oleh Goja

//K6 Installation
//K6 dibuat menggunakan bahasa pemrograman Golang sehingga bisa dijalankan di berbagai sistem operasi
grafana.com/docs/k6/latest/get-started/installation/ //instalation K6 documentation

//Example Application
//Dalam praktek belajar K6 disini akan menggunakan aplikasi NodeJS RESTful API untuk coba uji performanya menggunakan K6
github.com/ProgrammerZamanNow/belajar-nodejs-restful-api

//Create Project
//Untuk membuat project K6 sama seperti ketika membuat project NodeJS, bisa dengan membuat folder lalu di dalam folder execute: npm init
//Kemudian ubah type di package.json menjadi module
//Setelah itu perlu install K6 Library, K6 sendiri sudah menyediakan library yg bisa digunakan untuk memudahkan pengujian
//Tapi perlu diingat, NPM package library yg digunakan sebenarnya tidak berisi kode JavaScript sama sekali, hanya berisi informasi metadata/memudahkan dalam auto complete
//Itu karena K6 memang dibuat dengan Golang, jadi tidak berjalan diatas NodeJS. Untuk menginstall K6 Library bisa dengan perintah :
npm install k6 //akan menginstall node_modules, tidak kode JS hanya untuk bantuan untuk import, auto-complete di nodeJS. Kode JS nya tetap di app K6 nya sendiri
npm install --save-dev @types/k6 //akan menginstall kode metadata/auto complete untuk memudahkan ketika menulis kode JS seperti auto-complete/suggest

//Script
//Merupakan file JavaScript yg berisikan kode cara melakukan performance test dan juga pengaturan/skenario test yg ingin dilakukan
//Untuk membuat Script K6, cukup dengan membuat file JavaScript. Atau bisa dengan cara lebih mudah dengan perintah :
k6 new <lokasi>/<nama-file>.js
//Maka akan otomatis dibuatkan file baru yang sudah berisi script K6 sederhana untuk performance testing
//Setelah file script terbuat, bisa ganti http.get ke url yang akan dilakukan pengetesan performance
//Untuk menjalankan performance test sesuai dengan script yang sudah dibuat, bisa dengan perintah :
k6 run <lokasi>/<nama-file>.js
//Script untuk K6 terdiri dari 2 bagian: Options & Default Function
//Options : sebuah variable yg digunakan untuk melakukan pengaturan, misal jumlah virtual user (VU), berapa lama durasi melakukan pengujian, dan banyak aturan lain yg bisa dipakai
//Default Function : function yg dijalankan oleh K6 sesuai dgn pengaturan di variable options, akan berisi kode untuk skenario performance testing
//Cara K6 bekerja adalah :
//1. Saat pertama dijalankan, K6 membaca informasi pengaturan dari options (misal menggunakan 10 VU, total durasi 30s)
//2. Setelah K6 tahu pengaturannya, K6 akan jalankan default function sebanyak pengaturan yg ditentukan (misal call 10 proses/VU terus-menerus selama 30s)
//3. Namun jika ada kode sleep di default function maka sebelum selesai, proses akan berhenti dulu sekitar waktu sleep (misal 1s)

//Summary Output
//Setelah K6 menjalankan performance testing, maka K6 akan menghasilkan output summary yg defaultnya ditampilkan dalam console/terminal
//Namun summary ini bisa disimpan dalam bentuk file JSON menggunakan perintah
k6 run <lokasi>/<nama-file>.js --summary-export <lokasi-output>.json
grafana.com/docs/k6/latest/using-k6/metrics/reference/ //dokumentasi informasi output K6
//Secara default statistik yg digunakan tiap metric dari hasil pengujian K6 adalah :
['avg', 'min', 'med', 'max', 'p(90)', 'p(95)']
//Ini bisa dibuah dengan menambahkan options menggunakan key summaryTrendStats : []
grafana.com/docs/k6/latest/using-k6/k6-options/reference/#summary-trend-stats

//Realtime Output
//Summary output hanya akan membuat report setelah proses performance test selesai
//Namun bisa juga jika butuh informasi secara realtime dengan realtime output dari K6
//Secara default K6 bisa mengirim realtime output ke file JSON/CSV
k6 run --out csv=test_result.csv script.js
grafana.com/docs/k6/latest/results-output/real-time/csv
k6 run --out json=test_result.json script.js
grafana.com/docs/k6/latest/results-output/real-time/json
//Ketika realtime output dijalankan, maka akan secara realtime update file outputnya sesuai hasil iterasi yang dilakukan
//Namun biasanya ini jarang dilakukan, karena biasanya menggunakan third party untuk visualisasi hasil realtime
//Namun secara default tidak bisa mengirim realtime ke third party, harus membuat ulang app K6 dengan menambahkan library third party tsb
grafana.com/docs/k6/latest/results-output/real-time/ //dokumentasi third party di K6

//Web Dashboard
//K6 memiliki web dashboard untuk melihat realtime output dan summary output ketika K6 melakukan pengujian
//Meskipun secara visual dan kelengkapan, Web dashboard ini tidak selengkap third party yang tersedia
//Untuk mengaktifkan fitur web dashboard, harus mengaktifkan menggunakan environment variable
grafana.com/docs/k6/latest/results-output/web-dashboard/
export K6_WEB_DASHBOARD=true //perlu set web dashboard dulu, setelah itu jalankan K6 seperti biasa

//Stages
//K6 memiliki fitur untuk meningkatkan/menurunkan virtual user ketika melakukan pengujian dengan atribut Stages di Options
//Dengan ini jadi bisa meningkatkan jumlah user dalam durasi tertentu dan menurunkan jumlah user dalam durasi tertentu
grafana.com/docs/k6/latest/using-k6/k6-options/reference/#stages

//HTTP Request
//K6 dilengkapi library bawaan untuk melakukan HTTP Test yaitu k6/http, yg bisa melakukan HTTP Request
//Library k6/http ini bukan untuk melakukan pengetesan web browser seperti selenium, lebih mirip seperti postman
grafana.com/docs/k6/latest/javascript-api/k6-http/ //Hampir semua HTTP method didukung k6/http
//Setiap memanggil function di k6/http untuk mengirim HTTP Request, akan menghasilkan HTTP Response
//Response tsb bisa digunakan untuk HTTP Request selanjutnya, misal setelah register gunakan balikan token untuk login
grafana.com/docs/k6/latest/javascript-api/k6-http/response/

//Fail Test
//Terkadang perlu tahu apakah request yang dilakukan di K6 sukses atau gagal
//Untuk memberi tahu test yang dilakukan gagal, bisa menggunakan fail() function di k6 library
//Jika memanggil function fail(), otomatis iterasi akan dihentikan, kode selanjutnya tidak dieksekusi & langsung ke iterasi selanjutnya
grafana.com/docs/k6/latest/javascript-api/k6/fail/

//Checks
//Checks mirip Assertion di unit test, jika pada fail() ketika ada test gagal akan berhenti
//Maka di checks jika ada yg gagal tidak akan terjadi error/eksekusi kode akan tetap dijalankan
//Check mengembalikan return boolean berupa pengecekan sukses atau gagal
//Setelah pengecekan selesai, K6 akan memberi informasi persentase sukses & gagal dari pengecekan yg dilakukan
grafana.com/docs/k6/latest/javascript-api/k6/check/

//Execution Context Variables
//Saat menjalankan pengujian, kadang ingin tahu informasi tentang eksekusi yang sedang dijalankan K6
//Misal seperti: id iterasi, id virtual user, dan lain-lain. K6 menyediakan module k6/execution untuk hal tersebut
grafana.com/docs/k6/latest/javascript-api/k6-execution/
//Contoh: buat dulu 10 virtual user berbeda, kemudian buat test login dengan 10 user tersebut menggunakan id vu execution nya