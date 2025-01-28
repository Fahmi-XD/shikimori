const ytdl = require("@distube/ytdl-core");

module.exports = (handler) => {
  handler.add({
    cmd: ['ytmp4'],
    cats: 'Downloader',
    alias: 'YouTube Video Downloader', 
    desc: 'Mengunduh video YouTube dengan Instant.',
    run: async({ m, ditz, text }) => {
      if (!text) return m.reply("Masukan link YouTube, contoh: ytmp4 https://youtu.be/xxx");
      ditz.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
      try {
        let obj = await ytmp4(text);
        let title = obj.meta.title;
	      let channel = obj.meta.channel;
      	let duration = obj.meta.seconds;
        let desk = obj.meta.description;
        let capt = `乂  *Y T - M P 4*\n\n`
        capt += `┌  ◦ *Title* : ${title}\n`
        capt += `│  ◦ *Chanel* : ${channel}\n`
        capt += `└  ◦ *Duration* : ${duration}`
        ditz.sendMessage(m.chat, { video: obj.buffer, caption: capt, filename: `${title}.mp4`, footer: 'Klik tombol di bawah untuk merubah ke Audio', buttons: [{ buttonId: `.ytmp3 ${text}`, buttonText: { displayText: 'Ubah Audio' }, type: 1}], headerType: 1, viewOnce: true },{ quoted: m });
        ditz.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
      } catch (err) {
        console.log(err);
        m.reply("Maaf kak error :(")
      }
    }
  })
}

async function ytmp4(url) {
  try {
    const cookies = [{ name: "DitzDev", value: YT_COOKIE, }]
    const agentOptions = {
      pipelining: 5,
      maxDirections: 0,
    }
    const agent = ytdl.createAgent(cookies, agentOptions);
    const { videoDetails } = await ytdl.getInfo(url, {
      lang: 'id',
    });
    const stream = ytdl(url, {
      filter: 'videoandaudio',
    });
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    const buffer = Buffer.concat(chunks);
    return {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        desc: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url
      },
      buffer: buffer,
      size: buffer.length,
    }
  } catch (er) {
    throw er
  }
}
