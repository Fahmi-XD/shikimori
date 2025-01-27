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
import { createRequire } from "node:module";

const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));
const require = createRequire(import.meta.url);
const { smsg, tanggal, getTime, formatp, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('../src/lib/myfunc')

export default async (ditz, m, chatUpdate, store, extendData) => {
  try {
    const {
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
    } = extendData;

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