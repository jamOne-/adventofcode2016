fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\n');
    let columns = Array(lines[0].length);
    for (let i = 0; i < lines[0].length; i++)
        columns[i] = [];

    lines.forEach(line => line.split('').forEach((c, i) => columns[i].push(c)));
    return columns.reduce((msg, column) => msg += mostFrequentLetter(column), '');
}

function mostFrequentLetter(letters) {
    let counters = {};
    letters.forEach(letter => counters[letter] = counters[letter] + 1 || 1);
    
    let bestResult = { letter: '', count: -1 };
    for (let letter in counters)
        if (counters[letter] > bestResult.count)
            bestResult = { letter, count: counters[letter] };

    return bestResult.letter;
}