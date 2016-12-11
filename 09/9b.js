fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    return decompressedLength(input);
}

function decompressedLength(s) {
    let match = s.match(/\((\d+)x(\d+)\)/);
    if (!match) return s.length;

    let dataIndex = match.index + match[0].length;
    return match.index + +match[2] * (decompressedLength(s.substr(dataIndex, +match[1]))) + decompressedLength(s.substring(dataIndex + +match[1]));
}
