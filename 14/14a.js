md5 = require('md5');
fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let counter = 0;
    let index = 0;
    let hashes = [];
    for (let i = 0; i < 1001; i++)
        hashes.push(createHash(input + i));

    while (true) {
        let hash = hashes.shift();
        let letter = firstThreeSameLetters(hash);

        if (letter && hashes.some(h => h.includes(letter.repeat(5)))) counter++;
        if (counter == 64) return index;

        index++;
        hashes.push(createHash(input + (index + 1000)));
    }
}

function firstThreeSameLetters(s) {
    for (let i = 0; i < s.length - 2; i++)
        if (s[i] == s[i + 1] && s[i] == s[i + 2])
            return s[i];
    
    return null;
}

function createHash(s) {
    return md5(s);
}