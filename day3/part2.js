const fs = require('fs');

//let input = fs.readFileSync('input_sample', 'utf-8').trim().split('\n');
let input = fs.readFileSync('input', 'utf-8').trim().split('\n');

function largestTwelveDigits(str) {
    const k = 12;                         // length you want
    const result = [];

    // Characters remaining we still need to fill a 12-digit number
    let remaining = k;

    let start = 0;                        // where we can start searching from
    
    while (remaining > 0) {
        // How far we can scan forward and still have enough chars left
        const maxStart = str.length - remaining;

        // Find the largest digit in the range [start, maxStart]
        let bestDigit = "-1";
        let bestIndex = -1;

        for (let i = start; i <= maxStart; i++) {
            if (str[i] > bestDigit) {
                bestDigit = str[i];
                bestIndex = i;

                // Optimization: if it's '9', we can't do better
                if (bestDigit === "9") break;
            }
        }

        // Append this digit to result
        result.push(bestDigit);

        // Next search must start AFTER the digit we just selected
        start = bestIndex + 1;

        remaining--;
    }

    return result.join("");
}


let total = 0;
input.forEach((line, i) => {
    let highest = Number(largestTwelveDigits(line));
    total += highest;
    console.log(`Line ${i + 1}: ${highest}`);
});

console.log(total);