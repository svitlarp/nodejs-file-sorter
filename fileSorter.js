'use strict';


const fs = require('fs');
const path = require('path');
const filename = process.argv[2];
const func = require('./printTree.js');


function checkFileType(filename) { 
    if (fs.statSync(filename).isDirectory()) { 
        handleDir(filename);
    } else {
        handleFile(filename);
    }
}


function handleFile(file) {
    const ext = path.extname(file).replace('.', '');
    if (!fs.existsSync(ext)) {
        fs.mkdirSync(ext);
    }
    moveFile(file, ext);
}


function handleDir(dir) {
    const files = fs.readdirSync(filename);
    for (let file of files) {
        if (fs.statSync(file).isFile()) {
            handleFile(file);
        }
    }
}


function moveFile(file, targetDir) {
    const sourcePath = path.resolve(file);
    const sourceDir = path.dirname(sourcePath);
    const destPath = path.join(sourceDir, targetDir, file);
    fs.renameSync(sourcePath, destPath);
}

function printFolderTree(baseDir) {
    const folders = fs.readdirSync(baseDir,  { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());
    for (const folder of folders) {
        const folderPath = path.join(baseDir, folder.name);
        console.log(`${folder.name}/`);
        const files = fs.readdirSync(folderPath);
        for (let file of files) {
            console.log(`|--- ${file}`);
        }
    }
}
    

try {
    if (!filename) {
        throw Error('A file to sort must be specified!')  // 1 Handle if any file specified
    }
    if (!fs.existsSync(filename)) {
        throw Error("Given path doesn't exists. Check the path");  // 2 Check if this path exists
    }
    console.log("Before sorting: ");
    func.printTree(filename);
    checkFileType(filename);
    console.log("\n \nAfter sorting: ");
    func.printTree(filename);
    
} catch (err) {
    console.error('Error: ', err.message);
}
