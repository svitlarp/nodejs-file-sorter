const fs = require('fs');
const path = require('path');

function printTree(dir, indent = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
  
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const pointer = isLast ? '└── ' : '├── ';
      const nextIndent = indent + (isLast ? '    ' : '│   ');
  
      console.log(indent + pointer + item.name);
  
      if (item.isDirectory()) {
        printTree(path.join(dir, item.name), nextIndent);
      }
    });
}
  
module.exports = { printTree }
