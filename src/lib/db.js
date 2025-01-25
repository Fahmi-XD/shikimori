const isNumber = x => typeof x === 'number' && !isNaN(x);
const botNumber = global.db.data.botNumber;

function initializeUser(user, isPremium) {
  const limitUser = isPremium ? global.limitawal.premium : global.limitawal.free;
  if (typeof user !== 'object') global.db.data.users[m.sender] = {};
  if (user) {
    if (!isNumber(user.afkTime)) user.afkTime = -1;
    if (!('afkReason' in user)) user.afkReason = '';
    if (!isNumber(user.limit)) user.limit = limitUser;
    if (!isNumber(user.level)) user.level = 0;
    if (!('autolevelup' in user)) user.autolevelup = true;
    if (!isNumber(user.banned)) user.banned = false;
    if (!isNumber(user.prem)) user.prem = false;
  } else {
    global.db.data.users[m.sender] = {
      afkTime: -1,
      afkReason: '',
      limit: limitUser,
      level: 0,
      autolevelup: true,
      banned: false,
      prem: false
    };
  }
}

function initializeChat(chat) {
  if (typeof chat !== 'object') global.db.data.chats[m.chat] = {};
  if (chat) {
    if (!('cai' in chat)) chat.cai = false;
    if (!('selfgc' in chat)) chat.selfgc = false;
    if (!('mute' in chat)) chat.mute = false;
    if (!('wlcm' in chat)) chat.wlcm = true;
    if (!('nsfw' in chat)) chat.nsfw = false;
    if (!('antitoxic' in chat)) chat.antitoxic = false;
    if (!('antilink' in chat)) chat.antilink = false;
    if (!('antilinkyt' in chat)) chat.antilinkyt = false;
    if (!('antilinktt' in chat)) chat.antilinktt = false;
    if (!('antivirtex' in chat)) chat.antivirtex = true;
    if (!('antipanel' in chat)) chat.antipanel = false;
    if (!('antilinkv2' in chat)) chat.antilinkv2 = false;
    if (!('autodown' in chat)) chat.autodown = false;
    if (!('notification' in chat)) chat.notification = {};
  } else {
    global.db.data.chats[m.chat] = {
      cai: false,
      selfgc: false,
      mute: false,
      wlcm: true,
      nsfw: false,
      antitoxic: false,
      antilink: false,
      antilinkyt: false,
      antilinktt: false,
      antivirtex: true,
      antipanel: false,
      antilinkv2: false,
      autodown: false,
      notification: {
        status: false,
        text_left: '',
        text_welcome: ''
      }
    };
  }
}

function initializeSetting(setting) {
  if (typeof setting !== 'object') global.db.data.settings[botNumber] = {};
  if (setting) {
    if (!isNumber(setting.status)) setting.status = 0;
    if (!('autobio' in setting)) setting.autobio = false;
    if (!('autoread' in setting)) setting.autoread = false;
  } else {
    global.db.data.settings[botNumber] = {
      status: 0,
      autobio: false,
      autoread: false
    };
  }
}

module.exports = {
  initializeUser,
  initializeChat,
  initializeSetting
};
