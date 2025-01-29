require("../config");
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, interactiveMessage, downloadContentFromMessage, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const { smsg, tanggal, getTime, formatp, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('../src/lib/myfunc')
const fs = require("fs");
const util = require('util');
const moment = require('moment-timezone');
const chalk = require('chalk');
const Jimp = require("jimp");
const { color, bgcolor } = require("../src/lib/color");
const { send } = require("process");
const { exec } = require("child_process");
const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));
const { initializeUser, initializeChat, initializeSetting } = require('../src/lib/db');
const { add } = require("lodash");
const { default: axios } = require("axios");
// read database
global.db.data = JSON.parse(fs.readFileSync('./src/database/database.json'))
if (global.db.data) global.db.data = {
  users: {},
  chats: {},
  game: {},
  database: {},
  settings: {},
  anonymous: {},
  setting: {},
  others: {},
  sticker: {},
  ...(global.db.data || {})
}

module.exports = ditz = async (ditz, m, chatUpdate, store) => {
  try {
    const { type, quotedMsg, mentioned, now, fromMe, getQuotedObj } = m
    var body = m.body;
    var budy = (typeof m.text == 'string' ? m.text : '')
    var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "." : prefa ?? global.prefa
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : body;
    const args = body.trim().split(/ +/).slice(1)
    const full_args = body.replace(command, '').slice(1).trim()
    const spychat = body.replace().slice().trim()
    const pushname = m.pushName || "No Name"
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const from = m.key.remoteJid
    const botNumber = await ditz.decodeJid(ditz.user.id);
    const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid;
    const groupMetadata = m.isGroup ? await ditz.groupMetadata(from).catch(e => { }) : '';
    const groupName = m.isGroup ? groupMetadata.subject : '';
    const participants = m.isGroup ? await groupMetadata.participants : '';
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isPremium = [botNumber, ...prem].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    const dbusers = db.data.users[m.sender];
    const isBan = banned.includes(m.sender);
    const isUser = pengguna.includes(m.sender);
    const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
    const mentionByTag = m.mtype == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : [];
    const itime = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss');
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    // ========== BOT SYSTEM ======== //
    if (!ditz.public) {
      if (!m.key.fromMe && isOwner) return;
    }

    function replyBanned() {
      ditz.sendMessage(m.chat, {
        text: mess.banned, footer: `ShikimoriBotz - By ${global.ownername}`, buttons: [{
          buttonId: '.banding',
          buttonText: {
            displayText: '📜 Aju Banding'
          }, type: 1
        }],
        headerType: 1,
        viewOnce: true
      }, { quoted: m });
    }

    try {
      pplu = await ditz.profilePictureUrl(anu.id, 'image')
    } catch {
      pplu = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
    }
    /* Quoted */
    const aditz = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        "contactMessage": {
          'displayName': `${pushname}`,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ditzGans,;;;\nFN: (≡^∇^≡) Tenka-1.0.7-Version\nitem1.TEL;waid=${m.sender.split("@")[0]}:+${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          'jpegThumbnail': pplu,
          thumbnail: pplu,
          sendEphemeral: true
        }
      }
    }
    let payment = { "key": { "remoteJid": "0@s.whatsapp.net", "fromMe": false }, "message": { "requestPaymentMessage": { "currencyCodeIso4217": "USD", "amount1000": "99999999999", "requestFrom": "0@s.whatsapp.net", "noteMessage": { "extendedTextMessage": { "text": `${m.pushName}-san 🐼`, "contextInfo": { "mentionedJid": [`${m.sender}`] } } }, "expiryTimestamp": "0", "amount": { "value": "99999999999", "offset": 1000, "currencyCode": "USD" } } } }

    let cron = require('node-cron')
    cron.schedule('02 12 * * *', () => {
      let user = Object.keys(global.db.data.users)
      let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
      for (let jid of user) global.db.data.users[jid].limit = limitUser
      console.log('Reseted Limit')
    }, {
      scheduled: true,
      timezone: "Asia/Jakarta"
    })

    const resize = async (image, width, height) => {
      let uy = await Jimp.read(image);
      let maiking = await uy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG);
      return maiking;
    }

    try {
      let user = global.db.data.users[m.sender];
      let chats = global.db.data.chats[m.chat];
      let setting = global.db.data.settings[botNumber];

      initializeUser(user, isPremium);
      initializeChat(chats);
      initializeSetting(setting);

    } catch (err) {
      console.error(err);
    }

    if (isCmd && isUser) {
      pengguna.push(sender);
      fs.writeFileSync('./database/user.json', JSON.stringify(pengguna, null, 2));
    }

    // response media with cmdd
    if (isMedia && m.msg.filesha256 && (m.msg.filesha256.toString('base64') in global.db.data.sticker)) {
      let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
      let { text, mentionedJid } = hash
      let messages = await generateWAMessage(from, { text: text, mentions: mentionedJid }, {
        userJid: ditz.user.id,
        quoted: m.quoted && m.quoted.fakeObj
      });
      messages.key.fromMe = areJidsSameUser(m.sender, ditz.user.id)
      messages.key.id = m.key.id
      messages.pushName = m.pushName
      if (m.isGroup) messages.participants = m.sender
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
      }
      ditz.ev.emit('messages.upsert', msg)
    }

    async function sendGeekzMessage(chatId, message, options = {}) {
      let generate = await generateWAMessage(chatId, message, options)
      let type2 = getContentType(generate.message)
      if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
      if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
      return await ditz.relayMessage(chatId, generate.message, { messageId: generate.key.id })
    }

    /* Reply */
    const reply = (teks) => {
      let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            "messageContextInfo": {
              "deviceListMetadata": {},
              "deviceListMetadataVersion": 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363365412644768@newsletter',
                  newsletterName: `Made By global.ownername`,
                  serverMessageId: -1
                },
                businessMessageForwardInfo: { businessOwnerJid: ditz.decodeJid(ditz.user.id) },
                forwardingScore: 256,
                externalAdReply: {
                  title: 'Iyah Kenapa?',
                  thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg',
                  sourceUrl: 'https://www.tiktok.com/@ditz.ofc?_t=ZS-8tJm4Y9yD1c&_r=1',
                  mediaType: 2,
                  renderLargerThumbnail: false
                }
              },
              body: proto.Message.InteractiveMessage.Body.create({
                text: teks
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: `Shikimori Botz by _*${global.ownername}*_`
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                subtitle: `${global.ownername}`,
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              })
            })
          }
        }
      }, { quoted: aditz })

      ditz.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      })
    }

    // ============== END OF BOT SYSTEM ===========
    const asw = (jid, text = '', quoted, options) => {
      return Buffer.isBuffer(text) ? ditz.sendFile(jid, text, 'file', '', quoted, false, options) : ditz.sendMessage(jid, { ...options, text, mentions: ditz.parseMention(text) }, { quoted, ...options, mentions: ditz.parseMention(text) })
    }
    const listcolor = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
    const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)]
    if (m.message) {
      console.log(chalk.yellow.bgCyan.bold(botname), color(`[ PESAN ]`, `${randomcolor}`), color(`FROM`, `${randomcolor}`), color(`${pushname}`, `${randomcolor}`), color(`Text :`, `${randomcolor}`), color(`${body.length > 30 ? body.slice(0, 30) + "..." : body}`, `white`))
    }

    function showListMenu(category) {
      if (global.menuData[category]) {
        let listText = `Perintah dalam kategori ${category}:\n`;
        global.menuData[category].forEach(item => {
          listText += `- ${item.cmd}: ${item.desc}\n`;
        });
        return listText;
      } else {
        return `Kategori ${category} tidak ditemukan.`;
      }
    }

    switch (command) {
      case 'menu': {
        reply("Sebentar yah ^_^");
        let menu = `I am Shikimori! I can help to do something, search and get data / information only through WhatsApp.
  
–   *BOT INFORMATION*
┌  ◦ Database : MongodB, LocalDB
│  ◦ Library : @whiskeysockets/baileys
└  ◦ Source: https://github.com/DitzDev/shikimori

–   *USER INFORMATION*
┌  ◦ Name: ${m.pushName}
│  ◦ Limit: ${global.db.data.users[m.sender].limit}
└  ◦ Status: ${isPremium ? "Premium User" : "User"}
`;
        let uniqueCategory = new Set();
        let sections = [{
          title: 'Legality',
          rows: [{
            header: 'Kebijakan Privasi, Layanan, Dan Aturan',
            title: 'Rules!',
            description: 'Kebijakan Privasi, Layanan, Dan Aturan.',
            id: `.rules`
          }]
        }];

        for (const category in global.menuData) {
          if (uniqueCategory.has(category)) continue;
          uniqueCategory.add(category);

          const rows = [{
            title: category,
            description: `Show me ${category} Menu`,
            id: `.listmenu ${category}`
          }];

          sections.push({
            title: `${category} Menu`,
            rows: rows
          });
        }
        let listMessage = {
          title: 'List Menu',
          sections: sections
        };
        let msg = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363365412644768@newsletter',
                    newsletterName: `${global.ownername} - 2025`,
                    serverMessageId: -1
                  },
                  externalAdReply: {
                    title: 'ShikimoriBotz',
                    body: '1.0.0-case',
                    thumbnailUrl: 'https://files.catbox.moe/am7jdf.jpeg',
                    sourceUrl: 'https://www.tiktok.com/@ditz.ofc?_t=ZS-8tJm4Y9yD1c&_r=1',
                    mediaType: 1,
                    renderLargerThumbnail: true
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: menu
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: `ShikimoriBotz - By ${global.ownername}`
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: 'Hai!',
                  subtitle: `By ${global.ownername}`,
                  hasMediaAttachment: true, ...(await prepareWAMessageMedia({ document: { url: 'https://wa.me' }, mimetype: 'application/vnd.ms-powerpoint', fileName: 'ShikimoriBotz', jpegThumbnail: await resize('https://files.catbox.moe/9gj04y.png', 300, 100), fileLength: 1000000000 }, { upload: ditz.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    "name": "single_select",
                    "buttonParamsJson": JSON.stringify(listMessage)
                  }]
                })
              })
            }
          }
        }, { userJid: m.chat, quoted: payment });
        ditz.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
      }
        break;
      case 'listmenu': {
        const category = args[0];
        if (!category) {
          reply("Silakan masukkan kategori. Contoh: !listmenu downloader");
          break;
        }

        if (!global.menuData[category]) {
          reply(`Kategori ${category} tidak ditemukan.`);
          break;
        }
        reply("Sebentar yah ^_^");

        const rows = global.menuData[category].map(item => ({
          title: `${item.alias}`,
          description: item.desc,
          id: `.${item.cmd}`
        }));
        let listMessage = {
          title: `Click Here`,
          sections: [{
            title: `${category.toUpperCase()} MENU`,
            rows: rows
          }]
        };

        let msg = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363365412644768@newsletter',
                    newsletterName: `${global.ownername} - 2025`,
                    serverMessageId: -1
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `Ini adalah beberapa perintah dari ${category} Menu, Click dibawah untuk melihat.`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: `ShikimoriBotz - By ${global.ownername}`
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: 'Hai!',
                  subtitle: `By ${global.ownername}`
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    "name": "single_select",
                    "buttonParamsJson": JSON.stringify(listMessage)
                  }]
                })
              })
            }
          }
        }, { userJid: m.chat, quoted: payment });
        ditz.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
        break;
      }

      /** @Category ("AI", "Shikimori AI", "ai", "Berbicara dengan AI, Tanya apapun yang kamu suka!") */
      case 'ai': case 'shikimori': {
        if (isBan) return replyBanned();
        if (!text) return reply("Aku Shikimori AI, Apa yang kamu ingin tanyakan? ^_°");
        // reply("Bentar yah! Shikimori lagi prosess pertanyaan mu...")
        try {
          let url = `https://api.paxsenix.biz.id/ai/gpt4?text=${text}&system=Your%20name%20is%20Shikimori`;
          let response = await axios.get(url);
          let data = response.data;
          m.reply(data.message)
        } catch (e) {
          reply("Yahh Error: " + e)
        }
      }
        break;

      /** @Category ("AI", "Claude AI", "claude", "Tanya apa saja dengan AI dari Anthropic!") */
      case 'claude': {
        if (isBan) return replyBanned();
        if (!text) return reply("Hi! I'm Claude, How can i Assist you today?");
        reply("Plase wait...");
        try {
          let url = `https://api.paxsenix.biz.id/ai/claude?text=${text}`;
          let response = await axios.get(url)
          let data = response.data;
          m.reply(data.message);
        } catch (e) {
          reply("An Error Occurred: " + e);
        }
      }
        break
      //////// DOWNLOADER HERE /////////////////////

      /** @Category ("Downloader", "TikTok Downloader", "tiktok", "Download video TikTok Tanpa Watermark") */
      case 'tiktok': case 'tt': {
        if (isBan) return replyBanned();

        if (!text) return reply("*[ ERROR ]* Kasih link TikTok yang valid.");
        if (!text.match(/tiktok/gi)) {
          return reply("Apakah kamu yakin ini link TikTok?");
        }
        reply("*[ Process ]*");

        try {
          let url = "https://api.tiklydown.eu.org/api/download?";
          let response = await axios.get(url + `url=${text}`);
          let data = response.data;
          let capt = `[ *DOWNLOADER TIKTOK* ]

${data.title}
`;
          if (data.images && data.images.length > 0) {
            for (let i of data.images) {
              await ditz.sendMessage(m.chat, { image: { url: i.url }, caption: '' }, { quoted: m });
            }
          } else if (data.video && data.video.noWatermark) {
            await ditz.sendMessage(m.chat, {
              video: { url: data.video.noWatermark },
              caption: capt,
              footer: data.created_at,
              buttons: [{
                buttonId: `.kirim_audio ${text}`,
                buttonText: { displayText: 'Kirim Audio' },
                type: 1
              }],
              headerType: 1,
              viewOnce: true
            }, { quoted: m });
          } else {
            reply('Maaf, video tidak tersedia.');
          }
        } catch (e) {
          reply(`*[ ERROR ]* Tidak dapat memproses permintaan :(\n\n${e}`);
        }
      }
        break;

      case "test": {
        reply("Cek Log");
        console.log(global.menuData)
      }
        break;

      // for tiktok audio
      case 'kirim_audio': {
        if (isBan) return replyBanned();
        const tiktokUrl = text.trim();
        if (!tiktokUrl) return reply("*[ ERROR ]* Kasih link TikTok yang valid untuk audio.");
        if (!tiktokUrl.match(/tiktok/gi)) {
          return reply("Apakah kamu yakin ini link TikTok?");
        }
        reply("Oke tunggu sebentar ^_^");

        try {
          let url = "https://api.tiklydown.eu.org/api/download?";
          let response = await axios.get(url + `url=${tiktokUrl}`);
          let data = response.data;

          if (data.music && data.music.play_url) {
            await ditz.sendMessage(m.chat, { audio: { url: data.music.play_url }, mimetype: 'audio/mpeg' }, { quoted: m });
          } else {
            reply("Maaf, audio tidak tersedia untuk video ini.");
          }
        } catch (e) {
          reply(`*[ ERROR ]* Tidak dapat mengunduh audio :(\n\n${e}`);
        }
      }
        break;
      default:
        if (budy.startsWith('->')) {
          if (!isCreator) return reply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
            await m.reply(evaled)
          } catch (e) {
            await m.reply(String(e));
          }
        }
        if (budy.startsWith('$')) {
          if (!isCreator) return reply(mess.owner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return reply(err)
            if (stdout) return reply(stdout)
          })
        }
    }

    const returnData = {
      type,
      quotedMsg,
      mentioned,
      now,
      fromMe,
      getQuotedObj,
      body,
      budy,
      prefix,
      isCmd,
      command,
      args,
      full_args,
      spychat,
      pushname,
      text,
      quoted,
      mime,
      isMedia,
      from,
      botNumber,
      isCreator,
      isOwner,
      sender,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      isPremium,
      dbusers,
      isBan,
      isUser,
      numberQuery,
      mentionByTag,
      itime,
      more,
      readmore
    }
   return returnData

  } catch (err) {
    console.log(util.format(err));
    ditz.sendMessage(owner[0] + "@s.whatsapp.net", {
      text: `Hai owner! ada yang error nih, Di bagian: ` + util.format(err), contextInfo: {
        forwardingScore: 99999,
        isForwarded: true
      }
    })
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
