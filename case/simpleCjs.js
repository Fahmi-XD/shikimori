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
const axios = require("axios");

const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));
const { smsg, tanggal, getTime, formatp, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('../src/lib/myfunc')

module.exports = async (ditz, m, chatUpdate, store, extendData) => {
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

      /** @Category ("Tools", "Rss", "rss", "Melihat penggunaan memory") */
      case "rss": {
        reply((process.memoryUsage().rss / 1000 / 1000).toFixed(2).toString() + " MB")
      }
        break;

      default: {
        // Do something
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