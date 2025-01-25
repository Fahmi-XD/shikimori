<div align="center">
   <img align="center" src="https://files.catbox.moe/am7jdf.jpeg">
    <h3 align="center">ShikimoriBotz</h3> 
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges"/>
   <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png"/>
</div>   

> [!WARNING]
> Script ini tidak untuk di jual! Harap hargai developers karena tujuan pembuatan script ini adalah agar semua orang bisa pakai dengan gratis!

## Fitur
- [x] Ringan dan Cepat
- [x] Button Response
- [x] Simple

 ## Dokumentasi
 Semua perintah bot ada pada file [case.js](case.js), Dan juga untuk menu, Disini saya membuat agar lebih praktis dan tidak perlu lagi menambahkan menu secara manual, Disini ada yang namanya fungsi `addCommandToCategory`, Fungsi ini bisa memasukan setiap perintah ke dalam kategori menu.
 
> [!WARNING]
> `addCommandToCategory` hanya bisa berkerja ketika suatu perintah di jalankan untuk pertama kalinya

Berikut adalah cara pemakaian `addCommandToCategory`:
```js
case "your_command": {
  // call function
  addCommandToCategory("yourCategory", "your_command", "Description of Command heres");
  // Rest of your code...
}
break;
```
Untuk contoh lebih lengkap, Silahkan lihat pada file [case.js](case.js)

## Kontribusi
Jika Anda ingin berkontribusi mulai dari menambahkan fitur, Memperbaiki Bugs, dan lain lain, PR Selalu terbuka!

## Donasi
Donasikan sedikit uang Anda agar saya lebih semangat membuat project menakjubkan Lainnya! Donasikan lewat [Saweria](https://saweria.co/ditzofc)
