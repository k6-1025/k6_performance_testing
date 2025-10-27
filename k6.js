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