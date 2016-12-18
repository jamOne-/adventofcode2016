fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let previous = input.split('');
    let safe = previous.reduce((v, c) => v += c == '.', 0);

    for (let i = 1; i < 40; i++) {
        previous = previous.map((_, i, a) => (a[i - 1] || '.') != (a[i + 1] || '.') ? '^' : '.');
        safe += previous.reduce((v, c) => v += c == '.', 0);
    }

    return safe;
}