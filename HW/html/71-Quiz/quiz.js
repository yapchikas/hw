window.tools = function tools() {
    'use strict';

    function doubleIt(n) {
        return n * 2;
    }

    function myMap(array, callback) {
        const newArray = [];
        array.forEach(element => {
            let newNumber = callback(element);
            newArray.push(newNumber);
        });
        return newArray;
    }

    return {
        myMap,
        doubleIt
    };
}();
window.app = window.app || {};
window.app.counter = function() {
    let number = 0;
    function increment() {
        ++number;
    }
    function get() {
        return number;
    }

    return {
        increment,
        get
    };
}();

// Example usage
console.log(window.tools.myMap([2, 4, 6, 8], window.tools.doubleIt));

window.app.counter.increment();
console.log(window.app.counter.get());

let counter1 = window.app.createCounters.createCounter();
let counter2 = window.app.createCounters.createCounter();

counter1.increment(); 
console.log(counter1.get()); // Should show 0 (increment only once)

console.log(window.app.createCounters.total()); // Should show 1 (total of created counters)