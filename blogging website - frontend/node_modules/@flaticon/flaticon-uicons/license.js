const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

readFile('./LICENSE', 'utf-8').then(console.log).catch(() => console.log('Please, read LICENSE'));