const fs = require("fs");
const path = require("path");
const logrequest = (req, res, next) => {
  console.log("middle ware hitted");
  const log = {
    data: new Date().toISOString(),
    ip: req.ip,
    method: req.method,
    headers: req.headers,
    url: req.url,
  };
  const logfile = path.join(__dirname, "../Logs/request.logs");
  fs.appendFileSync(logfile, JSON.stringify(log) + "\n");
  console.log("logged succesfully");
  next();
};
module.exports = logrequest;
