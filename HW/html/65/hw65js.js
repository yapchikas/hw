'use strict'

function convertToC(farenheit){
let c = (farenheit-32)*5/9;
return c;
}
function convertToF(celcius){
let f = (celcius/5)*9+32;
return f;
}

console.log(convertToF(32));
console.log(convertToC(82));
let UserInput = prompt("Enter number to convert to Farenheit:");
alert(convertToF(UserInput));