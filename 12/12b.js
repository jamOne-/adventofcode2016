fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let instructions = input.split('\r\n');
    let registers = { a: 0, b: 0, c: 1, d: 0};

    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        let match;

        if (match = instruction.match(/inc (\w)/)) registers[match[1]]++;
        else if (match = instruction.match(/dec (\w)/)) registers[match[1]]--;
        else if ((match = instruction.match(/jnz (\w) (.+)/)) && registers[match[1]] != 0) i += +match[2] - 1;
        else if (match = instruction.match(/cpy (.+) (\w)/)) {
            if (['a', 'b', 'c', 'd'].includes(match[1])) registers[match[2]] = registers[match[1]];
            else registers[match[2]] = +match[1];
        } 
    }

    return registers.a;
}