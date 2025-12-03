const fs = require('fs');

//let input = fs.readFileSync('input_sample', 'utf-8').trim().split('\n');
let input = fs.readFileSync('input', 'utf-8').trim().split('\n');

function highestTwoDigit(str) {
    let best = -1;
    let maxRight = -1;  // best digit seen to the right so far
    
    // Traverse from right → left
    for (let i = str.length - 1; i >= 0; i--) {
        const digit = Number(str[i]);

        // If this digit can be the first digit of a pair
        if (maxRight !== -1) {
            const num = digit * 10 + maxRight;
            if (num > best) best = num;
        }

        // Update the best right-side digit seen so far
        if (digit > maxRight) {
            maxRight = digit;
        }
    }

    return best;
}

let total = 0;
input.forEach((line, i) => {
    let highest = highestTwoDigit(line);
    total += highest;
    console.log(`Line ${i + 1}: ${highest}`);
});

console.log(total);