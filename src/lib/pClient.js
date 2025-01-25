module.exports = async function (ditz, m, chatUpdate, store) {
  const { body } = m;
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const args = body.trim().split(/ +/).slice(1)
  const text = q = args.join(" ")

  if (global.plugins.flat().includes(command)) {
    const handle = () => {
      return {
        add: (override) => {
          if (override["cmd"] && override["desc"]) {
            global.actPlugins[override["cmd"]] = override;
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

    if (!global.actPlugins[command]) {
      if (global.plugins.filter(v => v[1] == command)[0][0].endsWith(".js")) {
        (await import("file://" + global.plugins.filter(v => v[1] == command)[0][0])).default(handle());
      } else {
        await require(global.plugins.filter(v => v[1] == command)[0][0])(handle());
      }
    }

    const rdata = global.actPlugins[command];
    if (rdata) {
      rdata.run.call(this, { m, ditz, text, args })
    }
  }
}