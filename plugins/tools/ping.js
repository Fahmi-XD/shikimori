module.exports = (handler) => {
  handler.add({
    cmd: ["ping"],
    cats: ["Testing"],
    alias: "Ping for Testing",
    desc: "Hanya untuk percobaan ping",   
    run: async ({ m, ditz, text}) => {
       if (!text) return m.reply("Mana teksnya?")
       m.reply(`Halo! ${text}`)
    }
  })
}