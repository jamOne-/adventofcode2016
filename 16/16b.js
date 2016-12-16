fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let data = input;
    let length = 35651584;

    while (data.length < length) {
        let b = data.split('').reverse().join('').replace(/./g, c => c == '1' ? '0' : '1');
        data += '0' + b;
    }

    data = data.substr(0, length);
    return checksum(data);
}

function checksum(data) {
    if (data.length % 2) return data;

    let s = '';
    for (let i = 0; i < data.length - 1; i += 2)
        s += data[i] == data[i + 1] ? '1' : '0';
    return checksum(s);
}