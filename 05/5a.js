md5 = require('md5');
fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let password = '';

    let i = 0;
    while (password.length < 8) {
        let hash = md5(input + i);

        if (hash.startsWith('00000'))
            password += hash[5];

        i++;
    }

    return password;
}