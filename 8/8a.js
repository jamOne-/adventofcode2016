fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

const WIDTH = 50;
const HEIGHT = 6;

function solve(input) {
    let screen = Array(WIDTH * HEIGHT).fill('.');
    input.split('\n').forEach(line => loadInstruction(screen, line));
    return screen.reduce((sum, e) => sum + (e == '#'), 0);
}

function loadInstruction(screen, instruction) {
    let match;

    if (match = instruction.match(/rect (.*)x(.*)/)) {
        let a = +match[1];
        let b = +match[2];

        for (let i = 0; i < b; i++)
            for (let j = 0; j < a; j++)
                screen[i * WIDTH + j] = '#';
    }

    else if (match = instruction.match(/rotate column x=(.*) by (.*)/)) {
        let x = +match[1];
        let shift = +match[2];

        let column = [];
        for (let i = 0; i < HEIGHT; i++)
            column.push(screen[x + i * WIDTH]);

        for (let i = 0; i < shift; i++)
            column.unshift(column.pop());

        for (let i = 0; i < HEIGHT; i++)
            screen[x + i * WIDTH] = column[i];
    }

    else if (match = instruction.match(/rotate row y=(.*) by (.*)/)) {
        let y = +match[1];
        let shift = +match[2];

        let row = [];
        for (let i = 0; i < WIDTH; i++)
            row.push(screen[y * WIDTH + i]);

        for (let i = 0; i < shift; i++)
            row.unshift(row.pop());

        for (let i = 0; i < WIDTH; i++)
            screen[y * WIDTH + i] = row[i];
    }
}