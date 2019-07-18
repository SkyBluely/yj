#! /usr/bin/env node
const commander = require('commander');
var process = require("process")
var fs = require('fs');
var path = require('path');
var create = require('./createFileMkdir.js')
commander
    .option('-p,--port [option]', 'port', 3000)
    .option('-n,--name [option]', 'name', 'newProject')
    .action((name) => {
        createNodeServer(name, commander.port, commander.name)
    })
    .parse(process.argv)

function createNodeServer(name, port, projectName) {
    let BasePath = process.cwd();//当前路径
    let moduleDir = path.join(BasePath, name);//要将文件创建的路径
    if (fs.existsSync(moduleDir)) { return console.log("该文件已存在") }
    create.createMkdir({ path: moduleDir }).then((res) => {
        console.log("创建文件夹成功的情况", res)
        create.createFile({ path: path.join(moduleDir, 'index.js'), data: indexExpress(port) })
        create.createFile({ path: path.join(moduleDir, 'package.json'), data: indexPackage(projectName) })
        create.createMkdir({ path: path.join(moduleDir, 'public') }).then((data) => {
            if (data.status == 0) {
                create.createFile({ path: path.join(moduleDir + '/public', '/index.html'), data: indexHtml() })
            }
        })
    }).catch((e) => {
        console.log("创建文件夹失败的情况", e)
    })

}


function indexHtml() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    yj-cli脚手架创建成功
</body>
</html>`;
}

function indexPackage(projectName) {
    return `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "nodemon index.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": 
    {
        "express": "^4.16.3",
        "nodemon": "^1.19.1"
    }
}`;
}

function indexExpress(port) {
    return `var express = require('express');
var app = express();
app.use(express.static('./public'));
app.listen(${port});`;
}
