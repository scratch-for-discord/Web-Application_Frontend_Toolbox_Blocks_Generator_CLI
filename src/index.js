const Scratch = require("./Scratch");

module.exports.scratch = () => new Scratch;
module.exports.block = require("./Block");
module.exports.util = require("./Util");
module.exports.version = require("../package.json").version;