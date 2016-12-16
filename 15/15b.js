fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let discs = [];
    input.split('\r\n').forEach(line => {
        let match = line.match(/(\d+) positions.+position (\d+)/);
        discs.push({ positions: +match[1], position: +match[2] });
    });
    discs.push({ positions: 11, position: 0 });

    let start = 0;
    let mult = 1;
    discs.forEach((disc, i) => {
        while ((i + 1 + disc.position + start) % disc.positions != 0)
            start += mult;

        mult = lcm(disc.positions, mult);
    });

    return start;
}

function gcd(a, b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}