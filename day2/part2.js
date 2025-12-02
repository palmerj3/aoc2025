const fs = require('fs');
//const input = fs.readFileSync('input_sample', 'utf-8').trim().split(',');
const input = fs.readFileSync('input', 'utf-8').trim().split(',');

function isDoubleSequence(n) {
    const s = String(n);

    // Try all possible chunk sizes
    for (let size = 1; size <= s.length / 2; size++) {
        // The string length must be divisible by the chunk size
        if (s.length % size !== 0) continue;

        const chunk = s.slice(0, size);
        const repeatCount = s.length / size;

        if (repeatCount >= 2 && chunk.repeat(repeatCount) === s) {
            return true; // invalid ID
        }
    }

    return false; // valid ID
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