'use strict';

const fs = require('fs');
const path = require('path');
const filename = process.argv[2];


if (!filename) {
    throw Error('A file to sort must be specified!')  // 1 Handle if any file specified
}
if (!fs.existsSync(filename)) {
    throw Error("Given path doesn't exists. Check the path");  // 2 Check if this path exists
}
console.log(`Given file is: ${filename}`);



function handleFile(file) {
    // const stat = fs.statSync(file);
    // console.log(stat.isBlockDevice(), stat.isDirectory(), stat.size);
    // const ext = filename.split(".").at(-1);
    const ext = path.extname(file).replace('.', '');
    console.log(ext);
    if (fs.existsSync(ext)) {
        console.log(`Directory: "${ext}" already exists`);
    } else {
        fs.mkdirSync(ext);
    }
    moveFile(file, ext);
}

function handleDir(dir) {
    console.log(` ${dir} is a directory`);
    const files = fs.readdirSync(filename);
    console.log(files);
    for (let file of files) {
        console.log(file);
        if (fs.statSync(file).isDirectory()) {
            console.log(file, ' - This is a directory');
        } else {
            handleFile(file);
        }
    }
}

function checkFileType(filename) { 
    if (fs.statSync(filename).isDirectory()) { 
        handleDir(filename);
    } else {
        handleFile(filename);
    }
}

function moveFile(file, targetDir) {
    const sourcePath = path.resolve(file);
    const sourceDir = path.dirname(sourcePath);
    console.log(sourcePath);
    console.log(sourceDir);
    const destPath = path.join(sourceDir, targetDir, file);
    fs.renameSync(sourcePath, destPath);
}

checkFileType(filename);
