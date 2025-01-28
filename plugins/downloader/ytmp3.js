const fs = require("fs");
const yt = require("@distube/ytdl-core");
const { pipeline } = require("stream");
const { promisify } = require("util");
const os = require("os");
const streamPipeline = promisify(pipeline);

module.exports = (handler) => {
  handler.add({
    cmd: ['ytmp3'],
    cats: 'Downloader',
    alias: 'YouTube Audio Downloader', 
    desc: 'Mengunduh audio YouTube dengan Instant.',
    run: async({ m, ditz, text }) => {
      if (!text) return m.reply("Masukan link dari YouTube.\nContoh: .ytmp3 https://youtu.be/xxx");
      m.reply("Please wait...");
      try {
          const cookies = [{ name: "DitzDev", value: YT_COOKIE, }]
          const agentOptions = {
            pipelining: 5,
            maxDirections: 0,
          }
          const agent = yt.createAgent(cookies, agentOptions);
          const videoInfo = await yt.getInfo(text);
          const { videoDetails } = videoInfo;
          const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
          let thumbnail = thumbnails[0].url;
          let audioStream = yt(text, {
            filter: 'audioonly',
            quality: 'highestaudio',
          });
          let tmpDir = os.tmpdir();
          let writeableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
          await streamPipeline(audioStream, writeableStream);
          let doc = {
            audio: {
              url: `${tmpDir}/${title}.mp3`
            },
            mimetype: 'audio/mp4',
            fileName: `${title}`,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: text,
                title: `${title}`,
                body: 'By DitzDev',
                thumbnail: (await ditz.getFile(thumbnail)).data
              }
            }
          };
          await ditz.sendMessage(m.chat, doc, { quoted: m });
          fs.unlinkSync(`${tmpDir}/${title}.mp3`, (err) => {
            if (err) {
              console.error(`Failed to delete audio file: ${err}`);
            } else {
              console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
            }
          })
      } catch (err) {
        m.reply("Maaf kak error :(");
        console.log(err);
      }
    }
  })
}
