const express = require("express");
const path = require("node:path");
const chalk = require("chalk");

const app = express();
const PORT = process.env.port || global.PORT;
const getStatusCode = (statusCode) => {
  if (statusCode < 300 && statusCode > 100) { // 2xx
    return chalk.green(statusCode);
  } else if (statusCode < 400 && statusCode > 200) { // 3xx
    return chalk.yellow(statusCode);
  } else if (statusCode < 500 && statusCode > 300) { // 4xx
    return chalk.red(statusCode);
  } else {
    return chalk.red(statusCode);
  }
}

/**
 * 
 * @param {string} text 
 * @param  {...string} opt 
 */
global.log = (text, ...opt) => {
  if (global.debugServer) {
    console.log(`[ ${chalk.cyan("Server")} ] ${text} ${opt.join(" ")}`);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/interface/public"));
app.set("trust proxy", true);
app.use((req, res, next) => {
  const end = res.end;
  res.end = (chunk, encoding) => {
    global.log(`${req.ip} | ${req.path} | ${getStatusCode(res.statusCode)}`);

    res.end = end;
    res.end(chunk, encoding);
  }
  next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
  res.render("home", {
    title: global.botname,
    ownername: global.ownername
  });
})

module.exports = function startService() {
  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, () => {
      global.serverRunning = true;
      resolve({
        text: "server berjalan di http://localhost:"+PORT,
        server: server
      });
    })
  })
}