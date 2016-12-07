fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

let pinpad =   [[    ,    , '1',    ,     ],
                [    , '2', '3', '4',     ],
                [ '5', '6', '7', '8', '9' ],
                [    , 'A', 'B', 'C',     ],
                [    ,    , 'D',    ,     ]];

let x = 0;
let y = 2;

function solve(input) {
    let code = '';
    let lines = input.split('\r\n');
    lines.forEach(line => {
        line.split('').forEach(move);
        code += pinpad[y][x];
    });

    return code;
}

function move(direction) {
    let newx = x;
    let newy = y;

    if (direction == 'U') newy--;
    else if (direction == 'D') newy++;
    else if (direction == 'R') newx++;
    else newx--;

    if (pinpad[newy] && pinpad[newy][newx]) {
        y = newy; x = newx;
    }
}