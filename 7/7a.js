fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\n');
    let counter = 0;

    lines.forEach(line => {
        let inSquare = false;
        let gotABBA = false;

        for (let i = 0; i < line.length - 3; i++) {
            let abba = line[i] == line[i + 3] && line[i + 1] == line[i + 2] && line[i] != line[i + 1];

            if (line[i] == '[') inSquare = true;
            else if (line[i] == ']') inSquare = false;
            else if (inSquare && abba) return;
            else gotABBA = gotABBA || abba;
        }
        
        if (gotABBA)
            counter++;
    });

    return counter;
}