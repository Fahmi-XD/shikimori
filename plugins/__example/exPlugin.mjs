/** 
 * Contoh plugin ESM untuk melihat pesan ViewOnce dan Ping.
 * 
 * Kode ini hanya untuk contoh saja!
 * 
 * Plugin bisa ditumpuk di satu file jika kamu mau.
 */




export default (handler) => {

  /** Simple */
  handler.add({
    cmd: ["ping"], // Perintah
    cats: ["Testing"], // Kategori
    desc: "Testing", // Deskripsi
    
    run: async ({ m }) => { // Kode yang akan dijalankan
      m.reply("Pong"); // Kirim balik pesan
    }
  })





  /** Advance */
  /** Next Update. Currently not support!*/

  handler.add({
    cmd: ["rvo"], // Perintah
    cats: ["Tools"], // Kategori
    desc: "Melihat pesan satu kali", // Deskripsi

    /** Setingan lainnya ( Opsional ) */
    owner: true, // Hanya owner
    premium: true, // Hanya user Premium
    group: false, // Hanya bisa di dalam group
    admin: false, // Hanya admin group

    limit: 5, // Mengurangi limit 5 ketika digunkan
    // Atau gunakan:
    limit: false, // Untuk menonaktifkan limit pada command ini
    // Setingan limit default adalah 1, artinya hanya mengurangi 1 limit jika command ini digunakan

    // Spesifik hanya type pesan apa yang bisa menjalankan command ini.
    type: ["all"], // Semua pesan bisa menjalankan command ini
    // Opsi lain: ["foto", "video", "sticker", "reply", "audio", "text", "all"] - default ["all"]
    
    // sys disini adalah Object yang digunakan untuk memvalidasi pesan yang diterima
    run: async ({ m, sys }) => { // Kode yang akan dijalankan

      /** Opsional */
      // Validasi 1 ( Jika user tidak mereply pesan viewOncenya )
      if (!sys.isReply) {
        return m.reply("Reply pesan viewOncenya.");
      }
      // Validasi 2 ( Jika pesan itu bukan viewOnce )
      if (!sys.isOnce) {
        return m.reply("Itu bukan pesan sekali lihat!");
      }

      // Jika sesuai
      m.reply("[Foto]"); // Kirimkan medianya

    }
  })
}