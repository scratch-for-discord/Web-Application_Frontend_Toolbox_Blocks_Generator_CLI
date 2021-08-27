const chalk = require("chalk");

module.exports.createError = (m) => {
    console.log(`${chalk.redBright("[Error]")} ${chalk.red(m)}`);
    return true;
};
module.exports.createWarning = (m) => {
    console.log(`${chalk.yellowBright("[Warning]")} ${chalk.yellow(m)}`);
    return true;
};
module.exports.createSuccess = (m) => {
    console.log(`${chalk.greenBright("[Success]")} ${chalk.green(m)}`);
    return true;
};
module.exports.createInfo = (m) => {
    console.log(`${chalk.cyanBright("[Success]")} ${chalk.cyan(m)}`);
    return true;
};