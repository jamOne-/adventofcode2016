fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let sum = 0;
    let s = input;

    let match = s.match(/\((\d+)x(\d+)\)/);
    while (match) {
        sum += match.index + +match[1] * +match[2];
        s = s.substring(match.index + match[0].length + +match[1]);
        match = s.match(/\((\d+)x(\d+)\)/);
    }

    sum += s.length;
    return sum;
}
