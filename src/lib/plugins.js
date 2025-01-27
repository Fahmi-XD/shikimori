const fs = require("node:fs")
const path = require("node:path")
const chalk = require("chalk");
const readline = require("node:readline");

exports.addCommandToCategory = function addCommandToCategory(category, cmd, desc, alias = null, fullCommand) {
  if (!global.menuData[category]) {
    global.menuData[category] = [];
  }
  const isExist = global.menuData[category].some(item => item.cmd === cmd);

  if (!isExist) {
    const aliasF = typeof alias == "function" ? alias({ cmd, fcmd: fullCommand, cats: category }) : alias || cmd[0];
    const descF = typeof desc == "function" ? desc({ cmd, fcmd: fullCommand, cats: category }) : desc || "Unavailable";
    global.menuData[category].push({ cmd, desc: descF, alias: aliasF });
  }
}

module.exports = async function loadPlugins() {
  global.ct = 0;
  if (!global.menuData) {
    global.menuData = {};
  }

  console.log(`[ ${chalk.green("System")} ] Memuat Plugin dan Case...`);

  const handle = (c) => {
    return {
      add: (override) => {
        if (override["cmd"] && override["desc"]) {
          global.plugins.push([c, ...override["cmd"].flat()])
          override["cmd"].flat().forEach(v => {
            exports.addCommandToCategory(override["cats"], v, override["desc"], override["alias"], override["cmd"]);
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

  const open = async (folder) => {
    const f = await fs.readdirSync(folder).filter(v => !v.startsWith("__"));

    for (const v of f) {
      if (await fs.statSync(path.join(folder, v)).isDirectory()) {
        await open(path.join(folder, v))
      } else {
        try {
          if (v.endsWith(".mjs")) {
            // Untuk plugin yang typenya ESM
            ((await import("file://" + path.join(process.cwd(), folder, v))).default)(handle(path.join(process.cwd(), folder, v)));
          } else if (v.endsWith(".cjs") || v.endsWith(".js")) {
            // Untuk plugin CommonJS
            await require(path.join(process.cwd(), folder, v))(handle(path.join(process.cwd(), folder, v)));
            delete require.cache[require.resolve(path.join(process.cwd(), folder, v))];
          }
        } catch (error) {
          console.log(`[ ${chalk.red("Error")} ] Periksa kembali kode plugin anda.`)
          console.log(error)
        }
      }
    }
  }

  const sumCase = async (folder) => {
    const f = await fs.readdirSync(folder).filter(v => !v.startsWith("__"));
    
    for (const v of f) {
      if (await fs.statSync(path.join(folder, v)).isDirectory()) {
        await sumCase(path.join(folder, v))
      } else {
        const readStream = await readline.createInterface({
          input: fs.createReadStream(path.join(process.cwd(), folder, v)),
          crlfDelay: Infinity
        })
        for await (const ffl of readStream) {
          const cs = ffl.match(/case\s["']\w+["']\s?\:/g);
          const categories = ffl.matchAll(/\s?@Category\s?\(["'](\w+)["']\s?,\s?["']([\w\s-]+)["']\s?,\s?["'](\w+)["']\s?,\s?["'](.+)["']\)\s?/gi);
          const cases = ffl.matchAll(/\s?case\s?['"].+['"]\s?\:\s?\{?/gi);
          if (cases) for (let _ of cases) {
            global.ct++
          }
          if (categories) for (let [, cats, alias, cmd, desc] of categories) {
            exports.addCommandToCategory(cats, cmd, desc, alias)
          }
        }
      }
    }
  }

  await open("./plugins");
  await sumCase("./case");
  console.log(`[ ${chalk.green("Plugins")} ] ${global.plugins.length} Total plugin`);
  console.log(`[ ${chalk.green("Case")} ] ${ct} Total case`);
}