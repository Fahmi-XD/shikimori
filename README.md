<div align="center">
   <img align="center" src="https://files.catbox.moe/am7jdf.jpeg">
    <h3 align="center">ShikimoriBotz</h3> 
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges"/>
   <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png"/>
</div>   

</br>
</br>

> [!WARNING]
> Script ini tidak untuk di jual! Harap hargai developers karena tujuan pembuatan script ini adalah agar semua orang bisa pakai dengan gratis!

## Fitur
- [x] Ringan dan Cepat
- [x] Button Response
- [x] Simple
- [x] Support Case
- [x] Support CommonJS
- [x] Support Plugin
- [x] Support ESM ( Plugin )
- [ ] Support ESM ( Case )
- [ ] Plugin premium user
- [ ] Plugin owner user
- [ ] Plugin limit user

 ## Dokumentasi
 Semua perintah bot ada pada file [case.js](case.js), Dan juga untuk menu, Disini saya membuat agar lebih praktis dan tidak perlu lagi menambahkan menu secara manual, Disini ada yang namanya dekorasi `@Category`, dekorasi ini bisa memasukan setiap perintah ke dalam kategori menu.
 
> [!WARNING]
> `@Category` hanya bisa berkerja ketika suatu perintah di jalankan untuk pertama kalinya

</br>
</br>

Berikut adalah cara pemakaian `@Category`:

### Type Case
```javascript
/** @Category ("yourCategory", "your_command", "Description of Command heres") */
case "your_command": {
  // Rest of your code...
}
break;
```
Untuk contoh lebih lengkap, Silahkan lihat pada file [case.js](case/cleanCase.js)

</br>
</br>

Tidak ada fungsi `@Category` untuk tipe plugin. Sebagai gantinya kamu bisa memakai format seperti berikut:

### Type Plugin CJS ( plugin.cjs atau plugin.js )
```javascript
module.exports = (handler) => {

  handler.add({
    cmd: ["ping"], // Perintah
    cats: ["Testing"], // Kategori
    desc: "Testing", // Deskripsi
    
    run: async ({ m }) => { // Kode yang akan dijalankan
      m.reply("Pong");
    }
  })

}
```
### Type Plugin ESM ( plugin.mjs )
```javascript
export default (handler) => {

  handler.add({
    cmd: ["ping"], // Perintah
    cats: ["Testing"], // Kategori
    desc: "Testing", // Deskripsi
    
    run: async ({ m }) => { // Kode yang akan dijalankan
      m.reply("Pong");
    }
  })

}
```
Untuk contoh lebih lengkap, Silahkan lihat pada file [exPlugin.js](plugins/__example/exPlugin.mjs) atau [ping.js](plugins/tools/ping.mjs)

</br>
</br>

> [!TIP]
> Khusus untuk plugin, Folder yang memiliki awalan tanda `__` contoh `__example` tidak akan ditampilkan pada menu, atau plugin dalam keadaan nonaktif. Ini juga bekerja untuk file maupun folder, `__folder` `__file.js`

</br>
</br>

## Kontribusi
Jika Anda ingin berkontribusi mulai dari menambahkan fitur, Memperbaiki Bugs, dan lain lain, PR Selalu terbuka!

## Donasi
Donasikan sedikit uang Anda agar saya lebih semangat membuat project menakjubkan Lainnya! Donasikan lewat [Saweria](https://saweria.co/ditzofc)

</br>

> Script ini akan terus diUpdate setiap harinya ( Munkin:v ). Kalau ada error atau bug segera laporkan ke atmin.