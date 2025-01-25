const { proto, 
       delay, 
       generateWAMessage, 
       areJidsSameUser, 
       getContentType 
      } = require('@whiskeysockets/baileys')

function appenTextMessage(text, chatUpdate, m, ditzGans){
let messages =  await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
            userJid: ditzGans.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, ditzGans.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'}
ditzGans.ev.emit('messages.upsert', msg)}   

module.exports = appenTextMessage