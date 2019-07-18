#! /usr/bin/env node
const commander = require("commander");
var process = require("process");
commander
    .usage('<command> [options]')
    .command("init", "初始化init")
    .command("createNode", "创建createNode")
    .parse(process.argv)