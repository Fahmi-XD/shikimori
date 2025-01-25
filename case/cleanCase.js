/**
 * Ini sama kayak case.js cuman ini lebih bersih aja ( mungkin:v )
 * Keduanya bekerja jika kamu memasukan case baru, kalau mau bikin file case baru ya terserah.
 * 
 * Jangan lupa join saluran gw le ( Promosi dulu gak si 😋 )
 * 
 *      https://whatsapp.com/channel/0029Var22q6Au3aRoPn7yz1n
 */

const { proto, generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const fs = require("node:fs");
const moment = require("moment-timezone");

const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));

module.exports = async (ditz, m, chatUpdate, store) => {
  const { type, quotedMsg, mentioned, now, fromMe, getQuotedObj } = m
  var body = (m.mtype === 'conversation' ? m.message.conversation : m.mtype === 'imageMessage' ? m.message.imageMessage.caption : m.mtype === 'videoMessage' ? m.message.videoMessage.caption : m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text : m.mtype === 'buttonsResponseMessage' ? m.message.buttonsResponseMessage.selectedButtonId : m.mtype === 'listResponseMessage' ? m.message.listResponseMessage.singleSelectReply.selectedRowId : m.mtype === 'InteractiveResponseMessage' ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id : m.mtype === 'templateButtonReplyMessage' ? m.message.templateButtonReplyMessage.selectedId : m.mtype === 'messageContextInfo' ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.message.InteractiveResponseMessage.NativeFlowResponseMessage || m.text : '');
  var budy = (typeof m.text == 'string' ? m.text : '')
  var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
  const isCmd = body.startsWith(prefix)
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
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
  let pplu;

  try {
    pplu = await ditz.profilePictureUrl(anu.id, 'image')
  } catch {
    pplu = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
  }

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
                newsletterName: 'Made By DitzDev',
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
              text: `Shikimori Botz by _*DitzDev*_`
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              subtitle: "DitzDev",
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

  /**
   * Command Switch Casenya disini
   */
  switch (command) {

    /** @Category ("Tools", "rss", "Melihat penggunaan memory") */
    case "rss": {
      reply((process.memoryUsage().rss / 1000 / 1000).toFixed(2).toString() + " MB")
    }
      break;

    default: {
      // Do something
    }
      break;
  }
}