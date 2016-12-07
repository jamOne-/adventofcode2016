fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\r\n');

    for (let line of lines) {
        let match = line.match(/(.*)-(.*)\[.*\]/);
        let encoded = match[1].split('-');
        let id = +match[2];

        if (encoded.map(decode.bind(this, id)).join(' ').includes('north'))
            return id;
    }
}

function decode(shift, s) {
    return s.split('').map(c => String.fromCharCode((c.charCodeAt(0) - 97 + shift) % 26 + 97)).join('');
}