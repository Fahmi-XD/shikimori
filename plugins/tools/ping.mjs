export default (handler) => {
  handler.add({
    cmd: ["ping"],
    cats: ["Testing"],
    desc: "Hanya untuk percobaan ping",
    
    run: async ({ m }) => {
      m.reply("Pong");
    }
  })

  handler.add({
    cmd: ["dev"],
    cats: ["Testing"],
    desc: "Hanya untuk percobaan dev",
    
    run: async ({ m }) => {
      m.reply("Halo");
    }
  })
}