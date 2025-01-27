/**
 * Ini sama kayak simpleCjs.js cuman ini versi ESM nya
 * Keduanya bekerja jika kamu memasukan case baru, kalau mau bikin file case baru ya terserah.
 * 
 * Jangan lupa join saluran gw le ( Promosi dulu gak si 😋 )
 * 
 *      https://whatsapp.com/channel/0029Var22q6Au3aRoPn7yz1n
 */

import { proto, generateWAMessageFromContent } from "@whiskeysockets/baileys";
import fs from "node:fs";
import moment from "moment-timezone";
import axios from "axios";
import * as util from "util";
import { createRequire } from "node:module";

const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));
const require = createRequire(import.meta.url);
const { smsg, tanggal, getTime, formatp, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('../src/lib/myfunc')

export default async (ditz, m, chatUpdate, store, extendData) => {
   try {
    const { type, quotedMsg, mentioned, now, fromMe, getQuotedObj } = m
    var body = m.body;
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
    const reply = m.reply;

    /**
     * Command Switch Casenya disini
     */
    switch (command) {

      // Kode case kamu...
      /** @Category ("Tools", "Ping", "ping", "Testing") */
      case "ping": {
        reply("Pong")
      }
        break;

      /** @Category ("Tools", "Total Fitur", "total", "Menghitung total fitur") */
      case "total": {
        const tt = `*Case*: ${global.ct}
*Plugin*: ${global.plugins.length}

*\`Total\`*: ${global.ct + global.plugins.length}`;
        await reply(tt)
      }
        break;
      
      default: {
        // Lakukan sesuatu...
      }
        break;
    }

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