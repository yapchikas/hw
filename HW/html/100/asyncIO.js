'use strict';

// eslint-disable-next-line no-undef
const fs = require('fs');

fs.readFile(process.argv[2], 'utf-8', (err, data) => {

console.log(data.split('\n').length-1);
});