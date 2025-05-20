'use strict';

const fs = require('fs');
const path = require('path');
const filename = process.argv[2];


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
        console.log(`Directory: "${ext}" has been created`);        
    }
    moveFile(file, ext);
}


function handleDir(dir) {
    const files = fs.readdirSync(filename);
    console.log(`Given file: ${dir} is a directory`);
    console.log(files);
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
    console.log(`  ${file}  -> ${targetDir}`);
}


try {
    if (!filename) {
        throw Error('A file to sort must be specified!')  // 1 Handle if any file specified
    }
    if (!fs.existsSync(filename)) {
        throw Error("Given path doesn't exists. Check the path");  // 2 Check if this path exists
    }
    checkFileType(filename);
} catch (err) {
    console.error('Error: ', err.message);
}
