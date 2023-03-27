const fs = require('fs');
const path = require('path');

const folderName = process.argv[2];
const tsxFileName = `${folderName}.tsx`;
const cssFileName = `${folderName}.module.css`;
const indexFileName = 'index.ts';

const parentDirPath = path.join(__dirname, '..');
const newFolderPath = path.join(parentDirPath, 'src', 'components', folderName);

fs.mkdirSync(newFolderPath);

fs.writeFileSync(
  path.join(newFolderPath, tsxFileName),
  `import React, { FC } from 'react';

  const ${folderName}: FC = () => {};

  export default ${folderName};`
);

fs.writeFileSync(
  path.join(newFolderPath, indexFileName),
  `export { default } from './${folderName}'`
);

fs.writeFileSync(path.join(newFolderPath, cssFileName), '');

// To run this script, go to the "scripts" folder and run:
//    node createComponentTemplate.js [FolderName]
