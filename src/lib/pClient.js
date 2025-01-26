const fs = require("node:fs");

const pengguna = JSON.parse(fs.readFileSync('./src/database/user.json'))
const owner = JSON.parse(fs.readFileSync('./owner.json'))
const prem = JSON.parse(fs.readFileSync('./premium.json'))
const banned = JSON.parse(fs.readFileSync('./src/database/banned.json'));

module.exports = async function (ditz, m, chatUpdate, store) {
  const { body } = m;
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const args = body.trim().split(/ +/).slice(1)
  const text = q = args.join(" ")

  const botNumber = await ditz.decodeJid(ditz.user.id);
  const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
  const isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
  const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid;
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
  const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
  const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
  const isPremium = [botNumber, ...prem].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
  const dbusers = db.data.users[m.sender];
  const isBan = banned.includes(m.sender);
  const isUser = pengguna.includes(m.sender);

  if (global.plugins.flat().includes(command)) {
    const handle = () => {
      return {
        add: (override) => {
          if (override["cmd"] && override["desc"]) {
            override["cmd"].forEach(v => {
              global.actPlugins.set(v, override);
              global.actPlugins.get(v)["lastUsed"] = Date.now();
            })
          } else {
            console.log(`[ ${chalk.red("Error")} ] Cmd atau Deskripsi tidak disetel: file ${c}
    
    plugin: ${JSON.stringify({
              cmd: override["cmd"] ? override["cmd"] : "null - Tidak disetel",
              cats: override["cats"] ? override["cats"] : "null - Tidak disetel",
              title: override["desc"] ? override["desc"] : "null - Tidak disetel"
            }, null, 2)}`);
          }
        }
      }
    }

    if (!global.actPlugins.get(command)) {
      if (global.plugins.filter(v => v[1] == command)[0][0].endsWith(".mjs")) {
        // Untuk plugin yang typenya ESM
        (await import("file://" + global.plugins.filter(v => v[1] == command)[0][0])).default(handle());
      } else if (global.plugins.filter(v => v[1] == command)[0][0].endsWith(".cjs") || global.plugins.filter(v => v[1] == command)[0][0].endsWith(".js")) {
        // Untuk plugin CommonJS
        await require(global.plugins.filter(v => v[1] == command)[0][0])(handle());
        delete require.cache[require.resolve(global.plugins.filter(v => v[1] == command)[0][0])];
      }
    }

    if (isBan) return ditz.sendMessage(m.chat, { text: mess.banned, footer: 'ShikimoriBotz - By DitzDev', buttons: [{ buttonId: '.banding', buttonText: { displayText: '📜 Aju Banding' }, type: 1 }], headerType: 1, viewOnce: true }, { quoted: m });

    const rdata = global.actPlugins.get(command);
    if (rdata) {
      ditz.readMessages([m.key]);
      rdata.run.call(this, { m, ditz, text, args })
      global.actPlugins.get(command)["lastUsed"] = Date.now();
    }
  }
}