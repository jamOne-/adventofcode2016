fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let n = +input;

    let last = 0;
    for (let i = 2; i <= n; i++) {
        last = (1 + last) % i;
        if (last >= ~~(i / 2)) last = (last + 1) % i;
    }

    return last + 1;
}