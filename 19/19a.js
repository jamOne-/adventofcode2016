fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let n = +input;
    return 2 * (n - (1 << Math.floor(Math.log2(n)))) + 1;
}