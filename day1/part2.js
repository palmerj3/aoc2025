const fs = require('fs');
//let input = fs.readFileSync('part1_sample', 'utf-8').trim().split('\n');
let input = fs.readFileSync('part1_input', 'utf-8').trim().split('\n');

let dial = {
    position: 50,
    maxPosition: 99,
    minPosition: 0
};

let parseRotation = (rotation) => {
    // Input examples: "L68", "R45"
    let direction = rotation.charAt(0);
    let amount = parseInt(rotation.slice(1), 10);
    return { direction, amount };
}

let zeroes = 0;

let rotate = (direction) => {
    if (direction === 'L') {
        dial.position -= 1;
    } else if (direction === 'R') {
        dial.position += 1;
    }

    if (dial.position < dial.minPosition) {
        dial.position = dial.maxPosition;
    } else if (dial.position > dial.maxPosition) {
        dial.position = dial.minPosition;
        zeroes++;
    } else if (dial.position === 0) {
        zeroes++;
    }
}

let rotateDial = (direction, amount) => {
    const min = dial.minPosition;
    const max = dial.maxPosition;
    const span = max - min + 1; // total number of positions

    // Convert current position to 0-based index within [0, span)
    let offset = dial.position - min;

    let cnt = amount;
    while (cnt > 0) {
        rotate(direction);
        cnt--;
    }

    return dial.position;
};

console.log(`- The dial starts by pointing at ${dial.position}`);

input.forEach((rotation, i) => {
    let { direction, amount } = parseRotation(rotation);

    rotateDial(direction, amount);
    console.log(`- ${i+1} The dial is rotated ${rotation} to point at ${dial.position}.`);
});

console.log(`Password: ${zeroes}`);