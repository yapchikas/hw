'use strict';

let numArray = process.argv;
let sum = 0;
for (let i= 2; i <numArray.length; i++) {
    sum += Number(numArray[i]);
}
console.log(sum);