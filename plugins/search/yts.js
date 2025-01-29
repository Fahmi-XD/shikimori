const yts = require("yt-search");

module.exports = (handler) => {
  handler.add({
    cmd: ["yts"],
    cats: "Searching",
    alias: "YouTube Search",
    desc: "Cari semua konten di YouTube",   
    run: async ({ m, ditz, text}) => {
      if (!text) return m.reply("Masukan Query, Contoh:\n.yts Somebody Pleasure");
      m.reply("Mencari...");
      let results = await yts(text);
      if (results.videos.length === 0) return m.reply("No results found.");
      let videoId = results.videos[0].videoId;
      let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      let sections = results.all.slice(0, 20).map(result => ({
        title: result.title,
        rows: [{
          title: 'Get Video',
          description: `Get Video From ${result.title}`,
          id: `.ytmp4 ${result.url}`
        },
        {
          title: `Get Audio`,
          description: `Get Audio from ${result.title}`,
          id: `.ytmp3 ${result.url}`
        }]
      }));

      await ditz.sendListImg(m.chat, '*Pencarian berhasil, Silahkan pilih hasilnya di list*', 'ShikimoriBotz - by DitzDev', 'Click Here', sections, thumbnailUrl, m);
    }
  })
}
