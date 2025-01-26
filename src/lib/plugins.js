const fs = require("node:fs")
const path = require("node:path")
const chalk = require("chalk");

const pathMenu = './src/database/menuData.json';

async function loadMenuData() {
  if (fs.existsSync(pathMenu)) {
    const data = await fs.readFileSync(pathMenu, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

function saveMenuData(data) {
  fs.writeFileSync(pathMenu, JSON.stringify(data, null, 2), 'utf8');
}

exports.addCommandToCategory = function addCommandToCategory(category, cmd, desc, alias = null) {
  if (!global.menuData[category]) {
    global.menuData[category] = [];
  }
  const isExist = global.menuData[category].some(item => item.cmd === cmd);
  if (!isExist) {
    global.menuData[category].push({ cmd, desc, alias: alias || cmd });
    saveMenuData(global.menuData);
  }
}

module.exports = async function loadPlugins() {
  let ct = 0;
  if (!global.menuData) {
    global.menuData = await loadMenuData();
  }

  console.log(`[ ${chalk.green("System")} ] Memuat Plugin dan Case...`);

  const handle = (c) => {
    return {
      add: (override) => {
        if (override["cmd"] && override["desc"]) {
          global.plugins.push([c, ...override["cmd"].flat()])
          exports.addCommandToCategory(override["cats"], override["cmd"].flat()[0], override["desc"], override["alias"]);
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
          ((await import("file://" + path.join(process.cwd(), folder, v))).default)(handle(path.join(process.cwd(), folder, v)))
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
        const ffl = await fs.readFileSync(path.join(process.cwd(), folder, v), "utf-8");
        const cs = ffl.match(/case\s["']\w+["']\s?\:/g);
        const categories = ffl.matchAll(/\s?@Category\s?\("(\w+)"\s?,\s?"([\w\s-]+)"\s?,\s?"(\w+)"\s?,\s?"(.+)"\)\s?/gi)
        for (let [, cats, alias, cmd, desc] of categories) {
          exports.addCommandToCategory(cats, cmd, desc, alias)
        }
        ct += cs ? cs.length : 0;
      }
    }
  }

  await open("./plugins");
  await sumCase("./case");
  console.log(`[ ${chalk.green("Plugins")} ] ${global.plugins.length} Total plugin`);
  console.log(`[ ${chalk.green("Case")} ] ${ct} Total case`);
  ct = null;
}