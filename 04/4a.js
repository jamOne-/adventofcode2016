fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\r\n');
    let sum = 0;

    lines.forEach(line => {
        let match = line.match(/(.*)-(.*)\[(.*)\]/);
        let s = match[1].split('-').join('');
        let id = +match[2];
        let mostFrequent = match[3];

        if (mostFrequent == getMostFrequent(s))
            sum += id;
    });

    return sum;
}

function getMostFrequent(s) {
    let letters = {};

    for (let i = 0; i < s.length; i++) {
        let letter = s[i];
        letters[letter] = letters[letter] + 1 || 1;
    }

    let sorted = Object.keys(letters).sort((a, b) => letters[b] - letters[a] || a.charCodeAt(0) - b.charCodeAt(0));
    return sorted.slice(0, 5).join('');
}