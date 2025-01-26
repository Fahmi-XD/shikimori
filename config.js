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

// COOKIE YOUTUBE
global.YT_COOKIE = "YSC=2QRyMAlx60k; VISITOR_INFO1_LIVE=6vr7d58EFug; VISITOR_PRIVACY_METADATA=CgJJRBIEGgAgRQ%3D%3D; __Secure-ROLLOUT_TOKEN=CMuEm-3A04aLAxCg2MKSqJKLAxig2MKSqJKLAw%3D%3D; GPS=1; PREF=f6=40000000&tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjIBmiPuTUMqI6aDvpjVRzmld0T2yzHBFdwUOVNLvVKR2Njh-ohTZNYptjuTdWV8LHkeKhAA; __Secure-3PSIDTS=sidts-CjIBmiPuTUMqI6aDvpjVRzmld0T2yzHBFdwUOVNLvVKR2Njh-ohTZNYptjuTdWV8LHkeKhAA; HSID=AusmJKWK6RfpZ1rp4; SSID=Agy7D7p76cLY8S9PX; APISID=3Jk52i8vykzONR3j/AnOLt_cXJxByqIoIV; SAPISID=K95SxYPz7S5xXcGv/ACH-1JcHXpt0TyfTY; __Secure-1PAPISID=K95SxYPz7S5xXcGv/ACH-1JcHXpt0TyfTY; __Secure-3PAPISID=K95SxYPz7S5xXcGv/ACH-1JcHXpt0TyfTY; SID=g.a000swjiSxUiY70vvOfSEN9pqjYQKT_kbfJFm9r8E8pb2Ebde7QuGWJN-MziAfEzPWY22AwFxQACgYKAZASARQSFQHGX2MivDCSfIRz05zPAWcJhp-hQxoVAUF8yKqDePkAMB_z_F0jxMhV7W-30076; __Secure-1PSID=g.a000swjiSxUiY70vvOfSEN9pqjYQKT_kbfJFm9r8E8pb2Ebde7QucT2fUgUGEOAHgYKODQrzYAACgYKAQISARQSFQHGX2MiyqocQD0UbxMTTd1iCrJG-xoVAUF8yKojW22A9AFaW9mfLYSjg7nB0076; __Secure-3PSID=g.a000swjiSxUiY70vvOfSEN9pqjYQKT_kbfJFm9r8E8pb2Ebde7QunlQdklshoxKr6ocnOEAbMQACgYKAYMSARQSFQHGX2Mi1-uMDO6YrSAdZW6uSOBNOBoVAUF8yKpeBTkwAkVm45PTDSS6pK2j0076; LOGIN_INFO=AFmmF2swRAIgJJ6mKA3gpiWPbJUZEB5drX_urBSUXqd4AGfUZWQqdJoCIE68Aq5EOepToFt6AyVqnUw3xNqR5r-4eCTEd8SQqeNV:QUQ3MjNmeV9NVi1SVkRmaWMzeWxDbi1XTTV1NG9Mcjl6UkRNbi05aDBHRW95ZjdZV3RDc0hFUDhORXV2MDA5Ul9JX2RraWtlbFhtcy0xZ1V2ZGZEV0lnOGhrcnQxS1U1N1ZRbUdKR3V6dUhOb1p1d3JfZFhpUUhJcnNVVWFiZHZOb1JtMkFPaTUtR2t1aWxzQVFfcmRVbzhfcWhYMmI5OUdn; SIDCC=AKEyXzX28S6VMW3O6s99nZoFuWugLcxPemOAGrGoqmhZHxIs4lHBWIWaN1oH9RyuxiLsH6fV; __Secure-1PSIDCC=AKEyXzUnf6GuCkJMuIf3q9mb4tHI1K1O83o-Gho2qJdEs9tx7dh66TrG3plc3S-MMMVzZbkr; __Secure-3PSIDCC=AKEyXzXzkVLGHXDzXMMzOjqpzoP2_4xjiaXxAfa0v75jVBY4Nm4cS1Yh9-MN9WvFce9zg41r3Q; ST-1c2vtgu=csn=OSH7SXaA51esmMIt&itct=CHoQh_YEGAAiEwiYuKDeqZKLAxUTL3sHHU9NMgBaD0ZFd2hhdF90b193YXRjaJoBBQgkEI4e; ST-1ixeula=csn=OSH7SXaA51esmMIt&itct=CEsQ_FoiEwiYuKDeqZKLAxUTL3sHHU9NMgAyCmctaGlnaC1yZWNaD0ZFd2hhdF90b193YXRjaJoBBhCOHhieAQ%3D%3D; ST-7rw1v3=csn=OSH7SXaA51esmMIt&itct=CDoQh_YEGAMiEwiYuKDeqZKLAxUTL3sHHU9NMgBaD0ZFd2hhdF90b193YXRjaJoBBQgkEI4e; ST-1hzxdlb=csn=OSH7SXaA51esmMIt&itct=CD4Qh_YEGAIiEwiYuKDeqZKLAxUTL3sHHU9NMgBaD0ZFd2hhdF90b193YXRjaJoBBQgkEI4e"

global.multiplier = 1000

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.bgYellow(`Update: ${__filename}`));
  delete require.cache[file]
  require(file)
});
