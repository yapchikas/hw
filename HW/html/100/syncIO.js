'use strict';

const fs = require('fs');

const file = fs.readFileSync(`${process.argv[2]}`, 'utf-8').split('\n');

console.log(file.length-1);