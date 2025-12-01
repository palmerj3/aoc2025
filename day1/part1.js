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

let rotateDial = (direction, amount) => {
    const min = dial.minPosition;
    const max = dial.maxPosition;
    const span = max - min + 1; // total number of positions

    // Convert current position to 0-based index within [0, span)
    let offset = dial.position - min;

    // Apply movement
    if (direction === 'L') {
        offset -= amount;
    } else if (direction === 'R') {
        offset += amount;
    } else {
        throw new Error("direction must be 'L' or 'R'");
    }

    // Proper modulo for possibly negative values
    offset = ((offset % span) + span) % span;

    // Convert back to actual dial position
    dial.position = min + offset;

    return dial.position;
};



let password = 0; // track number of times position lands at 0

console.log(`- The dial starts by pointing at ${dial.position}`);

input.forEach((rotation, i) => {
    let { direction, amount } = parseRotation(rotation);

    rotateDial(direction, amount);
    console.log(`- ${i+1} The dial is rotated ${rotation} to point at ${dial.position}.`);

    if (dial.position === 0) {
        password += 1;
    }
});

console.log(`Password: ${password}`);