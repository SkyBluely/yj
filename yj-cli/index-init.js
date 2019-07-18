#! /usr/bin/env node

const commander = require('commander');
var process = require("process");
commander
    .action((name) => {
        console.log("初始化的数据", name)
    })
    .parse(process.argv)

