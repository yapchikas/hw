const one = 1;
const two = 2;
const once = 1;
const twice = 2;
const totalLength = 100;
let currentNum = 1;
let numArray = [];



function switchNum() {
    if (currentNum === one) {
        currentNum = two;
    } else if (currentNum === two) {
        currentNum = one;
    }
}

function push(freq, num = currentNum) {
    for (let i = 0; i < freq; i++) {
        numArray.push(num);
    }
    switchNum();
}

for (let i = 0; i < totalLength; i++) {
    if (numArray.length === i) {
        push(currentNum);
    }
    else if (numArray[i] === one) {
        push(once);
    } else if (numArray[i] === two) {
        push(twice);
    }
}

console.log(numArray.join(''));
console.log('122112122122112112212');

