fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    const length = input.length;
    let previous = '.' + input + '.';
    let safe = previous.split('').reduce((v, c) => v += c == '.', -2);

    for (let i = 1; i < 40; i++) {
        let aux = '';

        for (let j = 1; j < length + 1; j++) {
            if (previous[j - 1] == previous[j + 1])
                aux += '^';
            else {
                aux += '.';
                safe++;
            }
        }

        previous = '.' + aux + '.';
    }

    return safe;
}