fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\n');
    let count = 0;

    lines.forEach(line => {
        let abas = {};
        let babs = {};
        let inSquares = false;

        for (let i = 0; i < line.length - 2; i++) {
            let aba = line[i] == line[i + 2] && line[i] != line[i + 1];

            if (line[i] == '[') inSquares = true;
            else if (line[i] == ']') inSquares = false;
            else if (!inSquares && aba) {
                if (babs[line[i + 1] + line[i] + line[i + 1]]) {
                    count++;
                    return;
                }

                abas[line[i] + line[i + 1] + line[i + 2]] = true;
            }

            else if (inSquares && aba) {
                if (abas[line[i + 1] + line[i] + line[i + 1]]) {
                    count++;
                    return;
                }

                babs[line[i] + line[i + 1] + line[i + 2]] = true;
            }
        }
    });

    return count;
}