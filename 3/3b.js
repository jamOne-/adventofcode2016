fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(countTriangles(input));
});

let A = new Array(3);
let B = new Array(3);
let C = new Array(3);

function countTriangles(input) {
    let lines = input.split('\r\n');
    let count = 0;

    lines.forEach((line, i) => {
        let match = line.match(/\s+(\d+)\s+(\d+)\s+(\d+)/);
        [A, B, C].forEach((array, j) => array[i % 3] = +match[1 + j]);
        if (i % 3 == 2)
            [A, B, C].forEach(array => count += isTriangle.apply(this, array));
    })

    return count;
}

function isTriangle(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
}