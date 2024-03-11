#!/usr/bin/env node
const { exec } = require("child_process");
const { readFile, createReadStream } = require("fs");
const { Command } = require("commander"); 
const { version } = require("../package.json");
const { createInterface: createReadlineInterface } = require("readline");

const cli = new Command();

cli
    .name("terminal-txt")
    .description("A helper CLI that permits to run terminal command(s) from txt file.")
    .version(version)

cli
    .argument("<string>", "Txt path file")
    .action((filePath, _) => {
        if (filePath.endsWith(".txt")) {
            readFile(filePath, (err, fileBuffer) => {
                if (err) {
                    cli.error("Path is not exists");
                }
                else {
                    const fileContent = fileBuffer.toString();
                    exec(fileContent, (err, stdout, stdin) => {
                        console.log(stdout);
                    })
                }
            });
        }
        else {
            cli.error("This argument require a txt file path")
        }
    });


cli.showHelpAfterError(true)
cli
    .addHelpText("afterAll", 
    `\x1b[34m==================================================
    \x1b[0mCreated by fernandobarrosd\n
    Github: https://github.com/fernandobarrosd
\x1b[34m===================================================`)

cli.parse();