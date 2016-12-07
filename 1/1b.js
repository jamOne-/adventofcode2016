fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    distance(input);
});

function distance(input) {
    let x = 0, y = 0;
    let commands = input.split(', ');
    let direction = 0;
    let places = {};

    places['0 0'] = true;
    for (let i = 0; i < commands.length; i++) {
        let s = commands[i];
        let rotation = s[0];
        let move = +s.slice(1);

        if (rotation == 'R') direction++;
        else direction += 3;
        direction %= 4;

        while (move > 0) {
            if (direction == 0) y += 1;
            else if (direction == 1) x += 1;
            else if (direction == 2) y -= 1;
            else x -= 1;

            let index = `${x} ${y}`;
            if (places[index]) {console.log(Math.abs(x) + Math.abs(y)); return; }
            places[index] = true;
            move--;
        }
    }
}