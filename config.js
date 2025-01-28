const fs = require("fs");
const moment = require("moment-timezone");
const chalk = require("chalk");

global.ownername = "DitzDev"; // Nama owner?
global.owner = ['6285717062467', '6285797442902'] // Bisa tambahin lagi, Contoh ['628xx', '62867xx']
global.nomorown = '6285717062467' // Owner utama
global.prem = ['6285717062467', '6285797442902'] 
global.botname = 'ShikimoriBotz'
global.botversi = '1.0.0-case-plugin'
global.packname = 'ShikimoriBotz - DitzDev'
// prefix?
global.prefa = ['!','.',',','🐤','🗿']
global.sessionName = "Shikimori";
// pesan
global.mess = {
    success: '𝗡𝗶𝗵 𝗸𝗮𝗸 𝗱𝗼𝗻𝗲 ><',
    admin: '❗𝗣𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗶𝗻𝗶 𝗰𝘂𝗺𝗮𝗻 𝗯𝗶𝘀𝗮 𝗱𝗶 𝗴𝘂𝗻𝗮𝗸𝗮𝗻 𝗼𝗹𝗲𝗵 𝗔𝗱𝗺𝗶𝗻',
    botAdmin: '𝗔𝗸𝘂... 𝗔𝗸𝘂𝘂𝘂 𝗯𝗲𝗹𝘂𝗺 𝗷𝗮𝗱𝗶 𝗮𝗱𝗺𝗶𝗻 𝗸𝗮𝗸😣',
    owner: '𝗠𝗮𝗮𝗳 𝗸𝗮𝗸 𝗳𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗸𝗵𝘂𝘀𝘂𝘀 𝗠𝗮𝘀 𝗔𝗱𝗶𝘁',
    group: '𝗙𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗵𝗮𝗻𝘆𝗮 𝗯𝗶𝘀𝗮 𝗱𝗶 𝗴𝘂𝗻𝗮𝗸𝗮𝗻 𝗱𝗶 𝗱𝗮𝗹𝗮𝗺 𝗚𝗿𝗼𝘂𝗽',
    private: '𝗙𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗵𝗮𝗻𝘆𝗮 𝗯𝗶𝘀𝗮 𝗱𝗶 𝗴𝘂𝗻𝗮𝗸𝗮𝗻 𝗱𝗶 𝗱𝗮𝗹𝗮𝗺 𝗣𝗿𝗶𝘃𝗮𝘁𝗲 𝗖𝗵𝗮𝘁',
    bot: '𝗙𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗸𝗵𝘂𝘀𝘂𝘀 𝗺𝗲𝗺𝗯𝗲𝗿 𝗯𝗼𝘁',
    wait: '𝗕𝗲𝗻𝘁𝗮𝗿 𝘆𝗮𝗵 𝗸𝗮𝗸, 𝗵𝗲𝗵𝗲~',
    endLimit: '𝗬𝗮𝗵𝗵𝗵 𝗹𝗶𝗺𝗶𝘁 𝗸𝗮𝗺𝘂 𝗵𝗮𝗯𝗶𝘀 𝗻𝗶𝗵 𝗸𝗮𝗸😣\n\n🎯 *𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗰𝘂𝗺𝗮𝗻 𝘀𝗲𝗽𝘂𝗹𝘂𝗵 𝗿𝗶𝗯𝘂 𝗽𝗲𝗿𝗺𝗮𝗻𝗲𝗻* 😋',
    error: '🚫',
    prem: '𝗙𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗸𝗵𝘂𝘀𝘂𝘀 𝗺𝗲𝗺𝗯𝗲𝗿 𝗽𝗿𝗲𝗺𝗶𝘂𝗺\n\n♨️ 𝗕𝗲𝗹𝗶 𝗽𝗿𝗲𝗺? 𝗧𝗮𝗻𝘆𝗮 𝗮𝗷𝗮 𝗺𝗮𝘀 𝗮𝗱𝗶𝘁 😉',
    banned: '*Maaf, Kamu telah di banned oleh Admin, Moderator atau Owner, Silahkan tekan tombol banding di bawah ini untuk mengajukan Banding.*',
}
global.limitawal = {
    premium: "Infinity",
    free: 50
}
global.exifSticker = {
  packId: "https://github.com/ditzDev/shikimori",
  packName: "Made By",
  packPublish: "Shikimori - Bot",
  packEmail: "admin123@gmail.com",
  packWebsite: "https://github.com/ditzDev",
  androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
  iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
  emojis: [],
  isAvatar: 0,
},

// COOKIE YOUTUBE
global.YT_COOKIE = ""

global.multiplier = 1000

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.bgYellow(`Update: ${__filename}`));
  delete require.cache[file]
  require(file)
});
