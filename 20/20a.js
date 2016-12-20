fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\r\n');
    let ranges = lines.map(line => line.split('-').map(s => +s)).sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    let max = -1;
    for (let [a, b] of ranges) {
        if (a > max + 1) break;
        max = Math.max(max, b);
    }

    return max + 1;
}