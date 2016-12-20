fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\r\n');
    let ranges = lines.map(line => line.split('-').map(s => +s)).sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    let count = 0;
    let max = -1;

    for (let [a, b] of ranges) {
        if (a > max + 1) count += a - max - 1;
        max = Math.max(max, b);
    }

    count += 4294967295 - max;
    return count;
}