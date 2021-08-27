#!/usr/bin/env node

import commander from "commander";
import s4d from "../src/index.js";
import enquirer from "enquirer";
import chalk from "chalk";
import { existsSync, promises as fs } from "fs";

const commands = new commander.Command("s4d")
    .option("-I, --init", "Initialize project")
    .option("-v, --version", "Shows the cli version")
    .parse(process.argv);

const options = commands.opts();
const prompt = enquirer.prompt;

async function handle() {
    if (!Object.keys(options).length) return commands.outputHelp();

    if (options.version) return console.log(chalk.white(`v${s4d.version}`));
    if (options.init) {
        const scratch = s4d.scratch();
        const { name } = await prompt({
            type: "input",
            name: "name",
            message: "Enter the block project name: "
        });

        let failed = scratch.setName(name);
        if (failed) return;

        const { version } = await prompt({
            type: "input",
            name: "version",
            message: "Enter the project version: "
        });

        failed = scratch.setVersion(version);
        if (failed) return;

        const { description } = await prompt({
            type: "input",
            name: "description",
            message: "Enter the project description: "
        });

        failed = scratch.setDescription(description);
        if (failed) return;

        const { authorName } = await prompt({
            type: "input",
            name: "authorName",
            message: "Enter the project author name: "
        });

        const { authorURL } = await prompt({
            type: "input",
            name: "authorURL",
            message: "Enter the project author url: "
        });

        failed = scratch.setAuthor(authorName, authorURL);
        if (failed) return;

        const { icon } = await prompt({
            type: "input",
            name: "icon",
            message: "Enter the project icon file name: "
        });

        failed = scratch.setIcon(icon);
        if (failed) return;

        const { tags } = await prompt({
            type: "input",
            name: "tags",
            message: "Enter the project tags (separated by comma): "
        });

        failed = scratch.setTags(tags?.trim().split(","));
        if (failed) return;

        const { create } = await enquirer.prompt({
            type: "confirm",
            name: "create",
            message: `Generate this project?\n\n${chalk.white(scratch.toString())}\n\n`
        });

        if (create) {
            await fs.writeFile("./meta.json", scratch.toString());
            await fs.writeFile("./README.md", `# ${name}\n\n${description}`);
            if (!existsSync("./data")) await fs.mkdir("./data");
            await fs.writeFile("./data/demo.json", JSON.stringify(s4d.block, null, "\t"));
        }
    }
}

try {
    await handle();
} catch(err) {
    console.log(`${chalk.redBright("[Error]")} ${chalk.red("Operation terminated!")}\n\n${chalk.redBright(`${err}`)}`);
}