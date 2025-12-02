const fs = require('fs');
//const input = fs.readFileSync('input_sample', 'utf-8').trim().split(',');
const input = fs.readFileSync('input', 'utf-8').trim().split(',');

function isDoubleSequence(n) {
    const s = String(n);         // convert number to string
    if (s.length % 2 !== 0) {    // must be even number of digits
        return false;
    }

    const half = s.length / 2;
    const first = s.slice(0, half);
    const second = s.slice(half);

    return first === second;
}

let invalidIds = [];

input.forEach((range, index) => {
    let [start, end] = range.split('-').map(Number);

    console.log(`Range ${index + 1}: Start = ${start}, End = ${end}`);

    for (let id = start; id <= end; id++) {
        if (isDoubleSequence(id)) {
            invalidIds.push(id);
        }
    }
});

console.log("Invalid IDs:", invalidIds);
const sum = invalidIds.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum of Invalid IDs:", sum);