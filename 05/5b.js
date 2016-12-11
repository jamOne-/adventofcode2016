md5 = require('md5');
fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let password = '________';

    let i = 0;
    while (password.includes('_')) {
        let hash = md5(input + i);

        if (hash.startsWith('00000')) {
            let pos = +hash[5];

            if (pos >= 0 && pos < 8 && password[pos] == '_')
                password = password.slice(0, pos) + hash[6] + password.slice(pos + 1);
        }

        i++;
    }

    return password;
}